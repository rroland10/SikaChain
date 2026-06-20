import { verifyAdminToken } from "@/lib/applications";
import {
  readSiteContent,
  resetSiteContentSection,
  updateSiteContentSection,
} from "@/lib/cms/site-content-store";
import type { SiteContentDoc, SiteContentSection } from "@/lib/cms/types";

export const runtime = "nodejs";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

const SECTIONS: SiteContentSection[] = ["announce", "press", "home"];

export async function GET(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  const content = await readSiteContent();
  return Response.json({ content });
}

export async function PUT(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  try {
    const body = (await request.json()) as {
      section: SiteContentSection;
      data: SiteContentDoc[SiteContentSection];
    };

    if (!SECTIONS.includes(body.section)) {
      return Response.json({ error: "Invalid section" }, { status: 400 });
    }

    const content = await updateSiteContentSection(body.section, body.data);
    return Response.json({ content, message: `${body.section} content saved` });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  const section = new URL(request.url).searchParams.get("section") as SiteContentSection | null;
  if (!section || !SECTIONS.includes(section)) {
    return Response.json({ error: "Valid section query param is required" }, { status: 400 });
  }

  const content = await resetSiteContentSection(section);
  return Response.json({ content, message: `${section} reset to defaults` });
}
