import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const loglar = await sql`
    SELECT id, error_msg, error_stack, doktor_id, url, user_agent, ip, created_at
    FROM hata_logu ORDER BY created_at DESC LIMIT 200
  `;
  return NextResponse.json({ loglar });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const body = await request.json();
  if (body.id) {
    await sql`DELETE FROM hata_logu WHERE id = ${body.id}`;
  } else if (body.hepsi === true) {
    await sql`DELETE FROM hata_logu WHERE created_at < NOW() - INTERVAL '30 days'`;
  }
  return NextResponse.json({ mesaj: "Silindi." });
}
