import { getAllShowcaseCandidates } from "@/lib/showcase-store";

export const runtime = "nodejs";

export async function GET() {
  const candidates = await getAllShowcaseCandidates();
  return Response.json({ count: candidates.length, candidates });
}
