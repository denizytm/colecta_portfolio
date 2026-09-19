# Colecta — portfolyo sitesi

İki dilli (Türkçe/İngilizce) tek sayfalık portfolyo. Next.js 16, TypeScript ve
Tailwind CSS 4 ile yazıldı, Vercel'de yayınlanmak üzere hazırlandı.

```bash
npm install
npm run dev     # http://localhost:3000
```

Adres çubuğuna `/` yazdığınızda tarayıcının diline göre `/tr` veya `/en`
adresine yönlendirilirsiniz.

---

## Sık yapacağınız üç değişiklik

### 1. İletişim bilgileri

Hepsi tek dosyada: **`src/config/site.ts`**

```ts
url:          "https://colecta.com.tr"   // yayına alınan alan adı
email:        "merhaba@colecta.com.tr"
phoneE164:    "+905000000000"            // WhatsApp ve tel: bağlantısı bunu kullanır
phoneDisplay: "+90 500 000 00 00"        // ekranda görünen hâli
```

`phoneE164` boşluksuz ve `+90` ile başlamalı; WhatsApp bağlantısı bu değerden
üretiliyor. Şu an örnek değerler duruyor, **yayına almadan önce doldurun**.

### 2. Koleksiyona yeni iş eklemek

**`src/content/works.ts`** içindeki diziye bir kayıt ekleyin. Dosyanın içinde
kopyalayıp doldurabileceğiniz hazır bir kalıp var.

```ts
{
  no: 2,                                 // katalog numarası, sırayla artar
  slug: "musteri-adi",
  client: "Müşteri Adı",
  year: 2026,
  href: "https://ornek.com",             // canlı adres, yoksa null
  image: "/works/musteri-adi.jpg",       // görseli public/works/ içine koyun
  imageFit: "cover",                     // ekran görüntüsü: cover, logo: contain
  kind:      { tr: "E-ticaret", en: "E-commerce" },
  summary:   { tr: "…", en: "…" },
  stack:     ["Next.js", "Stripe"],
  delivered: { tr: ["Tasarım"], en: ["Design"] },
}
```

Görsel **16:10** oranında olmalı (1440×900 ekran görüntüsü birebir uyar).
Sayfa listeyi olduğu gibi çiziyor — bir iş de olsa, on iş de olsa düzen bozulmaz.

### 3. Metinleri değiştirmek

Sitedeki **bütün** yazılar **`src/content/dictionary.ts`** içinde. Türkçe metin
yapının kaynağı; İngilizce sözlük ona göre tip denetiminden geçiyor. Yani bir
başlığı Türkçede ekleyip İngilizcede unutursanız `npm run build` hata verir.

---

## İletişim formu

Form `POST /api/contact` adresine gidiyor ve mesajı
[Resend](https://resend.com) üzerinden e-posta olarak yolluyor. Üç ortam
değişkeni gerekiyor (`.env.example` dosyasına bakın):

| Değişken | Zorunlu | Açıklama |
| --- | --- | --- |
| `RESEND_API_KEY` | evet | Resend panelinden alınır |
| `CONTACT_TO` | evet | Mesajların düşeceği e-posta adresi |
| `CONTACT_FROM` | hayır | Gönderen adresi; alan adı Resend'de doğrulanmış olmalı |

Bu değişkenler tanımlı değilken form "gönderilemedi" diyor ve kullanıcıyı
WhatsApp'a yönlendiriyor — yani mesaj ulaşmadığı hâlde ulaştı demiyor.

Yerelde denemek için:

```bash
cp .env.example .env.local   # sonra içini doldurun
```

---

## Vercel'e alma

### İlk kurulum

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** →
   `denizytm/colecta_portfolio`.
2. Ayarlara dokunmayın; Next.js kendiliğinden tanınır.
3. **Environment Variables** altına yukarıdaki üç değişkeni girin.
4. **Deploy**.

Bundan sonra `main` dalına her `git push` yayına çıkar; diğer dallara atılan
push'lar önizleme adresi üretir.

### Alan adı bağlama

Vercel'de **Settings → Domains** → alan adını yazın, ekrandaki DNS kayıtlarını
alan adı sağlayıcınızda tanımlayın. SSL sertifikası otomatik geliyor.

Alan adını bağladıktan sonra `src/config/site.ts` içindeki `url` alanını da
güncelleyin — `sitemap.xml`, `robots.txt` ve paylaşım kartları bu değeri
kullanıyor.

---

## Dosya düzeni

```
src/
  app/
    [locale]/         tek sayfa; layout kök layout'tur (html/body burada)
    api/contact/      form uç noktası
    globals.css       renk, tipografi ve hareket tanımları
    icon.svg          sekme simgesi
  components/         bölümler: Hero, Works, Services, Process, Faq, Contact
  config/site.ts      iletişim bilgileri
  content/
    dictionary.ts     bütün metinler (tr + en)
    works.ts          koleksiyon kayıtları
    sections.ts       bölüm çapa adları
  proxy.ts            dilsiz adresleri /tr veya /en'e yönlendirir
public/works/         iş görselleri
```

### Tasarım kararları

Renk, yazı tipi ve ölçek `src/app/globals.css` içindeki `@theme` bloğunda
tanımlı. Oradaki bir değeri değiştirmek siteyi baştan aşağı etkiler.

| Belirteç | Değer | Nerede |
| --- | --- | --- |
| `--color-paper` | `#ecedf3` | ana zemin |
| `--color-ink` | `#0d1330` | yazı ve koyu bantlar |
| `--color-ultra` | `#2536db` | tek vurgu rengi |
| `--font-display` | Bricolage Grotesque | başlıklar |
| `--font-text` | Instrument Sans | metin |

Hareket bilinçli olarak az: sayfa açılışında tek bir giriş, işler vitrininde
imleci takip eden eğim, süreç çizgisinin kaydırmayla dolması, açılır bölümler.
`prefers-reduced-motion` açık olan cihazlarda hepsi kapanır.
