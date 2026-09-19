import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/content/dictionary";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "tr" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${site.url}/${l}`]),
      ),
    },
  }));
}
