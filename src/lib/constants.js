/** Rate limit sabitleri — tüm API route'ları bu değerleri kullanır */
export const RATE_LIMITS = {
  AI_ASISTAN:    { limit: 20, pencereDakika: 60 },
  GIRIS:         { limit: 5,  pencereDakika: 15 },
  DOKTOR_KAYIT:  { limit: 3,  pencereDakika: 60 },
  YORUM:         { limit: 3,  pencereDakika: 10 },
  RANDEVU:       { limit: 5,  pencereDakika: 60 },
  SORU:          { limit: 5,  pencereDakika: 60 },
  SIKAYET:       { limit: 5,  pencereDakika: 60 },
  FIRMA_BASVURU: { limit: 3,  pencereDakika: 60 },
  HASTA_PROFIL:  { limit: 5,  pencereDakika: 60 },
  HASTA_SORGU:   { limit: 10, pencereDakika: 60 },
};

/** Admin oturum süresi (saniye) */
export const ADMIN_OTURUM_SURESI = 60 * 60 * 8; // 8 saat
