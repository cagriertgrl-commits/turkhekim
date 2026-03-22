import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token, sebep } = await request.json();
    if (!token) return NextResponse.json({ hata: "Token gerekli." }, { status: 400 });

    const randevular = await sql`
      SELECT * FROM randevular WHERE iptal_token = ${token} LIMIT 1
    `;
    if (!randevular.length) return NextResponse.json({ hata: "Randevu bulunamadı." }, { status: 404 });

    const randevu = randevular[0];
    if (randevu.durum === "iptal") return NextResponse.json({ hata: "Bu randevu zaten iptal edildi." }, { status: 400 });
    if (randevu.durum === "tamamlandi") return NextResponse.json({ hata: "Tamamlanan randevu iptal edilemez." }, { status: 400 });

    await sql`
      UPDATE randevular
      SET durum = 'iptal', iptal_sebep = ${sebep || "hasta_istedigi"}, iptal_token = NULL
      WHERE iptal_token = ${token}
    `;

    // Doktora bildirim
    await sql`
      INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
      VALUES ('doktor', ${String(randevu.doktor_id)}, 'randevu_iptal', 'Randevu İptal Edildi',
        ${`${randevu.hasta_adi} adlı hasta randevusunu iptal etti.`},
        '/panel')
    `;

    return NextResponse.json({ mesaj: "Randevunuz iptal edildi." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) return NextResponse.json({ hata: "Token gerekli." }, { status: 400 });

  const randevular = await sql`
    SELECT r.id, r.hasta_adi, r.tarih, r.saat, r.durum, r.tip, d.ad as doktor_ad, d.uzmanlik
    FROM randevular r
    JOIN doktorlar d ON d.id = r.doktor_id
    WHERE r.iptal_token = ${token}
    LIMIT 1
  `;

  if (!randevular.length) return NextResponse.json({ hata: "Randevu bulunamadı." }, { status: 404 });
  return NextResponse.json(randevular[0]);
}
