import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const FIRMA_COOKIE = "firma-oturumu";
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function firmaSessionOlustur(firma) {
  const token = await new SignJWT({
    id: firma.id,
    ad: firma.ad,
    email: firma.email,
    slug: firma.slug,
    tip: firma.tip,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  return token;
}

export async function getFirmaSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(FIRMA_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function firmaSessionSil() {
  const cookieStore = await cookies();
  cookieStore.delete(FIRMA_COOKIE);
}

export { FIRMA_COOKIE };
