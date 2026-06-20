import type { Metadata } from "next";
import { AnimatedCard, CardGrid, PageHero, SectionBlock } from "@/components/PageSections";
import { governanceEntities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Governance",
  description: "SikaChain governance structure: producers, foundation, commercial entity, and oversight.",
};

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Clean structure from day one"
        lead="The chain, app, treasury, and governance should not all appear controlled by one centralized actor. SikaChain separates protocol stewardship, commercial product development, and independent oversight."
        imageSrc="/images/ambient-glass-bg.png"
      />

      <SectionBlock tag="Structure" title="Four pillars of governance">
        <CardGrid cols={2}>
          {governanceEntities.map((entity) => (
            <AnimatedCard key={entity.name}>
              <h3 className="font-display text-xl font-bold text-sika-gold">{entity.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/70">{entity.role}</p>
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <SectionBlock
        tag="Token utility"
        title="Native token powers the network — not everyday users"
        lead="SIKA can support producer staking, network fees, governance, rewards, and ecosystem grants. Sika App users should see stable local balances, not volatile crypto assets."
        className="border-t border-white/10 bg-black/20"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedCard>
            <h3 className="font-display text-lg font-bold">For the network</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-sika-cream/70">
              {[
                "Producer staking and block rewards",
                "Transaction fees and anti-spam resources",
                "Governance voting and ecosystem grants",
                "Merchant, agent, and developer incentives",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-sika-gold">→</span> {item}
                </li>
              ))}
            </ul>
          </AnimatedCard>
          <AnimatedCard className="border-sika-green/25 glow-green">
            <h3 className="font-display text-lg font-bold">For Sika App users</h3>
            <p className="mt-4 text-sm leading-relaxed text-sika-cream/70">
              Users should say &ldquo;I sent ₵200&rdquo; or &ldquo;I sent $20&rdquo; — not
              &ldquo;I sent 127.4 SIKA tokens and paid gas.&rdquo; Stable-value UX through
              local currency, regulated e-money, or stablecoin-backed balances.
            </p>
          </AnimatedCard>
        </div>
      </SectionBlock>

      <SectionBlock tag="Mainnet readiness" title="Governance portal at launch">
        <CardGrid cols={3}>
          {[
            "Producer dashboard and standby list",
            "Governance portal for upgrades",
            "Public documentation and fee model",
            "Security audit and testnet report",
            "Ecosystem grant program",
            "Compliance memo and oversight committee",
          ].map((item) => (
            <AnimatedCard key={item} className="text-sm text-sika-cream/75">
              {item}
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>
    </>
  );
}
