import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { ADMIN_OTURUM_SURESI } from "@/lib/constants";

const COOKIE_ADI = "admin-token";
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }

  const { sifre } = body;

  if (!sifre || typeof sifre !== "string") {
    return NextResponse.json({ hata: "Şifre zorunludur." }, { status: 400 });
  }

  if (sifre !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ hata: "Hatalı şifre." }, { status: 401 });
  }

  const token = await new SignJWT({ rol: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_OTURUM_SURESI}s`)
    .sign(secret);

  const response = NextResponse.json({ mesaj: "Giriş başarılı." });
  response.cookies.set(COOKIE_ADI, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ADMIN_OTURUM_SURESI,
    path: "/",
  });

  return response;
}

