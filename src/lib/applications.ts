import type { ProducerApplication } from "@/app/api/apply/route";
import { listApplicationIds, readApplication, saveApplication } from "@/lib/storage";

export type StoredApplication = ProducerApplication & { id: string };

export async function listApplications(): Promise<StoredApplication[]> {
  const ids = await listApplicationIds();

  const apps = await Promise.all(
    ids.map(async (id) => {
      const data = await readApplication<ProducerApplication>(id);
      if (!data) return null;
      return { ...data, id };
    }),
  );

  return apps
    .filter((app): app is StoredApplication => app !== null)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export function verifyAdminToken(request: Request): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return false;

  return header.slice(7) === expected;
}

export async function createApplicationId(org: string): Promise<string> {
  const slug = org
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

  return `${Date.now()}-${slug || "application"}`;
}

export async function saveNewApplication(
  id: string,
  application: ProducerApplication,
): Promise<StoredApplication> {
  await saveApplication(id, application);
  return { ...application, id };
}
