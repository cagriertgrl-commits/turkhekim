import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FirmaBaşvuruFormu from "./FirmaBasvuruFormu";

export const metadata = {
  title: "Medikal Firma & İlaç Mümessili Çözümleri | DoktorPusula",
  description: "DoktorPusula'nın 10.000+ doktor ağına ulaşın. İlaç firmaları, medikal cihaz şirketleri ve sağlık hizmet sağlayıcıları için özel çözümler.",
};

const PAKETLER = [
  {
    isim: "Başlangıç",
    slug: "baslangic",
    fiyat: "₺299",
    periyot: "/ay",
    ozellikler: [
      "5 doktor hedefleme",
      "Firma profil sayfası",
      "Temel istatistikler",
      "E-posta desteği",
    ],
    renk: "#6B7280",
    bg: "#F3F4F6",
    one_cikan: false,
  },
  {
    isim: "Standart",
    slug: "standart",
    fiyat: "₺799",
    periyot: "/ay",
    ozellikler: [
      "20 doktor hedefleme",
      "Şehir & uzmanlık filtreleme",
      "Detaylı analitik",
      "Mümessil randevu modülü",
      "Öncelikli destek",
    ],
    renk: "var(--teal)",
    bg: "var(--light-teal)",
    one_cikan: true,
  },
  {
    isim: "Premium",
    slug: "premium",
    fiyat: "₺1999",
    periyot: "/ay",
    ozellikler: [
      "Sınırsız doktor hedefleme",
      "Özel içerik entegrasyonu",
      "API erişimi",
      "Dedicated account manager",
      "7/24 destek",
    ],
    renk: "var(--navy)",
    bg: "#EFF6FF",
    one_cikan: false,
  },
];

export default function MedikalFirmaSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }} className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <span style={{ backgroundColor: "var(--teal)", color: "white" }} className="text-xs font-bold px-4 py-2 rounded-full mb-6 inline-block">
            B2B Çözümler
          </span>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 mt-4">
            Doktorlara Ulaşmanın En Akıllı Yolu
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            DoktorPusula'nın 10.000+ doktor ağıyla tanışın. İlaç firmanızı, medikal ürünlerinizi ve sağlık hizmetlerinizi hedef doktorlara doğrudan ulaştırın.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <span>✓ Şehir & uzmanlık bazlı hedefleme</span>
            <span>✓ Mümessil randevu modülü</span>
            <span>✓ Doğrulanmış doktor profilleri</span>
          </div>
        </div>
      </div>

      {/* İSTATİSTİKLER */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { sayi: "10K+", etiket: "Kayıtlı Doktor" },
            { sayi: "81", etiket: "İl Kapsamı" },
            { sayi: "50+", etiket: "Uzmanlık Alanı" },
            { sayi: "500K+", etiket: "Aylık Ziyaretçi" },
          ].map((s) => (
            <div key={s.etiket} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold" style={{ color: "var(--teal)" }}>{s.sayi}</p>
              <p className="text-gray-500 text-sm mt-1">{s.etiket}</p>
            </div>
          ))}
        </div>

        {/* PAKETLER */}
        <div className="mt-12">
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-2">Fiyatlandırma</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Yıllık ödemede %17 indirim</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PAKETLER.map((paket) => (
              <div
                key={paket.slug}
                className={`bg-white rounded-2xl p-6 border shadow-sm relative ${paket.one_cikan ? "border-teal-400 shadow-md" : "border-gray-100"}`}
              >
                {paket.one_cikan && (
                  <div
                    style={{ backgroundColor: "var(--teal)", color: "white" }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
                  >
                    En Popüler
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-lg">{paket.isim}</h3>
                <div className="flex items-baseline gap-1 mt-3 mb-5">
                  <span className="text-3xl font-bold" style={{ color: paket.renk }}>{paket.fiyat}</span>
                  <span className="text-gray-500 text-sm">{paket.periyot}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {paket.ozellikler.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-gray-600">
                      <span style={{ color: "var(--teal)" }} className="mt-0.5">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
                <a
                  href="#basvuru"
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: paket.one_cikan ? "var(--teal)" : "var(--navy)", color: "white" }}
                >
                  Başvur
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* BAŞVURU FORMU */}
        <div id="basvuru" className="mt-14 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 text-xl mb-2">Başvuru Formu</h2>
          <p className="text-gray-500 text-sm mb-6">Formunuzu gönderin, ekibimiz 1 iş günü içinde sizinle iletişime geçsin.</p>
          <FirmaBaşvuruFormu />
        </div>
      </div>

      <Footer />
    </div>
  );
}
