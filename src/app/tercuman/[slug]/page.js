import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import YorumBolumu from "./YorumBolumu";
import MusaitlikBolumu from "./MusaitlikBolumu";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [tercuman] = await sql`SELECT ad, soyad, diller, sehir FROM tercumanlar WHERE slug = ${slug} AND aktif = true`;
  if (!tercuman) return { title: "Tercüman Bulunamadı" };
  const ad = [tercuman.ad, tercuman.soyad].filter(Boolean).join(" ");
  return {
    title: `${ad} — Medikal Tercüman`,
    description: `${ad} — ${tercuman.diller}. ${tercuman.sehir || "Türkiye"} medikal tercüman profili.`,
  };
}

export default async function TercumanProfil({ params }) {
  const { slug } = await params;

  const [t] = await sql`
    SELECT id, slug, ad, soyad, email, telefon, foto_url, hakkinda, diller, uzmanlik_alani, sertifikalar, deneyim_yil, sehir, fiyat, musait
    FROM tercumanlar
    WHERE slug = ${slug} AND aktif = true
  `;

  if (!t) notFound();

  const ad = [t.ad, t.soyad].filter(Boolean).join(" ");
  const initials = ad.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const dilListesi = t.diller ? t.diller.split(",").map(d => d.trim()) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link>
          <span className="mx-2">›</span>
          <Link href="/tercumanlar" className="hover:text-gray-600">Tercümanlar</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "var(--teal)" }}>{ad}</span>
        </p>

        {/* Profil kartı */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Üst banner */}
          <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }} className="px-8 pt-10 pb-20 relative">
            <div className="flex items-center gap-5">
              {t.foto_url ? (
                <img src={t.foto_url} alt={ad} className="w-24 h-24 rounded-2xl object-cover border-4 border-white/20 shadow-lg" />
              ) : (
                <div style={{ backgroundColor: "var(--teal)" }} className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20 shadow-lg">
                  {initials}
                </div>
              )}
              <div>
                <h1 className="text-white text-2xl font-bold">{ad}</h1>
                <p style={{ color: "#4DD9D8" }} className="text-sm font-semibold">Medikal Tercüman</p>
                {t.sehir && <p className="text-gray-300 text-sm mt-0.5">{t.sehir}</p>}
              </div>
              <div className="ml-auto">
                <span style={{ backgroundColor: t.musait ? "rgba(5,150,105,0.2)" : "rgba(220,38,38,0.2)", color: t.musait ? "#6EE7B7" : "#FCA5A5" }}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold">
                  {t.musait ? "Müsait" : "Meşgul"}
                </span>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8 -mt-10 relative">

            {/* Diller */}
            {dilListesi.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Diller</h2>
                <div className="flex flex-wrap gap-2">
                  {dilListesi.map(dil => (
                    <span key={dil} style={{ backgroundColor: "#F0FDFA", color: "var(--teal)" }}
                      className="text-sm px-3 py-1.5 rounded-full font-medium border border-teal-100">
                      {dil}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bilgi grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {t.uzmanlik_alani && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Uzmanlık</p>
                  <p className="text-sm font-semibold text-gray-800">{t.uzmanlik_alani}</p>
                </div>
              )}
              {t.deneyim_yil > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Deneyim</p>
                  <p className="text-sm font-semibold text-gray-800">{t.deneyim_yil} yıl</p>
                </div>
              )}
              {t.fiyat && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Ücret</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {/^[\d.,\s]+$/.test(t.fiyat.trim()) ? `${t.fiyat.trim()} ₺ / seans` : t.fiyat}
                  </p>
                </div>
              )}
              {t.sertifikalar && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Sertifikalar</p>
                  <p className="text-sm font-semibold text-gray-800">{t.sertifikalar}</p>
                </div>
              )}
            </div>

            {/* Hakkında */}
            {t.hakkinda && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Hakkında</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{t.hakkinda}</p>
              </div>
            )}

            {/* İletişim */}
            <div className="flex flex-wrap gap-3">
              {t.telefon && (
                <a href={`tel:${t.telefon}`} style={{ backgroundColor: "var(--teal)" }}
                  className="inline-flex items-center gap-2 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Ara
                </a>
              )}
              {t.telefon && (
                <a href={`https://wa.me/${t.telefon.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                  WhatsApp
                </a>
              )}
              {t.email && (
                <a href={`mailto:${t.email}`}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                  E-posta Gönder
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <MusaitlikBolumu tercumanId={t.id} />
          <YorumBolumu tercumanId={t.id} />
        </div>
      </div>
    </div>
  );
}
