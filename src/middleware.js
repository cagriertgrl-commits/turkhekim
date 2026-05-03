import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin koruması — JWT doğrulama
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin-giris")) {
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

  // Pathname'i header'a yaz (layout'larda erişim için)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // /embed sayfaları için iframe izni — varsayılan deny'ı kaldır
  if (pathname.startsWith("/embed")) {
    response.headers.set("X-Frame-Options", "ALLOWALL");
    response.headers.set("Content-Security-Policy", "frame-ancestors *");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)$).*)",
  ],
};
