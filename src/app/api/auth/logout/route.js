import { NextResponse } from "next/server";
import { COOKIE_ADI } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({ basarili: true });
  response.cookies.set(COOKIE_ADI, "", { maxAge: 0, path: "/" });
  return response;
}
