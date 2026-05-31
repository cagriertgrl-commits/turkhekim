import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function slugOlustur(ad) {
  const temizle = (ad || "")
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return temizle || `firma-${Date.now()}`;
}

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`firma-kayit-${ip}`, RATE_LIMITS.FIRMA_BASVURU.limit, RATE_LIMITS.FIRMA_BASVURU.pencereDakika);
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla kayıt denemesi. Daha sonra tekrar deneyin." }, { status: 429 });
    }

    const {
      ad, vergi_no, ad_soyad_yetkili, email, sifre, telefon,
      kategori, sehir, adres, website, hakkinda,
      sozlesme_onaylandi, kvkk_onaylandi,
    } = await req.json();

    if (!ad || ad.trim().length < 2) {
      return NextResponse.json({ hata: "Firma adı zorunlu." }, { status: 400 });
    }
    if (!vergi_no || vergi_no.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ hata: "Geçerli vergi numarası giriniz (10-11 hane)." }, { status: 400 });
    }
    if (!ad_soyad_yetkili || ad_soyad_yetkili.trim().length < 3) {
      return NextResponse.json({ hata: "Yetkili adı soyadı zorunlu." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email || "")) {
      return NextResponse.json({ hata: "Geçerli bir e-posta giriniz." }, { status: 400 });
    }
    if (!sifre || sifre.length < 8) {
      return NextResponse.json({ hata: "Şifre en az 8 karakter olmalı." }, { status: 400 });
    }
    if (!telefon || telefon.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ hata: "Geçerli telefon numarası giriniz." }, { status: 400 });
    }
    if (!kategori) {
      return NextResponse.json({ hata: "Faaliyet kategorisi seçiniz." }, { status: 400 });
    }
    if (!sozlesme_onaylandi || !kvkk_onaylandi) {
      return NextResponse.json({ hata: "Sözleşme ve KVKK onayı gerekli." }, { status: 400 });
    }

    const mevcutEmail = await sql`SELECT id FROM firmalar WHERE email = ${email.toLowerCase().trim()}`;
    if (mevcutEmail.length > 0) {
      return NextResponse.json({ hata: "Bu e-posta zaten kayıtlı." }, { status: 409 });
    }

    const sifre_hash = await bcrypt.hash(sifre, 10);
    let slug = slugOlustur(ad);
    const mevcutSlug = await sql`SELECT id FROM firmalar WHERE slug = ${slug}`;
    if (mevcutSlug.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    await sql`
      INSERT INTO firmalar (
        slug, ad, vergi_no, ad_soyad_yetkili, email, sifre_hash, telefon,
        tip, kategori, sehir, adres, website, hakkinda,
        sozlesme_onaylandi, kvkk_onaylandi
      ) VALUES (
        ${slug},
        ${ad.trim()},
        ${vergi_no.trim()},
        ${ad_soyad_yetkili.trim()},
        ${email.toLowerCase().trim()},
        ${sifre_hash},
        ${telefon.trim()},
        ${kategori},
        ${kategori},
        ${sehir?.trim() || null},
        ${adres?.trim() || null},
        ${website?.trim() || null},
        ${hakkinda?.trim() || null},
        ${sozlesme_onaylandi},
        ${kvkk_onaylandi}
      )
    `;

    return NextResponse.json({
      basarili: true,
      mesaj: "Kayıt başarılı! Vergi levhanız ve faaliyet belgelerinizin incelenmesinin ardından hesabınız aktif edilecektir.",
    });
  } catch (err) {
    console.error("Firma kayıt hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
