import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin koruması — JWT doğrulama
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin-giris", request.url));
    }
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.rol !== "admin") {
        return NextResponse.redirect(new URL("/admin-giris", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin-giris", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
