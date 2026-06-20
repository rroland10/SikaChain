export function ContentStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    draft: "text-sika-cream/60 border-white/15",
    published: "text-sika-green-bright border-sika-green/30",
    new: "text-sika-cream/60 border-white/15",
    reviewing: "text-sika-gold border-sika-gold/30",
    qualified: "text-sika-green-bright border-sika-green/30",
    promoted: "text-sika-gold-bright border-sika-gold/40",
    rejected: "text-sika-red border-sika-red/30",
  };

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${colors[status] || colors.draft}`}>
      {status}
    </span>
  );
}

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-sika-gold">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function AdminTextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="glass-input w-full rounded-xl px-4 py-3 text-sm"
    />
  );
}

export function AdminTextarea({
  value,
  onChange,
  rows = 6,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="glass-input w-full rounded-xl px-4 py-3 text-sm leading-relaxed"
    />
  );
}
