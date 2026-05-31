-- ════════════════════════════════════════════════════════════════════════════
-- MIGRATION_FAZ3.sql — TurkHekim Faz 3 Yeni Modüller
-- Tarih: 2026-05-31
-- Kapsam: Pazaryeri genişletme + Tercüman tamamlama + Hukuk modülü +
--          Klinik modülü + SMS/WhatsApp kuyruğu
-- KURAL: Hepsi idempotent (IF NOT EXISTS) — birden fazla çalıştırılabilir,
--        mevcut veri korunur.
-- ════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. PAZARYERİ — Mevcut firmalar tablosunu genişlet + yeni tablolar
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE firmalar
  ADD COLUMN IF NOT EXISTS vergi_no TEXT,
  ADD COLUMN IF NOT EXISTS ad_soyad_yetkili TEXT,
  ADD COLUMN IF NOT EXISTS sehir TEXT,
  ADD COLUMN IF NOT EXISTS adres TEXT,
  ADD COLUMN IF NOT EXISTS hakkinda TEXT,
  ADD COLUMN IF NOT EXISTS kategori TEXT,
  ADD COLUMN IF NOT EXISTS kvkk_onaylandi BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS sozlesme_onaylandi BOOLEAN DEFAULT false;

-- Firma ilanları (cihaz, sarf, implant, ilaç, mobilya)
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
);
CREATE INDEX IF NOT EXISTS idx_firma_ilanlar_firma ON firma_ilanlar(firma_id);
CREATE INDEX IF NOT EXISTS idx_firma_ilanlar_kategori ON firma_ilanlar(kategori);

-- Firma belgeleri (vergi levha, imza sirküleri, TİTCK belgesi vs.)
CREATE TABLE IF NOT EXISTS firma_belgeleri (
  id SERIAL PRIMARY KEY,
  firma_id INTEGER REFERENCES firmalar(id) ON DELETE CASCADE,
  belge_tipi TEXT NOT NULL,
  dosya_url TEXT NOT NULL,
  sure_baslangic DATE,
  sure_bitis DATE,
  dogrulandi BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_firma_belgeleri_firma ON firma_belgeleri(firma_id);

-- Doktorun "şu malzemeyi arıyorum" RFQ talepleri
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
);
CREATE INDEX IF NOT EXISTS idx_malzeme_talepleri_doktor ON malzeme_talepleri(doktor_id);
CREATE INDEX IF NOT EXISTS idx_malzeme_talepleri_durum ON malzeme_talepleri(durum);

-- Firma-Doktor mesajlaşma
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
);
CREATE INDEX IF NOT EXISTS idx_fdm_konusma ON firma_doktor_mesajlari(konusma_id);
CREATE INDEX IF NOT EXISTS idx_fdm_alici ON firma_doktor_mesajlari(alici_tip, alici_id, okundu);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. TERCÜMAN — Mevcut tercumanlar tablosunu genişlet + yeni tablolar
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE tercumanlar
  ADD COLUMN IF NOT EXISTS hizmet_tipi TEXT,
  ADD COLUMN IF NOT EXISTS saatlik_ucret NUMERIC(10,2);

-- Tercüman talepleri (doktor/klinik/hasta tercüman arıyor)
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
);
CREATE INDEX IF NOT EXISTS idx_tt_durum ON tercuman_talepleri(durum);
CREATE INDEX IF NOT EXISTS idx_tt_atanan ON tercuman_talepleri(atanan_tercuman_id);

-- Tercüman yorumları
CREATE TABLE IF NOT EXISTS tercuman_yorumlar (
  id SERIAL PRIMARY KEY,
  tercuman_id INTEGER REFERENCES tercumanlar(id) ON DELETE CASCADE,
  yazan_adi TEXT NOT NULL,
  puan INTEGER NOT NULL CHECK (puan BETWEEN 1 AND 5),
  metin TEXT,
  dogrulanmis BOOLEAN DEFAULT false,
  yayinlandi BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ty_tercuman ON tercuman_yorumlar(tercuman_id);

-- Tercüman müsaitlik takvimi (basit)
CREATE TABLE IF NOT EXISTS tercuman_musaitlik (
  id SERIAL PRIMARY KEY,
  tercuman_id INTEGER REFERENCES tercumanlar(id) ON DELETE CASCADE,
  tarih DATE NOT NULL,
  baslangic_saat TIME NOT NULL,
  bitis_saat TIME NOT NULL,
  dolu BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tercuman_id, tarih, baslangic_saat)
);
CREATE INDEX IF NOT EXISTS idx_tm_tercuman_tarih ON tercuman_musaitlik(tercuman_id, tarih);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. HUKUK — Sıfırdan yeni modül
-- ─────────────────────────────────────────────────────────────────────────────

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
);
CREATE INDEX IF NOT EXISTS idx_avukatlar_sehir ON avukatlar(sehir);
CREATE INDEX IF NOT EXISTS idx_avukatlar_aktif ON avukatlar(aktif);

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
);
CREATE INDEX IF NOT EXISTS idx_hdt_durum ON hukuki_danismanlik_talepleri(durum);
CREATE INDEX IF NOT EXISTS idx_hdt_avukat ON hukuki_danismanlik_talepleri(atanan_avukat_id);

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
);
CREATE INDEX IF NOT EXISTS idx_hm_slug ON hukuki_makaleler(slug);
CREATE INDEX IF NOT EXISTS idx_hm_kategori ON hukuki_makaleler(kategori);
CREATE INDEX IF NOT EXISTS idx_hm_yayinda ON hukuki_makaleler(yayinda);

-- Hukuki bülten aboneleri (mevzuat güncellemeleri)
CREATE TABLE IF NOT EXISTS hukuki_bulten_aboneleri (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  ad TEXT,
  kvkk_onaylandi BOOLEAN DEFAULT false,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Avukat-Doktor gizli mesajlaşma (avukat-müvekkil gizliliği vurgusu)
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
);
CREATE INDEX IF NOT EXISTS idx_hmes_konusma ON hukuki_mesajlar(konusma_id);
CREATE INDEX IF NOT EXISTS idx_hmes_alici ON hukuki_mesajlar(alici_tip, alici_id, okundu);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. KLİNİK — Yeni modül (rakip analizden gelen öneri)
-- ─────────────────────────────────────────────────────────────────────────────

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
);
CREATE INDEX IF NOT EXISTS idx_klinikler_sehir ON klinikler(sehir);
CREATE INDEX IF NOT EXISTS idx_klinikler_slug ON klinikler(slug);

-- Doktor bir kliniğe bağlanabilsin
ALTER TABLE doktorlar
  ADD COLUMN IF NOT EXISTS klinik_id INTEGER REFERENCES klinikler(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_doktorlar_klinik ON doktorlar(klinik_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. SMS / WHATSAPP KUYRUĞU — Randevu hatırlatma altyapısı
-- ─────────────────────────────────────────────────────────────────────────────

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
);
CREATE INDEX IF NOT EXISTS idx_sms_planlanan ON sms_kuyrugu(planlanan_tarih) WHERE gonderildi = false;
CREATE INDEX IF NOT EXISTS idx_sms_referans ON sms_kuyrugu(referans_tip, referans_id);

-- ════════════════════════════════════════════════════════════════════════════
-- MIGRATION BİTTİ
-- ════════════════════════════════════════════════════════════════════════════
