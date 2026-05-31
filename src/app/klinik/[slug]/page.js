import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

const KURUM_AD = {
  muayenehane: "Muayenehane",
  poliklinik: "Poliklinik",
  hastane: "Hastane",
  tip_merkezi: "Tıp Merkezi",
};

export async function generateMetadata({ params }) {
  const p = await params;
  try {
    const [k] = await sql`SELECT ad, sehir, kurum_tipi, hakkinda, slug FROM klinikler WHERE slug = ${p.slug} AND onaylandi = true`;
    if (!k) return { title: "Klinik Bulunamadı | TurkHekim" };
    return {
      title: `${k.ad} — ${KURUM_AD[k.kurum_tipi] || ""} ${k.sehir} | TurkHekim`,
      description: (k.hakkinda || `${k.ad} ${k.sehir} — TurkHekim klinik profili.`).slice(0, 160),
      alternates: { canonical: `https://turkhekim.com/klinik/${k.slug}` },
    };
  } catch {
    return { title: "TurkHekim" };
  }
}

export default async function KlinikProfil({ params }) {
  const p = await params;
  let klinik;
  let doktorlar = [];
  try {
    [klinik] = await sql`
      SELECT id, slug, ad, kurum_tipi, sehir, adres, telefon, email, website,
             logo_url, foto_urls, hakkinda, enlem, boylam, calisma_saatleri, hizmetler, goruntulenme
      FROM klinikler WHERE slug = ${p.slug} AND onaylandi = true
    `;
    if (klinik) {
      doktorlar = await sql`
        SELECT id, slug, ad, soyad, uzmanlik, foto_url, puan
        FROM doktorlar WHERE klinik_id = ${klinik.id} AND onaylandi = true
        ORDER BY puan DESC NULLS LAST, ad ASC LIMIT 30
      `;
    }
  } catch (err) {
    console.error("Klinik detay hatası:", err);
  }

  if (!klinik) notFound();

  try { await sql`UPDATE klinikler SET goruntulenme = goruntulenme + 1 WHERE id = ${klinik.id}`; } catch {}

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: klinik.ad,
    description: klinik.hakkinda || "",
    address: { "@type": "PostalAddress", streetAddress: klinik.adres, addressLocality: klinik.sehir, addressCountry: "TR" },
    telephone: klinik.telefon,
    email: klinik.email,
    url: klinik.website,
    image: klinik.logo_url,
    geo: klinik.enlem && klinik.boylam ? { "@type": "GeoCoordinates", latitude: klinik.enlem, longitude: klinik.boylam } : undefined,
    openingHours: klinik.calisma_saatleri,
    medicalSpecialty: doktorlar.map(d => d.uzmanlik).filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section style={{ background: "linear-gradient(135deg, var(--navy), #0a3d62)" }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center text-4xl overflow-hidden shrink-0">
            {klinik.logo_url ? <img src={klinik.logo_url} alt="" className="w-full h-full object-cover" /> : "🏥"}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }} className="text-[10px] font-bold uppercase px-2 py-1 rounded-full">
              {KURUM_AD[klinik.kurum_tipi] || klinik.kurum_tipi}
            </span>
            <h1 className="text-white text-2xl md:text-3xl font-bold mt-2 mb-1">{klinik.ad}</h1>
            <p className="text-gray-300 text-sm">📍 {klinik.adres ? `${klinik.adres}, ` : ""}{klinik.sehir}</p>
          </div>
          <div className="flex flex-col gap-2">
            {klinik.telefon && <a href={`tel:${klinik.telefon}`} style={{ backgroundColor: "var(--teal)" }} className="text-white px-4 py-2 rounded-lg text-sm font-semibold text-center">📞 Ara</a>}
            {klinik.website && <a href={klinik.website} target="_blank" rel="noopener" className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center hover:bg-white/20">🌐 Web</a>}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {klinik.hakkinda && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Hakkında</h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{klinik.hakkinda}</p>
            </div>
          )}

          {doktorlar.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Hekimlerimiz ({doktorlar.length})</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {doktorlar.map((d) => (
                  <Link key={d.id} href={`/doktor/${d.slug}`} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-teal-400">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg overflow-hidden shrink-0">
                      {d.foto_url ? <img src={d.foto_url} alt="" className="w-full h-full object-cover" /> : "👨‍⚕️"}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">Dr. {d.ad} {d.soyad || ""}</div>
                      <div className="text-xs text-gray-500 truncate">{d.uzmanlik || "—"}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {klinik.hizmetler && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Hizmetler</h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{klinik.hizmetler}</p>
            </div>
          )}
        </div>

        <aside className="space-y-3 text-sm">
          {klinik.calisma_saatleri && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--teal)" }}>🕐 Çalışma Saatleri</div>
              <p className="text-gray-700 whitespace-pre-wrap">{klinik.calisma_saatleri}</p>
            </div>
          )}
          {klinik.adres && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--teal)" }}>📍 Adres</div>
              <p className="text-gray-700">{klinik.adres}</p>
            </div>
          )}
          {klinik.email && (
            <a href={`mailto:${klinik.email}`} className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-teal-400">
              <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--teal)" }}>✉️ E-posta</div>
              <p className="text-gray-700 truncate">{klinik.email}</p>
            </a>
          )}
        </aside>
      </section>
    </div>
  );
}
