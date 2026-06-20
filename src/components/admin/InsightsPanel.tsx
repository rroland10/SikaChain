"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminField, AdminTextarea, AdminTextInput, ContentStatusBadge } from "@/components/admin/AdminFields";
import { AdminLocalePicker } from "@/components/admin/AdminLocalePicker";
import type { InsightPost } from "@/lib/cms/types";
import { localeLabels, routing, type Locale } from "@/i18n/routing";

type InsightsPanelProps = {
  authHeaders: () => HeadersInit;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
};

const emptyDraft = (): Partial<InsightPost> => ({
  title: "",
  slug: "",
  locale: routing.defaultLocale,
  excerpt: "",
  body: "",
  author: "SikaChain",
  tags: [],
  coverImage: "",
  status: "draft",
});

export function InsightsPanel({ authHeaders, onMessage, onError }: InsightsPanelProps) {
  const [locale, setLocale] = useState<Locale>(routing.defaultLocale);
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<InsightPost>>(emptyDraft());

  const loadPosts = useCallback(async () => {
    setLoading(true);
    onError("");
    try {
      const res = await fetch(`/api/admin/insights?locale=${locale}`, { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed to load insights");
      const data = (await res.json()) as { posts: InsightPost[] };
      setPosts(data.posts);
    } catch {
      onError("Failed to load insights");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, onError, locale]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function startCreate() {
    setCreating(true);
    setSelectedId(null);
    setForm({ ...emptyDraft(), locale });
  }

  function selectPost(post: InsightPost) {
    setCreating(false);
    setSelectedId(post.id);
    setForm({ ...post });
  }

  function updateField<K extends keyof InsightPost>(key: K, value: InsightPost[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function saveDraft() {
    onError("");
    onMessage("");

    if (!form.title?.trim()) {
      onError("Title is required");
      return;
    }

    const payload = {
      title: form.title,
      locale: form.locale ?? locale,
      slug: form.slug,
      excerpt: form.excerpt,
      body: form.body,
      author: form.author,
      tags: typeof form.tags === "string" ? (form.tags as string).split(",").map((t) => t.trim()) : form.tags,
      coverImage: form.coverImage,
      status: "draft" as const,
    };

    const res = creating
      ? await fetch("/api/admin/insights", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/insights", {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({ id: selectedId, ...payload }),
        });

    const json = await res.json();
    if (!res.ok) {
      onError(json.error || "Failed to save draft");
      return;
    }

    onMessage(json.message || "Draft saved");
    setCreating(false);
    setSelectedId(json.post.id);
    setForm(json.post);
    await loadPosts();
  }

  async function publish() {
    if (!selectedId && !creating) return;
    onError("");
    onMessage("");

    if (!form.title?.trim()) {
      onError("Title is required");
      return;
    }

    if (creating) {
      const createRes = await fetch("/api/admin/insights", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          title: form.title,
          locale: form.locale ?? locale,
          slug: form.slug,
          excerpt: form.excerpt,
          body: form.body,
          author: form.author,
          tags: typeof form.tags === "string" ? (form.tags as string).split(",").map((t) => t.trim()) : form.tags,
          coverImage: form.coverImage,
          status: "published",
        }),
      });
      const json = await createRes.json();
      if (!createRes.ok) {
        onError(json.error || "Failed to publish");
        return;
      }
      onMessage("Insight published");
      setCreating(false);
      setSelectedId(json.post.id);
      setForm(json.post);
      await loadPosts();
      return;
    }

    const res = await fetch("/api/admin/insights", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        id: selectedId,
        locale: form.locale ?? locale,
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        body: form.body,
        author: form.author,
        tags: Array.isArray(form.tags) ? form.tags : [],
        coverImage: form.coverImage,
        status: "published",
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      onError(json.error || "Failed to publish");
      return;
    }

    onMessage("Insight published");
    setForm(json.post);
    await loadPosts();
  }

  async function unpublish() {
    if (!selectedId) return;
    const res = await fetch("/api/admin/insights", {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ id: selectedId, status: "draft" }),
    });
    const json = await res.json();
    if (!res.ok) {
      onError(json.error || "Failed to unpublish");
      return;
    }
    onMessage("Moved to drafts");
    setForm(json.post);
    await loadPosts();
  }

  async function removePost() {
    if (!selectedId) return;
    if (!confirm("Delete this insight permanently?")) return;

    const res = await fetch(`/api/admin/insights?id=${encodeURIComponent(selectedId)}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (!res.ok) {
      onError("Failed to delete");
      return;
    }
    onMessage("Insight deleted");
    setSelectedId(null);
    setCreating(false);
    setForm(emptyDraft());
    await loadPosts();
  }

  const tagsValue = Array.isArray(form.tags) ? form.tags.join(", ") : form.tags || "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="space-y-3">
        <AdminLocalePicker locale={locale} onChange={setLocale} />
        <button type="button" onClick={startCreate} className="btn-primary btn-shine w-full text-sm">
          + New insight
        </button>

        {loading && <p className="text-sm text-sika-cream/50">Loading…</p>}

        {posts.map((post) => (
          <button
            key={post.id}
            type="button"
            onClick={() => selectPost(post)}
            className={`card w-full text-left transition ${
              selectedId === post.id ? "border-sika-gold/40 glow-gold" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold">{post.title}</p>
                <p className="mt-1 text-xs text-sika-cream/55">/{post.slug} · {localeLabels[post.locale ?? "en"]}</p>
              </div>
              <ContentStatusBadge status={post.status} />
            </div>
            {post.excerpt && <p className="mt-2 line-clamp-2 text-sm text-sika-cream/60">{post.excerpt}</p>}
          </button>
        ))}

        {!loading && posts.length === 0 && (
          <p className="text-sm text-sika-cream/50">No insights yet. Create your first draft.</p>
        )}
      </div>

      <div className="glass-panel glow-green min-h-[480px] p-6 md:p-8">
        {creating || selectedId ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="section-tag">{creating ? "New draft" : "Edit insight"}</p>
              {form.status === "published" && form.slug && (
                <Link href={`/insights/${form.slug}`} className="text-xs text-sika-gold hover:underline">
                  View live →
                </Link>
              )}
            </div>

            <AdminField label="Title">
              <AdminTextInput value={form.title || ""} onChange={(v) => updateField("title", v)} />
            </AdminField>

            <AdminField label="Slug (URL)">
              <AdminTextInput
                value={form.slug || ""}
                onChange={(v) => updateField("slug", v)}
                placeholder="auto-generated-from-title"
              />
            </AdminField>

            <AdminField label="Excerpt">
              <AdminTextarea
                value={form.excerpt || ""}
                onChange={(v) => updateField("excerpt", v)}
                rows={3}
                placeholder="Short summary for listings and SEO"
              />
            </AdminField>

            <AdminField label="Body">
              <AdminTextarea
                value={form.body || ""}
                onChange={(v) => updateField("body", v)}
                rows={12}
                placeholder="Write insight content. Separate paragraphs with blank lines."
              />
            </AdminField>

            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Author">
                <AdminTextInput value={form.author || ""} onChange={(v) => updateField("author", v)} />
              </AdminField>
              <AdminField label="Tags (comma-separated)">
                <AdminTextInput
                  value={tagsValue}
                  onChange={(v) => updateField("tags", v.split(",").map((t) => t.trim()).filter(Boolean))}
                />
              </AdminField>
            </div>

            <AdminField label="Cover image URL (optional)">
              <AdminTextInput
                value={form.coverImage || ""}
                onChange={(v) => updateField("coverImage", v)}
                placeholder="/images/hero-ghana-mobile-money.png"
              />
            </AdminField>

            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <button type="button" onClick={saveDraft} className="btn-secondary glass-button text-sm">
                Save draft
              </button>
              <button type="button" onClick={publish} className="btn-primary btn-shine text-sm">
                {form.status === "published" ? "Update published" : "Publish"}
              </button>
              {form.status === "published" && !creating && (
                <button type="button" onClick={unpublish} className="btn-secondary glass-button text-sm">
                  Unpublish
                </button>
              )}
              {!creating && selectedId && (
                <button type="button" onClick={removePost} className="text-sm text-sika-red/80 hover:text-sika-red">
                  Delete
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-sika-cream/45">
            Select an insight or create a new draft
          </p>
        )}
      </div>
    </div>
  );
}
