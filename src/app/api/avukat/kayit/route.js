import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugOlustur(ad, soyad, sehir) {
  const temizle = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
      .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slug = `av-${temizle(ad)}-${temizle(soyad)}-${temizle(sehir)}`;
  return slug || `avukat-${Date.now()}`;
}

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`avukat-kayit-${ip}`, RATE_LIMITS.AVUKAT_KAYIT.limit, RATE_LIMITS.AVUKAT_KAYIT.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla kayıt denemesi. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
    }

    const {
      ad, soyad, email, sifre, telefon, baro_sicil_no, baro_sehir,
      uzmanlik_alanlari, deneyim_yil, sehir, hakkinda, saatlik_ucret,
      sozlesme_onaylandi, kvkk_onaylandi,
    } = await req.json();

    if (!ad || ad.trim().length < 2) {
      return NextResponse.json({ hata: "Ad zorunlu (en az 2 karakter)." }, { status: 400 });
    }
    if (!soyad || soyad.trim().length < 2) {
      return NextResponse.json({ hata: "Soyad zorunlu." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email || "")) {
      return NextResponse.json({ hata: "Geçerli bir e-posta giriniz." }, { status: 400 });
    }
    if (!sifre || sifre.length < 8) {
      return NextResponse.json({ hata: "Şifre en az 8 karakter olmalı." }, { status: 400 });
    }
    if (!baro_sicil_no || baro_sicil_no.trim().length < 3) {
      return NextResponse.json({ hata: "Baro sicil numarası zorunludur." }, { status: 400 });
    }
    if (!telefon || telefon.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ hata: "Geçerli telefon numarası giriniz." }, { status: 400 });
    }
    if (!uzmanlik_alanlari || uzmanlik_alanlari.trim().length < 2) {
      return NextResponse.json({ hata: "En az bir uzmanlık alanı seçin." }, { status: 400 });
    }
    if (!sozlesme_onaylandi || !kvkk_onaylandi) {
      return NextResponse.json({ hata: "Sözleşme ve KVKK onayı gerekli." }, { status: 400 });
    }

    const mevcutEmail = await sql`SELECT id FROM avukatlar WHERE email = ${email.toLowerCase().trim()}`;
    if (mevcutEmail.length > 0) {
      return NextResponse.json({ hata: "Bu e-posta zaten kayıtlı." }, { status: 409 });
    }

    const sifre_hash = await bcrypt.hash(sifre, 10);
    let slug = slugOlustur(ad, soyad, sehir);

    const mevcutSlug = await sql`SELECT id FROM avukatlar WHERE slug = ${slug}`;
    if (mevcutSlug.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    await sql`
      INSERT INTO avukatlar (
        slug, ad, soyad, email, sifre_hash, telefon, baro_sicil_no, baro_sehir,
        uzmanlik_alanlari, deneyim_yil, sehir, hakkinda, saatlik_ucret,
        sozlesme_onaylandi, kvkk_onaylandi
      )
      VALUES (
        ${slug},
        ${ad.trim()},
        ${soyad.trim()},
        ${email.toLowerCase().trim()},
        ${sifre_hash},
        ${telefon.trim()},
        ${baro_sicil_no.trim()},
        ${baro_sehir?.trim() || null},
        ${uzmanlik_alanlari.trim()},
        ${parseInt(deneyim_yil) || 0},
        ${sehir?.trim() || null},
        ${hakkinda?.trim() || null},
        ${parseFloat(saatlik_ucret) || null},
        ${sozlesme_onaylandi},
        ${kvkk_onaylandi}
      )
    `;

    return NextResponse.json({
      basarili: true,
      mesaj: "Kayıt başarılı! Baro sicil numaranızın doğrulanmasının ardından hesabınız aktif edilecektir.",
    });
  } catch (err) {
    console.error("Avukat kayıt hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
