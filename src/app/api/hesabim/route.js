import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

async function ensureColumns() {
  try { await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS arka_plan_foto_url TEXT`; } catch (_) {}
  try { await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS tema TEXT DEFAULT 'varsayilan'`; } catch (_) {}
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  await ensureColumns();

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

  const { tema } = await request.json();
  const gecerliTemalar = ["varsayilan", "koyu", "teal", "desen"];
  if (!gecerliTemalar.includes(tema)) {
    return NextResponse.json({ hata: "Geçersiz tema." }, { status: 400 });
  }

  try { await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS tema TEXT DEFAULT 'varsayilan'`; } catch (_) {}
  await sql`UPDATE doktorlar SET tema = ${tema} WHERE id = ${session.id}`;
  return NextResponse.json({ tamam: true });
}
