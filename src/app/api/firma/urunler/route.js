import { NextResponse } from "next/server";
import { getFirmaSession } from "@/lib/firmaSession";
import sql from "@/lib/db";

// GET — firma ürünlerini listele
export async function GET() {
  const session = await getFirmaSession();
  if (!session) {
    return NextResponse.json({ hata: "Oturum yok." }, { status: 401 });
  }

  const urunler = await sql`
    SELECT id, ad, aciklama, kategori, resim_url, aktif, indirimde, indirim_detay, created_at
    FROM firma_urunler
    WHERE firma_id = ${session.id}
    ORDER BY created_at DESC
  `;

  return NextResponse.json({ urunler });
}

// POST — yeni ürün ekle
export async function POST(req) {
  const session = await getFirmaSession();
  if (!session) {
    return NextResponse.json({ hata: "Oturum yok." }, { status: 401 });
  }

  const { ad, aciklama, kategori, resim_url } = await req.json();

  if (!ad?.trim()) {
    return NextResponse.json({ hata: "Ürün adı gerekli." }, { status: 400 });
  }

  const [urun] = await sql`
    INSERT INTO firma_urunler (firma_id, ad, aciklama, kategori, resim_url)
    VALUES (${session.id}, ${ad.trim()}, ${aciklama || null}, ${kategori || "ilac"}, ${resim_url || null})
    RETURNING id, ad, aciklama, kategori, resim_url, aktif, indirimde, indirim_detay, created_at
  `;

  return NextResponse.json({ urun }, { status: 201 });
}
