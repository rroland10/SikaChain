import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { CopyButton } from "@/components/ui/CopyButton";
import { readSiteContent } from "@/lib/cms/site-content-store";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "SikaChain brand assets, positioning, and launch messaging for media and partners.",
};

const brandAssets = [
  { href: "/brand/sika-logo-horizontal.svg", label: "Logo — horizontal", type: "SVG" },
  { href: "/brand/sika-logo-stacked.svg", label: "Logo — stacked", type: "SVG" },
  { href: "/brand/sika-logomark.svg", label: "Logomark — full color", type: "SVG" },
  { href: "/brand/sika-logomark-mono.svg", label: "Logomark — mono", type: "SVG" },
  { href: "/brand/sika-app-icon.svg", label: "Sika App icon", type: "SVG" },
  { href: "/brand/sika-favicon.svg", label: "Favicon", type: "SVG" },
] as const;

export default async function PressPage() {
  const { press, announce } = await readSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Press kit"
        title="Media & partner resources"
        lead="Brand assets, positioning language, and official messaging for journalists, partners, and ecosystem collaborators."
        imageSrc="/images/ambient-glass-bg.png"
        primaryCta={{ href: "/announce", label: "Launch announcement" }}
        secondaryCta={{ href: "/genesis", label: "Genesis program" }}
      />

      <SectionBlock tag="Boilerplate" title="Company description">
        <FadeIn>
          <div className="glass-panel glow-gold p-8 md:p-10">
            <p className="leading-relaxed text-sika-cream/78">{press.boilerplate}</p>
            <CopyButton text={press.boilerplate} label="Copy boilerplate" />
          </div>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="Messaging" title="Key positioning" className="border-t border-white/10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card border-sika-green/25">
            <p className="text-xs font-semibold uppercase tracking-wider text-sika-green-bright">Infrastructure</p>
            <p className="mt-3 text-sm leading-relaxed text-sika-cream/75">{announce.infrastructureMessage}</p>
          </div>
          <div className="card border-sika-gold/25">
            <p className="text-xs font-semibold uppercase tracking-wider text-sika-gold">Consumer (Sika App)</p>
            <p className="mt-3 text-sm leading-relaxed text-sika-cream/75">{announce.consumerMessage}</p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock tag="Assets" title="Brand downloads" className="border-t border-white/10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandAssets.map((asset) => (
            <a
              key={asset.href}
              href={asset.href}
              download
              className="card group flex items-center gap-4 p-5 transition hover:border-sika-gold/30"
            >
              <div className="relative h-14 w-14 shrink-0 rounded-xl bg-white/5 p-2">
                <Image src={asset.href} alt="" fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-display text-sm font-bold group-hover:text-sika-gold">{asset.label}</p>
                <p className="text-xs text-sika-cream/50">{asset.type} · Download</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-sika-cream/55">
          Full brand guidelines and additional formats: local repo{" "}
          <code className="text-sika-gold">../SikaChain logo/</code>
        </p>
      </SectionBlock>

      <SectionBlock tag="Contact" title="Media inquiries" className="border-t border-white/10 bg-black/20 pb-24">
        <FadeIn>
          <div className="glass-panel flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm leading-relaxed text-sika-cream/70">{press.mediaContact}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply" className="btn-primary btn-shine text-sm">
                Producer application
              </Link>
              <Link href="/announce" className="btn-secondary glass-button text-sm">
                Read announcement
              </Link>
            </div>
          </div>
        </FadeIn>
      </SectionBlock>
    </>
  );
}
