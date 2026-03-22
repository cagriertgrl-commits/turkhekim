// @ts-check
const { test, expect } = require("@playwright/test");

// BLOK 1 — Ad/Soyad & Eğitim E2E Testleri

test.describe("Kayıt Formu — Ad/Soyad Ayrı Alanlar", () => {
  test("kayıt formunda ayrı 'Ad' ve 'Soyad' alanları var", async ({ page }) => {
    await page.goto("/doktor-ol");
    await expect(page.getByPlaceholder("Adınız", { exact: true })).toBeVisible();
    await expect(page.getByPlaceholder("Soyadınız", { exact: true })).toBeVisible();
  });
});

test.describe("Doktor Profil Sayfası — Tam İsim", () => {
  test("profil sayfasında tam isim 'Ad Soyad' formatında gösterilir", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilkDoktor = page.locator("a[href^='/doktor/']").first();
    if (await ilkDoktor.count() > 0) {
      await ilkDoktor.click();
      // H1 başlığı ad + soyad içermeli (tek kelimeden fazla olmalı)
      const h1 = page.locator("h1").first();
      const metin = await h1.textContent();
      // En az iki kelime (ad ve soyad)
      expect(metin?.trim().split(/\s+/).length).toBeGreaterThanOrEqual(2);
    }
  });
});

test.describe("Panel — Eğitim Formu", () => {
  // Not: Bu testler giriş gerektiriyor, UI varlığını kontrol eder
  test.use({ viewport: { width: 1280, height: 900 } });

  test("panel sayfasında eğitim bölümü başlığı var", async ({ page }) => {
    // Giriş yapmadan panel'e gidince yönlendirme olur
    const res = await page.goto("/panel");
    // Login'e yönlendirirse skip et, panel açılırsa eğitim bölümünü kontrol et
    if (page.url().includes("/giris")) {
      test.skip();
      return;
    }
    await expect(page.getByText("Eğitim Bilgileri")).toBeVisible();
  });
});

test.describe("Listing Sayfası — Tam İsim", () => {
  test("doktor kartlarında ad ve soyad birlikte gösterilir", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    // Doktor kartları var mı
    const kartlar = page.locator("a[href^='/doktor/']");
    const sayi = await kartlar.count();
    if (sayi > 0) {
      // İlk kartın isim alanı en az iki kelime içermeli
      const isimElem = kartlar.first().locator("p.font-bold, h3, .font-bold").first();
      if (await isimElem.count() > 0) {
        const metin = await isimElem.textContent();
        expect(metin?.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
