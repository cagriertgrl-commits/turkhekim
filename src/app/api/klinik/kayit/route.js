import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { headers } from "next/headers";

function slugOlustur(ad, sehir) {
  const t = (s) => (s || "").toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
    .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${t(ad)}-${t(sehir)}` || `klinik-${Date.now()}`;
}

export async function POST(req) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const { basarili } = rateLimit(`klinik-kayit-${ip}`, RATE_LIMITS.FIRMA_BASVURU.limit, RATE_LIMITS.FIRMA_BASVURU.pencereDakika);
    if (!basarili) return NextResponse.json({ hata: "Çok fazla kayıt. Sonra deneyin." }, { status: 429 });

    const {
      ad, kurum_tipi, sehir, adres, telefon, email, website,
      hakkinda, calisma_saatleri, hizmetler, kvkk_onaylandi,
    } = await req.json();

    if (!ad || ad.trim().length < 3) return NextResponse.json({ hata: "Klinik adı zorunlu." }, { status: 400 });
    if (!kurum_tipi) return NextResponse.json({ hata: "Kurum tipi seçiniz." }, { status: 400 });
    if (!sehir) return NextResponse.json({ hata: "Şehir zorunlu." }, { status: 400 });
    if (!email) return NextResponse.json({ hata: "İletişim e-postası zorunlu." }, { status: 400 });
    if (!telefon) return NextResponse.json({ hata: "Telefon zorunlu." }, { status: 400 });
    if (!kvkk_onaylandi) return NextResponse.json({ hata: "KVKK onayı gerekli." }, { status: 400 });

    let slug = slugOlustur(ad, sehir);
    const mevcut = await sql`SELECT id FROM klinikler WHERE slug = ${slug}`;
    if (mevcut.length > 0) slug = `${slug}-${Date.now().toString(36)}`;

    await sql`
      INSERT INTO klinikler (
        slug, ad, kurum_tipi, sehir, adres, telefon, email, website,
        hakkinda, calisma_saatleri, hizmetler
      ) VALUES (
        ${slug}, ${ad.trim()}, ${kurum_tipi}, ${sehir.trim()},
        ${adres?.trim() || null}, ${telefon.trim()}, ${email.toLowerCase().trim()},
        ${website?.trim() || null}, ${hakkinda?.trim() || null},
        ${calisma_saatleri?.trim() || null}, ${hizmetler?.trim() || null}
      )
    `;

    return NextResponse.json({
      basarili: true,
      mesaj: "Klinik başvurunuz alındı. Faaliyet belgesi onayı sonrası yayına çıkacak.",
    });
  } catch (err) {
    console.error("Klinik kayıt hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
