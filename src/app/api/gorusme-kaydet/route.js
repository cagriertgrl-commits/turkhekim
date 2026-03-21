import { getSession } from "@/lib/session";


import sql from "@/lib/db";
import { NextResponse } from "next/server";

async function tabloOlustur() {
  await sql`
    CREATE TABLE IF NOT EXISTS gorusme_ozetleri (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER NOT NULL,
      hasta_ad TEXT,
      hasta_soyad TEXT,
      transkript TEXT NOT NULL,
      ozet TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Giriş yapmanız gerekiyor." }, { status: 401 });

  const [doktor] = await sql`SELECT paket FROM doktorlar WHERE id = ${session.id}`;
  if (!doktor || !["pro", "kurumsal"].includes(doktor.paket)) {
    return NextResponse.json({ hata: "Bu özellik Pro ve Kurumsal paket içindir." }, { status: 403 });
  }

  const { hastaAd, hastaSoyad, transkript, ozet } = await request.json();
  if (!transkript || !ozet) {
    return NextResponse.json({ hata: "Transkript ve özet gerekli." }, { status: 400 });
  }

  await tabloOlustur();

  // hasta_ad sütunu yoksa eski tabloya uyumlu çalış
  try {
    await sql`ALTER TABLE gorusme_ozetleri ADD COLUMN IF NOT EXISTS hasta_ad TEXT`;
    await sql`ALTER TABLE gorusme_ozetleri ADD COLUMN IF NOT EXISTS hasta_soyad TEXT`;
  } catch (_) {}

  await sql`
    INSERT INTO gorusme_ozetleri (doktor_id, hasta_ad, hasta_soyad, transkript, ozet)
    VALUES (${session.id}, ${hastaAd || null}, ${hastaSoyad || null}, ${transkript}, ${ozet})
  `;

  return NextResponse.json({ basarili: true });
}
