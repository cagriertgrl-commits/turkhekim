import { Anthropic } from "@anthropic-ai/sdk";
import sharp from "sharp";
import { put } from "@vercel/blob";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

const client = new Anthropic();

// Felsefi/Edebiyat konuları
const KONULAR = [
  "Machiavelli'nin iktidar ve insan doğası üzerine düşünceleri",
  "Plato'nun ideaların dünyası ve gerçeklik üzerine diyalogları",
  "Nietzsche'nin güç iradesi ve ahlak aşımı",
  "Schopenhauer'ın acı, arzu ve tasavvuf",
  "Dostoyevski'nin insan psikolojisi ve ruh",
  "Kafka'nın çaresizlik ve bürokratik kaosu",
  "Sartre'ın özgürlük ve varoluş",
  "Camus'ün saçılık ve absürt",
  "Rumi'nin aşk, keşif ve bedenin ötesi",
  "Hafız'ın kutsal neşe ve ilahi şarap",
  "Marcus Aurelius'ün stoik bilgelik ve kendini yönetim",
  "Montaigne'nin şüphecilik ve benlik",
  "Spinoza'nın Tanrı, doğa ve sevinç",
  "Foucault'un iktidar, bilgi ve cinsellik",
  "Derrida'nın ayrıştırma ve metin",
  "Deleuze'ün oluş, çokluk ve eğrelti otu",
  "Baudrillard'ın simülakr ve hiper-gerçeklik",
  "Borges'in kütüphane, zaman ve sonsuzluk",
  "Calvino'nun şehirler, göz ve hafıza",
  "Kundera'nın hafiflik, ağırlık ve anlamın arayışı",
];

async function uretCaption(konu) {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 280,
    messages: [
      {
        role: "user",
        content: `İnsan doğası, felsefe ve edebiyat üzerine kısa, öğretici ve ilham verici bir Instagram caption yaz.

Tema: ${konu}

Gereksinimler:
- 250 karakterden az, Instagram'a uygun
- Hashtag ekle (#filosofi #edebiyat #motivasyon vb.)
- Türkçe, şiirsel ama anlaşılır
- Okuyucuyu düşünmeye ve sorgulamaya teşvik et
- Çok hommer olmadan derinlik katkısı yap

Sadece caption'ı yaz, başka açıklama yapma.`,
      },
    ],
  });

  return response.content[0].text;
}

async function uyguGorelOlustur(caption) {
  const width = 1080;
  const height = 1080;

  // Gradyan arka plan (derin mor-lacivert)
  const svgBg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2c1b47;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a0f2e;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>

      <!-- Dekoratif elementler -->
      <circle cx="100" cy="100" r="80" fill="none" stroke="#a78bfa" stroke-width="2" opacity="0.3"/>
      <circle cx="950" cy="950" r="120" fill="none" stroke="#a78bfa" stroke-width="2" opacity="0.3"/>

      <!-- Ana metin -->
      <text x="540" y="400" font-size="32" font-weight="bold" fill="#f3e8ff" text-anchor="middle" font-family="Arial, sans-serif" dominant-baseline="middle">
        Felsefe & Edebiyat
      </text>

      <!-- Caption (multi-line) -->
      <foreignObject x="60" y="500" width="960" height="400">
        <div style="color:#e9d5ff;font-size:18px;line-height:1.6;text-align:center;word-wrap:break-word;padding:20px;font-family:Arial,sans-serif;">
          ${caption.substring(0, 200)}...
        </div>
      </foreignObject>

      <!-- Footer -->
      <text x="540" y="950" font-size="14" fill="#a78bfa" text-anchor="middle" font-family="Arial, sans-serif">
        @doktorpusula • Düşün, Sor, Keşfet
      </text>
    </svg>
  `;

  const gorsel = await sharp(Buffer.from(svgBg))
    .png()
    .toBuffer();

  return gorsel;
}

export async function POST(req) {
  // Cron secret kontrol
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Rastgele konu seç
    const konu = KONULAR[Math.floor(Math.random() * KONULAR.length)];

    // Caption üret
    const caption = await uretCaption(konu);

    // Görsel oluştur
    const gorsel = await uyguGorelOlustur(caption);

    // Görsel Blob'a yükle
    const timestamp = Date.now();
    const blobResult = await put(`instagram/${timestamp}.png`, gorsel, {
      access: "public",
    });

    // Buffer API'ye gönder
    const bufferResponse = await fetch("https://api.buffer.com/1/updates/create.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: process.env.BUFFER_API_KEY,
        channel_id: process.env.BUFFER_CHANNEL_ID,
        media: {
          photo: blobResult.url,
        },
        text: caption,
        shorten_url: false,
      }),
    });

    const bufferData = await bufferResponse.json();

    if (!bufferResponse.ok) {
      throw new Error(`Buffer API error: ${JSON.stringify(bufferData)}`);
    }

    // DB'ye kaydet
    await sql`
      INSERT INTO instagram_gonderiler (konu, caption, gorsel_url, durum, instagram_id)
      VALUES (${konu}, ${caption}, ${blobResult.url}, 'yayinlandi', ${bufferData.buffer_id})
    `;

    return NextResponse.json({
      success: true,
      konu,
      caption: caption.substring(0, 100),
      bufferId: bufferData.buffer_id,
    });
  } catch (err) {
    console.error("Instagram cron error:", err);

    return NextResponse.json(
      {
        error: "Cron failed",
        message: err.message,
      },
      { status: 500 }
    );
  }
}
