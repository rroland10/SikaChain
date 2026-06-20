import { verifyAdminToken } from "@/lib/applications";
import {
  readSiteContent,
  resetSiteContentSection,
  updateSiteContentSection,
  isLocale,
} from "@/lib/cms/site-content-store";
import type { SiteContentDoc, SiteContentSection } from "@/lib/cms/types";
import { routing, type Locale } from "@/i18n/routing";

export const runtime = "nodejs";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

const SECTIONS: SiteContentSection[] = ["announce", "press", "home"];

function parseLocale(value: unknown): Locale {
  return typeof value === "string" && isLocale(value) ? value : routing.defaultLocale;
}

export async function GET(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  const localeParam = new URL(request.url).searchParams.get("locale");
  const locale = localeParam && isLocale(localeParam) ? localeParam : routing.defaultLocale;
  const content = await readSiteContent(locale);
  return Response.json({ content, locale });
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  try {
    const body = (await request.json()) as {
      section: SiteContentSection;
      locale?: Locale;
      data: SiteContentDoc[SiteContentSection];
    };

    if (!SECTIONS.includes(body.section)) {
      return Response.json({ error: "Invalid section" }, { status: 400 });
    }

    const locale = parseLocale(body.locale);
    const content = await updateSiteContentSection(body.section, locale, body.data);
    return Response.json({ content, locale, message: `${body.section} content saved (${locale})` });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  const url = new URL(request.url);
  const section = url.searchParams.get("section") as SiteContentSection | null;
  const localeParam = url.searchParams.get("locale");
  const locale = localeParam && isLocale(localeParam) ? localeParam : routing.defaultLocale;

  if (!section || !SECTIONS.includes(section)) {
    return Response.json({ error: "Valid section query param is required" }, { status: 400 });
  }

  const content = await resetSiteContentSection(section, locale);
  return Response.json({ content, locale, message: `${section} reset to defaults (${locale})` });
}
