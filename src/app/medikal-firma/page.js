import Navbar from "@/components/Navbar";
import FirmaBaşvuruFormu from "./FirmaBasvuruFormu";

export const metadata = {
  title: "Medikal Firma & İlaç Mümessili Çözümleri | DoktorPusula",
  description: "DoktorPusula'nın 10.000+ doktor ağına ulaşın. İlaç firmaları, medikal cihaz şirketleri ve sağlık hizmet sağlayıcıları için özel çözümler.",
};

const OZELLIKLER = [
  { ikon: "📢", baslik: "Haftada 1 Akış Reklamı", aciklama: "Her hafta seçtiğiniz bir ürün, doktor akışında öne çıkarılır. Gösterim garantili." },
  { ikon: "🔔", baslik: "Takipçi Bildirimleri", aciklama: "Ürününüzde indirim veya kampanya açtığınızda sizi takip eden doktorlara anında bildirim gönderilir." },
  { ikon: "🔌", baslik: "API Erişimi", aciklama: "Doktor ağına kendi CRM sisteminizden erişin. Şehir, uzmanlık ve klinik bazlı filtreleme yapın." },
  { ikon: "🕐", baslik: "7/24 Destek", aciklama: "Öncelikli destek hattı. Yayın takvimi, reklam içeriği ve teknik sorularınız için daima yanınızdayız." },
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

        {/* TEK PAKET */}
        <div className="mt-14">
          <div className="text-center mb-10">
            <h2 className="text-gray-900 text-2xl font-bold mb-2">Kurumsal Üyelik</h2>
            <p className="text-gray-500 text-sm">Tek plan, tüm özellikler — fazlası yok, eksiği yok.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Fiyat kartı */}
            <div className="bg-white rounded-3xl border-2 shadow-lg p-8 text-center mb-8" style={{ borderColor: "var(--teal)" }}>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "var(--teal)" }}>
                ✦ Tek Plan
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold" style={{ color: "var(--navy)" }}>₺3.000</span>
                <span className="text-gray-400 text-lg">/ay</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">Aylık veya yıllık — fiyat değişmez.</p>
              <a
                href="#basvuru"
                className="inline-block text-white px-10 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--teal)" }}
              >
                Hemen Başvur
              </a>
            </div>

            {/* Özellikler */}
            <div className="grid sm:grid-cols-2 gap-4">
              {OZELLIKLER.map((o) => (
                <div key={o.baslik} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
                  <div className="text-2xl flex-shrink-0">{o.ikon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{o.baslik}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{o.aciklama}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAŞVURU FORMU */}
        <div id="basvuru" className="mt-14 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 text-xl mb-2">Başvuru Formu</h2>
          <p className="text-gray-500 text-sm mb-6">Formunuzu gönderin, ekibimiz 1 iş günü içinde sizinle iletişime geçsin.</p>
          <FirmaBaşvuruFormu />
        </div>
      </div>

    </div>
  );
}
