import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const [
    doktor, doktorOnayBekleyen, hasta, randevu, randevuBugun,
    yorum, yorumBekleyen, tercuman, tercumanOnayBekleyen,
    firma, firmaOnayBekleyen, avukat, avukatOnayBekleyen,
    klinik, klinikOnayBekleyen, ilan, malzeme, hukukiTalep,
    smsKuyruk, smsBekleyen, bulten, hataLogu, makale
  ] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM doktorlar`,
    sql`SELECT COUNT(*)::int AS n FROM doktorlar WHERE onaylandi = false`,
    sql`SELECT COUNT(*)::int AS n FROM hasta_profilleri`,
    sql`SELECT COUNT(*)::int AS n FROM randevular`,
    sql`SELECT COUNT(*)::int AS n FROM randevular WHERE tarih::text = CURRENT_DATE::text`,
    sql`SELECT COUNT(*)::int AS n FROM yorumlar`,
    sql`SELECT COUNT(*)::int AS n FROM yorumlar WHERE yayinlandi = false`,
    sql`SELECT COUNT(*)::int AS n FROM tercumanlar`,
    sql`SELECT COUNT(*)::int AS n FROM tercumanlar WHERE aktif = false`,
    sql`SELECT COUNT(*)::int AS n FROM firmalar`,
    sql`SELECT COUNT(*)::int AS n FROM firmalar WHERE aktif = false`,
    sql`SELECT COUNT(*)::int AS n FROM avukatlar`,
    sql`SELECT COUNT(*)::int AS n FROM avukatlar WHERE aktif = false`,
    sql`SELECT COUNT(*)::int AS n FROM klinikler`,
    sql`SELECT COUNT(*)::int AS n FROM klinikler WHERE onaylandi = false`,
    sql`SELECT COUNT(*)::int AS n FROM firma_ilanlar WHERE aktif = true`,
    sql`SELECT COUNT(*)::int AS n FROM malzeme_talepleri WHERE durum = 'acik'`,
    sql`SELECT COUNT(*)::int AS n FROM hukuki_danismanlik_talepleri WHERE durum = 'acik'`,
    sql`SELECT COUNT(*)::int AS n FROM sms_kuyrugu`,
    sql`SELECT COUNT(*)::int AS n FROM sms_kuyrugu WHERE gonderildi = false`,
    sql`SELECT COUNT(*)::int AS n FROM hukuki_bulten_aboneleri WHERE aktif = true`,
    sql`SELECT COUNT(*)::int AS n FROM hata_logu WHERE created_at > NOW() - INTERVAL '7 days'`,
    sql`SELECT COUNT(*)::int AS n FROM hukuki_makaleler WHERE yayinda = true`,
  ]);

  const sonGelirler = await sql`
    SELECT COALESCE(SUM(tutar), 0)::float AS toplam, COUNT(*)::int AS sayi
    FROM odemeler WHERE durum = 'basarili' AND created_at > NOW() - INTERVAL '30 days'
  `;

  const apiToken = await sql`
    SELECT COALESCE(SUM(input_tokens + output_tokens), 0)::int AS toplam,
           COUNT(*)::int AS cagri
    FROM api_kullanim WHERE created_at > NOW() - INTERVAL '30 days'
  `;

  return NextResponse.json({
    doktor: { toplam: doktor[0].n, onayBekleyen: doktorOnayBekleyen[0].n },
    hasta: { toplam: hasta[0].n },
    randevu: { toplam: randevu[0].n, bugun: randevuBugun[0].n },
    yorum: { toplam: yorum[0].n, moderasyonBekleyen: yorumBekleyen[0].n },
    tercuman: { toplam: tercuman[0].n, onayBekleyen: tercumanOnayBekleyen[0].n },
    firma: { toplam: firma[0].n, onayBekleyen: firmaOnayBekleyen[0].n },
    avukat: { toplam: avukat[0].n, onayBekleyen: avukatOnayBekleyen[0].n },
    klinik: { toplam: klinik[0].n, onayBekleyen: klinikOnayBekleyen[0].n },
    pazaryeri: { aktifIlan: ilan[0].n, acikRfq: malzeme[0].n },
    hukuk: { acikTalep: hukukiTalep[0].n, yayindaMakale: makale[0].n, bulten: bulten[0].n },
    sms: { toplam: smsKuyruk[0].n, bekleyen: smsBekleyen[0].n },
    hata: { son7Gun: hataLogu[0].n },
    gelir30g: { tutar: sonGelirler[0].toplam, sayi: sonGelirler[0].sayi },
    apiKullanim30g: { token: apiToken[0].toplam, cagri: apiToken[0].cagri },
  });
}
