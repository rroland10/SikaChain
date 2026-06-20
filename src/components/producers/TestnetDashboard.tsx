"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";

type ProducerMetric = {
  name: string;
  status: "active" | "standby" | "offline";
  blocksProduced?: number;
  lastBlockAgeSec?: number;
  uptimePct?: number;
  region?: string;
};

type PerformanceData = {
  online: boolean;
  rpc?: string;
  headBlock?: number;
  lib?: number;
  version?: string;
  lastBlockAgeSec?: number;
  producers: ProducerMetric[];
  metrics?: { avgUptime: number; activeCount: number; standbyCount: number };
};

const statusColor = {
  active: "text-sika-green-bright border-sika-green/30 bg-sika-green/10",
  standby: "text-sika-gold border-sika-gold/30 bg-sika-gold/10",
  offline: "text-sika-red border-sika-red/20 bg-sika-red/10",
};

export function TestnetDashboard() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/producers/performance");
        setData(await res.json());
      } catch {
        setData({ online: false, producers: [] });
      } finally {
        setLoading(false);
      }
    }
    load();
    const id = window.setInterval(load, 12000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Testnet"
        title="Producer performance dashboard"
        lead="Monitor block production, uptime signals, and testnet qualification metrics before genesis selection. Live data from SikaChainDev when the local Spring node is running."
        imageSrc="/images/ambient-glass-bg.png"
        primaryCta={{ href: "/candidates", label: "Candidate showcase" }}
        secondaryCta={{ href: "/apply", label: "Apply as producer" }}
      />

      <SectionBlock tag="Network" title="SikaChainDev status">
        <FadeIn>
          <div className="glass-panel glow-green grid gap-6 p-6 md:grid-cols-4 md:p-8">
            <Metric label="Status" value={loading ? "…" : data?.online ? "Online" : "Offline"} highlight={data?.online} />
            <Metric label="Head block" value={data?.headBlock?.toLocaleString() ?? "—"} />
            <Metric label="LIB" value={data?.lib?.toLocaleString() ?? "—"} />
            <Metric
              label="Last block"
              value={data?.lastBlockAgeSec !== undefined ? `${data.lastBlockAgeSec}s ago` : "—"}
            />
          </div>
        </FadeIn>

        {!loading && !data?.online && (
          <p className="mt-4 text-sm text-sika-cream/60">
            Start SikaChainDev:{" "}
            <code className="text-sika-gold">sikachaindev/scripts/start-all.sh</code> in the Spring repo.
          </p>
        )}
      </SectionBlock>

      <SectionBlock
        tag="Producers"
        title="Testnet qualification metrics"
        lead="Candidates on testnet are measured for uptime, block production, latency, and governance participation over 30–60 days."
        className="border-t border-white/10 bg-black/20"
      >
        <FadeInStagger className="grid gap-4 md:grid-cols-2">
          {(data?.producers ?? []).map((p) => (
            <FadeInItem key={p.name}>
              <div className="card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold">{p.name}</p>
                    <p className="mt-1 text-xs text-sika-cream/50">{p.region}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="glass-inset rounded-xl py-3">
                    <p className="text-[10px] uppercase tracking-wider text-sika-cream/45">Uptime</p>
                    <p className="font-display text-lg font-bold text-sika-gold">
                      {p.uptimePct !== undefined ? `${p.uptimePct}%` : "—"}
                    </p>
                  </div>
                  <div className="glass-inset rounded-xl py-3">
                    <p className="text-[10px] uppercase tracking-wider text-sika-cream/45">Blocks</p>
                    <p className="font-display text-lg font-bold text-sika-gold">
                      {p.blocksProduced?.toLocaleString() ?? "—"}
                    </p>
                  </div>
                  <div className="glass-inset rounded-xl py-3">
                    <p className="text-[10px] uppercase tracking-wider text-sika-cream/45">Latency</p>
                    <p className="font-display text-lg font-bold text-sika-gold">
                      {p.lastBlockAgeSec !== undefined ? `${p.lastBlockAgeSec}s` : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {!loading && (data?.producers?.length ?? 0) === 0 && (
          <p className="text-sm text-sika-cream/50">No producer data available.</p>
        )}

        {data?.metrics && (
          <FadeIn className="mt-8">
            <div className="glass-panel flex flex-wrap gap-8 p-6 text-sm">
              <span>
                Active producers: <strong className="text-sika-gold">{data.metrics.activeCount}</strong>
              </span>
              <span>
                Standby: <strong className="text-sika-gold">{data.metrics.standbyCount}</strong>
              </span>
              <span>
                Avg uptime: <strong className="text-sika-gold">{data.metrics.avgUptime.toFixed(1)}%</strong>
              </span>
              <Link href="/producers" className="text-sika-gold hover:underline">
                Producer requirements →
              </Link>
            </div>
          </FadeIn>
        )}
      </SectionBlock>
    </>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-sika-cream/45">{label}</p>
      <p className={`font-display text-2xl font-bold ${highlight ? "text-sika-green-bright" : "text-sika-gold"}`}>
        {value}
      </p>
    </div>
  );
}
