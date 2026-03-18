import { NextResponse } from "next/server";

export async function POST(request) {
  const { sifre } = await request.json();

  if (sifre !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ hata: "Hatalı şifre." }, { status: 401 });
  }

  const response = NextResponse.json({ mesaj: "Giriş başarılı." });
  response.cookies.set("admin-token", process.env.ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 saat
    path: "/",
  });

  return response;
}
