import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });

  const { paylasi_id } = await req.json();
  if (!paylasi_id) return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });

  try {
    // Toggle: varsa sil, yoksa ekle
    const mevcut = await sql`
      SELECT id FROM paylasi_begeni WHERE paylasi_id = ${paylasi_id} AND doktor_id = ${session.id}
    `;
    if (mevcut.length) {
      await sql`DELETE FROM paylasi_begeni WHERE paylasi_id = ${paylasi_id} AND doktor_id = ${session.id}`;
      await sql`UPDATE paylasilar SET begeni_sayisi = GREATEST(0, begeni_sayisi - 1) WHERE id = ${paylasi_id}`;
      return NextResponse.json({ begendi: false });
    } else {
      await sql`INSERT INTO paylasi_begeni (paylasi_id, doktor_id) VALUES (${paylasi_id}, ${session.id})`;
      await sql`UPDATE paylasilar SET begeni_sayisi = begeni_sayisi + 1 WHERE id = ${paylasi_id}`;
      return NextResponse.json({ begendi: true });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
