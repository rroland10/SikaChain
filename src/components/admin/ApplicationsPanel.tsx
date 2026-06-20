"use client";

import { useCallback, useEffect, useState } from "react";
import { ContentStatusBadge } from "@/components/admin/AdminFields";
import type { ShowcaseCandidate } from "@/lib/candidates";

type Application = {
  id: string;
  org: string;
  email: string;
  website?: string;
  jurisdiction: string;
  category: string;
  region?: string;
  infrastructure?: string;
  ecosystem?: string;
  compliance?: string;
  submittedAt: string;
  reviewStatus?: string;
};

type ApplicationsPanelProps = {
  authHeaders: () => HeadersInit;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
  onPromoted: () => void;
};

const REVIEW_STATUSES = ["new", "reviewing", "qualified", "promoted", "rejected"] as const;
const PROMOTE_STATUSES: ShowcaseCandidate["status"][] = ["Under review", "Qualified", "Testnet active"];

function Detail({
  label,
  value,
  multiline,
  mono,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-sika-gold">{label}</p>
      <p
        className={`mt-1 text-sika-cream/75 ${multiline ? "whitespace-pre-wrap leading-relaxed" : ""} ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

export function ApplicationsPanel({ authHeaders, onMessage, onError, onPromoted }: ApplicationsPanelProps) {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);
  const [promoteStatus, setPromoteStatus] = useState<ShowcaseCandidate["status"]>("Qualified");

  const loadApps = useCallback(async () => {
    setLoading(true);
    onError("");
    try {
      const res = await fetch("/api/admin/applications", { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as { applications: Application[] };
      setApps(data.applications);
    } catch {
      onError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, onError]);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  async function updateStatus(id: string, reviewStatus: Application["reviewStatus"]) {
    onMessage("");
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ id, reviewStatus }),
    });
    if (res.ok) {
      onMessage(`Status updated to "${reviewStatus}"`);
      await loadApps();
    } else {
      onError("Failed to update status");
    }
  }

  async function promoteApplication() {
    if (!selected) return;
    onMessage("");
    const res = await fetch("/api/admin/promote", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ applicationId: selected.id, status: promoteStatus }),
    });
    const json = await res.json();
    if (res.ok) {
      onMessage(json.message || "Promoted to showcase");
      await loadApps();
      onPromoted();
    } else {
      onError(json.error || "Failed to promote");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-3">
        {loading && <p className="text-sm text-sika-cream/50">Loading…</p>}
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => setSelected(app)}
            className={`card w-full text-left transition ${
              selected?.id === app.id ? "border-sika-gold/40 glow-gold" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold">{app.org}</p>
                <p className="mt-1 text-xs text-sika-cream/55">{app.category}</p>
              </div>
              <ContentStatusBadge status={app.reviewStatus || "new"} />
            </div>
            <p className="mt-2 truncate text-sm text-sika-cream/60">{app.email}</p>
          </button>
        ))}
        {!loading && apps.length === 0 && <p className="text-sm text-sika-cream/50">No applications yet.</p>}
      </div>

      <div className="glass-panel glow-green min-h-[360px] p-6 md:p-8">
        {selected ? (
          <div className="space-y-5 text-sm">
            <Detail label="Reference" value={selected.id} mono />
            <Detail label="Organization" value={selected.org} />
            <Detail label="Email" value={selected.email} />
            <Detail label="Category" value={selected.category} />
            <Detail label="Jurisdiction" value={selected.jurisdiction} />
            <Detail label="Region" value={selected.region || "—"} />
            <Detail label="Website" value={selected.website || "—"} />
            <Detail label="Infrastructure" value={selected.infrastructure || "—"} multiline />
            <Detail label="Ecosystem" value={selected.ecosystem || "—"} multiline />
            <Detail label="Compliance" value={selected.compliance || "—"} multiline />

            <div>
              <p className="text-[10px] uppercase tracking-wider text-sika-gold">Review status</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {REVIEW_STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateStatus(selected.id, s)}
                    className={`rounded-full border px-3 py-1 text-[11px] capitalize ${
                      selected.reviewStatus === s
                        ? "border-sika-gold/40 bg-sika-gold/15 text-sika-gold"
                        : "border-white/10 text-sika-cream/60 hover:border-sika-gold/25"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {selected.reviewStatus !== "promoted" && (
              <div className="border-t border-white/10 pt-5">
                <p className="text-[10px] uppercase tracking-wider text-sika-gold">Promote to showcase</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <select
                    value={promoteStatus}
                    onChange={(e) => setPromoteStatus(e.target.value as ShowcaseCandidate["status"])}
                    className="glass-input rounded-xl px-3 py-2 text-xs"
                  >
                    {PROMOTE_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={promoteApplication} className="btn-primary btn-shine text-xs">
                    Publish to /candidates
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-sika-cream/45">
            Select an application to review
          </p>
        )}
      </div>
    </div>
  );
}

export type { Application };
