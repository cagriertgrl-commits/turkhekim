import { getAvukatSession } from "@/lib/avukatSession";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getAvukatSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { base64 } = await request.json().catch(() => ({}));

  if (!base64 || !base64.startsWith("data:image/")) {
    return NextResponse.json({ hata: "Geçersiz fotoğraf verisi." }, { status: 400 });
  }
  if (base64.length > 400 * 1024) {
    return NextResponse.json({ hata: "Fotoğraf çok büyük (max ~300KB)." }, { status: 400 });
  }

  await sql`UPDATE avukatlar SET foto_url = ${base64}, updated_at = NOW() WHERE id = ${session.id}`;
  return NextResponse.json({ tamam: true, url: base64 });
}
