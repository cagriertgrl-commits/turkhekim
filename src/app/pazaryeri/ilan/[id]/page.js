import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import { kategoriBul, STOK_DURUMU } from "@/lib/pazaryeriKategorileri";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p = await params;
  try {
    const [ilan] = await sql`
      SELECT i.baslik, i.aciklama, f.ad AS firma_ad
      FROM firma_ilanlar i JOIN firmalar f ON f.id = i.firma_id
      WHERE i.id = ${parseInt(p.id)} AND i.aktif = true
    `;
    if (!ilan) return { title: "İlan Bulunamadı | TurkHekim Pazaryeri" };
    return {
      title: `${ilan.baslik} — ${ilan.firma_ad} | TurkHekim Pazaryeri`,
      description: (ilan.aciklama || ilan.baslik).slice(0, 160),
      alternates: { canonical: `https://turkhekim.com/pazaryeri/ilan/${p.id}` },
    };
  } catch {
    return { title: "TurkHekim Pazaryeri" };
  }
}

export default async function IlanDetay({ params }) {
  const p = await params;
  const id = parseInt(p.id);
  if (!id) notFound();

  let ilan;
  try {
    [ilan] = await sql`
      SELECT i.*, f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo,
             f.sehir AS firma_sehir, f.website AS firma_website, f.email AS firma_email,
             f.telefon AS firma_telefon, f.hakkinda AS firma_hakkinda, f.tip AS firma_tip
      FROM firma_ilanlar i
      JOIN firmalar f ON f.id = i.firma_id
      WHERE i.id = ${id} AND i.aktif = true
    `;
  } catch (err) {
    console.error("İlan detay hatası:", err);
  }
  if (!ilan) notFound();

  try { await sql`UPDATE firma_ilanlar SET goruntulenme = goruntulenme + 1 WHERE id = ${id}`; } catch {}

  const kat = kategoriBul(ilan.kategori);
  const fotolar = Array.isArray(ilan.foto_urls) ? ilan.foto_urls : [];
  const stok = STOK_DURUMU.find(s => s.kod === ilan.stok_durumu) || { ad: ilan.stok_durumu, renk: "gray" };
  const teknik = ilan.teknik_ozellikler && typeof ilan.teknik_ozellikler === "object" ? ilan.teknik_ozellikler : {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: ilan.baslik,
    description: ilan.aciklama || "",
    category: kat.ad,
    brand: { "@type": "Organization", name: ilan.firma_ad },
    offers: ilan.fiyat_min ? {
      "@type": "Offer",
      priceCurrency: ilan.para_birimi,
      price: ilan.fiyat_min,
      availability: ilan.stok_durumu === "stokta" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="max-w-5xl mx-auto px-6 py-6">
        <Link href="/pazaryeri" className="text-xs text-gray-500 hover:underline">← Pazaryeri</Link>

        <div className="grid md:grid-cols-2 gap-6 mt-3">
          <div>
            <div className="aspect-video bg-white rounded-2xl border border-gray-200 flex items-center justify-center text-7xl overflow-hidden">
              {fotolar[0] ? <img src={fotolar[0]} alt={ilan.baslik} className="w-full h-full object-cover" /> : kat.ikon}
            </div>
            {fotolar.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {fotolar.slice(1, 5).map((f, i) => (
                  <div key={i} className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <img src={f} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-semibold uppercase mb-2" style={{ color: "var(--teal)" }}>{kat.ad}</div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>{ilan.baslik}</h1>

            <div className="flex items-center gap-3 mb-4">
              <Link href={`/firma/${ilan.firma_slug}`} className="flex items-center gap-2 hover:underline text-sm">
                {ilan.firma_logo ? <img src={ilan.firma_logo} className="w-7 h-7 rounded" alt="" /> : <span>🏢</span>}
                <span className="font-semibold">{ilan.firma_ad}</span>
              </Link>
              {ilan.firma_sehir && <span className="text-xs text-gray-500">· {ilan.firma_sehir}</span>}
            </div>

            {(ilan.fiyat_min || ilan.fiyat_max) && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
                <div className="text-xs text-teal-700 uppercase font-semibold">Fiyat</div>
                <div className="text-2xl font-bold" style={{ color: "var(--teal)" }}>
                  {ilan.fiyat_min && Number(ilan.fiyat_min).toLocaleString("tr-TR")}
                  {ilan.fiyat_min && ilan.fiyat_max ? " – " : ""}
                  {ilan.fiyat_max && Number(ilan.fiyat_max).toLocaleString("tr-TR")}
                  &nbsp;<span className="text-sm font-normal">{ilan.para_birimi}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <span className={`px-2.5 py-1 rounded-full bg-${stok.renk}-100 text-${stok.renk}-800`}>● {stok.ad}</span>
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">👁️ {ilan.goruntulenme + 1} görüntülenme</span>
            </div>

            <div className="space-y-2 mb-4">
              <a href={`mailto:${ilan.firma_email}?subject=${encodeURIComponent("TurkHekim İlan Sorgu: " + ilan.baslik)}`}
                 style={{ backgroundColor: "var(--navy)" }}
                 className="block text-center text-white font-semibold py-3 rounded-lg hover:opacity-90">
                ✉️ Firmaya E-posta Gönder
              </a>
              {ilan.firma_telefon && (
                <a href={`tel:${ilan.firma_telefon}`} className="block text-center bg-white border-2 font-semibold py-3 rounded-lg hover:bg-gray-50"
                   style={{ borderColor: "var(--teal)", color: "var(--teal)" }}>
                  📞 {ilan.firma_telefon}
                </a>
              )}
            </div>

            <p className="text-xs text-gray-500">
              💡 Daha sonra modül içi güvenli mesajlaşma eklenecek — şimdilik doğrudan iletişim.
            </p>
          </div>
        </div>

        {ilan.aciklama && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
            <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Açıklama</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{ilan.aciklama}</p>
          </div>
        )}

        {Object.keys(teknik).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-4">
            <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>Teknik Özellikler</h2>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {Object.entries(teknik).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-100 py-1">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-semibold text-gray-800">{String(v)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>
    </div>
  );
}
