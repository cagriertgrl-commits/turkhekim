import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

async function migrate() {
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS arka_plan_foto_url TEXT`.catch(() => {});
  await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS tema TEXT DEFAULT 'varsayilan'`.catch(() => {});
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  await migrate();

  const rows = await sql`
    SELECT ad, uzmanlik, foto_url, arka_plan_foto_url, tema
    FROM doktorlar WHERE id = ${session.id} LIMIT 1
  `;
  return NextResponse.json(rows[0] || {});
}

export async function PATCH(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { tema } = await request.json();
  const gecerliTemalar = ["varsayilan", "koyu", "teal", "desen"];
  if (!gecerliTemalar.includes(tema)) {
    return NextResponse.json({ hata: "Geçersiz tema." }, { status: 400 });
  }

  await sql`UPDATE doktorlar SET tema = ${tema} WHERE id = ${session.id}`;
  return NextResponse.json({ tamam: true });
}
