"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MobileNav } from "@/components/ui/MobileNav";

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

export function SiteHeader() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 24));
  }, [scrollY]);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition duration-500 ${
        scrolled
          ? "border-white/15 bg-sika-ink/90 shadow-glass"
          : "border-white/8 bg-sika-ink/55"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={reduceMotion ? undefined : { rotate: [0, -4, 4, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/brand/sika-logomark.svg"
              alt="SikaChain"
              width={42}
              height={42}
              className="h-[42px] w-[42px] drop-shadow-lg transition group-hover:drop-shadow-[0_0_18px_rgba(242,183,5,0.35)]"
              priority
            />
          </motion.div>
          <div>
            <span className="font-display text-lg font-extrabold tracking-tight text-sika-cream">
              Sika<span className="text-sika-green-bright">Chain</span>
            </span>
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-sika-gold sm:block">
              {tCommon("tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition ${
                  active ? "text-sika-gold" : "text-sika-cream/72 hover:text-sika-cream"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-sika-gold/25 bg-sika-gold/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{t(link.key)}</span>
              </Link>
            );
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                secondaryNav.some((l) => l.href === pathname)
                  ? "text-sika-gold"
                  : "text-sika-cream/72 hover:text-sika-cream"
              }`}
            >
              {tCommon("more")}
            </button>
            {moreOpen && (
              <div className="glass-panel absolute right-0 top-full z-50 mt-2 min-w-[11rem] py-2 shadow-xl">
                {secondaryNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm ${
                      pathname === link.href ? "text-sika-gold" : "text-sika-cream/70 hover:text-sika-cream"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/apply" className="btn-primary btn-shine hidden text-xs sm:inline-flex sm:text-sm">
            {tCommon("apply")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
