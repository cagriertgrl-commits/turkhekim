/**
 * Hafif hata takibi yardımcısı.
 *
 * Sentry/BetterStack vb. eklendiğinde bu fonksiyon güncellenir.
 * Şu an sadece DB'ye yazıyor (api_kullanim tablosunu kullanıyoruz).
 */

import sql from "@/lib/db";

export async function hataLogla(endpoint, hata, ekstra = {}) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS hata_logu (
        id SERIAL PRIMARY KEY,
        endpoint TEXT NOT NULL,
        mesaj TEXT NOT NULL,
        stack TEXT,
        ekstra JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await sql`
      INSERT INTO hata_logu (endpoint, mesaj, stack, ekstra)
      VALUES (${endpoint}, ${hata?.message || String(hata)}, ${hata?.stack || null}, ${JSON.stringify(ekstra)})
    `;
  } catch {
    /* DB'ye yazma başarısızsa son çare console */
    console.error("[hata-takibi]", endpoint, hata);
  }
}
