// BLOK 4 — Randevu İptal Sistemi Unit Testleri

/**
 * Randevu durum geçişleri — hangi geçişler geçerlidir?
 */
const GECERLI_GECISLER = {
  bekliyor: ["onaylandi", "iptal"],
  onaylandi: ["tamamlandi", "iptal"],
  iptal: [],
  tamamlandi: [],
};

function durumGecisiGecerliMi(mevcutDurum, yeniDurum) {
  const izinliler = GECERLI_GECISLER[mevcutDurum] || [];
  return izinliler.includes(yeniDurum);
}

/**
 * İptal sebebi validasyonu
 */
function iptalSebebiGecerliMi(sebep) {
  const gecerliSebepler = ["hasta_istedigi", "doktor_istedigi", "hasta_gelmedi", "yanlis_randevu", "diger"];
  return gecerliSebepler.includes(sebep);
}

/**
 * İptal token üretici — 32 hex karakter
 */
function iptalTokenUret() {
  // Node ortamında Math.random kullanıyoruz (test için)
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

/**
 * Randevu durum etiketi
 */
function durumEtiketi(durum) {
  const etiketler = {
    bekliyor: "⏳ Bekliyor",
    onaylandi: "✅ Onaylandı",
    iptal: "❌ İptal",
    tamamlandi: "🏁 Tamamlandı",
  };
  return etiketler[durum] || durum;
}

// ─────────────────────────────────────────────

describe("durumGecisiGecerliMi", () => {
  test("bekliyor → onaylandi geçerli", () => {
    expect(durumGecisiGecerliMi("bekliyor", "onaylandi")).toBe(true);
  });

  test("bekliyor → iptal geçerli", () => {
    expect(durumGecisiGecerliMi("bekliyor", "iptal")).toBe(true);
  });

  test("onaylandi → tamamlandi geçerli", () => {
    expect(durumGecisiGecerliMi("onaylandi", "tamamlandi")).toBe(true);
  });

  test("onaylandi → iptal geçerli", () => {
    expect(durumGecisiGecerliMi("onaylandi", "iptal")).toBe(true);
  });

  test("iptal → bekliyor geçersiz", () => {
    expect(durumGecisiGecerliMi("iptal", "bekliyor")).toBe(false);
  });

  test("tamamlandi → iptal geçersiz", () => {
    expect(durumGecisiGecerliMi("tamamlandi", "iptal")).toBe(false);
  });

  test("bekliyor → tamamlandi geçersiz", () => {
    expect(durumGecisiGecerliMi("bekliyor", "tamamlandi")).toBe(false);
  });
});

describe("iptalSebebiGecerliMi", () => {
  test("hasta_istedigi geçerli", () => {
    expect(iptalSebebiGecerliMi("hasta_istedigi")).toBe(true);
  });

  test("doktor_istedigi geçerli", () => {
    expect(iptalSebebiGecerliMi("doktor_istedigi")).toBe(true);
  });

  test("hasta_gelmedi geçerli", () => {
    expect(iptalSebebiGecerliMi("hasta_gelmedi")).toBe(true);
  });

  test("bilinmeyen sebep geçersiz", () => {
    expect(iptalSebebiGecerliMi("saldiri")).toBe(false);
  });

  test("boş string geçersiz", () => {
    expect(iptalSebebiGecerliMi("")).toBe(false);
  });
});

describe("iptalTokenUret", () => {
  test("32 karakter uzunluk", () => {
    expect(iptalTokenUret()).toHaveLength(32);
  });

  test("sadece hex karakterler", () => {
    expect(iptalTokenUret()).toMatch(/^[0-9a-f]{32}$/);
  });

  test("her çağrıda farklı token", () => {
    const t1 = iptalTokenUret();
    const t2 = iptalTokenUret();
    expect(t1).not.toBe(t2);
  });
});

describe("durumEtiketi", () => {
  test("bekliyor etiketi", () => {
    expect(durumEtiketi("bekliyor")).toContain("Bekliyor");
  });

  test("onaylandi etiketi ✅ içerir", () => {
    expect(durumEtiketi("onaylandi")).toContain("✅");
  });

  test("iptal etiketi", () => {
    expect(durumEtiketi("iptal")).toContain("İptal");
  });

  test("tamamlandi etiketi", () => {
    expect(durumEtiketi("tamamlandi")).toContain("Tamamlandı");
  });

  test("bilinmeyen durum → olduğu gibi döner", () => {
    expect(durumEtiketi("xyz")).toBe("xyz");
  });
});
