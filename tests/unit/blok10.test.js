// BLOK 10 — Hasta Paneli Unit Testleri

/**
 * Randevu durum etiketi (hasta görünümü)
 */
function randevuDurumEtiket(durum) {
  const MAP = {
    bekliyor: { metin: "Bekliyor", renk: "#D97706", bg: "#FEF3C7", ikon: "⏳" },
    onaylandi: { metin: "Onaylandı", renk: "#059669", bg: "#D1FAE5", ikon: "✓" },
    tamamlandi: { metin: "Tamamlandı", renk: "#1D4ED8", bg: "#DBEAFE", ikon: "✓✓" },
    iptal: { metin: "İptal Edildi", renk: "#DC2626", bg: "#FEE2E2", ikon: "✗" },
  };
  return MAP[durum] || { metin: durum, renk: "#6B7280", bg: "#F3F4F6", ikon: "?" };
}

/**
 * Randevu tarih formatı (hasta görünümü)
 */
function randevuTarihFormat(tarih, saat) {
  if (!tarih) return "Tarih belirtilmedi";
  const d = new Date(tarih);
  const gun = d.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return saat ? `${gun} – ${saat}` : gun;
}

/**
 * Hasta aktivite skoru (platform engagement)
 */
function hastaAktiviteSkoru(hasta) {
  let skor = 0;
  if (hasta.yorumSayisi > 0) skor += hasta.yorumSayisi * 10;
  if (hasta.soruSayisi > 0) skor += hasta.soruSayisi * 5;
  if (hasta.randevuSayisi > 0) skor += hasta.randevuSayisi * 3;
  if (hasta.profilTamam) skor += 20;
  return Math.min(skor, 100);
}

/**
 * Geçmiş randevular (tamamlanan)
 */
function gecmisRandevular(randevular) {
  return randevular.filter(r => r.durum === "tamamlandi");
}

/**
 * Aktif randevular (bekleyen + onaylı)
 */
function aktifRandevular(randevular) {
  return randevular.filter(r => r.durum === "bekliyor" || r.durum === "onaylandi");
}

/**
 * Yorum yazılabilir mi? (randevu tamamlandıktan sonra)
 */
function yorumYazilabilirMi(randevu) {
  if (randevu.durum !== "tamamlandi") return false;
  if (randevu.yorumYazildi) return false;
  return true;
}

/**
 * Randevu iptal edilebilir mi?
 */
function iptalEdilebilirMi(randevu) {
  if (randevu.durum !== "bekliyor" && randevu.durum !== "onaylandi") return false;
  if (!randevu.tarih) return true;
  const randevuTarih = new Date(randevu.tarih);
  const simdi = new Date();
  const fark = (randevuTarih - simdi) / (1000 * 60 * 60); // saat cinsinden
  return fark > 2; // 2 saat öncesine kadar iptal edilebilir
}

// ─────────────────────────────────────────────

describe("randevuDurumEtiket", () => {
  test("bekliyor durumu", () => {
    const e = randevuDurumEtiket("bekliyor");
    expect(e.metin).toBe("Bekliyor");
    expect(e.ikon).toBe("⏳");
  });

  test("onaylandi durumu", () => {
    expect(randevuDurumEtiket("onaylandi").metin).toBe("Onaylandı");
  });

  test("tamamlandi durumu", () => {
    expect(randevuDurumEtiket("tamamlandi").metin).toBe("Tamamlandı");
  });

  test("iptal durumu", () => {
    expect(randevuDurumEtiket("iptal").metin).toBe("İptal Edildi");
  });

  test("bilinmeyen durum → fallback", () => {
    const e = randevuDurumEtiket("belirsiz");
    expect(e.metin).toBe("belirsiz");
    expect(e.ikon).toBe("?");
  });
});

describe("randevuTarihFormat", () => {
  test("Tarih ve saat varsa ikisi de gösterilir", () => {
    const f = randevuTarihFormat("2025-06-15", "14:30");
    expect(f).toContain("14:30");
    expect(f).toContain("2025");
  });

  test("Sadece tarih varsa saat olmadan gösterilir", () => {
    const f = randevuTarihFormat("2025-06-15", null);
    expect(f).not.toContain("null");
  });

  test("Tarih yoksa uyarı döner", () => {
    expect(randevuTarihFormat(null, null)).toBe("Tarih belirtilmedi");
  });
});

describe("hastaAktiviteSkoru", () => {
  test("Yorum ağırlıklı hasta yüksek skor alır", () => {
    const skor = hastaAktiviteSkoru({ yorumSayisi: 5, soruSayisi: 0, randevuSayisi: 0, profilTamam: false });
    expect(skor).toBe(50);
  });

  test("Tam profilli ve aktif hasta maksimum skor", () => {
    const skor = hastaAktiviteSkoru({ yorumSayisi: 5, soruSayisi: 4, randevuSayisi: 3, profilTamam: true });
    expect(skor).toBeGreaterThanOrEqual(99); // cap at 100, bu kombinasyon 99
  });

  test("Yeni hasta sıfır skor", () => {
    expect(hastaAktiviteSkoru({ yorumSayisi: 0, soruSayisi: 0, randevuSayisi: 0, profilTamam: false })).toBe(0);
  });
});

describe("gecmisRandevular ve aktifRandevular", () => {
  const randevular = [
    { id: 1, durum: "bekliyor" },
    { id: 2, durum: "onaylandi" },
    { id: 3, durum: "tamamlandi" },
    { id: 4, durum: "iptal" },
    { id: 5, durum: "tamamlandi" },
  ];

  test("Geçmiş randevular sadece tamamlananlar", () => {
    expect(gecmisRandevular(randevular).length).toBe(2);
  });

  test("Aktif randevular bekliyor + onaylandi", () => {
    expect(aktifRandevular(randevular).length).toBe(2);
  });
});

describe("yorumYazilabilirMi", () => {
  test("Tamamlanan ve yorumsuz randevuya yorum yazılabilir", () => {
    expect(yorumYazilabilirMi({ durum: "tamamlandi", yorumYazildi: false })).toBe(true);
  });

  test("Zaten yorum yazılmışsa hayır", () => {
    expect(yorumYazilabilirMi({ durum: "tamamlandi", yorumYazildi: true })).toBe(false);
  });

  test("Tamamlanmamış randevuya yorum yazılamaz", () => {
    expect(yorumYazilabilirMi({ durum: "onaylandi", yorumYazildi: false })).toBe(false);
  });
});

describe("iptalEdilebilirMi", () => {
  test("Bekleyen randevu uzak tarihliyse iptal edilebilir", () => {
    const gelecek = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    expect(iptalEdilebilirMi({ durum: "bekliyor", tarih: gelecek })).toBe(true);
  });

  test("Tamamlanan randevu iptal edilemez", () => {
    const gelecek = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    expect(iptalEdilebilirMi({ durum: "tamamlandi", tarih: gelecek })).toBe(false);
  });

  test("2 saatten az kalan randevu iptal edilemez", () => {
    const yakin = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 dk sonra
    expect(iptalEdilebilirMi({ durum: "bekliyor", tarih: yakin })).toBe(false);
  });
});
