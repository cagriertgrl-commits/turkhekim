import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const odemeler = await sql`
    SELECT o.id, o.doktor_id, o.paket, o.tutar, o.durum, o.saglayici_odeme_id, o.kart_son_4, o.created_at, o.tamamlandi_at,
           d.ad as doktor_ad, d.soyad as doktor_soyad, d.email as doktor_email
    FROM odemeler o
    LEFT JOIN doktorlar d ON d.id = o.doktor_id
    ORDER BY o.created_at DESC
    LIMIT 100
  `;

  const faturalar = await sql`
    SELECT f.id, f.fatura_no, f.brut_tutar, f.net_tutar, f.kdv_tutar, f.durum, f.adi_soyadi, f.created_at, f.kesilme_tarihi,
           d.ad as doktor_ad, d.email as doktor_email
    FROM faturalar f
    LEFT JOIN doktorlar d ON d.id = f.doktor_id
    ORDER BY f.created_at DESC
    LIMIT 100
  `;

  const ozet = await sql`
    SELECT
      COUNT(*) FILTER (WHERE durum = 'basarili') as basarili_sayi,
      COUNT(*) FILTER (WHERE durum = 'bekliyor') as bekleyen_sayi,
      COUNT(*) FILTER (WHERE durum = 'basarisiz') as basarisiz_sayi,
      COALESCE(SUM(tutar) FILTER (WHERE durum = 'basarili'), 0) as toplam_gelir,
      COALESCE(SUM(tutar) FILTER (WHERE durum = 'basarili' AND tamamlandi_at >= NOW() - INTERVAL '30 days'), 0) as bu_ay_gelir
    FROM odemeler
  `;

  return NextResponse.json({ odemeler, faturalar, ozet: ozet[0] });
}
