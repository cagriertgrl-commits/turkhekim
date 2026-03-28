import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { tercumanSessionOlustur, TERCUMAN_COOKIE } from "@/lib/tercumanSession";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`tercuman-giris-${ip}`, RATE_LIMITS.TERCUMAN_GIRIS.limit, RATE_LIMITS.TERCUMAN_GIRIS.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin." }, { status: 429 });
    }

    const { email, sifre } = await req.json();

    if (!email || !sifre) {
      return NextResponse.json({ hata: "E-posta ve şifre gerekli." }, { status: 400 });
    }

    const [tercuman] = await sql`
      SELECT id, slug, ad, email, sifre_hash, aktif
      FROM tercumanlar
      WHERE email = ${email.toLowerCase().trim()}
    `;

    if (!tercuman) {
      return NextResponse.json({ hata: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    if (!tercuman.aktif) {
      return NextResponse.json({ hata: "Hesabınız henüz onaylanmamış. Ekibimiz en kısa sürede sizi bilgilendirecek." }, { status: 403 });
    }

    const eslesme = await bcrypt.compare(sifre, tercuman.sifre_hash);
    if (!eslesme) {
      return NextResponse.json({ hata: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const token = await tercumanSessionOlustur(tercuman);

    const res = NextResponse.json({ basarili: true, slug: tercuman.slug });
    res.cookies.set(TERCUMAN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Tercüman giriş hatası:", err);
    return NextResponse.json({ hata: "Bir hata oluştu." }, { status: 500 });
  }
}
