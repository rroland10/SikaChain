import { getPublishedInsightBySlug } from "@/lib/cms/insights-store";
import { isLocale } from "@/lib/cms/site-content-store";
import { routing, type Locale } from "@/i18n/routing";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale: Locale = localeParam && isLocale(localeParam) ? localeParam : routing.defaultLocale;
  const post = await getPublishedInsightBySlug(slug, locale);

  if (!post) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ post });
}
