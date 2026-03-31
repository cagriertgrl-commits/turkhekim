import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const basvurular = await sql`
    SELECT id, firma_adi, yetkili_adi, email, telefon, firma_tipi, paket, notlar, durum, created_at
    FROM firma_basvurular ORDER BY created_at DESC
  `;
  return NextResponse.json({ basvurular });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const { id, durum } = await request.json();
  await sql`UPDATE firma_basvurular SET durum = ${durum} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const { id } = await request.json();
  await sql`DELETE FROM firma_basvurular WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
