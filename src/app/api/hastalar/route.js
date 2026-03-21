import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Giriş yapmanız gerekiyor." }, { status: 401 });

  try {
    const rows = await sql`
      SELECT DISTINCT hasta_ad AS ad, hasta_soyad AS soyad
      FROM gorusme_ozetleri
      WHERE doktor_id = ${session.id}
        AND hasta_ad IS NOT NULL
      ORDER BY hasta_ad
    `;
    return NextResponse.json({ hastalar: rows });
  } catch {
    return NextResponse.json({ hastalar: [] });
  }
}
