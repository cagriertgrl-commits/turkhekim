import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const AVUKAT_COOKIE = "avukat-oturumu";
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function avukatSessionOlustur(avukat) {
  const token = await new SignJWT({
    id: avukat.id,
    ad: avukat.ad,
    soyad: avukat.soyad,
    email: avukat.email,
    slug: avukat.slug,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  return token;
}

export async function getAvukatSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AVUKAT_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function avukatSessionSil() {
  const cookieStore = await cookies();
  cookieStore.delete(AVUKAT_COOKIE);
}

export { AVUKAT_COOKIE };
