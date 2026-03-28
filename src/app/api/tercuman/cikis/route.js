import { NextResponse } from "next/server";
import { TERCUMAN_COOKIE } from "@/lib/tercumanSession";

export async function POST() {
  const res = NextResponse.json({ basarili: true });
  res.cookies.set(TERCUMAN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return res;
}
