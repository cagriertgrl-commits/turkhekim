import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getFirmaSession } from "@/lib/firmaSession";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const kategori = searchParams.get("kategori");
  const arama = searchParams.get("q");
  const firma_id = searchParams.get("firma_id");

  let ilanlar;
  if (firma_id) {
    ilanlar = await sql`
      SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
             i.foto_urls, i.stok_durumu, i.goruntulenme, i.created_at,
             f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
      FROM firma_ilanlar i
      JOIN firmalar f ON f.id = i.firma_id
      WHERE i.aktif = true AND i.firma_id = ${parseInt(firma_id)}
      ORDER BY i.created_at DESC LIMIT 60
    `;
  } else if (kategori && arama) {
    ilanlar = await sql`
      SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
             i.foto_urls, i.stok_durumu, i.goruntulenme, i.created_at,
             f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
      FROM firma_ilanlar i
      JOIN firmalar f ON f.id = i.firma_id
      WHERE i.aktif = true AND i.kategori = ${kategori}
        AND (i.baslik ILIKE ${"%" + arama + "%"} OR i.aciklama ILIKE ${"%" + arama + "%"})
      ORDER BY i.created_at DESC LIMIT 60
    `;
  } else if (kategori) {
    ilanlar = await sql`
      SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
             i.foto_urls, i.stok_durumu, i.goruntulenme, i.created_at,
             f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
      FROM firma_ilanlar i
      JOIN firmalar f ON f.id = i.firma_id
      WHERE i.aktif = true AND i.kategori = ${kategori}
      ORDER BY i.created_at DESC LIMIT 60
    `;
  } else if (arama) {
    ilanlar = await sql`
      SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
             i.foto_urls, i.stok_durumu, i.goruntulenme, i.created_at,
             f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
      FROM firma_ilanlar i
      JOIN firmalar f ON f.id = i.firma_id
      WHERE i.aktif = true
        AND (i.baslik ILIKE ${"%" + arama + "%"} OR i.aciklama ILIKE ${"%" + arama + "%"})
      ORDER BY i.created_at DESC LIMIT 60
    `;
  } else {
    ilanlar = await sql`
      SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
             i.foto_urls, i.stok_durumu, i.goruntulenme, i.created_at,
             f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
      FROM firma_ilanlar i
      JOIN firmalar f ON f.id = i.firma_id
      WHERE i.aktif = true
      ORDER BY i.created_at DESC LIMIT 60
    `;
  }

  return NextResponse.json({ ilanlar });
}

export async function POST(req) {
  const session = await getFirmaSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  try {
    const { baslik, kategori, aciklama, fiyat_min, fiyat_max, para_birimi, foto_urls, teknik_ozellikler, stok_durumu } = await req.json();

    if (!baslik || baslik.trim().length < 3) {
      return NextResponse.json({ hata: "Başlık zorunlu (en az 3 karakter)." }, { status: 400 });
    }
    if (!kategori) {
      return NextResponse.json({ hata: "Kategori seçiniz." }, { status: 400 });
    }

    const [ilan] = await sql`
      INSERT INTO firma_ilanlar (
        firma_id, baslik, kategori, aciklama, fiyat_min, fiyat_max, para_birimi,
        foto_urls, teknik_ozellikler, stok_durumu
      ) VALUES (
        ${session.id},
        ${baslik.trim()},
        ${kategori},
        ${aciklama?.trim() || null},
        ${fiyat_min ? parseFloat(fiyat_min) : null},
        ${fiyat_max ? parseFloat(fiyat_max) : null},
        ${para_birimi || "TRY"},
        ${JSON.stringify(foto_urls || [])}::jsonb,
        ${JSON.stringify(teknik_ozellikler || {})}::jsonb,
        ${stok_durumu || "stokta"}
      )
      RETURNING id, baslik, kategori, created_at
    `;

    return NextResponse.json({ basarili: true, ilan });
  } catch (err) {
    console.error("İlan oluşturma hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
