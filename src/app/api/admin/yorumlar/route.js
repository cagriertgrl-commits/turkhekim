import sql from "@/lib/db";
import { NextResponse } from "next/server";

function adminKontrol(request) {
  const cookie = request.cookies.get("admin-token")?.value;
  return cookie === process.env.ADMIN_SECRET;
}

// Yorum sil
export async function DELETE(request) {
  if (!adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { id, doktor_id } = await request.json();
  await sql`DELETE FROM yorumlar WHERE id = ${id}`;

  // Doktorun puanını güncelle
  const yorumlar = await sql`SELECT puan FROM yorumlar WHERE doktor_id = ${doktor_id}`;
  if (yorumlar.length > 0) {
    const ort = (yorumlar.reduce((t, y) => t + y.puan, 0) / yorumlar.length).toFixed(1);
    await sql`UPDATE doktorlar SET puan = ${ort}, yorum_sayisi = ${yorumlar.length} WHERE id = ${doktor_id}`;
  } else {
    await sql`UPDATE doktorlar SET puan = 0, yorum_sayisi = 0 WHERE id = ${doktor_id}`;
  }

  return NextResponse.json({ mesaj: "Yorum silindi." });
}
