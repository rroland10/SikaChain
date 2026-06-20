import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { FadeIn } from "@/components/motion/FadeIn";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { devQuickStart, sikaChainDev } from "@/lib/chain-constants";
import { chainConfig } from "@/lib/chain-client";

export const metadata: Metadata = {
  title: "Developer Quickstart",
  description: "Connect to SikaChainDev — RPC, chain ID, WharfKit, cleos, and local Spring node setup.",
};

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Build on SikaChainDev"
        lead="Local Spring node, RPC endpoints, and client SDK setup for partners integrating with the SikaChain settlement network."
        imageSrc="/images/ambient-glass-bg.png"
        primaryCta={{ href: "/explorer", label: "Block explorer" }}
        secondaryCta={{ href: "/docs", label: "Documentation" }}
      />

      <SectionBlock tag="Chain" title="SikaChainDev configuration">
        <FadeIn>
          <div className="glass-panel glow-green grid gap-4 p-6 text-sm md:grid-cols-2 md:p-8">
            <ConfigRow label="Chain ID" value={sikaChainDev.chainId} mono />
            <ConfigRow label="RPC" value={chainConfig.rpcUrl} mono />
            <ConfigRow label="Wallet (keosd)" value={sikaChainDev.walletUrl} mono />
            <ConfigRow label="Native token" value={`${sikaChainDev.symbol} @ ${sikaChainDev.tokenContract}`} />
            <ConfigRow label="REX" value={sikaChainDev.rexContract} />
            <ConfigRow label="System contract" value={sikaChainDev.systemContract} />
            <ConfigRow label="Producer" value={sikaChainDev.producer} />
            <ConfigRow label="Spring version" value={sikaChainDev.springVersion} mono />
          </div>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="Accounts" title="Dev accounts (public keys only)" className="border-t border-white/10">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(sikaChainDev.accounts).map(([name, account]) => (
            <div key={name} className="card p-5">
              <p className="font-display text-lg font-bold text-sika-gold">{name}</p>
              <p className="mt-2 text-sm text-sika-cream/65">{account.role}</p>
              <p className="mt-3 break-all font-mono text-xs text-sika-cream/70">{account.publicKey}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-sika-cream/50">
          Dev private keys live in the Spring repo keosd wallet only — never expose them in client apps or
          public sites.
        </p>
      </SectionBlock>

      <SectionBlock tag="Setup" title="Local environment" className="border-t border-white/10">
        <FadeIn>
          <div className="space-y-4">
            <CodeBlock label="Start SikaChainDev (Spring + keosd)" code={devQuickStart.startChain} />
            <CodeBlock label="Full bootstrap (wallet + deploy contracts)" code={devQuickStart.bootstrap} />
            <CodeBlock label="Wire Sika App to dev chain" code={devQuickStart.wireSikaApp} />
            <CodeBlock label="Wire this website locally" code={devQuickStart.wireWebsite} />
            <CodeBlock label="Verify node" code={devQuickStart.cleosInfo} />
          </div>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="WharfKit" title="Client SDK" className="border-t border-white/10">
        <FadeIn>
          <p className="mb-4 text-sm leading-relaxed text-sika-cream/70">
            Use WharfKit SessionKit against SikaChainDev — same chain ID and RPC as Sika App.
          </p>
          <CodeBlock label="SessionKit bootstrap" code={devQuickStart.wharfkitSnippet} />
          <p className="mt-4 text-sm text-sika-cream/55">
            Generate contract bindings:{" "}
            <code className="text-sika-gold">
              npx @wharfkit/cli generate -u {sikaChainDev.rpcUrl} sika.token
            </code>
          </p>
        </FadeIn>
      </SectionBlock>

      <SectionBlock tag="Sync" title="Keep constants updated" className="border-t border-white/10 bg-black/20 pb-24">
        <FadeIn>
          <div className="glass-panel p-6 md:p-8">
            <p className="text-sm leading-relaxed text-sika-cream/70">
              Chain constants on this site are synced from{" "}
              <code className="text-sika-gold">AntelopeOS/spring/sikachaindev/chain.json</code>. After
              changing the dev chain config, run:
            </p>
            <CodeBlock label="Sync chain constants" code="npm run sync:chain" />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/testnet" className="btn-secondary glass-button text-sm">
                Testnet dashboard
              </Link>
              <Link href="/status" className="btn-secondary glass-button text-sm">
                Platform status
              </Link>
            </div>
          </div>
        </FadeIn>
      </SectionBlock>
    </>
  );
}

function ConfigRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-sika-gold">{label}</p>
      <p className={`mt-1 ${mono ? "break-all font-mono text-xs text-sika-cream/70" : ""}`}>{value}</p>
    </div>
  );
}
