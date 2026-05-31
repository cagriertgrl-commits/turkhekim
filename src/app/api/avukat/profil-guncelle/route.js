import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getAvukatSession } from "@/lib/avukatSession";

export async function POST(req) {
  try {
    const session = await getAvukatSession();
    if (!session) {
      return NextResponse.json({ hata: "Oturum geçersiz." }, { status: 401 });
    }

    const { telefon, baro_sehir, sehir, uzmanlik_alanlari, deneyim_yil, saatlik_ucret, hakkinda } = await req.json();

    const [guncellenen] = await sql`
      UPDATE avukatlar SET
        telefon = ${telefon?.trim() || null},
        baro_sehir = ${baro_sehir?.trim() || null},
        sehir = ${sehir?.trim() || null},
        uzmanlik_alanlari = ${uzmanlik_alanlari?.trim() || ""},
        deneyim_yil = ${parseInt(deneyim_yil) || 0},
        saatlik_ucret = ${parseFloat(saatlik_ucret) || null},
        hakkinda = ${hakkinda?.trim() || null},
        updated_at = NOW()
      WHERE id = ${session.id}
      RETURNING id, slug, ad, soyad, email, telefon, baro_sicil_no, baro_sehir,
                uzmanlik_alanlari, deneyim_yil, sehir, hakkinda, saatlik_ucret, foto_url, aktif
    `;

    if (!guncellenen) {
      return NextResponse.json({ hata: "Avukat bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ basarili: true, avukat: guncellenen });
  } catch (err) {
    console.error("Avukat profil güncelleme hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
