import { NextResponse } from "next/server";
import { kuyruguIsle } from "@/lib/smsServisi";

/**
 * Vercel Cron tarafından periyodik tetiklenir.
 * vercel.json'da `{ "path": "/api/sms/cron", "schedule": "*\/5 * * * *" }` ile her 5 dk.
 * CRON_SECRET header eşleşmesi şart (yetkisiz tetiklemeye karşı).
 */
export async function GET(req) {
  const auth = req.headers.get("authorization");
  const beklenen = `Bearer ${process.env.CRON_SECRET || ""}`;
  if (process.env.CRON_SECRET && auth !== beklenen) {
    return NextResponse.json({ hata: "Yetkisiz." }, { status: 401 });
  }

  try {
    const sonuc = await kuyruguIsle({ limit: 100 });
    return NextResponse.json({ tamam: true, ...sonuc });
  } catch (err) {
    console.error("SMS cron hatası:", err);
    return NextResponse.json({ hata: String(err?.message || err) }, { status: 500 });
  }
}
