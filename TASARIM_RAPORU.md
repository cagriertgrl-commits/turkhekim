# DoktorPusula — UI/UX Tasarım Raporu
**Tarih:** 2026-03-23 | **Genel Skor: 5.7/10**

---

## 🔴 KRİTİK SORUNLAR

### 1. Kayıt formu mobilde kullanılamıyor
**Dosya:** `src/app/doktor-ol/page.js` satır 160, 196
- `grid grid-cols-3` → 3 sütun tüm ekranlarda → mobilde 3 mini kutu
- `grid grid-cols-2` → 2 sütun → yine mobilde çok dar
**Düzeltme:** `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3`

### 2. Doktor listesi filtreleri mobilde görünmüyor
**Dosya:** `src/app/[sehir]/[uzmanlik]/page.js`
- Sidebar `md:col-span-1` → mobilde tamamen kayboluyor
- Kullanıcı telefonda filtreleme yapamıyor
**Düzeltme:** Mobil filtre toggle butonu ekle

### 3. Body metni 12px (WCAG AA ihlali)
**Tüm dosyalar** — `text-xs` (12px) form etiketleri, kart açıklamaları, panel metrikler için kullanılmış
- WCAG AA: minimum 14px gerekli
**Düzeltme:** Form label'larını `text-xs` → `text-sm`'e çevir

### 4. Focus state'leri eksik
**Dosya:** `src/app/panel/page.js` form alanları
- `focus:outline-none` var ama yerine görünür focus ring yok
- Klavye navigasyonu bozuk

---

## 🟡 ORTA ÖNCELİKLİ SORUNLAR

### 5. CSS design token'ları yok
Renk kodları (`#0D2137`, `#0E7C7B`, `#C9A84C`) tüm dosyalara dağılmış
— değişiklik yapmak için 30+ dosya dolaşmak gerekiyor
**Düzeltme:** `globals.css`'e CSS custom properties ekle

### 6. Button padding tutarsız
- Büyük buton: `px-8 py-3` (48px height)
- Küçük buton: `px-3 py-1.5` (36px height)
- Form submit: `py-2.5` — standart yok

### 7. Hizmetler grid'i mobilde 2 sütun
**Dosya:** `src/app/doktor/[slug]/page.js` satır 230
- `grid-cols-2` tüm ekranlarda → mobilde dar
**Düzeltme:** `grid-cols-1 sm:grid-cols-2`

### 8. Specialty grid mobilde 3 sütun
**Dosya:** `src/app/page.js`
- `grid-cols-3` → mobilde küçük touch target (44px'in altında)
**Düzeltme:** `grid-cols-2 sm:grid-cols-3 md:grid-cols-6`

### 9. Renk kontrastı yetersiz
- `text-gray-400` (#9CA3AF) + `bg-gray-50` = 3.5:1 (gerekli: 4.5:1)
- WCAG AA ihlali, panel metrik label'larında yaygın

### 10. Avatar boyutları standart değil
- Navbar: w-8 h-8 (32px)
- Kart: w-16 h-16 (64px)
- Profil: w-32 md:w-40 (128-160px)
- Yorum: w-9 h-9 (36px) — tutarsız

---

## 🟢 İYİLEŞTİRME ÖNERİLERİ

### 11. Specialty grid renk tutarsızlığı
12 farklı arka plan rengi (EFF6FF, FFF1F2, FFFBEB...) — sistematik değil

### 12. Kayıt formu loading state'i
Form submit sırasında sadece button disabled → spinner veya progress bar eklenebilir

### 13. Filtre radio butonları çalışmıyor
`[sehir]/[uzmanlik]/page.js` — sıralama seçenekleri UI-only, backend bağlantısı yok

### 14. Section padding tutarsız
- py-24 (hero) vs py-16 vs py-14 vs py-12 — standart yok
- Öneri: py-16 büyük, py-10 küçük

---

## ✅ İYİ OLAN ALANLAR
- Renk paleti temeli güçlü (lacivert + teal + gold)
- Kart tasarımı tutarlı (rounded-2xl, shadow-sm)
- Hover state'leri genel olarak iyi uygulanmış
- Empty state'ler düzgün tasarlanmış
- Responsive Navbar mükemmel
- Panel layout responsive güçlü
- Badge sistemi tutarlı (rounded-full)
- Loading skeleton Navbar'da var

---

## İŞ AKIŞI

### Otomatik Düzeltmeler (onay gerekmez)
- [x] globals.css — CSS custom properties
- [x] doktor-ol — responsive grid fix
- [x] [slug] — hizmetler grid fix
- [x] homepage — specialty grid mobile fix
- [x] panel form — focus states
- [x] form label'ları text-xs → text-sm

### Onay Gerektiren Değişiklikler
- [ ] Mobil filtre toggle (listing sayfası büyük değişiklik)
- [ ] Renk paleti standardizasyonu
- [ ] Filtre fonksiyonelliği (backend)
