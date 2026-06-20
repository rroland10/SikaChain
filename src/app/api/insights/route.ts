import { listPublishedInsights } from "@/lib/cms/insights-store";
import { isLocale } from "@/lib/cms/site-content-store";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale = localeParam && isLocale(localeParam) ? localeParam : routing.defaultLocale;
  const posts = await listPublishedInsights(locale);
  return Response.json({ posts, locale });
}
