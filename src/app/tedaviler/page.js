import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  IkonKBB, IkonKardiyoloji, IkonOrtopedi, IkonPlastik,
  IkonGoz, IkonDis, IkonPsikiyatri,
  IkonEstetik, IkonRinoplasti,
} from "@/components/UzmanlikIkonlari";

export const metadata = {
  title: "Tedaviler ve Hizmetler — DoktorPusula",
  description: "Botoks, rinoplasti, diş implantı ve 30+ tedavi için Türkiye'nin en iyi doktorlarını bulun.",
  alternates: { canonical: "https://doktorpusula.com/tedaviler" },
};

const S = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", width: 28, height: 28 };

const IkonBotoks  = () => <svg {...S}><path d="M9 3h6l1 5H8L9 3z"/><line x1="12" y1="8" x2="12" y2="14"/><path d="M9 14c0 1.7 1.3 3 3 3s3-1.3 3-3"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>;
const IkonDolgu   = () => <svg {...S}><path d="M12 3C9 3 7 5 7 7.5c0 1.7.8 3 2 4l1 2h4l1-2c1.2-1 2-2.3 2-4C17 5 15 3 12 3z"/><line x1="10" y1="13.5" x2="14" y2="13.5"/></svg>;
const IkonSac     = () => <svg {...S}><circle cx="12" cy="7" r="4"/><path d="M8 11c-2.2 1-4 3.5-4 7h16c0-3.5-1.8-6-4-7"/><path d="M10 11c0 2 .7 5 2 6"/><path d="M14 11c0 2-.7 5-2 6"/></svg>;
const IkonLazer   = () => <svg {...S}><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="2" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="8.1" y2="8.1"/><line x1="15.9" y1="15.9" x2="19.07" y2="19.07"/></svg>;
const IkonFizik   = () => <svg {...S}><circle cx="12" cy="5" r="2"/><path d="M8 22l2-7H7l3-8"/><path d="M16 22l-2-7h3l-3-8"/><path d="M9 10h6"/></svg>;
const IkonPRP     = () => <svg {...S}><path d="M12 2c0 0-6 6.5-6 10.5a6 6 0 0 0 12 0C18 8.5 12 2 12 2z"/><path d="M9.5 13a2.5 2.5 0 0 0 5 0"/></svg>;
const IkonOzon    = () => <svg {...S}><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>;
const IkonManuel  = () => <svg {...S}><path d="M18 11V6a2 2 0 0 0-4 0v4"/><path d="M14 9V4a2 2 0 0 0-4 0v5"/><path d="M10 9.5V6a2 2 0 0 0-4 0v3"/><path d="M6 9v2a8 8 0 0 0 8 8 6 6 0 0 0 6-6v-2"/></svg>;

export const TEDAVILER = [
  { slug: "rinoplasti",      ad: "Rinoplasti",         Ikon: IkonRinoplasti, renk: "#0D2137", bg: "#F1F5F9", uzmanlik: "Rinoplasti",       aciklama: "Burun estetiği ve düzeltme ameliyatı" },
  { slug: "botoks",          ad: "Botoks",              Ikon: IkonBotoks,     renk: "#BE185D", bg: "#FDF2F8", uzmanlik: "Dermatoloji",       aciklama: "Kırışıklık giderme ve yüz gençleştirme" },
  { slug: "dolgu",           ad: "Yüz Dolgusu",         Ikon: IkonDolgu,      renk: "#BE185D", bg: "#FDF2F8", uzmanlik: "Dermatoloji",       aciklama: "Hyaluronik asit ile yüz dolgusu" },
  { slug: "gogus-estetigi",  ad: "Göğüs Estetiği",      Ikon: IkonEstetik,    renk: "#D97706", bg: "#FFFBEB", uzmanlik: "Plastik Cerrahi",   aciklama: "Meme büyütme, küçültme ve dikleştirme" },
  { slug: "sac-ekimi",       ad: "Saç Ekimi",            Ikon: IkonSac,        renk: "#059669", bg: "#ECFDF5", uzmanlik: "Plastik Cerrahi",   aciklama: "FUE ve DHI yöntemiyle saç ekimi" },
  { slug: "lazer-epilasyon", ad: "Lazer Epilasyon",      Ikon: IkonLazer,      renk: "#7C3AED", bg: "#F5F3FF", uzmanlik: "Dermatoloji",       aciklama: "Kalıcı tüy azaltma tedavisi" },
  { slug: "implant",         ad: "Diş İmplantı",         Ikon: IkonDis,        renk: "#0E7C7B", bg: "#F0FDFA", uzmanlik: "Diş Hekimi",        aciklama: "Eksik diş için kalıcı çözüm" },
  { slug: "dis-beyazlatma",  ad: "Diş Beyazlatma",       Ikon: IkonDis,        renk: "#0369A1", bg: "#E0F2FE", uzmanlik: "Diş Hekimi",        aciklama: "Profesyonel diş beyazlatma tedavisi" },
  { slug: "ortodonti",       ad: "Ortodonti / Braces",   Ikon: IkonDis,        renk: "#2563EB", bg: "#EFF6FF", uzmanlik: "Diş Hekimi",        aciklama: "Diş teli ve şeffaf plak uygulamaları" },
  { slug: "zirkonyum",       ad: "Zirkonyum Kaplama",    Ikon: IkonDis,        renk: "#7C3AED", bg: "#F5F3FF", uzmanlik: "Diş Hekimi",        aciklama: "Estetik diş kaplama uygulaması" },
  { slug: "lasik",           ad: "Lasik / Lazer Göz",    Ikon: IkonGoz,        renk: "#0369A1", bg: "#E0F2FE", uzmanlik: "Göz Hastalıkları",  aciklama: "Miyop, hipermetrop lazer tedavisi" },
  { slug: "katarakt",        ad: "Katarakt Ameliyatı",   Ikon: IkonGoz,        renk: "#1D4ED8", bg: "#EFF6FF", uzmanlik: "Göz Hastalıkları",  aciklama: "Katarakt tedavisi ve yapay lens" },
  { slug: "psikoterapi",     ad: "Psikoterapi",          Ikon: IkonPsikiyatri, renk: "#7C3AED", bg: "#F5F3FF", uzmanlik: "Psikiyatri",        aciklama: "Bireysel ve grup terapi seansları" },
  { slug: "fizik-tedavi",    ad: "Fizik Tedavi",          Ikon: IkonFizik,      renk: "#059669", bg: "#ECFDF5", uzmanlik: "Fizik Tedavi",      aciklama: "Rehabilitasyon ve fizik tedavi" },
  { slug: "prp",             ad: "PRP Tedavisi",          Ikon: IkonPRP,        renk: "#DC2626", bg: "#FFF1F2", uzmanlik: "Dermatoloji",       aciklama: "Trombositten zengin plazma tedavisi" },
  { slug: "ozon-terapi",     ad: "Ozon Terapi",           Ikon: IkonOzon,       renk: "#0E7C7B", bg: "#E6F4F4", uzmanlik: "Diğer",             aciklama: "Medikal ozon tedavisi uygulamaları" },
  { slug: "manuel-terapi",   ad: "Manuel Terapi",         Ikon: IkonManuel,     renk: "#2563EB", bg: "#EFF6FF", uzmanlik: "Fizik Tedavi",      aciklama: "Omurga ve eklem düzeltme" },
  { slug: "liposuction",     ad: "Liposuction",           Ikon: IkonPlastik,    renk: "#D97706", bg: "#FFFBEB", uzmanlik: "Plastik Cerrahi",   aciklama: "Yağ alımı ve vücut şekillendirme" },
  { slug: "kbb-ameliyat",    ad: "KBB Ameliyatı",         Ikon: IkonKBB,        renk: "#0E7C7B", bg: "#E6F4F4", uzmanlik: "KBB",               aciklama: "Kulak, burun, boğaz operasyonları" },
  { slug: "anjiyografi",     ad: "Anjiyografi",           Ikon: IkonKardiyoloji,renk: "#DC2626", bg: "#FFF1F2", uzmanlik: "Kardiyoloji",       aciklama: "Koroner anjiyografi ve stent" },
  { slug: "diz-protezi",     ad: "Diz Protezi",           Ikon: IkonOrtopedi,   renk: "#2563EB", bg: "#EFF6FF", uzmanlik: "Ortopedi",           aciklama: "Total ve parsiyel diz protezi" },
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
                <div
                  style={{ backgroundColor: tedavi.bg, color: tedavi.renk }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                >
                  <tedavi.Ikon />
                </div>
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
                <div
                  style={{ backgroundColor: tedavi.bg, color: tedavi.renk }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                >
                  <tedavi.Ikon />
                </div>
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
