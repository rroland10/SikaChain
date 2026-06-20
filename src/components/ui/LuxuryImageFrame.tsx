"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

type LuxuryImageFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
};

export function LuxuryImageFrame({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: LuxuryImageFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <FadeIn className={`group relative ${className}`}>
      <div className="glass-panel glow-green overflow-hidden p-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sika-ink/50 via-transparent to-transparent" />
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          )}
        </div>
        {caption && (
          <p className="px-4 py-3 text-sm leading-relaxed text-sika-cream/65">{caption}</p>
        )}
      </div>
    </FadeIn>
  );
}
