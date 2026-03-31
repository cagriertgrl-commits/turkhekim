import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const tercumanlar = await sql`
    SELECT id, slug, ad, soyad, email, telefon, diller, uzmanlik_alani, sertifikalar, deneyim_yil, sehir, fiyat, hakkinda, musait, aktif, created_at
    FROM tercumanlar ORDER BY created_at DESC
  `;
  return NextResponse.json({ tercumanlar });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const { id, aktif } = await request.json();
  await sql`UPDATE tercumanlar SET aktif = ${aktif} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const { id } = await request.json();
  await sql`DELETE FROM tercumanlar WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
