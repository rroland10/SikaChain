import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { listPublishedInsights } from "@/lib/cms/insights-store";

export const metadata: Metadata = {
  title: "Insights",
  description: "News, analysis, and updates from the SikaChain settlement network.",
};

export default async function InsightsPage() {
  const posts = await listPublishedInsights();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Network news & analysis"
        lead="Launch updates, Ghana market strategy, producer program progress, and infrastructure perspectives from the SikaChain team."
        primaryCta={{ href: "/genesis", label: "Genesis program" }}
        secondaryCta={{ href: "/announce", label: "Launch announcement" }}
      />

      <SectionBlock tag="Latest" title="Published insights" className="pb-24">
        {posts.length === 0 ? (
          <FadeIn>
            <div className="glass-panel p-8 text-center">
              <p className="text-sika-cream/65">Insights will appear here once published from the admin dashboard.</p>
              <Link href="/announce" className="mt-6 inline-flex text-sm font-semibold text-sika-gold hover:underline">
                Read launch announcement →
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
                  {post.publishedAt && ` · ${new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}`}
                </p>
              </Link>
            ))}
          </FadeInStagger>
        )}
      </SectionBlock>
    </>
  );
}
