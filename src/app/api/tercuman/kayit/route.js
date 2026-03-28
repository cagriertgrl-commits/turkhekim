import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugOlustur(ad, sehir) {
  const temizle = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
      .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slug = `${temizle(ad)}-${temizle(sehir)}-tercuman`;
  return slug || `tercuman-${Date.now()}`;
}

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`tercuman-kayit-${ip}`, RATE_LIMITS.TERCUMAN_KAYIT.limit, RATE_LIMITS.TERCUMAN_KAYIT.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla kayıt denemesi. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
    }

    const { ad, soyad, email, sifre, telefon, diller, uzmanlik_alani, sertifikalar, deneyim_yil, sehir, fiyat, hakkinda, sozlesme_onaylandi, kvkk_onaylandi } = await req.json();

    if (!ad || ad.trim().length < 2) {
      return NextResponse.json({ hata: "Ad zorunlu (en az 2 karakter)." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email || "")) {
      return NextResponse.json({ hata: "Geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }
    if (!sifre || sifre.length < 6) {
      return NextResponse.json({ hata: "Şifre en az 6 karakter olmalı." }, { status: 400 });
    }
    if (!diller || diller.trim().length < 2) {
      return NextResponse.json({ hata: "En az bir dil belirtmelisiniz." }, { status: 400 });
    }
    if (!telefon || telefon.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ hata: "Geçerli telefon numarası giriniz." }, { status: 400 });
    }
    if (!sozlesme_onaylandi || !kvkk_onaylandi) {
      return NextResponse.json({ hata: "Sözleşme ve KVKK onayı gerekli." }, { status: 400 });
    }

    const mevcutEmail = await sql`SELECT id FROM tercumanlar WHERE email = ${email.toLowerCase().trim()}`;
    if (mevcutEmail.length > 0) {
      return NextResponse.json({ hata: "Bu e-posta adresi zaten kayıtlı." }, { status: 409 });
    }

    const sifre_hash = await bcrypt.hash(sifre, 10);
    let slug = slugOlustur(ad, sehir);

    const mevcutSlug = await sql`SELECT id FROM tercumanlar WHERE slug = ${slug}`;
    if (mevcutSlug.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    await sql`
      INSERT INTO tercumanlar (slug, ad, soyad, email, sifre_hash, telefon, diller, uzmanlik_alani, sertifikalar, deneyim_yil, sehir, fiyat, hakkinda, sozlesme_onaylandi, kvkk_onaylandi)
      VALUES (
        ${slug},
        ${ad.trim()},
        ${soyad?.trim() || null},
        ${email.toLowerCase().trim()},
        ${sifre_hash},
        ${telefon.trim()},
        ${diller.trim()},
        ${uzmanlik_alani?.trim() || null},
        ${sertifikalar?.trim() || null},
        ${parseInt(deneyim_yil) || 0},
        ${sehir?.trim() || null},
        ${fiyat?.trim() || null},
        ${hakkinda?.trim() || null},
        ${sozlesme_onaylandi},
        ${kvkk_onaylandi}
      )
    `;

    return NextResponse.json({ basarili: true, mesaj: "Kayıt başarılı! Hesabınız incelendikten sonra aktif edilecektir." });
  } catch (err) {
    console.error("Tercüman kayıt hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
