import { getSession } from "@/lib/session";


import sql from "@/lib/db";
import { NextResponse } from "next/server";

// Doktor: muayene onayı veya reddi
export async function POST(request) {
  const session = await getSession();
  const { yorum_id, karar, admin_token } = await request.json();

  const adminToken = process.env.ADMIN_SECRET;
  const adminMi = admin_token && adminToken && admin_token === adminToken;

  if (!session && !adminMi) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  if (!yorum_id || !karar) return NextResponse.json({ hata: "Eksik parametre." }, { status: 400 });

  const dogrulama = await sql`SELECT * FROM yorum_dogrulama WHERE yorum_id = ${yorum_id} LIMIT 1`;
  if (!dogrulama.length) return NextResponse.json({ hata: "Doğrulama kaydı bulunamadı." }, { status: 404 });

  const kayit = dogrulama[0];

  // Doktor kendi yorumuna onay/red verebilir
  if (session && kayit.doktor_id !== session.id && !adminMi) {
    return NextResponse.json({ hata: "Bu işlem için yetkiniz yok." }, { status: 403 });
  }

  if (karar === "onayla") {
    // Doktor muayene olduğunu onayladı → yorum moderasyona gider
    await sql`UPDATE yorum_dogrulama SET durum = 'moderasyon_bekliyor', guncellendi_at = NOW() WHERE yorum_id = ${yorum_id}`;

    // Admin bildirimi
    await sql`
      INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
      VALUES ('admin', 'admin', 'yorum_moderasyon', 'Yeni Yorum Moderasyon Bekliyor',
        ${`${kayit.hasta_adi} adlı hasta yorumu doktor tarafından onaylandı. Moderasyon gerekiyor.`},
        '/admin?tab=yorumlar')
    `;

  } else if (karar === "reddet") {
    // Doktor muayene olmadığını iddia ediyor → hastaya belge iste
    await sql`UPDATE yorum_dogrulama SET doktor_yaniti = 'muayene_yok', durum = 'hasta_belge_bekliyor', guncellendi_at = NOW() WHERE yorum_id = ${yorum_id}`;

    // Hastaya bildirim (telefon üzerinden — şimdilik log)
    await sql`
      INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj)
      VALUES ('admin', 'admin', 'anlaşmazlik', 'Yorum Anlaşmazlığı',
        ${`Doktor ${kayit.hasta_adi} adlı hastanın muayene olmadığını belirtti. Hasta belge göndermeli.`})
    `;

  } else if (karar === "yayinla" && adminMi) {
    // Admin yorumu yayınlıyor
    await sql`UPDATE yorumlar SET dogrulama_durumu = 'onaylandi' WHERE id = ${yorum_id}`;
    await sql`UPDATE yorum_dogrulama SET durum = 'yayinlandi', guncellendi_at = NOW() WHERE yorum_id = ${yorum_id}`;

  } else if (karar === "reddet_admin" && adminMi) {
    // Admin yorumu reddediyor (hakaret, küfür vb.)
    await sql`UPDATE yorum_dogrulama SET durum = 'reddedildi', admin_notu = ${request.body?.neden || ""}, guncellendi_at = NOW() WHERE yorum_id = ${yorum_id}`;
  }

  return NextResponse.json({ tamam: true });
}

// Yorum gönderilince çağrılır → doğrulama kaydı oluşturur
export async function PUT(request) {
  const { yorum_id, doktor_id, hasta_adi } = await request.json();
  if (!yorum_id || !doktor_id || !hasta_adi) return NextResponse.json({ hata: "Eksik parametre." }, { status: 400 });

  const mevcut = await sql`SELECT id FROM yorum_dogrulama WHERE yorum_id = ${yorum_id} LIMIT 1`;
  if (mevcut.length) return NextResponse.json({ tamam: true });

  await sql`
    INSERT INTO yorum_dogrulama (yorum_id, doktor_id, hasta_adi, durum)
    VALUES (${yorum_id}, ${doktor_id}, ${hasta_adi}, 'doktor_bekleniyor')
  `;

  // Doktora bildirim
  await sql`
    INSERT INTO bildirimler (hedef_tip, hedef_id, tip, baslik, mesaj, link)
    VALUES ('doktor', ${String(doktor_id)}, 'yorum_dogrulama', 'Yeni Yorum Doğrulama Talebi',
      ${`${hasta_adi} adlı hasta size yorum yazmak istiyor. Bu kişi size muayene oldu mu?`},
      '/panel?tab=yorumlar')
  `;

  return NextResponse.json({ tamam: true });
}
