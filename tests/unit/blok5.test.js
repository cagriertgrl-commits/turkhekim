// BLOK 5 — Soru-Cevap Yönetim Sistemi Unit Testleri

/**
 * Soru filtreleme — bekleyenler vs yanıtlanmış
 */
function soruBekliyor(s) {
  return !s.yanit;
}

function soruYanitlanmis(s) {
  return Boolean(s.yanit);
}

function soruGizli(s) {
  return Boolean(s.gizli);
}

function soruPublik(s) {
  return Boolean(s.yanit) && !s.gizli;
}

/**
 * Yanıt validasyonu
 */
function yanitGecerliMi(yanit) {
  if (!yanit || typeof yanit !== "string") return { gecerli: false, hata: "Yanıt zorunludur." };
  if (yanit.trim().length < 5) return { gecerli: false, hata: "Yanıt en az 5 karakter olmalıdır." };
  if (yanit.trim().length > 2000) return { gecerli: false, hata: "Yanıt en fazla 2000 karakter olabilir." };
  return { gecerli: true };
}

/**
 * Soru listesi istatistikleri
 */
function soruIstatistik(sorular) {
  return {
    toplam: sorular.length,
    bekleyen: sorular.filter(soruBekliyor).length,
    yanitlanan: sorular.filter(soruYanitlanmis).length,
    gizli: sorular.filter(soruGizli).length,
    yayinda: sorular.filter(soruPublik).length,
  };
}

// ─────────────────────────────────────────────

const ORNEK_SORULAR = [
  { id: 1, soran_adi: "Ali", soru: "Doktor ne zaman randevu verir?", yanit: null, gizli: false },
  { id: 2, soran_adi: "Ayşe", soru: "Online muayene var mı?", yanit: "Evet, online randevu alabilirsiniz.", gizli: false },
  { id: 3, soran_adi: "Veli", soru: "Sigorta kabul ediyor mu?", yanit: "SGK ve özel sigorta kabul ediyoruz.", gizli: true },
  { id: 4, soran_adi: "Spam", soru: "Ucuz ürünler için tıklayın", yanit: null, gizli: false },
];

describe("soruBekliyor / soruYanitlanmis", () => {
  test("yanıtsız soru → bekliyor", () => {
    expect(soruBekliyor(ORNEK_SORULAR[0])).toBe(true);
    expect(soruYanitlanmis(ORNEK_SORULAR[0])).toBe(false);
  });

  test("yanıtlı soru → yanıtlanmış", () => {
    expect(soruBekliyor(ORNEK_SORULAR[1])).toBe(false);
    expect(soruYanitlanmis(ORNEK_SORULAR[1])).toBe(true);
  });
});

describe("soruPublik", () => {
  test("yanıtlı + gizli değil → yayında", () => {
    expect(soruPublik(ORNEK_SORULAR[1])).toBe(true);
  });

  test("yanıtlı + gizli → yayında değil", () => {
    expect(soruPublik(ORNEK_SORULAR[2])).toBe(false);
  });

  test("yanıtsız → yayında değil", () => {
    expect(soruPublik(ORNEK_SORULAR[0])).toBe(false);
  });
});

describe("yanitGecerliMi", () => {
  test("5 karakterden kısa → geçersiz", () => {
    expect(yanitGecerliMi("Hey").gecerli).toBe(false);
  });

  test("5-2000 karakter → geçerli", () => {
    expect(yanitGecerliMi("Evet, randevu alabilirsiniz.").gecerli).toBe(true);
  });

  test("2000+ karakter → geçersiz", () => {
    expect(yanitGecerliMi("a".repeat(2001)).gecerli).toBe(false);
  });

  test("boş → geçersiz", () => {
    expect(yanitGecerliMi("").gecerli).toBe(false);
  });

  test("null → geçersiz", () => {
    expect(yanitGecerliMi(null).gecerli).toBe(false);
  });
});

describe("soruIstatistik", () => {
  test("istatistik doğru hesaplanır", () => {
    const ist = soruIstatistik(ORNEK_SORULAR);
    expect(ist.toplam).toBe(4);
    expect(ist.bekleyen).toBe(2);
    expect(ist.yanitlanan).toBe(2);
    expect(ist.gizli).toBe(1);
    expect(ist.yayinda).toBe(1); // yanıtlı + açık
  });

  test("boş liste → sıfırlar", () => {
    const ist = soruIstatistik([]);
    expect(ist.toplam).toBe(0);
    expect(ist.bekleyen).toBe(0);
  });
});
