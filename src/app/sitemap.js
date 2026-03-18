import sql from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://turkhekim.vercel.app";

  const doktorlar = await sql`SELECT slug FROM doktorlar`;
  const doktorUrls = doktorlar.map((d) => ({
    url: `${baseUrl}/doktor/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const statikSayfalar = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" },
    { url: `${baseUrl}/saglik`, priority: 0.9, changeFrequency: "daily" },
    { url: `${baseUrl}/medikal-turizm`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/doktor-ol`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/istanbul/kbb-uzmani`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/ankara/plastik-cerrah`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/izmir/goz-hastaliklari`, priority: 0.8, changeFrequency: "weekly" },
  ].map((s) => ({ ...s, lastModified: new Date() }));

  return [...statikSayfalar, ...doktorUrls];
}
