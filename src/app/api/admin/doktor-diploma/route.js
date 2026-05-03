import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const doktorlar = await sql`
    SELECT id, ad, soyad, unvan, uzmanlik, sehir, email, diploma_no, diploma_belge_url, diploma_dogrulandi, diploma_dogrulama_tarihi, created_at
    FROM doktorlar
    WHERE diploma_belge_url IS NOT NULL
    ORDER BY diploma_dogrulandi ASC, created_at DESC
  `;
  return NextResponse.json({ doktorlar });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }
  const { id, dogrulandi } = await request.json();
  await sql`
    UPDATE doktorlar
    SET diploma_dogrulandi = ${dogrulandi},
        diploma_dogrulama_tarihi = ${dogrulandi ? new Date() : null}
    WHERE id = ${id}
  `;
  return NextResponse.json({ basarili: true });
}
