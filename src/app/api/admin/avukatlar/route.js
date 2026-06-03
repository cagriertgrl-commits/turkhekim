import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const avukatlar = await sql`
    SELECT id, slug, ad, soyad, email, telefon, baro_sicil_no, baro_sehir, uzmanlik_alanlari,
           deneyim_yil, sehir, saatlik_ucret, aktif, onaylandi, created_at
    FROM avukatlar ORDER BY created_at DESC
  `;
  return NextResponse.json({ avukatlar });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, aktif, onaylandi } = await request.json();
  if (aktif !== undefined) await sql`UPDATE avukatlar SET aktif = ${aktif}, onaylandi = ${aktif}, updated_at = NOW() WHERE id = ${id}`;
  if (onaylandi !== undefined) await sql`UPDATE avukatlar SET onaylandi = ${onaylandi}, updated_at = NOW() WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM avukatlar WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
