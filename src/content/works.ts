/**
 * Koleksiyon kaydı. Yeni iş eklemek için bu diziye bir nesne ekleyin;
 * katalog numarası (no) sırayla artar, sayfa kendini buna göre kurar.
 *
 * Görseli public/works/ içine koyun. 16:10 veya 1200x630 en iyi durur.
 */

export type Work = {
  /** Katalog numarası — tamamlanma sırasına göre */
  no: number;
  slug: string;
  client: string;
  year: number;
  /** Canlı adres; yoksa null */
  href: string | null;
  image: string;
  /** Görsel site ekran görüntüsü mü, yoksa marka kartı mı? */
  imageFit: "cover" | "contain";
  kind: { tr: string; en: string };
  summary: { tr: string; en: string };
  stack: string[];
  /** Teslim edilen işler — katalog künyesinde listelenir */
  delivered: { tr: string[]; en: string[] };
};

export const works: Work[] = [
  {
    no: 1,
    slug: "gumus-yapi-insaat",
    client: "Gümüş Yapı İnşaat",
    year: 2025,
    href: "https://www.gumusyapiinsaatt.com/",
    image: "/works/gumus-yapi.jpg",
    imageFit: "cover",
    kind: { tr: "Kurumsal web sitesi", en: "Corporate website" },
    summary: {
      tr: "Kentsel dönüşüm ve konut projeleri üreten bir inşaat firması için kurumsal site. Proje arşivi, iki ofis için iletişim ve arama motorlarında görünürlük tek pakette teslim edildi.",
      en: "A corporate site for a construction firm working on urban renewal and housing projects. Project archive, two office locations and search visibility, delivered as one package.",
    },
    stack: ["Next.js", "TypeScript", "Vercel"],
    delivered: {
      tr: ["Tasarım", "Geliştirme", "Alan adı ve yayın", "Google kaydı"],
      en: ["Design", "Development", "Domain and launch", "Search listing"],
    },
  },

  // ── Yeni iş eklemek için bu kalıbı kopyalayın ─────────────────
  // {
  //   no: 2,
  //   slug: "musteri-adi",
  //   client: "Müşteri Adı",
  //   year: 2026,
  //   href: "https://ornek.com",
  //   image: "/works/musteri-adi.jpg",
  //   imageFit: "cover",
  //   kind: { tr: "E-ticaret", en: "E-commerce" },
  //   summary: { tr: "…", en: "…" },
  //   stack: ["Next.js", "Stripe"],
  //   delivered: { tr: ["Tasarım", "Geliştirme"], en: ["Design", "Development"] },
  // },
];
