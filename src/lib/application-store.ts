import type { ProducerApplication } from "@/app/api/apply/route";
import type { StoredApplication } from "@/lib/applications";
import { readApplication, saveApplication } from "@/lib/storage";

export async function updateApplicationReviewStatus(
  id: string,
  reviewStatus: ProducerApplication["reviewStatus"],
): Promise<StoredApplication | null> {
  const data = await readApplication<ProducerApplication>(id);
  if (!data) return null;

  const updated = { ...data, reviewStatus };
  await saveApplication(id, updated);
  return { ...updated, id };
}

export async function getApplication(id: string): Promise<StoredApplication | null> {
  const data = await readApplication<ProducerApplication>(id);
  if (!data) return null;
  return { ...data, id };
}
