# TurkHekim — Yayın (Deployment) Checklist

**Hedef domain:** `https://turkhekim.com`
**Hosting:** Vercel
**DB:** Neon Postgres
**Tarih:** 2026-05-31

---

## 1. Pre-Deploy — Geliştirme Ortamı

- [x] `npm run build` yeşil (Faz 3 sonu)
- [x] `node src/lib/migrate.js` çalıştırıldı, yeni tablolar Neon'da
- [x] `MIGRATION_FAZ3.sql` deliverable kayıt altında
- [x] Tüm yeni route'lar smoke test edildi
- [x] AI Hukuk Danışmanı gerçek soruyla doğrulandı (mevzuat referansı veriyor)
- [ ] **Manuel test:** Vercel'e push öncesi son sefer browser'da gez
  - [ ] `/hukuk/ai-danisman` — 2 farklı sorgu (malpraktis + sağlıkta reklam)
  - [ ] `/pazaryeri/talep-olustur` — RFQ akışı
  - [ ] `/firma-kayit` → onay → `/firma-panel` → ilan ekle
  - [ ] `/avukat-kayit` → onay → `/avukat-panel` → makale yayınla
  - [ ] `/tercuman-talep` → tercüman panel → "Üstlen"

---

## 2. Environment Variables (Vercel)

Production'da olmalı:

### Mevcut (önceden ayarlı varsayılır)
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://turkhekim.com
ANTHROPIC_API_KEY=...
BLOB_READ_WRITE_TOKEN=...
ADMIN_SECRET=...
IYZICO_API_KEY=...
IYZICO_SECRET_KEY=...
IYZICO_BASE_URL=https://api.iyzipay.com
```

### YENİ — Faz 3 sonrası eklenmesi gerekenler
```
# SMS / WhatsApp (provider = mock | netgsm | twilio)
SMS_PROVIDER=netgsm
SMS_NETGSM_USER=xxx
SMS_NETGSM_PASS=xxx
SMS_NETGSM_HEADER=TURKHEKIM        # NetGSM'de onaylı başlık
# veya Twilio (WhatsApp da bunla)
# TWILIO_SID=AC...
# TWILIO_TOKEN=...
# TWILIO_FROM=+90...

# Cron güvenliği (sitende /api/sms/cron'u korur)
CRON_SECRET=rastgele-uzun-bir-string-en-az-32-karakter

# E-posta gönderim (mevcut MAIL_* değişkenleri sürer)
```

### Test:
- Mock mode ile başla (`SMS_PROVIDER=mock`), `console.log` Vercel logs'da gör.
- Provider'a geç → 1 test SMS gönder.

---

## 3. Domain Bağlama

### Vercel
1. **Dashboard → Project → Settings → Domains → Add `turkhekim.com`** + `www.turkhekim.com`
2. Vercel önerilen DNS kayıtlarını gösterir:
   - `A` record: `turkhekim.com` → `76.76.21.21`
   - `CNAME` record: `www.turkhekim.com` → `cname.vercel-dns.com`

### Cloudflare / Domain sağlayıcı
3. DNS panel'inde yukarıdaki kayıtları gir.
4. **Cloudflare Proxy:** `DNS Only` (gri bulut) — Vercel sertifikasıyla çakışmasın.
   - Geçmişte proxy açıkken DNS sorunu yaşamıştık (memory: 2026-03 oturum).
5. SSL otomatik gelir (Vercel Let's Encrypt).

### Doğrulama
- `dig turkhekim.com` → Vercel IP dönmeli
- `curl -I https://turkhekim.com` → 200 OK

---

## 4. www → non-www Redirect

Vercel Project Settings → Domains:
- `turkhekim.com` = **Primary**
- `www.turkhekim.com` = **Redirect to** `turkhekim.com`

---

## 5. Google Search Console

- [ ] `https://search.google.com/search-console` açıp **Add Property**
- [ ] Domain veya URL prefix yöntemi seç
- [ ] **DNS TXT record** doğrulaması (Domain yöntemi tercih)
- [ ] Doğrulama tamam → **Sitemaps**'a `https://turkhekim.com/sitemap.xml` ekle
- [ ] **URL Inspection** ile anasayfayı request indexing
- [ ] **Bing Webmaster Tools**'a aynı sitemap

## 6. Analytics

- [ ] GA4 property oluştur (`G-XXXXXX`)
- [ ] `app/layout.js` veya `app/head.js`'e GA4 script ekle (Faz 5 — kullanıcı tercihine bağlı)
- [ ] Vercel Analytics aktif (built-in, ücretsiz tier)

## 7. KVKK / Yasal Uyum (yeni modüller için)

### VERBİS Veri Envanteri Güncellemesi
Yeni veri kategorileri eklendi:
- **Avukatlar tablosu:** baro sicil no (özel nitelikli değil ama profesyonel)
- **Hukuki danışmanlık talepleri:** soru metni → potansiyel kişisel veri
- **Firma_belgeleri:** vergi levha — tüzel kişi verisi (KVKK kapsamı dışı)
- **SMS_kuyrugu:** telefon numarası → kişisel veri
- **Tercüman_yorumlar:** yorumcu adı + yorum metni

**Aksiyon:**
- [ ] `TurkHekim_Yasal_Rehber.docx` güncelle — yeni modüllerin veri kategorisini ekle.
- [ ] Aydınlatma metni revize et (kvkk sayfasında).
- [ ] VERBİS kaydı bir tüzel kişi tarafından yapılıyorsa güncellenme zorunlu.

### Yeni Form'larda KVKK Onayı
- [x] `/avukat-kayit` — KVKK + sözleşme checkbox
- [x] `/firma-kayit` — KVKK + sözleşme checkbox
- [x] `/klinik-kayit` — KVKK checkbox
- [x] `/hukuk/danismanlik-talep` — KVKK + avukat-müvekkil gizliliği vurgu
- [x] `/hukuk/bulten` — KVKK checkbox
- [x] Tercüman yorumu — KVKK checkbox
- [x] `/pazaryeri/talep-olustur` — (oturum zaten gerektirir, kvkk zaten kayıt sırasında)

## 8. Hassas Veri Encryption (KRİTİK — Faz 3 dışı kaldı)

Şu an plaintext saklanan veriler:
- `firmalar.vergi_no`
- `avukatlar.baro_sicil_no`
- Hasta TC / telefon

**Öneri:** TweetNaCl veya libsodium ile field-level encryption — Faz 5 görevi.

## 9. Yedekleme

- [x] Neon otomatik 7 günlük yedek (default)
- [ ] Haftalık manuel `pg_dump` snapshot'ı bir bulut depoya kopyala (S3 veya Backblaze)
- [ ] Restore prosedürü test et

## 10. Error Tracking & Monitoring

- [ ] **Sentry** (free tier 5K event/ay) — Next.js entegrasyonu hazır
- [ ] **UptimeRobot** veya **BetterStack** — 5 dk uptime check
  - Endpoints to monitor:
    - `https://turkhekim.com` (200)
    - `https://turkhekim.com/api/me` (401 — DB ayakta sinyali)
- [ ] Vercel Deployment notification — Slack/email

## 11. Cron Çalışıyor mu Kontrol

- [ ] Deploy sonrası 5 dk bekle → Vercel → Project → Crons → "Last run" yeşil olmalı
- [ ] `/api/sms/cron` mock mode'da `[SMS-MOCK]` log üretmeli
- [ ] `/api/instagram/cron` (önceki) hâlâ çalışıyor mu

## 12. SSL & Güvenlik Header'ları

Vercel default'ları:
- ✅ HSTS
- ✅ X-Content-Type-Options: nosniff
- ⚠️ Content-Security-Policy — özel ayar yok, kalıt browser default
- ⚠️ Permissions-Policy — yok

(Faz 5: `next.config.mjs`'de `headers()` ile sıkılaştır)

## 13. Lighthouse Smoke (Post-Deploy)

`https://pagespeed.web.dev/` üzerinden:
- [ ] `/` → mobil ≥ 85
- [ ] `/hukuk/ai-danisman` → mobil ≥ 80 (AI sayfa biraz ağır)
- [ ] `/pazaryeri` → mobil ≥ 85
- [ ] `/klinikler` → mobil ≥ 85

## 14. Rollback Planı

Vercel her deploy'u versioniyor. Sorun varsa:
- Dashboard → Deployments → önceki başarılı deploy → **Promote to Production**
- DB migration geri alınamaz — önemli olan kayıp olmadığından emin olmak.

---

## 15. Yayın Sonrası 24 Saat

- [ ] Vercel Logs'da error oranını izle
- [ ] Search Console "Coverage" — yeni URL'lerin tarandığından emin ol (1-3 gün sürer)
- [ ] AI Hukuk Danışmanı `api_kullanim` tablosundaki token sayısı makul mü
- [ ] SMS kuyruğu işliyor mu (`SELECT COUNT(*) FROM sms_kuyrugu WHERE gonderildi=false AND deneme_sayisi >= 5` → 0 olmalı)

---

## Acil İletişim Sıralaması (sorun çıkarsa)

1. Vercel Logs → Runtime hatası mı?
2. Neon Console → DB ulaşılabilir mi?
3. Anthropic Console → API limit aşımı mı?
4. iyzico Panel → ödeme gateway durumu

---

**Son kontrol:** Bu listeyi okurken aklına gelen ek bir şey varsa not düş, deploy öncesi gözden geçirelim.
