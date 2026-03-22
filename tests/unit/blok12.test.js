// BLOK 12 — Genel Audit & Final Testleri

/**
 * URL slug doğrulama (genel)
 */
function slugGecerliMi(slug) {
  if (!slug || typeof slug !== "string") return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Sayfa metadata doğrulama
 */
function metadataGecerliMi({ title, description }) {
  if (!title || title.trim().length < 5) return { gecerli: false, hata: "Başlık çok kısa" };
  if (title.trim().length > 70) return { gecerli: false, hata: "Başlık çok uzun (max 70)" };
  if (!description || description.trim().length < 50) return { gecerli: false, hata: "Açıklama çok kısa" };
  if (description.trim().length > 160) return { gecerli: false, hata: "Açıklama çok uzun (max 160)" };
  return { gecerli: true };
}

/**
 * API güvenlik kontrolü — input sanitizasyonu
 */
function inputTemizle(girdi) {
  if (typeof girdi !== "string") return "";
  return girdi.replace(/<[^>]*>/g, "").replace(/[<>"']/g, "").trim();
}

/**
 * SQL injection riski var mı? (basit kontrol)
 */
function sqlRiskiVarMi(girdi) {
  if (typeof girdi !== "string") return false;
  const TEHLIKELI = /('|--|;|\/\*|\*\/|xp_|UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER)/i;
  return TEHLIKELI.test(girdi);
}

/**
 * Sayfa route'ları tutarlılık kontrolü
 */
const BEKLENEN_ROUTELAR = [
  "/",
  "/panel",
  "/feed",
  "/hasta-panel",
  "/medikal-firma",
  "/medikal-turizm",
  "/hasta-formlari",
  "/hasta-profili",
  "/randevu-iptal/[token]",
];

function routeGecerliMi(route) {
  return BEKLENEN_ROUTELAR.includes(route);
}

/**
 * Doktor profil tamamlık skoru
 */
function profilTamamlamaYuzdesi(doktor) {
  const ALANLAR = [
    { alan: "ad", agirlik: 10 },
    { alan: "soyad", agirlik: 5 },
    { alan: "uzmanlik", agirlik: 15 },
    { alan: "sehir", agirlik: 10 },
    { alan: "telefon", agirlik: 10 },
    { alan: "email", agirlik: 10 },
    { alan: "hakkinda", agirlik: 15 },
    { alan: "foto_url", agirlik: 10 },
    { alan: "fiyat", agirlik: 5 },
    { alan: "adres", agirlik: 5 },
    { alan: "enlem", agirlik: 2 },
    { alan: "tanitim_video", agirlik: 3 },
  ];
  let toplam = 0;
  let kazanilan = 0;
  for (const { alan, agirlik } of ALANLAR) {
    toplam += agirlik;
    if (doktor[alan] && String(doktor[alan]).trim()) {
      kazanilan += agirlik;
    }
  }
  return Math.round((kazanilan / toplam) * 100);
}

/**
 * Türkçe karakter normalizasyonu audit
 */
function trNormalize(str) {
  if (!str) return "";
  const MAP = { ğ: "g", ü: "u", ş: "s", ı: "i", ö: "o", ç: "c", Ğ: "G", Ü: "U", Ş: "S", İ: "I", Ö: "O", Ç: "C" };
  return str.replace(/[ğüşıöçĞÜŞİÖÇ]/g, (c) => MAP[c] || c);
}

/**
 * Randevu çakışma kontrolü (aynı doktor, aynı tarih-saat)
 */
function cakismaVarMi(yeniRandevu, mevcutRandevular) {
  return mevcutRandevular.some(
    (r) =>
      r.doktor_id === yeniRandevu.doktor_id &&
      r.tarih === yeniRandevu.tarih &&
      r.saat === yeniRandevu.saat &&
      r.durum !== "iptal"
  );
}

// ─────────────────────────────────────────────

describe("slugGecerliMi", () => {
  test("Geçerli slug kabul edilir", () => {
    expect(slugGecerliMi("ahmet-yilmaz")).toBe(true);
    expect(slugGecerliMi("kbb-uzmani")).toBe(true);
    expect(slugGecerliMi("istanbul")).toBe(true);
  });

  test("Büyük harf geçersiz", () => {
    expect(slugGecerliMi("Ahmet-Yilmaz")).toBe(false);
  });

  test("Türkçe karakter geçersiz", () => {
    expect(slugGecerliMi("ahmet-yılmaz")).toBe(false);
  });

  test("Başta/sonda tire geçersiz", () => {
    expect(slugGecerliMi("-ahmet")).toBe(false);
    expect(slugGecerliMi("ahmet-")).toBe(false);
  });

  test("Boş/null geçersiz", () => {
    expect(slugGecerliMi("")).toBe(false);
    expect(slugGecerliMi(null)).toBe(false);
  });
});

describe("metadataGecerliMi", () => {
  test("Geçerli metadata kabul edilir", () => {
    expect(metadataGecerliMi({
      title: "İstanbul KBB Uzmanı | DoktorPusula",
      description: "İstanbul'da en iyi KBB uzmanlarını bulun. Doğrulanmış yorumlar ve kolay randevu sistemi ile güvenilir doktor arama.",
    }).gecerli).toBe(true);
  });

  test("Uzun başlık reddedilir", () => {
    const sonuc = metadataGecerliMi({
      title: "a".repeat(71),
      description: "Yeterince uzun bir açıklama metni giriyoruz burada test için yeterli uzunlukta.",
    });
    expect(sonuc.gecerli).toBe(false);
  });

  test("Kısa açıklama reddedilir", () => {
    expect(metadataGecerliMi({ title: "Başlık Yeterli", description: "Kısa" }).gecerli).toBe(false);
  });
});

describe("inputTemizle", () => {
  test("HTML tagları temizlenir", () => {
    const sonuc = inputTemizle("<script>alert('xss')</script>Temiz");
    expect(sonuc).not.toContain("<script>");
    expect(sonuc).not.toContain("</script>");
    expect(sonuc).toContain("Temiz");
  });

  test("Normal metin korunur", () => {
    expect(inputTemizle("Merhaba Dünya")).toBe("Merhaba Dünya");
  });

  test("Null/non-string → boş string", () => {
    expect(inputTemizle(null)).toBe("");
    expect(inputTemizle(123)).toBe("");
  });
});

describe("sqlRiskiVarMi", () => {
  test("SQL keyword içeren girdiler riskli", () => {
    expect(sqlRiskiVarMi("'; DROP TABLE doktorlar; --")).toBe(true);
    expect(sqlRiskiVarMi("1 UNION SELECT * FROM users")).toBe(true);
  });

  test("Normal metin risksiz", () => {
    expect(sqlRiskiVarMi("Ahmet Yılmaz")).toBe(false);
    expect(sqlRiskiVarMi("İstanbul KBB Uzmanı")).toBe(false);
  });
});

describe("profilTamamlamaYuzdesi", () => {
  test("Tam dolu profil → yüksek yüzde", () => {
    const tam = {
      ad: "Ahmet", soyad: "Yılmaz", uzmanlik: "KBB", sehir: "İstanbul",
      telefon: "555", email: "a@b.com", hakkinda: "Deneyimli doktor",
      foto_url: "http://x.jpg", fiyat: "500", adres: "Kadıköy",
      enlem: "41", tanitim_video: "https://youtube.com/x",
    };
    expect(profilTamamlamaYuzdesi(tam)).toBe(100);
  });

  test("Boş profil → 0", () => {
    expect(profilTamamlamaYuzdesi({})).toBe(0);
  });

  test("Yarım dolu profil → 0-100 arası", () => {
    const yari = { ad: "Ahmet", uzmanlik: "KBB", sehir: "İstanbul" };
    const yuzde = profilTamamlamaYuzdesi(yari);
    expect(yuzde).toBeGreaterThan(0);
    expect(yuzde).toBeLessThan(100);
  });
});

describe("trNormalize", () => {
  test("Türkçe karakterler dönüşür", () => {
    expect(trNormalize("ğüşıöç")).toBe("gusioc");
    expect(trNormalize("ĞÜŞİÖÇ")).toBe("GUSIOC");
  });

  test("ASCII karakterler korunur", () => {
    expect(trNormalize("abc123")).toBe("abc123");
  });

  test("Boş/null → boş string", () => {
    expect(trNormalize("")).toBe("");
    expect(trNormalize(null)).toBe("");
  });
});

describe("cakismaVarMi", () => {
  const mevcut = [
    { doktor_id: 1, tarih: "2025-06-15", saat: "10:00", durum: "onaylandi" },
    { doktor_id: 1, tarih: "2025-06-15", saat: "11:00", durum: "bekliyor" },
    { doktor_id: 2, tarih: "2025-06-15", saat: "10:00", durum: "onaylandi" },
  ];

  test("Aynı doktor, aynı tarih-saat → çakışma var", () => {
    expect(cakismaVarMi({ doktor_id: 1, tarih: "2025-06-15", saat: "10:00" }, mevcut)).toBe(true);
  });

  test("Farklı doktor, aynı tarih-saat → çakışma yok", () => {
    expect(cakismaVarMi({ doktor_id: 3, tarih: "2025-06-15", saat: "10:00" }, mevcut)).toBe(false);
  });

  test("İptal edilmiş randevu çakışma sayılmaz", () => {
    const iptalliMevcut = [{ doktor_id: 1, tarih: "2025-06-15", saat: "09:00", durum: "iptal" }];
    expect(cakismaVarMi({ doktor_id: 1, tarih: "2025-06-15", saat: "09:00" }, iptalliMevcut)).toBe(false);
  });

  test("Boş liste → çakışma yok", () => {
    expect(cakismaVarMi({ doktor_id: 1, tarih: "2025-06-15", saat: "10:00" }, [])).toBe(false);
  });
});
