"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

type HeroCinematicProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  imageSrc?: string;
  imageAlt?: string;
};

export function HeroCinematic({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  imageSrc = "/images/hero-ghana-mobile-money.png",
  imageAlt = "Mobile money settlement in Ghana",
}: HeroCinematicProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden border-b border-white/10">
      <motion.div style={{ y: imageY, opacity }} className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sika-ink via-sika-ink/88 to-sika-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-sika-ink via-transparent to-sika-ink/30" />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 py-28">
        <FadeIn delay={0.1}>
          <p className="section-tag mb-6 inline-flex items-center gap-2 rounded-full glass-chip px-4 py-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sika-gold" />
            {eyebrow}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-sika-cream md:text-7xl lg:text-[5.25rem]">
            {title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-sika-gold-bright md:text-3xl">
            {subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <p className="mt-6 max-w-xl text-base leading-[1.75] text-sika-cream/78 md:text-lg">
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={primaryCta.href} className="btn-primary btn-shine">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn-secondary glass-button">
              {secondaryCta.label}
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.7} className="mt-14 hidden lg:block">
          <div className="glass-panel inline-flex items-center gap-8 px-8 py-5">
            {[
              { value: "21", label: "Genesis producers" },
              { value: "GH", label: "First market" },
              { value: "<1s", label: "Settlement" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <p className="font-display text-3xl font-extrabold text-sika-gold">{stat.value}</p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-sika-cream/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </motion.div>

      {!reduceMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
            <div className="h-2 w-1 rounded-full bg-sika-gold/80" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
