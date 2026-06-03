import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const talepler = await sql`
    SELECT t.id, t.kategori, t.baslik, t.aciklama, t.butce, t.son_tarih, t.durum, t.created_at,
           d.ad AS doktor_ad, d.soyad AS doktor_soyad, d.uzmanlik AS doktor_uzmanlik
    FROM malzeme_talepleri t
    LEFT JOIN doktorlar d ON d.id = t.doktor_id
    ORDER BY t.created_at DESC LIMIT 200
  `;
  return NextResponse.json({ talepler });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, durum } = await request.json();
  if (!["acik", "kapali", "iptal"].includes(durum)) return NextResponse.json({ hata: "Geçersiz durum." }, { status: 400 });
  await sql`UPDATE malzeme_talepleri SET durum = ${durum} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM malzeme_talepleri WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
