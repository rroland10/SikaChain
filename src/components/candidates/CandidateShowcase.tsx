"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ShowcaseCandidate } from "@/lib/candidates";
import { FadeIn } from "@/components/motion/FadeIn";

const statusStyles: Record<ShowcaseCandidate["status"], string> = {
  Qualified: "border-sika-green/30 bg-sika-green/10 text-sika-green-bright",
  "Testnet active": "border-sika-gold/30 bg-sika-gold/10 text-sika-gold",
  "Under review": "border-white/15 bg-white/5 text-sika-cream/70",
};

export function CandidateCard({ candidate, index }: { candidate: ShowcaseCandidate; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <FadeIn delay={index * 0.05}>
      <motion.article
        whileHover={reduceMotion ? undefined : { y: -4 }}
        className="card glow-green flex h-full flex-col"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sika-gold">
              {candidate.category}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold">{candidate.name}</h3>
          </div>
          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusStyles[candidate.status]}`}
          >
            {candidate.status}
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-sika-cream/72">{candidate.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {candidate.focus.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-sika-cream/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-sika-cream/50">
          <span>
            {candidate.jurisdiction} · {candidate.region}
          </span>
          {candidate.website && (
            <span className="text-sika-cream/35">Profile verified</span>
          )}
        </div>
      </motion.article>
    </FadeIn>
  );
}

export function CandidateFilters({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (status: string) => void;
  counts: Record<string, number>;
}) {
  const filters = ["All", "Qualified", "Testnet active", "Under review"];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
            active === f
              ? "border-sika-gold/40 bg-sika-gold/15 text-sika-gold"
              : "border-white/10 bg-white/[0.03] text-sika-cream/60 hover:border-sika-gold/25"
          }`}
        >
          {f}
          {f !== "All" && counts[f] !== undefined && (
            <span className="ml-1.5 opacity-60">({counts[f]})</span>
          )}
        </button>
      ))}
    </div>
  );
}

export function CandidateCTA() {
  return (
    <div className="glass-panel glow-gold mt-12 p-8 text-center md:p-10">
      <p className="section-tag mb-3">Join the coalition</p>
      <h3 className="font-display text-2xl font-bold">Apply to become a genesis producer</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sika-cream/65">
        Showcase profiles represent qualified candidates under review or active on testnet. Submit
        your organization to join the Genesis Producer Program.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link href="/apply" className="btn-primary btn-shine">
          Apply now
        </Link>
        <Link href="/producers" className="btn-secondary glass-button">
          View requirements
        </Link>
      </div>
    </div>
  );
}
