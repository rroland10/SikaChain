import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { docsSections } from "@/lib/docs-content";
import { chainConfig } from "@/lib/chain-client";

export const metadata: Metadata = {
  title: "Documentation",
  description: "SikaChain documentation — genesis program, testnet, governance, Ghana launch, and developer resources.",
};

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Everything you need to launch with SikaChain"
        lead="Network positioning, producer onboarding, testnet qualification, Ghana rollout, and developer resources — organized for partners, producers, and builders."
        primaryCta={{ href: "/genesis", label: "Genesis program" }}
        secondaryCta={{ href: "/apply", label: "Apply as producer" }}
      />

      <SectionBlock tag="Quick reference" title="SikaChainDev configuration">
        <FadeIn>
          <div className="glass-panel glow-green grid gap-4 p-6 text-sm md:grid-cols-2 md:p-8">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sika-gold">Chain name</p>
              <p className="font-display text-lg font-bold">{chainConfig.name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sika-gold">RPC</p>
              <p className="font-mono text-xs text-sika-cream/70">{chainConfig.rpcUrl}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sika-gold">Native token</p>
              <p>{chainConfig.symbol}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sika-gold">First market</p>
              <p>{chainConfig.launchMarket}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-sika-gold">Chain ID</p>
              <p className="break-all font-mono text-xs text-sika-cream/70">{chainConfig.chainId}</p>
            </div>
          </div>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="Guides" title="Documentation hub" className="border-t border-white/10">
        <FadeInStagger className="grid gap-8 md:grid-cols-2">
          {docsSections.map((section) => (
            <FadeInItem key={section.title}>
              <div className="card h-full">
                <h3 className="font-display text-xl font-bold text-sika-gold">{section.title}</h3>
                <ul className="mt-5 space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {"external" in item && item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          <p className="font-semibold text-sika-cream group-hover:text-sika-gold">
                            {item.label} ↗
                          </p>
                          <p className="text-sm text-sika-cream/55">{item.description}</p>
                        </a>
                      ) : (
                        <Link href={item.href} className="group block">
                          <p className="font-semibold text-sika-cream group-hover:text-sika-gold">
                            {item.label}
                          </p>
                          <p className="text-sm text-sika-cream/55">{item.description}</p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </SectionBlock>
    </>
  );
}
