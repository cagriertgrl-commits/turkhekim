import Link from "next/link";

const KARTLAR = [
  {
    Ikon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>,
    baslik: "Yorumlar Silinmiyor",
    aciklama: "Diğer platformlarda olumsuz yorum yazın, 48 saat içinde kaybolur. DoktorPusula'da bu fiziksel olarak imkansız.",
    ikonRenk: "#059669", ikonBg: "#DCFCE7", bg: "#F0FDF4",
  },
  {
    Ikon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    baslik: "Sıralama Satılık Değil",
    aciklama: "Para veren doktor üstte çıkmaz. Sıralama tamamen yorum puanı ve hasta memnuniyetine göre belirlenir.",
    ikonRenk: "#D97706", ikonBg: "#FEF3C7", bg: "#FFFBEB",
  },
  {
    Ikon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="M9 10h1m3 0h1M12 8v4"/></svg>,
    baslik: "Yabancı Sermaye Yok",
    aciklama: "Platform tamamen Türk sermayesi ile işliyor. Verileriniz yurt dışına çıkmaz. KVKK uyumlu altyapı.",
    ikonRenk: "#DC2626", ikonBg: "#FEE2E2", bg: "#FFF5F5",
  },
  {
    Ikon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/><path d="M12 2C9.5 6.5 9 10 9 12s.5 5.5 3 10M12 2c2.5 4.5 3 8 3 10s-.5 5.5-3 10"/></svg>,
    baslik: "5 Dilde Destek",
    aciklama: "Türkçe, Farsça, Arapça, İngilizce, Rusça. Medikal turistler kendi dilinde rehberlik ve tercüman desteği alır.",
    ikonRenk: "#0369A1", ikonBg: "#DBEAFE", bg: "#EFF6FF",
  },
  {
    Ikon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>,
    baslik: "60 Saniyede Randevu",
    aciklama: "Doktor profilinden tek tıkla randevu talebi gönder. Ortalama 2 saat içinde onay, SMS ile bildirim.",
    ikonRenk: "#0E7C7B", ikonBg: "#CCFBF1", bg: "#F0FDFA",
  },
  {
    Ikon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/><line x1="12" y1="17" x2="12" y2="19"/></svg>,
    baslik: "KVKK Uyumlu",
    aciklama: "Sağlık verileriniz Türkiye sunucularında şifreli tutulur. Kişisel bilgileriniz asla 3. taraflarla paylaşılmaz.",
    ikonRenk: "#0D2137", ikonBg: "#E2E8F0", bg: "#F8FAFC",
  },
];

export default function AnasayfaNedenBiz({ doktorSayisi }) {
  return (
    <>
      {/* ═══ NEDEN DOKTORPusula — Enemy Framing ═══ */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold mb-3">Diğer Platformlar Size Söylemiyor.</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Ama biz söylüyoruz.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {KARTLAR.map((kart) => (
              <div
                key={kart.baslik}
                className="rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
                style={{ backgroundColor: kart.bg, borderTop: `3px solid ${kart.ikonRenk}` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ backgroundColor: kart.ikonBg, color: kart.ikonRenk }} className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                    <kart.Ikon />
                  </div>
                  <h3 style={{ color: "var(--navy)" }} className="font-bold text-base leading-tight">{kart.baslik}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{kart.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MEDİKAL TURİZM BANNER ═══ */}
      <section style={{ background: "linear-gradient(135deg, var(--teal), #065f5e)" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center text-white">
          <p className="text-teal-200 text-sm font-semibold mb-2 uppercase tracking-widest">Uluslararası Hastalar</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Turkey&apos;s Best Medical Care<br />
            <span style={{ color: "var(--gold)" }}>in Your Language</span>
          </h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Hair transplant, rhinoplasty, dental implants, eye surgery and more.
            Verified doctors, transparent prices, full support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/medikal-turizm" className="bg-white text-teal-700 font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Medical Tourism Portal →
            </Link>
            <Link href="/fa" className="border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              فارسی | عربي
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DOKTOR CTA — Peer Pressure ═══ */}
      <section style={{ backgroundColor: "var(--navy)" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ color: "var(--teal)" }} className="text-sm font-semibold mb-3 uppercase tracking-wide">Hekimler İçin</p>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Meslektaşlarınız<br />
                <span style={{ color: "var(--teal)" }}>Zaten Burada.</span>
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-sm">
                {doktorSayisi > 0 ? `${doktorSayisi.toLocaleString("tr-TR")} hekim` : "Yüzlerce hekim"} DoktorPusula&apos;yı tercih ediyor.
                Ücretsiz profilinizi oluşturun, 24 saat içinde yayında olsun.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Ücretsiz profil — 3 dakikada oluştur",
                  "Silinemeyen doğrulanmış hasta yorumları",
                  "Online randevu takvimi + SMS hatırlatma",
                  "5 dilde hasta erişimi (medikal turizm)",
                ].map((madde) => (
                  <div key={madde} className="flex items-center gap-3">
                    <span style={{ backgroundColor: "rgba(14,124,123,0.12)", color: "var(--teal)" }} className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-300 text-sm">{madde}</span>
                  </div>
                ))}
              </div>
              <Link href="/kayit-ol" style={{ backgroundColor: "var(--teal)" }} className="inline-block text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg">
                Ücretsiz Profil Oluştur — 3 Dakika
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { sayi: "Ücretsiz", etiket: "Temel Profil" },
                { sayi: "3x", etiket: "Daha Fazla Hasta" },
                { sayi: "24 Saat", etiket: "Profil Yayında" },
                { sayi: "7/24", etiket: "Destek" },
              ].map((item) => (
                <div key={item.etiket} style={{ backgroundColor: "#ffffff08", borderColor: "#ffffff15" }} className="border rounded-2xl p-5 text-center">
                  <div style={{ color: "#4DD9D8" }} className="text-2xl font-bold">{item.sayi}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.etiket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
