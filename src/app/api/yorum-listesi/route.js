import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const yorumlar = await sql`
    SELECT y.*, d.ad as doktor_adi, d.slug as doktor_slug
    FROM yorumlar y
    JOIN doktorlar d ON y.doktor_id = d.id
    ORDER BY y.created_at DESC
  `;
  return NextResponse.json(yorumlar);
}
