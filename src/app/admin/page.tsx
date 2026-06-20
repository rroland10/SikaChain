"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import type { ShowcaseCandidate } from "@/lib/candidates";
import { showcaseCandidates as seedCandidates } from "@/lib/candidates";

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

const STORAGE_KEY = "sikachain_admin_token";
const REVIEW_STATUSES = ["new", "reviewing", "qualified", "promoted", "rejected"] as const;
const PROMOTE_STATUSES: ShowcaseCandidate["status"][] = ["Under review", "Qualified", "Testnet active"];

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [apps, setApps] = useState<Application[]>([]);
  const [showcase, setShowcase] = useState<ShowcaseCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [promoteStatus, setPromoteStatus] = useState<ShowcaseCandidate["status"]>("Qualified");
  const [tab, setTab] = useState<"applications" | "showcase">("applications");
  const [storageBackend, setStorageBackend] = useState<string>("");

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token}`, "Content-Type": "application/json" }),
    [token],
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
  }, []);

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const [appsRes, candidatesRes, healthRes] = await Promise.all([
        fetch("/api/admin/applications", { headers: authHeaders() }),
        fetch("/api/candidates"),
        fetch("/api/health"),
      ]);

      if (!appsRes.ok) {
        sessionStorage.removeItem(STORAGE_KEY);
        setToken("");
        setError("Invalid admin token");
        return;
      }

      const appsData = (await appsRes.json()) as { applications: Application[] };
      setApps(appsData.applications);

      const candidatesData = (await candidatesRes.json()) as { candidates: ShowcaseCandidate[] };
      setShowcase(candidatesData.candidates);

      if (healthRes.ok) {
        const health = (await healthRes.json()) as { storage?: string };
        setStorageBackend(health.storage || "");
      }
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [token, authHeaders]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, input.trim());
    setToken(input.trim());
    setInput("");
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setApps([]);
    setSelected(null);
  }

  async function updateStatus(id: string, reviewStatus: Application["reviewStatus"]) {
    setMessage("");
    const res = await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ id, reviewStatus }),
    });
    if (res.ok) {
      setMessage(`Status updated to "${reviewStatus}"`);
      await loadData();
    } else {
      setError("Failed to update status");
    }
  }

  async function promoteApplication() {
    if (!selected) return;
    setMessage("");
    const res = await fetch("/api/admin/promote", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ applicationId: selected.id, status: promoteStatus }),
    });
    const json = await res.json();
    if (res.ok) {
      setMessage(json.message || "Promoted to showcase");
      await loadData();
      setTab("showcase");
    } else {
      setError(json.error || "Failed to promote");
    }
  }

  async function removeFromShowcase(id: string) {
    if (!confirm("Remove this promoted profile from the public showcase?")) return;
    setMessage("");
    const res = await fetch(`/api/admin/promote?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      setMessage("Removed from showcase");
      await loadData();
    } else {
      setError("Failed to remove — only promoted applications can be removed");
    }
  }

  const seedIds = new Set(seedCandidates.map((c) => c.id));

  async function exportCsvSecure() {
    const res = await fetch("/api/admin/applications/export", { headers: authHeaders() });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sikachain-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!token) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
        <FadeIn>
          <form onSubmit={login} className="glass-panel glow-gold w-full max-w-md p-8">
            <p className="section-tag mb-3">Admin</p>
            <h1 className="font-display text-2xl font-bold">Operations dashboard</h1>
            <p className="mt-3 text-sm text-sika-cream/60">
              Review applications, promote candidates, and export data. Set{" "}
              <code className="text-sika-gold">ADMIN_TOKEN</code> in your environment.
            </p>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin token"
              className="glass-input mt-6 w-full rounded-xl px-4 py-3 text-sm"
              required
            />
            {error && <p className="mt-3 text-sm text-sika-red">{error}</p>}
            <button type="submit" className="btn-primary btn-shine mt-6 w-full">
              Sign in
            </button>
            <Link href="/" className="mt-4 block text-center text-xs text-sika-cream/45 hover:text-sika-gold">
              ← Back to site
            </Link>
          </form>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-tag mb-2">Admin</p>
          <h1 className="font-display text-3xl font-bold">Operations dashboard</h1>
          <p className="mt-2 text-sm text-sika-cream/60">
            {loading ? "Loading…" : `${apps.length} applications · ${showcase.length} showcase profiles`}
            {storageBackend && (
              <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sika-gold">
                Storage: {storageBackend}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={exportCsvSecure} className="btn-secondary glass-button text-sm">
            Export CSV
          </button>
          <Link href="/testnet" className="btn-secondary glass-button text-sm">
            Testnet dashboard
          </Link>
          <button type="button" onClick={logout} className="btn-secondary glass-button text-sm">
            Sign out
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {(["applications", "showcase"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold capitalize ${
              tab === t
                ? "border-sika-gold/40 bg-sika-gold/15 text-sika-gold"
                : "border-white/10 text-sika-cream/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {message && <p className="mb-4 text-sm text-sika-green-bright">{message}</p>}
      {error && <p className="mb-4 text-sm text-sika-red">{error}</p>}

      {tab === "applications" ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-3">
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
                  <StatusBadge status={app.reviewStatus || "new"} />
                </div>
                <p className="mt-2 truncate text-sm text-sika-cream/60">{app.email}</p>
              </button>
            ))}
            {!loading && apps.length === 0 && (
              <p className="text-sm text-sika-cream/50">No applications yet.</p>
            )}
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
      ) : (
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
      )}
    </section>
  );
}

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

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "text-sika-cream/60 border-white/15",
    reviewing: "text-sika-gold border-sika-gold/30",
    qualified: "text-sika-green-bright border-sika-green/30",
    promoted: "text-sika-gold-bright border-sika-gold/40",
    rejected: "text-sika-red border-sika-red/30",
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${colors[status] || colors.new}`}>
      {status}
    </span>
  );
}
