import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getTercumanSession } from "@/lib/tercumanSession";

export async function GET() {
  try {
    const session = await getTercumanSession();
    if (!session) {
      return NextResponse.json({ tercuman: null }, { status: 401 });
    }

    const [tercuman] = await sql`
      SELECT id, slug, ad, soyad, email, telefon, foto_url, diller, uzmanlik_alani, sertifikalar, deneyim_yil, sehir, fiyat, hakkinda, musait, aktif
      FROM tercumanlar
      WHERE id = ${session.id}
    `;

    if (!tercuman) {
      return NextResponse.json({ tercuman: null }, { status: 404 });
    }

    return NextResponse.json({ tercuman });
  } catch (err) {
    console.error("Tercüman session hatası:", err);
    return NextResponse.json({ tercuman: null }, { status: 500 });
  }
}
