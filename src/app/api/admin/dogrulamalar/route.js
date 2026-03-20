import sql from "@/lib/db";
import { NextResponse } from "next/server";

function adminKontrol(request) {
  const cookie = request.cookies.get("admin-token")?.value;
  return cookie === process.env.ADMIN_SECRET;
}

// Tüm doğrulama kayıtlarını listele (admin moderasyon için)
export async function GET(request) {
  if (!adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const durum = searchParams.get("durum") || "moderasyon_bekliyor";

  const rows = await sql`
    SELECT
      yd.id,
      yd.yorum_id,
      yd.durum,
      yd.doktor_notu,
      yd.olusturulma,
      y.yorum_metni,
      y.puan,
      y.hasta_adi,
      y.doktor_id,
      d.ad       AS doktor_ad,
      d.soyad    AS doktor_soyad,
      d.uzmanlik AS doktor_uzmanlik
    FROM yorum_dogrulama yd
    JOIN yorumlar y  ON y.id  = yd.yorum_id
    JOIN doktorlar d ON d.id  = y.doktor_id
    WHERE yd.durum = ${durum}
    ORDER BY yd.olusturulma ASC
  `;

  return NextResponse.json({ rows });
}

// Admin moderasyon kararı: yayinlandi | reddedildi
export async function PATCH(request) {
  if (!adminKontrol(request)) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  const { yorum_id, karar, moderasyon_notu } = await request.json();

  if (!["yayinlandi", "reddedildi"].includes(karar)) {
    return NextResponse.json({ hata: "Geçersiz karar." }, { status: 400 });
  }

  // Yorumu güncelle
  await sql`
    UPDATE yorumlar
    SET
      dogrulama_durumu = ${karar},
      yayinlandi       = ${karar === "yayinlandi"},
      moderasyon_notu  = ${moderasyon_notu || null}
    WHERE id = ${yorum_id}
  `;

  // Doğrulama kaydını güncelle
  await sql`
    UPDATE yorum_dogrulama
    SET durum = ${karar}
    WHERE yorum_id = ${yorum_id}
  `;

  return NextResponse.json({ mesaj: "Moderasyon kararı uygulandı." });
}
