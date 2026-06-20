"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const navLinks = [
  { href: "/genesis", key: "genesis" },
  { href: "/candidates", key: "candidates" },
  { href: "/testnet", key: "testnet" },
  { href: "/ghana", key: "ghana" },
  { href: "/docs", key: "docs" },
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

export function MobileNav() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="glass-chip flex h-10 w-10 items-center justify-center rounded-xl"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="text-sika-gold">{open ? "×" : "☰"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="glass-panel fixed inset-y-0 right-0 z-50 flex w-[min(100vw-3rem,20rem)] flex-col overflow-y-auto p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="section-tag">Menu</p>
                <LanguageSwitcher />
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                      pathname === link.href
                        ? "bg-sika-gold/15 text-sika-gold"
                        : "text-sika-cream/75 hover:bg-white/5"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="btn-primary btn-shine mt-6 text-center text-sm"
              >
                {tCommon("apply")}
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
