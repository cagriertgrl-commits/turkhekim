import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { getFirmaSession } from "@/lib/firmaSession";
import { getTercumanSession } from "@/lib/tercumanSession";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

export async function POST(req) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const { basarili } = rateLimit(`tercuman-talep-${ip}`, 5, 60);
  if (!basarili) {
    return NextResponse.json({ hata: "Çok fazla talep. Saatte 5 talep gönderebilirsiniz." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { dil_kaynak, dil_hedef, tarih, sure_saat, lokasyon, hizmet_tipi, aciklama, butce, iletisim_email, iletisim_telefon } = body;

    if (!dil_kaynak || !dil_hedef) {
      return NextResponse.json({ hata: "Kaynak ve hedef dilleri seçiniz." }, { status: 400 });
    }
    if (!aciklama || aciklama.trim().length < 20) {
      return NextResponse.json({ hata: "Detaylı açıklama yazın (en az 20 karakter)." }, { status: 400 });
    }

    const doktor = await getSession();
    const firma = await getFirmaSession();
    let talep_eden_tip = "hasta";
    let talep_eden_id = null;
    let iletisim = `${iletisim_email || ""} ${iletisim_telefon || ""}`.trim();

    if (doktor?.id) { talep_eden_tip = "doktor"; talep_eden_id = doktor.id; }
    else if (firma?.id) { talep_eden_tip = "firma"; talep_eden_id = firma.id; }
    else if (!iletisim) {
      return NextResponse.json({ hata: "İletişim bilgisi (e-posta veya telefon) zorunlu." }, { status: 400 });
    }

    const [talep] = await sql`
      INSERT INTO tercuman_talepleri (
        talep_eden_tip, talep_eden_id, talep_eden_iletisim,
        dil_kaynak, dil_hedef, tarih, sure_saat, lokasyon, hizmet_tipi, aciklama, butce
      ) VALUES (
        ${talep_eden_tip},
        ${talep_eden_id},
        ${iletisim || null},
        ${dil_kaynak},
        ${dil_hedef},
        ${tarih || null},
        ${sure_saat ? parseFloat(sure_saat) : null},
        ${lokasyon?.trim() || null},
        ${hizmet_tipi || "yuz_yuze"},
        ${aciklama.trim()},
        ${butce?.trim() || null}
      ) RETURNING id, created_at
    `;

    return NextResponse.json({ basarili: true, talep, mesaj: "Talebiniz alındı. İlgili tercümanlara bildirim gönderilecek." });
  } catch (err) {
    console.error("Tercüman talep hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET(req) {
  const tercuman = await getTercumanSession();
  const { searchParams } = new URL(req.url);
  const dil = searchParams.get("dil");

  if (tercuman?.id) {
    const talepler = await sql`
      SELECT id, talep_eden_tip, talep_eden_iletisim, dil_kaynak, dil_hedef, tarih, sure_saat,
             lokasyon, hizmet_tipi, aciklama, butce, durum, atanan_tercuman_id, created_at
      FROM tercuman_talepleri
      WHERE durum = 'acik' OR atanan_tercuman_id = ${tercuman.id}
      ORDER BY created_at DESC LIMIT 60
    `;
    return NextResponse.json({ talepler });
  }

  const talepler = dil
    ? await sql`
        SELECT id, dil_kaynak, dil_hedef, tarih, sure_saat, lokasyon, hizmet_tipi, aciklama, butce, created_at
        FROM tercuman_talepleri
        WHERE durum = 'acik' AND (dil_kaynak = ${dil} OR dil_hedef = ${dil})
        ORDER BY created_at DESC LIMIT 40
      `
    : await sql`
        SELECT id, dil_kaynak, dil_hedef, tarih, sure_saat, lokasyon, hizmet_tipi, aciklama, butce, created_at
        FROM tercuman_talepleri
        WHERE durum = 'acik'
        ORDER BY created_at DESC LIMIT 40
      `;

  return NextResponse.json({ talepler });
}
