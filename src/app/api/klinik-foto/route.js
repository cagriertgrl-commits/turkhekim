import { getSession } from "@/lib/session";


import sql from "@/lib/db";
import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

// Fotoğraf yükle
export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const formData = await request.formData();
  const dosya = formData.get("foto");

  if (!dosya || dosya.size === 0) {
    return NextResponse.json({ hata: "Dosya seçilmedi." }, { status: 400 });
  }

  if (dosya.size > 5 * 1024 * 1024) {
    return NextResponse.json({ hata: "Fotoğraf 5MB'dan büyük olamaz." }, { status: 400 });
  }

  const izinliTipler = ["image/jpeg", "image/png", "image/webp"];
  if (!izinliTipler.includes(dosya.type)) {
    return NextResponse.json({ hata: "Sadece JPG, PNG veya WebP kabul edilir." }, { status: 400 });
  }

  // Mevcut fotoğraf sayısını kontrol et
  const [doktor] = await sql`
    SELECT id, klinik_foto_urls FROM doktorlar WHERE email = ${session.email}
  `;
  if (!doktor) return NextResponse.json({ hata: "Doktor bulunamadı." }, { status: 404 });

  const mevcutFotolar = doktor.klinik_foto_urls || [];
  if (mevcutFotolar.length >= 8) {
    return NextResponse.json({ hata: "En fazla 8 fotoğraf yükleyebilirsiniz." }, { status: 400 });
  }

  // Vercel Blob'a yükle
  const uzanti = dosya.name.split(".").pop();
  const dosyaAdi = `klinik/${doktor.id}/${Date.now()}.${uzanti}`;
  const blob = await put(dosyaAdi, dosya, { access: "public" });

  // DB'ye ekle
  const yeniFotolar = [...mevcutFotolar, blob.url];
  await sql`
    UPDATE doktorlar SET klinik_foto_urls = ${JSON.stringify(yeniFotolar)} WHERE id = ${doktor.id}
  `;

  return NextResponse.json({ url: blob.url, fotolar: yeniFotolar });
}

// Fotoğraf sil
export async function DELETE(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { url } = await request.json();
  if (!url) return NextResponse.json({ hata: "URL gerekli." }, { status: 400 });

  const [doktor] = await sql`
    SELECT id, klinik_foto_urls FROM doktorlar WHERE email = ${session.email}
  `;
  if (!doktor) return NextResponse.json({ hata: "Doktor bulunamadı." }, { status: 404 });

  const mevcutFotolar = doktor.klinik_foto_urls || [];
  if (!mevcutFotolar.includes(url)) {
    return NextResponse.json({ hata: "Bu fotoğraf size ait değil." }, { status: 403 });
  }

  // Blob'dan sil
  await del(url);

  // DB'den kaldır
  const yeniFotolar = mevcutFotolar.filter((u) => u !== url);
  await sql`
    UPDATE doktorlar SET klinik_foto_urls = ${JSON.stringify(yeniFotolar)} WHERE id = ${doktor.id}
  `;

  return NextResponse.json({ fotolar: yeniFotolar });
}
