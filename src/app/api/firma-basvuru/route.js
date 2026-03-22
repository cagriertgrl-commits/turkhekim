import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

const FIRMA_TIPLERI = ["ilac", "tibbi_cihaz", "saglik_hizmeti", "sigorta", "diger"];
const PAKETLER = ["baslangic", "standart", "premium"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`firma-basvuru-${ip}`, 3, 3600); // saatte 3
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla başvuru. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
    }

    const { firmaAdi, yetkiliAdi, email, telefon, firmaType, paket, notlar } = await request.json();

    if (!firmaAdi || firmaAdi.trim().length < 2) {
      return NextResponse.json({ hata: "Firma adı zorunlu" }, { status: 400 });
    }
    if (!yetkiliAdi || yetkiliAdi.trim().length < 2) {
      return NextResponse.json({ hata: "Yetkili adı zorunlu" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email || "")) {
      return NextResponse.json({ hata: "Geçerli e-posta giriniz" }, { status: 400 });
    }
    if (!telefon || telefon.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ hata: "Geçerli telefon giriniz" }, { status: 400 });
    }
    if (!FIRMA_TIPLERI.includes(firmaType)) {
      return NextResponse.json({ hata: "Geçerli firma tipi seçiniz" }, { status: 400 });
    }

    const seciliPaket = PAKETLER.includes(paket) ? paket : "standart";

    await sql`
      INSERT INTO firma_basvurular (firma_adi, yetkili_adi, email, telefon, firma_tipi, paket, notlar, ip)
      VALUES (
        ${firmaAdi.trim()},
        ${yetkiliAdi.trim()},
        ${email.trim().toLowerCase()},
        ${telefon.trim()},
        ${firmaType},
        ${seciliPaket},
        ${notlar?.trim() || null},
        ${ip}
      )
    `;

    return NextResponse.json({ basari: true });
  } catch (err) {
    console.error("Firma başvuru hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası" }, { status: 500 });
  }
}
