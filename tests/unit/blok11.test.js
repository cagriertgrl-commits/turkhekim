// BLOK 11 — İlaç Mümessili & Medikal Firma Unit Testleri

/**
 * Firma tipi doğrulama
 */
const FIRMA_TIPLERI = ["ilac", "tibbi_cihaz", "saglik_hizmeti", "sigorta", "diger"];

function firmaTipiGecerliMi(tip) {
  return FIRMA_TIPLERI.includes(tip);
}

/**
 * Firma başvuru formu doğrulama
 */
function firmaBaşvuruGecerliMi({ firmaAdi, yetkiliAdi, email, telefon, firmaType }) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!firmaAdi || firmaAdi.trim().length < 2) return { gecerli: false, hata: "Firma adı zorunlu" };
  if (!yetkiliAdi || yetkiliAdi.trim().length < 2) return { gecerli: false, hata: "Yetkili adı zorunlu" };
  if (!EMAIL_RE.test(email || "")) return { gecerli: false, hata: "Geçerli e-posta giriniz" };
  if (!telefon || telefon.replace(/\D/g, "").length < 10) return { gecerli: false, hata: "Geçerli telefon giriniz" };
  if (!firmaTipiGecerliMi(firmaType)) return { gecerli: false, hata: "Geçerli firma tipi seçiniz" };
  return { gecerli: true };
}

/**
 * Reklam paketi fiyatı
 */
const PAKET_FIYATLARI = {
  baslangic: { aylik: 299, yillik: 2990, limit: 5 },
  standart: { aylik: 799, yillik: 7990, limit: 20 },
  premium: { aylik: 1999, yillik: 19990, limit: null }, // limitsiz
};

function paketFiyat(paket, periyot = "aylik") {
  const p = PAKET_FIYATLARI[paket];
  if (!p) return null;
  return { fiyat: p[periyot], limit: p.limit };
}

/**
 * İndirim hesaplama (yıllık)
 */
function yillikIndirimYüzdesi(paket) {
  const p = PAKET_FIYATLARI[paket];
  if (!p) return 0;
  const aylikYillik = p.aylik * 12;
  const yillik = p.yillik;
  return Math.round(((aylikYillik - yillik) / aylikYillik) * 100);
}

/**
 * Mümessil hedef bölgesi uyuşuyor mu?
 */
function bolgeUyusuyor(mumessil, doktor) {
  if (!mumessil.hedefBolgeler || mumessil.hedefBolgeler.length === 0) return true;
  if (!doktor.sehir) return false;
  return mumessil.hedefBolgeler.some(
    (b) => b.toLowerCase() === doktor.sehir.toLowerCase()
  );
}

/**
 * Uzmanlık hedefi uyuşuyor mu?
 */
function uzmanlikUyusuyor(mumessil, doktor) {
  if (!mumessil.hedefUzmanliklar || mumessil.hedefUzmanliklar.length === 0) return true;
  if (!doktor.uzmanlik) return false;
  return mumessil.hedefUzmanliklar.some(
    (u) => doktor.uzmanlik.toLowerCase().includes(u.toLowerCase())
  );
}

/**
 * Randevu talep formu doğrulama (mümessil → doktor randevusu)
 */
function mumessilRandevuGecerliMi({ konuSaati, konu, tarih }) {
  if (!konu || konu.trim().length < 5) return { gecerli: false, hata: "Konu açıklaması zorunlu (en az 5 karakter)" };
  if (!konuSaati || ![15, 30, 45, 60].includes(konuSaati)) return { gecerli: false, hata: "Geçerli süre seçiniz (15/30/45/60 dk)" };
  if (!tarih) return { gecerli: false, hata: "Tarih zorunlu" };
  const d = new Date(tarih);
  if (isNaN(d.getTime())) return { gecerli: false, hata: "Geçersiz tarih" };
  if (d < new Date()) return { gecerli: false, hata: "Geçmiş tarih seçilemez" };
  return { gecerli: true };
}

// ─────────────────────────────────────────────

describe("firmaTipiGecerliMi", () => {
  test("Bilinen tipler geçerli", () => {
    FIRMA_TIPLERI.forEach(t => expect(firmaTipiGecerliMi(t)).toBe(true));
  });

  test("Bilinmeyen tip geçersiz", () => {
    expect(firmaTipiGecerliMi("bilinmeyen")).toBe(false);
    expect(firmaTipiGecerliMi("")).toBe(false);
  });
});

describe("firmaBaşvuruGecerliMi", () => {
  const gecerli = {
    firmaAdi: "ABC İlaç A.Ş.",
    yetkiliAdi: "Ahmet Yılmaz",
    email: "info@abcilac.com",
    telefon: "05321234567",
    firmaType: "ilac",
  };

  test("Geçerli başvuru kabul edilir", () => {
    expect(firmaBaşvuruGecerliMi(gecerli).gecerli).toBe(true);
  });

  test("Eksik firma adı reddedilir", () => {
    expect(firmaBaşvuruGecerliMi({ ...gecerli, firmaAdi: "A" }).gecerli).toBe(false);
  });

  test("Geçersiz email reddedilir", () => {
    expect(firmaBaşvuruGecerliMi({ ...gecerli, email: "notanemail" }).gecerli).toBe(false);
  });

  test("Kısa telefon reddedilir", () => {
    expect(firmaBaşvuruGecerliMi({ ...gecerli, telefon: "123" }).gecerli).toBe(false);
  });

  test("Geçersiz firma tipi reddedilir", () => {
    expect(firmaBaşvuruGecerliMi({ ...gecerli, firmaType: "xxx" }).gecerli).toBe(false);
  });
});

describe("paketFiyat", () => {
  test("Başlangıç paketi aylık fiyat", () => {
    expect(paketFiyat("baslangic", "aylik").fiyat).toBe(299);
  });

  test("Premium yıllık fiyat", () => {
    expect(paketFiyat("premium", "yillik").fiyat).toBe(19990);
  });

  test("Premium limitsiz", () => {
    expect(paketFiyat("premium").limit).toBeNull();
  });

  test("Bilinmeyen paket → null", () => {
    expect(paketFiyat("bilinmeyen")).toBeNull();
  });
});

describe("yillikIndirimYüzdesi", () => {
  test("Başlangıç paketi yıllık indirim %17 civarı", () => {
    const ind = yillikIndirimYüzdesi("baslangic");
    expect(ind).toBeGreaterThan(0);
    expect(ind).toBeLessThan(30);
  });

  test("Bilinmeyen paket → 0", () => {
    expect(yillikIndirimYüzdesi("yok")).toBe(0);
  });
});

describe("bolgeUyusuyor", () => {
  test("Hedef bölgede olan doktor uyuşur", () => {
    expect(bolgeUyusuyor(
      { hedefBolgeler: ["İstanbul", "Ankara"] },
      { sehir: "İstanbul" }
    )).toBe(true);
  });

  test("Hedef bölge dışındaki doktor uyuşmaz", () => {
    expect(bolgeUyusuyor(
      { hedefBolgeler: ["İstanbul"] },
      { sehir: "İzmir" }
    )).toBe(false);
  });

  test("Hedef bölge yoksa hepsi uyuşur", () => {
    expect(bolgeUyusuyor({ hedefBolgeler: [] }, { sehir: "Trabzon" })).toBe(true);
  });
});

describe("uzmanlikUyusuyor", () => {
  test("Hedef uzmanlıkta olan doktor uyuşur", () => {
    expect(uzmanlikUyusuyor(
      { hedefUzmanliklar: ["Kardiyoloji"] },
      { uzmanlik: "Kardiyoloji" }
    )).toBe(true);
  });

  test("Kısmi eşleşme de kabul edilir", () => {
    expect(uzmanlikUyusuyor(
      { hedefUzmanliklar: ["KBB"] },
      { uzmanlik: "KBB Uzmanı" }
    )).toBe(true);
  });

  test("Uzmanlık listesi boşsa hepsi uyuşur", () => {
    expect(uzmanlikUyusuyor({ hedefUzmanliklar: [] }, { uzmanlik: "Ortopedi" })).toBe(true);
  });
});

describe("mumessilRandevuGecerliMi", () => {
  const gelecek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  test("Geçerli randevu talebi kabul edilir", () => {
    expect(mumessilRandevuGecerliMi({ konuSaati: 30, konu: "Yeni ürün tanıtımı", tarih: gelecek }).gecerli).toBe(true);
  });

  test("Kısa konu reddedilir", () => {
    expect(mumessilRandevuGecerliMi({ konuSaati: 30, konu: "Hay", tarih: gelecek }).gecerli).toBe(false);
  });

  test("Geçersiz süre reddedilir", () => {
    expect(mumessilRandevuGecerliMi({ konuSaati: 25, konu: "Test konusu", tarih: gelecek }).gecerli).toBe(false);
  });

  test("Geçmiş tarih reddedilir", () => {
    const gecmis = new Date(Date.now() - 86400000).toISOString();
    expect(mumessilRandevuGecerliMi({ konuSaati: 30, konu: "Test konusu", tarih: gecmis }).gecerli).toBe(false);
  });
});
