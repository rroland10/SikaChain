import { site } from "@/lib/content";

export function OrganizationJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: base,
    description: site.description,
    areaServed: site.launchMarket,
    slogan: site.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
