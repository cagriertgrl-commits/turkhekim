import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

// Pricing per million tokens (approximate)
const FIYATLAR = {
  "claude-haiku-4-5-20251001": { input: 0.80, output: 4.00 },
  "claude-sonnet-4-6": { input: 3.00, output: 15.00 },
};

function maliyetHesapla(model, inputTokens, outputTokens) {
  const f = FIYATLAR[model] || { input: 1.0, output: 5.0 };
  return (inputTokens / 1_000_000) * f.input + (outputTokens / 1_000_000) * f.output;
}

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  try {
    // Table might not exist yet
    await sql`CREATE TABLE IF NOT EXISTS api_kullanim (id SERIAL PRIMARY KEY, endpoint TEXT NOT NULL, model TEXT NOT NULL, input_tokens INTEGER NOT NULL, output_tokens INTEGER NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW())`;

    const [buAy, gunluk, endpoint, toplamSatir] = await Promise.all([
      // Bu ay toplam
      sql`
        SELECT
          COALESCE(SUM(input_tokens), 0) AS input_tokens,
          COALESCE(SUM(output_tokens), 0) AS output_tokens,
          COUNT(*) AS istek_sayisi
        FROM api_kullanim
        WHERE created_at >= date_trunc('month', NOW())
      `,
      // Son 7 günlük günlük breakdown
      sql`
        SELECT
          DATE(created_at) AS tarih,
          COALESCE(SUM(input_tokens), 0) AS input_tokens,
          COALESCE(SUM(output_tokens), 0) AS output_tokens,
          COUNT(*) AS istek_sayisi
        FROM api_kullanim
        WHERE created_at >= NOW() - INTERVAL '7 days'
        GROUP BY DATE(created_at)
        ORDER BY tarih DESC
      `,
      // Endpoint bazlı
      sql`
        SELECT
          endpoint,
          model,
          COALESCE(SUM(input_tokens), 0) AS input_tokens,
          COALESCE(SUM(output_tokens), 0) AS output_tokens,
          COUNT(*) AS istek_sayisi
        FROM api_kullanim
        WHERE created_at >= date_trunc('month', NOW())
        GROUP BY endpoint, model
        ORDER BY istek_sayisi DESC
      `,
      // Toplam tüm zamanlar
      sql`SELECT COALESCE(SUM(input_tokens), 0) AS input_tokens, COALESCE(SUM(output_tokens), 0) AS output_tokens, COUNT(*) AS istek_sayisi FROM api_kullanim`,
    ]);

    const buAyMaliyet = endpoint.reduce((acc, row) =>
      acc + maliyetHesapla(row.model, Number(row.input_tokens), Number(row.output_tokens)), 0
    );
    const toplamMaliyet = toplamSatir[0] ? maliyetHesapla('claude-haiku-4-5-20251001', Number(toplamSatir[0].input_tokens), Number(toplamSatir[0].output_tokens)) : 0;

    return NextResponse.json({
      buAy: buAy[0],
      buAyMaliyet,
      gunluk,
      endpoint,
      toplam: toplamSatir[0],
      toplamMaliyet,
    });
  } catch (err) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}
