"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { primaryNavLinks, secondaryNavLinks } from "@/lib/docs-content";
import { MobileNav } from "@/components/ui/MobileNav";

export function SiteHeader() {
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
              Mobile money settlement
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNavLinks.map((link) => {
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
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                secondaryNavLinks.some((l) => l.href === pathname)
                  ? "text-sika-gold"
                  : "text-sika-cream/72 hover:text-sika-cream"
              }`}
            >
              More ▾
            </button>
            {moreOpen && (
              <div className="glass-panel absolute right-0 top-full z-50 mt-2 min-w-[11rem] py-2 shadow-xl">
                {secondaryNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm ${
                      pathname === link.href ? "text-sika-gold" : "text-sika-cream/70 hover:text-sika-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/apply" className="btn-primary btn-shine hidden text-xs sm:inline-flex sm:text-sm">
            Apply
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
