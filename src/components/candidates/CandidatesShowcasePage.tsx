"use client";

import { useEffect, useMemo, useState } from "react";
import { CandidateCard, CandidateCTA, CandidateFilters } from "@/components/candidates/CandidateShowcase";
import { PageHero, SectionBlock } from "@/components/PageSections";
import type { ShowcaseCandidate } from "@/lib/candidates";
import { showcaseCandidates as seedCandidates } from "@/lib/candidates";

export function CandidatesShowcasePage() {
  const [filter, setFilter] = useState("All");
  const [candidates, setCandidates] = useState<ShowcaseCandidate[]>(seedCandidates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/candidates")
      .then((r) => r.json())
      .then((data: { candidates?: ShowcaseCandidate[] }) => {
        if (data.candidates?.length) setCandidates(data.candidates);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of candidates) {
      map[c.status] = (map[c.status] || 0) + 1;
    }
    return map;
  }, [candidates]);

  const filtered =
    filter === "All" ? candidates : candidates.filter((c) => c.status === filter);

  return (
    <>
      <PageHero
        eyebrow="Candidate showcase"
        title="Qualified genesis producer candidates"
        lead="SikaChain publishes qualified candidates publicly to build transparency and market confidence before final genesis selection. Profiles below represent organizations in review or active on testnet."
        imageSrc="/images/genesis-producers.png"
        primaryCta={{ href: "/apply", label: "Apply as producer" }}
        secondaryCta={{ href: "/testnet", label: "Testnet dashboard" }}
      />

      <SectionBlock
        tag="Transparency"
        title="Building credibility before mainnet"
        lead="Target 40–60 serious candidates. Showcase qualified applicants. Operate on testnet for 30–60 days. Select the final 21 based on performance and mission alignment."
      >
        {loading && (
          <p className="mb-4 text-sm text-sika-cream/50">Refreshing candidate list…</p>
        )}

        <CandidateFilters active={filter} onChange={setFilter} counts={counts} />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((candidate, i) => (
            <CandidateCard key={candidate.id} candidate={candidate} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-sika-cream/55">No candidates in this status yet.</p>
        )}

        <CandidateCTA />
      </SectionBlock>

      <SectionBlock tag="Disclaimer" title="Showcase profiles" className="border-t border-white/10 pb-24">
        <p className="max-w-3xl text-sm leading-relaxed text-sika-cream/55">
          Seed profiles illustrate the Genesis Producer Program recruitment phase. Applications promoted
          by the review team appear here automatically. Final genesis selection follows testnet
          qualification and governance review.
        </p>
      </SectionBlock>
    </>
  );
}
