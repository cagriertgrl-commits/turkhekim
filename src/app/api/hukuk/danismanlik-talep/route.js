import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";
import { getSession } from "@/lib/session";
import { getFirmaSession } from "@/lib/firmaSession";

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`hukuk-talep-${ip}`, RATE_LIMITS.HUKUK_TALEP.limit, RATE_LIMITS.HUKUK_TALEP.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla talep. 1 saat sonra tekrar deneyin." }, { status: 429 });
    }

    const doktorSession = await getSession();
    const firmaSession = await getFirmaSession();

    let talep_eden_tip = null;
    let talep_eden_id = null;
    if (doktorSession?.id) {
      talep_eden_tip = "doktor";
      talep_eden_id = doktorSession.id;
    } else if (firmaSession?.id) {
      talep_eden_tip = "firma";
      talep_eden_id = firmaSession.id;
    } else {
      return NextResponse.json({ hata: "Danışmanlık talebi için giriş yapmanız gerekir." }, { status: 401 });
    }

    const { konu_kategori, soru_metni, aciliyet, butce, kvkk_onaylandi } = await req.json();

    if (!konu_kategori || konu_kategori.trim().length < 2) {
      return NextResponse.json({ hata: "Konu kategorisi seçiniz." }, { status: 400 });
    }
    if (!soru_metni || soru_metni.trim().length < 30) {
      return NextResponse.json({ hata: "Sorunuzu en az 30 karakter detaylı yazın." }, { status: 400 });
    }
    if (soru_metni.length > 5000) {
      return NextResponse.json({ hata: "Soru çok uzun (en fazla 5000 karakter)." }, { status: 400 });
    }
    if (!kvkk_onaylandi) {
      return NextResponse.json({ hata: "KVKK onayı gerekli." }, { status: 400 });
    }

    const [talep] = await sql`
      INSERT INTO hukuki_danismanlik_talepleri
        (talep_eden_tip, talep_eden_id, konu_kategori, soru_metni, aciliyet, butce)
      VALUES (
        ${talep_eden_tip},
        ${talep_eden_id},
        ${konu_kategori.trim()},
        ${soru_metni.trim()},
        ${aciliyet || "normal"},
        ${butce?.trim() || null}
      )
      RETURNING id
    `;

    return NextResponse.json({
      basarili: true,
      talep_id: talep.id,
      mesaj: "Talebiniz alındı. Uzman avukatlarımız 24 saat içinde size dönüş yapacak.",
    });
  } catch (err) {
    console.error("Hukuki danışmanlık talep hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
