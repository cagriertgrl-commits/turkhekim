import { getSession } from "@/lib/session";
import sql from "@/lib/db";


import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { soru_id, yanit } = await request.json();

  if (!soru_id || !yanit?.trim()) {
    return NextResponse.json({ hata: "Yanıt boş olamaz." }, { status: 400 });
  }

  // Sadece kendi sorusunu yanıtlayabilir
  const result = await sql`
    UPDATE sorular
    SET yanit = ${yanit.trim()}
    WHERE id = ${soru_id} AND doktor_id = ${session.id}
    RETURNING id
  `;

  if (!result.length) {
    return NextResponse.json({ hata: "Soru bulunamadı." }, { status: 404 });
  }

  return NextResponse.json({ mesaj: "Yanıt kaydedildi." });
}
