import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ad = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${ad} — Profil ve Randevu`,
    description: `${ad} profilini inceleyin. Doğrulanmış hasta yorumları, uzmanlık alanları ve online randevu. TurkHekim güvencesiyle.`,
    alternates: { canonical: `https://turkhekim.vercel.app/doktor/${slug}` },
  };
}

export default async function DoktorProfil({ params }) {
  await params;
  // İleride bu veri veritabanından gelecek
  const doktor = {
    ad: "Dr. Ayşe Kaya",
    uzmanlik: "Kulak Burun Boğaz (KBB) Uzmanı",
    sehir: "İstanbul · Kadıköy",
    deneyim: "12 yıl",
    puan: 4.9,
    yorumSayisi: 127,
    hakkinda: "İstanbul Üniversitesi Tıp Fakültesi mezunu. Hacettepe'de uzmanlık eğitimini tamamladı. Rinoloji, uyku apnesi ve çocuk KBB hastalıkları alanlarında deneyimli.",
    egitim: [
      "İstanbul Üniversitesi Tıp Fakültesi — 2005",
      "Hacettepe Üniversitesi KBB Uzmanlığı — 2010",
      "Viyana Üniversitesi İleri Rinoloji Kursu — 2015",
    ],
    uzmanlikAlanlari: ["Rinoloji", "Uyku Apnesi", "Çocuk KBB", "Septum Deviasyonu", "Sinüzit"],
    calismaSaatleri: {
      "Pazartesi": "09:00 - 17:00",
      "Salı": "09:00 - 17:00",
      "Çarşamba": "10:00 - 18:00",
      "Perşembe": "09:00 - 17:00",
      "Cuma": "09:00 - 15:00",
    },
    yorumlar: [
      { ad: "Mehmet A.", puan: 5, tarih: "Mart 2025", metin: "Çok ilgili ve bilgili bir doktor. Septum ameliyatımı başarıyla gerçekleştirdi, iyileşme süreci çok rahat geçti.", dogrulanmis: true },
      { ad: "Zeynep K.", puan: 5, tarih: "Şubat 2025", metin: "Yıllardır çektiğim sinüzit sorunuma kesin çözüm buldu. Muayene süresi yeterliydi, tüm sorularımı yanıtladı.", dogrulanmis: true },
      { ad: "Ali R.", puan: 4, tarih: "Ocak 2025", metin: "Profesyonel ve güler yüzlü. Bekleme süresi biraz uzun ama değdi.", dogrulanmis: true },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* JSON-LD Schema — Google için */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": doktor.ad,
            "medicalSpecialty": doktor.uzmanlik,
            "address": { "@type": "PostalAddress", "addressLocality": doktor.sehir, "addressCountry": "TR" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": doktor.puan,
              "reviewCount": doktor.yorumSayisi,
            },
          }),
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* SOL KOLON — Profil Kartı */}
          <div className="md:col-span-1 space-y-4">

            {/* Profil */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl mx-auto mb-4">
                AK
              </div>
              <h1 className="text-xl font-bold text-gray-900">{doktor.ad}</h1>
              <p style={{ color: "#0E7C7B" }} className="font-medium text-sm mt-1">{doktor.uzmanlik}</p>
              <p className="text-gray-400 text-sm mt-1">📍 {doktor.sehir}</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-bold">{doktor.puan}</span>
                <span className="text-gray-400 text-sm">({doktor.yorumSayisi} yorum)</span>
              </div>
              <div style={{ borderColor: "#E8F5F5" }} className="border-t mt-4 pt-4 text-sm text-gray-500">
                {doktor.deneyim} deneyim
              </div>
            </div>

            {/* Randevu Al */}
            <div id="randevu" className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Randevu Al</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Adınız Soyadınız</label>
                  <input type="text" placeholder="Ad Soyad" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Telefon</label>
                  <input type="tel" placeholder="0532 xxx xx xx" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Şikayet (opsiyonel)</label>
                  <textarea placeholder="Kısaca belirtin..." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 resize-none" />
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
                {Object.entries(doktor.calismaSaatleri).map(([gun, saat]) => (
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

          {/* SAĞ KOLON — Detaylar */}
          <div className="md:col-span-2 space-y-6">

            {/* Hakkında */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-3">Hakkında</h2>
              <p className="text-gray-600 leading-relaxed">{doktor.hakkinda}</p>
            </div>

            {/* Uzmanlık Alanları */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Uzmanlık Alanları</h2>
              <div className="flex flex-wrap gap-2">
                {doktor.uzmanlikAlanlari.map((alan) => (
                  <span key={alan} style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="px-3 py-1 rounded-full text-sm font-medium">
                    {alan}
                  </span>
                ))}
              </div>
            </div>

            {/* Eğitim */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Eğitim & Sertifikalar</h2>
              <div className="space-y-3">
                {doktor.egitim.map((e) => (
                  <div key={e} className="flex items-start gap-3">
                    <span style={{ color: "#0E7C7B" }} className="mt-0.5">🎓</span>
                    <span className="text-gray-600 text-sm">{e}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Yorumlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900 text-lg">Hasta Yorumları</h2>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="font-bold text-xl">{doktor.puan}</span>
                  <span className="text-gray-400 text-sm">/ 5</span>
                </div>
              </div>
              <div className="space-y-4">
                {doktor.yorumlar.map((yorum, i) => (
                  <div key={i} style={{ borderColor: "#F5F7FA" }} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {yorum.ad[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-gray-900">{yorum.ad}</span>
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
              <div style={{ backgroundColor: "#F5F7FA" }} className="rounded-xl p-4 mt-4">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Tüm yorumlar telefon numarasıyla doğrulanmıştır ve <strong>silinemez</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
