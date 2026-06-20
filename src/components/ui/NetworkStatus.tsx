"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

type NetworkState = {
  online: boolean;
  rpc?: string;
  chainId?: string;
  headBlock?: number;
  lib?: number;
  version?: string;
};

export function NetworkStatus() {
  const [state, setState] = useState<NetworkState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/network");
        const data = (await res.json()) as NetworkState;
        if (!cancelled) setState(data);
      } catch {
        if (!cancelled) setState({ online: false });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const id = window.setInterval(load, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <FadeIn>
      <div className="glass-panel glow-green flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-start gap-4">
          <span
            className={`mt-1 flex h-3 w-3 shrink-0 rounded-full ${
              loading ? "animate-pulse bg-sika-gold/50" : state?.online ? "bg-sika-green-bright shadow-[0_0_12px_rgba(31,165,107,0.6)]" : "bg-sika-red/80"
            }`}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sika-gold">
              Dev network
            </p>
            <h3 className="font-display text-xl font-bold">
              {loading ? "Checking SikaChainDev…" : state?.online ? "SikaChainDev online" : "SikaChainDev offline"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-sika-cream/65">
              {state?.online
                ? "Local Spring node is producing blocks. Connect wallets and Sika App to the dev RPC."
                : "Start the local chain with sikachaindev/scripts/start-all.sh in the Spring repo."}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm md:min-w-[280px]">
          <div className="glass-inset rounded-xl px-4 py-3">
            <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">Head block</dt>
            <dd className="font-display text-lg font-bold text-sika-gold">
              {state?.online ? state.headBlock?.toLocaleString() : "—"}
            </dd>
          </div>
          <div className="glass-inset rounded-xl px-4 py-3">
            <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">LIB</dt>
            <dd className="font-display text-lg font-bold text-sika-gold">
              {state?.online ? state.lib?.toLocaleString() : "—"}
            </dd>
          </div>
          <div className="glass-inset col-span-2 rounded-xl px-4 py-3">
            <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">RPC</dt>
            <dd className="truncate font-mono text-xs text-sika-cream/70">{state?.rpc || "http://127.0.0.1:8888"}</dd>
          </div>
        </dl>

        {state?.online && (
          <div className="flex flex-wrap gap-3 md:flex-col">
            <Link href="/explorer" className="btn-secondary glass-button text-xs">
              Block explorer
            </Link>
            <Link href="/testnet" className="btn-secondary glass-button text-xs">
              Testnet dashboard
            </Link>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
