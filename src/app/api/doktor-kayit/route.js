import sql from "@/lib/db";
import { hash } from "bcryptjs";
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
    const { ad, uzmanlik, sehir, ilce, telefon, email, deneyim, hakkinda, sifre } = body;

    if (!ad || !uzmanlik || !sehir || !telefon || !email || !sifre) {
      return NextResponse.json({ hata: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    const mevcutEmail = await sql`SELECT id FROM doktorlar WHERE email = ${email}`;
    if (mevcutEmail.length > 0) {
      return NextResponse.json({ hata: "Bu email zaten kayıtlı." }, { status: 400 });
    }

    const slug = slugOlustur(ad) + "-" + slugOlustur(sehir);
    const mevcutSlug = await sql`SELECT id FROM doktorlar WHERE slug = ${slug}`;
    const finalSlug = mevcutSlug.length > 0 ? slug + "-" + Date.now() : slug;

    const hashedSifre = await hash(sifre, 12);

    const yeni = await sql`
      INSERT INTO doktorlar (slug, ad, uzmanlik, sehir, ilce, telefon, email, sifre, deneyim, hakkinda, puan, yorum_sayisi, musait, onaylandi)
      VALUES (${finalSlug}, ${ad}, ${uzmanlik}, ${sehir}, ${ilce || ""}, ${telefon}, ${email}, ${hashedSifre}, ${deneyim || ""}, ${hakkinda || ""}, 0, 0, true, false)
      RETURNING id, slug
    `;

    return NextResponse.json({ mesaj: "Kayıt başarılı!", slug: yeni[0].slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
