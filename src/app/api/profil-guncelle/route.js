import { getSession } from "@/lib/session";


import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession();
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
  const soyad = g("soyad");
  const online_randevu = formData.get("online_randevu") === "on";
  const medikal_turizm = formData.get("medikal_turizm") === "on";
  const medikal_turizm_komisyon = g("medikal_turizm_komisyon");
  const enlem = g("enlem");
  const boylam = g("boylam");
  const tanitim_video = g("tanitim_video");

  // Eğitim bilgileri — form alanlarından JSON oluştur
  const egitim = {
    lise: {
      okul: g("egitim_lise_okul"),
      sehir: g("egitim_lise_sehir"),
      yil: g("egitim_lise_yil"),
      goster: formData.get("egitim_lise_goster") === "on",
    },
    universite: {
      universite: g("egitim_universite_universite"),
      fakulte: g("egitim_universite_fakulte"),
      yil: g("egitim_universite_yil"),
      goster: formData.get("egitim_universite_goster") === "on",
    },
    uzmanlik: {
      kurum: g("egitim_uzmanlik_kurum"),
      dal: g("egitim_uzmanlik_dal"),
      tez: g("egitim_uzmanlik_tez"),
      yil: g("egitim_uzmanlik_yil"),
      goster: formData.get("egitim_uzmanlik_goster") === "on",
    },
    yan_dal: g("egitim_yandal_dal") ? [{
      kurum: g("egitim_yandal_kurum"),
      dal: g("egitim_yandal_dal"),
      yil: g("egitim_yandal_yil"),
      goster: formData.get("egitim_yandal_goster") === "on",
    }] : [],
  };

  if (hakkinda.length > 3000) return NextResponse.json({ hata: "Hakkında 3000 karakteri geçemez." }, { status: 400 });
  if (website && !website.startsWith("http")) return NextResponse.json({ hata: "Website http:// ile başlamalı." }, { status: 400 });

  try {
    await sql`
      UPDATE doktorlar SET
        soyad = ${soyad || ""},
        egitim = ${JSON.stringify(egitim)},
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
        online_randevu = ${online_randevu},
        medikal_turizm = ${medikal_turizm},
        medikal_turizm_komisyon = ${medikal_turizm_komisyon || null},
        enlem = ${enlem || null},
        boylam = ${boylam || null},
        tanitim_video = ${tanitim_video || null}
      WHERE id = ${session.id}
    `;
  } catch (err) {
    console.error("[profil-guncelle] DB hatası:", err.message);
    return NextResponse.json({ hata: "Kayıt sırasında hata: " + err.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/panel", request.url));
}
