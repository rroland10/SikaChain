"use client";

const items = [
  "Instant settlement",
  "Ghana-first launch",
  "21 genesis producers",
  "Mobile money infrastructure",
  "Stable-value UX",
  "Agent & merchant network",
  "Savanna instant finality",
  "Regulated-friendly design",
];

export function MetricsTicker() {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/25 py-4 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sika-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sika-ink to-transparent" />
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 text-sm font-medium text-sika-cream/55">
            <span className="text-sika-gold">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
