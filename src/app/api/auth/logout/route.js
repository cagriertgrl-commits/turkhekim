import { NextResponse } from "next/server";
import { COOKIE_ADI } from "@/lib/session";

const GECMIS = new Date(0);
const PROD = process.env.NODE_ENV === "production";

export async function POST() {
  const response = NextResponse.json({ basarili: true });

  // Custom session cookie — login ile birebir aynı attribute'larla sil
  response.cookies.set(COOKIE_ADI, "", {
    httpOnly: true,
    secure: PROD,
    sameSite: "lax",
    expires: GECMIS,
    maxAge: 0,
    path: "/",
  });

  // NextAuth session cookie'lerini de temizle (her ikisi de — http & https)
  response.cookies.set("next-auth.session-token", "", {
    httpOnly: true,
    sameSite: "lax",
    expires: GECMIS,
    maxAge: 0,
    path: "/",
  });
  response.cookies.set("__Secure-next-auth.session-token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: GECMIS,
    maxAge: 0,
    path: "/",
  });
  response.cookies.set("next-auth.csrf-token", "", {
    httpOnly: true,
    sameSite: "lax",
    expires: GECMIS,
    maxAge: 0,
    path: "/",
  });
  response.cookies.set("__Secure-next-auth.csrf-token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: GECMIS,
    maxAge: 0,
    path: "/",
  });

  return response;
}
