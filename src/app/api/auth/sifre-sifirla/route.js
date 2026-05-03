import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { token, yeniSifre } = await request.json().catch(() => ({}));

  if (!token || !yeniSifre) {
    return NextResponse.json({ hata: "Token ve yeni şifre gerekli." }, { status: 400 });
  }
  if (yeniSifre.length < 6) {
    return NextResponse.json({ hata: "Şifre en az 6 karakter olmalı." }, { status: 400 });
  }

  const [doktor] = await sql`
    SELECT id FROM doktorlar
    WHERE sifre_sifirlama_token = ${token}
      AND sifre_sifirlama_son > NOW()
  `;

  if (!doktor) {
    return NextResponse.json({ hata: "Geçersiz veya süresi dolmuş bağlantı." }, { status: 400 });
  }

  const hash = await bcrypt.hash(yeniSifre, 12);
  await sql`
    UPDATE doktorlar
    SET sifre = ${hash},
        sifre_sifirlama_token = NULL,
        sifre_sifirlama_son = NULL
    WHERE id = ${doktor.id}
  `;

  return NextResponse.json({ basarili: true, mesaj: "Şifreniz sıfırlandı. Giriş yapabilirsiniz." });
}
