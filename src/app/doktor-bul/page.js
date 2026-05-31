import Navbar from "@/components/Navbar";
import AramaKutusu from "@/components/AramaKutusu";
import Link from "next/link";
import { UZMANLIK_GRID } from "@/components/UzmanlikIkonlari";

export const metadata = {
  title: "Doktor Bul",
  description: "Türkiye genelinde 47 uzmanlık alanında doktor arayın. Şehir ve branş seçerek size en uygun doktoru bulun.",
  alternates: { canonical: "https://doktorpusula.com/doktor-bul" },
};

const TR_ADLAR = { "kbb-uzmani": "KBB", "kardiyoloji": "Kardiyoloji", "ortopedi": "Ortopedi", "plastik-cerrahi": "Plastik Cerrahi", "goz-hastaliklari": "Göz", "dis-hekimi": "Diş Hekimi", "dermatoloji": "Dermatoloji", "noroloji": "Nöroloji", "psikiyatri": "Psikiyatri", "cocuk-hastaliklari": "Çocuk Sağlığı", "estetik-cerrahi": "Estetik Cerrahi", "rinoplasti": "Rinoplasti" };

const SEHIRLER = [
  "İstanbul", "Ankara", "İzmir", "Antalya", "Bursa", "Adana",
  "Gaziantep", "Konya", "Eskişehir", "Kayseri", "Trabzon", "Samsun",
];

function sehirSlug(s) {
  return s.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/\s+/g,"-");
}

export default function DoktorBul() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Doktor Bul" />

      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">Doktor Bul</h1>
          <p className="text-gray-300 mb-8">Şehir ve uzmanlık alanı seçerek size en uygun doktoru bulun</p>
          <AramaKutusu />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Uzmanlık alanları */}
        <h2 style={{ color: "var(--navy)" }} className="text-xl font-bold mb-6 text-center">Uzmanlık Alanı Seçin</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-12">
          {UZMANLIK_GRID.map((u) => (
            <Link key={u.slug} href={`/istanbul/${u.slug}`} className="flex flex-col items-center gap-2.5 p-4 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 border border-transparent group" style={{ backgroundColor: u.bg }}>
              <span style={{ color: u.renk }}><u.Ikon /></span>
              <span className="text-xs font-semibold text-center leading-tight" style={{ color: u.renk }}>{TR_ADLAR[u.slug] || u.slug}</span>
            </Link>
          ))}
        </div>

        {/* Şehirler */}
        <h2 style={{ color: "var(--navy)" }} className="text-xl font-bold mb-6 text-center">veya Şehir Seçin</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {SEHIRLER.map((s) => (
            <Link key={s} href={`/${sehirSlug(s)}/doktor`}
              className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-0.5 border border-gray-100">
              <span style={{ color: "var(--navy)" }} className="text-sm font-semibold">{s}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
