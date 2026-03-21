import { getSession } from "@/lib/session";


import { compare, hash } from "bcryptjs";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { eskiSifre, yeniSifre } = await request.json();

  if (!eskiSifre || !yeniSifre) {
    return NextResponse.json({ hata: "Tüm alanlar zorunludur." }, { status: 400 });
  }

  if (yeniSifre.length < 8) {
    return NextResponse.json({ hata: "Yeni şifre en az 8 karakter olmalıdır." }, { status: 400 });
  }

  const doktorlar = await sql`SELECT sifre FROM doktorlar WHERE id = ${session.id}`;
  if (!doktorlar.length) {
    return NextResponse.json({ hata: "Kullanıcı bulunamadı." }, { status: 404 });
  }

  const eslesti = await compare(eskiSifre, doktorlar[0].sifre);
  if (!eslesti) {
    return NextResponse.json({ hata: "Mevcut şifreniz hatalı." }, { status: 400 });
  }

  const yeniHash = await hash(yeniSifre, 12);
  await sql`UPDATE doktorlar SET sifre = ${yeniHash} WHERE id = ${session.id}`;

  return NextResponse.json({ mesaj: "Şifreniz başarıyla güncellendi." });
}
