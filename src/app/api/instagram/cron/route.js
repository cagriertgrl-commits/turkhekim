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
      <text x="540" y="300" font-size="36" font-weight="bold" fill="#f3e8ff" text-anchor="middle" font-family="Georgia, serif" dominant-baseline="middle">
        ✨ Felsefe ✨
      </text>

      <!-- Caption -->
      <foreignObject x="60" y="400" width="960" height="450">
        <div style="color:#e9d5ff;font-size:20px;line-height:1.7;text-align:center;word-wrap:break-word;padding:30px;font-family:Georgia,serif;">
          ${caption.substring(0, 280)}
        </div>
      </foreignObject>

      <!-- Footer -->
      <text x="540" y="950" font-size="14" fill="#c084fc" text-anchor="middle" font-family="Georgia, serif">
        Düşün • Sor • Keşfet
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
      contentType: "image/png",
      access: "private",
    });

    // Buffer GraphQL API'ye gönder
    const graphqlQuery = `
      mutation CreateUpdate($channelId: ID!, $text: String!, $mediaUrl: String!) {
        createUpdate(input: {
          channelId: $channelId
          content: {
            text: $text
          }
          media: {
            photo: $mediaUrl
          }
        }) {
          update {
            id
          }
        }
      }
    `;

    const bufferResponse = await fetch("https://api.buffer.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BUFFER_API_KEY}`,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: {
          channelId: process.env.BUFFER_CHANNEL_ID,
          text: caption,
          mediaUrl: blobResult.url,
        },
      }),
    });

    const bufferData = await bufferResponse.json();

    if (bufferData.errors) {
      throw new Error(`Buffer API error: ${JSON.stringify(bufferData.errors)}`);
    }

    const bufferId = bufferData.data?.createUpdate?.update?.id;

    // DB'ye kaydet
    await sql`
      INSERT INTO instagram_gonderiler (konu, caption, gorsel_url, durum, instagram_id)
      VALUES (${konu}, ${caption}, ${blobResult.url}, 'yayinlandi', ${bufferId})
    `;

    return NextResponse.json({
      success: true,
      konu,
      caption: caption.substring(0, 100),
      bufferId,
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
