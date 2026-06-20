import { updateApplicationReviewStatus, getApplication } from "@/lib/application-store";
import { listApplications, verifyAdminToken } from "@/lib/applications";
import { notifyApplicationStatusChange } from "@/lib/notify";
import type { ProducerApplication } from "@/app/api/apply/route";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      id: string;
      reviewStatus: ProducerApplication["reviewStatus"];
    };

    if (!body.id || !body.reviewStatus) {
      return Response.json({ error: "Missing id or reviewStatus" }, { status: 400 });
    }

    const existing = await getApplication(body.id);
    if (!existing) {
      return Response.json({ error: "Application not found" }, { status: 404 });
    }

    const updated = await updateApplicationReviewStatus(body.id, body.reviewStatus);
    if (!updated) {
      return Response.json({ error: "Application not found" }, { status: 404 });
    }

    await notifyApplicationStatusChange(updated, existing.reviewStatus);

    return Response.json({ ok: true, application: updated });
  } catch {
    return Response.json({ error: "Unable to update application" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await listApplications();
  return Response.json({ count: applications.length, applications });
}
