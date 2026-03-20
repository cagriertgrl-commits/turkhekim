import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const formData = await request.formData();
  const g = (k) => formData.get(k)?.toString().trim() || "";

  const hakkinda = g("hakkinda");
  const fiyat = g("fiyat");
  const sigorta = g("sigorta");
  const adres = g("adres");
  const adres_tipi = g("adres_tipi") || "muayenehane";
  const website = g("website");
  const diller = g("diller");
  const hizmetler = g("hizmetler");
  const whatsapp = g("whatsapp");
  const unvan = g("unvan");
  const klinik_adi = g("klinik_adi");
  const calisan_sayisi = parseInt(g("calisan_sayisi")) || null;
  const calisma_saatleri = g("calisma_saatleri");
  const online_randevu = formData.get("online_randevu") === "on";

  if (hakkinda.length > 3000) return NextResponse.json({ hata: "Hakkında 3000 karakteri geçemez." }, { status: 400 });
  if (website && !website.startsWith("http")) return NextResponse.json({ hata: "Website http:// ile başlamalı." }, { status: 400 });

  await sql`
    UPDATE doktorlar SET
      hakkinda = ${hakkinda},
      fiyat = ${fiyat},
      sigorta = ${sigorta},
      adres = ${adres},
      adres_tipi = ${adres_tipi},
      website = ${website || null},
      diller = ${diller || null},
      hizmetler = ${hizmetler || null},
      whatsapp = ${whatsapp || null},
      unvan = ${unvan || null},
      klinik_adi = ${klinik_adi || null},
      calisan_sayisi = ${calisan_sayisi},
      calisma_saatleri = ${calisma_saatleri || null},
      online_randevu = ${online_randevu}
    WHERE id = ${session.user.id}
  `;

  return NextResponse.redirect(new URL("/panel", request.url));
}
