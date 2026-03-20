import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doktorId = searchParams.get("doktor_id");
  const slug = searchParams.get("slug");

  let yorumlar;

  if (doktorId) {
    yorumlar = await sql`SELECT * FROM yorumlar WHERE doktor_id = ${doktorId} ORDER BY created_at DESC`;
  } else if (slug) {
    yorumlar = await sql`
      SELECT y.* FROM yorumlar y
      JOIN doktorlar d ON y.doktor_id = d.id
      WHERE d.slug = ${slug}
      ORDER BY y.created_at DESC
    `;
  } else {
    yorumlar = await sql`
      SELECT y.*, d.ad as doktor_adi, d.slug as doktor_slug
      FROM yorumlar y
      JOIN doktorlar d ON y.doktor_id = d.id
      ORDER BY y.created_at DESC
    `;
  }

  return NextResponse.json({ yorumlar });
}
