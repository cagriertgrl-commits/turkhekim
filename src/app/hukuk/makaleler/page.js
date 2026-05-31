import Link from "next/link";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import { HUKUKI_MAKALE_KATEGORILERI } from "@/lib/hukukKategorileri";

export const metadata = {
  title: "Sağlık Hukuku Makaleleri | TurkHekim",
  description: "Malpraktis emsalleri, sağlıkta reklam mevzuatı, TİTCK ve KVKK güncellemeleri — uzman avukatlardan makaleler.",
  alternates: { canonical: "https://turkhekim.com/hukuk/makaleler" },
};

export const dynamic = "force-dynamic";

export default async function MakaleListesi({ searchParams }) {
  const params = await searchParams;
  const kategori = params?.kategori?.toString() || "";

  let makaleler = [];
  try {
    makaleler = kategori
      ? await sql`
          SELECT m.id, m.slug, m.baslik, m.ozet, m.kategori, m.yayin_tarihi, m.goruntulenme,
                 a.ad AS yazar_ad, a.soyad AS yazar_soyad, a.slug AS yazar_slug
          FROM hukuki_makaleler m
          LEFT JOIN avukatlar a ON a.id = m.yazar_avukat_id
          WHERE m.yayinda = true AND m.kategori = ${kategori}
          ORDER BY m.yayin_tarihi DESC LIMIT 60
        `
      : await sql`
          SELECT m.id, m.slug, m.baslik, m.ozet, m.kategori, m.yayin_tarihi, m.goruntulenme,
                 a.ad AS yazar_ad, a.soyad AS yazar_soyad, a.slug AS yazar_slug
          FROM hukuki_makaleler m
          LEFT JOIN avukatlar a ON a.id = m.yazar_avukat_id
          WHERE m.yayinda = true
          ORDER BY m.yayin_tarihi DESC LIMIT 60
        `;
  } catch (err) {
    console.error("Makale listesi hatası:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Sağlık Hukuku Makaleleri</h1>
          <p className="text-gray-300">Mevzuat güncellemeleri, emsal kararlar ve uzman görüşleri.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/hukuk/makaleler" className={`px-3 py-1.5 rounded-full text-xs border ${!kategori ? "bg-teal-100 border-teal-400 text-teal-800" : "bg-white border-gray-300 text-gray-700"}`}>
            Tümü
          </Link>
          {HUKUKI_MAKALE_KATEGORILERI.map((k) => (
            <Link
              key={k}
              href={`/hukuk/makaleler?kategori=${encodeURIComponent(k)}`}
              className={`px-3 py-1.5 rounded-full text-xs border ${kategori === k ? "bg-teal-100 border-teal-400 text-teal-800" : "bg-white border-gray-300 text-gray-700"}`}
            >
              {k}
            </Link>
          ))}
        </div>

        {makaleler.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            <div className="text-4xl mb-3">📰</div>
            <p className="font-semibold">Henüz makale yok</p>
            <p className="text-sm mt-1">Yakında avukat ortaklarımızdan içerikler eklenecek.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {makaleler.map((m) => (
              <Link
                key={m.id}
                href={`/hukuk/makale/${m.slug}`}
                className="bg-white rounded-xl border border-gray-200 hover:border-teal-400 transition p-5"
              >
                <div className="text-[10px] font-semibold uppercase mb-2" style={{ color: "var(--teal)" }}>{m.kategori}</div>
                <h3 className="font-bold mb-2 line-clamp-2" style={{ color: "var(--navy)" }}>{m.baslik}</h3>
                {m.ozet && <p className="text-xs text-gray-600 line-clamp-3 mb-3">{m.ozet}</p>}
                <div className="text-[11px] text-gray-500 flex justify-between">
                  <span>{m.yazar_ad ? `Av. ${m.yazar_ad} ${m.yazar_soyad || ""}` : "TurkHekim Hukuk"}</span>
                  <span>{new Date(m.yayin_tarihi).toLocaleDateString("tr-TR")}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
