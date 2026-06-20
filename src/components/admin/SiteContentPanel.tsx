"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminField, AdminTextarea, AdminTextInput } from "@/components/admin/AdminFields";
import type {
  AnnounceContentEditable,
  HomeContentEditable,
  PressContentEditable,
  SiteContentDoc,
  SiteContentSection,
} from "@/lib/cms/types";

type SiteContentPanelProps = {
  authHeaders: () => HeadersInit;
  onMessage: (message: string) => void;
  onError: (error: string) => void;
};

const SECTION_LABELS: Record<SiteContentSection, string> = {
  announce: "Launch announcement",
  press: "Press kit",
  home: "Homepage",
};

export function SiteContentPanel({ authHeaders, onMessage, onError }: SiteContentPanelProps) {
  const [section, setSection] = useState<SiteContentSection>("announce");
  const [content, setContent] = useState<SiteContentDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadContent = useCallback(async () => {
    setLoading(true);
    onError("");
    try {
      const res = await fetch("/api/admin/content", { headers: authHeaders() });
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as { content: SiteContentDoc };
      setContent(data.content);
    } catch {
      onError("Failed to load site content");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, onError]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  async function saveSection() {
    if (!content) return;
    setSaving(true);
    onError("");
    onMessage("");

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ section, data: content[section] }),
    });

    const json = await res.json();
    setSaving(false);

    if (!res.ok) {
      onError(json.error || "Failed to save");
      return;
    }

    setContent(json.content);
    onMessage(json.message || "Content saved");
  }

  async function resetSection() {
    if (!confirm(`Reset ${SECTION_LABELS[section]} to built-in defaults?`)) return;

    const res = await fetch(`/api/admin/content?section=${section}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    const json = await res.json();
    if (!res.ok) {
      onError(json.error || "Failed to reset");
      return;
    }

    setContent(json.content);
    onMessage(`${SECTION_LABELS[section]} reset to defaults`);
  }

  function updateAnnounce(patch: Partial<AnnounceContentEditable>) {
    if (!content) return;
    setContent({ ...content, announce: { ...content.announce, ...patch } });
  }

  function updatePress(patch: Partial<PressContentEditable>) {
    if (!content) return;
    setContent({ ...content, press: { ...content.press, ...patch } });
  }

  function updateHome(patch: Partial<HomeContentEditable>) {
    if (!content) return;
    setContent({ ...content, home: { ...content.home, ...patch } });
  }

  if (loading || !content) {
    return <p className="text-sm text-sika-cream/50">Loading site content…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SECTION_LABELS) as SiteContentSection[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSection(key)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold ${
              section === key
                ? "border-sika-gold/40 bg-sika-gold/15 text-sika-gold"
                : "border-white/10 text-sika-cream/60"
            }`}
          >
            {SECTION_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="glass-panel glow-gold space-y-5 p-6 md:p-8">
        {section === "announce" && (
          <>
            <AdminField label="Headline">
              <AdminTextInput
                value={content.announce.headline}
                onChange={(v) => updateAnnounce({ headline: v })}
              />
            </AdminField>
            <AdminField label="Subheadline">
              <AdminTextarea
                value={content.announce.subheadline}
                onChange={(v) => updateAnnounce({ subheadline: v })}
                rows={2}
              />
            </AdminField>
            <AdminField label="Announcement body">
              <AdminTextarea
                value={content.announce.body}
                onChange={(v) => updateAnnounce({ body: v })}
                rows={10}
              />
            </AdminField>
            <AdminField label="Consumer message">
              <AdminTextarea
                value={content.announce.consumerMessage}
                onChange={(v) => updateAnnounce({ consumerMessage: v })}
                rows={2}
              />
            </AdminField>
            <AdminField label="Infrastructure message">
              <AdminTextInput
                value={content.announce.infrastructureMessage}
                onChange={(v) => updateAnnounce({ infrastructureMessage: v })}
              />
            </AdminField>
            {content.announce.quotes.map((quote, index) => (
              <div key={index} className="rounded-xl border border-white/10 p-4">
                <AdminField label={`Quote ${index + 1} role`}>
                  <AdminTextInput
                    value={quote.role}
                    onChange={(v) => {
                      const quotes = [...content.announce.quotes];
                      quotes[index] = { ...quotes[index], role: v };
                      updateAnnounce({ quotes });
                    }}
                  />
                </AdminField>
                <AdminField label={`Quote ${index + 1} text`}>
                  <AdminTextarea
                    value={quote.text}
                    onChange={(v) => {
                      const quotes = [...content.announce.quotes];
                      quotes[index] = { ...quotes[index], text: v };
                      updateAnnounce({ quotes });
                    }}
                    rows={3}
                  />
                </AdminField>
              </div>
            ))}
            <AdminField label="Launch steps (one per line)">
              <AdminTextarea
                value={content.announce.launchSteps.join("\n")}
                onChange={(v) => updateAnnounce({ launchSteps: v.split("\n").filter(Boolean) })}
                rows={6}
              />
            </AdminField>
          </>
        )}

        {section === "press" && (
          <>
            <AdminField label="Company boilerplate">
              <AdminTextarea
                value={content.press.boilerplate}
                onChange={(v) => updatePress({ boilerplate: v })}
                rows={8}
              />
            </AdminField>
            <AdminField label="Media contact blurb">
              <AdminTextarea
                value={content.press.mediaContact}
                onChange={(v) => updatePress({ mediaContact: v })}
                rows={4}
              />
            </AdminField>
          </>
        )}

        {section === "home" && (
          <>
            <AdminField label="Hero eyebrow">
              <AdminTextInput value={content.home.eyebrow} onChange={(v) => updateHome({ eyebrow: v })} />
            </AdminField>
            <AdminField label="Hero highlight (green text)">
              <AdminTextInput
                value={content.home.heroHighlight}
                onChange={(v) => updateHome({ heroHighlight: v })}
              />
            </AdminField>
            <AdminField label="Hero subtitle">
              <AdminTextarea value={content.home.subtitle} onChange={(v) => updateHome({ subtitle: v })} rows={2} />
            </AdminField>
            <AdminField label="Hero description">
              <AdminTextarea
                value={content.home.description}
                onChange={(v) => updateHome({ description: v })}
                rows={3}
              />
            </AdminField>
            <AdminField label="Positioning section title">
              <AdminTextInput
                value={content.home.positioningTitle}
                onChange={(v) => updateHome({ positioningTitle: v })}
              />
            </AdminField>
            <AdminField label="Positioning section lead">
              <AdminTextarea
                value={content.home.positioningLead}
                onChange={(v) => updateHome({ positioningLead: v })}
                rows={2}
              />
            </AdminField>
            <AdminField label="SikaChain thesis card">
              <AdminTextarea
                value={content.home.sikaChainThesis}
                onChange={(v) => updateHome({ sikaChainThesis: v })}
                rows={3}
              />
            </AdminField>
            <AdminField label="Sika App card">
              <AdminTextarea
                value={content.home.sikaAppDescription}
                onChange={(v) => updateHome({ sikaAppDescription: v })}
                rows={3}
              />
            </AdminField>
            <AdminField label="Genesis producers card">
              <AdminTextarea
                value={content.home.producersDescription}
                onChange={(v) => updateHome({ producersDescription: v })}
                rows={3}
              />
            </AdminField>
          </>
        )}

        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={saveSection}
            disabled={saving}
            className="btn-primary btn-shine text-sm disabled:opacity-50"
          >
            {saving ? "Saving…" : `Save ${SECTION_LABELS[section]}`}
          </button>
          <button type="button" onClick={resetSection} className="btn-secondary glass-button text-sm">
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}
