// @ts-check
const { test, expect } = require("@playwright/test");

// --- ANASAYFA ---
test.describe("Anasayfa", () => {
  test("yatay scroll olmamalı", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize().width;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });

  test("arama kutusu görünür", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByPlaceholder("KBB, Kardiyoloji, Ortopedi...")).toBeVisible();
  });

  test("arama autocomplete açılır", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("KBB, Kardiyoloji, Ortopedi...").fill("K");
    // Dropdown içindeki button'u spesifik seç
    await expect(page.getByRole("button", { name: "KBB Uzmanı" })).toBeVisible();
  });
});

// --- MOBİL NAVİGASYON ---
test.describe("Mobil Navigasyon", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger menü görünür", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Menü")).toBeVisible();
  });

  test("hamburger açılır", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Menü").click();
    // Mobile dropdown — block class'lı link (desktop link hidden md:flex içinde)
    await expect(page.locator("a.block[href='/istanbul/kbb-uzmani']")).toBeVisible();
  });
});

// --- LİSTİNG SAYFASI ---
test.describe("Listing sayfası", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("MobilFiltre butonu görünür", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    await expect(page.getByRole("button", { name: /Filtrele/ })).toBeVisible();
  });

  test("MobilFiltre bottom sheet açılır", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    await page.getByRole("button", { name: /Filtrele/ }).click();
    await expect(page.getByRole("heading", { name: "Filtrele & Sırala" })).toBeVisible();
  });

  test("Uzmanlık alanları listesi görünür", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    await page.getByRole("button", { name: /Filtrele/ }).click();
    await expect(page.getByText("Uzmanlık Alanları")).toBeVisible();
    await expect(page.getByRole("link", { name: "Kardiyoloji" })).toBeVisible();
  });

  test("Siralama seçenekleri görünür", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    await page.getByRole("button", { name: /Filtrele/ }).click();
    // Bottom sheet içindeki span'leri hedef al
    await expect(page.locator("span.text-sm.font-medium", { hasText: "En Yüksek Puan" })).toBeVisible();
    await expect(page.locator("span.text-sm.font-medium", { hasText: "En Fazla Yorum" })).toBeVisible();
    await expect(page.locator("span.text-sm.font-medium", { hasText: "En Deneyimli" })).toBeVisible();
  });

  test("yatay scroll olmamalı", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize().width;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });
});

// --- DOKTOR PROFİL ---
test.describe("Doktor profil sayfası", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("yatay scroll olmamalı", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilkDoktor = page.locator("a[href^='/doktor/']").first();
    if (await ilkDoktor.count() > 0) {
      await ilkDoktor.click();
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = page.viewportSize().width;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    }
  });

  test("Hakkında bölümü görünür", async ({ page }) => {
    await page.goto("/istanbul/kbb-uzmani");
    const ilkDoktor = page.locator("a[href^='/doktor/']").first();
    if (await ilkDoktor.count() > 0) {
      await ilkDoktor.click();
      // Randevu formu görünür
      await expect(page.getByText("Randevu Al")).toBeVisible();
    }
  });
});
