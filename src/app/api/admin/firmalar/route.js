import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const firmalar = await sql`
    SELECT id, slug, ad, vergi_no, ad_soyad_yetkili, email, telefon, sehir,
           kategori, tip, aktif, kvkk_onaylandi, sozlesme_onaylandi, created_at
    FROM firmalar ORDER BY created_at DESC
  `;
  return NextResponse.json({ firmalar });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, aktif } = await request.json();
  await sql`UPDATE firmalar SET aktif = ${aktif} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM firmalar WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
