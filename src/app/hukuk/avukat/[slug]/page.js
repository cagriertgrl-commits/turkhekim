import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p = await params;
  try {
    const [a] = await sql`SELECT ad, soyad, sehir, uzmanlik_alanlari, hakkinda, slug FROM avukatlar WHERE slug = ${p.slug} AND aktif = true`;
    if (!a) return { title: "Avukat Bulunamadı | TurkHekim" };
    const ad = `Av. ${a.ad} ${a.soyad || ""}`;
    return {
      title: `${ad} — Sağlık Hukuku Avukatı | TurkHekim`,
      description: (a.hakkinda || `${ad} — ${a.uzmanlik_alanlari || ""} ${a.sehir ? "· " + a.sehir : ""}`).slice(0, 160),
      alternates: { canonical: `https://turkhekim.com/hukuk/avukat/${a.slug}` },
    };
  } catch {
    return { title: "TurkHekim Hukuk" };
  }
}

export default async function AvukatProfil({ params }) {
  const p = await params;
  let avukat;
  let makaleler = [];
  try {
    [avukat] = await sql`
      SELECT id, slug, ad, soyad, telefon, baro_sicil_no, baro_sehir, uzmanlik_alanlari,
             deneyim_yil, sehir, hakkinda, saatlik_ucret, foto_url
      FROM avukatlar
      WHERE slug = ${p.slug} AND aktif = true
    `;
    if (avukat) {
      makaleler = await sql`
        SELECT slug, baslik, kategori, yayin_tarihi
        FROM hukuki_makaleler
        WHERE yazar_avukat_id = ${avukat.id} AND yayinda = true
        ORDER BY yayin_tarihi DESC LIMIT 10
      `;
    }
  } catch (err) {
    console.error("Avukat profil hatası:", err);
  }

  if (!avukat) notFound();

  const adTam = `Av. ${avukat.ad} ${avukat.soyad || ""}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: adTam,
    description: avukat.hakkinda || `${avukat.uzmanlik_alanlari} avukatı`,
    areaServed: avukat.sehir,
    knowsAbout: avukat.uzmanlik_alanlari?.split(",").map(s => s.trim()),
    provider: { "@type": "Person", name: adTam },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section style={{ background: "linear-gradient(135deg, var(--navy), #0a3d62)" }} className="px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center text-5xl overflow-hidden shrink-0">
            {avukat.foto_url ? (
              <img src={avukat.foto_url} alt={adTam} className="w-full h-full object-cover" />
            ) : (
              "👨‍⚖️"
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">{adTam}</h1>
            <p className="text-gray-300 text-sm mb-3">{avukat.uzmanlik_alanlari}</p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start text-xs text-gray-300">
              {avukat.sehir && <span>📍 {avukat.sehir}</span>}
              {avukat.deneyim_yil > 0 && <span>⚖️ {avukat.deneyim_yil} yıl deneyim</span>}
              {avukat.baro_sicil_no && <span>🏛️ Baro: {avukat.baro_sehir || ""} #{avukat.baro_sicil_no}</span>}
            </div>
          </div>
          {avukat.saatlik_ucret && (
            <div className="bg-white/10 rounded-xl px-5 py-3 text-white text-center">
              <div className="text-xs opacity-70">Saatlik</div>
              <div className="text-xl font-bold">₺{Number(avukat.saatlik_ucret).toLocaleString("tr-TR")}</div>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {avukat.hakkinda && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Hakkında</h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{avukat.hakkinda}</p>
            </div>
          )}

          {makaleler.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Yazıları</h2>
              <ul className="space-y-2">
                {makaleler.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/hukuk/makale/${m.slug}`} className="text-sm hover:underline" style={{ color: "var(--teal)" }}>
                      {m.baslik}
                    </Link>
                    <span className="text-xs text-gray-400 ml-2">{new Date(m.yayin_tarihi).toLocaleDateString("tr-TR")}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <Link
            href="/hukuk/danismanlik-talep"
            style={{ backgroundColor: "var(--teal)" }}
            className="block text-white text-center py-3 rounded-lg font-semibold hover:opacity-90"
          >
            📨 Danışmanlık Talep Et
          </Link>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-xs text-gray-600">
            <p className="mb-2">
              Tüm görüşmeler avukat-müvekkil gizliliği kapsamındadır (Avukatlık K. m.36).
              Talebiniz doğrudan avukata iletilir.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
