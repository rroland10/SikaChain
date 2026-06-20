"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ApplicationsPanel } from "@/components/admin/ApplicationsPanel";
import { InsightsPanel } from "@/components/admin/InsightsPanel";
import { ShowcasePanel } from "@/components/admin/ShowcasePanel";
import { SiteContentPanel } from "@/components/admin/SiteContentPanel";
import { useAdminAuth } from "@/components/admin/useAdminAuth";

type AdminTab = "content" | "insights" | "applications" | "showcase";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "content", label: "Site content" },
  { id: "insights", label: "Insights" },
  { id: "applications", label: "Applications" },
  { id: "showcase", label: "Showcase" },
];

export default function AdminPage() {
  const { token, input, setInput, error, setError, authHeaders, login, logout, handleUnauthorized } =
    useAdminAuth();
  const [tab, setTab] = useState<AdminTab>("content");
  const [message, setMessage] = useState("");
  const [storageBackend, setStorageBackend] = useState("");
  const [showcaseRefresh, setShowcaseRefresh] = useState(0);
  const [appCount, setAppCount] = useState(0);

  const onMessage = useCallback((msg: string) => {
    setMessage(msg);
    setError("");
  }, [setError]);

  const onError = useCallback((msg: string) => {
    setError(msg);
    setMessage("");
  }, [setError]);

  const loadMeta = useCallback(async () => {
    if (!token) return;
    try {
      const [appsRes, healthRes] = await Promise.all([
        fetch("/api/admin/applications", { headers: authHeaders() }),
        fetch("/api/health"),
      ]);

      if (!appsRes.ok) {
        handleUnauthorized();
        return;
      }

      const appsData = (await appsRes.json()) as { applications: unknown[] };
      setAppCount(appsData.applications.length);

      if (healthRes.ok) {
        const health = (await healthRes.json()) as { storage?: string };
        setStorageBackend(health.storage || "");
      }
    } catch {
      onError("Failed to load dashboard");
    }
  }, [token, authHeaders, handleUnauthorized, onError]);

  useEffect(() => {
    loadMeta();
  }, [loadMeta]);

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
    return <AdminLogin input={input} error={error} onInputChange={setInput} onSubmit={login} />;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-tag mb-2">Admin</p>
          <h1 className="font-display text-3xl font-bold">Content & operations</h1>
          <p className="mt-2 text-sm text-sika-cream/60">
            Edit site copy, publish insights, and manage producer applications.
            {storageBackend && (
              <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sika-gold">
                Storage: {storageBackend}
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/insights" className="btn-secondary glass-button text-sm">
            View insights
          </Link>
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

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold ${
              tab === t.id
                ? "border-sika-gold/40 bg-sika-gold/15 text-sika-gold"
                : "border-white/10 text-sika-cream/60"
            }`}
          >
            {t.label}
            {t.id === "applications" && appCount > 0 ? ` (${appCount})` : ""}
          </button>
        ))}
      </div>

      {message && <p className="mb-4 text-sm text-sika-green-bright">{message}</p>}
      {error && <p className="mb-4 text-sm text-sika-red">{error}</p>}

      {tab === "content" && <SiteContentPanel authHeaders={authHeaders} onMessage={onMessage} onError={onError} />}
      {tab === "insights" && <InsightsPanel authHeaders={authHeaders} onMessage={onMessage} onError={onError} />}
      {tab === "applications" && (
        <ApplicationsPanel
          authHeaders={authHeaders}
          onMessage={onMessage}
          onError={onError}
          onPromoted={() => setShowcaseRefresh((n) => n + 1)}
        />
      )}
      {tab === "showcase" && (
        <ShowcasePanel
          authHeaders={authHeaders}
          onMessage={onMessage}
          onError={onError}
          refreshKey={showcaseRefresh}
        />
      )}
    </section>
  );
}
