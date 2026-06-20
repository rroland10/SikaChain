import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedCard, CardGrid, SectionBlock } from "@/components/PageSections";
import { GlassCTA } from "@/components/ui/GlassCTA";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { FadeIn } from "@/components/motion/FadeIn";
import { positioning, sikaAppFeatures } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sika App",
  description:
    "Sika App is mobile money powered by SikaChain — send, receive, pay merchants, and cash in/out through local agents.",
};

export default function SikaAppPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <FadeIn>
            <p className="section-tag mb-5 inline-flex rounded-full glass-chip px-4 py-2">Sika App</p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Mobile money —{" "}
              <span className="font-serif italic text-sika-gold-bright">not a crypto wallet</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sika-cream/72">{positioning.sikaApp}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/ghana" className="btn-primary btn-shine">
                Ghana rollout plan
              </Link>
              <Link href="http://localhost:3003" className="btn-secondary glass-button">
                Open dev app
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <PhoneMockup />
          </FadeIn>
        </div>
      </section>

      <SectionBlock tag="Positioning" title="Cash App + M-Pesa + local merchant payments">
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedCard className="border-sika-red/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-sika-red">Do not say</p>
            <p className="mt-3 font-display text-lg font-bold">
              &ldquo;Sika App is a crypto wallet.&rdquo;
            </p>
          </AnimatedCard>
          <AnimatedCard className="border-sika-green/30 glow-green">
            <p className="text-xs font-semibold uppercase tracking-wider text-sika-green-bright">
              Say instead
            </p>
            <p className="mt-3 font-display text-lg font-bold">
              Send money. Pay merchants. Cash in. Cash out. Low fees.
            </p>
          </AnimatedCard>
        </div>
      </SectionBlock>

      <SectionBlock
        tag="v1 features"
        title="Simple, reliable money movement"
        lead="No DeFi, NFTs, staking, or token speculation in v1. Solve basic money movement first."
        className="border-t border-white/10 bg-black/20"
      >
        <CardGrid cols={3}>
          {sikaAppFeatures.map((feature) => (
            <AnimatedCard key={feature} className="text-sm text-sika-cream/80">
              {feature}
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <SectionBlock tag="Growth loops" title="Built-in adoption mechanics">
        <CardGrid cols={2}>
          {[
            {
              title: "Send-and-claim",
              body: "User A sends to User B. B downloads to claim, gets a first-transaction reward, and sends onward.",
            },
            {
              title: "Merchant discounts",
              body: "Cashback or discounts for paying selected merchants with Sika App.",
            },
            {
              title: "Agent onboarding",
              body: "Agents earn bonuses for verified users who complete a first transaction.",
            },
            {
              title: "Remittance conversion",
              body: "Recipients spend at local merchants instead of immediately cashing out — value stays in the ecosystem.",
            },
          ].map((loop) => (
            <AnimatedCard key={loop.title}>
              <h3 className="font-display text-lg font-bold text-sika-gold">{loop.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sika-cream/70">{loop.body}</p>
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <SectionBlock tag="Trust & compliance" title="Safe by design">
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedCard>
            <h3 className="font-display text-lg font-bold">Trust features</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-sika-cream/70">
              {[
                "PIN and biometric login, account recovery",
                "Clear receipts and transaction notifications",
                "Verified agents and merchants",
                "Transparent fees and dispute support",
                "No seed phrases for mainstream users",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-sika-gold">→</span> {item}
                </li>
              ))}
            </ul>
          </AnimatedCard>
          <AnimatedCard>
            <h3 className="font-display text-lg font-bold">Compliance approach</h3>
            <p className="mt-4 text-sm leading-relaxed text-sika-cream/70">
              Partner with licensed money transmitters, banking-as-a-service providers, KYC/AML
              vendors, and local fintech license holders. Sika App owns the customer experience;
              regulated partners handle licensed financial activities.
            </p>
          </AnimatedCard>
        </div>
      </SectionBlock>

      <GlassCTA
        tag="Relationship"
        title="SikaChain = infrastructure · Sika App = product"
        description="This site covers the network and genesis program. The consumer mobile money experience lives in Sika App — launching in Ghana first."
        primary={{ href: "/ghana", label: "Ghana launch strategy" }}
        secondary={{ href: "/", label: "Back to SikaChain" }}
      />
    </>
  );
}
