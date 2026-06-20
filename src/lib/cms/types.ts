import type { Locale } from "@/i18n/routing";

export type PostStatus = "draft" | "published";

export type InsightPost = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  body: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  status: PostStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContentQuote = {
  role: string;
  text: string;
};

export type AnnounceContentEditable = {
  headline: string;
  subheadline: string;
  body: string;
  consumerMessage: string;
  infrastructureMessage: string;
  quotes: ContentQuote[];
  launchSteps: string[];
};

export type PressContentEditable = {
  boilerplate: string;
  mediaContact: string;
};

export type HomeContentEditable = {
  eyebrow: string;
  heroHighlight: string;
  subtitle: string;
  description: string;
  positioningTitle: string;
  positioningLead: string;
  sikaChainThesis: string;
  sikaAppDescription: string;
  producersDescription: string;
};

export type SiteContentDoc = {
  announce: AnnounceContentEditable;
  press: PressContentEditable;
  home: HomeContentEditable;
  updatedAt: string;
};

export type SiteContentSection = "announce" | "press" | "home";

export type CreateInsightInput = {
  title: string;
  locale?: Locale;
  slug?: string;
  excerpt?: string;
  body?: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  status?: PostStatus;
};

export type UpdateInsightInput = Partial<
  Omit<InsightPost, "id" | "createdAt" | "updatedAt">
>;
