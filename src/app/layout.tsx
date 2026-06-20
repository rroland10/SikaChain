import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Manrope } from "next/font/google";
import { AIConcierge } from "@/components/ui/AIConcierge";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  style: ["italic"],
  weight: ["400"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004"),
  title: {
    default: "SikaChain — Mobile Money Settlement Network",
    template: "%s | SikaChain",
  },
  description: site.description,
  icons: {
    icon: "/brand/sika-favicon.svg",
  },
  openGraph: {
    title: "SikaChain — Mobile Money Settlement Network",
    description: site.description,
    type: "website",
    locale: "en_GH",
    siteName: "SikaChain",
    images: [{ url: "/images/hero-ghana-mobile-money.png", width: 1200, height: 630, alt: "SikaChain mobile money settlement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SikaChain — Mobile Money Settlement Network",
    description: site.description,
    images: ["/images/hero-ghana-mobile-money.png"],
  },
  alternates: {
    canonical: "/",
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${instrument.variable} ${manrope.variable}`}>
        <OrganizationJsonLd />
        <AmbientBackground />
        <ScrollProgress />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
        <AIConcierge />
      </body>
    </html>
  );
}
