// Branşa özel hasta formları kataloğu
// Her formun PDF'i public/formlar/ klasöründe olacak
// veya dinamik olarak oluşturulacak

export const HASTA_FORMLARI = [
  // ─── ESTETİK & PLASTİK ───────────────────────────────────────────────
  {
    id: "rinoplasti-onam",
    uzmanliklar: ["rinoplasti", "plastik-cerrahi", "estetik-cerrahi", "kbb-uzmani"],
    baslik: "Rinoplasti (Burun Estetiği) Aydınlatılmış Onam Formu",
    aciklama: "Burun estetiği operasyonu öncesi hastanın okuyup imzalaması gereken standart onam formu.",
    kategori: "Estetik Cerrahi",
    ekKategoriler: ["KBB"],
    dil: "tr",
  },
  {
    id: "genel-estetik-onam",
    uzmanliklar: ["plastik-cerrahi", "estetik-cerrahi"],
    baslik: "Genel Estetik Cerrahi Aydınlatılmış Onam Formu",
    aciklama: "Tüm estetik cerrahi operasyonları için genel onam formu.",
    kategori: "Estetik Cerrahi",
    dil: "tr",
  },
  {
    id: "liposuction-onam",
    uzmanliklar: ["plastik-cerrahi", "estetik-cerrahi"],
    baslik: "Liposuction Aydınlatılmış Onam Formu",
    aciklama: "Yağ alımı operasyonu öncesi standart onam formu.",
    kategori: "Estetik Cerrahi",
    dil: "tr",
  },
  // ─── DİŞ HEKİMLİĞİ ───────────────────────────────────────────────────
  {
    id: "dis-implant-onam",
    uzmanliklar: ["dis-hekimi"],
    baslik: "Dental İmplant Aydınlatılmış Onam Formu",
    aciklama: "İmplant uygulaması öncesi hastanın bilgilendirilmesi ve onayı için.",
    kategori: "Diş Hekimliği",
    dil: "tr",
  },
  {
    id: "dis-dolgu-onam",
    uzmanliklar: ["dis-hekimi"],
    baslik: "Diş Dolgusu / Kanal Tedavisi Onam Formu",
    aciklama: "Konservatif diş tedavileri için standart onam.",
    kategori: "Diş Hekimliği",
    dil: "tr",
  },
  {
    id: "ortodonti-sozlesme",
    uzmanliklar: ["dis-hekimi"],
    baslik: "Ortodonti Tedavi Sözleşmesi ve Onam Formu",
    aciklama: "Braket/aligner tedavisi başlangıcında imzalanacak form.",
    kategori: "Diş Hekimliği",
    dil: "tr",
  },
  // ─── PSİKİYATRİ & PSİKOLOJİ ──────────────────────────────────────────
  {
    id: "psikiyatri-ilac-onam",
    uzmanliklar: ["psikiyatri"],
    baslik: "Psikiyatrik İlaç Tedavisi Aydınlatılmış Onam Formu",
    aciklama: "Antidepresan, antipsikotik vb. ilaç başlangıcında kullanılan form.",
    kategori: "Psikiyatri",
    dil: "tr",
  },
  {
    id: "psikoloji-gizlilik",
    uzmanliklar: ["psikiyatri"],
    baslik: "Psikolojik Danışmanlık Gizlilik Sözleşmesi",
    aciklama: "Seans gizliliği ve sınırlarının belirtildiği standart form.",
    kategori: "Psikiyatri",
    dil: "tr",
  },
  // ─── KARDİYOLOJİ ────────────────────────────────────────────────────
  {
    id: "kardiyoloji-anjio-onam",
    uzmanliklar: ["kardiyoloji"],
    baslik: "Koroner Anjiyografi Aydınlatılmış Onam Formu",
    aciklama: "Anjiyografi işlemi öncesi hastanın onayı için.",
    kategori: "Kardiyoloji",
    dil: "tr",
  },
  {
    id: "kardiyoloji-genel",
    uzmanliklar: ["kardiyoloji"],
    baslik: "Kardiyoloji Hasta Bilgi ve Onam Formu",
    aciklama: "Kardiyoloji muayene ve tetkik sürecine başlarken doldurulan form.",
    kategori: "Kardiyoloji",
    dil: "tr",
  },
  // ─── ORTOPEDİ ────────────────────────────────────────────────────────
  {
    id: "ortopedi-ameliyat-onam",
    uzmanliklar: ["ortopedi"],
    baslik: "Ortopedik Cerrahi Aydınlatılmış Onam Formu",
    aciklama: "Kemik, eklem ve doku operasyonları için genel onam.",
    kategori: "Ortopedi",
    dil: "tr",
  },
  {
    id: "ortopedi-prp",
    uzmanliklar: ["ortopedi"],
    baslik: "PRP / Kök Hücre Tedavisi Onam Formu",
    aciklama: "Rejeneratif tedaviler için kullanılan onam formu.",
    kategori: "Ortopedi",
    dil: "tr",
  },
  // ─── GÖZ ─────────────────────────────────────────────────────────────
  {
    id: "goz-laser-onam",
    uzmanliklar: ["goz-hastaliklari"],
    baslik: "Excimer Laser (LASIK/LASEK) Aydınlatılmış Onam Formu",
    aciklama: "Göz lazer operasyonu öncesi kapsamlı onam formu.",
    kategori: "Göz Hastalıkları",
    dil: "tr",
  },
  {
    id: "goz-katarakt-onam",
    uzmanliklar: ["goz-hastaliklari"],
    baslik: "Katarakt Operasyonu Aydınlatılmış Onam Formu",
    aciklama: "Katarakt ve göz içi lens değişimi için onam.",
    kategori: "Göz Hastalıkları",
    dil: "tr",
  },
  // ─── DERMATOLOJİ ────────────────────────────────────────────────────
  {
    id: "dermatoloji-botoks",
    uzmanliklar: ["dermatoloji"],
    baslik: "Botoks / Dolgu Uygulaması Onam Formu",
    aciklama: "Estetik dermatoloji uygulamaları için standart onam.",
    kategori: "Dermatoloji",
    dil: "tr",
  },
  {
    id: "dermatoloji-lazer",
    uzmanliklar: ["dermatoloji"],
    baslik: "Dermatolojik Lazer Tedavisi Onam Formu",
    aciklama: "Cilt lazer uygulamaları için onam formu.",
    kategori: "Dermatoloji",
    dil: "tr",
  },
  // ─── KBB ─────────────────────────────────────────────────────────────
  {
    id: "kbb-ameliyat-onam",
    uzmanliklar: ["kbb-uzmani"],
    baslik: "KBB Cerrahi Aydınlatılmış Onam Formu",
    aciklama: "Kulak, burun, boğaz operasyonları için genel onam.",
    kategori: "KBB",
    dil: "tr",
  },
  // ─── ÇOCUK SAĞLIĞI ──────────────────────────────────────────────────
  {
    id: "cocuk-asi-onam",
    uzmanliklar: ["cocuk-hastaliklari"],
    baslik: "Aşı Uygulama Aydınlatılmış Onam Formu",
    aciklama: "Pediatrik aşılama için ebeveyn onam formu.",
    kategori: "Çocuk Sağlığı",
    dil: "tr",
  },
  {
    id: "cocuk-genel-onam",
    uzmanliklar: ["cocuk-hastaliklari"],
    baslik: "Pediatri Genel Muayene ve İşlem Onam Formu",
    aciklama: "18 yaş altı hastalar için ebeveyn/vasi onam formu.",
    kategori: "Çocuk Sağlığı",
    dil: "tr",
  },
  // ─── CERRAHİ DESTEK ──────────────────────────────────────────────────
  {
    id: "anestezi-sedasyon-onam",
    uzmanliklar: ["plastik-cerrahi", "estetik-cerrahi", "ortopedi", "kbb-uzmani", "goz-hastaliklari", "genel-cerrahi"],
    baslik: "Anestezi / Sedasyon Aydınlatılmış Onam Formu",
    aciklama: "Her türlü cerrahi operasyon öncesi anestezist tarafından imzalatılacak onam formu.",
    kategori: "Genel",
    dil: "tr",
  },
  {
    id: "kan-transfuzyon-onam",
    uzmanliklar: ["*"],
    baslik: "Kan / Kan Ürünü Transfüzyonu Onam Formu",
    aciklama: "Kan transfüzyonu öncesi hastanın onayını veya reddini belgeleyen form.",
    kategori: "Genel",
    dil: "tr",
  },
  {
    id: "online-muayene-onam",
    uzmanliklar: ["*"],
    baslik: "Uzaktan Sağlık Hizmeti (Teletıp) Onam Formu",
    aciklama: "Video/online muayene hizmeti öncesi imzalanacak onam ve gizlilik formu.",
    kategori: "Genel",
    dil: "tr",
  },
  {
    id: "asi-ret-formu",
    uzmanliklar: ["cocuk-hastaliklari", "aile-hekimligi"],
    baslik: "Aşı Reddi Beyan Formu",
    aciklama: "Aşı uygulamasını reddeden ebeveyn/hasta için 1593 sayılı Kanun kapsamında belgeleme formu.",
    kategori: "Çocuk Sağlığı",
    dil: "tr",
  },
  // ─── GENEL ──────────────────────────────────────────────────────────
  {
    id: "sosyal-medya-onam",
    uzmanliklar: ["*"],
    baslik: "Fotoğraf/Video Sosyal Medya Paylaşım Onam Formu",
    aciklama: "Tedavi öncesi/sonrası görsel kayıtların sosyal medyada paylaşılması için KVKK uyumlu onam formu.",
    kategori: "Genel",
    dil: "tr",
  },
  {
    id: "kvkk-hasta",
    uzmanliklar: ["*"],
    baslik: "KVKK Hasta Açık Rıza Beyanı",
    aciklama: "Tüm sağlık kuruluşlarında kullanılabilecek KVKK uyumlu açık rıza formu.",
    kategori: "Genel",
    dil: "tr",
  },
  {
    id: "genel-muayene-onam",
    uzmanliklar: ["*"],
    baslik: "Genel Muayene ve Tedavi Onam Formu",
    aciklama: "Her branşta kullanılabilecek standart muayene onam formu.",
    kategori: "Genel",
    dil: "tr",
  },
];

export function uzmanligaGoreFormlar(uzmanlikSlug) {
  return HASTA_FORMLARI.filter(
    (f) => f.uzmanliklar.includes("*") || f.uzmanliklar.includes(uzmanlikSlug)
  );
}

export function tumKategoriler() {
  return [...new Set(HASTA_FORMLARI.map((f) => f.kategori))];
}
