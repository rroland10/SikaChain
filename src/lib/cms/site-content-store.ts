import type {
  AnnounceContentEditable,
  HomeContentEditable,
  PressContentEditable,
  SiteContentDoc,
  SiteContentSection,
} from "@/lib/cms/types";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import { readJsonObject, saveJsonObject, siteContentPath } from "@/lib/storage";

import enMessages from "../../../messages/en.json";
import akMessages from "../../../messages/ak.json";
import frMessages from "../../../messages/fr.json";

const messageDefaults: Record<Locale, typeof enMessages> = {
  en: enMessages,
  ak: akMessages,
  fr: frMessages,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDefaultAnnounceContent(locale: Locale): AnnounceContentEditable {
  return structuredClone(messageDefaults[locale].cms.announce);
}

export function getDefaultPressContent(locale: Locale): PressContentEditable {
  return structuredClone(messageDefaults[locale].cms.press);
}

export function getDefaultHomeContent(locale: Locale): HomeContentEditable {
  return structuredClone(messageDefaults[locale].cms.home);
}

export function getDefaultSiteContent(locale: Locale): SiteContentDoc {
  return {
    announce: getDefaultAnnounceContent(locale),
    press: getDefaultPressContent(locale),
    home: getDefaultHomeContent(locale),
    updatedAt: new Date(0).toISOString(),
  };
}

function mergeAnnounce(
  locale: Locale,
  stored?: Partial<AnnounceContentEditable>,
): AnnounceContentEditable {
  const defaults = getDefaultAnnounceContent(locale);
  if (!stored) return defaults;
  return {
    ...defaults,
    ...stored,
    quotes: stored.quotes?.length ? stored.quotes : defaults.quotes,
    launchSteps: stored.launchSteps?.length ? stored.launchSteps : defaults.launchSteps,
  };
}

function mergePress(locale: Locale, stored?: Partial<PressContentEditable>): PressContentEditable {
  return { ...getDefaultPressContent(locale), ...stored };
}

function mergeHome(locale: Locale, stored?: Partial<HomeContentEditable>): HomeContentEditable {
  return { ...getDefaultHomeContent(locale), ...stored };
}

export async function readSiteContent(locale: Locale): Promise<SiteContentDoc> {
  const stored = await readJsonObject<Partial<SiteContentDoc>>(siteContentPath(locale));
  const defaults = getDefaultSiteContent(locale);

  if (!stored) return defaults;

  return {
    announce: mergeAnnounce(locale, stored.announce),
    press: mergePress(locale, stored.press),
    home: mergeHome(locale, stored.home),
    updatedAt: stored.updatedAt || defaults.updatedAt,
  };
}

export async function readSiteContentSection<S extends SiteContentSection>(
  section: S,
  locale: Locale,
): Promise<SiteContentDoc[S]> {
  const content = await readSiteContent(locale);
  return content[section];
}

export async function updateSiteContentSection<S extends SiteContentSection>(
  section: S,
  locale: Locale,
  data: SiteContentDoc[S],
): Promise<SiteContentDoc> {
  const current = await readSiteContent(locale);
  const next: SiteContentDoc = {
    ...current,
    [section]: data,
    updatedAt: new Date().toISOString(),
  };
  await saveJsonObject(siteContentPath(locale), next);
  return next;
}

export async function resetSiteContentSection(
  section: SiteContentSection,
  locale: Locale,
): Promise<SiteContentDoc> {
  const defaults = getDefaultSiteContent(locale);
  return updateSiteContentSection(section, locale, defaults[section]);
}
