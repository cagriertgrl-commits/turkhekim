# Claude Code — Proje Talimatları

## 🎯 Temel Görev

Her kod yazma, düzenleme veya inceleme görevinde aşağıdaki 5 katmanı **otomatik olarak** uygula.
Kullanıcı istemese bile bu kontrolleri yap ve bulduklarını raporla.

---

## 🔍 Katman 1 — Hata Denetimi (Runtime Güvenliği)

Her kod bloğunda şunları kontrol et:
- `null` / `undefined` erişimi → optional chaining (`?.`) veya guard ekle
- Try/catch blokları boş mu? → `console.error` + kullanıcıya bildirim ekle
- Array işlemlerinden önce `.length` kontrolü yapılmış mı?
- Async fonksiyonlarda `await` unutulmuş mu?
- Promise'ler `.catch()` veya try/catch ile sarılmış mı?
- Type coercion hatası riski var mı? (`==` yerine `===` kullan)

**Kural:** Hata bulursan önce mevcut kodu göster, sonra düzeltilmiş halini ver. Neden düzelttini açıkla.

---

## ⚡ Katman 2 — Performans Optimizasyonu

- Gereksiz `console.log` → kaldır
- N+1 sorgu problemi → veri çekimlerini toplu yap
- React: gereksiz `useEffect` bağımlılıkları → temizle
- React: her render'da yeniden oluşan obje/fonksiyon → `useMemo` / `useCallback`
- Büyük listeler → virtualization öner
- `import` edilen ama kullanılmayan paketler → kaldır
- Senkron işlemler UI'ı bloke ediyor mu? → async'e çevir

---

## 🔒 Katman 3 — Güvenlik

- API key, token, şifre → asla `.js`/`.ts` dosyasına yazma, `.env` kullan
- `.env` dosyası `.gitignore`'da mı? → kontrol et
- Kullanıcıdan gelen veri ekrana yansıtılıyor mu? → XSS riski, sanitize et
- CORS ayarları çok geniş mi? (`*` kullanımı)

---

## 📦 Katman 4 — Kod Kalitesi

- Fonksiyon 30 satırı aşıyor mu? → bölmeyi öner
- Bileşen 200 satırı aşıyor mu? → parçalara ayır
- Aynı kod 2+ yerde tekrar ediyor mu? → ortak fonksiyona taşı
- Magic number/string var mı? → `const` ile isimlendir
- İsimlendirme ne yapıldığını açıklıyor mu?

---

## 🎭 Katman 5 — Eksik Durum Yönetimi

Her veri çekimi veya form işleminde:
- `loading` durumu → spinner veya skeleton göster
- `error` durumu → kullanıcıya anlamlı mesaj göster
- `empty` durumu → "Sonuç bulunamadı" mesajı
- Form submit → duplicate click'e karşı butonu disable et

---

## 📋 Yanıt Formatı

Kod yazarken veya düzeltirken şu formatı kullan:

### ✅ Yapılanlar
- [ne eklendi/değiştirildi]

### ⚠️ Bulunan Sorunlar
- [sorun] → [çözüm]

### 💡 Öneriler
- [opsiyonel iyileştirmeler]

---

## 🚫 Asla Yapma

- `any` tipini kullanma → proper type yaz
- `console.log` production'da bırakma
- API key'i koda göm
- `// TODO` yorum bırakıp geçme
- Test yazmadan kritik fonksiyon ekleme

---

## ✍️ Kod Yazarken

1. Önce mevcut kodu oku ve anla
2. Değişiklik öncesi ne yapacağını söyle
3. Kodu yaz
4. Yukarıdaki 5 katmanı otomatik uygula
5. Sonucu özetle

---

## 🚀 Otonom Geliştirme Modu

Kullanıcı "otonom geliştirme modunu başlat" dediğinde veya genel bir geliştirme görevi verildiğinde, onay beklemeden aşağıdaki adımları sırayla uygula. Her adımı bitirmeden bir sonrakine geçme.

### Başlamadan önce (her oturumda):
1. Tüm dosyaları tara, genel resmi anla
2. Eksik, kırık veya TODO olan şeyleri listele
3. "🗺️ Plan: X adım bulundu, başlıyorum." de ve ilerle

---

### Adım Sırası

#### 🔎 A — Audit (Tarama)
Tüm dosyaları gez:
- Kırık link veya eksik asset var mı?
- `console.log` kalmış mı?
- TODO/FIXME yorum var mı?
- Kullanılmayan CSS class'ı var mı?
- Tekrar eden kod bloğu var mı?

Bulduklarını listele, hepsini düzelt.

---

#### 📱 B — Mobil Uyumluluk
Her section'ı şu breakpoint'lerde kontrol et: 375px / 768px / 1280px
- Text taşması var mı?
- Görseller kırık mı?
- Padding/margin fazla mı dar?
- Butonlar tap hedefi yeterli mi? (min 44px)
- Yatay scroll oluşuyor mu?

Sorun varsa direkt düzelt.

---

#### ⚡ C — Performans
- Görsellerde `loading="lazy"` var mı? → ekle
- `<link rel="preconnect">` font/CDN için var mı? → ekle
- Render-blocking CSS/JS var mı? → `defer` veya `async` ekle
- Font `display: swap` kullanıyor mu? → ekle
- Kullanılmayan büyük kütüphane import ediliyor mu? → kaldır veya alternatif öner

---

#### 🔍 D — SEO & Meta
Her sayfa için kontrol et:
- `<title>` var mı ve açıklayıcı mı?
- `<meta name="description">` var mı? (150-160 karakter)
- Open Graph (`og:title`, `og:description`, `og:image`) var mı?
- `<h1>` sadece bir tane mi?
- Tüm `<img>` etiketlerinde `alt` var mı?
- `canonical` link var mı?

Eksikleri ekle.

---

#### 🎨 E — UI Polish
- Spacing tutarsızlığı var mı? (8px grid'e uy)
- Font weight karmaşası var mı?
- Hover state eksik element var mı? → ekle
- Focus state (keyboard nav) çalışıyor mu?
- Renk kontrastı WCAG AA standardında mı?
- Transition/animasyon süresi tutarlı mı? (200-300ms)

---

#### ♿ F — Erişilebilirlik
- `<button>` içinde sadece ikon varsa `aria-label` var mı?
- Form `<input>`'larının `<label>`'ı var mı?
- `<img>` decorative ise `alt=""` mi?
- `<nav>`, `<main>`, `<footer>` semantic tag'ler kullanılmış mı?
- Tab sırası mantıklı mı?

---

#### ✨ G — Son Dokunuşlar
- Loading state'ler tanımlı mı? (skeleton veya spinner)
- Error state'ler tanımlı mı?
- Empty state'ler tanımlı mı?
- 404 sayfası var mı?
- Favicon var mı?
- robots.txt, sitemap.xml var mı?

---

### Otonom Mod Kuralları

**Onaysız yapabilirsin:**
- Mevcut kodu düzeltmek
- Eksik attribute eklemek
- CSS/JS optimize etmek
- Yeni section veya component eklemek (içeriği kullanıcıdan al)
- Bağımlılık güncellemesi önermek

**MUTLAKA sor:**
- Herhangi bir dosyayı silmek
- Renk paleti veya font değiştirmek
- Sayfa yapısını (layout) köklü değiştirmek
- Yeni sayfa/route eklemek
- .env veya config dosyasına dokunmak

---

### Rapor Formatı (her adım sonunda)

```
✅ [Adım Adı] tamamlandı
   Yapılanlar: [madde madde]
   Bulunan sorunlar: [varsa]
   Sonraki adım: [ne yapacağım]
```

---

### Oturum Sonu Özeti

Tüm adımlar bitince şu formatta özet ver:

```
🏁 Geliştirme Tamamlandı

Toplam değişiklik: X dosya
Düzeltilen sorun: X adet
Eklenen özellik: X adet
Kalan öneri: [varsa]

Sitenin şu anki puanı (tahmini):
- Performans: X/10
- SEO: X/10
- Erişilebilirlik: X/10
- Kod kalitesi: X/10
```
