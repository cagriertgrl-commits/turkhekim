import Navbar from "@/components/Navbar";
import AramaKutusu from "@/components/AramaKutusu";
import sql from "@/lib/db";
import Link from "next/link";

const UZMANLIK_RENK = ["var(--light-teal)", "#EFF6FF", "#FFFBEB", "#F5F3FF"];
const UZMANLIK_GRID = [
  { ad: "KBB", slug: "kbb-uzmani", ikon: "👂" },
  { ad: "Kardiyoloji", slug: "kardiyoloji", ikon: "❤️" },
  { ad: "Ortopedi", slug: "ortopedi", ikon: "🦴" },
  { ad: "Plastik Cerrahi", slug: "plastik-cerrahi", ikon: "✨" },
  { ad: "Göz", slug: "goz-hastaliklari", ikon: "👁️" },
  { ad: "Diş Hekimi", slug: "dis-hekimi", ikon: "🦷" },
  { ad: "Dermatoloji", slug: "dermatoloji", ikon: "🩺" },
  { ad: "Nöroloji", slug: "noroloji", ikon: "🧠" },
  { ad: "Psikiyatri", slug: "psikiyatri", ikon: "🧘" },
  { ad: "Çocuk Sağlığı", slug: "cocuk-hastaliklari", ikon: "👶" },
  { ad: "Estetik Cerrahi", slug: "estetik-cerrahi", ikon: "🌟" },
  { ad: "Rinoplasti", slug: "rinoplasti", ikon: "👃" },
];

function formatDeneyim(d) {
  if (!d) return d;
  const s = d.toString().trim();
  return /^\d+$/.test(s) ? `${s} yıl` : s;
}

function rozetHesapla(doktor) {
  const rozetler = [];
  if (doktor.onaylandi) rozetler.push({ ad: "Doğrulanmış", renk: "var(--success)", bg: "#D1FAE5" });
  if (doktor.deneyim) rozetler.push({ ad: `⭐ ${formatDeneyim(doktor.deneyim)} Deneyim`, renk: "#2563EB", bg: "#DBEAFE" });
  return rozetler;
}

const POPULER_SEHIRLER = [
  { ad: "İstanbul", slug: "istanbul", foto: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=400&h=300&q=80" },
  { ad: "Ankara", slug: "ankara", foto: "https://images.unsplash.com/photo-1578894303900-16f3a135cac1?auto=format&fit=crop&w=400&h=300&q=80" },
  { ad: "İzmir", slug: "izmir", foto: "https://images.unsplash.com/photo-1581449516-de23d18a9e79?auto=format&fit=crop&w=400&h=300&q=80" },
  { ad: "Antalya", slug: "antalya", foto: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&h=300&q=80" },
  { ad: "Bursa", slug: "bursa", foto: "https://images.unsplash.com/photo-1506905925345-e44c4ea2c478?auto=format&fit=crop&w=400&h=300&q=80" },
  { ad: "Adana", slug: "adana", foto: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=400&h=300&q=80" },
];

export default async function Home() {
  let doktorlar = [];
  let sonYorumlar = [];
  let istatistikler = { doktor_sayisi: 0, yorum_sayisi: 0 };

  try {
    doktorlar = await sql`
      SELECT id, ad, uzmanlik, sehir, puan, yorum_sayisi, deneyim, slug, foto_url, onaylandi
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
  } catch {}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 50%, var(--navy) 100%)",
        }}
        className="relative px-6 py-24 overflow-hidden"
      >
        {/* Dekoratif arka plan elementleri */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--teal), transparent)", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--gold), transparent)", transform: "translate(-30%, 30%)" }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div
            style={{ backgroundColor: "rgba(14,124,123,0.12)", borderColor: "rgba(14,124,123,0.31)" }}
            className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ color: "#4DD9D8" }} className="text-sm font-medium">
              🇹🇷 Türkiye'nin Bağımsız Sağlık Platformu
            </span>
          </div>

          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Doğru Hekime<br />
            <span style={{ color: "var(--teal)" }}>Güvenle Ulaş</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Doğrulanmış yorumlar, şeffaf profiller ve kolay randevu.
            Yabancı sermayeden bağımsız, Türkiye'nin sağlık otoritesi.
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
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold mb-2">
              Uzmanlık Alanı Seçin
            </h2>
            <p className="text-gray-400 text-sm">İhtiyacınıza göre doğru uzmana ulaşın</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {UZMANLIK_GRID.map((u, i) => (
              <Link
                key={u.slug}
                href={`/istanbul/${u.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:shadow-md transition-all hover:-translate-y-0.5 border border-gray-100 hover:border-teal-200 group"
                style={{ backgroundColor: UZMANLIK_RENK[i % UZMANLIK_RENK.length] }}
              >
                <span className="text-3xl">{u.ikon}</span>
                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-teal-700 leading-tight">
                  {u.ad}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ÖNE ÇIKAN DOKTORLAR */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold">Öne Çıkan Doktorlar</h2>
              <p className="text-gray-500 text-sm mt-1">Doğrulanmış, en yüksek puanlı hekimler</p>
            </div>
            <Link href="/istanbul/doktor" style={{ color: "var(--teal)" }} className="text-sm font-semibold hover:underline hidden md:block">
              Tümünü Gör →
            </Link>
          </div>

          {doktorlar.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {doktorlar.map((doktor) => {
                const initials = doktor.ad.split(" ").slice(1).map((n) => n[0]).join("").slice(0, 2);
                const rozetler = rozetHesapla(doktor);
                return (
                  <Link
                    key={doktor.id}
                    href={`/doktor/${doktor.slug}`}
                    className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {doktor.foto_url ? (
                        <img
                          src={doktor.foto_url}
                          alt={doktor.ad}
                          className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 border-2 border-gray-100"
                        />
                      ) : (
                        <div
                          style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }}
                          className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                        >
                          {initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors truncate">{doktor.ad}</h3>
                        <p style={{ color: "var(--teal)" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                        <p className="text-gray-500 text-xs mt-0.5">📍 {doktor.sehir}{doktor.deneyim ? ` · ${formatDeneyim(doktor.deneyim)} deneyim` : ""}</p>
                      </div>
                    </div>

                    {/* Rozetler */}
                    {rozetler.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {rozetler.map((r) => (
                          <span
                            key={r.ad}
                            style={{ backgroundColor: r.bg, color: r.renk }}
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          >
                            {r.ad}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {doktor.yorum_sayisi > 0 ? (
                          <>
                            <span className="text-yellow-400">★</span>
                            <span className="font-bold text-sm text-gray-900">{doktor.puan}</span>
                            <span className="text-gray-500 text-xs">({doktor.yorum_sayisi} yorum)</span>
                          </>
                        ) : (
                          <span className="text-gray-500 text-xs">Henüz yorum yok</span>
                        )}
                      </div>
                      <span
                        style={{ backgroundColor: "#F0FDFA", color: "var(--teal)" }}
                        className="text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors"
                      >
                        Profili Gör
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Statik kartlar (DB boşken) */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { ad: "Dr. Ayşe Kaya", uzmanlik: "KBB Uzmanı", sehir: "İstanbul", puan: 4.9, yorum: 127, deneyim: "12 yıl", slug: "dr-ayse-kaya" },
                { ad: "Dr. Mehmet Demir", uzmanlik: "Plastik Cerrah", sehir: "Ankara", puan: 4.8, yorum: 94, deneyim: "15 yıl", slug: "dr-mehmet-demir" },
                { ad: "Dr. Fatma Yıldız", uzmanlik: "Göz Hastalıkları", sehir: "İzmir", puan: 4.9, yorum: 203, deneyim: "18 yıl", slug: "dr-fatma-yildiz" },
              ].map((doktor) => (
                <Link
                  key={doktor.ad}
                  href={`/doktor/${doktor.slug}`}
                  className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all border border-gray-100 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {doktor.ad.split(" ")[1][0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{doktor.ad}</h3>
                      <p style={{ color: "var(--teal)" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                      <p className="text-gray-400 text-xs mt-0.5">📍 {doktor.sehir} · {doktor.deneyim}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span style={{ backgroundColor: "#D1FAE5", color: "var(--success)" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">Doğrulanmış</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-yellow-400">★</span>
                      <span className="font-bold text-sm">{doktor.puan}</span>
                      <span className="text-gray-400 text-xs">({doktor.yorum} yorum)</span>
                    </div>
                    <span style={{ backgroundColor: "#F0FDFA", color: "var(--teal)" }} className="text-xs font-semibold px-3 py-1 rounded-full">Profili Gör</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p style={{ color: "var(--teal)" }} className="text-sm font-semibold mb-2 uppercase tracking-widest">Basit ve Hızlı</p>
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold">Nasıl Çalışır?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Bağlantı çizgisi (masaüstü) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-teal-100 to-teal-100" />
            {[
              { adim: "1", icon: "🔍", baslik: "Doktor Ara", aciklama: "Uzmanlık alanı ve şehir seçerek yüzlerce doktor arasından filtreleme yap. Puan, yorum ve deneyime göre sırala." },
              { adim: "2", icon: "📋", baslik: "Profil İncele", aciklama: "Doktorun deneyimini, doğrulanmış hasta yorumlarını ve muayene fiyatını şeffaf şekilde gör." },
              { adim: "3", icon: "📅", baslik: "Randevu Al", aciklama: "Doğrudan doktor profili üzerinden randevu talebi gönder. Onay SMS ile bildirilir." },
            ].map((adim, i) => (
              <div key={adim.adim} className="relative text-center">
                <div
                  style={{ backgroundColor: i === 1 ? "var(--teal)" : "#F0FDFA", color: i === 1 ? "white" : "var(--teal)" }}
                  className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-5 shadow-sm"
                >
                  <span className="text-2xl">{adim.icon}</span>
                  <span className="text-xs font-bold mt-0.5 opacity-70">Adım {adim.adim}</span>
                </div>
                <h3 style={{ color: "var(--navy)" }} className="font-bold text-lg mb-2">{adim.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{adim.aciklama}</p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {POPULER_SEHIRLER.map((sehir) => (
              <Link
                key={sehir.slug}
                href={`/${sehir.slug}/doktor`}
                className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={sehir.foto}
                  alt={sehir.ad}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(13,33,55,0.85) 0%, rgba(13,33,55,0.2) 50%, transparent 100%)" }}
                />
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
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">"{yorum.metin}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-gray-700">{yorum.hasta_adi}</div>
                      <div style={{ color: "var(--teal)" }} className="text-xs">{yorum.doktor_ad} · {yorum.uzmanlik}</div>
                    </div>
                    <span style={{ backgroundColor: "#D1FAE5", color: "var(--success)" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">✓ Doğrulanmış</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEDEN TURKHEKİM */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold mb-3">Neden DoktorPusula?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Mevcut platformların çözemediği sorunları çözüyoruz.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: "✅",
                baslik: "Doğrulanmış Yorumlar",
                aciklama: "Her yorum telefon numarasıyla doğrulanır. Hiçbir yorum silinemez. Şeffaflık ilkemiz vazgeçilmezdir.",
                renk: "#F0FDF4",
              },
              {
                icon: "🇹🇷",
                baslik: "Tamamen Yerli",
                aciklama: "Hiçbir yabancı sermaye veya platform bağlantısı yok. Türk doktorların güvendiği, Türk hastalar için.",
                renk: "#EFF6FF",
              },
              {
                icon: "🌍",
                baslik: "Çok Dilli Destek",
                aciklama: "Türkçe, Farsça, Arapça, Azerbaycan Türkçesi. Medikal turistler kendi dilinde rehberlik alır.",
                renk: "#FFF7ED",
              },
              {
                icon: "📅",
                baslik: "Kolay Randevu",
                aciklama: "Doktor profilinden direkt randevu al. SMS ve email ile otomatik hatırlatma.",
                renk: "#F0FDFA",
              },
              {
                icon: "🏥",
                baslik: "Medikal Turizm",
                aciklama: "İranlı, Arap ve Orta Asyalı hastalar için özel portal. Paket hizmetler, tercüman, transfer.",
                renk: "#FDF4FF",
              },
              {
                icon: "🔒",
                baslik: "KVKK Uyumlu",
                aciklama: "Sağlık verileriniz Türkiye sunucularında şifreli tutulur. Kişisel verileriniz güvende.",
                renk: "#FFFBEB",
              },
            ].map((kart) => (
              <div
                key={kart.baslik}
                className="rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100"
                style={{ backgroundColor: kart.renk }}
              >
                <div className="text-3xl mb-4">{kart.icon}</div>
                <h3 style={{ color: "var(--navy)" }} className="font-bold text-base mb-2">{kart.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{kart.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDİKAL TURİZM BANNER */}
      <section
        style={{ background: "linear-gradient(135deg, var(--teal), #065f5e)" }}
        className="px-6 py-16"
      >
        <div className="max-w-6xl mx-auto text-center text-white">
          <p className="text-teal-200 text-sm font-semibold mb-2 uppercase tracking-widest">Uluslararası Hastalar</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Turkey's Best Medical Care<br />
            <span style={{ color: "var(--gold)" }}>in Your Language</span>
          </h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Hair transplant, rhinoplasty, dental implants, eye surgery and more.
            Verified doctors, transparent prices, full support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/medikal-turizm"
              className="bg-white text-teal-700 font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              Medical Tourism Portal →
            </Link>
            <Link
              href="/fa"
              className="border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              🇮🇷 فارسی | 🇸🇦 عربي
            </Link>
          </div>
        </div>
      </section>

      {/* DOKTOR İÇİN CTA */}
      <section style={{ backgroundColor: "var(--navy)" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p style={{ color: "var(--teal)" }} className="text-sm font-semibold mb-3 uppercase tracking-wide">Hekimler İçin</p>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Siz de DoktorPusula'da<br />Yerinizi Alın
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-sm">
                Ücretsiz profilinizi oluşturun, randevu takviminizi yönetin
                ve hasta tabanınızı büyütün.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Ücretsiz profil oluşturma",
                  "Doğrulanmış hasta yorumları",
                  "Online randevu takvimi",
                  "Çok dilli hasta erişimi",
                ].map((madde) => (
                  <div key={madde} className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: "rgba(14,124,123,0.12)", color: "var(--teal)" }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    >
                      ✓
                    </span>
                    <span className="text-gray-300 text-sm">{madde}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/doktor-ol"
                style={{ backgroundColor: "var(--teal)" }}
                className="inline-block text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Ücretsiz Kayıt Ol
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { sayi: "Ücretsiz", etiket: "Temel Profil" },
                { sayi: "3x", etiket: "Daha Fazla Hasta" },
                { sayi: "%8-12", etiket: "Medikal Turizm Komisyonu" },
                { sayi: "7/24", etiket: "Destek" },
              ].map((item) => (
                <div
                  key={item.etiket}
                  style={{ backgroundColor: "#ffffff08", borderColor: "#ffffff15" }}
                  className="border rounded-2xl p-5 text-center"
                >
                  <div style={{ color: "#4DD9D8" }} className="text-2xl font-bold">{item.sayi}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.etiket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
