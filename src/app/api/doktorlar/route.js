import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sehir = searchParams.get("sehir");
  const uzmanlik = searchParams.get("uzmanlik");

  let doktorlar;

  if (sehir && uzmanlik) {
    doktorlar = await sql`
      SELECT * FROM doktorlar
      WHERE LOWER(sehir) LIKE ${"%" + sehir.toLowerCase() + "%"}
      AND LOWER(uzmanlik) LIKE ${"%" + uzmanlik.toLowerCase() + "%"}
      ORDER BY puan DESC
    `;
  } else if (sehir) {
    doktorlar = await sql`
      SELECT * FROM doktorlar
      WHERE LOWER(sehir) LIKE ${"%" + sehir.toLowerCase() + "%"}
      ORDER BY puan DESC
    `;
  } else {
    doktorlar = await sql`SELECT * FROM doktorlar ORDER BY puan DESC`;
  }

  return NextResponse.json(doktorlar);
}
