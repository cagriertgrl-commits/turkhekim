/**
 * Paket tanımları — fiyat ve özellikler tek yerde.
 */

export const PAKETLER = {
  premium: {
    slug: "premium",
    ad: "Premium",
    aylikFiyat: 299,
    yillikFiyat: 2990, // 2 ay ücretsiz
    aciklama: "Daha fazla görünürlük, AI asistan ve gelişmiş profil",
    ozellikler: [
      "Limitsiz randevu",
      "Öne çıkan profil rozeti",
      "Doğrulanmış hasta yorumu",
      "AI asistan (malpraktis hukuku)",
      "Gelişmiş analitik",
      "Profil tema seçimi",
    ],
  },
  pro: {
    slug: "pro",
    ad: "Pro",
    aylikFiyat: 599,
    yillikFiyat: 5990,
    aciklama: "Premium + lead yönetimi ve çoklu klinik",
    ozellikler: [
      "Premium'daki her şey",
      "Lead yönetimi paneli",
      "Çoklu klinik desteği",
      "WhatsApp randevu otomasyonu",
      "SMS hatırlatıcı (limitsiz)",
      "Öncelikli destek",
    ],
  },
  kurumsal: {
    slug: "kurumsal",
    ad: "Kurumsal",
    aylikFiyat: 1499,
    yillikFiyat: 14990,
    aciklama: "Hastane ve büyük klinikler için tam çözüm",
    ozellikler: [
      "Pro'daki her şey",
      "Çoklu doktor yönetimi",
      "API erişimi",
      "Özel raporlama",
      "Dedicated müşteri başarı yöneticisi",
      "Özel entegrasyonlar",
    ],
  },
};

export function paketFiyat(slug, periyod = "aylik") {
  const paket = PAKETLER[slug];
  if (!paket) return null;
  return periyod === "yillik" ? paket.yillikFiyat : paket.aylikFiyat;
}
