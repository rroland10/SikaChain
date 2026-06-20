import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

type GlassCTAProps = {
  tag?: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export function GlassCTA({ tag, title, description, primary, secondary }: GlassCTAProps) {
  return (
    <section className="px-6 py-20">
      <FadeIn>
        <div className="glass-panel glow-gold relative mx-auto max-w-6xl overflow-hidden p-10 text-center md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-sika-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-sika-green/15 blur-3xl" />
          <div className="relative">
            {tag && <p className="section-tag mb-4">{tag}</p>}
            <h2 className="font-display text-2xl font-bold md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-sika-cream/70 md:text-base">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={primary.href} className="btn-primary btn-shine">
                {primary.label}
              </Link>
              {secondary && (
                <Link href={secondary.href} className="btn-secondary glass-button">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
