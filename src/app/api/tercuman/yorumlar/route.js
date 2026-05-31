import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

export async function POST(req) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const { basarili } = rateLimit(`tercuman-yorum-${ip}`, 3, 60);
  if (!basarili) {
    return NextResponse.json({ hata: "Çok fazla yorum. Saatte 3 yorum gönderebilirsiniz." }, { status: 429 });
  }

  try {
    const { tercuman_id, yazan_adi, puan, metin, kvkk_onaylandi } = await req.json();

    if (!tercuman_id || !parseInt(tercuman_id)) {
      return NextResponse.json({ hata: "Geçersiz tercüman." }, { status: 400 });
    }
    if (!yazan_adi || yazan_adi.trim().length < 2) {
      return NextResponse.json({ hata: "Adınız zorunlu." }, { status: 400 });
    }
    const puanInt = parseInt(puan);
    if (!puanInt || puanInt < 1 || puanInt > 5) {
      return NextResponse.json({ hata: "Puan 1-5 arası olmalı." }, { status: 400 });
    }
    if (!metin || metin.trim().length < 15) {
      return NextResponse.json({ hata: "Yorum en az 15 karakter olmalı." }, { status: 400 });
    }
    if (!kvkk_onaylandi) {
      return NextResponse.json({ hata: "KVKK onayı gerekli." }, { status: 400 });
    }

    await sql`
      INSERT INTO tercuman_yorumlar (tercuman_id, yazan_adi, puan, metin)
      VALUES (${parseInt(tercuman_id)}, ${yazan_adi.trim()}, ${puanInt}, ${metin.trim()})
    `;

    return NextResponse.json({ basarili: true, mesaj: "Yorumunuz alındı. Moderasyon sonrası yayına çıkacak." });
  } catch (err) {
    console.error("Tercüman yorum hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tercuman_id = parseInt(searchParams.get("tercuman_id"));
  if (!tercuman_id) return NextResponse.json({ yorumlar: [] });

  const yorumlar = await sql`
    SELECT id, yazan_adi, puan, metin, dogrulanmis, created_at
    FROM tercuman_yorumlar
    WHERE tercuman_id = ${tercuman_id} AND yayinlandi = true
    ORDER BY created_at DESC LIMIT 30
  `;

  return NextResponse.json({ yorumlar });
}
