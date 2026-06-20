"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type PhoneMockupProps = {
  imageSrc?: string;
  alt?: string;
};

export function PhoneMockup({
  imageSrc = "/images/sika-app-phone.png",
  alt = "Sika App mobile money interface",
}: PhoneMockupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 rounded-[3rem] bg-sika-gold/10 blur-3xl" />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel glow-green relative overflow-hidden rounded-[2.5rem] p-3"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-sika-ink">
          <Image src={imageSrc} alt={alt} fill className="object-cover object-top" sizes="400px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-sika-ink/40 via-transparent to-sika-gold/5" />
        </div>
        <div className="absolute left-1/2 top-3 h-1 w-16 -translate-x-1/2 rounded-full bg-white/20" />
      </motion.div>
    </div>
  );
}
