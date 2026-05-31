# TurkHekim

Türkiye'nin doktor + sağlık ekosistem platformu. Doktor-hasta buluşmanın ötesine geçen, **medikal turizm + B2B pazaryeri + tıbbi tercüman + sağlık hukuku** dörtlüsünü tek çatı altında toplayan dikey platform.

## 🏗️ Modüller

| Modül | URL | Açıklama |
|---|---|---|
| **Doktor & Hasta** | `/doktor-bul`, `/doktor/[slug]` | Doktor profil, randevu, yorum doğrulama, soru-cevap |
| **Hasta Formları** | `/hasta-formlari` | 22 yasal form (aydınlatılmış onam, KVKK vb.) |
| **Medikal Turizm** | `/medikal-turizm`, `/ar`, `/fa`, `/ru` | Çok dilli, Arapça/Farsça/Rusça/İngilizce |
| **🏷️ Pazaryeri (B2B)** | `/pazaryeri` | TİTCK belgeli firma↔doktor: cihaz, sarf, implant, ilaç ilanları + doktor RFQ + güvenli mesajlaşma |
| **🌐 Tıbbi Tercüman** | `/tercumanlar`, `/tercuman-talep` | Sağlık turizmi için Arapça/İngilizce/Rusça/Farsça tercüman talep + müsaitlik takvimi + yorum |
| **⚖️ Sağlık Hukuku** | `/hukuk` | AI Hukuk Danışmanı (sağlıkta reklam mevzuatı + malpraktis emsalleri eğitimli), avukat ağı, makaleler, FAQ, bülten |
| **🏥 Klinik Rehberi** | `/klinikler`, `/klinik/[slug]` | Muayenehane, poliklinik, hastane ve tıp merkezi rehberi |

## 🔧 Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **DB:** Neon Postgres (serverless driver, parametrik SQL)
- **Auth:** NextAuth.js (JWT) + custom session helper'ları (firma, tercüman, avukat)
- **Storage:** Vercel Blob
- **Payment:** iyzico v2
- **AI:** Anthropic Claude (Hukuk Danışmanı + sağlık asistanı)
- **SMS/WhatsApp:** NetGSM veya Twilio (mock mode default)
- **Cron:** Vercel Crons (Instagram + SMS kuyruğu)
- **Email:** SMTP (env üzerinden)
- **Styling:** Tailwind CSS 4

## 🚀 Geliştirme

```bash
npm install
node src/lib/migrate.js   # DB migration (idempotent)
npm run dev               # http://localhost:3000
npm run build             # production build
npm test                  # Jest birim
npm run test:e2e          # Playwright
```

## 📁 Önemli Klasörler

```
src/
├── app/
│   ├── api/                    # 80+ endpoint
│   │   ├── avukat/             # Hukuk modülü auth + profil
│   │   ├── hukuk/              # AI danışman, makale, talep, bülten
│   │   ├── pazaryeri/          # İlan, RFQ, mesaj
│   │   ├── tercuman/           # Mevcut + talep, yorum, müsaitlik
│   │   ├── klinik/             # Klinik kayıt
│   │   └── sms/cron            # Hatırlatma kuyruğu işleyici
│   ├── hukuk/                  # Sağlık hukuku modülü UI (10 sayfa)
│   ├── pazaryeri/              # B2B modülü UI (4 sayfa)
│   ├── klinik/, klinikler/     # Klinik rehberi
│   ├── tercuman/, tercumanlar/ # Tercüman modülü
│   └── (mevcut sayfalar…)
└── lib/
    ├── db.js                   # Neon SQL template
    ├── session.js              # NextAuth doktor session
    ├── firmaSession.js         # Custom JWT (firma)
    ├── tercumanSession.js      # Custom JWT (tercüman)
    ├── avukatSession.js        # Custom JWT (avukat) — YENİ
    ├── smsServisi.js           # Provider abstraction — YENİ
    ├── hukukKategorileri.js    # Mevzuat bilgi tabanı — YENİ
    ├── pazaryeriKategorileri.js # Kategori sabitleri — YENİ
    └── migrate.js              # Tüm CREATE/ALTER (idempotent)
```

## 🤖 AI Hukuk Danışmanı'nın Bilgi Tabanı

[hukukKategorileri.js](src/lib/hukukKategorileri.js)'deki `HUKUK_BILGI_TABANI` sistem prompt'una gömülü ~5KB Türkçe mevzuat:

- **Temel kanunlar:** 1219 Tababet, TBK m.49-76, TCK m.83/89, KVKK m.6, SGK 5510
- **Malpraktis:** Yargıtay 13./15. HD içtihadı, eser vs vekâlet ayrımı, zamanaşımı, ispat yükü
- **Aydınlatılmış onam:** Hasta Hakları Yön. m.15 & m.31, TTB Etik Kuralları m.26
- **Sağlıkta reklam:** 29.07.2023 tarihli Yönetmelik (önce-sonra yasağı, hasta yorumu yasağı, mucize/garantili yasağı, indirim/kampanya yasağı) + yetkili kurum + yaptırım bandı
- **TİTCK:** İlaç (03.07.2015 Yön.), Tıbbi Cihaz Yön. (02.06.2021 MDR), CE belgesi
- **Reklam Kurulu** (6502), **TTB Disiplin** (6023), **RTÜK**, **SGK SUT**, **VERBİS**, **sağlık turizmi Yön.** (13.07.2017)
- Her yanıtta mevzuat madde no referansı + otomatik disclaimer + avukat yönlendirme zorunlu

## 📋 Teslim Dosyaları (Faz 3 + 4)

- [MIGRATION_FAZ3.sql](MIGRATION_FAZ3.sql) — Tüm yeni DB tabloları
- [RAPOR_REKABET_ANALIZI.md](RAPOR_REKABET_ANALIZI.md) — doktorsitesi/doktortakvimi karşılaştırma
- [SEO_CHECKLIST.md](SEO_CHECKLIST.md) — Yayın öncesi SEO durumu
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) — Vercel + DNS + KVKK + monitoring
- [AUDIT_RAPORU.md](AUDIT_RAPORU.md) — Faz 1 mevcut durum (önceki audit)

## 🔐 Güvenlik Notları

- Tüm endpoint'lerde rate limiting (`src/lib/rateLimit.js`)
- Tüm SQL parametrik (Neon `sql` template literal)
- Bcrypt hash (doktor, firma, tercüman, avukat şifreleri)
- JWT cookie session + httpOnly + secure (production)
- KVKK aydınlatma + açık rıza checkbox tüm yeni formlarda
- ⚠️ Hassas veri encryption (vergi no, baro no, TC) — kalıt, Faz 5 görevi

## 📞 Modül Özelliklerinin Demosu

Vercel deploy sonrası test linkleri:
- 🤖 **AI Hukuk Danışmanı:** https://turkhekim.com/hukuk/ai-danisman
- 🏷️ **Pazaryeri RFQ:** https://turkhekim.com/pazaryeri/talep-olustur
- 🌐 **Tercüman talep:** https://turkhekim.com/tercuman-talep
- 🏥 **Klinik ekle:** https://turkhekim.com/klinik-kayit

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
