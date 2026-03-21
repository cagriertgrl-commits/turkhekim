import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ kullanici: null });
  return NextResponse.json({
    kullanici: { ad: session.ad, slug: session.slug },
  });
}
