import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const klinikler = await sql`
    SELECT id, slug, ad, kurum_tipi, sehir, adres, telefon, email, website,
           onaylandi, goruntulenme, created_at
    FROM klinikler ORDER BY created_at DESC
  `;
  return NextResponse.json({ klinikler });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, onaylandi } = await request.json();
  await sql`UPDATE klinikler SET onaylandi = ${onaylandi}, updated_at = NOW() WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM klinikler WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
