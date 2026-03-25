import Navbar from "@/components/Navbar";
import Link from "next/link";

const S2 = /** @type {const} */ ({ viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round", width:28, height:28 });

const MESLEK_GRUPLARI = [
  {
    ikon: <svg {...S2}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    baslik: "Doktor / Uzman Hekim",
    aciklama: "Genel pratisyen, uzman hekim, cerrah",
    renk: "#0D2137",
    bg: "#EFF6FF",
    slug: "doktor",
  },
  {
    ikon: <svg {...S2}><path d="M12 3c-3.3 0-5 2.2-5 4.5 0 1.1.4 2.2.9 3l1.1 3.4c.3 1 .7 4.2 1.9 4.9.6.3 1.2-.2 1.7-1.2.5 1 1.1 1.5 1.7 1.2 1.2-.7 1.6-3.9 1.9-4.9L15.1 10.5c.5-.8.9-1.9.9-3C16 5.2 15.3 3 12 3z"/></svg>,
    baslik: "Diş Hekimi",
    aciklama: "Genel diş hekimliği, ortodonti, implant",
    renk: "#0E7C7B",
    bg: "#F0FDFA",
    slug: "dis-hekimi",
  },
  {
    ikon: <svg {...S2}><circle cx="12" cy="8" r="5"/><path d="M8.5 13.5C9 16 10 17.5 10 17.5H14s1-1.5 1.5-4"/><line x1="12" y1="17.5" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/><path d="M9.5 7c.3-1 1.2-1.7 2.5-1.7"/></svg>,
    baslik: "Psikolog / Psikiyatrist",
    aciklama: "Klinik psikolog, terapist, psikiyatrist",
    renk: "#7C3AED",
    bg: "#F5F3FF",
    slug: "psikolog",
  },
  {
    ikon: <svg {...S2}><circle cx="12" cy="5" r="2"/><path d="M8 21v-5l-2-3 4-4 2 3 2-3 4 4-2 3v5"/><path d="M12 9v4"/></svg>,
    baslik: "Fizyoterapist",
    aciklama: "Fizik tedavi ve rehabilitasyon uzmanı",
    renk: "#059669",
    bg: "#F0FDF4",
    slug: "fizyoterapist",
  },
  {
    ikon: <svg {...S2}><path d="M2 8c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 6-5"/><path d="M2 14c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 6-5"/><path d="M2 20c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 6-5"/></svg>,
    baslik: "Diyetisyen",
    aciklama: "Beslenme ve diyet uzmanı",
    renk: "#D97706",
    bg: "#FFFBEB",
    slug: "diyetisyen",
  },
  {
    ikon: <svg {...S2}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4a4 4 0 0 1 8 0v2"/><line x1="12" y1="11" x2="12" y2="15"/><line x1="10" y1="13" x2="14" y2="13"/></svg>,
    baslik: "Eczacı",
    aciklama: "Eczane sahibi veya klinik eczacı",
    renk: "#DC2626",
    bg: "#FFF1F2",
    slug: "eczaci",
  },
  {
    ikon: <svg {...S2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    baslik: "Optisyen",
    aciklama: "Göz sağlığı ve optik uzmanı",
    renk: "#2563EB",
    bg: "#EFF6FF",
    slug: "optisyen",
  },
  {
    ikon: <svg {...S2}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
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
      <Navbar aktifSayfa="Kayıt Ol" />

      {/* BAŞLIK */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <div style={{ color: "#0E7C7B" }} className="flex justify-center mb-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={44} height={44}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
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
            const params = new URLSearchParams({ meslek: meslek.slug });
            if (uzmanlik) params.set("uzmanlik", uzmanlik);
            const href = `/doktor-ol?${params.toString()}`;

            return (
              <Link
                key={meslek.slug}
                href={href}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: meslek.bg, color: meslek.renk }}
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

        {/* KURUMSAL */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <p className="text-center text-gray-400 text-xs mb-4 uppercase tracking-wider font-medium">Kurumsal Üyelik</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              href="/medikal-firma"
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">İlaç & Medikal Cihaz Firması</h3>
                <p className="text-xs text-gray-400 leading-snug">Doktor ağına ulaşın, ürünlerinizi tanıtın</p>
              </div>
              <div className="text-xs font-semibold py-1.5 px-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
                Başvur →
              </div>
            </Link>

            <Link
              href="/medikal-firma?tip=utt"
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F0FDFA", color: "#0E7C7B" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">Ürün Tanıtım Temsilcisi</h3>
                <p className="text-xs text-gray-400 leading-snug">Hedef doktorlara ulaşın, ürün tanıtımı yapın</p>
              </div>
              <div className="text-xs font-semibold py-1.5 px-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#F0FDFA", color: "#0E7C7B" }}>
                Başvur →
              </div>
            </Link>
          </div>
        </div>

        {/* HASTA GİRİŞİ */}
        <div className="mt-4 border-t border-gray-100 pt-6">
          <p className="text-center text-gray-400 text-xs mb-4">Sağlık profesyoneli değil misiniz?</p>
          <Link
            href="/hasta-panel"
            className="group flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all max-w-sm mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-gray-900 text-sm mb-0.5">Hasta Girişi</h3>
              <p className="text-xs text-gray-400">Randevularınızı görüntüleyin, hasta formlarına erişin</p>
            </div>
            <div className="text-xs font-semibold py-1.5 px-3 rounded-full" style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
              Giriş →
            </div>
          </Link>
        </div>

        {/* ALT BİLGİ */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, baslik: "Ücretsiz", aciklama: "Temel profil tamamen ücretsiz" },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, baslik: "Hızlı Yayın", aciklama: "24 saat içinde profiliniz yayında" },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, baslik: "Daha Fazla Hasta", aciklama: "Aylık binlerce aktif kullanıcı" },
          ].map((item) => (
            <div key={item.baslik} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <div style={{ color: "#0E7C7B" }} className="flex justify-center mb-2">{item.icon}</div>
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
