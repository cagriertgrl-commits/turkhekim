import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin koruması
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-token")?.value;
    if (token !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin-giris", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
