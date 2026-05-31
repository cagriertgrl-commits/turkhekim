import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`hukuk-bulten-${ip}`, RATE_LIMITS.HUKUK_BULTEN.limit, RATE_LIMITS.HUKUK_BULTEN.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla deneme. Birazdan tekrar deneyin." }, { status: 429 });
    }

    const { email, ad, kvkk_onaylandi } = await req.json();

    if (!EMAIL_RE.test(email || "")) {
      return NextResponse.json({ hata: "Geçerli bir e-posta giriniz." }, { status: 400 });
    }
    if (!kvkk_onaylandi) {
      return NextResponse.json({ hata: "KVKK aydınlatma metnini onaylayın." }, { status: 400 });
    }

    await sql`
      INSERT INTO hukuki_bulten_aboneleri (email, ad, kvkk_onaylandi)
      VALUES (${email.toLowerCase().trim()}, ${ad?.trim() || null}, true)
      ON CONFLICT (email) DO UPDATE SET aktif = true, kvkk_onaylandi = true
    `;

    return NextResponse.json({
      basarili: true,
      mesaj: "Bültene abone oldunuz. Mevzuat güncellemelerini e-postanıza ileteceğiz.",
    });
  } catch (err) {
    console.error("Bülten abonelik hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
