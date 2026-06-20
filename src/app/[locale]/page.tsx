import { Link } from "@/i18n/navigation";
import { HeroCinematic } from "@/components/ui/HeroCinematic";
import { LuxuryImageFrame } from "@/components/ui/LuxuryImageFrame";
import { MetricsTicker } from "@/components/ui/MetricsTicker";
import { NetworkStatus } from "@/components/ui/NetworkStatus";
import { EcosystemStack } from "@/components/ui/EcosystemStack";
import { ProducerCompositionChart } from "@/components/ui/ProducerCompositionChart";
import {
  AnimatedCard,
  CardGrid,
  SectionBlock,
  StatCard,
  StatGrid,
} from "@/components/PageSections";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { readSiteContentSection } from "@/lib/cms/site-content-store";
import type { Locale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import {
  launchSequence,
  producerComposition,
  timeline,
} from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const home = await readSiteContentSection("home", locale);

  return (
    <>
      <HeroCinematic
        eyebrow={home.eyebrow}
        title={
          <>
            Settlement for{" "}
            <span className="text-sika-green-bright">{home.heroHighlight}</span>
          </>
        }
        subtitle={home.subtitle}
        description={home.description}
        primaryCta={{ href: "/genesis", label: "Genesis Producer Program" }}
        secondaryCta={{ href: "/ghana", label: "Ghana launch strategy" }}
      />

      <MetricsTicker />

      <SectionBlock
        tag="Positioning"
        title={home.positioningTitle}
        lead={home.positioningLead}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <FadeInStagger className="space-y-5">
            <AnimatedCard>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sika-gold">SikaChain</p>
              <h3 className="mt-3 font-display text-xl font-bold">The network</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/72">{home.sikaChainThesis}</p>
            </AnimatedCard>
            <AnimatedCard className="border-sika-green/25 glow-green">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sika-green-bright">Sika App</p>
              <h3 className="mt-3 font-display text-xl font-bold">The product</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/72">{home.sikaAppDescription}</p>
              <Link href="/sika-app" className="mt-5 inline-flex text-sm font-semibold text-sika-gold hover:underline">
                Learn about Sika App →
              </Link>
            </AnimatedCard>
            <AnimatedCard>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sika-gold">Genesis producers</p>
              <h3 className="mt-3 font-display text-xl font-bold">The trust layer</h3>
              <p className="mt-3 text-sm leading-relaxed text-sika-cream/72">{home.producersDescription}</p>
              <Link href="/producers" className="mt-5 inline-flex text-sm font-semibold text-sika-gold hover:underline">
                Producer requirements →
              </Link>
            </AnimatedCard>
          </FadeInStagger>

          <LuxuryImageFrame
            src="/images/genesis-producers.png"
            alt="Institutional partners collaborating on SikaChain"
            caption="Genesis producers bring infrastructure, finance, and community credibility — not speculation."
          />
        </div>
      </SectionBlock>

      <SectionBlock
        tag="Dev network"
        title="SikaChainDev — local settlement layer"
        lead="The marketing site connects to your local Spring node when running. Start nodeos via sikachaindev in the Spring repo."
        className="border-t border-white/10"
      >
        <NetworkStatus />
        <div className="mt-8">
          <EcosystemStack />
        </div>
      </SectionBlock>

      <SectionBlock
        tag="Genesis program"
        title="Recruiting 21 founding node producers"
        lead="Target 40–60 serious candidates. Build a coalition of infrastructure, financial, merchant, and community partners."
        className="border-t border-white/10 bg-black/20"
      >
        <FadeIn>
          <ProducerCompositionChart />
        </FadeIn>
        <div className="mt-10">
          <CardGrid>
            {producerComposition.map((row) => (
              <AnimatedCard key={row.category}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-bold leading-snug">{row.category}</h3>
                  <span className="shrink-0 rounded-full bg-sika-gold/15 px-3 py-1 text-sm font-bold text-sika-gold">
                    {row.count}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-sika-cream/65">{row.purpose}</p>
              </AnimatedCard>
            ))}
          </CardGrid>
        </div>
        <FadeIn className="mt-12 text-center">
          <Link href="/apply" className="btn-primary btn-shine">
            Apply to the Genesis Producer Program
          </Link>
          <p className="mt-4">
            <Link href="/candidates" className="text-sm font-semibold text-sika-gold hover:underline">
              View qualified candidate showcase →
            </Link>
          </p>
        </FadeIn>
      </SectionBlock>

      <SectionBlock
        tag="Launch sequence"
        title="From announcement to Ghana pilot"
        lead="A disciplined sequence that proves credibility before consumer scale."
      >
        <CardGrid cols={2}>
          {launchSequence.slice(0, 6).map((item) => (
            <AnimatedCard key={item.step} className="flex gap-5">
              <span className="font-display text-3xl font-extrabold text-sika-gold/35">
                {String(item.step).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sika-cream/65">{item.message}</p>
              </div>
            </AnimatedCard>
          ))}
        </CardGrid>
        <FadeIn className="mt-10 text-center">
          <Link href="/roadmap" className="text-sm font-semibold text-sika-gold hover:underline">
            View full 12-month roadmap →
          </Link>
        </FadeIn>
      </SectionBlock>

      <SectionBlock
        tag="Timeline"
        title="12-month go-to-market"
        lead="Foundation through Ghana public pilot."
        className="border-t border-white/10 bg-black/20"
      >
        <div className="space-y-5">
          {timeline.map((phase) => (
            <FadeIn key={phase.period}>
              <div className="card md:flex md:gap-10">
                <div className="md:w-44 md:shrink-0">
                  <p className="text-sm font-semibold text-sika-gold">{phase.period}</p>
                  <p className="font-display text-lg font-bold">{phase.title}</p>
                </div>
                <ul className="mt-4 space-y-2.5 md:mt-0">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-sika-cream/72">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sika-green-bright" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionBlock>

      <section className="relative overflow-hidden border-t border-white/10 px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-sika-gold/[0.04] to-transparent" />
        <div className="relative mx-auto max-w-6xl text-center">
          <FadeIn>
            <p className="section-tag mb-5">The winning formula</p>
            <blockquote className="mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed text-sika-gold-bright md:text-[2rem] md:leading-snug">
              Credible 21 node producers + regulated-friendly mobile money + agent network +
              merchant density + stable-value balances + invisible blockchain infrastructure.
            </blockquote>
          </FadeIn>
          <StatGrid>
            <StatCard value="21" label="Genesis producers" detail="Institutional trust layer" />
            <StatCard value="GH" label="First launch market" detail="Then export across Africa" />
            <StatCard value="∞" label="Repeat transactions" detail="The metric that matters" />
          </StatGrid>
        </div>
      </section>
    </>
  );
}
