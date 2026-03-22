import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Migrasyon başlıyor...");

  // ─── DOKTORLAR tablosu genişletme ───────────────────────────────────────────
  await sql`
    ALTER TABLE doktorlar
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS telefon TEXT,
    ADD COLUMN IF NOT EXISTS sifre TEXT,
    ADD COLUMN IF NOT EXISTS onaylandi BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS fiyat TEXT,
    ADD COLUMN IF NOT EXISTS foto_url TEXT,
    ADD COLUMN IF NOT EXISTS sozlesme_onaylandi BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS kvkk_onaylandi BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS onay_tarihi TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS sigorta TEXT,
    ADD COLUMN IF NOT EXISTS adres TEXT,
    ADD COLUMN IF NOT EXISTS online_randevu BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS profil_goruntulenme INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS website TEXT,
    ADD COLUMN IF NOT EXISTS adres_tipi TEXT DEFAULT 'muayenehane',
    ADD COLUMN IF NOT EXISTS diller TEXT,
    ADD COLUMN IF NOT EXISTS hizmetler TEXT,
    ADD COLUMN IF NOT EXISTS whatsapp TEXT,
    ADD COLUMN IF NOT EXISTS unvan TEXT,
    ADD COLUMN IF NOT EXISTS diploma_no TEXT,
    ADD COLUMN IF NOT EXISTS klinik_adi TEXT,
    ADD COLUMN IF NOT EXISTS klinik_logo_url TEXT,
    ADD COLUMN IF NOT EXISTS klinik_foto_urls TEXT,
    ADD COLUMN IF NOT EXISTS calisan_sayisi INTEGER,
    ADD COLUMN IF NOT EXISTS calisma_saatleri TEXT,
    ADD COLUMN IF NOT EXISTS paket TEXT DEFAULT 'ucretsiz',
    ADD COLUMN IF NOT EXISTS arka_plan_foto_url TEXT,
    ADD COLUMN IF NOT EXISTS tema TEXT DEFAULT 'varsayilan',
    ADD COLUMN IF NOT EXISTS medikal_turizm BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS medikal_turizm_komisyon TEXT
  `;
  console.log("✅ doktorlar tablosu güncellendi");

  // ─── YORUMLAR tablosu ────────────────────────────────────────────────────────
  await sql`
    ALTER TABLE yorumlar
    ADD COLUMN IF NOT EXISTS kvkk_onaylandi BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS dogrulama_durumu TEXT DEFAULT 'bekliyor',
    ADD COLUMN IF NOT EXISTS yayinlandi BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS moderasyon_notu TEXT
  `;
  console.log("✅ yorumlar tablosu güncellendi");

  // ─── RANDEVULAR tablosu ──────────────────────────────────────────────────────
  await sql`
    ALTER TABLE randevular
    ADD COLUMN IF NOT EXISTS tip TEXT DEFAULT 'yuzyuze',
    ADD COLUMN IF NOT EXISTS durum TEXT DEFAULT 'bekliyor',
    ADD COLUMN IF NOT EXISTS doktor_notu TEXT,
    ADD COLUMN IF NOT EXISTS hasta_profil_id INTEGER,
    ADD COLUMN IF NOT EXISTS tarih TEXT,
    ADD COLUMN IF NOT EXISTS saat TEXT,
    ADD COLUMN IF NOT EXISTS iptal_token TEXT,
    ADD COLUMN IF NOT EXISTS iptal_sebep TEXT,
    ADD COLUMN IF NOT EXISTS tamamlandi_at TIMESTAMPTZ
  `;
  console.log("✅ randevular tablosu güncellendi");

  // ─── SORULAR tablosu ─────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS sorular (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER NOT NULL,
      soran_adi TEXT NOT NULL,
      soru TEXT NOT NULL,
      yanit TEXT,
      gizli BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE sorular ADD COLUMN IF NOT EXISTS gizli BOOLEAN DEFAULT false`;
  console.log("✅ sorular tablosu oluşturuldu");

  // ─── DOKTOR MEDYA tablosu ────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS doktor_medya (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER NOT NULL REFERENCES doktorlar(id) ON DELETE CASCADE,
      tip TEXT NOT NULL CHECK (tip IN ('makale','haber','dergi','kitap','video','sosyal')),
      baslik TEXT NOT NULL,
      aciklama TEXT,
      url TEXT,
      gorsel_url TEXT,
      yayin_tarihi TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ doktor_medya tablosu oluşturuldu");

  // ─── HASTA PROFİLLERİ tablosu ────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS hasta_profilleri (
      id SERIAL PRIMARY KEY,
      ad TEXT NOT NULL,
      telefon TEXT,
      dogum_yili INTEGER,
      cinsiyet TEXT,
      kan_grubu TEXT,
      kronik_hastaliklar TEXT,
      alerjiler TEXT,
      kullanulan_ilaclar TEXT,
      gecirilen_ameliyatlar TEXT,
      ozel_notlar TEXT,
      kvkk_onaylandi BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ hasta_profilleri tablosu oluşturuldu");

  // ─── YORUM DOĞRULAMA tablosu ─────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS yorum_dogrulama (
      id SERIAL PRIMARY KEY,
      yorum_id INTEGER NOT NULL,
      doktor_id INTEGER NOT NULL,
      hasta_adi TEXT NOT NULL,
      doktor_yaniti TEXT,
      hasta_itiraz_belgesi TEXT,
      durum TEXT DEFAULT 'doktor_bekleniyor',
      admin_notu TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      guncellendi_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ yorum_dogrulama tablosu oluşturuldu");

  // ─── BİLDİRİMLER tablosu ─────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS bildirimler (
      id SERIAL PRIMARY KEY,
      hedef_tip TEXT NOT NULL CHECK (hedef_tip IN ('doktor','hasta','admin')),
      hedef_id TEXT NOT NULL,
      tip TEXT NOT NULL,
      baslik TEXT NOT NULL,
      mesaj TEXT NOT NULL,
      okundu BOOLEAN DEFAULT false,
      link TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ bildirimler tablosu oluşturuldu");

  // ─── AI SOHBET GEÇMİŞİ tablosu ──────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS ai_sohbet (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE CASCADE,
      soru TEXT NOT NULL,
      yanit TEXT NOT NULL,
      konu TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ ai_sohbet tablosu oluşturuldu");

  // ─── YORUM ŞİKAYETLER tablosu ───────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS yorum_sikayetler (
      id SERIAL PRIMARY KEY,
      yorum_id INTEGER NOT NULL,
      kategori TEXT NOT NULL,
      aciklama TEXT NOT NULL,
      ip TEXT,
      incelendi BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ yorum_sikayetler tablosu oluşturuldu");

  // ─── DOKTORLAR — soyad + egitim + koordinat + video sütunları ──────────────
  await sql`
    ALTER TABLE doktorlar
    ADD COLUMN IF NOT EXISTS soyad TEXT,
    ADD COLUMN IF NOT EXISTS egitim JSONB,
    ADD COLUMN IF NOT EXISTS enlem TEXT,
    ADD COLUMN IF NOT EXISTS boylam TEXT,
    ADD COLUMN IF NOT EXISTS tanitim_video TEXT
  `;
  console.log("✅ doktorlar.soyad + egitim + koordinat + video eklendi");

  // ─── PAYLASILAR tablosu (Doktor Feed) ────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS paylasilar (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE CASCADE,
      baslik TEXT NOT NULL,
      slug TEXT NOT NULL,
      icerik TEXT NOT NULL,
      kategori TEXT NOT NULL DEFAULT 'saglik-ipucu',
      okunma INTEGER DEFAULT 0,
      yayinda BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_paylasilar_doktor ON paylasilar(doktor_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_paylasilar_slug ON paylasilar(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_paylasilar_kategori ON paylasilar(kategori)`;
  console.log("✅ paylasilar tablosu oluşturuldu");

  // ─── FİRMA BAŞVURULAR tablosu ─────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS firma_basvurular (
      id SERIAL PRIMARY KEY,
      firma_adi TEXT NOT NULL,
      yetkili_adi TEXT NOT NULL,
      email TEXT NOT NULL,
      telefon TEXT NOT NULL,
      firma_tipi TEXT NOT NULL DEFAULT 'diger',
      paket TEXT NOT NULL DEFAULT 'standart',
      notlar TEXT,
      durum TEXT DEFAULT 'bekliyor',
      ip TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ firma_basvurular tablosu oluşturuldu");

  // ─── API KULLANIM tablosu ──────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS api_kullanim (
      id SERIAL PRIMARY KEY,
      endpoint TEXT NOT NULL,
      model TEXT NOT NULL,
      input_tokens INTEGER NOT NULL,
      output_tokens INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ api_kullanim tablosu oluşturuldu");

  console.log("\n🎉 Tüm migrasyonlar tamamlandı!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
