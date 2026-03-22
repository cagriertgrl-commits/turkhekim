const S = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", width: 28, height: 28 };

export const IkonKBB = () => <svg {...S}><path d="M12 3C8.7 3 6 5.7 6 9c0 2.6 1.4 4.9 3.5 6.2L11 18c.3.7 1 1.1 1.7 1.1.7 0 1.3-.5 1.3-1.3V16.5c1.7-1.1 2.7-3 2.7-5.3C16.7 8 15.7 5.8 14 4.5"/><path d="M9.5 9.5C9.5 7.6 10.6 6 12 6"/><circle cx="12" cy="10.5" r=".8" fill="currentColor" stroke="none"/></svg>;
export const IkonKardiyoloji = () => <svg {...S}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><polyline points="6,13 9,10 11,14 13,11 15,11" strokeWidth="1.3"/></svg>;
export const IkonOrtopedi = () => <svg {...S}><path d="M8.5 2a2.5 2.5 0 0 1 2.5 3.5L16.5 12l1 .9a2.5 2.5 0 1 1-3.4 3.5L13 15.5 7.5 10.2A2.5 2.5 0 1 1 8.5 2z"/></svg>;
export const IkonPlastik = () => <svg {...S}><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><line x1="20" y1="4" x2="8.5" y2="15.5"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><line x1="8.5" y1="8.5" x2="12" y2="12"/></svg>;
export const IkonGoz = () => <svg {...S}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
export const IkonDis = () => <svg {...S}><path d="M12 3c-3.3 0-5 2.2-5 4.5 0 1.1.4 2.2.9 3l1.1 3.4c.3 1 .7 4.2 1.9 4.9.6.3 1.2-.2 1.7-1.2.5 1 1.1 1.5 1.7 1.2 1.2-.7 1.6-3.9 1.9-4.9L15.1 10.5c.5-.8.9-1.9.9-3C16 5.2 15.3 3 12 3z"/></svg>;
export const IkonDermatoloji = () => <svg {...S}><path d="M2 8c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 6-5"/><path d="M2 14c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 6-5"/><path d="M2 20c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 6-5"/></svg>;
export const IkonNoroloji = () => <svg {...S}><polyline points="2,12 5,12 7,4 10,19 13,9 15,14 17,12 22,12"/></svg>;
export const IkonPsikiyatri = () => <svg {...S}><circle cx="12" cy="8" r="5"/><path d="M8.5 13.5C9 16 10 17.5 10 17.5H14s1-1.5 1.5-4"/><line x1="12" y1="17.5" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/><path d="M9.5 7c.3-1 1.2-1.7 2.5-1.7"/></svg>;
export const IkonCocuk = () => <svg {...S}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4a2.5 2.5 0 0 1 2.5 2.5V14a4.5 4.5 0 0 0 9 0v-1.5"/><circle cx="18.5" cy="11" r="1.5"/></svg>;
export const IkonEstetik = () => <svg {...S}><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4l-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z"/><path d="M5 18l1.2 2.5L5 23"/><path d="M19 18l-1.2 2.5L19 23"/></svg>;
export const IkonRinoplasti = () => <svg {...S}><path d="M12 3v9.5c0 2.5-2.5 4.5-2.5 4.5H8a2 2 0 0 0 0 4h8a2 2 0 0 0 0-4h-1.5S12 15 12 12.5V3z"/><path d="M9 12.5c-.8.6-1.5 1.6-1.5 2.5h9c0-.9-.7-1.9-1.5-2.5"/></svg>;

export const UZMANLIK_GRID = [
  { slug: "kbb-uzmani",         Ikon: IkonKBB,         renk: "#0E7C7B", bg: "#E6F4F4" },
  { slug: "kardiyoloji",        Ikon: IkonKardiyoloji,  renk: "#DC2626", bg: "#FFF1F2" },
  { slug: "ortopedi",           Ikon: IkonOrtopedi,     renk: "#2563EB", bg: "#EFF6FF" },
  { slug: "plastik-cerrahi",    Ikon: IkonPlastik,      renk: "#7C3AED", bg: "#F5F3FF" },
  { slug: "goz-hastaliklari",   Ikon: IkonGoz,          renk: "#0369A1", bg: "#E0F2FE" },
  { slug: "dis-hekimi",         Ikon: IkonDis,          renk: "#0E7C7B", bg: "#F0FDFA" },
  { slug: "dermatoloji",        Ikon: IkonDermatoloji,  renk: "#BE185D", bg: "#FDF2F8" },
  { slug: "noroloji",           Ikon: IkonNoroloji,     renk: "#1D4ED8", bg: "#EFF6FF" },
  { slug: "psikiyatri",         Ikon: IkonPsikiyatri,   renk: "#7C3AED", bg: "#F5F3FF" },
  { slug: "cocuk-hastaliklari", Ikon: IkonCocuk,        renk: "#059669", bg: "#ECFDF5" },
  { slug: "estetik-cerrahi",    Ikon: IkonEstetik,      renk: "#D97706", bg: "#FFFBEB" },
  { slug: "rinoplasti",         Ikon: IkonRinoplasti,   renk: "#0D2137", bg: "#F1F5F9" },
];
