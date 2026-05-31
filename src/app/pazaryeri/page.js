import Link from "next/link";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import { PAZARYERI_KATEGORILERI, kategoriBul } from "@/lib/pazaryeriKategorileri";

export const metadata = {
  title: "TurkHekim Pazaryeri — Cihaz, Sarf, İmplant, İlaç | B2B",
  description:
    "Doktor ve sağlık kuruluşlarını TİTCK belgeli, vergi levhalı firmalarla buluşturan B2B pazaryeri. Cihaz, sarf malzeme, implant, ilaç ve daha fazlası.",
  alternates: { canonical: "https://turkhekim.com/pazaryeri" },
};

export const dynamic = "force-dynamic";

export default async function PazaryeriAnasayfa({ searchParams }) {
  const params = await searchParams;
  const kategori = params?.kategori?.toString() || "";
  const arama = params?.q?.toString() || "";

  let ilanlar = [];
  try {
    if (kategori && arama) {
      ilanlar = await sql`
        SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
               i.foto_urls, i.stok_durumu, i.goruntulenme,
               f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
        FROM firma_ilanlar i
        JOIN firmalar f ON f.id = i.firma_id
        WHERE i.aktif = true AND i.kategori = ${kategori}
          AND (i.baslik ILIKE ${"%" + arama + "%"} OR i.aciklama ILIKE ${"%" + arama + "%"})
        ORDER BY i.created_at DESC LIMIT 60
      `;
    } else if (kategori) {
      ilanlar = await sql`
        SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
               i.foto_urls, i.stok_durumu, i.goruntulenme,
               f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
        FROM firma_ilanlar i
        JOIN firmalar f ON f.id = i.firma_id
        WHERE i.aktif = true AND i.kategori = ${kategori}
        ORDER BY i.created_at DESC LIMIT 60
      `;
    } else if (arama) {
      ilanlar = await sql`
        SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
               i.foto_urls, i.stok_durumu, i.goruntulenme,
               f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
        FROM firma_ilanlar i
        JOIN firmalar f ON f.id = i.firma_id
        WHERE i.aktif = true
          AND (i.baslik ILIKE ${"%" + arama + "%"} OR i.aciklama ILIKE ${"%" + arama + "%"})
        ORDER BY i.created_at DESC LIMIT 60
      `;
    } else {
      ilanlar = await sql`
        SELECT i.id, i.baslik, i.kategori, i.aciklama, i.fiyat_min, i.fiyat_max, i.para_birimi,
               i.foto_urls, i.stok_durumu, i.goruntulenme,
               f.ad AS firma_ad, f.slug AS firma_slug, f.logo_url AS firma_logo
        FROM firma_ilanlar i
        JOIN firmalar f ON f.id = i.firma_id
        WHERE i.aktif = true
        ORDER BY i.created_at DESC LIMIT 60
      `;
    }
  } catch (err) {
    console.error("Pazaryeri ilan listesi hatası:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, var(--navy), #0a3d62)" }} className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }} className="text-xs font-bold px-3 py-1 rounded-full">
                B2B Pazaryeri
              </span>
              <h1 className="text-white text-3xl md:text-4xl font-bold mt-3 mb-2">
                Sağlığın Tedarik Zinciri
              </h1>
              <p className="text-gray-300 max-w-xl">
                TİTCK belgeli, vergi levhalı firmalarla doğrudan iletişim. Cihaz, sarf, implant, ilaç ve daha fazlası tek platformda.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/pazaryeri/talep-olustur" style={{ backgroundColor: "var(--teal)" }} className="text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                🎯 Malzeme Arıyorum (RFQ)
              </Link>
              <Link href="/pazaryeri/talepler" className="bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20">
                📋 Açık Talepler
              </Link>
              <Link href="/firma-kayit" className="border-2 border-white/40 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10">
                🏢 Firma Kayıt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 -mt-6 mb-8">
        <form className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-wrap gap-2" method="GET">
          <input
            type="text"
            name="q"
            defaultValue={arama}
            placeholder="Ne arıyorsunuz? örn: ultrason, dental implant…"
            className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
          />
          <select name="kategori" defaultValue={kategori} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Tüm Kategoriler</option>
            {PAZARYERI_KATEGORILERI.map((k) => (
              <option key={k.kod} value={k.kod}>{k.ikon} {k.ad}</option>
            ))}
          </select>
          <button type="submit" style={{ backgroundColor: "var(--navy)" }} className="text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
            Ara
          </button>
        </form>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Kategoriler</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {PAZARYERI_KATEGORILERI.map((k) => (
            <Link
              key={k.kod}
              href={`/pazaryeri?kategori=${k.kod}`}
              className={`bg-white border rounded-xl p-3 text-center hover:border-teal-400 transition ${
                kategori === k.kod ? "border-teal-500 ring-2 ring-teal-100" : "border-gray-200"
              }`}
            >
              <div className="text-2xl mb-1">{k.ikon}</div>
              <div className="text-[11px] text-gray-700">{k.ad}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold" style={{ color: "var(--navy)" }}>
            {kategori ? kategoriBul(kategori).ad + " İlanları" : arama ? `"${arama}" sonuçları` : "Tüm İlanlar"}
          </h2>
          <span className="text-xs text-gray-500">{ilanlar.length} sonuç</span>
        </div>

        {ilanlar.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-3">📦</div>
            <p className="font-semibold text-gray-700 mb-1">İlan bulunamadı</p>
            <p className="text-sm text-gray-500 mb-4">
              {kategori || arama ? "Farklı kriter deneyin veya talebinizi siz oluşturun." : "Henüz ilan yok. İlk ekleyen siz olun!"}
            </p>
            <Link href="/pazaryeri/talep-olustur" className="inline-block underline" style={{ color: "var(--teal)" }}>
              Aradığınızı bulamadıysanız → talep oluşturun
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ilanlar.map((i) => {
              const kat = kategoriBul(i.kategori);
              const fotolar = Array.isArray(i.foto_urls) ? i.foto_urls : [];
              const ilkFoto = fotolar[0];
              return (
                <Link key={i.id} href={`/pazaryeri/ilan/${i.id}`} className="bg-white rounded-xl border border-gray-200 hover:border-teal-400 transition overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
                    {ilkFoto ? <img src={ilkFoto} alt={i.baslik} className="w-full h-full object-cover" /> : kat.ikon}
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] font-semibold uppercase mb-1" style={{ color: "var(--teal)" }}>
                      {kat.ad}
                    </div>
                    <h3 className="font-bold text-sm line-clamp-2 mb-2" style={{ color: "var(--navy)" }}>{i.baslik}</h3>
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
                      {i.firma_logo ? <img src={i.firma_logo} alt="" className="w-4 h-4 rounded" /> : <span>🏢</span>}
                      <span className="truncate">{i.firma_ad}</span>
                    </div>
                    {(i.fiyat_min || i.fiyat_max) && (
                      <div className="text-sm font-semibold" style={{ color: "var(--teal)" }}>
                        {i.fiyat_min && Number(i.fiyat_min).toLocaleString("tr-TR")}
                        {i.fiyat_min && i.fiyat_max ? " – " : ""}
                        {i.fiyat_max && Number(i.fiyat_max).toLocaleString("tr-TR")}
                        &nbsp;{i.para_birimi}
                      </div>
                    )}
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
