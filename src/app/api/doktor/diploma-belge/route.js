import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { base64 } = await request.json().catch(() => ({}));

  if (!base64 || !(base64.startsWith("data:image/") || base64.startsWith("data:application/pdf"))) {
    return NextResponse.json({ hata: "Geçersiz belge. PDF veya görsel yükleyin." }, { status: 400 });
  }
  if (base64.length > 1024 * 1024) {
    return NextResponse.json({ hata: "Belge çok büyük (max 750KB)." }, { status: 400 });
  }

  await sql`UPDATE doktorlar SET diploma_belge_url = ${base64}, diploma_dogrulandi = false WHERE id = ${session.id}`;

  return NextResponse.json({ basarili: true, mesaj: "Belge yüklendi. Admin onayı bekleniyor." });
}
