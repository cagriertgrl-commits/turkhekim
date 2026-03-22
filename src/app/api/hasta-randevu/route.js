import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

export async function GET(request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`hasta-sorgu-${ip}`, 10, 60); // dakikada 10
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla sorgu. Lütfen bekleyin." }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const telefon = searchParams.get("telefon")?.trim();
    const ad = searchParams.get("ad")?.trim();

    if (!telefon || telefon.length < 7) {
      return NextResponse.json({ hata: "Geçerli bir telefon numarası giriniz." }, { status: 400 });
    }

    // Telefon numarasını normalleştir (sadece rakamlar)
    const telefonTemiz = telefon.replace(/\D/g, "");

    let randevular;
    if (ad) {
      randevular = await sql`
        SELECT r.id, r.durum, r.tarih, r.saat, r.sikayet, r.tip, r.iptal_token, r.created_at,
               d.ad as doktor_ad, d.soyad as doktor_soyad, d.unvan as doktor_unvan,
               d.uzmanlik, d.slug as doktor_slug, d.sehir
        FROM randevular r
        JOIN doktorlar d ON d.id = r.doktor_id
        WHERE regexp_replace(r.telefon, '[^0-9]', '', 'g') = ${telefonTemiz}
          AND LOWER(r.hasta_adi) LIKE ${`%${ad.toLowerCase()}%`}
        ORDER BY r.created_at DESC
        LIMIT 20
      `;
    } else {
      randevular = await sql`
        SELECT r.id, r.durum, r.tarih, r.saat, r.sikayet, r.tip, r.iptal_token, r.created_at,
               d.ad as doktor_ad, d.soyad as doktor_soyad, d.unvan as doktor_unvan,
               d.uzmanlik, d.slug as doktor_slug, d.sehir
        FROM randevular r
        JOIN doktorlar d ON d.id = r.doktor_id
        WHERE regexp_replace(r.telefon, '[^0-9]', '', 'g') = ${telefonTemiz}
        ORDER BY r.created_at DESC
        LIMIT 20
      `;
    }

    return NextResponse.json({ randevular });
  } catch (err) {
    console.error("Hasta randevu sorgu hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası" }, { status: 500 });
  }
}
