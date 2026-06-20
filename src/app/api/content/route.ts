import { readSiteContent } from "@/lib/cms/site-content-store";

export const runtime = "nodejs";

export async function GET() {
  const content = await readSiteContent();
  return Response.json({ content });
}
