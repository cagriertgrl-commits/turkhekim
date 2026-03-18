import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const formData = await request.formData();
  const dosya = formData.get("foto");

  if (!dosya || typeof dosya === "string") {
    return NextResponse.json({ hata: "Dosya bulunamadı." }, { status: 400 });
  }

  if (dosya.size > 2 * 1024 * 1024) {
    return NextResponse.json({ hata: "Dosya 2MB'dan büyük olamaz." }, { status: 400 });
  }

  const uzanti = dosya.name.split(".").pop();
  const izinliUzantilar = ["jpg", "jpeg", "png", "webp"];
  if (!izinliUzantilar.includes(uzanti.toLowerCase())) {
    return NextResponse.json({ hata: "Sadece JPG, PNG veya WEBP yüklenebilir." }, { status: 400 });
  }

  const dosyaAdi = `doktor-${session.user.id}-${Date.now()}.${uzanti}`;

  const blob = await put(dosyaAdi, dosya, {
    access: "public",
    addRandomSuffix: false,
  });

  await sql`
    UPDATE doktorlar SET foto_url = ${blob.url} WHERE id = ${session.user.id}
  `;

  return NextResponse.redirect(new URL("/panel", request.url));
}
