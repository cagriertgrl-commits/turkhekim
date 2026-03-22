import { NextResponse } from "next/server";
import { firmaSessionSil } from "@/lib/firmaSession";

export async function POST() {
  await firmaSessionSil();
  return NextResponse.json({ basarili: true });
}
