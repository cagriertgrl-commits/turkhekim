import sql from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

// Hasta soru gönderir
export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "bilinmiyor";
    const { basarili } = rateLimit(ip, 5, 60); // saatte 5 soru
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
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const sorular = await sql`
    SELECT * FROM sorular WHERE doktor_id = ${session.user.id} ORDER BY created_at DESC
  `;

  return NextResponse.json({ sorular });
}
