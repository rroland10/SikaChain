"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";

type HealthState = {
  ok: boolean;
  service: string;
  storage: string;
  email: boolean;
  admin: boolean;
  chain: { configured: boolean; online: boolean };
  timestamp: string;
};

export function StatusPage() {
  const [health, setHealth] = useState<HealthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/health");
        setHealth(await res.json());
      } catch {
        setHealth(null);
      } finally {
        setLoading(false);
      }
    }
    load();
    const id = window.setInterval(load, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="System status"
        title="SikaChain platform status"
        lead="Live health of the marketing site, storage backend, and configured chain RPC."
        primaryCta={{ href: "/explorer", label: "Block explorer" }}
        secondaryCta={{ href: "/docs", label: "Documentation" }}
      />

      <SectionBlock tag="Services" title="Current status" className="pb-24">
        {loading ? (
          <div className="skeleton h-48 rounded-2xl" />
        ) : health ? (
          <FadeIn>
            <div className="glass-panel grid gap-4 p-6 md:grid-cols-2 md:p-8">
              <StatusRow label="Website" value="Operational" ok />
              <StatusRow label="Storage" value={health.storage} ok={health.storage === "blob" || health.storage === "local"} />
              <StatusRow label="Admin" value={health.admin ? "Configured" : "Not configured"} ok={health.admin} />
              <StatusRow label="Email (Resend)" value={health.email ? "Configured" : "Not configured"} ok={health.email} />
              <StatusRow
                label="Chain RPC"
                value={health.chain.online ? "Online" : health.chain.configured ? "Offline" : "Not configured"}
                ok={health.chain.online}
              />
              <StatusRow label="Last check" value={new Date(health.timestamp).toLocaleString()} ok />
            </div>
            <p className="mt-6 text-sm text-sika-cream/55">
              SikaChainDev runs locally during development. Production requires a public RPC endpoint in{" "}
              <code className="text-sika-gold">SIKACHAIN_RPC_URL</code>.
            </p>
            <Link href="/" className="mt-6 inline-block text-sm text-sika-gold hover:underline">
              ← Back to home
            </Link>
          </FadeIn>
        ) : (
          <p className="text-sm text-sika-red">Unable to load status.</p>
        )}
      </SectionBlock>
    </>
  );
}

function StatusRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="glass-inset flex items-center justify-between rounded-xl px-4 py-3">
      <span className="text-sm text-sika-cream/70">{label}</span>
      <span className="flex items-center gap-2 text-sm">
        <span
          className={`h-2 w-2 rounded-full ${ok ? "bg-sika-green-bright" : "bg-sika-gold/80"}`}
        />
        <span className="capitalize text-sika-cream">{value}</span>
      </span>
    </div>
  );
}
