import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const TERCUMAN_COOKIE = "tercuman-oturumu";
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function tercumanSessionOlustur(tercuman) {
  const token = await new SignJWT({
    id: tercuman.id,
    ad: tercuman.ad,
    email: tercuman.email,
    slug: tercuman.slug,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);

  return token;
}

export async function getTercumanSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TERCUMAN_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function tercumanSessionSil() {
  const cookieStore = await cookies();
  cookieStore.delete(TERCUMAN_COOKIE);
}

export { TERCUMAN_COOKIE };
