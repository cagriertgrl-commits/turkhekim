import Navbar from "@/components/Navbar";
import AramaKutusu from "@/components/AramaKutusu";
import sql from "@/lib/db";
import Link from "next/link";
import { UZMANLIK_GRID } from "@/components/UzmanlikIkonlari";
import AnasayfaDoktorlar from "./AnasayfaDoktorlar";
import AnasayfaNedenBiz from "./AnasayfaNedenBiz";

const TR_ADLAR = { "kbb-uzmani": "KBB", "kardiyoloji": "Kardiyoloji", "ortopedi": "Ortopedi", "plastik-cerrahi": "Plastik Cerrahi", "goz-hastaliklari": "Göz", "dis-hekimi": "Diş Hekimi", "dermatoloji": "Dermatoloji", "noroloji": "Nöroloji", "psikiyatri": "Psikiyatri", "cocuk-hastaliklari": "Çocuk Sağlığı", "estetik-cerrahi": "Estetik Cerrahi", "rinoplasti": "Rinoplasti" };

const POPULER_SEHIRLER = [
  { ad: "İstanbul", slug: "istanbul", foto: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&h=300&q=80" },
  { ad: "Ankara", slug: "ankara", foto: "/ankara.jpg" },
  { ad: "İzmir", slug: "izmir", foto: "/izmir.jpg" },
  { ad: "Antalya", slug: "antalya", foto: "/antalya.jpg" },
  { ad: "Bursa", slug: "bursa", foto: "/bursa.jpg" },
  { ad: "Adana", slug: "adana", foto: "/adana.jpg" },
  { ad: "Eskişehir", slug: "eskisehir", foto: "/eskisehir.jpg" },
];

export default async function Home() {
  let doktorlar = [];
  let sonYorumlar = [];
  let istatistikler = { doktor_sayisi: 0, yorum_sayisi: 0 };

  try {
    doktorlar = await sql`
      SELECT id, ad, soyad, unvan, uzmanlik, sehir, puan, yorum_sayisi, deneyim, slug, foto_url, onaylandi
      FROM doktorlar
      WHERE onaylandi = true
      ORDER BY yorum_sayisi DESC, puan DESC
      LIMIT 6
    `;
    const stats = await sql`
      SELECT
        (SELECT COUNT(*) FROM doktorlar) as doktor_sayisi,
        (SELECT COUNT(*) FROM yorumlar) as yorum_sayisi
    `;
    istatistikler = stats[0];
    sonYorumlar = await sql`
      SELECT y.hasta_adi, y.puan, y.metin, y.tarih, d.ad as doktor_ad, d.uzmanlik, d.slug
      FROM yorumlar y
      JOIN doktorlar d ON d.id = y.doktor_id
      WHERE d.onaylandi = true AND y.yayinlandi = true
      ORDER BY y.tarih DESC
      LIMIT 3
    `;
  } catch {
    /* veri çekilemezse sayfa boş render olur */
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "DoktorPusula",
    "url": "https://doktorpusula.com",
    "logo": "https://doktorpusula.com/logo.png",
    "description": "Türkiye'nin bağımsız, şeffaf sağlık platformu. Doğrulanmış yorumlar ve kolay randevu.",
    "address": { "@type": "PostalAddress", "addressCountry": "TR" },
    "availableLanguage": ["Turkish", "English", "Arabic"],
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": istatistikler.doktor_sayisi },
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\/script>/gi, '<\\/script>') }} />
      <Navbar />

      {/* HERO */}
      <section
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 50%, var(--navy) 100%)" }}
        className="relative px-6 py-24 overflow-x-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--teal), transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--gold), transparent)", transform: "translate(-30%, 30%)" }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div style={{ backgroundColor: "rgba(14,124,123,0.12)", borderColor: "rgba(14,124,123,0.31)" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ color: "#4DD9D8" }} className="text-sm font-medium">Türkiye&apos;nin Bağımsız Sağlık Platformu</span>
          </div>

          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Doğru Hekime<br />
            <span style={{ color: "var(--teal)" }}>Güvenle Ulaş</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Doğrulanmış yorumlar, şeffaf profiller ve kolay randevu.
            Yabancı sermayeden bağımsız, Türkiye&apos;nin sağlık otoritesi.
          </p>

          <AramaKutusu />
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ backgroundColor: "var(--teal)" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { sayi: istatistikler.doktor_sayisi > 0 ? `${parseInt(istatistikler.doktor_sayisi).toLocaleString("tr-TR")}+` : "180K+", etiket: "Kayıtlı Hekim" },
              { sayi: istatistikler.yorum_sayisi > 0 ? `${parseInt(istatistikler.yorum_sayisi).toLocaleString("tr-TR")}+` : "500+", etiket: "Doğrulanmış Yorum" },
              { sayi: "5 Dil", etiket: "Çok Dilli Destek" },
              { sayi: "81 İl", etiket: "Türkiye Geneli" },
            ].map((item) => (
              <div key={item.etiket}>
                <div className="text-3xl font-bold">{item.sayi}</div>
                <div className="text-sm opacity-80 mt-1">{item.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UZMANLIK ALANLARI */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold mb-2">Uzmanlık Alanı Seçin</h2>
            <p className="text-gray-400 text-sm">İhtiyacınıza göre doğru uzmana ulaşın</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {UZMANLIK_GRID.map((u) => (
              <Link key={u.slug} href={`/istanbul/${u.slug}`} className="flex flex-col items-center gap-2.5 p-4 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 border border-transparent group" style={{ backgroundColor: u.bg }}>
                <span style={{ color: u.renk }}><u.Ikon /></span>
                <span className="text-xs font-semibold text-center leading-tight" style={{ color: u.renk }}>{TR_ADLAR[u.slug]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ÖNE ÇIKAN DOKTORLAR */}
      <AnasayfaDoktorlar doktorlar={doktorlar} />

      {/* NASIL ÇALIŞIR */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ color: "var(--teal)" }} className="text-xs font-bold mb-2 uppercase tracking-widest">Basit ve Hızlı</p>
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold">Nasıl Çalışır?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* bağlantı çizgisi */}
            <div className="hidden md:block absolute top-9 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px" style={{ background: "linear-gradient(to right, var(--teal), var(--teal))", opacity: 0.2 }} />
            {[
              {
                adim: "01",
                baslik: "Doktor Ara",
                aciklama: "Uzmanlık ve şehir seçerek yüzlerce doktor arasından filtrele. Puan, yorum ve deneyime göre sırala.",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>,
              },
              {
                adim: "02",
                baslik: "Profil İncele",
                aciklama: "Doktorun deneyimini, doğrulanmış hasta yorumlarını ve muayene fiyatını şeffaf şekilde gör.",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
              },
              {
                adim: "03",
                baslik: "Randevu Al",
                aciklama: "Doğrudan doktor profili üzerinden randevu talebi gönder. Onay SMS ile bildirilir.",
                svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>,
              },
            ].map((adim, i) => (
              <div key={adim.adim} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div style={{ backgroundColor: i === 1 ? "var(--navy)" : "white", color: i === 1 ? "white" : "var(--teal)", border: i === 1 ? "none" : "2px solid #E0F2F1" }} className="w-18 h-18 w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-sm">
                    {adim.svg}
                  </div>
                  <span style={{ backgroundColor: i === 1 ? "var(--teal)" : "var(--navy)", color: "white" }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 style={{ color: "var(--navy)" }} className="font-bold text-lg mb-2">{adim.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{adim.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPÜLER ŞEHİRLER */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 style={{ color: "var(--navy)" }} className="text-xl font-bold">Şehir Seçin</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {POPULER_SEHIRLER.map((sehir) => (
              <Link key={sehir.slug} href={`/${sehir.slug}/doktor`} className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group" style={{ aspectRatio: "3/4" }}>
                {sehir.foto ? (
                  <img src={sehir.foto} alt={sehir.ad} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a3d62 0%, #0E7C7B 100%)" }} />
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,33,55,0.85) 0%, rgba(13,33,55,0.2) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <span className="text-white font-bold text-sm drop-shadow">{sehir.ad}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SON YORUMLAR */}
      {sonYorumlar.length > 0 && (
        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 style={{ color: "var(--navy)" }} className="text-2xl font-bold">Gerçek Hasta Yorumları</h2>
                <p className="text-gray-500 text-sm mt-1">Telefon ile doğrulanmış, değiştirilemeyen yorumlar</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {sonYorumlar.map((yorum, i) => (
                <Link key={i} href={`/doktor/${yorum.slug}`} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map((y) => (
                      <span key={y} className={y <= yorum.puan ? "text-yellow-400" : "text-gray-200"}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">&quot;{yorum.metin}&quot;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-gray-700">{yorum.hasta_adi}</div>
                      <div style={{ color: "var(--teal)" }} className="text-xs">{yorum.doktor_ad} · {yorum.uzmanlik}</div>
                    </div>
                    <span style={{ backgroundColor: "#D1FAE5", color: "var(--success)" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">Doğrulanmış</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEDEN BİZ + MEDİKAL TURİZM + DOKTOR CTA */}
      <AnasayfaNedenBiz />
    </div>
  );
}
