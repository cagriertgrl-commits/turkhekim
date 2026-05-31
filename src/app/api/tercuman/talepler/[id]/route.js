import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getTercumanSession } from "@/lib/tercumanSession";

export async function PATCH(req, { params }) {
  const session = await getTercumanSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const p = await params;
  const id = parseInt(p.id);
  if (!id) return NextResponse.json({ hata: "Geçersiz." }, { status: 400 });

  const { durum } = await req.json();
  if (!["atandi", "tamamlandi", "iptal"].includes(durum)) {
    return NextResponse.json({ hata: "Geçersiz durum." }, { status: 400 });
  }

  if (durum === "atandi") {
    const [r] = await sql`
      UPDATE tercuman_talepleri
      SET durum = 'atandi', atanan_tercuman_id = ${session.id}, updated_at = NOW()
      WHERE id = ${id} AND durum = 'acik'
      RETURNING id
    `;
    if (!r) return NextResponse.json({ hata: "Talep artık açık değil." }, { status: 409 });
  } else {
    await sql`
      UPDATE tercuman_talepleri SET durum = ${durum}, updated_at = NOW()
      WHERE id = ${id} AND atanan_tercuman_id = ${session.id}
    `;
  }

  return NextResponse.json({ basarili: true });
}
