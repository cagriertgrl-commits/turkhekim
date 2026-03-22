// BLOK 9 — Doktor Feed (Paylaşımlar) Unit Testleri

/**
 * Paylaşım slug üretici
 */
function slugUret(baslik) {
  if (!baslik || !baslik.trim()) return "";
  const TR_MAP = { ğ: "g", ü: "u", ş: "s", ı: "i", ö: "o", ç: "c", â: "a", î: "i", û: "u" };
  return baslik
    .toLowerCase()
    .replace(/[ğüşıöçâîû]/g, (c) => TR_MAP[c] || c)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/**
 * Paylaşım içerik doğrulama
 */
function paylasimiGecerliMi({ baslik, icerik, kategori }) {
  const KATEGORILER = ["saglik-ipucu", "haber", "duyuru", "tedavi", "beslenme", "egzersiz"];
  if (!baslik || baslik.trim().length < 5) return { gecerli: false, hata: "Başlık en az 5 karakter olmalı" };
  if (!icerik || icerik.trim().length < 50) return { gecerli: false, hata: "İçerik en az 50 karakter olmalı" };
  if (!KATEGORILER.includes(kategori)) return { gecerli: false, hata: "Geçersiz kategori" };
  return { gecerli: true };
}

/**
 * Kategori etiketi
 */
function kategoriEtiket(kategori) {
  const MAP = {
    "saglik-ipucu": "💡 Sağlık İpucu",
    "haber": "📰 Haber",
    "duyuru": "📢 Duyuru",
    "tedavi": "💊 Tedavi",
    "beslenme": "🥗 Beslenme",
    "egzersiz": "🏃 Egzersiz",
  };
  return MAP[kategori] || kategori;
}

/**
 * Feed özet metni (ilk N karakter)
 */
function feedOzet(icerik, uzunluk = 150) {
  if (!icerik) return "";
  const temiz = icerik.replace(/\s+/g, " ").trim();
  return temiz.length <= uzunluk ? temiz : temiz.slice(0, uzunluk).trimEnd() + "…";
}

/**
 * Okuma süresi tahmini
 */
function okumaSuresi(icerik) {
  if (!icerik) return 0;
  const kelimeSayisi = icerik.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(kelimeSayisi / 200)); // 200 kelime/dk
}

/**
 * Feed istatistikleri
 */
function feedIstatistik(paylasimlari) {
  return {
    toplam: paylasimlari.length,
    kategoriler: [...new Set(paylasimlari.map(p => p.kategori))].length,
    toplamOkunma: paylasimlari.reduce((s, p) => s + (p.okunma || 0), 0),
    enPopuler: paylasimlari.length > 0
      ? paylasimlari.reduce((max, p) => (p.okunma || 0) > (max.okunma || 0) ? p : max, paylasimlari[0])
      : null,
  };
}

// ─────────────────────────────────────────────

describe("slugUret", () => {
  test("Türkçe karakter dönüşümü", () => {
    expect(slugUret("Sağlıklı Beslenme İpuçları")).toBe("saglikli-beslenme-ipuclari");
  });

  test("Boşluk → tire", () => {
    expect(slugUret("kalp sağlığı")).toBe("kalp-sagligi");
  });

  test("Boş input → boş string", () => {
    expect(slugUret("")).toBe("");
    expect(slugUret(null)).toBe("");
  });

  test("80 karakter sınırı", () => {
    const uzun = "a".repeat(100);
    expect(slugUret(uzun).length).toBeLessThanOrEqual(80);
  });

  test("Özel karakter temizleme", () => {
    const slug = slugUret("Sağlık & Fitness (2024)!");
    expect(slug).not.toContain("&");
    expect(slug).not.toContain("!");
    expect(slug).not.toContain("(");
  });
});

describe("paylasimiGecerliMi", () => {
  const gecerli = {
    baslik: "Kış aylarında bağışıklık güçlendirme",
    icerik: "Kış aylarında bağışıklık sistemini güçlendirmek için düzenli egzersiz yapmalı, C vitamini içeren besinler tüketmeli ve yeterli uyku almalısınız.",
    kategori: "saglik-ipucu",
  };

  test("Geçerli paylaşım kabul edilir", () => {
    expect(paylasimiGecerliMi(gecerli).gecerli).toBe(true);
  });

  test("Kısa başlık reddedilir", () => {
    const sonuc = paylasimiGecerliMi({ ...gecerli, baslik: "Sağ" });
    expect(sonuc.gecerli).toBe(false);
    expect(sonuc.hata).toContain("5 karakter");
  });

  test("Kısa içerik reddedilir", () => {
    const sonuc = paylasimiGecerliMi({ ...gecerli, icerik: "Kısa" });
    expect(sonuc.gecerli).toBe(false);
    expect(sonuc.hata).toContain("50 karakter");
  });

  test("Geçersiz kategori reddedilir", () => {
    const sonuc = paylasimiGecerliMi({ ...gecerli, kategori: "bilinmeyen" });
    expect(sonuc.gecerli).toBe(false);
    expect(sonuc.hata).toContain("kategori");
  });

  test("Tüm kategoriler geçerli", () => {
    ["saglik-ipucu", "haber", "duyuru", "tedavi", "beslenme", "egzersiz"].forEach(k => {
      expect(paylasimiGecerliMi({ ...gecerli, kategori: k }).gecerli).toBe(true);
    });
  });
});

describe("kategoriEtiket", () => {
  test("Bilinen kategoriler emoji ile döner", () => {
    expect(kategoriEtiket("saglik-ipucu")).toContain("Sağlık İpucu");
    expect(kategoriEtiket("beslenme")).toContain("Beslenme");
  });

  test("Bilinmeyen kategori olduğu gibi döner", () => {
    expect(kategoriEtiket("diger")).toBe("diger");
  });
});

describe("feedOzet", () => {
  test("Kısa içerik olduğu gibi döner", () => {
    expect(feedOzet("Kısa metin")).toBe("Kısa metin");
  });

  test("Uzun içerik kesilir ve … eklenir", () => {
    const uzun = "a ".repeat(100).trim();
    const ozet = feedOzet(uzun, 50);
    expect(ozet.endsWith("…")).toBe(true);
    expect(ozet.length).toBeLessThanOrEqual(51);
  });

  test("Boş içerik → boş string", () => {
    expect(feedOzet(null)).toBe("");
    expect(feedOzet("")).toBe("");
  });
});

describe("okumaSuresi", () => {
  test("200 kelimelik içerik → 1 dakika", () => {
    const icerik = "kelime ".repeat(200).trim();
    expect(okumaSuresi(icerik)).toBe(1);
  });

  test("400 kelimelik içerik → 2 dakika", () => {
    const icerik = "kelime ".repeat(400).trim();
    expect(okumaSuresi(icerik)).toBe(2);
  });

  test("Boş içerik → 0", () => {
    expect(okumaSuresi("")).toBe(0);
    expect(okumaSuresi(null)).toBe(0);
  });

  test("Çok kısa içerik → en az 1 dakika", () => {
    expect(okumaSuresi("Kısa metin")).toBe(1);
  });
});

describe("feedIstatistik", () => {
  const ornekPaylasimlari = [
    { kategori: "saglik-ipucu", okunma: 250 },
    { kategori: "beslenme", okunma: 180 },
    { kategori: "saglik-ipucu", okunma: 95 },
  ];

  test("Toplam sayı doğru", () => {
    expect(feedIstatistik(ornekPaylasimlari).toplam).toBe(3);
  });

  test("Benzersiz kategori sayısı doğru", () => {
    expect(feedIstatistik(ornekPaylasimlari).kategoriler).toBe(2);
  });

  test("Toplam okunma doğru", () => {
    expect(feedIstatistik(ornekPaylasimlari).toplamOkunma).toBe(525);
  });

  test("En popüler paylaşım doğru", () => {
    expect(feedIstatistik(ornekPaylasimlari).enPopuler.okunma).toBe(250);
  });

  test("Boş liste → null enPopuler", () => {
    const ist = feedIstatistik([]);
    expect(ist.toplam).toBe(0);
    expect(ist.enPopuler).toBeNull();
  });
});
