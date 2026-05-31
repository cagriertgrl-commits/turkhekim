import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uzmanlik = searchParams.get("uzmanlik");
  const sehir = searchParams.get("sehir");

  let avukatlar;
  if (uzmanlik && sehir) {
    avukatlar = await sql`
      SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
      FROM avukatlar
      WHERE aktif = true
        AND uzmanlik_alanlari ILIKE ${"%" + uzmanlik + "%"}
        AND sehir ILIKE ${"%" + sehir + "%"}
      ORDER BY deneyim_yil DESC, created_at DESC
      LIMIT 60
    `;
  } else if (uzmanlik) {
    avukatlar = await sql`
      SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
      FROM avukatlar
      WHERE aktif = true AND uzmanlik_alanlari ILIKE ${"%" + uzmanlik + "%"}
      ORDER BY deneyim_yil DESC
      LIMIT 60
    `;
  } else if (sehir) {
    avukatlar = await sql`
      SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
      FROM avukatlar
      WHERE aktif = true AND sehir ILIKE ${"%" + sehir + "%"}
      ORDER BY deneyim_yil DESC
      LIMIT 60
    `;
  } else {
    avukatlar = await sql`
      SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
      FROM avukatlar
      WHERE aktif = true
      ORDER BY deneyim_yil DESC
      LIMIT 60
    `;
  }

  return NextResponse.json({ avukatlar });
}
