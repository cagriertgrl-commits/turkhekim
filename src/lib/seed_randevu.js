import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Randevu tablosu oluşturuluyor...");

  await sql`
    CREATE TABLE IF NOT EXISTS randevular (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER NOT NULL REFERENCES doktorlar(id) ON DELETE CASCADE,
      hasta_adi TEXT NOT NULL,
      telefon TEXT NOT NULL,
      sikayet TEXT,
      durum TEXT DEFAULT 'bekliyor',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("✅ Tamamlandı!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
