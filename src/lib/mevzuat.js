/**
 * Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik
 * uyumluluk yardımcıları.
 *
 * Yasaklı/sınırlı ifadeleri ve davranışları tespit etmek için kullanılır.
 */

// Sağlık reklamlarında yasaklı ifadeler
export const YASAKLI_KELIMELER = [
  "garanti", "garantili", "garantisi",
  "kesin sonuç", "%100 başarı", "100% başarı",
  "en iyi", "en başarılı", "tek doğru",
  "ucuz", "indirim", "kampanya", "fırsat",
  "ücretsiz muayene", "promosyon", "hediye",
  "şampiyonu", "öncüsü", "lideri",
  "ödüllü doktor", "ödüllü hekim",
];

// Hassas alanlar (öncesi/sonrası izin gerekli)
export const HASSAS_ALANLAR = [
  "estetik", "rinoplasti", "saç ekimi",
  "diş beyazlatma", "implant", "lazer",
];

/**
 * Metinde yasaklı kelime var mı kontrol et
 * @param {string} metin
 * @returns {string[]} - Bulunan yasaklı kelimeler
 */
export function yasakliKelimeleriBul(metin) {
  if (!metin) return [];
  const kucuk = metin.toLowerCase();
  return YASAKLI_KELIMELER.filter((k) => kucuk.includes(k.toLowerCase()));
}

/**
 * Metin yönetmeliğe uygun mu?
 * @returns {{uygun: boolean, ihlaller: string[], uyari: string|null}}
 */
export function mevzuatKontrol(metin) {
  const ihlaller = yasakliKelimeleriBul(metin);
  return {
    uygun: ihlaller.length === 0,
    ihlaller,
    uyari: ihlaller.length > 0
      ? `Sağlık reklam yönetmeliğine göre yasaklı ifade(ler): ${ihlaller.join(", ")}. Bu ifadeleri kullanmanız hukuki sorumluluk doğurur.`
      : null,
  };
}

/**
 * Fiyat bilgisi gösteriminde uyarı metni
 */
export const FIYAT_UYARISI = "Sağlık Bakanlığı yönetmeliğine göre fiyat bilgisi sadece muayene ücreti olarak verilebilir. Operasyon paket fiyatları reklamı yasaktır.";

/**
 * Öncesi/sonrası fotoğraf uyarısı
 */
export const ONCESI_SONRASI_UYARISI = "Öncesi/sonrası fotoğraflarını yayınlamak için hastadan yazılı izin almak ve 'estetik amaçlı bilgilendirmedir' ibaresi koymak yasal zorunluluktur.";
