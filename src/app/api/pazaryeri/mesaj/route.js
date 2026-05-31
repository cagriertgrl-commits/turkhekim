import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { getFirmaSession } from "@/lib/firmaSession";

function konusmaId(firma_id, doktor_id) {
  return `f${firma_id}-d${doktor_id}`;
}

async function oturumKim() {
  const f = await getFirmaSession();
  if (f?.id) return { tip: "firma", id: f.id };
  const d = await getSession();
  if (d?.id) return { tip: "doktor", id: d.id };
  return null;
}

export async function POST(req) {
  const ben = await oturumKim();
  if (!ben) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  try {
    const { alici_tip, alici_id, mesaj, referans_ilan_id, referans_talep_id } = await req.json();

    if (!alici_tip || !["firma", "doktor"].includes(alici_tip)) {
      return NextResponse.json({ hata: "Geçersiz alıcı tipi." }, { status: 400 });
    }
    if (!alici_id || alici_tip === ben.tip) {
      return NextResponse.json({ hata: "Alıcı kendinizden farklı bir taraf olmalı." }, { status: 400 });
    }
    if (!mesaj || mesaj.trim().length < 2) {
      return NextResponse.json({ hata: "Mesaj boş olamaz." }, { status: 400 });
    }
    if (mesaj.length > 4000) {
      return NextResponse.json({ hata: "Mesaj çok uzun (max 4000)." }, { status: 400 });
    }

    const firma_id = ben.tip === "firma" ? ben.id : parseInt(alici_id);
    const doktor_id = ben.tip === "doktor" ? ben.id : parseInt(alici_id);

    const kid = konusmaId(firma_id, doktor_id);

    const [yeni] = await sql`
      INSERT INTO firma_doktor_mesajlari (
        konusma_id, gonderen_tip, gonderen_id, alici_tip, alici_id, mesaj,
        referans_ilan_id, referans_talep_id
      ) VALUES (
        ${kid},
        ${ben.tip},
        ${ben.id},
        ${alici_tip},
        ${parseInt(alici_id)},
        ${mesaj.trim()},
        ${referans_ilan_id ? parseInt(referans_ilan_id) : null},
        ${referans_talep_id ? parseInt(referans_talep_id) : null}
      )
      RETURNING id, konusma_id, created_at
    `;

    return NextResponse.json({ basarili: true, mesaj: yeni });
  } catch (err) {
    console.error("Pazaryeri mesaj hatası:", err);
    return NextResponse.json({ hata: "Sunucu hatası." }, { status: 500 });
  }
}

export async function GET(req) {
  const ben = await oturumKim();
  if (!ben) return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const konusma_id = searchParams.get("konusma_id");

  if (!konusma_id) {
    const konusmalar = ben.tip === "firma"
      ? await sql`
          SELECT konusma_id,
                 MAX(created_at) AS son_mesaj_tarihi,
                 COUNT(*) FILTER (WHERE okundu = false AND alici_tip = 'firma' AND alici_id = ${ben.id}) AS okunmamis,
                 (ARRAY_AGG(mesaj ORDER BY created_at DESC))[1] AS son_mesaj,
                 MAX(CASE WHEN gonderen_tip = 'doktor' THEN gonderen_id ELSE alici_id END) AS karsi_taraf_id
          FROM firma_doktor_mesajlari
          WHERE (gonderen_tip = 'firma' AND gonderen_id = ${ben.id})
             OR (alici_tip = 'firma' AND alici_id = ${ben.id})
          GROUP BY konusma_id
          ORDER BY son_mesaj_tarihi DESC LIMIT 50
        `
      : await sql`
          SELECT konusma_id,
                 MAX(created_at) AS son_mesaj_tarihi,
                 COUNT(*) FILTER (WHERE okundu = false AND alici_tip = 'doktor' AND alici_id = ${ben.id}) AS okunmamis,
                 (ARRAY_AGG(mesaj ORDER BY created_at DESC))[1] AS son_mesaj,
                 MAX(CASE WHEN gonderen_tip = 'firma' THEN gonderen_id ELSE alici_id END) AS karsi_taraf_id
          FROM firma_doktor_mesajlari
          WHERE (gonderen_tip = 'doktor' AND gonderen_id = ${ben.id})
             OR (alici_tip = 'doktor' AND alici_id = ${ben.id})
          GROUP BY konusma_id
          ORDER BY son_mesaj_tarihi DESC LIMIT 50
        `;

    const karsiTipFirma = ben.tip === "doktor";
    const karsiIds = konusmalar.map(k => k.karsi_taraf_id).filter(Boolean);
    let karsiBilgi = [];
    if (karsiIds.length > 0) {
      karsiBilgi = karsiTipFirma
        ? await sql`SELECT id, ad, slug, logo_url FROM firmalar WHERE id = ANY(${karsiIds})`
        : await sql`SELECT id, ad, soyad, uzmanlik, foto_url FROM doktorlar WHERE id = ANY(${karsiIds})`;
    }

    return NextResponse.json({ konusmalar, karsiTaraf: karsiBilgi, karsiTaraf_tip: karsiTipFirma ? "firma" : "doktor" });
  }

  const mesajlar = await sql`
    SELECT id, gonderen_tip, gonderen_id, alici_tip, alici_id, mesaj, okundu, created_at,
           referans_ilan_id, referans_talep_id
    FROM firma_doktor_mesajlari
    WHERE konusma_id = ${konusma_id}
      AND (
        (gonderen_tip = ${ben.tip} AND gonderen_id = ${ben.id})
        OR (alici_tip = ${ben.tip} AND alici_id = ${ben.id})
      )
    ORDER BY created_at ASC
    LIMIT 200
  `;

  try {
    await sql`
      UPDATE firma_doktor_mesajlari
      SET okundu = true
      WHERE konusma_id = ${konusma_id}
        AND alici_tip = ${ben.tip} AND alici_id = ${ben.id}
        AND okundu = false
    `;
  } catch {}

  return NextResponse.json({ mesajlar });
}
