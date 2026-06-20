import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { listPublishedInsights } from "@/lib/cms/insights-store";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  return {
    title: t("title"),
    description: t("pageLead"),
  };
}

export default async function InsightsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "insights" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const posts = await listPublishedInsights(locale);

  return (
    <>
      <PageHero
        eyebrow={t("title")}
        title={t("pageTitle")}
        lead={t("pageLead")}
        primaryCta={{ href: "/genesis", label: t("genesisCta") }}
        secondaryCta={{ href: "/announce", label: t("announceCta") }}
      />

      <SectionBlock tag="Latest" title={t("latest")} className="pb-24">
        {posts.length === 0 ? (
          <FadeIn>
            <div className="glass-panel p-8 text-center">
              <p className="text-sika-cream/65">{tCommon("noInsightsYet")}</p>
              <Link href="/announce" className="mt-6 inline-flex text-sm font-semibold text-sika-gold hover:underline">
                {tCommon("readAnnouncement")}
              </Link>
            </div>
          </FadeIn>
        ) : (
          <FadeInStagger className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="card group block transition hover:border-sika-gold/30"
              >
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sika-gold/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="font-display text-xl font-bold group-hover:text-sika-gold">{post.title}</h2>
                {post.excerpt && <p className="mt-3 text-sm leading-relaxed text-sika-cream/65">{post.excerpt}</p>}
                <p className="mt-4 text-xs text-sika-cream/45">
                  {post.author || "SikaChain"}
                  {post.publishedAt &&
                    ` · ${new Date(post.publishedAt).toLocaleDateString(locale === "fr" ? "fr-FR" : locale === "ak" ? "en-GH" : "en-GB", { dateStyle: "medium" })}`}
                </p>
              </Link>
            ))}
          </FadeInStagger>
        )}
      </SectionBlock>
    </>
  );
}
