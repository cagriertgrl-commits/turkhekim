import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { checkoutFormBaslat } from "@/lib/iyzico";
import { PAKETLER, paketFiyat } from "@/lib/paketler";
import crypto from "crypto";

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { paket, periyod } = await request.json().catch(() => ({}));

  if (!PAKETLER[paket]) {
    return NextResponse.json({ hata: "Geçersiz paket." }, { status: 400 });
  }
  const tutar = paketFiyat(paket, periyod);
  if (!tutar) return NextResponse.json({ hata: "Fiyat bulunamadı." }, { status: 400 });

  const [doktor] = await sql`SELECT id, ad, soyad, email, telefon, sehir, adres FROM doktorlar WHERE id = ${session.id}`;
  if (!doktor) return NextResponse.json({ hata: "Doktor bulunamadı." }, { status: 404 });

  const konversasyonId = `dp-${doktor.id}-${crypto.randomBytes(6).toString("hex")}`;

  // Veritabanına bekleyen ödeme kaydı
  await sql`
    INSERT INTO odemeler (doktor_id, paket, tutar, konversasyon_id, durum)
    VALUES (${doktor.id}, ${paket}, ${tutar}, ${konversasyonId}, 'bekliyor')
  `;

  const callbackUrl = "https://doktorpusula.com/api/odeme/callback";

  const sonuc = await checkoutFormBaslat({
    tutar,
    konversasyonId,
    callbackUrl,
    alici: {
      id: doktor.id,
      ad: doktor.ad,
      soyad: doktor.soyad,
      email: doktor.email,
      telefon: doktor.telefon,
      sehir: doktor.sehir,
      adres: doktor.adres,
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
    },
    urunler: [{
      id: paket,
      ad: `DoktorPusula ${PAKETLER[paket].ad} (${periyod === "yillik" ? "Yıllık" : "Aylık"})`,
      kategori: "Üyelik",
      tutar,
    }],
  });

  if (sonuc.status !== "success") {
    await sql`UPDATE odemeler SET durum = 'hata', hata_mesaji = ${sonuc.errorMessage || "iyzico hatası"} WHERE konversasyon_id = ${konversasyonId}`;
    return NextResponse.json({ hata: sonuc.errorMessage || "Ödeme başlatılamadı." }, { status: 500 });
  }

  return NextResponse.json({
    basarili: true,
    paymentPageUrl: sonuc.paymentPageUrl,
    token: sonuc.token,
  });
}
