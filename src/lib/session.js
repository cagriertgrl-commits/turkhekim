import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_ADI = "dp-session";
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function sessionOlustur(kullanici, hatirla = false) {
  const sure = hatirla ? 30 * 24 * 60 * 60 : 8 * 60 * 60;
  const token = await new SignJWT({
    id: kullanici.id,
    ad: kullanici.ad,
    email: kullanici.email,
    slug: kullanici.slug,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + sure)
    .sign(secret);

  return { token, sure };
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_ADI)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function sessionSil(response) {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_ADI);
}

export { COOKIE_ADI };
