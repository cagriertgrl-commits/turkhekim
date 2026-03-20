import Navbar from "@/components/Navbar";
import YorumFormu from "@/components/YorumFormu";
import RandevuFormu from "@/components/RandevuFormu";
import sql from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doktorlar = await sql`SELECT ad, uzmanlik, sehir FROM doktorlar WHERE slug = ${slug}`;
  if (!doktorlar.length) return { title: "Doktor Bulunamadı" };
  const d = doktorlar[0];
  return {
    title: `${d.ad} — ${d.uzmanlik} | DoktorPusula`,
    description: `${d.ad} profilini inceleyin. ${d.sehir} şehrinde ${d.uzmanlik}. Doğrulanmış yorumlar ve online randevu.`,
    alternates: { canonical: `https://doktorpusula.com/doktor/${slug}` },
  };
}

function YildizBar({ puan, toplam }) {
  const yuzde = toplam > 0 ? Math.round((puan / toplam) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 w-4">{puan}★</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div style={{ width: `${yuzde}%`, backgroundColor: "#C9A84C" }} className="h-full rounded-full" />
      </div>
      <span className="text-gray-400 w-4">{puan}</span>
    </div>
  );
}

const CALISMA_SAATLERI = [
  { gun: "Pazartesi", saat: "09:00 - 17:00", acik: true },
  { gun: "Salı", saat: "09:00 - 17:00", acik: true },
  { gun: "Çarşamba", saat: "10:00 - 18:00", acik: true },
  { gun: "Perşembe", saat: "09:00 - 17:00", acik: true },
  { gun: "Cuma", saat: "09:00 - 15:00", acik: true },
  { gun: "Cumartesi", saat: "Kapalı", acik: false },
  { gun: "Pazar", saat: "Kapalı", acik: false },
];

export default async function DoktorProfil({ params }) {
  const { slug } = await params;

  const doktorlar = await sql`SELECT * FROM doktorlar WHERE slug = ${slug}`;
  if (!doktorlar.length) notFound();
  const doktor = doktorlar[0];

  const yorumlar = await sql`
    SELECT * FROM yorumlar WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC
  `;

  const initials = doktor.ad.split(" ").slice(1).map(n => n[0]).join("").slice(0, 2);

  const sehirSlug = doktor.sehir?.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-") || "istanbul";
  const uzmanlikSlug = doktor.uzmanlik?.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"") || "doktor";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": doktor.ad,
            "medicalSpecialty": doktor.uzmanlik,
            "address": { "@type": "PostalAddress", "addressLocality": doktor.sehir, "addressCountry": "TR" },
            "aggregateRating": doktor.yorum_sayisi > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": doktor.puan,
              "reviewCount": doktor.yorum_sayisi,
            } : undefined,
          }),
        }}
      />

      {/* HERO BANNER */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 pt-10 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href={`/${sehirSlug}/${uzmanlikSlug}`} className="hover:text-white transition-colors">{doktor.uzmanlik}</Link>
            <span>/</span>
            <span className="text-gray-300">{doktor.ad}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Fotoğraf */}
            <div className="flex-shrink-0">
              {doktor.foto_url ? (
                <img
                  src={doktor.foto_url}
                  alt={doktor.ad}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 shadow-xl"
                  style={{ borderColor: "#0E7C7B" }}
                />
              ) : (
                <div
                  style={{ backgroundColor: "#0E7C7B", color: "white" }}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl flex items-center justify-center font-bold text-4xl shadow-xl"
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Bilgiler */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {doktor.onaylandi && (
                  <span style={{ backgroundColor: "#059669", color: "white" }} className="text-xs px-3 py-1 rounded-full font-semibold">
                    ✓ Doğrulanmış Doktor
                  </span>
                )}
                {doktor.deneyim && (
                  <span style={{ backgroundColor: "#1E40AF", color: "white" }} className="text-xs px-3 py-1 rounded-full font-semibold">
                    ⭐ {doktor.deneyim} Deneyim
                  </span>
                )}
              </div>

              <h1 className="text-white text-2xl md:text-4xl font-bold mb-1">{doktor.ad}</h1>
              <p style={{ color: "#4DD9D8" }} className="text-lg font-medium mb-1">{doktor.uzmanlik}</p>
              <p className="text-gray-400 text-sm mb-4">
                📍 {doktor.sehir}{doktor.ilce ? `, ${doktor.ilce}` : ""}
              </p>

              {/* Hızlı istatistikler */}
              <div className="flex flex-wrap gap-4">
                {doktor.yorum_sayisi > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="text-white font-bold text-xl">{doktor.puan}</span>
                    <span className="text-gray-400 text-sm">({doktor.yorum_sayisi} yorum)</span>
                  </div>
                )}
                {doktor.fiyat && (
                  <div style={{ backgroundColor: "#ffffff15", borderColor: "#ffffff20" }} className="border rounded-xl px-4 py-2 text-center">
                    <div style={{ color: "#C9A84C" }} className="font-bold text-sm">{doktor.fiyat}</div>
                    <div className="text-gray-400 text-xs">Muayene</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İÇERİK */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-16">
        <div className="grid md:grid-cols-3 gap-6">

          {/* SAĞ KOLON (Sidebar) */}
          <div className="md:col-span-1 space-y-4 md:order-2">

            {/* Randevu Al */}
            <RandevuFormu doktorId={doktor.id} doktorAd={doktor.ad} />

            {/* Çalışma Saatleri */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span style={{ color: "#0E7C7B" }}>🕐</span> Çalışma Saatleri
              </h3>
              <div className="space-y-2">
                {CALISMA_SAATLERI.map(({ gun, saat, acik }) => (
                  <div key={gun} className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{gun}</span>
                    <span className={acik ? "font-medium" : "text-gray-400"} style={acik ? { color: "#059669" } : {}}>
                      {saat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paylaş */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Profili Paylaş</h3>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${doktor.ad} - DoktorPusula\nhttps://doktorpusula.com/doktor/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs py-2 rounded-xl font-semibold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#25D366", color: "white" }}
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => navigator.clipboard?.writeText(`https://doktorpusula.com/doktor/${slug}`)}
                  className="flex-1 text-center text-xs py-2 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Bağlantıyı Kopyala
                </button>
              </div>
            </div>

          </div>

          {/* SOL KOLON (Ana içerik) */}
          <div className="md:col-span-2 space-y-5 md:order-1">

            {/* Hakkında */}
            {doktor.hakkinda && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                  <span style={{ color: "#0E7C7B" }}>👨‍⚕️</span> Hakkında
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{doktor.hakkinda}</p>
              </div>
            )}

            {/* Yorumlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <span style={{ color: "#0E7C7B" }}>⭐</span> Hasta Yorumları
                </h2>
                {doktor.yorum_sayisi > 0 && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-yellow-400 text-2xl font-bold">{doktor.puan}</span>
                      <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                    <div className="flex mt-1 justify-end">
                      {[1,2,3,4,5].map(y => (
                        <span key={y} className={parseFloat(doktor.puan) >= y ? "text-yellow-400" : "text-gray-200"}>★</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{doktor.yorum_sayisi} değerlendirme</p>
                  </div>
                )}
              </div>

              {/* Rating bars */}
              {doktor.yorum_sayisi > 0 && (
                <div className="mb-6 space-y-1.5 p-4 rounded-xl" style={{ backgroundColor: "#F5F7FA" }}>
                  {[5,4,3,2,1].map(p => (
                    <YildizBar key={p} puan={p} toplam={yorumlar.filter(y => y.puan === p).length} />
                  ))}
                </div>
              )}

              <div style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }} className="border rounded-xl p-3 mb-5">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Tüm yorumlar telefon numarasıyla doğrulanmıştır ve <strong>değiştirilemez</strong>.
                </p>
              </div>

              {yorumlar.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">💬</div>
                  <p className="text-gray-400 text-sm">Henüz yorum yok. İlk yorumu siz bırakın!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {yorumlar.map((yorum) => (
                    <div key={yorum.id} className="p-4 rounded-xl border border-gray-100 hover:border-teal-100 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {yorum.hasta_adi[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-gray-900">{yorum.hasta_adi}</span>
                              {yorum.dogrulanmis && (
                                <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full font-medium">
                                  ✓ Doğrulanmış
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{yorum.tarih}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(y => (
                            <span key={y} className={y <= yorum.puan ? "text-yellow-400" : "text-gray-200"} style={{ fontSize: "14px" }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{yorum.metin}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Yorum Formu */}
            <YorumFormu doktorId={doktor.id} />

          </div>
        </div>
      </div>
    </div>
  );
}
