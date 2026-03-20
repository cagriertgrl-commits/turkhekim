import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ bildirimler: [] });

  const bildirimler = await sql`
    SELECT * FROM bildirimler
    WHERE hedef_tip = 'doktor' AND hedef_id = ${String(session.user.id)}
    ORDER BY created_at DESC
    LIMIT 20
  `;

  const okunmamis = bildirimler.filter((b) => !b.okundu).length;
  return NextResponse.json({ bildirimler, okunmamis });
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { id } = await request.json();
  if (id) {
    await sql`UPDATE bildirimler SET okundu = true WHERE id = ${id} AND hedef_id = ${String(session.user.id)}`;
  } else {
    await sql`UPDATE bildirimler SET okundu = true WHERE hedef_tip = 'doktor' AND hedef_id = ${String(session.user.id)}`;
  }
  return NextResponse.json({ tamam: true });
}
