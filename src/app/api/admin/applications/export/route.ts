import { listApplications, verifyAdminToken } from "@/lib/applications";
import { applicationsToCsv } from "@/lib/admin-utils";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!verifyAdminToken(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await listApplications();
  const csv = applicationsToCsv(applications);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sikachain-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
