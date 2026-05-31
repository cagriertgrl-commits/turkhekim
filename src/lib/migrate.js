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
    ADD COLUMN IF NOT EXISTS sicil_no TEXT,
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

  // ─── FİRMALAR tablosu ─────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS firmalar (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      ad TEXT NOT NULL,
      tip TEXT DEFAULT 'ilac',
      aciklama TEXT,
      logo_url TEXT,
      website TEXT,
      email TEXT UNIQUE NOT NULL,
      sifre_hash TEXT NOT NULL,
      telefon TEXT,
      aktif BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ firmalar tablosu oluşturuldu");

  // ─── FİRMA ÜRÜNLER tablosu ────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS firma_urunler (
      id SERIAL PRIMARY KEY,
      firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
      ad TEXT NOT NULL,
      aciklama TEXT,
      kategori TEXT DEFAULT 'ilac',
      resim_url TEXT,
      aktif BOOLEAN DEFAULT true,
      indirimde BOOLEAN DEFAULT false,
      indirim_detay TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_firma_urunler_firma ON firma_urunler(firma_id)`;
  console.log("✅ firma_urunler tablosu oluşturuldu");

  // ─── FİRMA TAKİP tablosu ──────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS firma_takip (
      id SERIAL PRIMARY KEY,
      firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(firma_id, doktor_id)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_firma_takip_firma ON firma_takip(firma_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_firma_takip_doktor ON firma_takip(doktor_id)`;
  console.log("✅ firma_takip tablosu oluşturuldu");

  // ─── PAYLASILAR genişletme (akış/feed) ────────────────────────────────────────
  await sql`ALTER TABLE paylasilar
    ADD COLUMN IF NOT EXISTS firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS kaynak_tipi TEXT NOT NULL DEFAULT 'doktor',
    ADD COLUMN IF NOT EXISTS resim_url TEXT,
    ADD COLUMN IF NOT EXISTS begeni_sayisi INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS etiketler TEXT
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS paylasi_begeni (
      id SERIAL PRIMARY KEY,
      paylasi_id INTEGER REFERENCES paylasilar(id) ON DELETE CASCADE,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(paylasi_id, doktor_id)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_paylasi_begeni_paylasi ON paylasi_begeni(paylasi_id)`;
  console.log("✅ paylasilar feed kolonları + paylasi_begeni oluşturuldu");

  // ─── TERCÜMANLAR tablosu ────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS tercumanlar (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      ad TEXT NOT NULL,
      soyad TEXT,
      email TEXT UNIQUE NOT NULL,
      sifre_hash TEXT NOT NULL,
      telefon TEXT,
      foto_url TEXT,
      hakkinda TEXT,
      diller TEXT NOT NULL,
      uzmanlik_alani TEXT,
      sertifikalar TEXT,
      deneyim_yil INTEGER DEFAULT 0,
      sehir TEXT,
      fiyat TEXT,
      musait BOOLEAN DEFAULT true,
      aktif BOOLEAN DEFAULT false,
      kvkk_onaylandi BOOLEAN DEFAULT false,
      sozlesme_onaylandi BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_tercumanlar_sehir ON tercumanlar(sehir)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tercumanlar_aktif ON tercumanlar(aktif)`;
  console.log("✅ tercumanlar tablosu oluşturuldu");

  // ─── Doktor doğrulama kolonları ─────────────────────────────────────────────
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS diploma_belge_url TEXT`;
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS diploma_dogrulandi BOOLEAN DEFAULT false`;
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS diploma_dogrulama_tarihi TIMESTAMPTZ`;
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS email_dogrulandi BOOLEAN DEFAULT false`;
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS email_dogrulama_token TEXT`;
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS sifre_sifirlama_token TEXT`;
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS sifre_sifirlama_son TIMESTAMPTZ`;
  console.log("✅ doktor doğrulama kolonları");

  // ─── ÖDEMELER tablosu ──────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS odemeler (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE CASCADE,
      paket TEXT NOT NULL,
      tutar NUMERIC(10,2) NOT NULL,
      para_birimi TEXT DEFAULT 'TRY',
      saglayici TEXT DEFAULT 'iyzico',
      saglayici_odeme_id TEXT,
      konversasyon_id TEXT UNIQUE,
      durum TEXT DEFAULT 'bekliyor',
      odeme_tipi TEXT,
      kart_son_4 TEXT,
      fatura_no TEXT,
      hata_mesaji TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      tamamlandi_at TIMESTAMPTZ
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_odemeler_doktor ON odemeler(doktor_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_odemeler_durum ON odemeler(durum)`;
  console.log("✅ odemeler tablosu");

  // ─── FATURALAR tablosu ──────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS faturalar (
      id SERIAL PRIMARY KEY,
      odeme_id INTEGER REFERENCES odemeler(id) ON DELETE SET NULL,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE SET NULL,
      fatura_no TEXT UNIQUE,
      kdv_orani INTEGER DEFAULT 20,
      net_tutar NUMERIC(10,2) NOT NULL,
      kdv_tutar NUMERIC(10,2) NOT NULL,
      brut_tutar NUMERIC(10,2) NOT NULL,
      vergi_kimlik_no TEXT,
      adi_soyadi TEXT,
      adres TEXT,
      durum TEXT DEFAULT 'taslak',
      e_arsiv_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      kesilme_tarihi TIMESTAMPTZ
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_faturalar_doktor ON faturalar(doktor_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_faturalar_durum ON faturalar(durum)`;
  console.log("✅ faturalar tablosu");

  // ════════════════════════════════════════════════════════════════════════
  // FAZ 3 — YENİ MODÜLLER (Pazaryeri / Tercüman tamamla / Hukuk / Klinik / SMS)
  // ════════════════════════════════════════════════════════════════════════

  // ─── PAZARYERİ — firmalar tablosunu genişlet ───────────────────────────────
  await sql`
    ALTER TABLE firmalar
    ADD COLUMN IF NOT EXISTS vergi_no TEXT,
    ADD COLUMN IF NOT EXISTS ad_soyad_yetkili TEXT,
    ADD COLUMN IF NOT EXISTS sehir TEXT,
    ADD COLUMN IF NOT EXISTS adres TEXT,
    ADD COLUMN IF NOT EXISTS hakkinda TEXT,
    ADD COLUMN IF NOT EXISTS kategori TEXT,
    ADD COLUMN IF NOT EXISTS kvkk_onaylandi BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS sozlesme_onaylandi BOOLEAN DEFAULT false
  `;
  console.log("✅ firmalar tablosu Faz 3 kolonları");

  await sql`
    CREATE TABLE IF NOT EXISTS firma_ilanlar (
      id SERIAL PRIMARY KEY,
      firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
      baslik TEXT NOT NULL,
      kategori TEXT NOT NULL,
      aciklama TEXT,
      fiyat_min NUMERIC(12,2),
      fiyat_max NUMERIC(12,2),
      para_birimi TEXT DEFAULT 'TRY',
      foto_urls JSONB DEFAULT '[]'::jsonb,
      teknik_ozellikler JSONB DEFAULT '{}'::jsonb,
      stok_durumu TEXT DEFAULT 'stokta',
      aktif BOOLEAN DEFAULT true,
      goruntulenme INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_firma_ilanlar_firma ON firma_ilanlar(firma_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_firma_ilanlar_kategori ON firma_ilanlar(kategori)`;
  console.log("✅ firma_ilanlar tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS firma_belgeleri (
      id SERIAL PRIMARY KEY,
      firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
      belge_tipi TEXT NOT NULL,
      dosya_url TEXT NOT NULL,
      sure_baslangic DATE,
      sure_bitis DATE,
      dogrulandi BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_firma_belgeleri_firma ON firma_belgeleri(firma_id)`;
  console.log("✅ firma_belgeleri tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS malzeme_talepleri (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER REFERENCES doktorlar(id) ON DELETE CASCADE,
      kategori TEXT NOT NULL,
      baslik TEXT NOT NULL,
      aciklama TEXT,
      butce TEXT,
      son_tarih DATE,
      durum TEXT DEFAULT 'acik',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_malzeme_talepleri_doktor ON malzeme_talepleri(doktor_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_malzeme_talepleri_durum ON malzeme_talepleri(durum)`;
  console.log("✅ malzeme_talepleri tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS firma_doktor_mesajlari (
      id SERIAL PRIMARY KEY,
      konusma_id TEXT NOT NULL,
      gonderen_tip TEXT NOT NULL CHECK (gonderen_tip IN ('firma','doktor')),
      gonderen_id INTEGER NOT NULL,
      alici_tip TEXT NOT NULL CHECK (alici_tip IN ('firma','doktor')),
      alici_id INTEGER NOT NULL,
      mesaj TEXT NOT NULL,
      okundu BOOLEAN DEFAULT false,
      referans_ilan_id INTEGER REFERENCES firma_ilanlar(id) ON DELETE SET NULL,
      referans_talep_id INTEGER REFERENCES malzeme_talepleri(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_fdm_konusma ON firma_doktor_mesajlari(konusma_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_fdm_alici ON firma_doktor_mesajlari(alici_tip, alici_id, okundu)`;
  console.log("✅ firma_doktor_mesajlari tablosu");

  // ─── TERCÜMAN — eksik kolonlar + yeni tablolar ─────────────────────────────
  await sql`
    ALTER TABLE tercumanlar
    ADD COLUMN IF NOT EXISTS hizmet_tipi TEXT,
    ADD COLUMN IF NOT EXISTS saatlik_ucret NUMERIC(10,2)
  `;
  console.log("✅ tercumanlar Faz 3 kolonları");

  await sql`
    CREATE TABLE IF NOT EXISTS tercuman_talepleri (
      id SERIAL PRIMARY KEY,
      talep_eden_tip TEXT NOT NULL CHECK (talep_eden_tip IN ('doktor','firma','hasta','admin')),
      talep_eden_id INTEGER,
      talep_eden_iletisim TEXT,
      dil_kaynak TEXT NOT NULL,
      dil_hedef TEXT NOT NULL,
      tarih DATE,
      sure_saat NUMERIC(5,2),
      lokasyon TEXT,
      hizmet_tipi TEXT NOT NULL DEFAULT 'yuz_yuze',
      aciklama TEXT,
      butce TEXT,
      durum TEXT DEFAULT 'acik',
      atanan_tercuman_id INTEGER REFERENCES tercumanlar(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_tt_durum ON tercuman_talepleri(durum)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tt_atanan ON tercuman_talepleri(atanan_tercuman_id)`;
  console.log("✅ tercuman_talepleri tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS tercuman_yorumlar (
      id SERIAL PRIMARY KEY,
      tercuman_id INTEGER REFERENCES tercumanlar(id) ON DELETE CASCADE,
      yazan_adi TEXT NOT NULL,
      puan INTEGER NOT NULL CHECK (puan BETWEEN 1 AND 5),
      metin TEXT,
      dogrulanmis BOOLEAN DEFAULT false,
      yayinlandi BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_ty_tercuman ON tercuman_yorumlar(tercuman_id)`;
  console.log("✅ tercuman_yorumlar tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS tercuman_musaitlik (
      id SERIAL PRIMARY KEY,
      tercuman_id INTEGER REFERENCES tercumanlar(id) ON DELETE CASCADE,
      tarih DATE NOT NULL,
      baslangic_saat TIME NOT NULL,
      bitis_saat TIME NOT NULL,
      dolu BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(tercuman_id, tarih, baslangic_saat)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_tm_tercuman_tarih ON tercuman_musaitlik(tercuman_id, tarih)`;
  console.log("✅ tercuman_musaitlik tablosu");

  // ─── HUKUK — sıfırdan yeni modül ──────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS avukatlar (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      ad TEXT NOT NULL,
      soyad TEXT,
      email TEXT UNIQUE NOT NULL,
      sifre_hash TEXT NOT NULL,
      telefon TEXT,
      baro_sicil_no TEXT,
      baro_sehir TEXT,
      uzmanlik_alanlari TEXT,
      deneyim_yil INTEGER DEFAULT 0,
      sehir TEXT,
      hakkinda TEXT,
      saatlik_ucret NUMERIC(10,2),
      foto_url TEXT,
      aktif BOOLEAN DEFAULT false,
      onaylandi BOOLEAN DEFAULT false,
      kvkk_onaylandi BOOLEAN DEFAULT false,
      sozlesme_onaylandi BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_avukatlar_sehir ON avukatlar(sehir)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_avukatlar_aktif ON avukatlar(aktif)`;
  console.log("✅ avukatlar tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS hukuki_danismanlik_talepleri (
      id SERIAL PRIMARY KEY,
      talep_eden_tip TEXT NOT NULL DEFAULT 'doktor' CHECK (talep_eden_tip IN ('doktor','firma','tercuman','admin')),
      talep_eden_id INTEGER NOT NULL,
      konu_kategori TEXT NOT NULL,
      soru_metni TEXT NOT NULL,
      aciliyet TEXT DEFAULT 'normal',
      butce TEXT,
      gizli BOOLEAN DEFAULT true,
      durum TEXT DEFAULT 'acik',
      atanan_avukat_id INTEGER REFERENCES avukatlar(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_hdt_durum ON hukuki_danismanlik_talepleri(durum)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_hdt_avukat ON hukuki_danismanlik_talepleri(atanan_avukat_id)`;
  console.log("✅ hukuki_danismanlik_talepleri tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS hukuki_makaleler (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      baslik TEXT NOT NULL,
      ozet TEXT,
      icerik_markdown TEXT NOT NULL,
      yazar_avukat_id INTEGER REFERENCES avukatlar(id) ON DELETE SET NULL,
      kategori TEXT NOT NULL,
      yayin_tarihi TIMESTAMPTZ DEFAULT NOW(),
      yayinda BOOLEAN DEFAULT true,
      goruntulenme INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_hm_slug ON hukuki_makaleler(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_hm_kategori ON hukuki_makaleler(kategori)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_hm_yayinda ON hukuki_makaleler(yayinda)`;
  console.log("✅ hukuki_makaleler tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS hukuki_bulten_aboneleri (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      ad TEXT,
      kvkk_onaylandi BOOLEAN DEFAULT false,
      aktif BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅ hukuki_bulten_aboneleri tablosu");

  await sql`
    CREATE TABLE IF NOT EXISTS hukuki_mesajlar (
      id SERIAL PRIMARY KEY,
      konusma_id TEXT NOT NULL,
      talep_id INTEGER REFERENCES hukuki_danismanlik_talepleri(id) ON DELETE CASCADE,
      gonderen_tip TEXT NOT NULL CHECK (gonderen_tip IN ('avukat','doktor','firma','tercuman')),
      gonderen_id INTEGER NOT NULL,
      alici_tip TEXT NOT NULL,
      alici_id INTEGER NOT NULL,
      mesaj TEXT NOT NULL,
      okundu BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_hmes_konusma ON hukuki_mesajlar(konusma_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_hmes_alici ON hukuki_mesajlar(alici_tip, alici_id, okundu)`;
  console.log("✅ hukuki_mesajlar tablosu");

  // ─── KLİNİK — yeni modül ───────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS klinikler (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      ad TEXT NOT NULL,
      kurum_tipi TEXT DEFAULT 'muayenehane' CHECK (kurum_tipi IN ('muayenehane','poliklinik','hastane','tip_merkezi')),
      sehir TEXT,
      adres TEXT,
      telefon TEXT,
      email TEXT,
      website TEXT,
      logo_url TEXT,
      foto_urls JSONB DEFAULT '[]'::jsonb,
      hakkinda TEXT,
      enlem TEXT,
      boylam TEXT,
      calisma_saatleri TEXT,
      hizmetler TEXT,
      onaylandi BOOLEAN DEFAULT false,
      goruntulenme INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_klinikler_sehir ON klinikler(sehir)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_klinikler_slug ON klinikler(slug)`;
  console.log("✅ klinikler tablosu");

  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS klinik_id INTEGER REFERENCES klinikler(id) ON DELETE SET NULL`;
  await sql`CREATE INDEX IF NOT EXISTS idx_doktorlar_klinik ON doktorlar(klinik_id)`;
  console.log("✅ doktorlar.klinik_id");

  // ─── SMS / WHATSAPP KUYRUĞU ────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS sms_kuyrugu (
      id SERIAL PRIMARY KEY,
      alici_telefon TEXT NOT NULL,
      mesaj TEXT NOT NULL,
      tip TEXT NOT NULL DEFAULT 'randevu_hatirlatma',
      kanal TEXT NOT NULL DEFAULT 'sms' CHECK (kanal IN ('sms','whatsapp','email')),
      referans_tip TEXT,
      referans_id INTEGER,
      gonderildi BOOLEAN DEFAULT false,
      gonderim_tarihi TIMESTAMPTZ,
      planlanan_tarih TIMESTAMPTZ DEFAULT NOW(),
      hata TEXT,
      deneme_sayisi INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_sms_planlanan ON sms_kuyrugu(planlanan_tarih) WHERE gonderildi = false`;
  await sql`CREATE INDEX IF NOT EXISTS idx_sms_referans ON sms_kuyrugu(referans_tip, referans_id)`;
  console.log("✅ sms_kuyrugu tablosu");

  console.log("\n🎉 Tüm migrasyonlar (Faz 1+2+3) tamamlandı!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
