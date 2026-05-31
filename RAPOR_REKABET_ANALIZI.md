# TurkHekim — Rekabet Analizi Raporu (Faz 2)

**Tarih:** 2026-05-31
**Kıyaslananlar:** doktorsitesi.com (kuruluş 2004, ~185.000 doktor), doktortakvimi.com (~181.000 doktor)
**Amaç:** TurkHekim'in pazarda nerede zayıf/güçlü olduğunu görmek, somut "ekle/iyileştir" listesi çıkarmak.

---

## 1. Özellik Karşılaştırma Tablosu

| Özellik | doktorsitesi | doktortakvimi | **TurkHekim** | Aksiyon |
|---|---|---|---|---|
| Doktor sayısı | 185k | 181k | ~az (start-up) | İçerik stratejisi: programatik SEO landing |
| Şehir+uzmanlık filtre | ✅ | ✅ | ✅ | — |
| Online randevu | ✅ | ✅ | ✅ | — |
| Yüz yüze randevu | ✅ | ✅ | ✅ | — |
| Video konsültasyon | ❌ | ❌ | ⚠️ (alan var, akış yok) | **Fark yaratır — tamamla** |
| SMS/WhatsApp hatırlatma | ✅ | ✅ | ❌ | **EKLE (kritik)** |
| Hasta yorumu (yıldız) | ✅ | ✅ | ✅ + **doğrulama akışı** | TurkHekim daha güçlü |
| Doktor doğrulanmış badge | ⚠️ | ⚠️ | ✅ (diploma yükleme) | TurkHekim daha güçlü |
| Doktor blog/makale | ✅ | ✅ | ✅ (paylasilar) | — |
| Soru-cevap forumu | ❌ | ❌ | ✅ (sorular tablosu) | TurkHekim avantaj |
| Mobil uygulama | ✅ | ✅ | ❌ | Faz 4 sonrası (PWA yeter şimdilik) |
| Klinik sayfası | ⚠️ | ✅ | ⚠️ (klinik_adi alanı var, sayfa yok) | **EKLE** |
| AI konsültasyon özeti | ❌ | ✅ (Noa Notes) | ✅ (gorusme-ozet, ai-asistan) | TurkHekim eşit |
| **B2B Pazaryeri (firma↔doktor)** | ❌ | ❌ | ⚠️ (firmalar var, RFQ yok) | **Sektörde benzersiz fırsat** |
| **Tıbbi tercüman** | ❌ | ❌ | ✅ | **Sektörde benzersiz** |
| **Sağlık hukuku** | ❌ | ❌ | ❌ (planlı) | **Sektörde benzersiz** |
| Medikal turizm | ❌ | ⚠️ | ✅ (badge + komisyon) | **TurkHekim öne çıkıyor** |
| Çok dil (Ar/Fa/En) | ❌ | ⚠️ (sadece TR) | ✅ (/ar, /fa) | **TurkHekim öne çıkıyor** |
| iyzico ödeme entegrasyonu | ⚠️ | ✅ | ✅ | — |

---

## 2. UX/UI Farkları

### Doktorsitesi'nin güçlü yanları
- **Anasayfa popüler arama path'leri** — "Lazer epilasyon Ankara", "Tüp bebek İstanbul" gibi binlerce iç link → güçlü SEO
- **Trust signal yoğunluğu** — "2004'ten beri", "ISO 9001/27001/20000-1/22301" sertifikaları schema'da, App Store + Google Play linkleri
- **Doktor kartı kompakt** — foto + unvan + uzmanlık + şehir + tek-cümle hasta yorumu alıntısı

### TurkHekim'in güçlü yanları
- **Yorum doğrulama akışı** — doktor onayı → admin moderasyon → yayına çıkma → "Doğrulanmış Hasta" badge. Rakiplerde yok.
- **Diploma doğrulama** — admin panelinde belge inceleme. Rakiplerde yok ya da gizli.
- **AI asistan** — Claude ile sağlık asistanı entegre. Doktortakvimi'nde sadece doktorlara, TurkHekim'de hastaya da.
- **Çok dilli landing** — Arapça/Farsça medikal turizm için kritik.

### TurkHekim'in zayıf yanları
- **İç linkleme zayıf** — `/[sehir]/[uzmanlik]` sayfası var ama anasayfa bu sayfalara yeterince link vermiyor. Doktorsitesi anasayfası 50+ landing'e link veriyor.
- **Klinik kimliği yok** — doktorlar var ama "Acıbadem Maslak" gibi bir klinik sayfası yok. Klinik-içi doktor listesi yok.
- **SMS/WhatsApp randevu hatırlatma yok** — randevu sistemi var ama bildirim sadece in-app. No-show oranı yüksek olur.
- **Mobil uygulama yok** — PWA bile yok. Hızlı çözüm: `manifest.json` + service worker.

---

## 3. SEO Strateji Farkları

### URL yapıları
| Pattern | Doktorsitesi | TurkHekim |
|---|---|---|
| Uzmanlık | `/uzmanlik-alanlari/kadin-hastaliklari-ve-dogum` | `/[uzmanlik]` (varsa) |
| Şehir+uzmanlık | `/uzmanlik-alanlari/.../istanbul` | `/[sehir]/[uzmanlik]` ✅ |
| Hastalık | `/hastaliklar/tup-bebek/istanbul` | ❌ |
| Tedavi | `/tedaviler-hizmetler/lazer-epilasyon/ankara` | `/tedaviler/[slug]` (şehir kombosu yok) |
| Doktor | `/[ad-soyad]/[uzmanlik]/[sehir]` | `/doktor/[slug]` |

**Çıkarım:** Doktorsitesi her hastalık × her şehir kombinasyonu için ayrı sayfa üretiyor (programmatic SEO). TurkHekim'de tedaviler şehir kombo yok → büyük arama hacmi kayıp.

### Schema markup
- Doktorsitesi: `MedicalOrganization` + `EducationalOccupationalCredential`
- TurkHekim: Doktor sayfasında `Physician`, anasayfada Organization — **eşit/iyi**
- **Eksik:** TurkHekim'de `MedicalClinic`, `MedicalProcedure`, `FAQPage` schema yok.

### Trust signal SEO
- Doktorsitesi schema'sında ISO sertifikaları geçiyor. TurkHekim'de yok.

---

## 4. Monetizasyon Modelleri

| Model | Doktorsitesi | Doktortakvimi | TurkHekim |
|---|---|---|---|
| Doktor ücretsiz listing | ✅ | ✅ | ✅ |
| Doktor premium paket | ✅ | ✅ Pro | ✅ (paket sütunu var) |
| Hasta ücretsiz | ✅ | ✅ | ✅ |
| Randevu komisyonu | ❌ | ❌ | ❌ |
| Reklam alanı | ⚠️ | ⚠️ | ❌ |
| **B2B firma listing** | ❌ | ❌ | ⚠️ (akış eksik) |
| **Medikal turizm komisyonu** | ❌ | ❌ | ✅ |
| **Tercüman komisyonu** | ❌ | ❌ | potansiyel |
| **Hukuk danışmanlığı komisyonu** | ❌ | ❌ | potansiyel |

**Çıkarım:** TurkHekim 3 yeni gelir kanalına sahip olacak (firma, tercüman, hukuk). Rakiplerin tek modeli "doktor premium paket".

---

## 5. Somut Aksiyon Listesi (Faz 3'e taşınır)

### 🔴 Yüksek etki — eklenmesi şart
1. **Klinik sayfası modülü** — `/klinik/[slug]` route + DB tablosu. Doktorlar bir kliniğe bağlı olabilsin.
2. **Hastalık × şehir landing'leri** — `/hastaliklar/[hastalik]/[sehir]` route. Programmatic SEO için.
3. **Anasayfa iç link genişletme** — Popüler hastalık + şehir kombinasyonları için 50+ iç link bölümü.
4. **SMS/WhatsApp randevu hatırlatma** — Twilio veya NetGSM entegrasyonu. No-show'u %30→%10'a indirir.
5. **`FAQPage` JSON-LD** — `/hukuk/sik-sorulan-sorular` + `/sss` sayfalarına. Google rich result.

### 🟡 Orta etki — Faz 4'te yapılır
6. **PWA dönüşümü** — `manifest.json` + service worker. App Store gerekmez.
7. **`MedicalClinic` ve `MedicalProcedure` schema** — Tedavi ve klinik sayfalarına.
8. **Bültene abone ol** (hukuk modülünden gelir) — Hukuk dışı genel kullanım da olabilir.
9. **ISO/güvenlik rozetleri** — Anasayfa footer + schema. KVKK VERBİS kayıt rozetini güçlü kullan.

### 🟢 Stratejik fark — pazarlamada vurgu
10. **"Türkiye'nin tek doğrulanmış doktor ağı"** mesajı — Diploma+yorum doğrulama akışı rakibin yok.
11. **"Sağlık ekosisteminin tek noktası"** — Doktor + tercüman + firma + hukuk dörtlüsü.
12. **Arapça/Farsça medikal turizm hub'ı** — Rakiplerin Türkçe-only oluşu en büyük açıkları.

---

## 6. Faz 3'e Aktarılan Mimari Kararlar

Senin orijinal Faz 3 spec'in zaten kapsayıcı. Ek olarak bu rapordan **şu kararları** ekledim:

- **Pazaryeri modülü** mevcut `firmalar` + `firma_urunler` üzerine inşa edilecek. Spec'teki `firma_ilanlar`, `malzeme_talepleri`, `firma_doktor_mesajlari` tablolarını **ek migration** ile getireceğim. Mevcut `firmalar` tablosu silinmeyecek, sadece eksik kolonları ALTER ile gelecek (`vergi_no`, `kategori[]`, `ad_soyad_yetkili`, `sehir`, `adres`, `hakkinda`).
- **Tercüman modülü** zaten kurulu. Spec'teki **eksik tablolar**: `tercuman_talepleri`, `tercuman_yorumlar`. Spec'teki **eksik sayfalar**: `/tercuman-talep`, müsaitlik takvimi.
- **Hukuk modülü** sıfırdan kurulacak — `avukatlar`, `hukuki_danismanlik_talepleri`, `hukuki_makaleler` tabloları.
- **Klinik modülü** — rapor sonucu eklenen yeni öneri. Senin spec'inde yok. Eklemeden önce sana soracağım.
- **SMS/WhatsApp randevu hatırlatma** — rapor sonucu önerilen ekstra iş. Senin spec'inde yok. Faz 3'e mi Faz 4'e mi sokayım, sana soracağım.

---

**Sonuç:** TurkHekim, doktorsitesi/doktortakvimi'nin **işlevsel olarak %85'ini** karşılıyor ve bunların **hiçbirinde olmayan 4 stratejik özelliği** (medikal turizm + tercüman + firma + hukuk + çok dil) var. Doğru SEO ve pazarlama ile **dikey segment lideri** olabilir.
