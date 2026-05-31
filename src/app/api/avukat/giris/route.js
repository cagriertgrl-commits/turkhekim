import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { avukatSessionOlustur, AVUKAT_COOKIE } from "@/lib/avukatSession";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`avukat-giris-${ip}`, RATE_LIMITS.AVUKAT_GIRIS.limit, RATE_LIMITS.AVUKAT_GIRIS.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin." }, { status: 429 });
    }

    const { email, sifre } = await req.json();

    if (!email || !sifre) {
      return NextResponse.json({ hata: "E-posta ve şifre gerekli." }, { status: 400 });
    }

    const [avukat] = await sql`
      SELECT id, slug, ad, soyad, email, sifre_hash, aktif
      FROM avukatlar
      WHERE email = ${email.toLowerCase().trim()}
    `;

    if (!avukat) {
      return NextResponse.json({ hata: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    if (!avukat.aktif) {
      return NextResponse.json({ hata: "Hesabınız henüz onaylanmadı. Baro sicil doğrulaması sonrası aktif edilecektir." }, { status: 403 });
    }

    const eslesme = await bcrypt.compare(sifre, avukat.sifre_hash);
    if (!eslesme) {
      return NextResponse.json({ hata: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const token = await avukatSessionOlustur(avukat);

    const res = NextResponse.json({ basarili: true, slug: avukat.slug });
    res.cookies.set(AVUKAT_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Avukat giriş hatası:", err);
    return NextResponse.json({ hata: "Bir hata oluştu." }, { status: 500 });
  }
}
