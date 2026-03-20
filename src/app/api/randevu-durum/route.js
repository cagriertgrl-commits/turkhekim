import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { randevu_id, durum, doktor_notu } = await request.json();
  if (!randevu_id || !durum) return NextResponse.json({ hata: "Eksik parametre." }, { status: 400 });

  const izinliDurumlar = ["onaylandi", "reddedildi", "iptal", "tamamlandi"];
  if (!izinliDurumlar.includes(durum)) return NextResponse.json({ hata: "Geçersiz durum." }, { status: 400 });

  // Sadece kendi randevusunu güncelleyebilir
  const randevular = await sql`SELECT * FROM randevular WHERE id = ${randevu_id} AND doktor_id = ${session.user.id} LIMIT 1`;
  if (!randevular.length) return NextResponse.json({ hata: "Randevu bulunamadı." }, { status: 404 });

  const randevu = randevular[0];

  await sql`
    UPDATE randevular SET durum = ${durum}, doktor_notu = ${doktor_notu || null}
    WHERE id = ${randevu_id}
  `;

  // Hastaya bildirim
  const durumMetin = { onaylandi: "Onaylandı ✅", reddedildi: "Reddedildi ❌", iptal: "İptal Edildi", tamamlandi: "Tamamlandı" };
  await sql`
    INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj)
    VALUES ('hasta', ${randevu.telefon || 'bilinmiyor'}, 'randevu_durumu',
      ${`Randevunuz ${durumMetin[durum]}`},
      ${`${randevu.hasta_adi} adlı hastanın randevu talebi: ${durumMetin[durum]}${doktor_notu ? `. Not: ${doktor_notu}` : "."}`})
  `;

  return NextResponse.json({ tamam: true });
}
