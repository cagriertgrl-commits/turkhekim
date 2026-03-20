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

  const body = await request.json();
  const { id } = body;

  if (body.paket !== undefined) {
    const gecerliPaketler = ["ucretsiz", "premium", "pro", "kurumsal"];
    if (!gecerliPaketler.includes(body.paket)) {
      return NextResponse.json({ hata: "Geçersiz paket." }, { status: 400 });
    }
    await sql`UPDATE doktorlar SET paket = ${body.paket} WHERE id = ${id}`;
  } else {
    await sql`UPDATE doktorlar SET onaylandi = ${body.onaylandi} WHERE id = ${id}`;
  }

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
