"use client";

import { localeLabels, locales, type Locale } from "@/i18n/routing";

type AdminLocalePickerProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

export function AdminLocalePicker({ locale, onChange }: AdminLocalePickerProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-[10px] uppercase tracking-wider text-sika-gold">Editing language</span>
      <div className="flex flex-wrap gap-2">
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
              locale === code
                ? "border-sika-gold/40 bg-sika-gold/15 text-sika-gold"
                : "border-white/10 text-sika-cream/60"
            }`}
          >
            {localeLabels[code]}
          </button>
        ))}
      </div>
    </div>
  );
}
