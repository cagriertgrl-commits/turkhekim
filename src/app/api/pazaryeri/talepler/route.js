import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const kategori = searchParams.get("kategori");

  const talepler = kategori
    ? await sql`
        SELECT t.id, t.kategori, t.baslik, t.aciklama, t.butce, t.son_tarih, t.durum, t.created_at,
               d.ad AS doktor_ad, d.uzmanlik AS doktor_uzmanlik, d.sehir AS doktor_sehir
        FROM malzeme_talepleri t
        LEFT JOIN doktorlar d ON d.id = t.doktor_id
        WHERE t.durum = 'acik' AND t.kategori = ${kategori}
        ORDER BY t.created_at DESC LIMIT 100
      `
    : await sql`
        SELECT t.id, t.kategori, t.baslik, t.aciklama, t.butce, t.son_tarih, t.durum, t.created_at,
               d.ad AS doktor_ad, d.uzmanlik AS doktor_uzmanlik, d.sehir AS doktor_sehir
        FROM malzeme_talepleri t
        LEFT JOIN doktorlar d ON d.id = t.doktor_id
        WHERE t.durum = 'acik'
        ORDER BY t.created_at DESC LIMIT 100
      `;

  return NextResponse.json({ talepler });
}

export async function POST(req) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ hata: "Talep oluşturmak için doktor olarak giriş yapın." }, { status: 401 });
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const { basarili } = rateLimit(`pazaryeri-talep-${ip}`, RATE_LIMITS.SORU.limit, RATE_LIMITS.SORU.pencereDakika);
  if (!basarili) {
    return NextResponse.json({ hata: "Çok fazla talep. Saatte 5 talep gönderebilirsiniz." }, { status: 429 });
  }

  try {
    const { kategori, baslik, aciklama, butce, son_tarih } = await req.json();

    if (!kategori) return NextResponse.json({ hata: "Kategori seçiniz." }, { status: 400 });
    if (!baslik || baslik.trim().length < 5) {
      return NextResponse.json({ hata: "Başlık en az 5 karakter olmalı." }, { status: 400 });
    }
    if (!aciklama || aciklama.trim().length < 20) {
      return NextResponse.json({ hata: "Açıklamayı detaylı yazın (en az 20 karakter)." }, { status: 400 });
    }

    const [talep] = await sql`
      INSERT INTO malzeme_talepleri (doktor_id, kategori, baslik, aciklama, butce, son_tarih)
      VALUES (
        ${session.id},
        ${kategori},
        ${baslik.trim()},
        ${aciklama.trim()},
        ${butce?.trim() || null},
        ${son_tarih || null}
      )
      RETURNING id, baslik, kategori, created_at
    `;

    return NextResponse.json({ basarili: true, talep, mesaj: "Talebiniz yayınlandı. İlgili firmalara bildirim gidecek." });
  } catch (err) {
    console.error("Talep oluşturma hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
