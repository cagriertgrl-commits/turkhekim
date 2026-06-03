import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const ilanlar = await sql`
    SELECT i.id, i.baslik, i.kategori, i.fiyat_min, i.fiyat_max, i.para_birimi,
           i.stok_durumu, i.aktif, i.goruntulenme, i.created_at,
           f.ad AS firma_ad, f.slug AS firma_slug
    FROM firma_ilanlar i JOIN firmalar f ON f.id = i.firma_id
    ORDER BY i.created_at DESC LIMIT 200
  `;
  return NextResponse.json({ ilanlar });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, aktif } = await request.json();
  await sql`UPDATE firma_ilanlar SET aktif = ${aktif}, updated_at = NOW() WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM firma_ilanlar WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
