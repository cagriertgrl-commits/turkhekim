import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const makaleler = await sql`
    SELECT m.id, m.slug, m.baslik, m.ozet, m.kategori, m.yayin_tarihi, m.yayinda, m.goruntulenme,
           a.ad AS yazar_ad, a.soyad AS yazar_soyad
    FROM hukuki_makaleler m
    LEFT JOIN avukatlar a ON a.id = m.yazar_avukat_id
    ORDER BY m.yayin_tarihi DESC LIMIT 200
  `;
  return NextResponse.json({ makaleler });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, yayinda } = await request.json();
  await sql`UPDATE hukuki_makaleler SET yayinda = ${yayinda}, updated_at = NOW() WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM hukuki_makaleler WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
