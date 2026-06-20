"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/ambient-glass-bg.png"
        alt=""
        fill
        priority
        className="object-cover opacity-35 mix-blend-screen"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-sika-ink/20 via-sika-ink/75 to-sika-ink" />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-sika-green/20 blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-sika-gold/15 blur-[130px]"
            animate={{ x: [0, -35, 0], y: [0, -25, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sika-green-bright/10 blur-[100px]"
            animate={{ x: [0, 25, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="grain-overlay absolute inset-0 opacity-[0.35]" />
    </div>
  );
}
