"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavLinks, secondaryNavLinks } from "@/lib/docs-content";

export function MobileNav() {
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
              <p className="section-tag mb-4">Menu</p>
              <div className="space-y-1">
                {[...primaryNavLinks, ...secondaryNavLinks].map((link) => (
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
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="btn-primary btn-shine mt-6 text-center text-sm"
              >
                Apply as producer
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
