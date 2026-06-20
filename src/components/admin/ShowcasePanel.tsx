"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ShowcaseCandidate } from "@/lib/candidates";
import { showcaseCandidates as seedCandidates } from "@/lib/candidates";

type ShowcasePanelProps = {
  authHeaders: () => HeadersInit;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
  refreshKey?: number;
};

export function ShowcasePanel({ authHeaders, onMessage, onError, refreshKey = 0 }: ShowcasePanelProps) {
  const [showcase, setShowcase] = useState<ShowcaseCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const seedIds = new Set(seedCandidates.map((c) => c.id));

  const loadShowcase = useCallback(async () => {
    setLoading(true);
    onError("");
    try {
      const res = await fetch("/api/candidates");
      const data = (await res.json()) as { candidates: ShowcaseCandidate[] };
      setShowcase(data.candidates);
    } catch {
      onError("Failed to load showcase");
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    loadShowcase();
  }, [loadShowcase, refreshKey]);

  async function removeFromShowcase(id: string) {
    if (!confirm("Remove this promoted profile from the public showcase?")) return;
    onMessage("");
    const res = await fetch(`/api/admin/promote?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      onMessage("Removed from showcase");
      await loadShowcase();
    } else {
      onError("Failed to remove — only promoted applications can be removed");
    }
  }

  if (loading) {
    return <p className="text-sm text-sika-cream/50">Loading showcase…</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {showcase.map((c) => (
        <div key={c.id} className="card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg font-bold">{c.name}</p>
              <p className="mt-1 text-xs text-sika-cream/55">{c.category}</p>
            </div>
            <span className="rounded-full border border-sika-gold/30 bg-sika-gold/10 px-3 py-1 text-[10px] font-semibold text-sika-gold">
              {c.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sika-cream/65">{c.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href="/candidates" className="text-xs text-sika-gold hover:underline">
              View on public showcase →
            </Link>
            {!seedIds.has(c.id) && (
              <button
                type="button"
                onClick={() => removeFromShowcase(c.id)}
                className="text-xs text-sika-red/80 hover:text-sika-red"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
