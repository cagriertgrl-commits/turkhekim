import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "30");
    const offset = parseInt(searchParams.get("offset") || "0");

    const gonderiler = await sql`
      SELECT id, konu, caption, gorsel_url, durum, instagram_id, created_at
      FROM instagram_gonderiler
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const total = await sql`SELECT COUNT(*) as count FROM instagram_gonderiler`;

    return NextResponse.json({
      gonderiler,
      total: total[0].count,
      limit,
      offset,
    });
  } catch (err) {
    console.error("Instagram fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
