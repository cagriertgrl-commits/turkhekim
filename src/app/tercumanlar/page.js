import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Medikal Tercümanlar",
  description: "DoktorPusula medikal tercüman ağı. Arapça, Farsça, Rusça, İngilizce ve daha fazla dilde profesyonel sağlık tercümanları.",
  alternates: { canonical: "https://doktorpusula.com/tercumanlar" },
};

export default async function TercumanlarSayfasi() {
  let tercumanlar = [];
  try {
    tercumanlar = await sql`
      SELECT id, slug, ad, soyad, foto_url, diller, uzmanlik_alani, deneyim_yil, sehir, musait
      FROM tercumanlar
      WHERE aktif = true
      ORDER BY deneyim_yil DESC, ad ASC
    `;
  } catch {
    /* sessiz */
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white text-3xl font-bold mb-3">Medikal Tercümanlar</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Sağlık turizmi için profesyonel tercüman desteği.
            Arapça, Farsça, Rusça, İngilizce ve daha fazla dilde hizmet.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {tercumanlar.length === 0 ? (
          <div className="bg-white rounded-2xl p-14 text-center shadow-sm">
            <div className="text-4xl mb-4">🌐</div>
            <p style={{ color: "var(--navy)" }} className="font-bold text-lg mb-2">Henüz tercüman profili yok</p>
            <p className="text-gray-400 text-sm mb-6">Medikal tercüman olarak katılmak ister misiniz?</p>
            <Link href="/tercuman-ol" style={{ backgroundColor: "var(--teal)" }}
              className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
              Tercüman Olarak Kayıt Ol
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-6">{tercumanlar.length} tercüman bulundu</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tercumanlar.map((t) => {
                const ad = [t.ad, t.soyad].filter(Boolean).join(" ");
                const initials = ad.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                const dilListesi = t.diller ? t.diller.split(",").map(d => d.trim()).slice(0, 3) : [];
                return (
                  <Link key={t.id} href={`/tercuman/${t.slug}`}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="flex items-center gap-4 mb-4">
                      {t.foto_url ? (
                        <img src={t.foto_url} alt={ad} loading="lazy" className="w-14 h-14 rounded-xl object-cover" />
                      ) : (
                        <div style={{ backgroundColor: "var(--teal)" }}
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 style={{ color: "var(--navy)" }} className="font-bold text-base truncate">{ad}</h3>
                        {t.uzmanlik_alani && <p style={{ color: "var(--teal)" }} className="text-xs font-medium">{t.uzmanlik_alani}</p>}
                        {t.sehir && <p className="text-gray-400 text-xs">{t.sehir}</p>}
                      </div>
                      <span style={{ backgroundColor: t.musait ? "#D1FAE5" : "#FEE2E2", color: t.musait ? "#059669" : "#DC2626" }}
                        className="text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0">
                        {t.musait ? "Müsait" : "Meşgul"}
                      </span>
                    </div>

                    {/* Diller */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {dilListesi.map(dil => (
                        <span key={dil} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{dil}</span>
                      ))}
                      {t.diller && t.diller.split(",").length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-400">+{t.diller.split(",").length - 3}</span>
                      )}
                    </div>

                    {t.deneyim_yil > 0 && (
                      <p className="text-xs text-gray-400">{t.deneyim_yil} yıl deneyim</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-3">Siz de medikal tercüman olarak katılın</p>
          <Link href="/tercuman-ol" style={{ backgroundColor: "var(--navy)" }}
            className="inline-block text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Tercüman Olarak Kayıt Ol — 3 Dakika
          </Link>
        </div>
      </div>
    </div>
  );
}
