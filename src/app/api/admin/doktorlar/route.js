import sql from "@/lib/db";
import { NextResponse } from "next/server";

function adminKontrol(request) {
  const cookie = request.cookies.get("admin-token")?.value;
  return cookie === process.env.ADMIN_SECRET;
}

// Doktor onayla / reddet
export async function PATCH(request) {
  if (!adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { id, onaylandi } = await request.json();
  await sql`UPDATE doktorlar SET onaylandi = ${onaylandi} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

// Doktor sil
export async function DELETE(request) {
  if (!adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await request.json();
  await sql`DELETE FROM yorumlar WHERE doktor_id = ${id}`;
  await sql`DELETE FROM doktorlar WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
