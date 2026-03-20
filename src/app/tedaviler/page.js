import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Tedaviler ve Hizmetler — DoktorPusula",
  description: "Botoks, rinoplasti, diş implantı ve 30+ tedavi için Türkiye'nin en iyi doktorlarını bulun.",
  alternates: { canonical: "https://doktorpusula.com/tedaviler" },
};

export const TEDAVILER = [
  { slug: "rinoplasti", ad: "Rinoplasti", ikon: "👃", uzmanlik: "Rinoplasti", aciklama: "Burun estetiği ve düzeltme ameliyatı" },
  { slug: "botoks", ad: "Botoks", ikon: "✨", uzmanlik: "Dermatoloji", aciklama: "Kırışıklık giderme ve yüz gençleştirme" },
  { slug: "dolgu", ad: "Yüz Dolgusu", ikon: "💉", uzmanlik: "Dermatoloji", aciklama: "Hyaluronik asit ile yüz dolgusu" },
  { slug: "gogus-estetigi", ad: "Göğüs Estetiği", ikon: "⭐", uzmanlik: "Plastik Cerrahi", aciklama: "Meme büyütme, küçültme ve dikleştirme" },
  { slug: "sac-ekimi", ad: "Saç Ekimi", ikon: "💆", uzmanlik: "Plastik Cerrahi", aciklama: "FUE ve DHI yöntemiyle saç ekimi" },
  { slug: "lazer-epilasyon", ad: "Lazer Epilasyon", ikon: "🌟", uzmanlik: "Dermatoloji", aciklama: "Kalıcı tüy azaltma tedavisi" },
  { slug: "implant", ad: "Diş İmplantı", ikon: "🦷", uzmanlik: "Diş Hekimi", aciklama: "Eksik diş için kalıcı çözüm" },
  { slug: "dis-beyazlatma", ad: "Diş Beyazlatma", ikon: "🤍", uzmanlik: "Diş Hekimi", aciklama: "Profesyonel diş beyazlatma tedavisi" },
  { slug: "ortodonti", ad: "Ortodonti / Braces", ikon: "😁", uzmanlik: "Diş Hekimi", aciklama: "Diş teli ve şeffaf plak uygulamaları" },
  { slug: "zirkonyum", ad: "Zirkonyum Kaplama", ikon: "💎", uzmanlik: "Diş Hekimi", aciklama: "Estetik diş kaplama uygulaması" },
  { slug: "lasik", ad: "Lasik / Lazer Göz", ikon: "👁️", uzmanlik: "Göz Hastalıkları", aciklama: "Miyop, hipermetrop lazer tedavisi" },
  { slug: "katarakt", ad: "Katarakt Ameliyatı", ikon: "🔬", uzmanlik: "Göz Hastalıkları", aciklama: "Katarakt tedavisi ve yapay lens" },
  { slug: "psikoterapi", ad: "Psikoterapi", ikon: "🧠", uzmanlik: "Psikiyatri", aciklama: "Bireysel ve grup terapi seansları" },
  { slug: "fizik-tedavi", ad: "Fizik Tedavi", ikon: "🏃", uzmanlik: "Fizik Tedavi", aciklama: "Rehabilitasyon ve fizik tedavi" },
  { slug: "prp", ad: "PRP Tedavisi", ikon: "🩸", uzmanlik: "Dermatoloji", aciklama: "Trombositten zengin plazma tedavisi" },
  { slug: "ozon-terapi", ad: "Ozon Terapi", ikon: "💨", uzmanlik: "Diğer", aciklama: "Medikal ozon tedavisi uygulamaları" },
  { slug: "manuel-terapi", ad: "Manuel Terapi", ikon: "👐", uzmanlik: "Fizik Tedavi", aciklama: "Omurga ve eklem düzeltme" },
  { slug: "liposuction", ad: "Liposuction", ikon: "🫧", uzmanlik: "Plastik Cerrahi", aciklama: "Yağ alımı ve vücut şekillendirme" },
  { slug: "kbb-ameliyat", ad: "KBB Ameliyatı", ikon: "👂", uzmanlik: "KBB", aciklama: "Kulak, burun, boğaz operasyonları" },
  { slug: "anjiyografi", ad: "Anjiyografi", ikon: "❤️", uzmanlik: "Kardiyoloji", aciklama: "Koroner anjiyografi ve stent" },
  { slug: "diz-protezi", ad: "Diz Protezi", ikon: "🦴", uzmanlik: "Ortopedi", aciklama: "Total ve parsiyel diz protezi" },
];

const POPULER = ["rinoplasti", "botoks", "dolgu", "gogus-estetigi", "sac-ekimi", "implant", "dis-beyazlatma", "lasik"];

export default function TedavilerSayfasi() {
  const populer = TEDAVILER.filter((t) => POPULER.includes(t.slug));
  const diger = TEDAVILER.filter((t) => !POPULER.includes(t.slug));

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

        {/* Popüler */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <h2 style={{ color: "#0D2137" }} className="text-lg font-bold">🔥 Popüler Tedaviler</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {populer.map((tedavi) => (
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

        {/* Tüm Tedaviler */}
        <div>
          <h2 style={{ color: "#0D2137" }} className="text-lg font-bold mb-5">Tüm Tedaviler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {diger.map((tedavi) => (
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

      </div>
    </div>
  );
}
