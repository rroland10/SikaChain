import { createApplicationId, saveNewApplication } from "@/lib/applications";
import { validateApplicationSubmit } from "@/lib/apply-guard";
import { notifyNewApplication } from "@/lib/notify";

export const runtime = "nodejs";

export type ProducerApplication = {
  org: string;
  email: string;
  website?: string;
  jurisdiction: string;
  category: string;
  region?: string;
  infrastructure?: string;
  ecosystem?: string;
  compliance?: string;
  submittedAt: string;
  reviewStatus?: "new" | "reviewing" | "qualified" | "promoted" | "rejected";
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ProducerApplication> & { _hp?: string };

    const guard = await validateApplicationSubmit(body);
    if (!guard.ok) {
      return Response.json({ error: guard.error }, { status: guard.status });
    }

    if (!body.org?.trim() || !body.email?.trim() || !body.jurisdiction?.trim() || !body.category?.trim()) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(body.email.trim())) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    const application: ProducerApplication = {
      org: body.org.trim(),
      email: body.email.trim().toLowerCase(),
      website: body.website?.trim() || undefined,
      jurisdiction: body.jurisdiction.trim(),
      category: body.category.trim(),
      region: body.region?.trim() || undefined,
      infrastructure: body.infrastructure?.trim() || undefined,
      ecosystem: body.ecosystem?.trim() || undefined,
      compliance: body.compliance?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      reviewStatus: "new",
    };

    const id = await createApplicationId(application.org);
    await saveNewApplication(id, application);

    await notifyNewApplication({ ...application, id });

    return Response.json({
      ok: true,
      id,
      message: "Application received. Our team will review and respond within 5–10 business days.",
    });
  } catch {
    return Response.json({ error: "Unable to save application" }, { status: 500 });
  }
}
