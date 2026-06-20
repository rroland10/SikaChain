import type {
  AnnounceContentEditable,
  HomeContentEditable,
  PressContentEditable,
  SiteContentDoc,
  SiteContentSection,
} from "@/lib/cms/types";
import { positioning } from "@/lib/content";
import { announceContent } from "@/lib/docs-content";
import { readJsonObject, saveJsonObject, SITE_CONTENT_PATH } from "@/lib/storage";

const defaultLaunchSteps = [
  "Announce SikaChain as mobile money settlement infrastructure",
  "Launch the Genesis Producer Program — recruit 21 credible producers",
  "Publish qualified candidates and run public testnet",
  "Launch mainnet with explorer, governance portal, and producer dashboard",
  "Open Sika App private beta in Ghana",
];

const defaultBoilerplate = `SikaChain is a blockchain settlement network built for mobile money, merchant payments, remittances, and low-cost digital transfers. Its first flagship application, Sika App, lets users send money, pay merchants, and access cash-in/cash-out services — without exposing everyday users to volatile crypto assets. SikaChain is financial infrastructure. Sika App is the user product. Twenty-one genesis node producers form the institutional trust layer. Launch market: Ghana first.`;

export function getDefaultAnnounceContent(): AnnounceContentEditable {
  return {
    headline: announceContent.headline,
    subheadline: announceContent.subheadline,
    body: announceContent.body,
    consumerMessage: announceContent.consumerMessage,
    infrastructureMessage: announceContent.infrastructureMessage,
    quotes: announceContent.quotes.map((quote) => ({ ...quote })),
    launchSteps: [...defaultLaunchSteps],
  };
}

export function getDefaultPressContent(): PressContentEditable {
  return {
    boilerplate: defaultBoilerplate,
    mediaContact:
      "For press, partnership, or genesis producer inquiries, use the producer application form or contact through official channels once published.",
  };
}

export function getDefaultHomeContent(): HomeContentEditable {
  return {
    eyebrow: "Ghana first · Africa next",
    heroHighlight: "mobile money",
    subtitle: positioning.sikaChain,
    description:
      "SikaChain is financial infrastructure — not a consumer crypto product. Sika App is how people send, pay, and cash out. Twenty-one genesis node producers are the institutional trust layer.",
    positioningTitle: "Infrastructure users can trust. Products users can understand.",
    positioningLead:
      "Do not lead with blockchain for consumers. Lead with money movement. Use SikaChain to win institutional credibility.",
    sikaChainThesis: positioning.thesis,
    sikaAppDescription: positioning.sikaApp,
    producersDescription:
      "Fintechs, banks, telecoms, universities, and community institutions securing the network from day one.",
  };
}

export function getDefaultSiteContent(): SiteContentDoc {
  return {
    announce: getDefaultAnnounceContent(),
    press: getDefaultPressContent(),
    home: getDefaultHomeContent(),
    updatedAt: new Date(0).toISOString(),
  };
}

function mergeAnnounce(stored?: Partial<AnnounceContentEditable>): AnnounceContentEditable {
  const defaults = getDefaultAnnounceContent();
  if (!stored) return defaults;
  return {
    ...defaults,
    ...stored,
    quotes: stored.quotes?.length ? stored.quotes : defaults.quotes,
    launchSteps: stored.launchSteps?.length ? stored.launchSteps : defaults.launchSteps,
  };
}

function mergePress(stored?: Partial<PressContentEditable>): PressContentEditable {
  return { ...getDefaultPressContent(), ...stored };
}

function mergeHome(stored?: Partial<HomeContentEditable>): HomeContentEditable {
  return { ...getDefaultHomeContent(), ...stored };
}

export async function readSiteContent(): Promise<SiteContentDoc> {
  const stored = await readJsonObject<Partial<SiteContentDoc>>(SITE_CONTENT_PATH);
  const defaults = getDefaultSiteContent();

  if (!stored) return defaults;

  return {
    announce: mergeAnnounce(stored.announce),
    press: mergePress(stored.press),
    home: mergeHome(stored.home),
    updatedAt: stored.updatedAt || defaults.updatedAt,
  };
}

export async function readSiteContentSection<S extends SiteContentSection>(
  section: S,
): Promise<SiteContentDoc[S]> {
  const content = await readSiteContent();
  return content[section];
}

export async function updateSiteContentSection<S extends SiteContentSection>(
  section: S,
  data: SiteContentDoc[S],
): Promise<SiteContentDoc> {
  const current = await readSiteContent();
  const next: SiteContentDoc = {
    ...current,
    [section]: data,
    updatedAt: new Date().toISOString(),
  };
  await saveJsonObject(SITE_CONTENT_PATH, next);
  return next;
}

export async function resetSiteContentSection(section: SiteContentSection): Promise<SiteContentDoc> {
  const defaults = getDefaultSiteContent();
  return updateSiteContentSection(section, defaults[section]);
}
