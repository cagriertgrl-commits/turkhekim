import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import { firmaSessionOlustur, FIRMA_COOKIE } from "@/lib/firmaSession";

export async function POST(req) {
  try {
    const { email, sifre } = await req.json();

    if (!email || !sifre) {
      return NextResponse.json({ hata: "E-posta ve şifre gerekli." }, { status: 400 });
    }

    const [firma] = await sql`
      SELECT id, slug, ad, email, sifre_hash, tip, aktif
      FROM firmalar
      WHERE email = ${email.toLowerCase().trim()}
    `;

    if (!firma) {
      return NextResponse.json({ hata: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    if (!firma.aktif) {
      return NextResponse.json({ hata: "Hesabınız henüz onaylanmamış. Ekibimiz en kısa sürede sizi bilgilendirecek." }, { status: 403 });
    }

    const eslesme = await bcrypt.compare(sifre, firma.sifre_hash);
    if (!eslesme) {
      return NextResponse.json({ hata: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const token = await firmaSessionOlustur(firma);

    const res = NextResponse.json({ basarili: true, slug: firma.slug });
    res.cookies.set(FIRMA_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Firma giriş hatası:", err);
    return NextResponse.json({ hata: "Bir hata oluştu." }, { status: 500 });
  }
}
