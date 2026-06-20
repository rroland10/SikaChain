import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Instrument_Serif, Manrope } from "next/font/google";
import { AIConcierge } from "@/components/ui/AIConcierge";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004"),
    title: {
      default: t("siteTitle"),
      template: `%s | SikaChain`,
    },
    description: t("siteDescription"),
    icons: {
      icon: "/brand/sika-favicon.svg",
    },
    openGraph: {
      title: t("siteTitle"),
      description: t("siteDescription"),
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "ak" ? "ak_GH" : "en_GH",
      siteName: "SikaChain",
      images: [
        {
          url: "/images/hero-ghana-mobile-money.png",
          width: 1200,
          height: 630,
          alt: "SikaChain mobile money settlement",
        },
      ],
    },
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    category: "finance",
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${bricolage.variable} ${instrument.variable} ${manrope.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <OrganizationJsonLd />
          <AmbientBackground />
          <ScrollProgress />
          <SiteHeader />
          <main className="relative">{children}</main>
          <SiteFooter />
          <AIConcierge />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
