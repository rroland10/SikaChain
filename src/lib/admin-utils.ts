import type { StoredApplication } from "@/lib/applications";
import type { ShowcaseCandidate } from "@/lib/candidates";

export function applicationToCandidate(
  app: StoredApplication,
  status: ShowcaseCandidate["status"] = "Under review",
): ShowcaseCandidate {
  const focus: string[] = [];
  if (app.infrastructure) focus.push("Infrastructure");
  if (app.ecosystem) focus.push("Ecosystem");
  if (app.compliance) focus.push("Compliance");

  const summary =
    app.ecosystem?.slice(0, 220) ||
    app.infrastructure?.slice(0, 220) ||
    `${app.org} applied to the Genesis Producer Program as a ${app.category.toLowerCase()}.`;

  return {
    id: app.id,
    name: app.org,
    category: app.category,
    jurisdiction: app.jurisdiction,
    region: app.region || app.jurisdiction,
    summary: summary.length > 220 ? `${summary.slice(0, 217)}…` : summary,
    focus: focus.length ? focus : ["Genesis applicant"],
    status,
    website: app.website,
  };
}

export function applicationsToCsv(apps: StoredApplication[]): string {
  const headers = [
    "id",
    "org",
    "email",
    "website",
    "jurisdiction",
    "category",
    "region",
    "submittedAt",
    "reviewStatus",
    "infrastructure",
    "ecosystem",
    "compliance",
  ];

  const escape = (v: string | undefined) => {
    const s = (v ?? "").replace(/"/g, '""');
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
  };

  const rows = apps.map((app) =>
    headers.map((h) => escape(String(app[h as keyof StoredApplication] ?? ""))).join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
