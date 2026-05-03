/**
 * iyzico ödeme sağlayıcı yardımcısı.
 *
 * Gerekli ortam değişkenleri:
 *   IYZICO_API_KEY     — iyzico panelinden API anahtarı
 *   IYZICO_SECRET_KEY  — iyzico panelinden secret anahtarı
 *   IYZICO_BASE_URL    — sandbox: https://sandbox-api.iyzipay.com
 *                       prod:    https://api.iyzipay.com
 *
 * Kaynak: https://docs.iyzico.com/api/api-references/v2-imzalama
 */

import crypto from "crypto";

const API_KEY = process.env.IYZICO_API_KEY;
const SECRET_KEY = process.env.IYZICO_SECRET_KEY;
const BASE_URL = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

/**
 * iyzico v2 (HMAC-SHA256) imzası
 */
function imzaOlustur({ uri, body, randomString }) {
  if (!SECRET_KEY) throw new Error("IYZICO_SECRET_KEY tanımlı değil");
  const payload = randomString + uri + JSON.stringify(body);
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return `IYZWSv2 apiKey:${API_KEY}&randomKey:${randomString}&signature:${signature}`;
}

export async function iyzicoIstek({ uri, body }) {
  if (!API_KEY || !SECRET_KEY) {
    return { hata: "IYZICO_API_KEY/SECRET_KEY tanımlı değil. Vercel env'sine ekleyin." };
  }
  const randomString = crypto.randomBytes(8).toString("hex");
  const auth = imzaOlustur({ uri, body, randomString });

  try {
    const res = await fetch(`${BASE_URL}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
        "x-iyzi-rnd": randomString,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { hata: err.message };
  }
}

/**
 * Checkout Form initialize — kullanıcıyı iyzico ödeme sayfasına yönlendirmek için
 * Geriye dönen `paymentPageUrl`'e redirect yapılır.
 *
 * @param {object} params
 * @param {number} params.tutar — TL cinsinden (örn: 299.00)
 * @param {string} params.konversasyonId — bizim taraftan unique id
 * @param {string} params.callbackUrl — ödeme sonrası dönülecek URL
 * @param {object} params.alici — { id, ad, soyad, email, telefon, adres, sehir }
 * @param {Array} params.urunler — [{ id, ad, kategori, tutar }]
 */
export async function checkoutFormBaslat({ tutar, konversasyonId, callbackUrl, alici, urunler }) {
  const body = {
    locale: "tr",
    conversationId: konversasyonId,
    price: tutar.toFixed(2),
    paidPrice: tutar.toFixed(2),
    currency: "TRY",
    basketId: konversasyonId,
    paymentGroup: "PRODUCT",
    callbackUrl,
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: String(alici.id),
      name: alici.ad || "Kullanıcı",
      surname: alici.soyad || "DoktorPusula",
      gsmNumber: alici.telefon || "+905555555555",
      email: alici.email,
      identityNumber: "11111111111", // KDV mükellefi değilse dummy
      registrationAddress: alici.adres || "Türkiye",
      city: alici.sehir || "İstanbul",
      country: "Türkiye",
      ip: alici.ip || "127.0.0.1",
    },
    shippingAddress: {
      contactName: `${alici.ad} ${alici.soyad || ""}`.trim(),
      city: alici.sehir || "İstanbul",
      country: "Türkiye",
      address: alici.adres || "Türkiye",
    },
    billingAddress: {
      contactName: `${alici.ad} ${alici.soyad || ""}`.trim(),
      city: alici.sehir || "İstanbul",
      country: "Türkiye",
      address: alici.adres || "Türkiye",
    },
    basketItems: urunler.map((u, i) => ({
      id: String(u.id || i),
      name: u.ad,
      category1: u.kategori || "Üyelik",
      itemType: "VIRTUAL",
      price: u.tutar.toFixed(2),
    })),
  };

  return iyzicoIstek({ uri: "/payment/iyzipos/checkoutform/initialize/auth/ecom", body });
}

/**
 * Checkout sonrası ödeme sonucunu doğrula
 * @param {string} token — iyzico'nun callback'te döndüğü token
 */
export async function checkoutSonucDogrula(token) {
  return iyzicoIstek({
    uri: "/payment/iyzipos/checkoutform/auth/ecom/detail",
    body: { locale: "tr", token },
  });
}
