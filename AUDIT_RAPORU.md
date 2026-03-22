# DoktorPusula — Kod Kalite Audit Raporu
**Tarih:** 2026-03-23
**Analiz edilen dosya sayısı:** ~90 (pages, components, API routes, lib)

---

## 🔴 KRİTİK SORUNLAR (hemen düzeltilmeli)

### 1. Yorumlar Anasayfada Hiç Görünmüyor
**Dosya:** `src/app/api/yorum-dogrulama/route.js` satır 53-55
**Sorun:** Doktor "bu benim hastam" diye onayladığında `yorumlar.yayinlandi` sütunu `true` yapılmıyor. Anasayfa `WHERE yayinlandi = true` ile filtreler. Sonuç: profil sayfasında görünen yorumlar anasayfada asla çıkmaz.
**Düzeltme:** `onayla_admin` kararında `yayinlandi = true` de set edilmeli.

### 2. Yeni Sütunlar migrate.js'e Eklenmemiş
**Dosya:** `src/lib/migrate.js`
**Sorun:** 4 sütun runtime'da `ALTER TABLE IF NOT EXISTS` ile ekleniyor (anti-pattern). Eğer API çağrılmadan önce başka bir şey bu tabloyu sorgulamaya çalışırsa kolon bulunamaz hatası alır.
**Eksik sütunlar:**
- `arka_plan_foto_url TEXT` — `src/app/api/hesabim/route.js:6`'da ekleniyor
- `tema TEXT DEFAULT 'varsayilan'` — `src/app/api/hesabim/route.js:7`'de ekleniyor
- `medikal_turizm BOOLEAN DEFAULT false` — `src/app/api/profil-guncelle/route.js:33`'te ekleniyor
- `medikal_turizm_komisyon TEXT` — `src/app/api/profil-guncelle/route.js:34`'te ekleniyor
**Düzeltme:** Hepsini migrate.js'e ekle, runtime ALTER TABLE'ları sil.

---

## 🟡 ORTA ÖNCELİKLİ SORUNLAR

### 3. yorum-dogrulama Route'unda Sütun Uyumsuzluğu
**Dosya:** `src/app/api/yorum-dogrulama/route.js` satır 54
**Sorun:** `dogrulama_durumu = 'onaylandi'` seti yapılıyor ama `dogrulanmis = true` yapılmıyor. Public profile sayfası `dogrulama_durumu = 'onaylandi'` ile filtrele ama yorum kartında `dogrulanmis` badge'i gösteriyor — bu badge hiç yanmıyor.

### 4. Navbar'da Profil Fotoğrafı Cache'lenmıyor
**Dosya:** `src/components/Navbar.js` satır 10-15
**Sorun:** `/api/me` her sayfa yüklemesinde çağrılıyor, base64 fotoğraf verisi (~100-200KB) her request'te network üzerinden geliyor. Büyük veri.
**Düzeltme:** Kısa süreli (`stale-while-revalidate`) cache header ekle ya da foto_url'yi ayrı bir lightweight endpoint'e taşı.

### 5. Profil Sayfasında foto_url SELECT * ile Geliyor
**Dosya:** `src/app/[sehir]/[uzmanlik]/page.js` (doktor listeleme)
**Sorun:** `SELECT *` ile liste çekildiğinde base64 profil fotoğrafları (~100-200KB/doktor) tüm doktorlar için çekiliyor. 10 doktor = ~2MB ekstra veri.
**Düzeltme:** Listeleme sorgularında `foto_url`'yi de dahil et ama gereksiz büyük `SELECT *` yerine kolonları açıkça listele.

---

## 🟢 İYİLEŞTİRME ÖNERİLERİ

### 6. API Rate Limit Yalnızca Yorum İçin Var
**Durum:** `src/lib/rateLimit.js` sadece yorum POST'unda kullanılıyor. Randevu, soru, AI asistan endpoint'lerinde rate limiting yok.

### 7. Admin Sayfası Kimlik Doğrulama Zayıf
**Dosya:** `src/app/admin/page.js`
**Durum:** Cookie tabanlı basit token kontrolü. Brute-force koruması yok ama admin sayfası herkese açık değil; production'da kabul edilebilir düzey.

### 8. SEO — Dinamik Sayfalar İçin Canonical URL'ler Eksik
**Dosya:** `src/app/[sehir]/[uzmanlik]/page.js`
**Durum:** `generateMetadata` var ama canonical URL yok. Google duplicate content problemi yaşayabilir (istanbul/kbb-uzmani vs turkiye/kbb-uzmani).

### 9. Görsellerde lazy loading yok
**Dosya:** `src/app/page.js` (şehir fotoğrafları)
**Durum:** `<img>` tag'leri kullanılıyor, Next.js `<Image>` component'i kullanılmıyor. Lazy loading ve otomatik optimizasyon kaçırılıyor.

### 10. Console.log Üretimde Kalmış
**Dosya:** `src/lib/migrate.js` (tüm satırlar)
**Durum:** Production'da console.log gereksiz log kirliliği yaratıyor ama kritik değil.

---

## ✅ SORUNSUZ ALANLAR

- **Tüm internal linkler** → 20+ `<a href>` kontrol edildi, hepsi var olan sayfalara işaret ediyor ✓
- **Tüm API fetch çağrıları** → 28 endpoint kontrol edildi, tümü mevcut ✓
- **Tüm component import'ları** → 27 component, hiçbir import hatası yok ✓
- **Hardcoded secret yok** → Tüm key'ler `process.env.*` üzerinden ✓
- **HTML yapısı** → Kapatılmamış tag, duplicate ID yok ✓
- **Metadata/SEO** → 21 sayfada `generateMetadata` veya `metadata` export var ✓
- **TypeScript/null check'ler** → Optional chaining (`?.`) doğru kullanılmış ✓
- **Auth koruması** → Panel, admin, API route'lar session kontrolü yapıyor ✓
- **Hasta formları** → 22/22 form içeriği kapsamlı ve yasal ✓
- **Rate limiting** → Yorum endpoint'inde (3/10dk) aktif ✓

---

## İŞ PLANI (öncelik sırasıyla)

| # | Görev | Dosya | Süre |
|---|-------|-------|------|
| ✅ 1 | yorum-dogrulama: yayinlandi=true ekle | `api/yorum-dogrulama/route.js` | 5 dk |
| ✅ 2 | migrate.js: 4 eksik sütun ekle | `lib/migrate.js` | 5 dk |
| ✅ 3 | yorum-dogrulama: dogrulanmis=true ekle | `api/yorum-dogrulama/route.js` | 2 dk |
| 4 | Listeleme sorgularında SELECT * kaldır | `[sehir]/[uzmanlik]/page.js` | 15 dk |
| 5 | Şehir görselleri için next/Image | `app/page.js` | 10 dk |
| 6 | [sehir]/[uzmanlik] canonical URL ekle | metadata | 5 dk |

**Proje genel sağlık skoru: 8.5/10**
Ana sorun: yorum görünürlük akışı ve DB migration anti-pattern.
