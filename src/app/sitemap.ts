import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const paths = [
  "",
  "/genesis",
  "/candidates",
  "/docs",
  "/explorer",
  "/testnet",
  "/announce",
  "/insights",
  "/press",
  "/status",
  "/developers",
  "/producers",
  "/governance",
  "/roadmap",
  "/ghana",
  "/sika-app",
  "/apply",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}${path}`])),
      },
    })),
  );
}
