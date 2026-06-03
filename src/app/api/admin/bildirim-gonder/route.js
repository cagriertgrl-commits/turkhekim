import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { adminKontrol } from "@/lib/adminAuth";

export async function POST(request) {
  if (!await adminKontrol(request)) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { hedef_tip, hedef_id_listesi, baslik, mesaj, link } = await request.json();

  if (!["doktor", "hasta", "admin", "tumu"].includes(hedef_tip)) {
    return NextResponse.json({ hata: "Geçersiz hedef." }, { status: 400 });
  }
  if (!baslik || baslik.trim().length < 3) return NextResponse.json({ hata: "Başlık zorunlu." }, { status: 400 });
  if (!mesaj || mesaj.trim().length < 5) return NextResponse.json({ hata: "Mesaj zorunlu." }, { status: 400 });

  if (hedef_tip === "tumu") {
    const doktorlar = await sql`SELECT id FROM doktorlar WHERE onaylandi = true`;
    for (const d of doktorlar) {
      await sql`
        INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
        VALUES ('doktor', ${String(d.id)}, 'admin_duyuru', ${baslik.trim()}, ${mesaj.trim()}, ${link || null})
      `;
    }
    return NextResponse.json({ basarili: true, gonderilen: doktorlar.length });
  }

  const idler = Array.isArray(hedef_id_listesi) ? hedef_id_listesi : [hedef_id_listesi];
  for (const hid of idler) {
    if (!hid) continue;
    await sql`
      INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
      VALUES (${hedef_tip}, ${String(hid)}, 'admin_duyuru', ${baslik.trim()}, ${mesaj.trim()}, ${link || null})
    `;
  }

  return NextResponse.json({ basarili: true, gonderilen: idler.length });
}
