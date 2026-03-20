import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Tedaviler ve Hizmetler — DoktorPusula",
  description: "Botox, rinoplasti, diş beyazlatma ve 50+ tedavi için Türkiye'nin en iyi doktorlarını bulun.",
  alternates: { canonical: "https://doktorpusula.com/tedaviler" },
};

export const TEDAVILER = [
  // Estetik & Kozmetik
  { slug: "rinoplasti", ad: "Rinoplasti", ikon: "👃", kategori: "Estetik", uzmanlik: "Rinoplasti", aciklama: "Burun estetiği ve düzeltme ameliyatı" },
  { slug: "botoks", ad: "Botoks", ikon: "✨", kategori: "Estetik", uzmanlik: "Dermatoloji", aciklama: "Kırışıklık giderme ve yüz gençleştirme" },
  { slug: "dolgu", ad: "Yüz Dolgusu", ikon: "💉", kategori: "Estetik", uzmanlik: "Dermatoloji", aciklama: "Hyaluronik asit ile yüz dolgusu uygulaması" },
  { slug: "lazer-epilasyon", ad: "Lazer Epilasyon", ikon: "🌟", kategori: "Estetik", uzmanlik: "Dermatoloji", aciklama: "Kalıcı tüy azaltma tedavisi" },
  { slug: "sac-ekimi", ad: "Saç Ekimi", ikon: "💆", kategori: "Estetik", uzmanlik: "Plastik Cerrahi", aciklama: "FUE ve DHI yöntemiyle saç ekimi" },
  { slug: "gogus-estetigi", ad: "Göğüs Estetiği", ikon: "⭐", kategori: "Estetik", uzmanlik: "Plastik Cerrahi", aciklama: "Meme büyütme, küçültme ve dikleştirme" },
  // Diş
  { slug: "implant", ad: "Diş İmplantı", ikon: "🦷", kategori: "Diş", uzmanlik: "Diş Hekimi", aciklama: "Eksik diş için kalıcı çözüm" },
  { slug: "dis-beyazlatma", ad: "Diş Beyazlatma", ikon: "🤍", kategori: "Diş", uzmanlik: "Diş Hekimi", aciklama: "Profesyonel diş beyazlatma tedavisi" },
  { slug: "ortodonti", ad: "Ortodonti / Braces", ikon: "😁", kategori: "Diş", uzmanlik: "Diş Hekimi", aciklama: "Diş teli ve şeffaf plak uygulamaları" },
  { slug: "zirkonyum", ad: "Zirkonyum Kaplama", ikon: "💎", kategori: "Diş", uzmanlik: "Diş Hekimi", aciklama: "Estetik diş kaplama uygulaması" },
  // Terapi & Sağlık
  { slug: "psikoterapi", ad: "Psikoterapi", ikon: "🧠", kategori: "Sağlık", uzmanlik: "Psikiyatri", aciklama: "Bireysel ve grup terapi seansları" },
  { slug: "fizik-tedavi", ad: "Fizik Tedavi", ikon: "🏃", kategori: "Sağlık", uzmanlik: "Fizik Tedavi", aciklama: "Rehabilitasyon ve fizik tedavi uygulamaları" },
  { slug: "prp", ad: "PRP Tedavisi", ikon: "🩸", kategori: "Sağlık", uzmanlik: "Dermatoloji", aciklama: "Trombositten zengin plazma tedavisi" },
  { slug: "ozon-terapi", ad: "Ozon Terapi", ikon: "💨", kategori: "Sağlık", uzmanlik: "Diğer", aciklama: "Medikal ozon tedavisi uygulamaları" },
  { slug: "manuel-terapi", ad: "Manuel Terapi", ikon: "👐", kategori: "Sağlık", uzmanlik: "Fizik Tedavi", aciklama: "Omurga ve eklem düzeltme tedavisi" },
  // Göz
  { slug: "lasik", ad: "Lasik / Lazer Göz", ikon: "👁️", kategori: "Göz", uzmanlik: "Göz Hastalıkları", aciklama: "Excimer lazer ile miyop, hipermetrop tedavisi" },
  { slug: "katarakt", ad: "Katarakt Ameliyatı", ikon: "🔬", kategori: "Göz", uzmanlik: "Göz Hastalıkları", aciklama: "Katarakt tedavisi ve yapay lens uygulaması" },
];

const KATEGORILER = [...new Set(TEDAVILER.map((t) => t.kategori))];

export default function TedavilerSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white text-3xl font-bold mb-3">Tedaviler & Hizmetler</h1>
          <p className="text-gray-300">Aradığınız tedavi için Türkiye'nin en iyi uzmanlarını bulun</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {KATEGORILER.map((kategori) => (
          <div key={kategori} className="mb-10">
            <h2 style={{ color: "#0D2137" }} className="text-lg font-bold mb-4 flex items-center gap-2">
              <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs px-3 py-1 rounded-full font-semibold">
                {kategori}
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {TEDAVILER.filter((t) => t.kategori === kategori).map((tedavi) => (
                <Link
                  key={tedavi.slug}
                  href={`/tedaviler/${tedavi.slug}`}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all group text-center"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{tedavi.ikon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{tedavi.ad}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{tedavi.aciklama}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
