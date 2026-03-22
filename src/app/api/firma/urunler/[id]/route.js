import { NextResponse } from "next/server";
import { getFirmaSession } from "@/lib/firmaSession";
import sql from "@/lib/db";

// PATCH — ürün güncelle
export async function PATCH(req, { params }) {
  const session = await getFirmaSession();
  if (!session) {
    return NextResponse.json({ hata: "Oturum yok." }, { status: 401 });
  }

  const { id } = await params;
  const guncellemeler = await req.json();

  // sadece firma'nın kendi ürünü
  const [mevcutUrun] = await sql`
    SELECT id FROM firma_urunler WHERE id = ${id} AND firma_id = ${session.id}
  `;
  if (!mevcutUrun) {
    return NextResponse.json({ hata: "Ürün bulunamadı." }, { status: 404 });
  }

  const { ad, aciklama, kategori, resim_url, aktif, indirimde, indirim_detay } = guncellemeler;

  const [guncellendi] = await sql`
    UPDATE firma_urunler SET
      ad = COALESCE(${ad ?? null}, ad),
      aciklama = COALESCE(${aciklama ?? null}, aciklama),
      kategori = COALESCE(${kategori ?? null}, kategori),
      resim_url = COALESCE(${resim_url ?? null}, resim_url),
      aktif = COALESCE(${aktif ?? null}, aktif),
      indirimde = COALESCE(${indirimde ?? null}, indirimde),
      indirim_detay = COALESCE(${indirim_detay ?? null}, indirim_detay)
    WHERE id = ${id} AND firma_id = ${session.id}
    RETURNING id, ad, aciklama, kategori, resim_url, aktif, indirimde, indirim_detay
  `;

  return NextResponse.json({ urun: guncellendi });
}

// DELETE — ürün sil
export async function DELETE(req, { params }) {
  const session = await getFirmaSession();
  if (!session) {
    return NextResponse.json({ hata: "Oturum yok." }, { status: 401 });
  }

  const { id } = await params;

  const sonuc = await sql`
    DELETE FROM firma_urunler WHERE id = ${id} AND firma_id = ${session.id}
    RETURNING id
  `;

  if (!sonuc.length) {
    return NextResponse.json({ hata: "Ürün bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ silindi: true });
}
