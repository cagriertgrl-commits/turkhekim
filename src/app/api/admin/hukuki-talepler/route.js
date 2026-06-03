import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const talepler = await sql`
    SELECT t.id, t.talep_eden_tip, t.talep_eden_id, t.konu_kategori, t.soru_metni,
           t.aciliyet, t.butce, t.durum, t.created_at,
           a.ad AS avukat_ad, a.soyad AS avukat_soyad
    FROM hukuki_danismanlik_talepleri t
    LEFT JOIN avukatlar a ON a.id = t.atanan_avukat_id
    ORDER BY t.created_at DESC LIMIT 200
  `;
  return NextResponse.json({ talepler });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, durum, atanan_avukat_id } = await request.json();
  if (durum) await sql`UPDATE hukuki_danismanlik_talepleri SET durum = ${durum}, updated_at = NOW() WHERE id = ${id}`;
  if (atanan_avukat_id) await sql`UPDATE hukuki_danismanlik_talepleri SET atanan_avukat_id = ${atanan_avukat_id}, durum = 'atandi', updated_at = NOW() WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM hukuki_danismanlik_talepleri WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
