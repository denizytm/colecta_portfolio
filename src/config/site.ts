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

  /** Alan adı. sitemap.xml, robots.txt ve paylaşım kartları bunu kullanır. */
  /** www asıl adres; apex (www'suz) Vercel tarafında buraya 308 ile
      yönleniyor. canonical ve sitemap yönlendirme hedefini değil,
      son adresi göstermeli. */
  url: "https://www.colectasoftware.com.tr",

  /** TODO: posta kutusu kurulunca doğrulayın — "merhaba" kısmı varsayım. */
  email: "merhaba@colectasoftware.com.tr",

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
export const hasPlaceholderEmail = site.email.startsWith("merhaba@colectasoftware");
