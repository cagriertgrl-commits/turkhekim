/**
 * SMS / WhatsApp gönderim servisi.
 *
 * Provider abstraction — şu an mock mode'da, env'de SMS_PROVIDER ayarlandığında
 * gerçek sağlayıcıya geçer. Mock mode'da DB'ye kuyruğa yazar + console.log yapar.
 *
 * Desteklenen sağlayıcılar (eklenecek):
 *  - netgsm: Türkiye için en yaygın, ucuz. SMS_NETGSM_USER + SMS_NETGSM_PASS env.
 *  - twilio: WhatsApp + SMS. TWILIO_SID + TWILIO_TOKEN + TWILIO_FROM env.
 */
import sql from "@/lib/db";

const PROVIDER = process.env.SMS_PROVIDER || "mock";

/**
 * Kuyruğa SMS/WhatsApp gönderim isteği ekler.
 * Cron veya manuel tetikleyici işler kuyruk girişlerini.
 */
export async function kuyrukaEkle({ alici_telefon, mesaj, tip = "randevu_hatirlatma", kanal = "sms", referans_tip = null, referans_id = null, planlanan_tarih = null }) {
  if (!alici_telefon || !mesaj) {
    throw new Error("alici_telefon ve mesaj zorunlu");
  }
  const temizTel = alici_telefon.replace(/\D/g, "");
  if (temizTel.length < 10) throw new Error("Geçersiz telefon");

  const [kayit] = await sql`
    INSERT INTO sms_kuyrugu (alici_telefon, mesaj, tip, kanal, referans_tip, referans_id, planlanan_tarih)
    VALUES (${temizTel}, ${mesaj}, ${tip}, ${kanal}, ${referans_tip}, ${referans_id}, ${planlanan_tarih || new Date()})
    RETURNING id
  `;
  return kayit.id;
}

/**
 * Kuyruktaki bekleyen mesajları işler. Cron tarafından tetiklenir.
 * Provider mock ise sadece log düşer, başarılı işaretler.
 */
export async function kuyruguIsle({ limit = 50 } = {}) {
  const bekleyen = await sql`
    SELECT id, alici_telefon, mesaj, kanal, deneme_sayisi
    FROM sms_kuyrugu
    WHERE gonderildi = false AND planlanan_tarih <= NOW() AND deneme_sayisi < 5
    ORDER BY planlanan_tarih ASC LIMIT ${limit}
  `;

  let basarili = 0;
  let basarisiz = 0;

  for (const item of bekleyen) {
    try {
      await gonder({ telefon: item.alici_telefon, mesaj: item.mesaj, kanal: item.kanal });
      await sql`
        UPDATE sms_kuyrugu SET gonderildi = true, gonderim_tarihi = NOW(), deneme_sayisi = deneme_sayisi + 1
        WHERE id = ${item.id}
      `;
      basarili++;
    } catch (err) {
      await sql`
        UPDATE sms_kuyrugu SET deneme_sayisi = deneme_sayisi + 1, hata = ${String(err.message || err).slice(0, 500)}
        WHERE id = ${item.id}
      `;
      basarisiz++;
    }
  }

  return { islendi: bekleyen.length, basarili, basarisiz, provider: PROVIDER };
}

async function gonder({ telefon, mesaj, kanal }) {
  if (PROVIDER === "mock") {
    console.log(`[SMS-MOCK] ${kanal} → ${telefon}: ${mesaj.slice(0, 80)}...`);
    return { mock: true };
  }
  if (PROVIDER === "netgsm") return netgsmGonder({ telefon, mesaj });
  if (PROVIDER === "twilio") return twilioGonder({ telefon, mesaj, kanal });
  throw new Error(`Bilinmeyen SMS_PROVIDER: ${PROVIDER}`);
}

async function netgsmGonder({ telefon, mesaj }) {
  const user = process.env.SMS_NETGSM_USER;
  const pass = process.env.SMS_NETGSM_PASS;
  const baslik = process.env.SMS_NETGSM_HEADER || "TURKHEKIM";
  if (!user || !pass) throw new Error("NetGSM kimlik bilgileri eksik");

  const params = new URLSearchParams({
    usercode: user,
    password: pass,
    gsmno: telefon.startsWith("90") ? telefon : "90" + telefon.replace(/^0/, ""),
    message: mesaj,
    msgheader: baslik,
  });

  const res = await fetch(`https://api.netgsm.com.tr/sms/send/get?${params}`);
  const text = await res.text();
  if (!text.startsWith("00") && !text.startsWith("01") && !text.startsWith("02")) {
    throw new Error(`NetGSM hata kodu: ${text}`);
  }
  return { netgsm: text };
}

async function twilioGonder({ telefon, mesaj, kanal }) {
  const sid = process.env.TWILIO_SID;
  const token = process.env.TWILIO_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) throw new Error("Twilio kimlik bilgileri eksik");

  const fromPrefix = kanal === "whatsapp" ? `whatsapp:${from}` : from;
  const toPrefix = kanal === "whatsapp" ? `whatsapp:+${telefon.replace(/^0/, "90")}` : `+${telefon.replace(/^0/, "90")}`;

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ From: fromPrefix, To: toPrefix, Body: mesaj }),
  });
  if (!res.ok) throw new Error(`Twilio hata: ${res.status}`);
  return await res.json();
}

/**
 * Randevu için hatırlatma planlar — randevu saatinden 24 saat ve 2 saat önce.
 */
export async function randevuHatirlatmasiPlanla({ randevuId, telefon, doktorAdi, tarih, saat }) {
  const randevuZamani = new Date(`${tarih}T${saat || "00:00"}:00`);
  const t24 = new Date(randevuZamani.getTime() - 24 * 60 * 60 * 1000);
  const t2 = new Date(randevuZamani.getTime() - 2 * 60 * 60 * 1000);
  const mesaj = `TurkHekim: Yarın ${tarih} ${saat || ""} saatinde Dr. ${doktorAdi} ile randevunuz var. İptal: turkhekim.com/randevu-iptal`;

  if (t24 > new Date()) {
    await kuyrukaEkle({ alici_telefon: telefon, mesaj, tip: "randevu_hatirlatma", referans_tip: "randevu", referans_id: randevuId, planlanan_tarih: t24 });
  }
  if (t2 > new Date()) {
    const mesaj2 = `TurkHekim: ${saat || ""} saatinde Dr. ${doktorAdi} ile randevunuz var. Görüşmek üzere!`;
    await kuyrukaEkle({ alici_telefon: telefon, mesaj: mesaj2, tip: "randevu_hatirlatma", referans_tip: "randevu", referans_id: randevuId, planlanan_tarih: t2 });
  }
}
