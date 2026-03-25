import Navbar from "@/components/Navbar";
import { IkonRinoplasti, IkonDis, IkonSacEkimi, IkonGoz, IkonOrtopedi, IkonEstetik } from "@/components/UzmanlikIkonlari";

const tedaviler = [
  { Ikon: IkonRinoplasti, renk: "#0D2137", bg: "#F1F5F9", ad: "Rinoplasti",      fiyat: "2.000 - 5.000 USD", sure: "1-2 gün hastane" },
  { Ikon: IkonDis,        renk: "#0E7C7B", bg: "#F0FDFA", ad: "Diş Tedavisi",    fiyat: "500 - 3.000 USD",   sure: "3-7 gün" },
  { Ikon: IkonSacEkimi,   renk: "#7C3AED", bg: "#F5F3FF", ad: "Saç Ekimi",       fiyat: "1.500 - 3.500 USD", sure: "1 gün" },
  { Ikon: IkonGoz,        renk: "#0369A1", bg: "#E0F2FE", ad: "Göz Ameliyatı",   fiyat: "1.000 - 2.500 USD", sure: "1 gün" },
  { Ikon: IkonOrtopedi,   renk: "#2563EB", bg: "#EFF6FF", ad: "Ortopedi",        fiyat: "3.000 - 8.000 USD", sure: "3-7 gün hastane" },
  { Ikon: IkonEstetik,    renk: "#D97706", bg: "#FFFBEB", ad: "Estetik Cerrahi", fiyat: "2.000 - 6.000 USD", sure: "1-3 gün hastane" },
];


const yorumlar = [
  {
    ad: "Parisa M.",
    sehir: "Tahran, İran",
    bayrak: "🇮🇷",
    tedavi: "Rinoplasti",
    metin: "DoktorPusula sayesinde İstanbul'da harika bir doktor buldum. Farsça destek çok işe yaradı, hiçbir şeyde zorlanmadım.",
    puan: 5,
  },
  {
    ad: "Mohammed A.",
    sehir: "Dubai, BAE",
    bayrak: "🇦🇪",
    tedavi: "Saç Ekimi",
    metin: "The service was excellent. Arabic support made everything easy. The doctor was very professional.",
    puan: 5,
  },
  {
    ad: "Tural H.",
    sehir: "Bakü, Azerbaycan",
    bayrak: "🇦🇿",
    tedavi: "Diş Tedavisi",
    metin: "Türkçe konuşan doktor bulmak çok kolaydı. Hem kaliteli hem uygun fiyatlıydı.",
    puan: 5,
  },
];

export default function MediakalTurizm() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar aktifSayfa="Medikal Turizm" />

      {/* HERO */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div style={{ backgroundColor: "#0E7C7B20", borderColor: "#0E7C7B" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
                <span style={{ color: "#0E7C7B" }} className="text-sm font-medium">🌍 Medikal Turizm Portalı</span>
              </div>
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Türkiye'de Sağlık,<br />
                <span style={{ color: "#0E7C7B" }}>Kendi Dilinde</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Farsça, Arapça ve Türkçe destek ile Türkiye'nin en iyi doktorlarına ulaşın. Randevu, tercüman, transfer ve konaklama — hepsi tek elden.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/905000000000" style={{ backgroundColor: "#0E7C7B" }} className="text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span>💬</span> WhatsApp ile Yaz
                </a>
                <a href="/istanbul/kbb-uzmani" style={{ borderColor: "#0E7C7B", color: "#4DD9D8" }} className="border px-6 py-3 rounded-xl font-medium hover:opacity-80 transition-opacity">
                  Doktor Bul →
                </a>
              </div>
            </div>

            {/* Dil Kartları */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { dil: "فارسی", alt: "Farsça", bayrak: "🇮🇷", renk: "#2D6A4F" },
                { dil: "العربية", alt: "Arapça", bayrak: "🇸🇦", renk: "#1D4E89" },
                { dil: "Azərbaycan", alt: "Azerbaycan Türkçesi", bayrak: "🇦🇿", renk: "#2C5F2E" },
                { dil: "English", alt: "İngilizce", bayrak: "🌐", renk: "#3D3D3D" },
              ].map((item) => (
                <div key={item.dil} style={{ backgroundColor: item.renk + "40", borderColor: item.renk + "60" }} className="border rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-4xl mb-2">{item.bayrak}</div>
                  <div className="text-white font-bold text-lg">{item.dil}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.alt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ backgroundColor: "#0E7C7B" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { sayi: "200K+", etiket: "Yıllık İranlı Turist" },
            { sayi: "4 Dil", etiket: "Destek" },
            { sayi: "%60", etiket: "Avrupa'dan Ucuz" },
            { sayi: "7/24", etiket: "WhatsApp Destek" },
          ].map((item) => (
            <div key={item.etiket}>
              <div className="text-3xl font-bold">{item.sayi}</div>
              <div className="text-sm opacity-80 mt-1">{item.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEDAVİLER */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-4">En Çok Tercih Edilen Tedaviler</h2>
            <p className="text-gray-500">Türkiye'ye gelen medikal turistlerin en sık başvurduğu tedavi alanları</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tedaviler.map((t) => (
              <div key={t.ad} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div style={{ backgroundColor: t.bg, color: t.renk }} className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <t.Ikon />
                </div>
                <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-1">{t.ad}</h3>
                <p style={{ color: "#0E7C7B" }} className="text-sm font-medium mb-1">{t.fiyat}</p>
                <p className="text-gray-400 text-xs">⏱ {t.sure}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YORUMLAR */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-4">Hastalarımız Ne Diyor?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {yorumlar.map((yorum) => (
              <div key={yorum.ad} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex mb-1">
                  {[...Array(yorum.puan)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{yorum.metin}"</p>
                <div className="flex items-center gap-3">
                  <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {yorum.bayrak}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{yorum.ad}</p>
                    <p className="text-xs text-gray-400">{yorum.sehir} · {yorum.tedavi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Sorularınız mı Var?</h2>
          <p className="text-gray-300 mb-8">WhatsApp üzerinden Farsça, Arapça veya Türkçe bilgi alın. 7/24 yanınızdayız.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/905000000000" style={{ backgroundColor: "#25D366" }} className="text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              💬 WhatsApp — Türkçe / Farsça / Arapça
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
