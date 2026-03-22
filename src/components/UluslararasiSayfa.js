import Navbar from "@/components/Navbar";
import Link from "next/link";
import { UZMANLIK_GRID } from "@/components/UzmanlikIkonlari";

export default function UluslararasiSayfa({ t }) {
  const dir = t.dir || "ltr";

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <Navbar />

      {/* HERO */}
      <section
        style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 50%, #0D2137 100%)" }}
        className="relative px-6 py-24 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #0E7C7B, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C9A84C, transparent)", transform: "translate(-30%, 30%)" }} />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div style={{ backgroundColor: "rgba(14,124,123,0.12)", borderColor: "rgba(14,124,123,0.31)" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ color: "#4DD9D8" }} className="text-sm font-medium">🇹🇷 DoktorPusula</span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t.hero1}<br />
            <span style={{ color: "#4DD9D8" }}>{t.hero2}</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero_alt}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/istanbul/kbb-uzmani" style={{ backgroundColor: "#0E7C7B" }} className="text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg">
              {t.kayit} →
            </Link>
            <Link href="/kayit-ol" className="text-white border border-white/30 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              {t.cta_btn}
            </Link>
          </div>
        </div>
      </section>

      {/* UZMANLIK ALANLARI */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: "#0D2137" }} className="text-2xl md:text-3xl font-bold mb-2">{t.uzmanlik_baslik}</h2>
            <p className="text-gray-400 text-sm">{t.uzmanlik_alt}</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {UZMANLIK_GRID.map((u) => (
              <Link
                key={u.slug}
                href={`/istanbul/${u.slug}`}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 border border-transparent group"
                style={{ backgroundColor: u.bg }}
              >
                <span style={{ color: u.renk }}><u.Ikon /></span>
                <span className="text-xs font-semibold text-center leading-tight" style={{ color: u.renk }}>
                  {t.uzmanliklar[u.slug]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0D2137" }} className="text-2xl md:text-3xl font-bold">{t.nasil_baslik}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.adimlar.map((adim, i) => (
              <div key={i} className="text-center">
                <div
                  style={{ backgroundColor: i === 1 ? "#0E7C7B" : "#F0FDFA", color: i === 1 ? "white" : "#0E7C7B" }}
                  className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 shadow-sm"
                >
                  <span className="text-2xl font-bold">{i + 1}</span>
                </div>
                <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">{adim.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{adim.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FİYAT TABELASI */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0D2137" }} className="text-2xl md:text-3xl font-bold mb-3">{t.fiyat_baslik}</h2>
            <p className="text-gray-500 text-sm">{t.fiyat_alt}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.paketler.map((paket) => (
              <div
                key={paket.ad}
                className="rounded-2xl p-6 border-2 relative flex flex-col"
                style={{ backgroundColor: paket.bg, borderColor: paket.populer ? paket.renk : paket.border }}
              >
                {paket.populer && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-white text-xs font-bold px-4 py-1 rounded-full" style={{ backgroundColor: paket.renk }}>
                      {t.populer}
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-lg mb-1" style={{ color: paket.renk }}>{paket.ad}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold" style={{ color: "#0D2137" }}>{paket.fiyat}</span>
                    <span className="text-gray-500 text-sm">/ {paket.periyot}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {paket.ozellikler.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: paket.renk }}>✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
                <Link
                  href={paket.href}
                  className="block text-center py-2.5 px-4 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: paket.renk, color: "white" }}
                >
                  {paket.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ color: "#0D2137" }} className="text-2xl font-bold text-center mb-10">{t.neden_baslik}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {t.neden.map((kart) => (
              <div key={kart.baslik} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-4">{kart.ikon}</div>
                <h3 style={{ color: "#0D2137" }} className="font-bold text-base mb-2">{kart.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{kart.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{t.cta_baslik}</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">{t.cta_alt}</p>
          <Link href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg">
            {t.cta_btn}
          </Link>
        </div>
      </section>
    </div>
  );
}
