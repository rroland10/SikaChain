import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

  return [
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
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
