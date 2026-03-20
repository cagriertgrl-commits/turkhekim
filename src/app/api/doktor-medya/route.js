import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doktorId = searchParams.get("doktor_id");
  if (!doktorId) return NextResponse.json({ medya: [] });
  const medya = await sql`SELECT * FROM doktor_medya WHERE doktor_id = ${doktorId} ORDER BY created_at DESC`;
  return NextResponse.json({ medya });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { tip, baslik, aciklama, url, yayin_tarihi } = await request.json();
  if (!tip || !baslik) return NextResponse.json({ hata: "Tip ve başlık zorunlu." }, { status: 400 });

  const izinliTipler = ["makale", "haber", "dergi", "kitap", "video", "sosyal"];
  if (!izinliTipler.includes(tip)) return NextResponse.json({ hata: "Geçersiz tip." }, { status: 400 });

  const sonuc = await sql`
    INSERT INTO doktor_medya (doktor_id, tip, baslik, aciklama, url, yayin_tarihi)
    VALUES (${session.user.id}, ${tip}, ${baslik}, ${aciklama || null}, ${url || null}, ${yayin_tarihi || null})
    RETURNING *
  `;
  return NextResponse.json({ medya: sonuc[0] });
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ hata: "ID gerekli." }, { status: 400 });

  await sql`DELETE FROM doktor_medya WHERE id = ${id} AND doktor_id = ${session.user.id}`;
  return NextResponse.json({ tamam: true });
}
