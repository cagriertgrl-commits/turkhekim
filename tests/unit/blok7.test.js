// BLOK 7 — Görsel Kimlik Revizyonu Unit Testleri

/**
 * Doktor kartı için initials hesaplama (ad + soyad)
 */
function initials(ad, soyad) {
  const tamIsim = [ad, soyad].filter(Boolean).join(" ");
  if (!tamIsim.trim()) return "DR";
  const parcalar = tamIsim.trim().split(/\s+/);
  return parcalar.map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

/**
 * Doktor kartı tam isim (unvan + ad + soyad)
 */
function tamIsimOlustur(ad, soyad, unvan) {
  const isim = [ad, soyad].filter(Boolean).join(" ");
  return unvan ? `${unvan} ${isim}` : isim;
}

/**
 * Boş sonuç metni
 */
function bosAramaMetni(sehir, uzmanlik) {
  if (!sehir || !uzmanlik) return "Doktor bulunamadı.";
  return `${sehir} şehrinde ${uzmanlik} bulunamadı.`;
}

/**
 * Sıralama seçenekleri
 */
const SIRALAMA_SECENEKLERI = [
  { deger: "puan", etiket: "En Yüksek Puan" },
  { deger: "yorum", etiket: "En Çok Yorum" },
  { deger: "deneyim", etiket: "En Fazla Deneyim" },
];

function siralamaGecerliMi(siralama) {
  return SIRALAMA_SECENEKLERI.some(s => s.deger === siralama);
}

/**
 * Doktor kartı özet metni
 */
function kartOzetMetni(doktor) {
  const parcalar = [];
  if (doktor.sehir) parcalar.push(`📍 ${doktor.sehir}${doktor.ilce ? `, ${doktor.ilce}` : ""}`);
  if (doktor.deneyim) {
    const d = doktor.deneyim.toString().trim();
    parcalar.push(/^\d+$/.test(d) ? `${d} yıl` : d);
  }
  return parcalar.join(" · ");
}

// ─────────────────────────────────────────────

describe("initials", () => {
  test("ad + soyad → 2 harf", () => {
    expect(initials("Ahmet", "Yılmaz")).toBe("AY");
  });

  test("sadece ad → tek harf", () => {
    expect(initials("Mehmet", "")).toBe("M");
  });

  test("unvanlı ad → initials sadece isimden", () => {
    expect(initials("Fatma", "Kaya")).toBe("FK");
  });

  test("boş → DR", () => {
    expect(initials("", "")).toBe("DR");
    expect(initials(null, null)).toBe("DR");
  });

  test("büyük harf dönüşümü", () => {
    expect(initials("ali", "veli")).toBe("AV");
  });
});

describe("tamIsimOlustur", () => {
  test("ad + soyad + unvan", () => {
    expect(tamIsimOlustur("Ahmet", "Yılmaz", "Prof. Dr.")).toBe("Prof. Dr. Ahmet Yılmaz");
  });

  test("unvansız", () => {
    expect(tamIsimOlustur("Ahmet", "Yılmaz", null)).toBe("Ahmet Yılmaz");
  });

  test("soyadsız", () => {
    expect(tamIsimOlustur("Ahmet", "", "Uzm. Dr.")).toBe("Uzm. Dr. Ahmet");
  });
});

describe("bosAramaMetni", () => {
  test("şehir + uzmanlık varsa özel mesaj", () => {
    expect(bosAramaMetni("Ankara", "KBB Uzmanı")).toContain("Ankara");
    expect(bosAramaMetni("Ankara", "KBB Uzmanı")).toContain("KBB Uzmanı");
  });

  test("eksik parametre → genel mesaj", () => {
    expect(bosAramaMetni("", "")).toBe("Doktor bulunamadı.");
  });
});

describe("siralamaGecerliMi", () => {
  test("geçerli sıralama değerleri", () => {
    expect(siralamaGecerliMi("puan")).toBe(true);
    expect(siralamaGecerliMi("yorum")).toBe(true);
    expect(siralamaGecerliMi("deneyim")).toBe(true);
  });

  test("geçersiz sıralama", () => {
    expect(siralamaGecerliMi("abc")).toBe(false);
    expect(siralamaGecerliMi("")).toBe(false);
  });
});

describe("kartOzetMetni", () => {
  test("şehir + deneyim", () => {
    const metin = kartOzetMetni({ sehir: "İstanbul", ilce: "Kadıköy", deneyim: "10" });
    expect(metin).toContain("İstanbul");
    expect(metin).toContain("Kadıköy");
    expect(metin).toContain("10 yıl");
  });

  test("sadece şehir", () => {
    expect(kartOzetMetni({ sehir: "Ankara" })).toContain("Ankara");
  });

  test("boş → boş string", () => {
    expect(kartOzetMetni({})).toBe("");
  });
});
