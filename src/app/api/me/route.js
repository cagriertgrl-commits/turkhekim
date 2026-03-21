import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ kullanici: null });
  const rows = await sql`SELECT foto_url FROM doktorlar WHERE id = ${session.id} LIMIT 1`.catch(() => []);
  const doktor = rows[0] || {};
  return NextResponse.json({
    kullanici: { ad: session.ad, slug: session.slug, foto_url: doktor.foto_url },
  });
}
