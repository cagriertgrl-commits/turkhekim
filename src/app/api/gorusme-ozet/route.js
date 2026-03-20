import Anthropic from "@anthropic-ai/sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sql from "@/lib/db";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function tabloOlustur() {
  await sql`
    CREATE TABLE IF NOT EXISTS gorusme_ozetleri (
      id SERIAL PRIMARY KEY,
      doktor_id INTEGER NOT NULL,
      hasta_adi TEXT,
      transkript TEXT NOT NULL,
      ozet TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

const SISTEM_PROMPT = `Sen bir tıbbi not asistanısın. Sana bir doktor-hasta görüşmesinin ham transkriptini vereceğim.

Transkripti analiz edip aşağıdaki formatta yapılandırılmış bir özet çıkar:

📋 GENEL ÖZET
[2-3 cümle ile görüşmenin kısa özeti]

🔴 ŞİKAYETLER
[Hastanın belirttiği semptomlar ve sorunlar - madde madde]

💊 HASTA TALEPLERİ
[Hastanın istediği şeyler: ilaç, tahlil, sevk vb. - madde madde]

⚠️ DİKKAT EDİLMESİ GEREKENLER
[Kritik bilgiler: alerji, kronik hastalık, önemli notlar - varsa]

📝 DOKTOR NOTLARI İÇİN ÖNERİLEN BAŞLIKLAR
[Epikriz veya not için kullanılabilecek anahtar kelimeler]

Eğer transkriptte bu kategorilere uygun bilgi yoksa o başlığı atla.
Türkçe yaz. Net, kısa ve profesyonel ol. Gereksiz yorumlama yapma.`;

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ hata: "Giriş yapmanız gerekiyor." }, { status: 401 });

  const [doktor] = await sql`SELECT paket FROM doktorlar WHERE id = ${session.user.id}`;
  const yetkiliPaketler = ["pro", "kurumsal"];
  if (!doktor || !yetkiliPaketler.includes(doktor.paket)) {
    return NextResponse.json({
      hata: "Bu özellik Pro ve Kurumsal paket için geçerlidir.",
      paketYukselt: true,
    }, { status: 403 });
  }

  await tabloOlustur();

  const { transkript, hastaAdi } = await request.json();
  if (!transkript || transkript.trim().length < 20) {
    return NextResponse.json({ hata: "Transkript çok kısa veya boş." }, { status: 400 });
  }

  const icerik = hastaAdi
    ? `Hasta: ${hastaAdi}\n\nGörüşme transkripti:\n${transkript}`
    : `Görüşme transkripti:\n${transkript}`;

  try {
    const yanit = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: SISTEM_PROMPT,
      messages: [{ role: "user", content: icerik }],
    });

    const ozet = yanit.content[0].text;

    await sql`
      INSERT INTO gorusme_ozetleri (doktor_id, hasta_adi, transkript, ozet)
      VALUES (${session.user.id}, ${hastaAdi || null}, ${transkript}, ${ozet})
    `;

    return NextResponse.json({ ozet });
  } catch (err) {
    console.error("Görüşme özet hatası:", err);
    return NextResponse.json({ hata: "Özet oluşturulamadı, tekrar deneyin." }, { status: 500 });
  }
}
