import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { base64 } = await request.json().catch(() => ({}));

  if (!base64 || !base64.startsWith("data:image/")) {
    return NextResponse.json({ hata: "Geçersiz fotoğraf verisi." }, { status: 400 });
  }
  // ~800KB base64 sınırı (arka plan için biraz daha geniş)
  if (base64.length > 900 * 1024) {
    return NextResponse.json({ hata: "Fotoğraf çok büyük, daha küçük bir dosya seçin." }, { status: 400 });
  }

  try { await sql`ALTER TABLE doktorlar ADD COLUMN IF NOT EXISTS arka_plan_foto_url TEXT`; } catch (_) {}
  await sql`UPDATE doktorlar SET arka_plan_foto_url = ${base64} WHERE id = ${session.id}`;

  return NextResponse.json({ tamam: true, url: base64 });
}
