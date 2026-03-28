import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getTercumanSession } from "@/lib/tercumanSession";

export async function POST(req) {
  try {
    const session = await getTercumanSession();
    if (!session) {
      return NextResponse.json({ hata: "Oturum geçersiz." }, { status: 401 });
    }

    const { telefon, diller, uzmanlik_alani, sertifikalar, sehir, fiyat, hakkinda, musait } = await req.json();

    const [guncellenen] = await sql`
      UPDATE tercumanlar SET
        telefon = ${telefon?.trim() || null},
        diller = ${diller?.trim() || ""},
        uzmanlik_alani = ${uzmanlik_alani?.trim() || null},
        sertifikalar = ${sertifikalar?.trim() || null},
        sehir = ${sehir?.trim() || null},
        fiyat = ${fiyat?.trim() || null},
        hakkinda = ${hakkinda?.trim() || null},
        musait = ${musait !== false}
      WHERE id = ${session.id}
      RETURNING id, slug, ad, soyad, email, telefon, diller, uzmanlik_alani, sertifikalar, deneyim_yil, sehir, fiyat, hakkinda, musait, aktif
    `;

    if (!guncellenen) {
      return NextResponse.json({ hata: "Tercüman bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({ basarili: true, tercuman: guncellenen });
  } catch (err) {
    console.error("Tercüman profil güncelleme hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
