"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { ecosystemStack, getSikaAppUrl, localDevUrls } from "@/lib/ecosystem";

export function EcosystemStack() {
  const sikaAppUrl = getSikaAppUrl();

  return (
    <FadeIn>
      <div className="glass-panel glow-green p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sika-gold">
              Ecosystem stack
            </p>
            <p className="mt-2 text-sm text-sika-cream/65">
              Local dev ports when running the full SikaChain monorepo on your machine.
            </p>
          </div>
          <Link href="/developers" className="text-sm font-semibold text-sika-gold hover:underline">
            Developer setup →
          </Link>
        </div>

        <div className="space-y-3">
          {ecosystemStack.map((item) => (
            <div
              key={item.name}
              className="glass-inset flex flex-col gap-2 rounded-xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded bg-sika-gold/15 px-2 py-0.5 font-mono text-[10px] font-bold text-sika-gold">
                  {item.layer}
                </span>
                <div>
                  <p className="font-display font-bold text-sika-cream">{item.name}</p>
                  <p className="text-xs text-sika-cream/55">{item.description}</p>
                </div>
              </div>
              {"port" in item && item.port && (
                <span className="font-mono text-xs text-sika-cream/45">:{item.port}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <a href={sikaAppUrl} className="btn-secondary glass-button text-xs" target="_blank" rel="noopener noreferrer">
            Open Sika App ↗
          </a>
          <Link href="/explorer" className="btn-secondary glass-button text-xs">
            Block explorer
          </Link>
          <Link href="/apply" className="btn-primary btn-shine text-xs">
            Apply as producer
          </Link>
        </div>

        <dl className="mt-6 grid gap-3 text-xs sm:grid-cols-2">
          <div>
            <dt className="text-sika-cream/45">Chain RPC</dt>
            <dd className="font-mono text-sika-cream/70">{localDevUrls.chain}</dd>
          </div>
          <div>
            <dt className="text-sika-cream/45">Sika App</dt>
            <dd className="font-mono text-sika-cream/70">{localDevUrls.sikaApp}</dd>
          </div>
        </dl>
      </div>
    </FadeIn>
  );
}
