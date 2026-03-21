import { getSession } from "@/lib/session";
import { put } from "@vercel/blob";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const formData = await request.formData();
  const dosya = formData.get("foto");

  if (!dosya || typeof dosya === "string") {
    return NextResponse.json({ hata: "Dosya bulunamadı." }, { status: 400 });
  }
  if (dosya.size > 5 * 1024 * 1024) {
    return NextResponse.json({ hata: "Dosya 5MB'dan büyük olamaz." }, { status: 400 });
  }

  const uzanti = dosya.name.split(".").pop().toLowerCase();
  if (!["jpg", "jpeg", "png", "webp"].includes(uzanti)) {
    return NextResponse.json({ hata: "Sadece JPG, PNG veya WEBP yüklenebilir." }, { status: 400 });
  }

  const dosyaAdi = `doktor-arkaplan-${session.id}-${Date.now()}.${uzanti}`;
  const blob = await put(dosyaAdi, dosya, { access: "public", addRandomSuffix: false });

  // Ensure column exists before update
  try { await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS arka_plan_foto_url TEXT`; } catch (_) {}
  await sql`UPDATE doktorlar SET arka_plan_foto_url = ${blob.url} WHERE id = ${session.id}`;

  return NextResponse.json({ tamam: true, url: blob.url });
}
