import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { checkoutSonucDogrula } from "@/lib/iyzico";

// iyzico ödeme sonrası bizi POST ile çağırır
export async function POST(request) {
  const formData = await request.formData().catch(() => null);
  const token = formData?.get("token");

  if (!token) {
    return NextResponse.redirect("https://doktorpusula.com/odeme?durum=hata&sebep=token-yok");
  }

  const sonuc = await checkoutSonucDogrula(String(token));

  if (sonuc.status !== "success" || sonuc.paymentStatus !== "SUCCESS") {
    await sql`
      UPDATE odemeler
      SET durum = 'basarisiz',
          hata_mesaji = ${sonuc.errorMessage || sonuc.paymentStatus || "bilinmeyen hata"}
      WHERE konversasyon_id = ${sonuc.conversationId}
    `;
    return NextResponse.redirect(`https://doktorpusula.com/odeme?durum=hata&sebep=${encodeURIComponent(sonuc.errorMessage || "")}`);
  }

  // Başarılı: ödemeyi tamamla ve doktorun paketini güncelle
  const [odeme] = await sql`SELECT doktor_id, paket FROM odemeler WHERE konversasyon_id = ${sonuc.conversationId}`;

  if (odeme) {
    const [odemeKayit] = await sql`
      UPDATE odemeler
      SET durum = 'basarili',
          saglayici_odeme_id = ${sonuc.paymentId},
          odeme_tipi = ${sonuc.paymentType || null},
          kart_son_4 = ${sonuc.lastFourDigits || null},
          tamamlandi_at = NOW()
      WHERE konversasyon_id = ${sonuc.conversationId}
      RETURNING id, tutar
    `;
    await sql`UPDATE doktorlar SET paket = ${odeme.paket} WHERE id = ${odeme.doktor_id}`;

    // Fatura taslağı oluştur (KDV %20 dahil)
    const [doktor] = await sql`SELECT ad, soyad, sehir, adres FROM doktorlar WHERE id = ${odeme.doktor_id}`;
    const brut = Number(odemeKayit.tutar);
    const net = +(brut / 1.20).toFixed(2);
    const kdv = +(brut - net).toFixed(2);
    const fatNo = `DP-${new Date().getFullYear()}-${String(odemeKayit.id).padStart(6, "0")}`;

    await sql`
      INSERT INTO faturalar (odeme_id, doktor_id, fatura_no, kdv_orani, net_tutar, kdv_tutar, brut_tutar, adi_soyadi, adres, durum)
      VALUES (
        ${odemeKayit.id}, ${odeme.doktor_id}, ${fatNo}, 20, ${net}, ${kdv}, ${brut},
        ${`${doktor?.ad || ""} ${doktor?.soyad || ""}`.trim()},
        ${doktor?.adres || doktor?.sehir || "Türkiye"},
        'taslak'
      )
    `;
  }

  return NextResponse.redirect("https://doktorpusula.com/odeme?durum=basarili");
}
