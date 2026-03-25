import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { sessionOlustur, COOKIE_ADI } from "@/lib/session";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import sql from "@/lib/db";

export async function POST(request) {
  const { email, sifre, hatirla } = await request.json();
  if (!email || !sifre) return NextResponse.json({ hata: "Bilgiler eksik." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for") || "bilinmiyor";
  const { basarili } = rateLimit(`giris-${ip}`, RATE_LIMITS.GIRIS.limit, RATE_LIMITS.GIRIS.pencereDakika);
  if (!basarili) return NextResponse.json({ hata: "Çok fazla deneme. 15 dakika bekleyin." }, { status: 429 });

  const [doktor] = await sql`SELECT * FROM doktorlar WHERE email = ${email} LIMIT 1`;
  if (!doktor?.sifre) return NextResponse.json({ hata: "Email veya şifre hatalı." }, { status: 401 });

  const eslesti = await compare(sifre, doktor.sifre);
  if (!eslesti) return NextResponse.json({ hata: "Email veya şifre hatalı." }, { status: 401 });

  const { token, sure } = await sessionOlustur(doktor, hatirla);

  const response = NextResponse.json({ basarili: true, slug: doktor.slug });
  response.cookies.set(COOKIE_ADI, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: sure,
    path: "/",
  });
  return response;
}
