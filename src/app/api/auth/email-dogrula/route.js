import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { token } = await request.json().catch(() => ({}));
  if (!token) return NextResponse.json({ hata: "Token gerekli." }, { status: 400 });

  const [doktor] = await sql`SELECT id FROM doktorlar WHERE email_dogrulama_token = ${token}`;
  if (!doktor) return NextResponse.json({ hata: "Geçersiz veya süresi dolmuş bağlantı." }, { status: 400 });

  await sql`
    UPDATE doktorlar
    SET email_dogrulandi = true,
        email_dogrulama_token = NULL
    WHERE id = ${doktor.id}
  `;

  return NextResponse.json({ basarili: true, mesaj: "E-postanız doğrulandı." });
}
