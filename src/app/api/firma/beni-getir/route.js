import { NextResponse } from "next/server";
import { getFirmaSession } from "@/lib/firmaSession";
import sql from "@/lib/db";

export async function GET() {
  const session = await getFirmaSession();
  if (!session) {
    return NextResponse.json({ hata: "Oturum yok." }, { status: 401 });
  }

  const [firma] = await sql`
    SELECT id, slug, ad, tip, aciklama, logo_url, website, email, telefon, aktif, created_at
    FROM firmalar
    WHERE id = ${session.id}
  `;

  if (!firma) {
    return NextResponse.json({ hata: "Firma bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ firma });
}
