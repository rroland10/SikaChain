"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { producerComposition } from "@/lib/content";

const palette = [
  "#F2B705",
  "#1FA56B",
  "#FFDE7A",
  "#006B3F",
  "#CE1126",
  "#C99503",
  "#4DB9C2",
  "#7998EA",
  "#FFE9A3",
];

export function ProducerCompositionChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const total = producerComposition.reduce((sum, row) => sum + row.count, 0);

  const segments = useMemo(() => {
    let cursor = 0;
    return producerComposition.map((row, i) => {
      const start = cursor;
      const sweep = (row.count / total) * 360;
      cursor += sweep;
      return { ...row, start, sweep, color: palette[i % palette.length] };
    });
  }, [total]);

  const ring = (start: number, sweep: number, color: string, delay: number) => {
    const r = 88;
    const cx = 110;
    const cy = 110;
    const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad(start));
    const y1 = cy + r * Math.sin(rad(start));
    const x2 = cx + r * Math.cos(rad(start + sweep));
    const y2 = cy + r * Math.sin(rad(start + sweep));
    const large = sweep > 180 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;

    return (
      <motion.path
        key={`${start}-${color}`}
        d={d}
        fill={color}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 0.92, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
        className="origin-center"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    );
  };

  return (
    <div ref={ref} className="glass-panel glow-gold grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8 lg:grid-cols-[320px_1fr]">
      <div className="relative mx-auto flex flex-col items-center">
        <svg viewBox="0 0 220 220" className="h-56 w-56 md:h-64 md:w-64">
          <circle cx="110" cy="110" r="88" fill="rgba(255,255,255,0.03)" />
          {segments.map((seg, i) => ring(seg.start, seg.sweep, seg.color, i * 0.06))}
          <circle cx="110" cy="110" r="52" fill="#0F0F12" />
          <circle cx="110" cy="110" r="52" fill="none" stroke="rgba(255,255,255,0.08)" />
          <text x="110" y="104" textAnchor="middle" className="fill-sika-gold font-display text-3xl font-extrabold">
            21
          </text>
          <text x="110" y="126" textAnchor="middle" className="fill-white/50 text-[9px] uppercase tracking-[0.2em]">
            Producers
          </text>
        </svg>
        <p className="mt-2 text-center text-xs text-sika-cream/55">Balanced genesis coalition</p>
      </div>

      <div className="space-y-3">
        {segments.map((seg, i) => (
          <motion.div
            key={seg.category}
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.15 + i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sika-cream/85">{seg.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-white/10 sm:block">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: seg.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(seg.count / total) * 100}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.2 + i * 0.05 }}
                />
              </div>
              <span className="font-display text-sm font-bold text-sika-gold">{seg.count}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
