import { readSiteContent } from "@/lib/cms/site-content-store";
import { isLocale } from "@/lib/cms/site-content-store";
import { routing } from "@/i18n/routing";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale = localeParam && isLocale(localeParam) ? localeParam : routing.defaultLocale;
  const content = await readSiteContent(locale);
  return Response.json({ content, locale });
}
