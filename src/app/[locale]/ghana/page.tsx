import type { Metadata } from "next";
import { AnimatedCard, CardGrid, PageHero, SectionBlock, StatCard } from "@/components/PageSections";
import { GlassCTA } from "@/components/ui/GlassCTA";
import { LuxuryImageFrame } from "@/components/ui/LuxuryImageFrame";
import { FadeIn } from "@/components/motion/FadeIn";
import { ghanaStrategy, sikaAppFeatures } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ghana Launch",
  description:
    "SikaChain and Sika App launch first in Ghana — mobile money, merchants, agents, and remittance corridors before expansion across Africa.",
};

export default function GhanaPage() {
  return (
    <>
      <PageHero
        eyebrow="Ghana first"
        title={ghanaStrategy.headline}
        lead={ghanaStrategy.intro}
        imageSrc="/images/hero-ghana-mobile-money.png"
        primaryCta={{ href: "/sika-app", label: "About Sika App" }}
        secondaryCta={{ href: "/apply", label: "Partner with us" }}
      />

      <SectionBlock tag="Rollout options" title="Three paths to density — pick one, go deep">
        <CardGrid cols={3}>
          {ghanaStrategy.rollout.map((option) => (
            <AnimatedCard key={option.title} className="h-full">
              <h3 className="font-display text-lg font-bold">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/70">{option.description}</p>
            </AnimatedCard>
          ))}
        </CardGrid>
        <FadeIn className="mt-8 max-w-3xl text-sm leading-relaxed text-sika-cream/65">
          Do not start with a vague global app launch. Build density in one Ghanaian city,
          one remittance corridor, or one closed community before national expansion — then
          export the playbook across Africa.
        </FadeIn>
      </SectionBlock>

      <SectionBlock
        tag="Ecosystem building"
        title="Agents, merchants, and stable balances"
        className="border-t border-white/10 bg-black/20"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <AnimatedCard>
              <h3 className="font-display text-xl font-bold">Agent network</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/70">
                Convenience stores, pharmacies, phone shops, money-transfer shops, and market
                kiosks enable cash-in, cash-out, onboarding, and local trust.
              </p>
            </AnimatedCard>
            <AnimatedCard>
              <h3 className="font-display text-xl font-bold">Merchant density</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/70">
                Target high-frequency businesses: food vendors, groceries, pharmacies, transport,
                airtime sellers — instant payments without blockchain wallet complexity.
              </p>
            </AnimatedCard>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ghanaStrategy.targets.map((target) => (
                <li key={target} className="flex gap-2 text-sm text-sika-cream/75">
                  <span className="text-sika-green-bright">✓</span> {target}
                </li>
              ))}
            </ul>
          </div>
          <LuxuryImageFrame
            src="/images/hero-ghana-mobile-money.png"
            alt="Mobile money in Ghana"
            caption="Ghana-first density: agents, merchants, and stable local balances."
          />
        </div>
      </SectionBlock>

      <SectionBlock tag="Pilot targets" title="Months 9–12 public pilot metrics">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value="10K–50K" label="Registered users" />
          <StatCard value="100–500" label="Active merchants" />
          <StatCard value="50–200" label="Cash agents" />
          <StatCard value="High" label="Repeat tx rate" detail="The metric that matters" />
        </div>
      </SectionBlock>

      <SectionBlock tag="Consumer message" title="What Ghana users will hear">
        <FadeIn>
          <blockquote className="glass-panel glow-gold p-8 font-serif text-2xl italic leading-relaxed text-sika-gold-bright md:p-10 md:text-3xl">
            Send money instantly. Pay merchants. Cash in and cash out nearby.
          </blockquote>
        </FadeIn>
        <CardGrid cols={2}>
          {sikaAppFeatures.slice(0, 6).map((feature) => (
            <AnimatedCard key={feature} className="text-sm">
              {feature}
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <GlassCTA
        title="Build the first dense market in Ghana"
        description="Partner as a genesis producer, merchant, agent network, or pilot community — then export the playbook across Africa."
        primary={{ href: "/apply", label: "Partner with us" }}
        secondary={{ href: "/sika-app", label: "Explore Sika App" }}
      />
    </>
  );
}
