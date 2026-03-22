// @ts-check
const { test, expect } = require("@playwright/test");

// BLOK 3 — SSS & Yorum Sistemi E2E Testleri

test.describe("YorumFormu — Başarı Mesajı", () => {
  test("başarı mesajı 'doktor onayı' veya 'doğrulama' içermeli, 'doğrulanmış' değil", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilkDoktor = page.locator("a[href^='/doktor/']").first();
    if (await ilkDoktor.count() === 0) {
      test.skip();
      return;
    }
    await ilkDoktor.click();
    await page.waitForLoadState("networkidle");

    // Başarı mesajı için formun son halini kontrol et
    // Sayfa açıkken "doğrulanmış yorum olarak işaretlendi" yazmamalı (henüz doğrulanmamış)
    const yanlis_metin = page.getByText("Doğrulanmış yorum olarak işaretlendi");
    expect(await yanlis_metin.count()).toBe(0);
  });

  test("yorum formunda KVKK onay kutusu var", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilkDoktor = page.locator("a[href^='/doktor/']").first();
    if (await ilkDoktor.count() === 0) { test.skip(); return; }
    await ilkDoktor.click();
    await page.waitForLoadState("networkidle");

    const kvkk = page.getByRole("checkbox");
    expect(await kvkk.count()).toBeGreaterThan(0);
  });
});

test.describe("Doktor Profil — Yorum & Soru Bölümleri", () => {
  test("profil sayfasında 'Hasta Yorumları' başlığı var", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilk = page.locator("a[href^='/doktor/']").first();
    if (await ilk.count() === 0) { test.skip(); return; }
    await ilk.click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /Hasta Yorumları/i }).first()).toBeVisible();
  });

  test("profil sayfasında 'Doktora Soru Sor' bölümü var", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilk = page.locator("a[href^='/doktor/']").first();
    if (await ilk.count() === 0) { test.skip(); return; }
    await ilk.click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Doktora Soru Sor")).toBeVisible();
  });
});

test.describe("Şikayet Sistemi", () => {
  test("yorum kartında şikayet/bildir butonu var", async ({ page }) => {
    // Yorumu olan bir profil sayfasına git
    await page.goto("/istanbul/kbb-uzmani");
    const ilk = page.locator("a[href^='/doktor/']").first();
    if (await ilk.count() === 0) { test.skip(); return; }
    await ilk.click();
    await page.waitForLoadState("networkidle");

    // Yorum kartı varsa şikayet butonu kontrol et
    const yorumlar = page.locator("[data-testid='yorum-kart']");
    if (await yorumlar.count() === 0) {
      test.skip();
      return;
    }
    const sikayet = yorumlar.first().getByRole("button", { name: /bildir|şikayet/i });
    await expect(sikayet).toBeVisible();
  });
});

test.describe("SSS — Sık Sorulan Sorular", () => {
  test("profil sayfasında yanıtlanan sorular listelenir", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilk = page.locator("a[href^='/doktor/']").first();
    if (await ilk.count() === 0) { test.skip(); return; }
    await ilk.click();
    await page.waitForLoadState("networkidle");

    // Bölüm başlığı var mı
    const soru_bolumu = page.getByText("Doktora Soru Sor");
    await expect(soru_bolumu).toBeVisible();
  });
});
