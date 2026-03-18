import sql from "@/lib/db";
import { NextResponse } from "next/server";

function slugOlustur(ad) {
  return ad
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { ad, uzmanlik, sehir, ilce, telefon, email, deneyim, hakkinda } = body;

    if (!ad || !uzmanlik || !sehir || !telefon || !email) {
      return NextResponse.json({ hata: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    const slug = slugOlustur(ad) + "-" + slugOlustur(sehir);

    // Aynı slug varsa numara ekle
    const mevcut = await sql`SELECT id FROM doktorlar WHERE slug = ${slug}`;
    const finalSlug = mevcut.length > 0 ? slug + "-" + Date.now() : slug;

    const yeni = await sql`
      INSERT INTO doktorlar (slug, ad, uzmanlik, sehir, ilce, deneyim, hakkinda, puan, yorum_sayisi, musait)
      VALUES (${finalSlug}, ${ad}, ${uzmanlik}, ${sehir}, ${ilce || ""}, ${deneyim || ""}, ${hakkinda || ""}, 0, 0, true)
      RETURNING id, slug
    `;

    return NextResponse.json({
      mesaj: "Kayıt başarılı!",
      slug: yeni[0].slug,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
