import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sehir = searchParams.get("sehir");
  const uzmanlik = searchParams.get("uzmanlik");
  const slug = searchParams.get("slug");
  const online = searchParams.get("online") === "1";

  // Tek doktor slug ile
  if (slug) {
    const doktorlar = await sql`SELECT * FROM doktorlar WHERE slug = ${slug} LIMIT 1`;
    return NextResponse.json({ doktor: doktorlar[0] || null });
  }

  let doktorlar;

  if (sehir && uzmanlik) {
    if (online) {
      doktorlar = await sql`
        SELECT * FROM doktorlar
        WHERE LOWER(sehir) LIKE ${"%" + sehir.toLowerCase() + "%"}
        AND LOWER(uzmanlik) LIKE ${"%" + uzmanlik.toLowerCase() + "%"}
        AND onaylandi = true AND online_randevu = true
        ORDER BY puan DESC NULLS LAST
      `;
    } else {
      doktorlar = await sql`
        SELECT * FROM doktorlar
        WHERE LOWER(sehir) LIKE ${"%" + sehir.toLowerCase() + "%"}
        AND LOWER(uzmanlik) LIKE ${"%" + uzmanlik.toLowerCase() + "%"}
        AND onaylandi = true
        ORDER BY puan DESC NULLS LAST
      `;
    }
  } else if (sehir) {
    doktorlar = await sql`
      SELECT * FROM doktorlar
      WHERE LOWER(sehir) LIKE ${"%" + sehir.toLowerCase() + "%"}
      AND onaylandi = true
      ORDER BY puan DESC NULLS LAST
    `;
  } else {
    doktorlar = await sql`SELECT * FROM doktorlar WHERE onaylandi = true ORDER BY puan DESC NULLS LAST`;
  }

  return NextResponse.json({ doktorlar });
}
