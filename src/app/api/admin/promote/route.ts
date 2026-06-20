import { getApplication, updateApplicationReviewStatus } from "@/lib/application-store";
import { verifyAdminToken } from "@/lib/applications";
import { applicationToCandidate } from "@/lib/admin-utils";
import type { ShowcaseCandidate } from "@/lib/candidates";
import { notifyApplicationStatusChange } from "@/lib/notify";
import { promoteCandidate, removePromotedCandidate } from "@/lib/showcase-store";

export const runtime = "nodejs";

type PromoteBody = {
  applicationId: string;
  status?: ShowcaseCandidate["status"];
};

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as PromoteBody;
    const app = await getApplication(body.applicationId);

    if (!app) {
      return Response.json({ error: "Application not found" }, { status: 404 });
    }

    const status = body.status || "Qualified";
    const candidate = applicationToCandidate(app, status);

    await promoteCandidate(candidate);
    const previousStatus = app.reviewStatus;
    await updateApplicationReviewStatus(app.id, "promoted");
    await notifyApplicationStatusChange({ ...app, reviewStatus: "promoted" }, previousStatus);

    return Response.json({
      ok: true,
      candidate,
      message: `${app.org} promoted to public showcase as "${status}".`,
    });
  } catch {
    return Response.json({ error: "Unable to promote application" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Missing candidate id" }, { status: 400 });
    }

    const candidates = await removePromotedCandidate(id);
    return Response.json({ ok: true, count: candidates.length });
  } catch {
    return Response.json({ error: "Unable to remove candidate" }, { status: 500 });
  }
}
