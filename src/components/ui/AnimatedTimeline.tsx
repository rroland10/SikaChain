"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type TimelinePhase = {
  period: string;
  title: string;
  items: readonly string[];
};

export function AnimatedTimeline({ phases }: { phases: readonly TimelinePhase[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative space-y-6">
      <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-sika-gold/50 via-sika-green/30 to-transparent md:left-8" />

      {phases.map((phase, index) => (
        <motion.div
          key={phase.period}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative pl-14 md:pl-24"
        >
          <motion.span
            className="absolute left-3 top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-sika-gold bg-sika-ink md:left-6"
            animate={inView ? { boxShadow: ["0 0 0 0 rgba(242,183,5,0.4)", "0 0 0 8px rgba(242,183,5,0)", "0 0 0 0 rgba(242,183,5,0)"] } : {}}
            transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sika-gold" />
          </motion.span>

          <div className="glass-panel p-6 md:p-7">
            <p className="text-sm font-semibold text-sika-gold">{phase.period}</p>
            <h3 className="font-display text-2xl font-bold">{phase.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-sika-cream/72">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sika-green-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
