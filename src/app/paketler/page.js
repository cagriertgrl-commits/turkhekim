import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Paketler & Fiyatlandırma — DoktorPusula",
  description: "DoktorPusula doktor üyelik paketleri. Ücretsiz, Premium, Pro ve Kurumsal planlar.",
  alternates: { canonical: "https://doktorpusula.com/paketler" },
};

const PAKETLER = [
  {
    ad: "Ücretsiz",
    fiyat: "0",
    periyot: "sonsuza dek",
    renk: "#6B7280",
    bg: "#F5F7FA",
    border: "#E5E7EB",
    ozellikler: [
      { metin: "Temel profil sayfası", var: true },
      { metin: "Randevu talebi alma", var: true },
      { metin: "Hasta yorumları", var: true },
      { metin: "Fotoğraf yükleme", var: true },
      { metin: "Analitik dashboard", var: false },
      { metin: "AI Asistan", var: false },
      { metin: "Öne çıkarma", var: false },
      { metin: "WhatsApp entegrasyonu", var: false },
      { metin: "Medya / Makale yayını", var: false },
    ],
    cta: "Ücretsiz Başla",
    href: "/kayit-ol",
    populer: false,
  },
  {
    ad: "Premium",
    fiyat: "999",
    periyot: "ay",
    renk: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    ozellikler: [
      { metin: "Temel profil sayfası", var: true },
      { metin: "Randevu talebi alma", var: true },
      { metin: "Hasta yorumları", var: true },
      { metin: "Fotoğraf yükleme", var: true },
      { metin: "Analitik dashboard", var: false },
      { metin: "AI Asistan", var: true },
      { metin: "Öne çıkarma", var: false },
      { metin: "WhatsApp entegrasyonu", var: true },
      { metin: "Medya / Makale yayını", var: false },
    ],
    cta: "Premium'a Geç",
    href: "mailto:satis@doktorpusula.com?subject=Premium Paket Talebi",
    populer: true,
  },
  {
    ad: "Pro",
    fiyat: "1.599",
    periyot: "ay",
    renk: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    ozellikler: [
      { metin: "Temel profil sayfası", var: true },
      { metin: "Randevu talebi alma", var: true },
      { metin: "Hasta yorumları", var: true },
      { metin: "Fotoğraf yükleme", var: true },
      { metin: "Analitik dashboard", var: true },
      { metin: "AI Asistan (Gelişmiş)", var: true },
      { metin: "Görüşme Özetle — AI not asistanı", var: true },
      { metin: "Öne çıkarma (kategori başı)", var: true },
      { metin: "WhatsApp entegrasyonu", var: true },
      { metin: "Medya / Makale yayını", var: true },
    ],
    cta: "Pro'ya Geç",
    href: "mailto:satis@doktorpusula.com?subject=Pro Paket Talebi",
    populer: false,
  },
  {
    ad: "Kurumsal",
    fiyat: "Teklif",
    periyot: "alın",
    renk: "#059669",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    ozellikler: [
      { metin: "Tüm Pro özellikleri", var: true },
      { metin: "Çoklu doktor profili", var: true },
      { metin: "Klinik / Hastane sayfası", var: true },
      { metin: "Özel entegrasyon", var: true },
      { metin: "Öncelikli destek", var: true },
      { metin: "AI Asistan sınırsız", var: true },
      { metin: "Görüşme Özetle — AI not asistanı", var: true },
      { metin: "Özel fiyatlandırma", var: true },
      { metin: "SLA garantisi", var: true },
      { metin: "Dedike hesap yöneticisi", var: true },
    ],
    cta: "Teklif Al",
    href: "mailto:kurumsal@doktorpusula.com?subject=Kurumsal Paket Talebi",
    populer: false,
  },
];

export default function PaketlerSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">Paketler & Fiyatlandırma</h1>
          <p className="text-gray-300 text-lg mb-2">İhtiyacınıza uygun planı seçin</p>
          <p className="text-gray-400 text-sm">Tüm planlar KDV dahil · İptal istediğiniz zaman</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Görüşme Özetle Banner */}
        <div style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }} className="rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-5">
          <div className="text-4xl">🎙️</div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-white font-bold text-lg mb-1">Yeni: Görüşme Özetle — AI Not Asistanı</div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Hasta görüşmenizi kaydedin; AI gerçek zamanlı dinler, şikayetleri, talepleri ve kritik noktaları otomatik özetler. Not alma devri bitti.
            </p>
          </div>
          <div className="text-purple-300 text-xs font-semibold bg-purple-900/40 px-4 py-2 rounded-xl whitespace-nowrap">Pro & Kurumsal</div>
        </div>

        {/* Paket kartları */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PAKETLER.map((paket) => (
            <div
              key={paket.ad}
              style={{ borderColor: paket.populer ? paket.renk : "#E5E7EB" }}
              className={`bg-white rounded-2xl border-2 p-6 shadow-sm relative flex flex-col ${paket.populer ? "shadow-lg" : ""}`}
            >
              {paket.populer && (
                <div
                  style={{ backgroundColor: paket.renk }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
                >
                  🌟 En Popüler
                </div>
              )}

              <div className="mb-5">
                <span style={{ backgroundColor: paket.bg, color: paket.renk }} className="text-xs font-bold px-3 py-1 rounded-full">
                  {paket.ad}
                </span>
                <div className="mt-4 flex items-end gap-1">
                  <span style={{ color: "#0D2137" }} className="text-3xl font-bold">
                    {paket.fiyat === "Teklif" ? "" : "₺"}{paket.fiyat}
                  </span>
                  <span className="text-gray-400 text-sm mb-1">/ {paket.periyot}</span>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {paket.ozellikler.map((oz) => (
                  <li key={oz.metin} className={`flex items-start gap-2 text-sm ${oz.var ? "text-gray-700" : "text-gray-300 line-through"}`}>
                    <span className={`flex-shrink-0 mt-0.5 ${oz.var ? "" : "opacity-30"}`} style={{ color: oz.var ? paket.renk : "#9CA3AF" }}>
                      {oz.var ? "✓" : "✗"}
                    </span>
                    {oz.metin}
                  </li>
                ))}
              </ul>

              <a
                href={paket.href}
                style={paket.populer
                  ? { backgroundColor: paket.renk, color: "white" }
                  : { borderColor: paket.renk, color: paket.renk }
                }
                className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 ${paket.populer ? "" : "border-2"}`}
              >
                {paket.cta}
              </a>
            </div>
          ))}
        </div>

        {/* SSS */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 style={{ color: "#0D2137" }} className="font-bold text-xl mb-6">Sık Sorulan Sorular</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { s: "Ücretsiz paketten ücretliye geçiş nasıl oluyor?", c: "satis@doktorpusula.com adresine mail atmanız yeterli. 24 saat içinde paketiniz aktifleştirilir." },
              { s: "İptal edebilir miyim?", c: "İstediğiniz zaman iptal edebilirsiniz. İptal sonrası dönem sonuna kadar paketiniz aktif kalır." },
              { s: "AI Asistan ne işe yarıyor?", c: "Emsal kararlar, hasta hakları ve klinik yönetim konularında anında yanıt veriyor." },
              { s: "Görüşme Özetle nasıl çalışıyor?", c: "Hasta görüşmenizi kayıt altına alın; AI gerçek zamanlı metne döküp şikayetleri, talepleri ve kritik noktaları otomatik özetler. Yalnızca Chrome/Edge tarayıcısında çalışır." },
              { s: "Fatura kesiyor musunuz?", c: "Evet, tüm ödemeler için e-fatura düzenliyoruz." },
            ].map((item) => (
              <div key={item.s}>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">❓ {item.s}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İletişim CTA */}
        <div style={{ backgroundColor: "#0D2137" }} className="rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-lg mb-2">Hangi paketi seçeceğinizden emin değil misiniz?</h3>
          <p className="text-gray-300 text-sm mb-5">Size özel bir teklif hazırlayalım.</p>
          <a href="mailto:satis@doktorpusula.com" style={{ backgroundColor: "#0E7C7B" }}
            className="inline-block text-white px-8 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
            Bizimle İletişime Geçin →
          </a>
        </div>

      </div>
    </div>
  );
}
