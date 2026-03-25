import { NextResponse } from "next/server";

/**
 * API request body doğrulama helper'ı.
 * Şema: { alan: { zorunlu, tip, minUzunluk, maksUzunluk } }
 *
 * @param {Request} request
 * @param {Record<string, {zorunlu?: boolean, tip?: string, minUzunluk?: number, maksUzunluk?: number, izinVerilenler?: string[]}>} sema
 * @returns {Promise<{basarili: boolean, veri?: Record<string, any>, hataYanit?: NextResponse}>}
 */
export async function dogrulaBody(request, sema) {
  let body;
  try {
    body = await request.json();
  } catch {
    return {
      basarili: false,
      hataYanit: NextResponse.json(
        { hata: "Geçersiz JSON formatı." },
        { status: 400 }
      ),
    };
  }

  if (!body || typeof body !== "object") {
    return {
      basarili: false,
      hataYanit: NextResponse.json(
        { hata: "İstek gövdesi boş veya geçersiz." },
        { status: 400 }
      ),
    };
  }

  const hatalar = [];

  for (const [alan, kurallar] of Object.entries(sema)) {
    const deger = body[alan];

    if (kurallar.zorunlu && (deger === undefined || deger === null || deger === "")) {
      hatalar.push(`${alan} alanı zorunludur.`);
      continue;
    }

    if (deger === undefined || deger === null) continue;

    if (kurallar.tip && typeof deger !== kurallar.tip) {
      hatalar.push(`${alan} alanı ${kurallar.tip} tipinde olmalıdır.`);
      continue;
    }

    if (kurallar.tip === "string" || typeof deger === "string") {
      if (kurallar.minUzunluk && deger.trim().length < kurallar.minUzunluk) {
        hatalar.push(`${alan} en az ${kurallar.minUzunluk} karakter olmalıdır.`);
      }
      if (kurallar.maksUzunluk && deger.length > kurallar.maksUzunluk) {
        hatalar.push(`${alan} en fazla ${kurallar.maksUzunluk} karakter olabilir.`);
      }
    }

    if (kurallar.izinVerilenler && !kurallar.izinVerilenler.includes(deger)) {
      hatalar.push(`${alan} geçersiz değer. İzin verilenler: ${kurallar.izinVerilenler.join(", ")}`);
    }
  }

  if (hatalar.length > 0) {
    return {
      basarili: false,
      hataYanit: NextResponse.json(
        { hata: hatalar.join(" ") },
        { status: 400 }
      ),
    };
  }

  return { basarili: true, veri: body };
}
