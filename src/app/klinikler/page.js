import Link from "next/link";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";

export const metadata = {
  title: "Klinikler & Sağlık Tesisleri | TurkHekim",
  description: "Muayenehane, poliklinik, hastane ve tıp merkezi rehberi. Şehir ve kurum tipine göre filtreleyin.",
  alternates: { canonical: "https://turkhekim.com/klinikler" },
};

export const dynamic = "force-dynamic";

const KURUM_TIPLERI = [
  { kod: "muayenehane", ad: "Muayenehane", ikon: "🩺" },
  { kod: "poliklinik", ad: "Poliklinik", ikon: "🏥" },
  { kod: "hastane", ad: "Hastane", ikon: "🏨" },
  { kod: "tip_merkezi", ad: "Tıp Merkezi", ikon: "⚕️" },
];

export default async function KlinikListesi({ searchParams }) {
  const params = await searchParams;
  const sehir = params?.sehir?.toString() || "";
  const tip = params?.tip?.toString() || "";

  let klinikler = [];
  try {
    if (sehir && tip) {
      klinikler = await sql`
        SELECT id, slug, ad, kurum_tipi, sehir, adres, logo_url, hakkinda
        FROM klinikler WHERE onaylandi = true AND sehir ILIKE ${"%" + sehir + "%"} AND kurum_tipi = ${tip}
        ORDER BY ad ASC LIMIT 100
      `;
    } else if (sehir) {
      klinikler = await sql`
        SELECT id, slug, ad, kurum_tipi, sehir, adres, logo_url, hakkinda
        FROM klinikler WHERE onaylandi = true AND sehir ILIKE ${"%" + sehir + "%"}
        ORDER BY ad ASC LIMIT 100
      `;
    } else if (tip) {
      klinikler = await sql`
        SELECT id, slug, ad, kurum_tipi, sehir, adres, logo_url, hakkinda
        FROM klinikler WHERE onaylandi = true AND kurum_tipi = ${tip}
        ORDER BY ad ASC LIMIT 100
      `;
    } else {
      klinikler = await sql`
        SELECT id, slug, ad, kurum_tipi, sehir, adres, logo_url, hakkinda
        FROM klinikler WHERE onaylandi = true
        ORDER BY ad ASC LIMIT 100
      `;
    }
  } catch (err) {
    console.error("Klinik liste hatası:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">Klinikler & Sağlık Tesisleri</h1>
            <p className="text-gray-300 text-sm">Muayenehane, poliklinik, hastane ve tıp merkezi rehberi.</p>
          </div>
          <Link href="/klinik-kayit" style={{ backgroundColor: "var(--teal)" }} className="text-white px-4 py-2 rounded-lg font-semibold text-sm">
            🏥 Kliniğinizi Ekleyin
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-6">
        <form className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 grid sm:grid-cols-3 gap-3" method="GET">
          <input name="sehir" defaultValue={sehir} placeholder="Şehir (örn: Ankara)" className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <select name="tip" defaultValue={tip} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Tüm kurum tipleri</option>
            {KURUM_TIPLERI.map(t => <option key={t.kod} value={t.kod}>{t.ikon} {t.ad}</option>)}
          </select>
          <button type="submit" style={{ backgroundColor: "var(--teal)" }} className="text-white rounded-lg px-3 py-2 text-sm font-semibold">
            Filtrele
          </button>
        </form>

        {klinikler.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
            <div className="text-4xl mb-3">🏥</div>
            <p className="font-semibold mb-1">Klinik bulunamadı</p>
            <p className="text-sm">Henüz aktif klinik yok veya filtrelerle eşleşmedi.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {klinikler.map((k) => {
              const tipBilgi = KURUM_TIPLERI.find(t => t.kod === k.kurum_tipi);
              return (
                <Link key={k.id} href={`/klinik/${k.slug}`} className="bg-white rounded-xl border border-gray-200 hover:border-teal-400 transition p-5 flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    {k.logo_url ? <img src={k.logo_url} alt="" className="w-full h-full object-cover" /> : tipBilgi?.ikon || "🏥"}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase mb-0.5" style={{ color: "var(--teal)" }}>{tipBilgi?.ad || k.kurum_tipi}</div>
                    <h3 className="font-bold" style={{ color: "var(--navy)" }}>{k.ad}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">📍 {k.sehir}</p>
                    {k.hakkinda && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{k.hakkinda}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
