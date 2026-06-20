import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { FadeIn } from "@/components/motion/FadeIn";
import { announceContent } from "@/lib/docs-content";

export const metadata: Metadata = {
  title: "Launch Announcement",
  description: "Official SikaChain launch messaging — mobile money settlement network launching in Ghana.",
};

export default function AnnouncePage() {
  return (
    <>
      <PageHero
        eyebrow="Press & launch"
        title={announceContent.headline}
        lead={announceContent.subheadline}
        imageSrc="/images/hero-ghana-mobile-money.png"
        primaryCta={{ href: "/genesis", label: "Genesis program" }}
        secondaryCta={{ href: "/docs", label: "Documentation" }}
      />

      <SectionBlock tag="Announcement" title="Official launch message">
        <FadeIn>
          <article className="glass-panel glow-gold space-y-6 p-8 md:p-10">
            {announceContent.body.split("\n\n").map((para) => (
              <p key={para.slice(0, 40)} className="leading-relaxed text-sika-cream/78">
                {para}
              </p>
            ))}
          </article>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="Messaging" title="What to say" className="border-t border-white/10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card border-sika-green/25 glow-green">
            <p className="text-xs font-semibold uppercase tracking-wider text-sika-green-bright">
              Consumer message
            </p>
            <p className="mt-4 font-display text-xl font-bold leading-snug">
              {announceContent.consumerMessage}
            </p>
            <p className="mt-4 text-sm italic text-sika-cream/60">{announceContent.infrastructureMessage}</p>
          </div>
          {announceContent.quotes.map((q) => (
            <div key={q.role} className="card">
              <p className="text-xs font-semibold uppercase tracking-wider text-sika-gold">{q.role}</p>
              <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-sika-gold-bright">
                &ldquo;{q.text}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock tag="Next steps" title="Launch sequence" className="border-t border-white/10 pb-24">
        <ol className="space-y-4">
          {[
            "Announce SikaChain as mobile money settlement infrastructure",
            "Launch the Genesis Producer Program — recruit 21 credible producers",
            "Publish qualified candidates and run public testnet",
            "Launch mainnet with explorer, governance portal, and producer dashboard",
            "Open Sika App private beta in Ghana",
          ].map((step, i) => (
            <li key={step} className="card flex gap-4">
              <span className="font-display text-2xl font-extrabold text-sika-gold/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-sika-cream/75">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/roadmap" className="btn-primary btn-shine">
            Full 12-month roadmap
          </Link>
          <Link href="/apply" className="btn-secondary glass-button">
            Apply as producer
          </Link>
        </div>
      </SectionBlock>
    </>
  );
}
