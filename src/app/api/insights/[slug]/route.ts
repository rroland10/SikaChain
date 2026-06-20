import { getPublishedInsightBySlug } from "@/lib/cms/insights-store";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = await getPublishedInsightBySlug(slug);

  if (!post) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ post });
}
