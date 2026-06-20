import type { ProducerApplication } from "@/app/api/apply/route";
import { listApplications } from "@/lib/applications";

const DUPLICATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  const trap = body._hp;
  return typeof trap === "string" && trap.trim().length > 0;
}

export async function isDuplicateApplication(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const cutoff = Date.now() - DUPLICATE_WINDOW_MS;
  const apps = await listApplications();

  return apps.some(
    (app) =>
      app.email === normalized && new Date(app.submittedAt).getTime() >= cutoff,
  );
}

export type ApplyGuardResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function validateApplicationSubmit(
  body: Partial<ProducerApplication> & { _hp?: string },
): Promise<ApplyGuardResult> {
  if (isHoneypotTriggered(body as Record<string, unknown>)) {
    return { ok: false, status: 400, error: "Invalid submission" };
  }

  const email = body.email?.trim().toLowerCase();
  if (email && (await isDuplicateApplication(email))) {
    return {
      ok: false,
      status: 429,
      error: "An application from this email was recently submitted. Please wait before applying again.",
    };
  }

  return { ok: true };
}
