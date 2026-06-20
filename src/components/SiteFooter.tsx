import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { primaryNavLinks, secondaryNavLinks } from "@/lib/docs-content";
import { site } from "@/lib/content";

export function SiteFooter() {
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
              {site.description} Launching first in {site.launchMarket}, then expanding across{" "}
              {site.expansion}.
            </p>
            <p className="mt-5 font-serif text-xl italic text-sika-gold-bright">
              Infrastructure for mobile money. Not another speculative chain.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sika-gold">
              Network
            </p>
            <ul className="space-y-2.5 text-sm text-sika-cream/68">
              {primaryNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sika-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sika-gold">
              Resources
            </p>
            <ul className="space-y-2.5 text-sm text-sika-cream/68">
              {secondaryNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-sika-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/status" className="transition hover:text-sika-gold">
                  Status
                </Link>
              </li>
              <li>
                <Link href="/apply" className="transition hover:text-sika-gold">
                  Apply
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-sika-gold">
              Stack
            </p>
            <ul className="space-y-2.5 text-sm text-sika-cream/68">
              <li>SikaChain — settlement</li>
              <li>Sika App — mobile money</li>
              <li>21 producers — trust layer</li>
            </ul>
          </div>
        </FadeIn>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs tracking-wide text-sika-cream/42">
        © {new Date().getFullYear()} SikaChain ·{" "}
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
