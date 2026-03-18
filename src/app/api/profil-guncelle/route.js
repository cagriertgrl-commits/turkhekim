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
  const hakkinda = formData.get("hakkinda")?.toString().trim() || "";
  const fiyat = formData.get("fiyat")?.toString().trim() || "";

  if (hakkinda.length > 2000) {
    return NextResponse.json({ hata: "Hakkında 2000 karakteri geçemez." }, { status: 400 });
  }

  await sql`
    UPDATE doktorlar
    SET hakkinda = ${hakkinda}, fiyat = ${fiyat}
    WHERE id = ${session.user.id}
  `;

  return NextResponse.redirect(new URL("/panel", request.url));
}
