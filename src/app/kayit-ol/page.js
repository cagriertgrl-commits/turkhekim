import Navbar from "@/components/Navbar";
import Link from "next/link";

const MESLEK_GRUPLARI = [
  {
    ikon: "👨‍⚕️",
    baslik: "Doktor / Uzman Hekim",
    aciklama: "Genel pratisyen, uzman hekim, cerrah",
    renk: "#0D2137",
    bg: "#EFF6FF",
    slug: "doktor",
  },
  {
    ikon: "🦷",
    baslik: "Diş Hekimi",
    aciklama: "Genel diş hekimliği, ortodonti, implant",
    renk: "#0E7C7B",
    bg: "#F0FDFA",
    slug: "dis-hekimi",
  },
  {
    ikon: "🧠",
    baslik: "Psikolog / Psikiyatrist",
    aciklama: "Klinik psikolog, terapist, psikiyatrist",
    renk: "#7C3AED",
    bg: "#F5F3FF",
    slug: "psikolog",
  },
  {
    ikon: "🏃",
    baslik: "Fizyoterapist",
    aciklama: "Fizik tedavi ve rehabilitasyon uzmanı",
    renk: "#059669",
    bg: "#F0FDF4",
    slug: "fizyoterapist",
  },
  {
    ikon: "🥗",
    baslik: "Diyetisyen",
    aciklama: "Beslenme ve diyet uzmanı",
    renk: "#D97706",
    bg: "#FFFBEB",
    slug: "diyetisyen",
  },
  {
    ikon: "💊",
    baslik: "Eczacı",
    aciklama: "Eczane sahibi veya klinik eczacı",
    renk: "#DC2626",
    bg: "#FFF1F2",
    slug: "eczaci",
  },
  {
    ikon: "👁️",
    baslik: "Optisyen",
    aciklama: "Göz sağlığı ve optik uzmanı",
    renk: "#2563EB",
    bg: "#EFF6FF",
    slug: "optisyen",
  },
  {
    ikon: "🏥",
    baslik: "Diğer Sağlık Uzmanı",
    aciklama: "Hemşire, diyabetolog, osteopat ve diğerleri",
    renk: "#6B7280",
    bg: "#F5F7FA",
    slug: "diger",
  },
];

const MESLEK_UZMANLIK_MAP = {
  "doktor": "",
  "dis-hekimi": "Diş Hekimi",
  "psikolog": "Psikiyatri",
  "fizyoterapist": "Fizik Tedavi",
  "diyetisyen": "Diğer",
  "eczaci": "Diğer",
  "optisyen": "Diğer",
  "diger": "Diğer",
};

export const metadata = {
  title: "Kayıt Ol — DoktorPusula",
  description: "DoktorPusula'ya ücretsiz kayıt olun. Meslek grubunuzu seçerek başlayın.",
};

export default function KayitOl() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* BAŞLIK */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-4">🏥</div>
          <h1 className="text-white text-3xl font-bold mb-3">Ücretsiz Profilinizi Oluşturun</h1>
          <p className="text-gray-300 text-lg">Meslek grubunuzu seçerek başlayın</p>
        </div>
      </div>

      {/* MESLEK GRUPLARI */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-center text-gray-500 text-sm mb-8">Aşağıdan mesleğinizi seçin, size özel kayıt formuna yönlendirileceksiniz.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MESLEK_GRUPLARI.map((meslek) => {
            const uzmanlik = MESLEK_UZMANLIK_MAP[meslek.slug];
            const href = uzmanlik
              ? `/doktor-ol?uzmanlik=${encodeURIComponent(uzmanlik)}`
              : "/doktor-ol";

            return (
              <Link
                key={meslek.slug}
                href={href}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-opacity-0 transition-all text-center"
                style={{ "--hover-border": meslek.renk }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: meslek.bg }}
                >
                  {meslek.ikon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight">{meslek.baslik}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{meslek.aciklama}</p>
                <div
                  className="mt-4 text-xs font-semibold py-1.5 px-3 rounded-full inline-block"
                  style={{ backgroundColor: meslek.bg, color: meslek.renk }}
                >
                  Kayıt Ol →
                </div>
              </Link>
            );
          })}
        </div>

        {/* ALT BİLGİ */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { icon: "🆓", baslik: "Ücretsiz", aciklama: "Temel profil tamamen ücretsiz" },
            { icon: "✅", baslik: "Hızlı Yayın", aciklama: "24 saat içinde profiliniz yayında" },
            { icon: "📈", baslik: "Daha Fazla Hasta", aciklama: "Aylık binlerce aktif kullanıcı" },
          ].map((item) => (
            <div key={item.baslik} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-bold text-sm text-gray-900">{item.baslik}</p>
              <p className="text-xs text-gray-400 mt-1">{item.aciklama}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Zaten hesabınız var mı?{" "}
          <a href="/giris" style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
            Giriş Yapın
          </a>
        </p>
      </div>
    </div>
  );
}
