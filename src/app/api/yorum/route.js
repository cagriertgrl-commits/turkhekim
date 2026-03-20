import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "bilinmiyor";
    const { basarili } = rateLimit(ip, 3, 10); // 10 dakikada 3 yorum
    if (!basarili) {
      return NextResponse.json(
        { hata: `Çok fazla istek. Lütfen 10 dakika bekleyin.` },
        { status: 429 }
      );
    }
    const body = await request.json();
    const { doktor_id, hasta_adi, puan, metin, telefon, kvkk_onaylandi } = body;

    if (!doktor_id || !hasta_adi || !puan || !metin || !telefon) {
      return NextResponse.json({ hata: "Tüm alanlar zorunludur." }, { status: 400 });
    }

    if (!kvkk_onaylandi) {
      return NextResponse.json({ hata: "KVKK onayı zorunludur." }, { status: 400 });
    }

    if (metin.length < 20) {
      return NextResponse.json({ hata: "Yorum en az 20 karakter olmalıdır." }, { status: 400 });
    }

    if (puan < 1 || puan > 5) {
      return NextResponse.json({ hata: "Puan 1-5 arasında olmalıdır." }, { status: 400 });
    }

    // Aynı telefondan aynı doktora tekrar yorum engeli
    const mevcutYorum = await sql`
      SELECT id FROM yorumlar
      WHERE doktor_id = ${doktor_id} AND telefon = ${telefon}
    `;
    if (mevcutYorum.length > 0) {
      return NextResponse.json({ hata: "Bu doktora zaten yorum bıraktınız." }, { status: 400 });
    }

    const tarih = new Date().toLocaleDateString("tr-TR", { month: "long", year: "numeric" });

    // Yorum doğrulama sistemine alınıyor — henüz yayınlanmıyor
    const yeniYorum = await sql`
      INSERT INTO yorumlar (doktor_id, hasta_adi, puan, metin, tarih, dogrulanmis, telefon, kvkk_onaylandi, dogrulama_durumu)
      VALUES (${doktor_id}, ${hasta_adi}, ${puan}, ${metin}, ${tarih}, false, ${telefon}, true, 'doktor_bekleniyor')
      RETURNING id
    `;

    const yorumId = yeniYorum[0].id;

    // Doğrulama kaydı oluştur + doktora bildirim gönder
    await sql`
      INSERT INTO yorum_dogrulama (yorum_id, doktor_id, hasta_adi, durum)
      VALUES (${yorumId}, ${doktor_id}, ${hasta_adi}, 'doktor_bekleniyor')
    `;

    await sql`
      INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
      VALUES ('doktor', ${String(doktor_id)}, 'yorum_dogrulama', 'Yeni Yorum Doğrulama Talebi',
        ${`${hasta_adi} adlı hasta size yorum yazmak istiyor. Bu kişi size muayene oldu mu?`},
        '/panel')
    `;

    return NextResponse.json({ mesaj: "Yorumunuz alındı. Doktor onayı sonrası yayınlanacak. Teşekkürler!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const doktor_id = searchParams.get("doktor_id");

  if (!doktor_id) {
    return NextResponse.json({ hata: "doktor_id gerekli." }, { status: 400 });
  }

  const yorumlar = await sql`
    SELECT * FROM yorumlar
    WHERE doktor_id = ${doktor_id}
    ORDER BY created_at DESC
  `;

  return NextResponse.json(yorumlar);
}
