import type { Metadata } from "next";
import {
  AnimatedCard,
  CardGrid,
  ListCard,
  PageHero,
  SectionBlock,
} from "@/components/PageSections";
import { GlassCTA } from "@/components/ui/GlassCTA";
import {
  organizationalRequirements,
  producerBenefits,
  technicalRequirements,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Node Producers",
  description:
    "Technical and organizational requirements for SikaChain genesis node producers.",
};

export default function ProducersPage() {
  return (
    <>
      <PageHero
        eyebrow="Node producers"
        title="Operational infrastructure roles with governance responsibility"
        lead="Each genesis producer secures SikaChain, participates in governance, and contributes to ecosystem growth. We protect the network from weak, anonymous, or unserious operators."
        imageSrc="/images/ambient-glass-bg.png"
        primaryCta={{ href: "/apply", label: "Apply now" }}
        secondaryCta={{ href: "/genesis", label: "Genesis program overview" }}
      />

      <SectionBlock tag="Value proposition" title="Why credible organizations join">
        <ListCard title="Producer benefits" items={producerBenefits} />
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-sika-cream/65">
          Producer seats must not be marketed as passive investment products. That creates
          regulatory and reputational risk. The pitch is operational: secure a settlement
          network built for mobile money, merchant payments, and real-world digital finance.
        </p>
      </SectionBlock>

      <SectionBlock
        tag="Requirements"
        title="Technical and organizational standards"
        className="border-t border-white/10 bg-black/20"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <ListCard title="Technical requirements" items={technicalRequirements} />
          <ListCard title="Organizational requirements" items={organizationalRequirements} />
        </div>
      </SectionBlock>

      <SectionBlock
        tag="Testnet qualification"
        title="Measured before mainnet"
        lead="Candidates operate on testnet for 30–60 days. Final selection weighs performance and mission alignment."
      >
        <CardGrid cols={4}>
          {[
            "Uptime and reliability",
            "Block production performance",
            "Latency and API stability",
            "Upgrade responsiveness",
            "Governance participation",
            "Communication responsiveness",
            "Security readiness",
            "Geographic diversity",
          ].map((metric) => (
            <AnimatedCard key={metric} className="text-sm text-sika-cream/75">
              {metric}
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <GlassCTA
        title="Public producer dashboard at mainnet launch"
        description="Genesis producers receive public listing, governance rights, and early ecosystem participation. Standby producers support network resilience."
        primary={{ href: "/apply", label: "Apply as a genesis producer" }}
        secondary={{ href: "/testnet", label: "Testnet dashboard" }}
      />
    </>
  );
}
