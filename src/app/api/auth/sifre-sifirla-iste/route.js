import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { mailGonder, sifreSifirlaSablon } from "@/lib/mail";
import crypto from "crypto";

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { basarili } = rateLimit(`sifre-iste-${ip}`, 3, 60);
  if (!basarili) {
    return NextResponse.json({ hata: "Çok fazla istek. 1 saat sonra tekrar deneyin." }, { status: 429 });
  }

  const { email } = await request.json().catch(() => ({}));
  if (!email) return NextResponse.json({ hata: "E-posta gerekli." }, { status: 400 });

  const [doktor] = await sql`SELECT id, ad FROM doktorlar WHERE email = ${email.toLowerCase().trim()}`;

  // Güvenlik: kayıtlı olmasa bile aynı yanıt dön
  if (!doktor) {
    return NextResponse.json({ basarili: true, mesaj: "Eğer hesabınız varsa, e-posta gönderildi." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const son = new Date(Date.now() + 60 * 60 * 1000); // 1 saat

  await sql`
    UPDATE doktorlar
    SET sifre_sifirlama_token = ${token},
        sifre_sifirlama_son = ${son}
    WHERE id = ${doktor.id}
  `;

  const link = `https://doktorpusula.com/sifre-sifirla?token=${token}`;
  const sablon = sifreSifirlaSablon(doktor.ad, link);
  await mailGonder({ to: email, ...sablon });

  return NextResponse.json({ basarili: true, mesaj: "Eğer hesabınız varsa, e-posta gönderildi." });
}
