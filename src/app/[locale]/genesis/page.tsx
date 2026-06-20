import type { Metadata } from "next";
import {
  AnimatedCard,
  CardGrid,
  ListCard,
  PageHero,
  SectionBlock,
} from "@/components/PageSections";
import { GlassCTA } from "@/components/ui/GlassCTA";
import { ProducerCompositionChart } from "@/components/ui/ProducerCompositionChart";
import { FadeIn } from "@/components/motion/FadeIn";
import { producerBenefits, producerComposition, selectionStages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Genesis Producer Program",
  description:
    "SikaChain is selecting 21 founding node producers to secure a blockchain settlement network for mobile money and low-cost digital transfers.",
};

export default function GenesisPage() {
  return (
    <>
      <PageHero
        eyebrow="Genesis Producer Program"
        title="Become one of the first 21 producers securing SikaChain"
        lead="SikaChain is building a serious network operated by credible organizations — infrastructure operators, fintech partners, merchant networks, regional institutions, and community organizations. Producer seats are operational infrastructure roles with governance responsibility, not passive investment products."
        imageSrc="/images/genesis-producers.png"
        primaryCta={{ href: "/apply", label: "Submit application" }}
        secondaryCta={{ href: "/producers", label: "View requirements" }}
      />

      <SectionBlock
        tag="Network composition"
        title="A balanced coalition — not crypto insiders alone"
        lead="Target 40–60 serious candidates to close 21 high-quality genesis producers, plus 10–20 standby producers."
      >
        <ProducerCompositionChart />
      </SectionBlock>

      <SectionBlock
        tag="Program purpose"
        title="Credibility from day one"
        className="border-t border-white/10 bg-black/20"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <div className="card h-full">
              <h3 className="font-display text-xl font-bold">Who we are recruiting</h3>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-sika-cream/72">
                {[
                  "Blockchain infrastructure and Antelope block producers",
                  "Fintech and mobile money operators",
                  "Payment processors and remittance companies",
                  "Regional banks, credit unions, and telecom partners",
                  "Universities, merchant associations, and economic development orgs",
                  "Cybersecurity and cloud infrastructure providers",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sika-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <ListCard title="Producer benefits" items={producerBenefits} />
        </div>
      </SectionBlock>

      <SectionBlock tag="Balanced network" title="Recommended composition of the first 21">
        <FadeIn>
          <div className="overflow-x-auto rounded-[1.35rem] border border-white/10 glass-panel">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] text-sika-gold">
                <tr>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Target</th>
                  <th className="px-5 py-4 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {producerComposition.map((row) => (
                  <tr key={row.category} className="border-t border-white/10">
                    <td className="px-5 py-4 text-sika-cream">{row.category}</td>
                    <td className="px-5 py-4 font-display font-bold text-sika-gold">{row.count}</td>
                    <td className="px-5 py-4 text-sika-cream/70">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="Selection process" title="Transparent onboarding in five stages" className="border-t border-white/10">
        <CardGrid cols={1}>
          {selectionStages.map((stage, index) => (
            <AnimatedCard key={stage.stage} className="flex gap-5">
              <span className="font-display text-2xl font-extrabold text-sika-gold/50">{index + 1}</span>
              <div>
                <h3 className="font-display text-lg font-bold">{stage.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sika-cream/70">{stage.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <GlassCTA
        tag="Testnet qualification"
        title="30–60 days on testnet before genesis selection"
        description="Prove uptime, governance participation, and security readiness before mainnet."
        primary={{ href: "/apply", label: "Start your application" }}
        secondary={{ href: "/candidates", label: "View candidate showcase" }}
      />
    </>
  );
}
