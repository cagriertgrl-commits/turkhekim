// BLOK 8 — Şehir Görselleri & Listing İçerik Testleri

/**
 * Şehir slug → görüntülenecek ad
 */
const SEHIR_MAP = {
  istanbul: "İstanbul",
  ankara: "Ankara",
  izmir: "İzmir",
  bursa: "Bursa",
  antalya: "Antalya",
  adana: "Adana",
  konya: "Konya",
  gaziantep: "Gaziantep",
  mersin: "Mersin",
  kayseri: "Kayseri",
  trabzon: "Trabzon",
  diyarbakir: "Diyarbakır",
  samsun: "Samsun",
  eskisehir: "Eskişehir",
};

function slugdenSehirAd(slug) {
  return SEHIR_MAP[slug.toLowerCase()] || (slug.charAt(0).toUpperCase() + slug.slice(1));
}

/**
 * Uzmanlık slug → görüntülenecek ad
 */
const UZMANLIK_MAP = {
  "kbb-uzmani": "KBB Uzmanı",
  "kardiyoloji": "Kardiyoloji",
  "ortopedi": "Ortopedi",
  "dermatoloji": "Dermatoloji",
  "goz-hastaliklari": "Göz Hastalıkları",
  "plastik-cerrahi": "Plastik Cerrahi",
  "noroloji": "Nöroloji",
  "psikiyatri": "Psikiyatri",
  "dis-hekimi": "Diş Hekimi",
  "rinoplasti": "Rinoplasti",
};

function slugdenUzmanlikAd(slug) {
  return UZMANLIK_MAP[slug.toLowerCase()] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Meta description üreteci
 */
function metaDescription(sehirAd, uzmanlikAd, doktorSayisi) {
  const sayi = doktorSayisi > 0 ? `${doktorSayisi} doktor` : "doktorlar";
  return `${sehirAd} ${uzmanlikAd} — ${sayi}. Doğrulanmış yorumlar ve kolay randevu. DoktorPusula.`;
}

/**
 * Şehir için istatistik özeti
 */
function sehirIstatistik(doktorlar) {
  const onaylananlar = doktorlar.filter(d => d.onaylandi);
  const ortalamaPuan = onaylananlar.length > 0
    ? (onaylananlar.reduce((s, d) => s + parseFloat(d.puan || 0), 0) / onaylananlar.length).toFixed(1)
    : null;
  return {
    toplam: doktorlar.length,
    onaylanan: onaylananlar.length,
    ortalamaPuan,
    online: doktorlar.filter(d => d.online_randevu).length,
  };
}

// ─────────────────────────────────────────────

describe("slugdenSehirAd", () => {
  test("istanbul → İstanbul", () => {
    expect(slugdenSehirAd("istanbul")).toBe("İstanbul");
  });

  test("izmir → İzmir (Türkçe harf)", () => {
    expect(slugdenSehirAd("izmir")).toBe("İzmir");
  });

  test("bilinmeyen slug → capitalize edilmiş", () => {
    expect(slugdenSehirAd("kastamonu")).toBe("Kastamonu");
  });

  test("büyük harf girdi → tolere edilir", () => {
    expect(slugdenSehirAd("ANKARA")).toBe("Ankara");
  });
});

describe("slugdenUzmanlikAd", () => {
  test("kbb-uzmani → KBB Uzmanı", () => {
    expect(slugdenUzmanlikAd("kbb-uzmani")).toBe("KBB Uzmanı");
  });

  test("goz-hastaliklari → Göz Hastalıkları", () => {
    expect(slugdenUzmanlikAd("goz-hastaliklari")).toBe("Göz Hastalıkları");
  });

  test("bilinmeyen slug → stresten ayrılarak capitalize", () => {
    const sonuc = slugdenUzmanlikAd("kalp-damar");
    expect(sonuc).toContain("Kalp");
    expect(sonuc).toContain("Damar");
  });
});

describe("metaDescription", () => {
  test("doktor sayısı varsa dahil edilir", () => {
    const desc = metaDescription("İstanbul", "KBB Uzmanı", 15);
    expect(desc).toContain("İstanbul");
    expect(desc).toContain("KBB Uzmanı");
    expect(desc).toContain("15 doktor");
  });

  test("doktor yok → genel metin", () => {
    const desc = metaDescription("Konya", "Kardiyoloji", 0);
    expect(desc).toContain("Konya");
    expect(desc).not.toContain("0 doktor");
  });
});

describe("sehirIstatistik", () => {
  const ornekDoktorlar = [
    { onaylandi: true, puan: "4.8", online_randevu: true },
    { onaylandi: true, puan: "4.6", online_randevu: false },
    { onaylandi: false, puan: null, online_randevu: false },
  ];

  test("toplam sayı doğru", () => {
    expect(sehirIstatistik(ornekDoktorlar).toplam).toBe(3);
  });

  test("onaylanan sayı doğru", () => {
    expect(sehirIstatistik(ornekDoktorlar).onaylanan).toBe(2);
  });

  test("ortalama puan hesaplanır", () => {
    const ist = sehirIstatistik(ornekDoktorlar);
    expect(parseFloat(ist.ortalamaPuan)).toBeCloseTo(4.7, 1);
  });

  test("online sayı doğru", () => {
    expect(sehirIstatistik(ornekDoktorlar).online).toBe(1);
  });

  test("boş liste → sıfırlar", () => {
    const ist = sehirIstatistik([]);
    expect(ist.toplam).toBe(0);
    expect(ist.ortalamaPuan).toBeNull();
  });
});
