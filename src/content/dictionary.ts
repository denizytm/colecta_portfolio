export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Turkish is the source of truth for the shape of the content; the English
 * dictionary is type-checked against it, so a missing key fails the build.
 * Deliberately not `as const` — that would pin every value to its own literal
 * type and make the two locales incompatible.
 */
const tr = {
  meta: {
    title: "Colecta — Web sitesi ve mobil uygulama",
    description:
      "İşletmeniz için web sitesi ve mobil uygulama yapıyoruz. Tasarımdan alan adına, yayına kadar tek elden. Yapılmış işlere bakın, teklif alın.",
    ogAlt: "Colecta — yapılmış işlerin koleksiyonu",
  },
  nav: {
    works: "İşler",
    services: "Hizmetler",
    process: "Nasıl çalışıyoruz",
    faq: "Sorular",
    contact: "İletişim",
    menu: "Menü",
    close: "Kapat",
    skipToContent: "İçeriğe geç",
  },
  hero: {
    lines: ["Yapılmış işlerin", "koleksiyonu."],
    lead: "İşletmeniz için web sitesi ve mobil uygulama yapıyoruz. Tasarımdan alan adına, yayına kadar tek elden.",
    primaryCta: "Teklif alın",
    secondaryCta: "İşlere bakın",
    scrollHint: "Koleksiyon",
  },
  works: {
    kicker: "Koleksiyon",
    title: "Teslim ettiğimiz işler",
    lead: "Her kaydın künyesi açık: kim için, ne zaman, neyle yapıldı ve tam olarak ne teslim edildi.",
    recordNo: "Katalog no",
    recordClient: "Müşteri",
    recordYear: "Yıl",
    recordKind: "Tür",
    recordStack: "Teknoloji",
    recordDelivered: "Teslim edilenler",
    visit: "Siteyi açın",
    emptyTitle: "Koleksiyon büyüyor",
    emptyBody: "Yeni teslim edilen işler burada yayımlanacak.",
    nextSlot: "Sıradaki kayıt sizin işiniz olabilir.",
    nextSlotCta: "Konuşalım",
  },
  services: {
    kicker: "Hizmetler",
    title: "Ne yapıyoruz",
    lead: "Üç ana iş yapıyoruz. Hangisinin size uyduğundan emin değilseniz arayın, konuşarak karar verelim.",
    expand: "İçeriğini görün",
    collapse: "Kapatın",
    includedTitle: "Hepsine dahil",
    included: [
      "Alan adı alımı ve yönlendirmesi",
      "SSL sertifikası ve güvenli bağlantı",
      "Yayına alma ve sunucu kurulumu",
      "Aramalarda bulunabilirlik ayarları",
      "Teslim sonrası bir yıl teknik destek",
    ],
    items: [
      {
        name: "Kurumsal web sitesi",
        tagline: "Firmanızı anlatan, arandığınızda bulunan site.",
        body: "Şirketinizi, projelerinizi ve iletişim bilgilerinizi doğru anlatan bir site. Telefonda da bilgisayarda da aynı düzgünlükte çalışır.",
        includes: [
          "Kurumsal tanıtım sayfaları",
          "Proje, ürün veya hizmet arşivi",
          "İletişim formu ve harita",
          "Arama motoru için başlık ve açıklamalar",
          "Telefon ve tablet uyumu",
          "İsteğe bağlı yönetim paneli",
        ],
      },
      {
        name: "E-ticaret",
        tagline: "Ürünlerinizi internetten satın.",
        body: "Sipariş alan, ödeme tahsil eden ve kargoyu takip eden bir mağaza. Ürünleri kendiniz ekleyip çıkarabilirsiniz.",
        includes: [
          "Ürün ve kategori yönetimi",
          "Sepet ve ödeme altyapısı",
          "Kargo firması entegrasyonu",
          "Sipariş ve stok takibi",
          "Kampanya ve indirim kodları",
          "Satış raporları",
        ],
      },
      {
        name: "Mobil uygulama",
        tagline: "iOS ve Android için tek seferde.",
        body: "Tek kod tabanıyla iki mağazaya birden çıkan uygulama. Mağaza yayın sürecini de biz yürütüyoruz.",
        includes: [
          "iOS ve Android sürümü",
          "Bildirim gönderme",
          "App Store ve Google Play yayını",
          "Mevcut sitenizle bağlantı",
          "Sürüm güncellemeleri",
        ],
      },
    ],
  },
  process: {
    kicker: "Nasıl çalışıyoruz",
    title: "Altı adım",
    lead: "İlk görüşmeden yayına kadar izlediğimiz yol. Her adımın sonunda siz onaylamadan bir sonrakine geçmiyoruz.",
    steps: [
      {
        name: "Görüşme",
        body: "Ne istediğinizi dinliyoruz. Telefon, WhatsApp veya yüz yüze. Bu görüşme ücretsiz.",
      },
      {
        name: "Teklif",
        body: "Kapsamı, süreyi ve ücreti yazılı veriyoruz. Sonradan sürpriz kalem çıkmıyor.",
      },
      {
        name: "Taslak",
        body: "Hangi sayfalar olacak, hangi bilgi nerede duracak — planı onayınıza sunuyoruz.",
      },
      {
        name: "Tasarım",
        body: "Ekranları hazırlıyoruz. Beğenmediğiniz yeri söylüyorsunuz, değiştiriyoruz.",
      },
      {
        name: "Geliştirme",
        body: "Kodluyoruz. Telefonda, tablette ve bilgisayarda tek tek test ediyoruz.",
      },
      {
        name: "Yayın",
        body: "Alan adını alıyoruz, siteyi açıyoruz, aramalara kaydediyoruz. Sonrasında da yanınızdayız.",
      },
    ],
  },
  faq: {
    kicker: "Sorular",
    title: "Sık sorulanlar",
    items: [
      {
        q: "Ne kadar sürüyor?",
        a: "Kurumsal site genelde iki ile üç hafta arasında teslim ediliyor. E-ticaret dört ile altı hafta sürüyor. Mobil uygulama kapsamına göre altı haftadan başlıyor. Kesin süreyi teklifte yazılı veriyoruz.",
      },
      {
        q: "Alan adını ben mi alacağım?",
        a: "Hayır, alan adını biz alıyoruz ve ayarlarını yapıyoruz. .com da olur .com.tr de. Alan adı sizin adınıza kayıtlı olur, sahibi sizsiniz.",
      },
      {
        q: "Sitenin sahibi kim oluyor?",
        a: "Siz. Alan adı, barındırma hesabı ve kaynak kodu size ait. İleride başka biriyle çalışmak isterseniz her şeyi devrediyoruz.",
      },
      {
        q: "Yazıları ve fotoğrafları kim hazırlıyor?",
        a: "Elinizde hazır metin ve görsel varsa onları kullanıyoruz. Yoksa metinleri biz yazıyoruz, fotoğraf için ne çekmeniz gerektiğini tarif ediyoruz.",
      },
      {
        q: "Teslimden sonra değişiklik yapabilir miyim?",
        a: "Evet. Küçük değişiklikleri ilk yıl boyunca ücretsiz yapıyoruz. Metin ve görselleri kendiniz güncellemek isterseniz bunun için bir yönetim paneli de kurabiliyoruz.",
      },
      {
        q: "Mobil uygulama da yapıyor musunuz?",
        a: "Evet. iOS ve Android için tek kod tabanıyla geliştiriyoruz, App Store ve Google Play yayın sürecini de biz yürütüyoruz.",
      },
    ],
  },
  contact: {
    kicker: "İletişim",
    title: "Ne yaptırmak istiyorsunuz?",
    lead: "Kısaca yazın, aynı gün dönelim. Acelesi varsa WhatsApp en hızlısı.",
    whatsapp: "WhatsApp'tan yazın",
    whatsappPrefill: "Merhaba, bir web sitesi yaptırmak istiyorum.",
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
    instagramLabel: "Instagram",
    form: {
      name: "Adınız",
      namePlaceholder: "Ad Soyad",
      contact: "Telefon veya e-posta",
      contactPlaceholder: "Size nasıl dönelim?",
      subject: "Ne istiyorsunuz?",
      subjectOptions: [
        "Kurumsal web sitesi",
        "E-ticaret",
        "Mobil uygulama",
        "Mevcut siteme destek",
        "Henüz emin değilim",
      ],
      message: "Kısaca anlatın",
      messagePlaceholder:
        "İşinizden ve sitede olmasını istediğiniz şeylerden bahsedin.",
      submit: "Gönderin",
      submitting: "Gönderiliyor",
      success: "Mesajınız ulaştı. Aynı gün içinde döneceğiz.",
      error:
        "Mesaj gönderilemedi. WhatsApp'tan yazabilir veya doğrudan e-posta atabilirsiniz.",
      required: "Bu alan gerekli",
    },
  },
  footer: {
    tagline: "Web sitesi ve mobil uygulama.",
    rights: "Tüm hakları saklıdır.",
    builtWith: "Bu site Next.js ile yapıldı ve Vercel üzerinde yayında.",
    sections: "Bölümler",
    reach: "Ulaşın",
  },
  localeSwitch: {
    label: "Dil",
    tr: "Türkçe",
    en: "English",
  },
};

type Dictionary = typeof tr;

const en: Dictionary = {
  meta: {
    title: "Colecta — Websites and mobile apps",
    description:
      "We build websites and mobile apps for small businesses. Design, domain and launch handled end to end. See the work, ask for a quote.",
    ogAlt: "Colecta — a collection of built work",
  },
  nav: {
    works: "Work",
    services: "Services",
    process: "How we work",
    faq: "Questions",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
  },
  hero: {
    lines: ["A collection of", "the work."],
    lead: "We build websites and mobile apps for businesses. Design, domain and launch, handled end to end.",
    primaryCta: "Ask for a quote",
    secondaryCta: "See the work",
    scrollHint: "Collection",
  },
  works: {
    kicker: "Collection",
    title: "What we have delivered",
    lead: "Every record is open: who it was for, when, what it was built with and exactly what was handed over.",
    recordNo: "Catalogue no",
    recordClient: "Client",
    recordYear: "Year",
    recordKind: "Type",
    recordStack: "Built with",
    recordDelivered: "Delivered",
    visit: "Open the site",
    emptyTitle: "The collection is growing",
    emptyBody: "Newly delivered work will be published here.",
    nextSlot: "The next record could be your project.",
    nextSlotCta: "Let us talk",
  },
  services: {
    kicker: "Services",
    title: "What we do",
    lead: "Three main things. If you are not sure which one fits, call us and we will work it out together.",
    expand: "See what is included",
    collapse: "Close",
    includedTitle: "Included in all",
    included: [
      "Domain registration and setup",
      "SSL certificate and secure connection",
      "Launch and server configuration",
      "Search listing configuration",
      "One year of technical support after delivery",
    ],
    items: [
      {
        name: "Corporate website",
        tagline:
          "A site that explains your company and shows up when people search.",
        body: "Your company, your projects and your contact details, presented properly. Works the same on a phone as on a desktop.",
        includes: [
          "Company and service pages",
          "Project, product or service archive",
          "Contact form and map",
          "Search titles and descriptions",
          "Phone and tablet layouts",
          "Optional admin panel",
        ],
      },
      {
        name: "E-commerce",
        tagline: "Sell your products online.",
        body: "A store that takes orders, collects payment and tracks shipping. You add and remove products yourself.",
        includes: [
          "Product and category management",
          "Cart and payment handling",
          "Shipping carrier integration",
          "Order and stock tracking",
          "Campaigns and discount codes",
          "Sales reports",
        ],
      },
      {
        name: "Mobile app",
        tagline: "iOS and Android in one go.",
        body: "One codebase shipped to both stores. We handle the store submission process too.",
        includes: [
          "iOS and Android builds",
          "Push notifications",
          "App Store and Google Play release",
          "Connection to your existing site",
          "Version updates",
        ],
      },
    ],
  },
  process: {
    kicker: "How we work",
    title: "Six steps",
    lead: "The path from first call to launch. Nothing moves to the next step until you approve the one before it.",
    steps: [
      {
        name: "Talk",
        body: "We listen to what you need. Phone, WhatsApp or in person. This conversation is free.",
      },
      {
        name: "Quote",
        body: "Scope, timing and cost in writing. No line items appear later.",
      },
      {
        name: "Outline",
        body: "Which pages exist and what goes where — we send the plan for your approval.",
      },
      {
        name: "Design",
        body: "We prepare the screens. You tell us what you do not like and we change it.",
      },
      {
        name: "Build",
        body: "We write the code and test it on phones, tablets and desktops one by one.",
      },
      {
        name: "Launch",
        body: "We register the domain, put the site live and get it listed. We stay available afterwards.",
      },
    ],
  },
  faq: {
    kicker: "Questions",
    title: "Frequently asked",
    items: [
      {
        q: "How long does it take?",
        a: "A corporate site is usually delivered in two to three weeks. E-commerce takes four to six weeks. A mobile app starts at six weeks depending on scope. The exact timing is written into your quote.",
      },
      {
        q: "Do I have to register the domain myself?",
        a: "No, we register it and configure it. A .com or a .com.tr both work. The domain is registered in your name and belongs to you.",
      },
      {
        q: "Who owns the site?",
        a: "You do. The domain, the hosting account and the source code are yours. If you ever want to work with someone else, we hand everything over.",
      },
      {
        q: "Who writes the text and supplies the photos?",
        a: "If you already have text and images, we use them. If not, we write the text and tell you exactly what photos to take.",
      },
      {
        q: "Can I make changes after delivery?",
        a: "Yes. Small changes are free for the first year. If you want to update text and images yourself, we can set up an admin panel for that.",
      },
      {
        q: "Do you build mobile apps as well?",
        a: "Yes. We build for iOS and Android from one codebase and handle the App Store and Google Play release process.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "What do you want built?",
    lead: "Write a few lines and we will get back to you the same day. If it is urgent, WhatsApp is fastest.",
    whatsapp: "Message on WhatsApp",
    whatsappPrefill: "Hello, I would like to have a website built.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    instagramLabel: "Instagram",
    form: {
      name: "Your name",
      namePlaceholder: "Full name",
      contact: "Phone or email",
      contactPlaceholder: "How should we reach you?",
      subject: "What do you need?",
      subjectOptions: [
        "Corporate website",
        "E-commerce",
        "Mobile app",
        "Support for an existing site",
        "Not sure yet",
      ],
      message: "Tell us briefly",
      messagePlaceholder:
        "Describe your business and what you want on the site.",
      submit: "Send",
      submitting: "Sending",
      success: "Your message arrived. We will get back to you today.",
      error:
        "The message could not be sent. Try WhatsApp or email us directly.",
      required: "This field is required",
    },
  },
  footer: {
    tagline: "Websites and mobile apps.",
    rights: "All rights reserved.",
    builtWith: "This site is built with Next.js and runs on Vercel.",
    sections: "Sections",
    reach: "Reach us",
  },
  localeSwitch: {
    label: "Language",
    tr: "Türkçe",
    en: "English",
  },
};

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
