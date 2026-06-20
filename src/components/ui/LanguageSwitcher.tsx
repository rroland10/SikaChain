"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="relative hidden sm:block">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => router.replace(pathname, { locale: e.target.value as Locale })}
        className="glass-input cursor-pointer rounded-full border-white/10 bg-transparent py-1.5 pl-3 pr-8 text-xs font-medium text-sika-cream/75"
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-sika-ink text-sika-cream">
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
