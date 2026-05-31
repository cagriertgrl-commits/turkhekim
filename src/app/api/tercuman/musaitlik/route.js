import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getTercumanSession } from "@/lib/tercumanSession";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tercuman_id = parseInt(searchParams.get("tercuman_id"));
  if (!tercuman_id) return NextResponse.json({ slots: [] });

  const slots = await sql`
    SELECT id, tarih, baslangic_saat, bitis_saat, dolu
    FROM tercuman_musaitlik
    WHERE tercuman_id = ${tercuman_id} AND tarih >= CURRENT_DATE
    ORDER BY tarih ASC, baslangic_saat ASC LIMIT 100
  `;

  return NextResponse.json({ slots });
}

export async function POST(req) {
  const session = await getTercumanSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  try {
    const { tarih, baslangic_saat, bitis_saat } = await req.json();
    if (!tarih || !baslangic_saat || !bitis_saat) {
      return NextResponse.json({ hata: "Tarih, başlangıç ve bitiş saatleri zorunlu." }, { status: 400 });
    }
    if (baslangic_saat >= bitis_saat) {
      return NextResponse.json({ hata: "Bitiş saati başlangıçtan sonra olmalı." }, { status: 400 });
    }

    const [slot] = await sql`
      INSERT INTO tercuman_musaitlik (tercuman_id, tarih, baslangic_saat, bitis_saat)
      VALUES (${session.id}, ${tarih}, ${baslangic_saat}, ${bitis_saat})
      ON CONFLICT (tercuman_id, tarih, baslangic_saat) DO NOTHING
      RETURNING id, tarih, baslangic_saat, bitis_saat
    `;

    if (!slot) return NextResponse.json({ hata: "Bu tarih ve saatte zaten kayıt var." }, { status: 409 });

    return NextResponse.json({ basarili: true, slot });
  } catch (err) {
    console.error("Müsaitlik ekleme hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getTercumanSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id"));
  if (!id) return NextResponse.json({ hata: "Geçersiz." }, { status: 400 });

  await sql`DELETE FROM tercuman_musaitlik WHERE id = ${id} AND tercuman_id = ${session.id}`;
  return NextResponse.json({ basarili: true });
}
