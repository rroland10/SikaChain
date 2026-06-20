import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { getPublishedInsightBySlug, listPublishedInsights } from "@/lib/cms/insights-store";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = await listPublishedInsights(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedInsightBySlug(slug, locale);

  if (!post) {
    return { title: "Insight not found" };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const post = await getPublishedInsightBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={post.tags?.[0] || "Insight"}
        title={post.title}
        lead={post.excerpt}
        imageSrc={post.coverImage}
        primaryCta={{ href: "/insights", label: t("allInsights") }}
        secondaryCta={{ href: "/apply", label: t("apply") }}
      />

      <SectionBlock tag="Article" title={post.title} className="pb-24">
        <FadeIn>
          <article className="glass-panel glow-gold mx-auto max-w-3xl p-8 md:p-10">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-sika-cream/50">
              <span>{post.author || "SikaChain"}</span>
              {post.publishedAt && (
                <>
                  <span>·</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString(
                      locale === "fr" ? "fr-FR" : locale === "ak" ? "en-GH" : "en-GB",
                      { dateStyle: "long" },
                    )}
                  </time>
                </>
              )}
            </div>

            {post.coverImage && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src={post.coverImage} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
              </div>
            )}

            <ArticleBody body={post.body} />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sika-gold/20 bg-sika-gold/10 px-3 py-1 text-[11px] text-sika-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-3xl">
          <Link href="/insights" className="text-sm font-semibold text-sika-gold hover:underline">
            {t("backToInsights")}
          </Link>
        </div>
      </SectionBlock>
    </>
  );
}
