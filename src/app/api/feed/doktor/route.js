import sql from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ hata: "Giriş gerekli" }, { status: 401 });
    }

    const paylasilar = await sql`
      SELECT id, slug, baslik, icerik, kategori, okunma, yayinda, created_at
      FROM paylasilar
      WHERE doktor_id = ${session.user.id}
      ORDER BY created_at DESC
      LIMIT 50
    `;

    return NextResponse.json({ paylasilar });
  } catch (err) {
    console.error("Feed doktor GET hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası" }, { status: 500 });
  }
}
