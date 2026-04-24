import sql from "@/lib/db";
import { TEDAVILER } from "./tedaviler/page";

export default async function sitemap() {
  const baseUrl = "https://doktorpusula.com";
  const now = new Date();

  // Dinamik sayfalar
  let doktorUrls = [];
  let tercumanUrls = [];
  try {
    const doktorlar = await sql`SELECT slug FROM doktorlar WHERE onaylandi = true`;
    doktorUrls = doktorlar.map((d) => ({
      url: `${baseUrl}/doktor/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const tercumanlar = await sql`SELECT slug FROM tercumanlar WHERE aktif = true`;
    tercumanUrls = tercumanlar.map((t) => ({
      url: `${baseUrl}/tercuman/${t.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    /* sessiz */
  }

  // Tedavi detay sayfaları
  const tedaviUrls = TEDAVILER.map((t) => ({
    url: `${baseUrl}/tedaviler/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Şehir + uzmanlık kombinasyonları
  const sehirler = ["istanbul", "ankara", "izmir", "antalya", "bursa", "adana", "gaziantep", "konya"];
  const uzmanliklar = ["kbb-uzmani", "kardiyoloji", "ortopedi", "plastik-cerrahi", "goz-hastaliklari", "dis-hekimi", "dermatoloji", "noroloji", "psikiyatri", "cocuk-hastaliklari", "estetik-cerrahi", "rinoplasti"];
  const sehirUzmanlikUrls = [];
  for (const sehir of sehirler) {
    for (const uzm of uzmanliklar) {
      sehirUzmanlikUrls.push({
        url: `${baseUrl}/${sehir}/${uzm}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Statik sayfalar
  const statikSayfalar = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" },
    { url: `${baseUrl}/doktor-bul`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/tedaviler`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/tercumanlar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/saglik`, priority: 0.9, changeFrequency: "daily" },
    { url: `${baseUrl}/hastaliklar`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/hasta-formlari`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/akis`, priority: 0.8, changeFrequency: "daily" },
    { url: `${baseUrl}/medikal-turizm`, priority: 0.9, changeFrequency: "weekly" },
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

  return [...statikSayfalar, ...tedaviUrls, ...sehirUzmanlikUrls, ...doktorUrls, ...tercumanUrls];
}
