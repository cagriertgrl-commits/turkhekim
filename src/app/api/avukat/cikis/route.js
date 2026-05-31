import { NextResponse } from "next/server";
import { avukatSessionSil } from "@/lib/avukatSession";

export async function POST() {
  await avukatSessionSil();
  return NextResponse.json({ basarili: true });
}
