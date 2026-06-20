"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { site } from "@/lib/content";

const primaryNav = [
  { href: "/genesis", key: "genesis" },
  { href: "/candidates", key: "candidates" },
  { href: "/testnet", key: "testnet" },
  { href: "/ghana", key: "ghana" },
  { href: "/docs", key: "docs" },
] as const;

const secondaryNav = [
  { href: "/producers", key: "producers" },
  { href: "/governance", key: "governance" },
  { href: "/roadmap", key: "roadmap" },
  { href: "/sika-app", key: "sikaApp" },
  { href: "/developers", key: "developers" },
  { href: "/explorer", key: "explorer" },
  { href: "/announce", key: "announce" },
  { href: "/insights", key: "insights" },
  { href: "/press", key: "press" },
  { href: "/status", key: "status" },
] as const;

export function SiteFooter() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="luxury-divider mb-0" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image src="/brand/sika-logomark.svg" alt="" width={40} height={40} />
              <span className="font-display text-2xl font-extrabold">SikaChain</span>
            </div>
            <p className="max-w-md text-[15px] leading-[1.8] text-sika-cream/68">
              {tFooter("description")}{" "}
              {tFooter("launching", { market: site.launchMarket, expansion: site.expansion })}
            </p>
            <p className="mt-5 font-serif text-xl italic text-sika-gold-bright">{tFooter("tagline")}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sika-gold">
              {tFooter("network")}
            </p>
            <ul className="space-y-2.5 text-sm text-sika-cream/68">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sika-gold">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sika-gold">
              {tFooter("resources")}
            </p>
            <ul className="space-y-2.5 text-sm text-sika-cream/68">
              {secondaryNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sika-gold">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/apply" className="transition hover:text-sika-gold">
                  {tCommon("apply")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sika-gold">
              {tFooter("stack")}
            </p>
            <ul className="space-y-2.5 text-sm text-sika-cream/68">
              <li>{tFooter("stackSettlement")}</li>
              <li>{tFooter("stackApp")}</li>
              <li>{tFooter("stackProducers")}</li>
            </ul>
          </div>
        </FadeIn>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs tracking-wide text-sika-cream/42">
        {tFooter("copyright", { year: new Date().getFullYear() })} ·{" "}
        <a
          href="https://github.com/rroland10/SikaChain"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sika-gold"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
