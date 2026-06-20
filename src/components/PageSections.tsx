"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, FadeInItem, FadeInStagger } from "@/components/motion/FadeIn";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  imageSrc?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function PageHero({
  eyebrow,
  title,
  lead,
  imageSrc,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {imageSrc && (
        <>
          <Image src={imageSrc} alt="" fill className="object-cover opacity-25" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-sika-ink via-sika-ink/95 to-sika-ink/80" />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <FadeIn>
          <p className="section-tag mb-5 inline-flex rounded-full glass-chip px-4 py-2">{eyebrow}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-sika-cream md:text-6xl">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="section-lead mt-6 max-w-3xl text-lg">{lead}</p>
        </FadeIn>
        {(primaryCta || secondaryCta) && (
          <FadeIn delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-primary btn-shine">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-secondary glass-button">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

type SectionBlockProps = {
  tag?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function SectionBlock({ tag, title, lead, children, className = "", id }: SectionBlockProps) {
  return (
    <section id={id} className={`relative px-6 py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          {tag && <p className="section-tag mb-4">{tag}</p>}
          <h2 className="section-title">{title}</h2>
          {lead && <p className="section-lead mt-5">{lead}</p>}
        </FadeIn>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

type StatCardProps = {
  value: string;
  label: string;
  detail?: string;
};

export function StatCard({ value, label, detail }: StatCardProps) {
  return (
    <FadeInItem>
      <div className="card glow-gold text-center">
        <p className="font-display text-4xl font-extrabold text-gradient-gold">{value}</p>
        <p className="mt-2 text-sm font-semibold text-sika-cream">{label}</p>
        {detail && <p className="mt-2 text-xs leading-relaxed text-sika-cream/52">{detail}</p>}
      </div>
    </FadeInItem>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <FadeInStagger className="grid gap-6 sm:grid-cols-3">{children}</FadeInStagger>
  );
}

type ListCardProps = {
  title: string;
  items: readonly string[];
};

export function ListCard({ title, items }: ListCardProps) {
  return (
    <FadeInItem>
      <div className="card h-full">
        <h3 className="font-display text-lg font-bold text-sika-cream">{title}</h3>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-sika-cream/72">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sika-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FadeInItem>
  );
}

export function CardGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: 1 | 2 | 3 | 4 }) {
  const colClass =
    cols === 1
      ? "grid-cols-1"
      : cols === 2
        ? "md:grid-cols-2"
        : cols === 4
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "md:grid-cols-2 lg:grid-cols-3";

  return <FadeInStagger className={`grid gap-5 ${colClass}`}>{children}</FadeInStagger>;
}

export function AnimatedCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <FadeInItem className={`card ${className}`}>{children}</FadeInItem>;
}
