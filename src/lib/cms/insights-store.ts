import type { CreateInsightInput, InsightPost, PostStatus, UpdateInsightInput } from "@/lib/cms/types";
import { slugify } from "@/lib/cms/slug";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  deleteJsonObject,
  INSIGHTS_PREFIX,
  listJsonIds,
  readJsonObject,
  saveJsonObject,
} from "@/lib/storage";

function insightPath(id: string): string {
  return `${INSIGHTS_PREFIX}${id}.json`;
}

export async function listAllInsights(locale?: Locale): Promise<InsightPost[]> {
  const ids = await listJsonIds(INSIGHTS_PREFIX);
  const posts = await Promise.all(ids.map((id) => readJsonObject<InsightPost>(insightPath(id))));
  return posts
    .filter((post): post is InsightPost => post !== null)
    .filter((post) => !locale || post.locale === locale || (!post.locale && locale === routing.defaultLocale))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function listPublishedInsights(locale: Locale): Promise<InsightPost[]> {
  return (await listAllInsights(locale))
    .filter((post) => post.status === "published")
    .sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime;
    });
}

export async function getInsightById(id: string): Promise<InsightPost | null> {
  return readJsonObject<InsightPost>(insightPath(id));
}

export async function getInsightBySlug(slug: string, locale: Locale): Promise<InsightPost | null> {
  const posts = await listAllInsights(locale);
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublishedInsightBySlug(slug: string, locale: Locale): Promise<InsightPost | null> {
  const post = await getInsightBySlug(slug, locale);
  if (!post || post.status !== "published") return null;
  return post;
}

async function ensureUniqueSlug(baseSlug: string, locale: Locale, excludeId?: string): Promise<string> {
  const posts = await listAllInsights(locale);
  let slug = baseSlug || "untitled";
  let counter = 1;

  while (posts.some((post) => post.slug === slug && post.id !== excludeId)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

export function createInsightId(slug: string): string {
  return `${Date.now()}-${slug || "post"}`;
}

export async function createInsight(input: CreateInsightInput): Promise<InsightPost> {
  const locale = input.locale ?? routing.defaultLocale;
  const baseSlug = slugify(input.slug || input.title || "untitled");
  const slug = await ensureUniqueSlug(baseSlug, locale);
  const id = createInsightId(slug);
  const now = new Date().toISOString();
  const status: PostStatus = input.status ?? "draft";

  const post: InsightPost = {
    id,
    slug,
    locale,
    title: input.title.trim() || "Untitled",
    excerpt: input.excerpt?.trim() || "",
    body: input.body?.trim() || "",
    author: input.author?.trim() || "SikaChain",
    tags: input.tags?.filter(Boolean) ?? [],
    coverImage: input.coverImage?.trim() || undefined,
    status,
    publishedAt: status === "published" ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };

  await saveJsonObject(insightPath(id), post);
  return post;
}

export async function updateInsight(id: string, patch: UpdateInsightInput): Promise<InsightPost | null> {
  const existing = await getInsightById(id);
  if (!existing) return null;

  const locale = patch.locale ?? existing.locale ?? routing.defaultLocale;
  const now = new Date().toISOString();
  let slug = existing.slug;

  if (patch.slug !== undefined || patch.title !== undefined) {
    const baseSlug = slugify(patch.slug || patch.title || existing.title);
    slug = await ensureUniqueSlug(baseSlug, locale, id);
  }

  const nextStatus = patch.status ?? existing.status;
  let publishedAt = existing.publishedAt;

  if (nextStatus === "published" && existing.status !== "published") {
    publishedAt = now;
  }
  if (nextStatus === "draft") {
    publishedAt = undefined;
  }
  if (patch.publishedAt !== undefined) {
    publishedAt = patch.publishedAt;
  }

  const updated: InsightPost = {
    ...existing,
    ...patch,
    locale,
    slug,
    title: patch.title?.trim() ?? existing.title,
    excerpt: patch.excerpt !== undefined ? patch.excerpt.trim() : existing.excerpt,
    body: patch.body !== undefined ? patch.body.trim() : existing.body,
    author: patch.author !== undefined ? patch.author.trim() : existing.author,
    tags: patch.tags ?? existing.tags,
    coverImage: patch.coverImage !== undefined ? patch.coverImage.trim() || undefined : existing.coverImage,
    status: nextStatus,
    publishedAt,
    updatedAt: now,
  };

  await saveJsonObject(insightPath(id), updated);
  return updated;
}

export async function deleteInsight(id: string): Promise<boolean> {
  const existing = await getInsightById(id);
  if (!existing) return false;
  await deleteJsonObject(insightPath(id));
  return true;
}
