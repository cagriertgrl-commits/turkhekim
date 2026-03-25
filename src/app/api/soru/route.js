import { getSession } from "@/lib/session";
import sql from "@/lib/db";


import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { NextResponse } from "next/server";

// Hasta soru gönderir
export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "bilinmiyor";
    const { basarili } = rateLimit(ip, RATE_LIMITS.SORU.limit, RATE_LIMITS.SORU.pencereDakika); // saatte 5 soru
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla istek. Lütfen bekleyin." }, { status: 429 });
    }

    const { doktor_id, soran_adi, soru } = await request.json();

    if (!doktor_id || !soran_adi?.trim() || !soru?.trim()) {
      return NextResponse.json({ hata: "Tüm alanlar zorunludur." }, { status: 400 });
    }
    if (soru.trim().length < 10) {
      return NextResponse.json({ hata: "Soru en az 10 karakter olmalıdır." }, { status: 400 });
    }

    await sql`
      INSERT INTO sorular (doktor_id, soran_adi, soru)
      VALUES (${doktor_id}, ${soran_adi.trim()}, ${soru.trim()})
    `;

    return NextResponse.json({ mesaj: "Sorunuz iletildi. Doktor en kısa sürede yanıtlayacak." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

// Doktor kendi sorularını çeker (panel)
export async function GET(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const sorular = await sql`
    SELECT * FROM sorular WHERE doktor_id = ${session.id} ORDER BY created_at DESC
  `;

  return NextResponse.json({ sorular });
}

// Soruyu gizle/göster toggle
export async function PATCH(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { soru_id, gizli } = await request.json();
  if (soru_id === undefined) return NextResponse.json({ hata: "soru_id gerekli." }, { status: 400 });

  const result = await sql`
    UPDATE sorular SET gizli = ${Boolean(gizli)}
    WHERE id = ${soru_id} AND doktor_id = ${session.id}
    RETURNING id
  `;
  if (!result.length) return NextResponse.json({ hata: "Soru bulunamadı." }, { status: 404 });

  return NextResponse.json({ mesaj: gizli ? "Soru gizlendi." : "Soru yayına alındı." });
}

// Soruyu sil (sadece yanıtsız sorular)
export async function DELETE(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { soru_id } = await request.json();
  if (!soru_id) return NextResponse.json({ hata: "soru_id gerekli." }, { status: 400 });

  const result = await sql`
    DELETE FROM sorular WHERE id = ${soru_id} AND doktor_id = ${session.id} AND yanit IS NULL
    RETURNING id
  `;
  if (!result.length) return NextResponse.json({ hata: "Soru bulunamadı veya yanıtlanmış sorular silinemez." }, { status: 404 });

  return NextResponse.json({ mesaj: "Soru silindi." });
}
