import { hataLogla } from "@/lib/hata-takibi";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    await hataLogla(body.path || "client", new Error(body.mesaj || "unknown"), { stack: body.stack });
    return NextResponse.json({ basarili: true });
  } catch {
    return NextResponse.json({ basarili: false }, { status: 500 });
  }
}
