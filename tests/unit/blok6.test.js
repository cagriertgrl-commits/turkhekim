// BLOK 6 — Profil Özelleştirme & Harita Unit Testleri

/**
 * Google Maps embed URL üretici
 */
function mapsEmbedUrl(adres) {
  if (!adres || !adres.trim()) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(adres.trim())}&output=embed`;
}

/**
 * Koordinat validasyonu
 */
function koordinatGecerliMi(lat, lng) {
  const latSayi = parseFloat(lat);
  const lngSayi = parseFloat(lng);
  if (isNaN(latSayi) || isNaN(lngSayi)) return false;
  if (latSayi < -90 || latSayi > 90) return false;
  if (lngSayi < -180 || lngSayi > 180) return false;
  return true;
}

/**
 * Çalışma saatleri yapılandırılmış formattan düz metne
 */
const GUNLER = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

function calismaMetniOlustur(program) {
  // program: { Pazartesi: { acik: true, baslangic: "09:00", bitis: "17:00" }, ... }
  if (!program || typeof program !== "object") return "";

  const satirlar = [];
  for (const gun of GUNLER) {
    const g = program[gun];
    if (!g) continue;
    if (!g.acik) {
      satirlar.push(`${gun}: Kapalı`);
    } else {
      satirlar.push(`${gun}: ${g.baslangic || "09:00"} — ${g.bitis || "17:00"}`);
    }
  }
  return satirlar.join("\n");
}

/**
 * Profil tamamlama yüzdesi hesaplayıcı
 */
function profilTamamlamaYuzdesi(doktor) {
  const alanlar = [
    doktor.foto_url,
    doktor.hakkinda,
    doktor.fiyat,
    doktor.adres,
    doktor.whatsapp,
    doktor.website,
    doktor.hizmetler,
    doktor.diller,
  ];
  const dolu = alanlar.filter(Boolean).length;
  return Math.round((dolu / alanlar.length) * 100);
}

// ─────────────────────────────────────────────

describe("mapsEmbedUrl", () => {
  test("adres varsa embed URL üretir", () => {
    const url = mapsEmbedUrl("Bağcılar, İstanbul");
    expect(url).toContain("maps.google.com");
    expect(url).toContain("output=embed");
    expect(url).toContain(encodeURIComponent("Bağcılar, İstanbul"));
  });

  test("boş adres → null", () => {
    expect(mapsEmbedUrl("")).toBeNull();
    expect(mapsEmbedUrl(null)).toBeNull();
  });

  test("özel karakterler encode edilir", () => {
    const url = mapsEmbedUrl("Çukurova, Adana");
    expect(url).not.toContain("ç");
    expect(url).toContain("maps.google.com");
  });
});

describe("koordinatGecerliMi", () => {
  test("geçerli koordinatlar", () => {
    expect(koordinatGecerliMi("41.0082", "28.9784")).toBe(true); // İstanbul
    expect(koordinatGecerliMi("39.9334", "32.8597")).toBe(true); // Ankara
  });

  test("geçersiz enlem (>90)", () => {
    expect(koordinatGecerliMi("91", "28")).toBe(false);
  });

  test("geçersiz boylam (<-180)", () => {
    expect(koordinatGecerliMi("41", "-181")).toBe(false);
  });

  test("sayısal olmayan değer", () => {
    expect(koordinatGecerliMi("abc", "28")).toBe(false);
  });

  test("negatif geçerli koordinat", () => {
    expect(koordinatGecerliMi("-33.87", "151.21")).toBe(true); // Sydney
  });
});

describe("calismaMetniOlustur", () => {
  test("haftalık program metne dönüşür", () => {
    const program = {
      Pazartesi: { acik: true, baslangic: "09:00", bitis: "18:00" },
      Salı: { acik: true, baslangic: "09:00", bitis: "18:00" },
      Cumartesi: { acik: false },
      Pazar: { acik: false },
    };
    const metin = calismaMetniOlustur(program);
    expect(metin).toContain("Pazartesi: 09:00 — 18:00");
    expect(metin).toContain("Cumartesi: Kapalı");
  });

  test("boş program → boş string", () => {
    expect(calismaMetniOlustur({})).toBe("");
    expect(calismaMetniOlustur(null)).toBe("");
  });

  test("günler sıralı çıkar", () => {
    const program = { Cuma: { acik: true, baslangic: "10:00", bitis: "16:00" }, Pazartesi: { acik: true, baslangic: "09:00", bitis: "17:00" } };
    const satirlar = calismaMetniOlustur(program).split("\n");
    const gunSirasi = satirlar.map(s => s.split(":")[0]);
    expect(gunSirasi.indexOf("Pazartesi")).toBeLessThan(gunSirasi.indexOf("Cuma"));
  });
});

describe("profilTamamlamaYuzdesi", () => {
  test("tüm alanlar dolu → %100", () => {
    const d = { foto_url: "x", hakkinda: "x", fiyat: "x", adres: "x", whatsapp: "x", website: "x", hizmetler: "x", diller: "x" };
    expect(profilTamamlamaYuzdesi(d)).toBe(100);
  });

  test("hiçbiri yok → %0", () => {
    expect(profilTamamlamaYuzdesi({})).toBe(0);
  });

  test("yarısı dolu → %50", () => {
    const d = { foto_url: "x", hakkinda: "x", fiyat: "x", adres: "x" };
    expect(profilTamamlamaYuzdesi(d)).toBe(50);
  });
});
