import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function GET(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const aboneler = await sql`
    SELECT id, email, ad, kvkk_onaylandi, aktif, created_at
    FROM hukuki_bulten_aboneleri ORDER BY created_at DESC
  `;

  if (format === "csv") {
    const csv = "id,email,ad,kvkk_onaylandi,aktif,created_at\n" +
      aboneler.map(a => `${a.id},${a.email},"${a.ad || ""}",${a.kvkk_onaylandi},${a.aktif},${a.created_at}`).join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bulten-aboneleri-${new Date().toISOString().slice(0,10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ aboneler });
}

export async function DELETE(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id } = await request.json();
  await sql`DELETE FROM hukuki_bulten_aboneleri WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Silindi." });
}

export async function PATCH(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  const { id, aktif } = await request.json();
  await sql`UPDATE hukuki_bulten_aboneleri SET aktif = ${aktif} WHERE id = ${id}`;
  return NextResponse.json({ mesaj: "Güncellendi." });
}
