import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

// Tüm randevuları getir (admin için)
export async function GET(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const durum  = searchParams.get("durum");   // opsiyonel filtre
  const limit  = parseInt(searchParams.get("limit") || "50", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  let rows;

  if (durum) {
    rows = await sql`
      SELECT
        r.id,
        r.ad,
        r.telefon,
        r.tarih,
        r.saat,
        r.tip,
        r.durum,
        r.doktor_notu,
        r.olusturulma,
        d.ad       AS doktor_ad,
        d.soyad    AS doktor_soyad,
        d.uzmanlik AS doktor_uzmanlik,
        d.sehir    AS doktor_sehir
      FROM randevular r
      JOIN doktorlar d ON d.id = r.doktor_id
      WHERE r.durum = ${durum}
      ORDER BY r.olusturulma DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    rows = await sql`
      SELECT
        r.id,
        r.ad,
        r.telefon,
        r.tarih,
        r.saat,
        r.tip,
        r.durum,
        r.doktor_notu,
        r.olusturulma,
        d.ad       AS doktor_ad,
        d.soyad    AS doktor_soyad,
        d.uzmanlik AS doktor_uzmanlik,
        d.sehir    AS doktor_sehir
      FROM randevular r
      JOIN doktorlar d ON d.id = r.doktor_id
      ORDER BY r.olusturulma DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  // Özet istatistikler
  const [stats] = await sql`
    SELECT
      COUNT(*)                                        AS toplam,
      COUNT(*) FILTER (WHERE durum = 'beklemede')     AS beklemede,
      COUNT(*) FILTER (WHERE durum = 'onaylandi')     AS onaylandi,
      COUNT(*) FILTER (WHERE durum = 'reddedildi')    AS reddedildi,
      COUNT(*) FILTER (WHERE durum = 'tamamlandi')    AS tamamlandi,
      COUNT(*) FILTER (WHERE durum = 'iptal')         AS iptal
    FROM randevular
  `;

  return NextResponse.json({ rows, stats });
}

// Admin randevu durumunu güncelle (acil müdahale için)
export async function PATCH(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { id, durum } = await request.json();
  const gecerliDurumlar = ["beklemede", "onaylandi", "reddedildi", "tamamlandi", "iptal"];

  if (!gecerliDurumlar.includes(durum)) {
    return NextResponse.json({ hata: "Geçersiz durum." }, { status: 400 });
  }

  await sql`UPDATE randevular SET durum = ${durum} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Randevu durumu güncellendi." });
}
