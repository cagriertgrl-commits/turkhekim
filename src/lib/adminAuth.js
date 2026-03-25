import { jwtVerify } from "jose";

const COOKIE_ADI = "admin-token";
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

/**
 * Admin token'ını doğrular (request cookie'den).
 * Middleware ve API route'larda kullanılır.
 * @param {Request} request
 * @returns {Promise<boolean>}
 */
export async function adminKontrol(request) {
  try {
    const token = request.cookies.get(COOKIE_ADI)?.value;
    if (!token) return false;
    const { payload } = await jwtVerify(token, secret);
    return payload.rol === "admin";
  } catch {
    return false;
  }
}
