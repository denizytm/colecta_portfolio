/**
 * ─────────────────────────────────────────────────────────────
 *  DOLDURULACAK / TO FILL IN
 *  Sitenin her yerinde kullanılan iletişim bilgileri burada.
 *  Aşağıdaki PLACEHOLDER değerlerini kendi bilgilerinizle
 *  değiştirin; başka hiçbir dosyaya dokunmanız gerekmez.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Colecta",
  wordmark: "Colecta",
  /** Marka panosundaki slogan. */
  tagline: "Build Together. Go Further.",

  /** Yayına alınacak alan adı. OG etiketleri ve sitemap bunu kullanır. */
  url: "https://colecta.com.tr", // TODO: gerçek alan adı

  /** TODO: gerçek e-posta adresiniz */
  email: "merhaba@colecta.com.tr",

  /** Uluslararası biçim, boşluksuz — tel: ve WhatsApp bağlantıları bunu kullanır. */
  phoneE164: "+905531310762",
  phoneDisplay: "+90 553 131 07 62",

  instagram: "https://www.instagram.com/colectasoftware/",
  instagramHandle: "@colectasoftware",
} as const;

/** WhatsApp sohbetini hazır mesajla açar. */
export function whatsappUrl(message: string): string {
  const number = site.phoneE164.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** E-posta hâlâ örnek değerse true döner. */
export const hasPlaceholderEmail = site.email.startsWith("merhaba@colecta");
