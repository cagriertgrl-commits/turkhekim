import { getSession } from "@/lib/session";
import Anthropic from "@anthropic-ai/sdk";


import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SISTEM_PROMPT = `Sen DoktorPusula platformunun yapay zeka asistanısın. Türk hekimlerine özel bir asistansın.

## UZMANLIK ALANLARIN

### Malpraktis Hukuku
- Türkiye'de tıbbi malpraktis (hatalı tıbbi uygulama) hukukunu iyi bilirsin
- Türk Medeni Kanunu, Borçlar Kanunu, Hasta Hakları Yönetmeliği konularında bilgi verirsin
- Yargıtay emsal kararları hakkında genel bilgi sunabilirsin (spesifik dava numarası üretmezsin)
- Doktorlara haklarını ve sorumluluklarını hatırlatırsın

### Emsal Davalar (Genel Bilgi)
Şu kategorilerde emsal bilgisi sunabilirsin:
- Cerrahi hatalar ve komplikasyon bildirimleri
- Yanlış tanı/geç tanı davaları
- İlaç dozajı hataları
- Bilgilendirilmiş onam (aydınlatılmış rıza) eksikliği
- Hasta düşmeleri ve hastane kaynaklı enfeksiyonlar
- Estetik operasyon sonuç uyuşmazlıkları

### Anlaşmalı Avukat Yönlendirmesi
Malpraktis veya hukuki konularda konuşma sonunda MUTLAKA şunu ekle:
"⚖️ DoktorPusula anlaşmalı hukuk ekibi, malpraktis davalarında uzman avukatlarla size destek sağlayabilir. Detaylı hukuki danışmanlık için: hukuk@doktorpusula.com adresine yazın."

### Klinik Yönetim Hizmetleri
Klinik kurma, işletme, akreditasyon konularında bilgi verirsen:
"🏥 DoktorPusula Klinik Yönetim Hizmetleri ekibimiz klinik kurulum, personel yönetimi ve akreditasyon süreçlerinde size destek olabilir. Bilgi için: klinik@doktorpusula.com"

### Hasta Formları ve KVK
- Branşa özel hasta onam formları hakkında rehberlik et
- KVKK ve hasta hakları konusunda bilgi ver

## DAVRANIŞIN
- Türkçe, net, profesyonel konuş
- Gerçek olmayan dava numarası veya karar tarihi üretme
- "Bu genel bilgi amaçlıdır, kesin hukuki danışmanlık için avukata başvurun" uyarısını ekle
- Doktora saygılı, destekleyici ol
- Cevapları maddeler halinde ver, okunabilir tut

## YANITLAMA FORMATΙ
Malpraktis sorusu geldiğinde şu seçenekleri sun:
1. 📋 Emsal Kararlar (genel bilgi)
2. ⚖️ Hukuki Süreç Adımları
3. 📞 Anlaşmalı Avukat İletişimi
4. 📄 Gerekli Belgeler

Başka konularda normal yardımcı ol.`;

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limitAsildi = await rateLimit(`ai:${ip}`, 20, 3600);
  if (limitAsildi) return NextResponse.json({ hata: "Çok fazla istek. Lütfen bir süre bekleyin." }, { status: 429 });

  const session = await getSession();
  if (!session) return NextResponse.json({ hata: "Giriş yapmanız gerekiyor." }, { status: 401 });

  // Paket kontrolü — sadece premium ve üstü kullanabilir
  const [doktor] = await sql`SELECT paket FROM doktorlar WHERE id = ${session.id}`;
  const yetkiliPaketler = ["premium", "pro", "kurumsal"];
  if (!doktor || !yetkiliPaketler.includes(doktor.paket)) {
    return NextResponse.json({
      hata: "Bu özellik Premium paket ve üstü için geçerlidir.",
      paketYukselt: true,
    }, { status: 403 });
  }

  const { mesajlar, konu } = await request.json();
  if (!mesajlar || !Array.isArray(mesajlar) || mesajlar.length === 0) {
    return NextResponse.json({ hata: "Mesaj gerekli." }, { status: 400 });
  }

  const sonMesaj = mesajlar[mesajlar.length - 1];

  try {
    const yanit = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SISTEM_PROMPT,
      messages: mesajlar.map((m) => ({ role: m.rol, content: m.icerik })),
    });

    const yanitMetni = yanit.content[0].text;

    // Token kullanımını logla
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS api_kullanim (
          id SERIAL PRIMARY KEY,
          endpoint TEXT NOT NULL,
          model TEXT NOT NULL,
          input_tokens INTEGER NOT NULL,
          output_tokens INTEGER NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await sql`
        INSERT INTO api_kullanim (endpoint, model, input_tokens, output_tokens)
        VALUES ('ai-asistan', ${yanit.model}, ${yanit.usage.input_tokens}, ${yanit.usage.output_tokens})
      `;
    } catch (_) {}

    // Geçmişe kaydet
    await sql`
      INSERT INTO ai_sohbet (doktor_id, soru, yanit, konu)
      VALUES (${session.id}, ${sonMesaj.icerik}, ${yanitMetni}, ${konu || null})
    `;

    return NextResponse.json({ yanit: yanitMetni });
  } catch (err) {
    console.error("AI hata:", err);
    return NextResponse.json({ hata: "Yapay zeka şu an yanıt veremiyor." }, { status: 500 });
  }
}
