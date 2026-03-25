import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limitAsildi = await rateLimit(`hastaprofil:${ip}`, RATE_LIMITS.HASTA_PROFIL.limit, RATE_LIMITS.HASTA_PROFIL.pencereDakika);
  if (limitAsildi) return NextResponse.json({ hata: "Çok fazla istek." }, { status: 429 });

  const body = await request.json();
  const {
    ad, telefon, dogum_yili, cinsiyet, kan_grubu,
    kronik_hastaliklar, alerjiler, kullanulan_ilaclar,
    gecirilen_ameliyatlar, ozel_notlar, kvkk_onaylandi,
  } = body;

  if (!ad || !kvkk_onaylandi) {
    return NextResponse.json({ hata: "Ad ve KVK onayı zorunlu." }, { status: 400 });
  }

  // Telefon varsa güncelle yoksa oluştur
  let profil;
  if (telefon) {
    const mevcut = await sql`SELECT id FROM hasta_profilleri WHERE telefon = ${telefon} LIMIT 1`;
    if (mevcut.length) {
      profil = await sql`
        UPDATE hasta_profilleri SET
          ad = ${ad}, dogum_yili = ${dogum_yili || null}, cinsiyet = ${cinsiyet || null},
          kan_grubu = ${kan_grubu || null}, kronik_hastaliklar = ${kronik_hastaliklar || null},
          alerjiler = ${alerjiler || null}, kullanulan_ilaclar = ${kullanulan_ilaclar || null},
          gecirilen_ameliyatlar = ${gecirilen_ameliyatlar || null}, ozel_notlar = ${ozel_notlar || null},
          kvkk_onaylandi = true, updated_at = NOW()
        WHERE telefon = ${telefon}
        RETURNING id
      `;
      return NextResponse.json({ tamam: true, profil_id: profil[0].id, yeni: false });
    }
  }

  profil = await sql`
    INSERT INTO hasta_profilleri
      (ad, telefon, dogum_yili, cinsiyet, kan_grubu, kronik_hastaliklar, alerjiler,
       kullanulan_ilaclar, gecirilen_ameliyatlar, ozel_notlar, kvkk_onaylandi)
    VALUES
      (${ad}, ${telefon || null}, ${dogum_yili || null}, ${cinsiyet || null}, ${kan_grubu || null},
       ${kronik_hastaliklar || null}, ${alerjiler || null}, ${kullanulan_ilaclar || null},
       ${gecirilen_ameliyatlar || null}, ${ozel_notlar || null}, true)
    RETURNING id
  `;

  return NextResponse.json({ tamam: true, profil_id: profil[0].id, yeni: true });
}
