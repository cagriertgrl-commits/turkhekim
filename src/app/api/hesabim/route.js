import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  // Try full select, fall back if new columns still don't exist
  try {
    const rows = await sql`
      SELECT ad, slug, uzmanlik, foto_url, arka_plan_foto_url, COALESCE(tema, 'varsayilan') AS tema
      FROM doktorlar WHERE id = ${session.id} LIMIT 1
    `;
    return NextResponse.json(rows[0] || {});
  } catch (_) {
    // New columns might not have been created — return base data
    const rows = await sql`SELECT ad, slug, uzmanlik, foto_url FROM doktorlar WHERE id = ${session.id} LIMIT 1`;
    return NextResponse.json({ ...(rows[0] || {}), arka_plan_foto_url: null, tema: "varsayilan" });
  }
}

export async function PATCH(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const body = await request.json();
  const { tema } = body;

  // Tema alanı varsa kaydet
  if (tema !== undefined) {
    const gecerliTemalar = ["beyaz", "varsayilan", "turkuaz", "koyu", "mor", "pembe"];
    if (!gecerliTemalar.includes(tema)) {
      return NextResponse.json({ hata: "Geçersiz tema." }, { status: 400 });
    }
    try {
      await sql`UPDATE doktorlar SET tema = ${tema} WHERE id = ${session.id}`;
    } catch (err) {
      console.error("Tema güncelleme hatası:", err);
      // Sütun yoksa oluşturmayı dene
      try {
        await sql`ALTER TABLE doktorlar ADD COLUMN tema VARCHAR(50) DEFAULT 'varsayilan'`;
        await sql`UPDATE doktorlar SET tema = ${tema} WHERE id = ${session.id}`;
      } catch (err2) {
        console.error("Tema sütunu oluşturma hatası:", err2);
        return NextResponse.json({ hata: "Tema kaydedilemedi." }, { status: 500 });
      }
    }
  }

  // Güncel veriyi döndür
  try {
    const rows = await sql`
      SELECT ad, slug, uzmanlik, foto_url, arka_plan_foto_url, COALESCE(tema, 'varsayilan') AS tema
      FROM doktorlar WHERE id = ${session.id} LIMIT 1
    `;
    return NextResponse.json(rows[0] || {});
  } catch (_) {
    const rows = await sql`SELECT ad, slug, uzmanlik, foto_url FROM doktorlar WHERE id = ${session.id} LIMIT 1`;
    return NextResponse.json({ ...(rows[0] || {}), arka_plan_foto_url: null, tema: "varsayilan" });
  }
}
