"use client";

type CodeBlockProps = {
  label: string;
  code: string;
};

export function CodeBlock({ label, code }: CodeBlockProps) {
  async function copy() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <div className="glass-inset overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <p className="text-[10px] uppercase tracking-wider text-sika-gold">{label}</p>
        <button
          type="button"
          onClick={copy}
          className="text-xs text-sika-cream/50 hover:text-sika-gold"
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-sika-cream/80">
        {code}
      </pre>
    </div>
  );
}
