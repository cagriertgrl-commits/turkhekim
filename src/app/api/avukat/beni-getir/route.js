import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getAvukatSession } from "@/lib/avukatSession";

export async function GET() {
  const session = await getAvukatSession();
  if (!session) {
    return NextResponse.json({ hata: "Oturum bulunamadı." }, { status: 401 });
  }

  const [avukat] = await sql`
    SELECT id, slug, ad, soyad, email, telefon, baro_sicil_no, baro_sehir,
           uzmanlik_alanlari, deneyim_yil, sehir, hakkinda, saatlik_ucret,
           foto_url, aktif, onaylandi, created_at
    FROM avukatlar
    WHERE id = ${session.id}
  `;

  if (!avukat) {
    return NextResponse.json({ hata: "Avukat bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ avukat });
}
