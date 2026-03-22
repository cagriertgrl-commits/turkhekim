// Helper fonksiyon testleri

function formatDeneyim(d) {
  if (!d) return d;
  const s = d.toString().trim();
  return /^\d+$/.test(s) ? `${s} yıl` : s;
}

function slugify(s = "") {
  return s.toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

describe("formatDeneyim", () => {
  test("sadece sayı → yıl ekler", () => {
    expect(formatDeneyim("13")).toBe("13 yıl");
    expect(formatDeneyim("5")).toBe("5 yıl");
  });

  test("zaten yıl içeriyorsa dokunmaz", () => {
    expect(formatDeneyim("10 yıl")).toBe("10 yıl");
    expect(formatDeneyim("5+ yıl")).toBe("5+ yıl");
  });

  test("null/undefined → olduğu gibi döner", () => {
    expect(formatDeneyim(null)).toBeNull();
    expect(formatDeneyim(undefined)).toBeUndefined();
  });

  test("sayı tipi de çalışır", () => {
    expect(formatDeneyim(8)).toBe("8 yıl");
  });
});

describe("slugify", () => {
  test("Türkçe karakterleri dönüştürür", () => {
    expect(slugify("KBB Uzmanı")).toBe("kbb-uzmani");
    expect(slugify("Göz Hastalıkları")).toBe("goz-hastaliklari");
    expect(slugify("Çocuk Sağlığı")).toBe("cocuk-sagligi");
  });

  test("boşlukları tirele", () => {
    expect(slugify("Plastik Cerrahi")).toBe("plastik-cerrahi");
  });

  test("boş string → boş string", () => {
    expect(slugify("")).toBe("");
  });
});
