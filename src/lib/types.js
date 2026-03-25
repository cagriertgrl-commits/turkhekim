/**
 * @typedef {Object} Doktor
 * @property {number} id
 * @property {string} ad
 * @property {string} [soyad]
 * @property {string} [unvan]
 * @property {string} uzmanlik
 * @property {string} sehir
 * @property {string} [ilce]
 * @property {string} slug
 * @property {string} [email]
 * @property {string} [telefon]
 * @property {string} [foto_url]
 * @property {number} [puan]
 * @property {number} [yorum_sayisi]
 * @property {string} [deneyim]
 * @property {boolean} onaylandi
 * @property {string} [paket]
 * @property {boolean} [medikal_turizm]
 */

/**
 * @typedef {Object} Yorum
 * @property {number} id
 * @property {number} doktor_id
 * @property {string} hasta_adi
 * @property {number} puan
 * @property {string} metin
 * @property {string} [tarih]
 * @property {string} dogrulama_durumu
 * @property {boolean} [yayinlandi]
 * @property {boolean} [dogrulanmis]
 */

/**
 * @typedef {Object} Randevu
 * @property {number} id
 * @property {number} doktor_id
 * @property {string} hasta_adi
 * @property {string} telefon
 * @property {string} [sikayet]
 * @property {string} [tarih]
 * @property {string} [saat]
 * @property {string} tip
 * @property {string} durum
 * @property {string} [doktor_notu]
 * @property {string} [iptal_sebep]
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} Bildirim
 * @property {number} id
 * @property {string} tip
 * @property {string} baslik
 * @property {string} mesaj
 * @property {string} [link]
 * @property {boolean} okundu
 * @property {string} created_at
 */

/**
 * @typedef {Object} APIYanit
 * @property {boolean} ok
 * @property {any} data
 * @property {number} durum
 * @property {string} [hata]
 */

export {};
