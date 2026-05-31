import sql from "@/lib/db";
import { TEDAVILER } from "./tedaviler/page";

export default async function sitemap() {
  const baseUrl = "https://turkhekim.com";
  const now = new Date();

  let doktorUrls = [];
  let tercumanUrls = [];
  let avukatUrls = [];
  let makaleUrls = [];
  let klinikUrls = [];
  let ilanUrls = [];
  let firmaUrls = [];
  try {
    const doktorlar = await sql`SELECT slug FROM doktorlar WHERE onaylandi = true`;
    doktorUrls = doktorlar.map((d) => ({ url: `${baseUrl}/doktor/${d.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 }));

    const tercumanlar = await sql`SELECT slug FROM tercumanlar WHERE aktif = true`;
    tercumanUrls = tercumanlar.map((t) => ({ url: `${baseUrl}/tercuman/${t.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 }));

    const avukatlar = await sql`SELECT slug FROM avukatlar WHERE aktif = true`;
    avukatUrls = avukatlar.map((a) => ({ url: `${baseUrl}/hukuk/avukat/${a.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 }));

    const makaleler = await sql`SELECT slug, updated_at FROM hukuki_makaleler WHERE yayinda = true`;
    makaleUrls = makaleler.map((m) => ({ url: `${baseUrl}/hukuk/makale/${m.slug}`, lastModified: m.updated_at || now, changeFrequency: "monthly", priority: 0.6 }));

    const klinikler = await sql`SELECT slug FROM klinikler WHERE onaylandi = true`;
    klinikUrls = klinikler.map((k) => ({ url: `${baseUrl}/klinik/${k.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 }));

    const ilanlar = await sql`SELECT id FROM firma_ilanlar WHERE aktif = true LIMIT 500`;
    ilanUrls = ilanlar.map((i) => ({ url: `${baseUrl}/pazaryeri/ilan/${i.id}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 }));

    const firmalar = await sql`SELECT slug FROM firmalar WHERE aktif = true`;
    firmaUrls = firmalar.map((f) => ({ url: `${baseUrl}/firma/${f.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 }));
  } catch (err) {
    console.error("Sitemap dinamik veri hatası:", err);
  }

  const tedaviUrls = TEDAVILER.map((t) => ({ url: `${baseUrl}/tedaviler/${t.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 }));

  const sehirler = ["istanbul", "ankara", "izmir", "antalya", "bursa", "adana", "gaziantep", "konya"];
  const uzmanliklar = ["kbb-uzmani", "kardiyoloji", "ortopedi", "plastik-cerrahi", "goz-hastaliklari", "dis-hekimi", "dermatoloji", "noroloji", "psikiyatri", "cocuk-hastaliklari", "estetik-cerrahi", "rinoplasti"];
  const sehirUzmanlikUrls = [];
  for (const sehir of sehirler) {
    for (const uzm of uzmanliklar) {
      sehirUzmanlikUrls.push({ url: `${baseUrl}/${sehir}/${uzm}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
    }
  }

  const statikSayfalar = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" },
    { url: `${baseUrl}/doktor-bul`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/tedaviler`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/tercumanlar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/tercuman-talep`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/saglik`, priority: 0.9, changeFrequency: "daily" },
    { url: `${baseUrl}/hastaliklar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/hasta-formlari`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/akis`, priority: 0.8, changeFrequency: "daily" },
    { url: `${baseUrl}/medikal-turizm`, priority: 0.9, changeFrequency: "weekly" },
    // Hukuk modülü
    { url: `${baseUrl}/hukuk`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/hukuk/ai-danisman`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/hukuk/avukatlar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/hukuk/makaleler`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/hukuk/danismanlik-talep`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/hukuk/sik-sorulan-sorular`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/avukat-kayit`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${baseUrl}/avukat-giris`, priority: 0.3, changeFrequency: "yearly" },
    // Pazaryeri
    { url: `${baseUrl}/pazaryeri`, priority: 0.9, changeFrequency: "daily" },
    { url: `${baseUrl}/pazaryeri/talepler`, priority: 0.8, changeFrequency: "daily" },
    { url: `${baseUrl}/pazaryeri/talep-olustur`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/firma-kayit`, priority: 0.6, changeFrequency: "monthly" },
    // Klinik
    { url: `${baseUrl}/klinikler`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/klinik-kayit`, priority: 0.6, changeFrequency: "monthly" },
    // Genel
    { url: `${baseUrl}/hakkimizda`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/sss`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/iletisim`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/kayit-ol`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/doktor-ol`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/tercuman-ol`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/medikal-firma`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/paketler`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${baseUrl}/kullanim-kosullari`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/gizlilik`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/en`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/ar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/fa`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/ru`, priority: 0.8, changeFrequency: "weekly" },
  ].map((s) => ({ ...s, lastModified: now }));

  return [
    ...statikSayfalar,
    ...tedaviUrls,
    ...sehirUzmanlikUrls,
    ...doktorUrls,
    ...tercumanUrls,
    ...avukatUrls,
    ...makaleUrls,
    ...klinikUrls,
    ...firmaUrls,
    ...ilanUrls,
  ];
}
