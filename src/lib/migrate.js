import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Migrasyon başlıyor...");

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
    ADD COLUMN IF NOT EXISTS profil_goruntulenme INTEGER DEFAULT 0
  `;

  await sql`
    ALTER TABLE yorumlar
    ADD COLUMN IF NOT EXISTS kvkk_onaylandi BOOLEAN DEFAULT false
  `;

  await sql`
    ALTER TABLE randevular
    ADD COLUMN IF NOT EXISTS tip TEXT DEFAULT 'yuzyuze'
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS sorular (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER NOT NULL,
      soran_adi TEXT NOT NULL,
      soru TEXT NOT NULL,
      yanit TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("✅ Migrasyon tamamlandı!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
