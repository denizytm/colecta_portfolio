import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "../globals.css";
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "@/content/dictionary";
import { site } from "@/config/site";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
});

const text = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en", "x-default": "/tr" },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${display.variable} ${text.variable}`}>
      <head>
        <noscript>
          {/* Masked headings park their words below the clip until motion
              runs; without scripting they must simply be visible. */}
          <style>{".reveal-word{transform:none !important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

export type { Locale };
