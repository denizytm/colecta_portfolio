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
    icon.png          sekme simgesi
  components/         bölümler: Hero, Works, Services, Process, Faq, Contact
                      Ribbon.tsx — logodaki şerit motifi, hero arkasında
  config/site.ts      iletişim bilgileri
  content/
    dictionary.ts     bütün metinler (tr + en)
    works.ts          koleksiyon kayıtları
    sections.ts       bölüm çapa adları
  proxy.ts            dilsiz adresleri /tr veya /en'e yönlendirir
public/works/         iş görselleri
public/brand/         logo
images/logo.jpeg      marka panosu (kaynak)
```

### Tasarım kararları

Renk, yazı tipi ve ölçek `src/app/globals.css` içindeki `@theme` bloğunda
tanımlı. Oradaki bir değeri değiştirmek siteyi baştan aşağı etkiler.

Palet ve yazı tipi **`images/logo.jpeg`** içindeki marka panosundan geliyor.
Site koyu lacivert üzerine kurulu; tek açık bant iletişim bölümü.

| Belirteç | Değer | Nerede |
| --- | --- | --- |
| `--color-ink` | `#0f172a` | sayfa zemini |
| `--color-ink-raised` | `#1e293b` | İşler ve Süreç bantları |
| `--color-ink-deep` | `#080d1a` | alt bilgi |
| `--color-paper` | `#e2e8f0` | koyu zeminde metin + iletişim bandı |
| `--color-paper-muted` | `#94a3b8` | koyu zeminde ikincil metin |
| `--color-ultra` | `#6366f1` | marka aksanı |
| `--color-ultra-bright` | `#818cf8` | koyu zeminde aksan metin |
| `--color-ultra-deep` | `#4f46e5` | dolgulu butonlar (beyaz metin AA geçsin diye) |
| `--font-display` | Sora | başlıklar — panoda belirtilen yazı tipi |
| `--font-text` | Instrument Sans | gövde metni |

Logo `public/brand/colecta-mark.png`, sekme simgesi `src/app/icon.png`;
ikisi de panodan kesildi. Kaynak dosya `images/logo.jpeg` olarak duruyor.

Bütün metinler WCAG AA kontrast eşiğini geçiyor — düşük opaklıklı gri
(`text-paper/40` gibi) yerine adlandırılmış `paper-muted` / `ink-muted`
tonlarını kullanın, onlar ölçülerek seçildi.

Hareket parçaları `src/components/motion/` altında toplandı:

| Parça | Nerede |
| --- | --- |
| `RevealText` | Başlıklar kelime kelime maskeden çıkar; her başlık bir kez oynar |
| `ScrollProgress` | Sayfanın en üstündeki ince ilerleme çizgisi |
| `Magnetic` | Butonların imlece hafifçe yaslanması |

Bunların dışında: hero vitrini kaydırmayla metinden yavaş kayar (paralaks) ve
imleci takip ederek yatar; işler bandı dar ve köşeleri yuvarlak gelip tam
genişliğe oturur; katalog künyesi satır satır dolar; hizmet satırlarında
imlecin geldiği yere kadar ultramarin bir çizgi çekilir; üst menü altından
geçen bandın rengine göre açık/koyu arasında geçiş yapar.

Hepsi ya kullanıcının hareketine cevap verir ya da bir kez oynayıp durur —
bölüm başına tekrarlayan giriş animasyonu bilerek yok. `prefers-reduced-motion`
açık olan cihazlarda tamamı kapanır ve hiçbir metin gizli kalmaz.
