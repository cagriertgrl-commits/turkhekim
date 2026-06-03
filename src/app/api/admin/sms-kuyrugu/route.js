import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";
import { kuyruguIsle } from "@/lib/smsServisi";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const kuyruk = await sql`
    SELECT id, alici_telefon, mesaj, tip, kanal, referans_tip, referans_id,
           gonderildi, gonderim_tarihi, planlanan_tarih, hata, deneme_sayisi, created_at
    FROM sms_kuyrugu ORDER BY created_at DESC LIMIT 200
  `;
  return NextResponse.json({ kuyruk });
}

export async function POST(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  try {
    const sonuc = await kuyruguIsle({ limit: 100 });
    return NextResponse.json({ basarili: true, ...sonuc });
  } catch (err) {
    console.error("Manuel SMS işleme hatası:", err);
    return NextResponse.json({ hata: String(err?.message || err) }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM sms_kuyrugu WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}
