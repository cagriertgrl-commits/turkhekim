// BLOK 2 — Uzmanlık Arama & Alias Sistemi Unit Testleri

// Türkçe karakter normalizasyonu
function normalize(str) {
  if (!str) return "";
  return str
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
}

// Alias sözlüğü (test için küçük subset)
const BRANS_SOZLUGU = [
  { kanonikal: "KBB Uzmanı", gorunum: "KBB (Kulak Burun Boğaz)", slug: "kbb-uzmani", aliases: ["kbb", "kulak burun bogaz", "otolaringoloji", "ent"] },
  { kanonikal: "Dahiliye", gorunum: "Dahiliye (İç Hastalıkları)", slug: "dahiliye", aliases: ["dahiliye", "ic hastaliklari", "internal medicine"] },
  { kanonikal: "Dermatoloji", gorunum: "Dermatoloji (Cildiye)", slug: "dermatoloji", aliases: ["dermatoloji", "cildiye", "deri hastaliklari"] },
  { kanonikal: "Kardiyoloji", gorunum: "Kardiyoloji", slug: "kardiyoloji", aliases: ["kardiyoloji", "kalp", "kalp damar"] },
];

function aramaYap(sorgu, sozluk) {
  const norm = normalize(sorgu);
  if (!norm) return [];

  const sonuclar = [];
  for (const brans of sozluk) {
    const kanonNorm = normalize(brans.kanonikal);
    let skor = 0;

    // Tam eşleşme
    if (kanonNorm === norm) skor = 3;
    // Baştan eşleşme
    else if (kanonNorm.startsWith(norm)) skor = 2;
    // Kısmi eşleşme (kanonikal)
    else if (kanonNorm.includes(norm)) skor = 2;
    // Alias eşleşmesi
    else if (brans.aliases.some(a => normalize(a).includes(norm))) skor = 1;

    if (skor > 0) sonuclar.push({ ...brans, skor });
  }

  return sonuclar.sort((a, b) => b.skor - a.skor);
}

describe("normalize", () => {
  test("Türkçe karakterleri dönüştürür", () => {
    expect(normalize("KBB Uzmanı")).toBe("kbb uzmani");
    expect(normalize("Göz Hastalıkları")).toBe("goz hastaliklari");
    expect(normalize("Çocuk Sağlığı")).toBe("cocuk sagligi");
    expect(normalize("Şeker")).toBe("seker");
  });
  test("büyük harf → küçük harf", () => {
    expect(normalize("KARDİYOLOJİ")).toBe("kardiyoloji");
  });
  test("boş string → boş string", () => {
    expect(normalize("")).toBe("");
    expect(normalize(null)).toBe("");
  });
});

describe("aramaYap — alias sistemi", () => {
  test("'K' yazınca KBB ve Kardiyoloji çıkar", () => {
    const sonuc = aramaYap("K", BRANS_SOZLUGU);
    const isimler = sonuc.map(s => s.kanonikal);
    expect(isimler).toContain("KBB Uzmanı");
    expect(isimler).toContain("Kardiyoloji");
  });

  test("'cildiye' yazınca Dermatoloji çıkar (alias)", () => {
    const sonuc = aramaYap("cildiye", BRANS_SOZLUGU);
    expect(sonuc.map(s => s.kanonikal)).toContain("Dermatoloji");
  });

  test("'dermatoloji' yazınca Dermatoloji çıkar (direkt)", () => {
    const sonuc = aramaYap("dermatoloji", BRANS_SOZLUGU);
    expect(sonuc[0].kanonikal).toBe("Dermatoloji");
  });

  test("'iç' yazınca Dahiliye çıkar (alias: iç hastalıkları)", () => {
    const sonuc = aramaYap("iç", BRANS_SOZLUGU);
    expect(sonuc.map(s => s.kanonikal)).toContain("Dahiliye");
  });

  test("'kalp' yazınca Kardiyoloji çıkar (alias)", () => {
    const sonuc = aramaYap("kalp", BRANS_SOZLUGU);
    expect(sonuc.map(s => s.kanonikal)).toContain("Kardiyoloji");
  });

  test("tam eşleşme daha yüksek skor alır", () => {
    const sonuc = aramaYap("KBB", BRANS_SOZLUGU);
    expect(sonuc[0].kanonikal).toBe("KBB Uzmanı");
    expect(sonuc[0].skor).toBeGreaterThanOrEqual(2);
  });

  test("boş sorgu → boş sonuç", () => {
    expect(aramaYap("", BRANS_SOZLUGU)).toEqual([]);
  });

  test("görünüm formatı parantez içi gösterir", () => {
    const kbb = BRANS_SOZLUGU.find(b => b.slug === "kbb-uzmani");
    expect(kbb.gorunum).toContain("KBB");
    expect(kbb.gorunum).toContain("Kulak Burun Boğaz");
  });
});
