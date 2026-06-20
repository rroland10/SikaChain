import type { Metadata } from "next";
import { AnimatedCard, CardGrid, PageHero, SectionBlock } from "@/components/PageSections";
import { AnimatedTimeline } from "@/components/ui/AnimatedTimeline";
import { GlassCTA } from "@/components/ui/GlassCTA";
import { FadeIn } from "@/components/motion/FadeIn";
import { launchSequence, timeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "SikaChain 12-month go-to-market timeline from foundation through Ghana public pilot.",
};

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title="12 months from foundation to Ghana pilot"
        lead="Testnet before mainnet. Mainnet before consumer scale. Expand only when repeat transactions, agents, merchants, and fraud controls prove the model."
        imageSrc="/images/hero-ghana-mobile-money.png"
        primaryCta={{ href: "/genesis", label: "Join genesis program" }}
        secondaryCta={{ href: "/ghana", label: "Ghana launch plan" }}
      />

      <SectionBlock tag="Timeline" title="Quarter-by-quarter milestones">
        <AnimatedTimeline phases={timeline} />
      </SectionBlock>

      <SectionBlock
        tag="Launch sequence"
        title="Ten steps to market"
        className="border-t border-white/10 bg-black/20"
      >
        <CardGrid cols={2}>
          {launchSequence.map((item) => (
            <AnimatedCard key={item.step}>
              <p className="text-xs font-semibold uppercase tracking-wider text-sika-gold">
                Step {item.step}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sika-cream/65">{item.message}</p>
            </AnimatedCard>
          ))}
        </CardGrid>
      </SectionBlock>

      <SectionBlock tag="Testnet campaigns" title="Public engagement before mainnet">
        <CardGrid cols={3}>
          {[
            "Send your first SikaChain transaction",
            "Become a SikaChain testnet merchant",
            "Apply to become a standby producer",
            "Test Sika App beta",
            "Stress-test the SikaChain network",
          ].map((campaign) => (
            <AnimatedCard
              key={campaign}
              className="border-dashed border-sika-gold/30 bg-sika-gold/[0.03] text-sm font-medium text-sika-cream/80"
            >
              {campaign}
            </AnimatedCard>
          ))}
        </CardGrid>
        <FadeIn className="mt-10 text-center">
          <p className="text-sm text-sika-cream/60">
            Mainnet launch message:{" "}
            <span className="font-serif italic text-sika-gold-bright">
              SikaChain is live with 21 genesis node producers securing mobile money settlement.
            </span>
          </p>
        </FadeIn>
      </SectionBlock>

      <GlassCTA
        title="Ready to secure the network?"
        description="Join the Genesis Producer Program and help build credible mobile money infrastructure for Ghana and Africa."
        primary={{ href: "/apply", label: "Apply for genesis producer program" }}
        secondary={{ href: "/genesis", label: "Program overview" }}
      />
    </>
  );
}
