import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

// GET /api/akis?sayfa=1
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sayfa = Math.max(1, parseInt(searchParams.get("sayfa") || "1"));
  const limit = 20;
  const offset = (sayfa - 1) * limit;
  const kategori = searchParams.get("kategori") || "";

  try {
    let posts;
    if (kategori) {
      posts = await sql`
        SELECT p.*,
          d.ad as doktor_ad, d.unvan as doktor_unvan, d.uzmanlik, d.foto_url as doktor_foto, d.slug as doktor_slug,
          f.ad as firma_ad, f.logo_url as firma_logo, f.slug as firma_slug
        FROM paylasilar p
        LEFT JOIN doktorlar d ON p.doktor_id = d.id
        LEFT JOIN firmalar f ON p.firma_id = f.id
        WHERE p.yayinda = true AND p.kategori = ${kategori}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      posts = await sql`
        SELECT p.*,
          d.ad as doktor_ad, d.unvan as doktor_unvan, d.uzmanlik, d.foto_url as doktor_foto, d.slug as doktor_slug,
          f.ad as firma_ad, f.logo_url as firma_logo, f.slug as firma_slug
        FROM paylasilar p
        LEFT JOIN doktorlar d ON p.doktor_id = d.id
        LEFT JOIN firmalar f ON p.firma_id = f.id
        WHERE p.yayinda = true
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    }
    return NextResponse.json({ posts, sayfa });
  } catch (err) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}

// POST /api/akis — yeni paylaşım
export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Giriş gerekli" }, { status: 401 });

  const body = await req.json();
  const { icerik, kategori, resim_url, etiketler } = body;

  if (!icerik?.trim()) return NextResponse.json({ hata: "İçerik boş olamaz" }, { status: 400 });

  const slug = `post-${Date.now()}-${session.id}`;

  try {
    const [post] = await sql`
      INSERT INTO paylasilar (doktor_id, baslik, slug, icerik, kategori, kaynak_tipi, resim_url, etiketler)
      VALUES (${session.id}, ${icerik.slice(0, 80)}, ${slug}, ${icerik}, ${kategori || "genel"}, 'doktor', ${resim_url || null}, ${etiketler || null})
      RETURNING *
    `;
    return NextResponse.json({ post });
  } catch (err) {
    return NextResponse.json({ hata: err.message }, { status: 500 });
  }
}
