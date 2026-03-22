import sql from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

const GECERLI_KATEGORILER = ["hakaret", "yanlis_bilgi", "spam", "gizlilik_ihlali", "diger"];

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "bilinmiyor";
    const { basarili } = rateLimit(ip, 5, 60); // saatte 5 şikayet
    if (!basarili) {
      return NextResponse.json({ hata: "Çok fazla şikayet. Lütfen bekleyin." }, { status: 429 });
    }

    const { yorum_id, kategori, aciklama } = await request.json();

    if (!yorum_id) return NextResponse.json({ hata: "Yorum ID zorunludur." }, { status: 400 });
    if (!kategori || !GECERLI_KATEGORILER.includes(kategori)) {
      return NextResponse.json({ hata: "Geçerli bir kategori seçin." }, { status: 400 });
    }
    if (!aciklama || aciklama.trim().length < 5) {
      return NextResponse.json({ hata: "Açıklama en az 5 karakter olmalıdır." }, { status: 400 });
    }

    // Yorum var mı kontrol et
    const yorum = await sql`SELECT id FROM yorumlar WHERE id = ${yorum_id} LIMIT 1`;
    if (!yorum.length) return NextResponse.json({ hata: "Yorum bulunamadı." }, { status: 404 });

    await sql`
      INSERT INTO yorum_sikayetler (yorum_id, kategori, aciklama, ip)
      VALUES (${yorum_id}, ${kategori}, ${aciklama.trim()}, ${ip})
    `;

    // Admin bildirimi
    await sql`
      INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
      VALUES ('admin', 'admin', 'sikayet', 'Yorum Şikayeti',
        ${`Yorum #${yorum_id} için "${kategori}" kategorisinde şikayet geldi.`},
        '/admin?tab=yorumlar')
    `;

    return NextResponse.json({ mesaj: "Şikayetiniz alındı." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}
