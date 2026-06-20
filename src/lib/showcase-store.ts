import type { ShowcaseCandidate } from "@/lib/candidates";
import { showcaseCandidates as seedCandidates } from "@/lib/candidates";
import { readPromotedJson, writePromotedJson } from "@/lib/storage";

export async function readPromotedCandidates(): Promise<ShowcaseCandidate[]> {
  return readPromotedJson<ShowcaseCandidate>();
}

export async function writePromotedCandidates(candidates: ShowcaseCandidate[]): Promise<void> {
  await writePromotedJson(candidates);
}

export async function getAllShowcaseCandidates(): Promise<ShowcaseCandidate[]> {
  const promoted = await readPromotedCandidates();
  const seedIds = new Set(seedCandidates.map((c) => c.id));
  return [...seedCandidates, ...promoted.filter((p) => !seedIds.has(p.id))];
}

export async function promoteCandidate(candidate: ShowcaseCandidate): Promise<ShowcaseCandidate[]> {
  const promoted = await readPromotedCandidates();
  const existing = promoted.findIndex((c) => c.id === candidate.id);
  if (existing >= 0) {
    promoted[existing] = candidate;
  } else {
    promoted.push(candidate);
  }
  await writePromotedCandidates(promoted);
  return getAllShowcaseCandidates();
}

export async function removePromotedCandidate(id: string): Promise<ShowcaseCandidate[]> {
  const promoted = await readPromotedCandidates();
  await writePromotedCandidates(promoted.filter((c) => c.id !== id));
  return getAllShowcaseCandidates();
}
