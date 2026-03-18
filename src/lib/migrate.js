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
    ADD COLUMN IF NOT EXISTS onay_tarihi TIMESTAMPTZ
  `;

  await sql`
    ALTER TABLE yorumlar
    ADD COLUMN IF NOT EXISTS kvkk_onaylandi BOOLEAN DEFAULT false
  `;

  console.log("✅ Migrasyon tamamlandı!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
