// BLOK 1 — Ad/Soyad & Eğitim Sistemi Unit Testleri

// formatTamIsim: unvan + ad + soyad → "Uzm. Dr. Ali Yılmaz"
function formatTamIsim(unvan, ad, soyad) {
  const isim = [ad, soyad].filter(Boolean).join(" ");
  return unvan ? `${unvan} ${isim}` : isim;
}

// egitimGorunumu: egitim JSON'dan görünecek satırları döner
function egitimGorunumu(egitim) {
  if (!egitim) return [];
  const satirlar = [];
  if (egitim.lise?.goster && egitim.lise?.okul)
    satirlar.push(`Lise: ${egitim.lise.okul}${egitim.lise.sehir ? ` — ${egitim.lise.sehir}` : ""}`);
  if (egitim.universite?.goster && egitim.universite?.universite)
    satirlar.push(`Tıp Fakültesi: ${egitim.universite.universite}`);
  if (egitim.uzmanlik?.goster && egitim.uzmanlik?.dal)
    satirlar.push(`Uzmanlık: ${egitim.uzmanlik.dal}${egitim.uzmanlik.kurum ? ` — ${egitim.uzmanlik.kurum}` : ""}`);
  if (egitim.yan_dal?.length)
    egitim.yan_dal.filter(y => y.goster && y.dal).forEach(y =>
      satirlar.push(`Yan Dal: ${y.dal}${y.kurum ? ` — ${y.kurum}` : ""}`)
    );
  return satirlar;
}

describe("formatTamIsim", () => {
  test("unvan + ad + soyad tam format", () => {
    expect(formatTamIsim("Uzm. Dr.", "Ali", "Yılmaz")).toBe("Uzm. Dr. Ali Yılmaz");
  });
  test("unvansız ad + soyad", () => {
    expect(formatTamIsim("", "Ayşe", "Kaya")).toBe("Ayşe Kaya");
  });
  test("sadece ad (soyad boş)", () => {
    expect(formatTamIsim("", "Mehmet", "")).toBe("Mehmet");
  });
  test("null soyad ile çalışır", () => {
    expect(formatTamIsim("Dr.", "Emine", null)).toBe("Dr. Emine");
  });
});

describe("egitimGorunumu", () => {
  test("null egitim → boş dizi", () => {
    expect(egitimGorunumu(null)).toEqual([]);
  });

  test("lise goster=true → satır eklenir", () => {
    const egitim = { lise: { okul: "Ankara Lisesi", sehir: "Ankara", goster: true } };
    const result = egitimGorunumu(egitim);
    expect(result).toContain("Lise: Ankara Lisesi — Ankara");
  });

  test("lise goster=false → satır eklenmez", () => {
    const egitim = { lise: { okul: "Ankara Lisesi", sehir: "Ankara", goster: false } };
    const result = egitimGorunumu(egitim);
    expect(result.some(s => s.includes("Lise"))).toBe(false);
  });

  test("üniversite ve uzmanlık görünür", () => {
    const egitim = {
      universite: { universite: "Hacettepe Üniversitesi", goster: true },
      uzmanlik: { dal: "KBB", kurum: "Ankara Hastanesi", goster: true },
    };
    const result = egitimGorunumu(egitim);
    expect(result).toContain("Tıp Fakültesi: Hacettepe Üniversitesi");
    expect(result).toContain("Uzmanlık: KBB — Ankara Hastanesi");
  });

  test("yan dal listesi desteklenir", () => {
    const egitim = {
      yan_dal: [
        { dal: "Rinoloji", kurum: "Cerrahpaşa", goster: true },
        { dal: "Otoloji", kurum: "", goster: false },
      ],
    };
    const result = egitimGorunumu(egitim);
    expect(result).toContain("Yan Dal: Rinoloji — Cerrahpaşa");
    expect(result.some(s => s.includes("Otoloji"))).toBe(false);
  });

  test("sıra doğru: lise → üniversite → uzmanlık → yan dal", () => {
    const egitim = {
      lise: { okul: "XLise", goster: true },
      universite: { universite: "XÜni", goster: true },
      uzmanlik: { dal: "XDal", goster: true },
      yan_dal: [{ dal: "XYan", goster: true }],
    };
    const result = egitimGorunumu(egitim);
    expect(result[0]).toMatch(/Lise/);
    expect(result[1]).toMatch(/Fakülte/);
    expect(result[2]).toMatch(/Uzmanl/);
    expect(result[3]).toMatch(/Yan Dal/);
  });
});
