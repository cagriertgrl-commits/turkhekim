import Navbar from "@/components/Navbar";
import YorumFormu from "@/components/YorumFormu";
import sql from "@/lib/db";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doktorlar = await sql`SELECT ad, uzmanlik, sehir FROM doktorlar WHERE slug = ${slug}`;
  if (!doktorlar.length) return { title: "Doktor Bulunamadı" };
  const d = doktorlar[0];
  return {
    title: `${d.ad} — ${d.uzmanlik} | TurkHekim`,
    description: `${d.ad} profilini inceleyin. ${d.sehir} şehrinde ${d.uzmanlik}. Doğrulanmış yorumlar ve online randevu.`,
    alternates: { canonical: `https://turkhekim.vercel.app/doktor/${slug}` },
  };
}

const CALISMA_SAATLERI = {
  "Pazartesi": "09:00 - 17:00",
  "Salı": "09:00 - 17:00",
  "Çarşamba": "10:00 - 18:00",
  "Perşembe": "09:00 - 17:00",
  "Cuma": "09:00 - 15:00",
};

export default async function DoktorProfil({ params }) {
  const { slug } = await params;

  const doktorlar = await sql`SELECT * FROM doktorlar WHERE slug = ${slug}`;
  if (!doktorlar.length) notFound();
  const doktor = doktorlar[0];

  const yorumlar = await sql`
    SELECT * FROM yorumlar WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC
  `;

  const initials = doktor.ad.split(" ").slice(1).map(n => n[0]).join("").slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* SOL KOLON */}
          <div className="md:col-span-1 space-y-4">

            {/* Profil Kartı */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-4">
                {initials}
              </div>
              <h1 className="text-xl font-bold text-gray-900">{doktor.ad}</h1>
              <p style={{ color: "#0E7C7B" }} className="font-medium text-sm mt-1">{doktor.uzmanlik}</p>
              <p className="text-gray-400 text-sm mt-1">📍 {doktor.sehir}{doktor.ilce ? ` · ${doktor.ilce}` : ""}</p>
              {doktor.yorum_sayisi > 0 && (
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-bold">{doktor.puan}</span>
                  <span className="text-gray-400 text-sm">({doktor.yorum_sayisi} yorum)</span>
                </div>
              )}
              {doktor.deneyim && (
                <div style={{ borderColor: "#E8F5F5" }} className="border-t mt-4 pt-4 text-sm text-gray-500">
                  {doktor.deneyim} deneyim
                </div>
              )}
              {doktor.fiyat && (
                <div className="mt-2 text-sm text-gray-500">
                  Muayene: <strong className="text-gray-900">{doktor.fiyat}</strong>
                </div>
              )}
            </div>

            {/* Randevu Al */}
            <div id="randevu" className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Randevu Al</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Adınız Soyadınız</label>
                  <input type="text" placeholder="Ad Soyad" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Telefon</label>
                  <input type="tel" placeholder="0532 xxx xx xx" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Şikayet (opsiyonel)</label>
                  <textarea placeholder="Kısaca belirtin..." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
                </div>
                <button style={{ backgroundColor: "#0D2137" }} className="w-full text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                  Randevu Talebi Gönder
                </button>
                <p className="text-xs text-gray-400 text-center">SMS ile onay alacaksınız</p>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Çalışma Saatleri</h3>
              <div className="space-y-2">
                {Object.entries(CALISMA_SAATLERI).map(([gun, saat]) => (
                  <div key={gun} className="flex justify-between text-sm">
                    <span className="text-gray-500">{gun}</span>
                    <span style={{ color: "#059669" }} className="font-medium">{saat}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cumartesi</span>
                  <span className="text-gray-400">Kapalı</span>
                </div>
              </div>
            </div>

          </div>

          {/* SAĞ KOLON */}
          <div className="md:col-span-2 space-y-6">

            {/* Hakkında */}
            {doktor.hakkinda && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 text-lg mb-3">Hakkında</h2>
                <p className="text-gray-600 leading-relaxed">{doktor.hakkinda}</p>
              </div>
            )}

            {/* Yorumlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900 text-lg">Hasta Yorumları</h2>
                {doktor.yorum_sayisi > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="font-bold text-xl">{doktor.puan}</span>
                    <span className="text-gray-400 text-sm">/ 5</span>
                  </div>
                )}
              </div>

              {yorumlar.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">Henüz yorum yok. İlk yorumu siz bırakın!</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {yorumlar.map((yorum) => (
                    <div key={yorum.id} style={{ borderColor: "#F5F7FA" }} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            {yorum.hasta_adi[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-gray-900">{yorum.hasta_adi}</span>
                              {yorum.dogrulanmis && (
                                <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full font-medium">
                                  ✓ Doğrulanmış
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{yorum.tarih}</span>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(yorum.puan)].map((_, j) => (
                            <span key={j} className="text-yellow-400 text-sm">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{yorum.metin}</p>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ backgroundColor: "#F5F7FA" }} className="rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Tüm yorumlar telefon numarasıyla doğrulanmıştır ve <strong>silinemez</strong>.
                </p>
              </div>
            </div>

            {/* Yorum Formu */}
            <YorumFormu doktorId={doktor.id} />

          </div>
        </div>
      </div>
    </div>
  );
}
