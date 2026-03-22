// BLOK 3 — SSS & Yorum Sistemi Unit Testleri

/**
 * Yorum durum metinleri — kullanıcıya gösterilecek mesajlar
 */
function yorumDurumMetni(durum) {
  const metinler = {
    doktor_bekleniyor: "Yorumunuz alındı. Doktor bu kişiye muayene olup olmadığını onaylayacak.",
    moderasyon_bekliyor: "Doktor onayladı! Editöryal incelemeden sonra yayınlanacak.",
    onaylandi: "Yorumunuz yayınlandı. Teşekkürler!",
    reddedildi: "Yorumunuz yayınlanamadı.",
    hasta_belge_bekliyor: "Doktor muayene olmadığınızı belirtti. Belge göndererek itiraz edebilirsiniz.",
  };
  return metinler[durum] || "Bilinmeyen durum.";
}

/**
 * Yorum metni validasyonu
 */
function yorumMetniGecerliMi(metin) {
  if (!metin || typeof metin !== "string") return { gecerli: false, hata: "Metin zorunludur." };
  if (metin.trim().length < 20) return { gecerli: false, hata: "Yorum en az 20 karakter olmalıdır." };
  if (metin.trim().length > 500) return { gecerli: false, hata: "Yorum en fazla 500 karakter olabilir." };
  return { gecerli: true };
}

/**
 * Soru validasyonu
 */
function soruGecerliMi(soru) {
  if (!soru || typeof soru !== "string") return { gecerli: false, hata: "Soru zorunludur." };
  if (soru.trim().length < 10) return { gecerli: false, hata: "Soru en az 10 karakter olmalıdır." };
  return { gecerli: true };
}

/**
 * Şikayet kategorileri
 */
const SIKAYET_KATEGORILERI = [
  "hakaret",
  "yanlis_bilgi",
  "spam",
  "gizlilik_ihlali",
  "diger",
];

function sikayetGecerliMi({ yorum_id, kategori, aciklama }) {
  if (!yorum_id) return { gecerli: false, hata: "Yorum ID zorunludur." };
  if (!kategori || !SIKAYET_KATEGORILERI.includes(kategori)) return { gecerli: false, hata: "Geçerli bir kategori seçin." };
  if (!aciklama || aciklama.trim().length < 5) return { gecerli: false, hata: "Açıklama en az 5 karakter olmalıdır." };
  return { gecerli: true };
}

// ─────────────────────────────────────────────

describe("yorumDurumMetni", () => {
  test("doktor_bekleniyor → doktor onayı bekleniyor mesajı", () => {
    const metin = yorumDurumMetni("doktor_bekleniyor");
    expect(metin).toContain("Doktor");
    expect(metin).toContain("onaylayacak");
  });

  test("moderasyon_bekliyor → moderasyon mesajı", () => {
    const metin = yorumDurumMetni("moderasyon_bekliyor");
    expect(metin).toContain("onayladı");
  });

  test("onaylandi → yayınlandı mesajı", () => {
    expect(yorumDurumMetni("onaylandi")).toContain("yayınlandı");
  });

  test("reddedildi → yayınlanamadı mesajı", () => {
    expect(yorumDurumMetni("reddedildi")).toContain("yayınlanamadı");
  });

  test("hasta_belge_bekliyor → itiraz mesajı", () => {
    expect(yorumDurumMetni("hasta_belge_bekliyor")).toContain("itiraz");
  });

  test("bilinmeyen durum → fallback", () => {
    expect(yorumDurumMetni("xyz")).toBe("Bilinmeyen durum.");
  });
});

describe("yorumMetniGecerliMi", () => {
  test("20 karakterden kısa → geçersiz", () => {
    const { gecerli, hata } = yorumMetniGecerliMi("Kısa yorum");
    expect(gecerli).toBe(false);
    expect(hata).toContain("20 karakter");
  });

  test("500 karakterden uzun → geçersiz", () => {
    const uzun = "a".repeat(501);
    expect(yorumMetniGecerliMi(uzun).gecerli).toBe(false);
  });

  test("20-500 karakter arası → geçerli", () => {
    const { gecerli } = yorumMetniGecerliMi("Bu muayene harika geçti, çok memnun kaldım.");
    expect(gecerli).toBe(true);
  });

  test("boş string → geçersiz", () => {
    expect(yorumMetniGecerliMi("").gecerli).toBe(false);
  });

  test("null → geçersiz", () => {
    expect(yorumMetniGecerliMi(null).gecerli).toBe(false);
  });
});

describe("soruGecerliMi", () => {
  test("10 karakterden kısa → geçersiz", () => {
    expect(soruGecerliMi("Kısa?").gecerli).toBe(false);
  });

  test("10+ karakter → geçerli", () => {
    expect(soruGecerliMi("Bu hastalık için hangi ilaç önerilir?").gecerli).toBe(true);
  });

  test("boş → geçersiz", () => {
    expect(soruGecerliMi("").gecerli).toBe(false);
  });
});

describe("sikayetGecerliMi", () => {
  test("geçerli şikayet → tamam", () => {
    const { gecerli } = sikayetGecerliMi({ yorum_id: 1, kategori: "hakaret", aciklama: "Hakaret içeriyor" });
    expect(gecerli).toBe(true);
  });

  test("yorum_id yok → geçersiz", () => {
    expect(sikayetGecerliMi({ kategori: "spam", aciklama: "Spam içerik" }).gecerli).toBe(false);
  });

  test("bilinmeyen kategori → geçersiz", () => {
    expect(sikayetGecerliMi({ yorum_id: 1, kategori: "saldiri", aciklama: "Saldırgan metin" }).gecerli).toBe(false);
  });

  test("kısa açıklama → geçersiz", () => {
    expect(sikayetGecerliMi({ yorum_id: 1, kategori: "spam", aciklama: "Sp" }).gecerli).toBe(false);
  });

  test("tüm kategoriler geçerli", () => {
    for (const kat of SIKAYET_KATEGORILERI) {
      const { gecerli } = sikayetGecerliMi({ yorum_id: 1, kategori: kat, aciklama: "Açıklama metni yeterli" });
      expect(gecerli).toBe(true);
    }
  });
});
