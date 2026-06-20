import { listPublishedInsights } from "@/lib/cms/insights-store";

export const runtime = "nodejs";

export async function GET() {
  const posts = await listPublishedInsights();
  return Response.json({ posts });
}
