import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

// Tüm doktorları listele (admin)
export async function GET(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const doktorlar = await sql`
    SELECT id, slug, ad, soyad, email, telefon, uzmanlik, sehir, paket,
           onaylandi, email_dogrulandi, diploma_dogrulandi, profil_goruntulenme,
           medikal_turizm, sigorta, adres, created_at
    FROM doktorlar
    ORDER BY created_at DESC
  `;
  return NextResponse.json({ doktorlar });
}

// Doktor onayla / reddet
export async function PATCH(request) {
  if (!await adminKontrol(request)) {
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
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await request.json();
  await sql`DELETE FROM yorumlar WHERE doktor_id = ${id}`;
  await sql`DELETE FROM doktorlar WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
