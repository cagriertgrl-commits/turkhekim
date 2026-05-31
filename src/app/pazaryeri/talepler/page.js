import Link from "next/link";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import { PAZARYERI_KATEGORILERI, kategoriBul } from "@/lib/pazaryeriKategorileri";

export const metadata = {
  title: "Açık Malzeme Talepleri (RFQ) | TurkHekim Pazaryeri",
  description: "Doktor ve sağlık kuruluşlarının açık talepleri. Tıbbi cihaz, sarf, implant ve ilaç firmaları için fırsat panosu.",
  alternates: { canonical: "https://turkhekim.com/pazaryeri/talepler" },
};

export const dynamic = "force-dynamic";

export default async function TaleplerKurulu({ searchParams }) {
  const params = await searchParams;
  const kategori = params?.kategori?.toString() || "";

  let talepler = [];
  try {
    talepler = kategori
      ? await sql`
          SELECT t.id, t.kategori, t.baslik, t.aciklama, t.butce, t.son_tarih, t.created_at,
                 d.ad AS doktor_ad, d.uzmanlik AS doktor_uzmanlik, d.sehir AS doktor_sehir
          FROM malzeme_talepleri t
          LEFT JOIN doktorlar d ON d.id = t.doktor_id
          WHERE t.durum = 'acik' AND t.kategori = ${kategori}
          ORDER BY t.created_at DESC LIMIT 100
        `
      : await sql`
          SELECT t.id, t.kategori, t.baslik, t.aciklama, t.butce, t.son_tarih, t.created_at,
                 d.ad AS doktor_ad, d.uzmanlik AS doktor_uzmanlik, d.sehir AS doktor_sehir
          FROM malzeme_talepleri t
          LEFT JOIN doktorlar d ON d.id = t.doktor_id
          WHERE t.durum = 'acik'
          ORDER BY t.created_at DESC LIMIT 100
        `;
  } catch (err) {
    console.error("Talep listesi hatası:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">📋 Açık Malzeme Talepleri</h1>
          <p className="text-gray-300 text-sm">
            Doktor ve sağlık kuruluşlarının aktif RFQ'ları. Firma olarak tekliflerinizi iletin.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/pazaryeri/talepler" className={`px-3 py-1.5 rounded-full text-xs border ${!kategori ? "bg-teal-100 border-teal-400 text-teal-800" : "bg-white border-gray-300 text-gray-700"}`}>
            Tümü
          </Link>
          {PAZARYERI_KATEGORILERI.map((k) => (
            <Link key={k.kod} href={`/pazaryeri/talepler?kategori=${k.kod}`}
                  className={`px-3 py-1.5 rounded-full text-xs border ${kategori === k.kod ? "bg-teal-100 border-teal-400 text-teal-800" : "bg-white border-gray-300 text-gray-700"}`}>
              {k.ikon} {k.ad}
            </Link>
          ))}
        </div>

        {talepler.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="font-semibold text-gray-700">Açık talep yok</p>
            <p className="text-sm text-gray-500 mt-1">Yeni talepler buradan akacak.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {talepler.map((t) => {
              const kat = kategoriBul(t.kategori);
              return (
                <div key={t.id} className="bg-white rounded-xl border border-gray-200 hover:border-teal-400 transition p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="text-[10px] font-semibold uppercase mb-1" style={{ color: "var(--teal)" }}>
                        {kat.ikon} {kat.ad}
                      </div>
                      <h3 className="font-bold" style={{ color: "var(--navy)" }}>{t.baslik}</h3>
                    </div>
                    <span className="text-[10px] text-gray-400">{new Date(t.created_at).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3 mb-3">{t.aciklama}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 items-center">
                    {t.doktor_ad && <span>👨‍⚕️ Dr. {t.doktor_ad}</span>}
                    {t.doktor_uzmanlik && <span>· {t.doktor_uzmanlik}</span>}
                    {t.doktor_sehir && <span>📍 {t.doktor_sehir}</span>}
                    {t.butce && <span className="font-semibold" style={{ color: "var(--teal)" }}>💰 {t.butce}</span>}
                    {t.son_tarih && <span>⏰ {new Date(t.son_tarih).toLocaleDateString("tr-TR")}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
          🏢 Firma mısınız? Mesajlaşma sistemimiz yakında aktif olacak. Şimdilik talepler için
          <a href="mailto:pazaryeri@turkhekim.com" className="underline mx-1">pazaryeri@turkhekim.com</a>
          adresine yazabilirsiniz.
        </div>
      </section>
    </div>
  );
}
