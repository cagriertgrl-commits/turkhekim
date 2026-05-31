import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getAvukatSession } from "@/lib/avukatSession";

function slugOlustur(metin) {
  return (metin || "")
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 90);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const kategori = searchParams.get("kategori");
  const arama = searchParams.get("q");

  let makaleler;
  if (kategori && arama) {
    makaleler = await sql`
      SELECT id, slug, baslik, ozet, kategori, yayin_tarihi, goruntulenme, yazar_avukat_id
      FROM hukuki_makaleler
      WHERE yayinda = true
        AND kategori = ${kategori}
        AND (baslik ILIKE ${"%" + arama + "%"} OR ozet ILIKE ${"%" + arama + "%"})
      ORDER BY yayin_tarihi DESC LIMIT 50
    `;
  } else if (kategori) {
    makaleler = await sql`
      SELECT id, slug, baslik, ozet, kategori, yayin_tarihi, goruntulenme, yazar_avukat_id
      FROM hukuki_makaleler
      WHERE yayinda = true AND kategori = ${kategori}
      ORDER BY yayin_tarihi DESC LIMIT 50
    `;
  } else if (arama) {
    makaleler = await sql`
      SELECT id, slug, baslik, ozet, kategori, yayin_tarihi, goruntulenme, yazar_avukat_id
      FROM hukuki_makaleler
      WHERE yayinda = true
        AND (baslik ILIKE ${"%" + arama + "%"} OR ozet ILIKE ${"%" + arama + "%"})
      ORDER BY yayin_tarihi DESC LIMIT 50
    `;
  } else {
    makaleler = await sql`
      SELECT id, slug, baslik, ozet, kategori, yayin_tarihi, goruntulenme, yazar_avukat_id
      FROM hukuki_makaleler
      WHERE yayinda = true
      ORDER BY yayin_tarihi DESC LIMIT 50
    `;
  }

  return NextResponse.json({ makaleler });
}

export async function POST(req) {
  const session = await getAvukatSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  try {
    const { baslik, ozet, icerik_markdown, kategori } = await req.json();

    if (!baslik || baslik.trim().length < 5) {
      return NextResponse.json({ hata: "Başlık en az 5 karakter olmalı." }, { status: 400 });
    }
    if (!icerik_markdown || icerik_markdown.trim().length < 100) {
      return NextResponse.json({ hata: "Makale içeriği en az 100 karakter olmalı." }, { status: 400 });
    }
    if (!kategori) {
      return NextResponse.json({ hata: "Kategori seçiniz." }, { status: 400 });
    }

    let slug = slugOlustur(baslik);
    const mevcut = await sql`SELECT id FROM hukuki_makaleler WHERE slug = ${slug}`;
    if (mevcut.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    const [makale] = await sql`
      INSERT INTO hukuki_makaleler (slug, baslik, ozet, icerik_markdown, yazar_avukat_id, kategori)
      VALUES (
        ${slug},
        ${baslik.trim()},
        ${ozet?.trim() || null},
        ${icerik_markdown.trim()},
        ${session.id},
        ${kategori}
      )
      RETURNING id, slug
    `;

    return NextResponse.json({ basarili: true, makale });
  } catch (err) {
    console.error("Makale ekleme hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
