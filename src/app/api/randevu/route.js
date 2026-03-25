import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "bilinmiyor";
    const { basarili } = rateLimit(`randevu-${ip}`, RATE_LIMITS.RANDEVU.limit, RATE_LIMITS.RANDEVU.pencereDakika); // saatte 5 randevu
    if (!basarili) {
      return NextResponse.json(
        { hata: "Çok fazla randevu talebi. Lütfen 1 saat bekleyin." },
        { status: 429 }
      );
    }

    const { doktor_id, hasta_adi, telefon, sikayet, tip, tarih, saat } = await request.json();

    if (!doktor_id || !hasta_adi || !telefon) {
      return NextResponse.json({ hata: "Ad ve telefon zorunludur." }, { status: 400 });
    }

    if (!/^[0-9\s\+\-]{10,15}$/.test(telefon.trim())) {
      return NextResponse.json({ hata: "Geçerli bir telefon numarası girin." }, { status: 400 });
    }

    const randevuTipi = ["yuzyuze", "online"].includes(tip) ? tip : "yuzyuze";

    // Hasta iptal token'ı
    const iptalToken = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

    // Aynı numaradan aynı doktora 24 saat içinde tekrar randevu engeli
    const mevcutRandevu = await sql`
      SELECT id FROM randevular
      WHERE doktor_id = ${doktor_id}
        AND telefon = ${telefon.trim()}
        AND created_at > NOW() - INTERVAL '24 hours'
    `;
    if (mevcutRandevu.length > 0) {
      return NextResponse.json(
        { hata: "Bu doktora zaten randevu talebiniz bulunuyor. 24 saat sonra tekrar deneyebilirsiniz." },
        { status: 400 }
      );
    }

    // Aynı doktor, aynı tarih-saat çakışma kontrolü
    if (tarih && saat) {
      const cakisan = await sql`
        SELECT id FROM randevular
        WHERE doktor_id = ${doktor_id}
          AND tarih = ${tarih}
          AND saat = ${saat}
          AND durum != 'iptal'
      `;
      if (cakisan.length > 0) {
        return NextResponse.json(
          { hata: "Bu tarih ve saatte başka bir randevu bulunuyor. Lütfen farklı bir saat seçin." },
          { status: 400 }
        );
      }
    }

    await sql`
      INSERT INTO randevular (doktor_id, hasta_adi, telefon, sikayet, durum, tip, tarih, saat, iptal_token)
      VALUES (${doktor_id}, ${hasta_adi.trim()}, ${telefon.trim()}, ${sikayet?.trim() || ""}, 'bekliyor', ${randevuTipi}, ${tarih || null}, ${saat || null}, ${iptalToken})
    `;

    return NextResponse.json({
      mesaj: "Randevu talebiniz alındı. Doktor en kısa sürede sizi arayacak.",
      iptal_linki: `/randevu-iptal/${iptalToken}`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doktor_id = searchParams.get("doktor_id");

  if (!doktor_id) {
    return NextResponse.json({ hata: "doktor_id gerekli." }, { status: 400 });
  }

  const randevular = await sql`
    SELECT id, hasta_adi, telefon, sikayet, durum, tarih, saat, created_at
    FROM randevular
    WHERE doktor_id = ${doktor_id}
    ORDER BY created_at DESC
  `;

  return NextResponse.json(randevular);
}

export async function PATCH(request) {
  const { id, durum } = await request.json();
  const gecerliDurumlar = ["bekliyor", "onaylandi", "iptal"];

  if (!id || !gecerliDurumlar.includes(durum)) {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }

  await sql`UPDATE randevular SET durum = ${durum} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}
