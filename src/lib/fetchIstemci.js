/**
 * Merkezi fetch helper — res.ok kontrolü, error handling, JSON parse tek yerde.
 * @param {string} url
 * @param {RequestInit} [secenekler]
 * @returns {Promise<{ok: boolean, data: any, durum: number}>}
 */
export async function fetchAPI(url, secenekler = {}) {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...secenekler.headers },
      ...secenekler,
    });

    let data = null;
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await res.json();
    }

    if (!res.ok) {
      return {
        ok: false,
        data,
        durum: res.status,
        hata: data?.hata || data?.error || `HTTP ${res.status}`,
      };
    }

    return { ok: true, data, durum: res.status };
  } catch (err) {
    return {
      ok: false,
      data: null,
      durum: 0,
      hata: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.",
    };
  }
}
