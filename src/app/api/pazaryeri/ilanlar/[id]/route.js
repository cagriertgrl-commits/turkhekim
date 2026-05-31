import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getFirmaSession } from "@/lib/firmaSession";

export async function GET(_req, { params }) {
  const p = await params;
  const id = parseInt(p.id);
  if (!id) return NextResponse.json({ hata: "Geçersiz ilan." }, { status: 400 });

  const [ilan] = await sql`
    SELECT i.*, f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo,
           f.email AS firma_email, f.telefon AS firma_telefon, f.sehir AS firma_sehir,
           f.website AS firma_website, f.hakkinda AS firma_hakkinda
    FROM firma_ilanlar i
    JOIN firmalar f ON f.id = i.firma_id
    WHERE i.id = ${id} AND i.aktif = true
  `;

  if (!ilan) return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });

  try {
    await sql`UPDATE firma_ilanlar SET goruntulenme = goruntulenme + 1 WHERE id = ${id}`;
  } catch {}

  return NextResponse.json({ ilan });
}

export async function PATCH(req, { params }) {
  const p = await params;
  const id = parseInt(p.id);
  const session = await getFirmaSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const [mevcut] = await sql`SELECT firma_id FROM firma_ilanlar WHERE id = ${id}`;
  if (!mevcut) return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });
  if (mevcut.firma_id !== session.id) return NextResponse.json({ hata: "Yetkisiz." }, { status: 403 });

  const guncel = await req.json();
  const [ilan] = await sql`
    UPDATE firma_ilanlar SET
      baslik = COALESCE(${guncel.baslik?.trim() ?? null}, baslik),
      kategori = COALESCE(${guncel.kategori ?? null}, kategori),
      aciklama = COALESCE(${guncel.aciklama?.trim() ?? null}, aciklama),
      fiyat_min = COALESCE(${guncel.fiyat_min !== undefined ? parseFloat(guncel.fiyat_min) || null : null}, fiyat_min),
      fiyat_max = COALESCE(${guncel.fiyat_max !== undefined ? parseFloat(guncel.fiyat_max) || null : null}, fiyat_max),
      stok_durumu = COALESCE(${guncel.stok_durumu ?? null}, stok_durumu),
      aktif = COALESCE(${guncel.aktif ?? null}, aktif),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, baslik, kategori, stok_durumu, aktif
  `;
  return NextResponse.json({ basarili: true, ilan });
}

export async function DELETE(_req, { params }) {
  const p = await params;
  const id = parseInt(p.id);
  const session = await getFirmaSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const [mevcut] = await sql`SELECT firma_id FROM firma_ilanlar WHERE id = ${id}`;
  if (!mevcut) return NextResponse.json({ hata: "İlan bulunamadı." }, { status: 404 });
  if (mevcut.firma_id !== session.id) return NextResponse.json({ hata: "Yetkisiz." }, { status: 403 });

  await sql`DELETE FROM firma_ilanlar WHERE id = ${id}`;
  return NextResponse.json({ basarili: true });
}
