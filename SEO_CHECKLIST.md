# TurkHekim — SEO Checklist (Faz 4)

**Güncelleme:** 2026-05-31

## 1. Meta + Canonical Durumu (Yeni Modüller)

| Sayfa | `<title>` | `description` | `canonical` | OG | JSON-LD |
|---|:-:|:-:|:-:|:-:|:-:|
| `/hukuk` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/hukuk/ai-danisman` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/hukuk/avukatlar` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/hukuk/avukat/[slug]` | ✅ (dinamik) | ✅ | ✅ | ⚠️ kalıt | ✅ LegalService |
| `/hukuk/makaleler` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/hukuk/makale/[slug]` | ✅ (dinamik) | ✅ | ✅ | ✅ | ✅ Article |
| `/hukuk/danismanlik-talep` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/hukuk/sik-sorulan-sorular` | ✅ | ✅ | ✅ | ⚠️ kalıt | ✅ **FAQPage** |
| `/pazaryeri` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/pazaryeri/ilan/[id]` | ✅ (dinamik) | ✅ | ✅ | ⚠️ kalıt | ✅ Product |
| `/pazaryeri/talepler` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/pazaryeri/talep-olustur` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/klinikler` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |
| `/klinik/[slug]` | ✅ (dinamik) | ✅ | ✅ | ⚠️ kalıt | ✅ **MedicalClinic** |
| `/klinik-kayit` | ✅ | ✅ | — | ⚠️ kalıt | — |
| `/firma-kayit` | ✅ | ✅ | — | ⚠️ kalıt | — |
| `/avukat-kayit` | ✅ | ✅ | — | ⚠️ kalıt | — |
| `/tercuman-talep` | ✅ | ✅ | ✅ | ⚠️ kalıt | — |

⚠️ kalıt = `app/layout.js`'in default Open Graph'ı miras alıyor — sayfa bazında özelleştirilmedi (öncelik düşük; sosyal paylaşımda kategori bazlı OG eklemek istenirse Faz 5).

## 2. JSON-LD Schema'lar
- ✅ **Physician** — `/doktor/[slug]` (önceden vardı)
- ✅ **Organization** — anasayfa (önceden vardı)
- ✅ **MedicalClinic** — yeni: `/klinik/[slug]`
- ✅ **LegalService** — yeni: `/hukuk/avukat/[slug]`
- ✅ **Article** — yeni: `/hukuk/makale/[slug]`
- ✅ **Product** — yeni: `/pazaryeri/ilan/[id]`
- ✅ **FAQPage** — yeni: `/hukuk/sik-sorulan-sorular` (13 soru)

**Eksik (Faz 5 önerisi):**
- `MedicalProcedure` — `/tedaviler/[slug]` sayfalarına eklenebilir.
- `BreadcrumbList` — hiçbir sayfada yok, eklemek SERP'te göze çarpan ekstra satır verir.

## 3. Sitemap
- ✅ `src/app/sitemap.js` güncellendi → **baseUrl artık turkhekim.com**.
- ✅ Yeni dinamik rotalar dahil:
  - `/hukuk/avukat/[slug]`, `/hukuk/makale/[slug]`
  - `/klinik/[slug]`, `/firma/[slug]`, `/pazaryeri/ilan/[id]`
- ✅ Yeni statik sayfalar (Hukuk × 8, Pazaryeri × 4, Klinik × 2, Tercüman talep) eklendi.
- ⚠️ `robots.js`'in sitemap referansı kontrol edilmeli.

## 4. robots.txt
- ✅ Mevcut, üretilen `robots.txt` Vercel build sonrası yayında.
- ⚠️ Admin route'lar (`/admin/*`) `Disallow` ile bloklanmış mı kontrol et.

## 5. URL Slug Stratejisi
- ✅ Türkçe karakterler doğru transliterate ediliyor (`slugOlustur` her modülde aynı pattern: ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u).
- ✅ Çakışmada `${slug}-${Date.now().toString(36)}` ile benzersizleştirme.

## 6. Anasayfa Programatik SEO Önerisi (Rekabet raporundan)
Doktorsitesi.com 50+ iç link veriyor. TurkHekim de:
- [ ] Anasayfaya **"Popüler şehir + hastalık"** kombo bölümü ekle (en az 20 link).
- [ ] `/hastaliklar/[slug]/[sehir]` route'u kur (mevcut hastaliklar var ama şehir kombosuz).

## 7. Image Optimization (kalıt sorun)
- ⚠️ Şehir görsel ve hero görselleri hâlâ native `<img>` — `next/image` migrasyonu Faz 5.
- ⚠️ Yeni modüllerde de native `<img>` kullanıldı (Faz 3 hızı için) — `next/image` opsiyonel.

## 8. Core Web Vitals (Lighthouse Hedefleri)
- **LCP** < 2.5s (target 90+ mobile)
- **INP** < 200ms
- **CLS** < 0.1

Üretim deploy sonrası ölç: `https://pagespeed.web.dev/`.

## 9. Hreflang (Çok Dilli)
- Mevcut `/en`, `/ar`, `/fa`, `/ru` rotaları var ama `<link rel="alternate" hreflang>` eklenmiş mi kontrol et (Faz 5).

## 10. Google Search Console Aksiyonu
- [ ] Vercel deploy sonrası `https://turkhekim.com` domain kayıt
- [ ] DNS TXT record ile doğrulama
- [ ] Sitemap submit: `https://turkhekim.com/sitemap.xml`
- [ ] Bing Webmaster Tools'a da aynı sitemap
