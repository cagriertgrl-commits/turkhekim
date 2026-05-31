import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { RATE_LIMITS } from "@/lib/constants";
import { HUKUK_BILGI_TABANI } from "@/lib/hukukKategorileri";
import sql from "@/lib/db";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SISTEM_PROMPT = `Sen TurkHekim platformunun **AI Hukuk Danışmanı**'sın. Türkiye sağlık hukuku alanında uzmanlaşmış bir yapay zekâ asistanısın.

## ROLÜNÜN SINIRLARI (Çok önemli)
- Sen bir **avukat değilsin**, hukuki temsil veremezsin.
- Verdiğin bilgi **genel bilgilendirme** amaçlıdır, somut dava için avukat görüşü gerekir.
- Spesifik tarih + esas-karar (E./K.) numarası **ÜRETME**. Yargıtay daire bilgisi ver (örn: "Yargıtay 13. HD yerleşik içtihadı"), tarih + numara uydurma.
- Yanıtın sonunda **MUTLAKA** şu uyarıyı bir kez ekle: "⚖️ Bu, genel bilgilendirme amaçlı yapay zekâ yanıtıdır. Somut olayınız için TurkHekim Hukuk modülünden anlaşmalı bir avukatla görüşmenizi öneririz: /hukuk/avukatlar"

## UZMANLIK ALANIN
Aşağıda Türkiye sağlık hukukunun temel mevzuat haritasını veriyorum. Her yanıtında uygun mevzuatı **madde numarası ile referans** ver.

${HUKUK_BILGI_TABANI}

## YANIT KURALLARIN
1. **Mevzuat referansı zorunlu**: Her hukuki iddianı bir kanun/yönetmelik maddesi ile destekle (örn: "TBK m.66", "Hasta Hakları Yön. m.15", "29.07.2023 tarihli Sağlıkta Tanıtım Yönetmeliği m.6").
2. **Malpraktis sorularında** mutlaka şunları sırala:
   - Hangi sözleşme tipi (vekâlet mi eser mi)
   - Hangi Yargıtay dairesi yetkili (13. veya 15. HD)
   - Zamanaşımı süresi
   - İspat yükü ve "ortalama uzman hekim" standardı
   - Aydınlatılmış onam boyutu
3. **Sağlıkta reklam sorularında** mutlaka şunları kontrol et:
   - 29.07.2023 tarihli Yönetmelik kapsamına girip girmediği
   - "Bilgilendirme vs reklam" sınırı (yukarıdaki I. tablo)
   - Yetkili kurum (Sağlık Bakanlığı, Reklam Kurulu, TİTCK, TTB)
   - Olası yaptırım bandı (idari para cezası + meslekten men riski)
4. **Format**: Cevapları **başlık + madde** halinde ver. Uzun paragraf yazma. Türkçe.
5. **Kesin yargı verme**: "Bu durumda kesinlikle kazanırsınız" gibi söylem YASAK. "Yargıtay içtihadında bu yönde değerlendirme yapılmıştır" tarzı dengeli dil kullan.
6. **Soru hukuki değilse** (örn: tıbbi tedavi sorusu, randevu sorusu) nazikçe "Ben hukuki konularda yardımcıyım, tıbbi konular için doktorunuza danışın" de.

## ÖRNEK İYİ YANIT
Soru: "Estetik ameliyat sonrası hasta şikayet etti, ne yapmalıyım?"
Yanıt:
**Hukuki çerçeve:** Estetik operasyonlar Yargıtay 15. HD içtihadında **eser sözleşmesi** sayılır (TBK m.470 vd.). Bu, hekimi standart vekâlete (TBK m.502) göre **daha ağır** sorumlu kılar — sonuç taahhüdü vardır.
**Adımlar:**
1. Tüm tıbbi belgeleri (onam, ameliyat raporu, fotoğraf, mesajlaşma) muhafaza edin.
2. Aydınlatılmış onam formunu (Hasta Hakları Yön. m.15) kontrol edin — risk + alternatif + komplikasyon listeli mi?
3. Hastaya cevabınızı yazılı verin; sözel polemiğe girmeyin.
4. TBK m.72: haksız fiil zamanaşımı 2 yıl (öğrenme) / 10 yıl (mutlak). Süreyi takip edin.
5. Mesleki sorumluluk sigortanızı bilgilendirin.
**Risk:** İspat yükü hastada olsa da "ortalama uzman hekim" standardı uygulanır; eser sözleşmesi olduğu için ayıpsız ifa baskısı vardır.
⚖️ Bu, genel bilgilendirme amaçlı yapay zekâ yanıtıdır. Somut olayınız için TurkHekim Hukuk modülünden anlaşmalı bir avukatla görüşmenizi öneririz: /hukuk/avukatlar
`;

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const { basarili } = rateLimit(`hukuk-ai-${ip}`, RATE_LIMITS.HUKUK_AI.limit, RATE_LIMITS.HUKUK_AI.pencereDakika);
  if (!basarili) {
    return NextResponse.json({ hata: "Saatlik soru limiti doldu. Bir saat sonra tekrar deneyin." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ hata: "Geçersiz istek." }, { status: 400 });
  }

  const { soru, gecmis = [] } = body || {};
  if (!soru || typeof soru !== "string" || soru.trim().length < 5) {
    return NextResponse.json({ hata: "Sorunuzu en az 5 karakter yazın." }, { status: 400 });
  }
  if (soru.length > 3000) {
    return NextResponse.json({ hata: "Soru çok uzun (en fazla 3000 karakter)." }, { status: 400 });
  }

  const mesajlar = [
    ...gecmis.filter(m => m?.role && m?.content).slice(-6),
    { role: "user", content: soru.trim() },
  ];

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: [{
        type: "text",
        text: SISTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      }],
      messages: mesajlar,
    });

    const yanit = response.content?.[0]?.text || "";

    try {
      await sql`
        INSERT INTO api_kullanim (endpoint, model, input_tokens, output_tokens)
        VALUES ('hukuk-ai-danisman', 'claude-sonnet-4-6',
          ${response.usage?.input_tokens || 0},
          ${response.usage?.output_tokens || 0})
      `;
    } catch (logErr) {
      console.error("API kullanım logu kaydedilemedi:", logErr);
    }

    return NextResponse.json({ yanit });
  } catch (err) {
    console.error("Hukuk AI hatası:", err);
    return NextResponse.json({ hata: "AI servisine ulaşılamadı. Lütfen birazdan tekrar deneyin." }, { status: 503 });
  }
}
