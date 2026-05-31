/**
 * Pazaryeri (B2B firma↔doktor) kategori sabitleri.
 */

export const PAZARYERI_KATEGORILERI = [
  { kod: "tibbi_cihaz", ad: "Tıbbi Cihaz", ikon: "🩻" },
  { kod: "sarf_malzeme", ad: "Sarf Malzeme", ikon: "🧪" },
  { kod: "implant", ad: "İmplant", ikon: "🦴" },
  { kod: "ilac", ad: "İlaç", ikon: "💊" },
  { kod: "mobilya", ad: "Klinik Mobilya", ikon: "🪑" },
  { kod: "kozmetik", ad: "Dermokozmetik & Estetik", ikon: "💄" },
  { kod: "yazilim", ad: "Klinik Yazılım & MIS", ikon: "💻" },
  { kod: "laboratuvar", ad: "Laboratuvar Hizmet", ikon: "🔬" },
  { kod: "egitim", ad: "Eğitim & Sertifikasyon", ikon: "🎓" },
  { kod: "danismanlik", ad: "Klinik Danışmanlık", ikon: "📋" },
  { kod: "sigorta", ad: "Mesleki Sigorta", ikon: "🛡️" },
  { kod: "diger", ad: "Diğer", ikon: "📦" },
];

export const STOK_DURUMU = [
  { kod: "stokta", ad: "Stokta", renk: "green" },
  { kod: "siparise_uretim", ad: "Siparişe Üretim", renk: "blue" },
  { kod: "stokta_yok", ad: "Tükendi", renk: "gray" },
  { kod: "on_siparis", ad: "Ön Sipariş", renk: "amber" },
];

export const TALEP_ACILIYET = [
  { kod: "normal", ad: "Normal — 1 hafta içinde" },
  { kod: "acil", ad: "Acil — 48 saat içinde" },
  { kod: "stratejik", ad: "Stratejik — uzun vadeli" },
];

export function kategoriBul(kod) {
  return PAZARYERI_KATEGORILERI.find(k => k.kod === kod) || { kod, ad: kod, ikon: "📦" };
}
