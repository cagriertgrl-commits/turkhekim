import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Hakkımızda | DoktorPusula",
  description: "DoktorPusula hakkında — Türkiye'nin bağımsız sağlık platformunun hikayesi ve misyonu.",
};

const S = /** @type {const} */ ({ viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round", width:24, height:24 });
const DEGERLELER = [
  {
    svg: <svg {...S}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    baslik: "Tam Şeffaflık",
    aciklama: "Hiçbir yorum silinemez veya değiştirilemez. Doktor sıralaması reklam bütçesine değil, gerçek hasta puanına göre yapılır.",
  },
  {
    svg: <svg {...S}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    baslik: "Tamamen Bağımsız",
    aciklama: "Yabancı sermaye veya holding bağlantısı yoktur. Türk doktorların güvendiği, Türk hastalar için kurulmuştur.",
  },
  {
    svg: <svg {...S}><circle cx="12" cy="12" r="9"/><path d="M12 3a14.5 14.5 0 0 0 0 18M3 12h18"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/></svg>,
    baslik: "Çok Dilli Erişim",
    aciklama: "Türkçe, Farsça, Arapça ve Azerbaycan Türkçesi ile medikal turistler kendi dilinde hizmet alır.",
  },
  {
    svg: <svg {...S}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    baslik: "Doğrulanmış Yorumlar",
    aciklama: "Her yorum telefon numarasıyla doğrulanır. Gerçek hasta, gerçek deneyim. Sahte yorum sıfır tolerans.",
  },
  {
    svg: <svg {...S}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    baslik: "Doktor Odaklı",
    aciklama: "Doktorlar profillerini ücretsiz oluşturur, randevularını yönetir. Platform doktorları değil, hastaları destekler.",
  },
  {
    svg: <svg {...S}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    baslik: "Teknoloji ile Sağlık",
    aciklama: "Modern altyapı, hızlı arama, anlık randevu. Sağlık aramak artık kolaylaşıyor.",
  },
];

const ISTATISTIKLER = [
  { sayi: "180K+", etiket: "Kayıtlı Hekim" },
  { sayi: "81 İl", etiket: "Türkiye Geneli" },
  { sayi: "4 Dil", etiket: "Çok Dilli Destek" },
  { sayi: "%100", etiket: "Bağımsız Platform" },
];

export default function Hakkimizda() {
  return (
    <>
      <Navbar aktifSayfa="Hakkımızda" />
      <main className="min-h-screen bg-white">

        {/* HERO */}
        <section
          style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }}
          className="relative px-6 py-24 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #0E7C7B, transparent)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #C9A84C, transparent)", transform: "translate(-30%, 30%)" }} />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div style={{ backgroundColor: "#0E7C7B20", borderColor: "#0E7C7B50" }}
              className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span style={{ color: "#4DD9D8" }} className="text-sm font-medium">🇹🇷 Türkiye'nin Bağımsız Sağlık Platformu</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sağlıkta Güveni<br />
              <span style={{ color: "#0E7C7B" }}>Yeniden İnşa Ediyoruz</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Türkiye'deki sağlık platformları ya yabancı sermayeye ya da reklam geliri için
              doktor sıralamasını bozan teşviklere dayanıyordu. DoktorPusula bu sorunları çözmek için kuruldu.
            </p>
          </div>
        </section>

        {/* İSTATİSTİKLER */}
        <section style={{ backgroundColor: "#0E7C7B" }} className="px-6 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {ISTATISTIKLER.map((item) => (
              <div key={item.etiket}>
                <div className="text-3xl font-bold">{item.sayi}</div>
                <div className="text-sm opacity-80 mt-1">{item.etiket}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HİKAYE */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p style={{ color: "#0E7C7B" }} className="text-sm font-semibold mb-3 uppercase tracking-widest">Hikayemiz</p>
                <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-6 leading-tight">
                  Neden DoktorPusula<br />Kuruldu?
                </h2>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    Türkiye'de doktor aramak zordu. Mevcut platformlar ya yabancı ortaklara sahipti
                    ya da daha fazla reklam bütçesi olan doktorları öne çıkarıyordu.
                    Hasta yorumları kolayca silinebiliyor, gerçek deneyimler gizleniyordu.
                  </p>
                  <p>
                    DoktorPusula bu tabloya itiraz ederek kuruldu.
                    <strong style={{ color: "#0D2137" }}> Tek bir kuralımız var:</strong> hasta
                    ve doktor için dürüst, şeffaf ve erişilebilir olmak.
                  </p>
                  <p>
                    Yorumlar silinemez. Sıralamalar para ile değiştirilemez.
                    Medikal turistler kendi dilinde hizmet alır. Platform tamamen Türkiye'de,
                    Türk ekip tarafından geliştirilmektedir.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {[
                  { yil: "2024", baslik: "Fikir Doğdu", aciklama: "Türkiye'nin bağımsız sağlık platformuna olan ihtiyaç net görüldü." },
                  { yil: "2025", baslik: "Platform Kuruldu", aciklama: "DoktorPusula hayata geçti. İlk doktor profilleri ve yorum sistemi tamamlandı." },
                  { yil: "2025+", baslik: "Büyüme", aciklama: "Çok dilli destek, medikal turizm portalı ve doktor paneli eklendi." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div style={{ backgroundColor: "#0E7C7B" }} className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {item.yil.replace("+", "")}
                      </div>
                      {i < 2 && <div style={{ backgroundColor: "#E5E7EB" }} className="w-0.5 flex-1 mt-2" />}
                    </div>
                    <div className="pb-6">
                      <h3 style={{ color: "#0D2137" }} className="font-bold mb-1">{item.baslik}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.aciklama}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DEĞERLER */}
        <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p style={{ color: "#0E7C7B" }} className="text-sm font-semibold mb-3 uppercase tracking-widest">Değerlerimiz</p>
              <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold">Bizi Farklı Kılan Nedir?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {DEGERLELER.map((d) => (
                <div key={d.baslik} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div style={{ color: "#0E7C7B" }} className="mb-4">{d.svg}</div>
                  <h3 style={{ color: "#0D2137" }} className="font-bold text-base mb-2">{d.baslik}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{d.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İLETİŞİM */}
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p style={{ color: "#0E7C7B" }} className="text-sm font-semibold mb-3 uppercase tracking-widest">İletişim</p>
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-10">Bize Ulaşın</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {[
                { etiket: "Genel İletişim", deger: "iletisim@doktorpusula.com", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg> },
                { etiket: "Doktor Destek", deger: "doktor@doktorpusula.com", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg> },
                { etiket: "Basın & Medya", deger: "basin@doktorpusula.com", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg> },
              ].map((item, i) => (
                <div
                  key={item.etiket}
                  className={`flex items-center justify-between px-6 py-4 ${i < 2 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: "#0E7C7B" }}>{item.icon}</span>
                    <span className="text-gray-500 text-sm">{item.etiket}</span>
                  </div>
                  <a href={`mailto:${item.deger}`} style={{ color: "#0E7C7B" }} className="font-semibold text-sm hover:underline">
                    {item.deger}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/kayit-ol"
                style={{ backgroundColor: "#0E7C7B" }}
                className="text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Doktor Olarak Katıl
              </Link>
              <Link
                href="/istanbul/kbb-uzmani"
                style={{ borderColor: "#0D2137", color: "#0D2137" }}
                className="border-2 px-8 py-3 rounded-xl font-semibold hover:opacity-80 transition-opacity"
              >
                Doktor Ara
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
