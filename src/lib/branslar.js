// Branş alias sözlüğü — çift yönlü arama desteği
// Her branş: kanonikal ad, görünüm formatı, URL slug, alias listesi

export const BRANSLAR = [
  {
    kanonikal: "KBB Uzmanı",
    gorunum: "KBB (Kulak Burun Boğaz)",
    slug: "kbb-uzmani",
    aliases: ["kbb", "kulak burun bogaz", "otolaringoloji", "ent", "kulak burun"],
  },
  {
    kanonikal: "Dahiliye",
    gorunum: "Dahiliye (İç Hastalıkları)",
    slug: "dahiliye",
    aliases: ["dahiliye", "ic hastaliklari", "internal medicine", "ic hastaligi", "dahiliyeci"],
  },
  {
    kanonikal: "Dermatoloji",
    gorunum: "Dermatoloji (Cildiye)",
    slug: "dermatoloji",
    aliases: ["dermatoloji", "cildiye", "deri hastaliklari", "deri", "cilt"],
  },
  {
    kanonikal: "Göz Hastalıkları",
    gorunum: "Göz Hastalıkları (Oftalmoloji)",
    slug: "goz-hastaliklari",
    aliases: ["goz", "oftalmoloji", "goz hastaliklari", "ophthalmology", "goz doktoru"],
  },
  {
    kanonikal: "Ortopedi",
    gorunum: "Ortopedi ve Travmatoloji",
    slug: "ortopedi",
    aliases: ["ortopedi", "ortopedi ve travmatoloji", "kemik", "eklem", "omurga"],
  },
  {
    kanonikal: "Kardiyoloji",
    gorunum: "Kardiyoloji (Kalp Hastalıkları)",
    slug: "kardiyoloji",
    aliases: ["kardiyoloji", "kalp", "kalp damar", "cardiology", "kalp hastaliklari"],
  },
  {
    kanonikal: "Nöroloji",
    gorunum: "Nöroloji (Beyin ve Sinir)",
    slug: "noroloji",
    aliases: ["noroloji", "sinir", "beyin sinir", "neurology", "beyin", "norologji"],
  },
  {
    kanonikal: "Genel Cerrahi",
    gorunum: "Genel Cerrahi",
    slug: "genel-cerrahi",
    aliases: ["genel cerrahi", "cerrahi", "general surgery", "ameliyat"],
  },
  {
    kanonikal: "Psikiyatri",
    gorunum: "Psikiyatri (Ruh Sağlığı)",
    slug: "psikiyatri",
    aliases: ["psikiyatri", "ruh sagligi", "akil hastaliklari", "psychiatry", "psikoloji", "psikolog"],
  },
  {
    kanonikal: "Kadın Hastalıkları ve Doğum",
    gorunum: "Kadın Hastalıkları ve Doğum (Jinekoloji)",
    slug: "kadin-hastaliklari-ve-dogum",
    aliases: ["kadin hastaliklari", "jinekologi", "jinekoloji", "kadin dogum", "gynecology", "obstetrics", "kadin doktoru"],
  },
  {
    kanonikal: "Çocuk Hastalıkları",
    gorunum: "Çocuk Hastalıkları (Pediatri)",
    slug: "cocuk-hastaliklari",
    aliases: ["cocuk hastaliklari", "pediatri", "pediatrics", "cocuk doktoru", "cocuk sagligi"],
  },
  {
    kanonikal: "Üroloji",
    gorunum: "Üroloji",
    slug: "uroloji",
    aliases: ["uroloji", "idrar yollari", "urology", "bobrek", "mesane"],
  },
  {
    kanonikal: "Endokrinoloji",
    gorunum: "Endokrinoloji (Hormon ve Şeker)",
    slug: "endokrinoloji",
    aliases: ["endokrinoloji", "seker hastaligi", "tiroit", "tiroid", "hormon", "diyabet", "endokrin"],
  },
  {
    kanonikal: "Gastroenteroloji",
    gorunum: "Gastroenteroloji (Sindirim)",
    slug: "gastroenteroloji",
    aliases: ["gastroenteroloji", "sindirim", "mide bagırsak", "hepatoloji", "mide", "bagırsak", "karaciger"],
  },
  {
    kanonikal: "Göğüs Hastalıkları",
    gorunum: "Göğüs Hastalıkları (Akciğer)",
    slug: "gogus-hastaliklari",
    aliases: ["gogus hastaliklari", "akciger", "solunum", "pulmonoloji", "gogus", "akciger doktoru"],
  },
  {
    kanonikal: "Fizik Tedavi",
    gorunum: "Fizik Tedavi ve Rehabilitasyon",
    slug: "fizik-tedavi",
    aliases: ["fizik tedavi", "rehabilitasyon", "ftr", "fizik tedavi ve rehabilitasyon", "fizyoterapi"],
  },
  {
    kanonikal: "Beyin ve Sinir Cerrahisi",
    gorunum: "Beyin ve Sinir Cerrahisi",
    slug: "beyin-ve-sinir-cerrahisi",
    aliases: ["beyin cerrahisi", "norosirurji", "beyin ve sinir cerrahisi", "neurosurgery"],
  },
  {
    kanonikal: "Plastik Cerrahi",
    gorunum: "Plastik ve Estetik Cerrahi",
    slug: "plastik-cerrahi",
    aliases: ["plastik cerrahi", "estetik cerrahi", "rekonstruktif cerrahi", "estetik", "plastik"],
  },
  {
    kanonikal: "Diş Hekimi",
    gorunum: "Diş Hekimliği",
    slug: "dis-hekimi",
    aliases: ["dis hekimi", "dis hekimligi", "dentist", "dis doktoru", "dis"],
  },
  {
    kanonikal: "Rinoplasti",
    gorunum: "Rinoplasti (Burun Estetiği)",
    slug: "rinoplasti",
    aliases: ["rinoplasti", "burun estetigi", "burun ameliyati", "rhinoplasty"],
  },
  {
    kanonikal: "Onkoloji",
    gorunum: "Onkoloji (Kanser)",
    slug: "onkoloji",
    aliases: ["onkoloji", "kanser", "tumor", "hematoloji", "oncology"],
  },
  {
    kanonikal: "Romatoloji",
    gorunum: "Romatoloji",
    slug: "romatoloji",
    aliases: ["romatoloji", "eklem iltihabi", "romatizma", "artrit", "lupus"],
  },
  {
    kanonikal: "Anestezi",
    gorunum: "Anesteziyoloji ve Reanimasyon",
    slug: "anestezi",
    aliases: ["anestezi", "anesteziyoloji", "yogun bakim", "narkozu"],
  },
  {
    kanonikal: "Enfeksiyon Hastalıkları",
    gorunum: "Enfeksiyon Hastalıkları",
    slug: "enfeksiyon-hastaliklari",
    aliases: ["enfeksiyon", "infeksiyon hastaliklari", "mikrobiyoloji", "infeksiyon"],
  },
  {
    kanonikal: "Radyoloji",
    gorunum: "Radyoloji (Görüntüleme)",
    slug: "radyoloji",
    aliases: ["radyoloji", "goruntuleme", "rontgen", "mri", "bt", "ultrason"],
  },
  {
    kanonikal: "Aile Hekimi",
    gorunum: "Aile Hekimliği",
    slug: "aile-hekimi",
    aliases: ["aile hekimi", "aile hekimligi", "pratisyen", "genel pratisyen", "family medicine"],
  },
  {
    kanonikal: "Estetik Cerrahi",
    gorunum: "Estetik Cerrahi",
    slug: "estetik-cerrahi",
    aliases: ["estetik cerrahi", "estetik", "guzellestirme", "liposuction", "botoks"],
  },
  {
    kanonikal: "Kalp ve Damar Cerrahisi",
    gorunum: "Kalp ve Damar Cerrahisi",
    slug: "kalp-damar-cerrahisi",
    aliases: ["kalp damar cerrahisi", "kalp cerrahisi", "kardiyovaskuler cerrahi", "bypass", "kalp damar", "cardiovascular surgery"],
  },
  {
    kanonikal: "Damar Cerrahisi",
    gorunum: "Damar Cerrahisi (Vasküler)",
    slug: "damar-cerrahisi",
    aliases: ["damar cerrahisi", "vaskuler cerrahi", "varis", "damar", "vascular surgery"],
  },
  {
    kanonikal: "Nefroloji",
    gorunum: "Nefroloji (Böbrek Hastalıkları)",
    slug: "nefroloji",
    aliases: ["nefroloji", "bobrek hastaliklari", "diyaliz", "nephrology", "bobrek", "bobrek doktoru"],
  },
  {
    kanonikal: "Hematoloji",
    gorunum: "Hematoloji (Kan Hastalıkları)",
    slug: "hematoloji",
    aliases: ["hematoloji", "kan hastaliklari", "losemi", "anemi", "hematology", "kan"],
  },
  {
    kanonikal: "Göğüs Cerrahisi",
    gorunum: "Göğüs Cerrahisi",
    slug: "gogus-cerrahisi",
    aliases: ["gogus cerrahisi", "akciger cerrahisi", "torasik cerrahi", "thoracic surgery"],
  },
  {
    kanonikal: "Çocuk Cerrahisi",
    gorunum: "Çocuk Cerrahisi (Pediatrik Cerrahi)",
    slug: "cocuk-cerrahisi",
    aliases: ["cocuk cerrahisi", "pediatrik cerrahi", "pediatric surgery"],
  },
  {
    kanonikal: "Çocuk Nörolojisi",
    gorunum: "Çocuk Nörolojisi",
    slug: "cocuk-norolojisi",
    aliases: ["cocuk norolojisi", "pediatrik noroloji", "cocuk beyin sinir", "pediatric neurology"],
  },
  {
    kanonikal: "Çocuk Psikiyatrisi",
    gorunum: "Çocuk ve Ergen Psikiyatrisi",
    slug: "cocuk-psikiyatrisi",
    aliases: ["cocuk psikiyatrisi", "ergen psikiyatrisi", "cocuk ruh sagligi", "child psychiatry"],
  },
  {
    kanonikal: "Acil Tıp",
    gorunum: "Acil Tıp",
    slug: "acil-tip",
    aliases: ["acil tip", "acil servis", "emergency medicine", "acil doktor"],
  },
  {
    kanonikal: "Spor Hekimliği",
    gorunum: "Spor Hekimliği",
    slug: "spor-hekimligi",
    aliases: ["spor hekimligi", "spor hekimi", "spor doktoru", "sports medicine"],
  },
  {
    kanonikal: "Algoloji",
    gorunum: "Algoloji (Ağrı Kliniği)",
    slug: "algoloji",
    aliases: ["algoloji", "agri klinigi", "agri yonetimi", "pain management", "agri doktoru"],
  },
  {
    kanonikal: "Geriatri",
    gorunum: "Geriatri (Yaşlı Sağlığı)",
    slug: "geriatri",
    aliases: ["geriatri", "yasli sagligi", "geriatrics", "yaslilik", "yas hastaliklari"],
  },
  {
    kanonikal: "Nükleer Tıp",
    gorunum: "Nükleer Tıp",
    slug: "nukleer-tip",
    aliases: ["nukleer tip", "pet ct", "sintigrafi", "nuclear medicine"],
  },
  {
    kanonikal: "Patoloji",
    gorunum: "Patoloji",
    slug: "patoloji",
    aliases: ["patoloji", "biyopsi", "patolojik inceleme", "pathology"],
  },
  {
    kanonikal: "El Cerrahisi",
    gorunum: "El Cerrahisi",
    slug: "el-cerrahisi",
    aliases: ["el cerrahisi", "el bilek cerrahisi", "hand surgery"],
  },
];

/**
 * Slug'dan görüntü adı döndürür — BRANSLAR listesini kaynak olarak kullanır
 */
export function slugGorunum(slug) {
  const brans = BRANSLAR.find(b => b.slug === slug);
  return brans?.kanonikal || slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Türkçe karakter normalizasyonu
 */
export function normalize(str) {
  if (!str) return "";
  return str
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
}

/**
 * Branş araması — alias destekli, skorlu sıralama
 * @param {string} sorgu
 * @returns {Array} skor sıralı branş listesi
 */
export function branşAra(sorgu) {
  const norm = normalize(sorgu);
  if (!norm || norm.length < 1) return [];

  const sonuclar = [];
  for (const brans of BRANSLAR) {
    const kanonNorm = normalize(brans.kanonikal);
    const gorunumNorm = normalize(brans.gorunum);
    let skor = 0;

    if (kanonNorm === norm || gorunumNorm === norm) skor = 4;
    else if (kanonNorm.startsWith(norm)) skor = 3;
    else if (kanonNorm.includes(norm) || gorunumNorm.includes(norm)) skor = 2;
    else if (brans.aliases.some(a => normalize(a).includes(norm))) skor = 1;

    if (skor > 0) sonuclar.push({ ...brans, skor });
  }

  return sonuclar.sort((a, b) => b.skor - a.skor).slice(0, 8);
}
