import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEDAVILER } from "../page";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tedavi = TEDAVILER.find((t) => t.slug === slug);
  if (!tedavi) return { title: "Bulunamadı" };
  return {
    title: `${tedavi.ad} — En İyi Uzmanlar | DoktorPusula`,
    description: `${tedavi.ad} için Türkiye'nin en iyi uzmanlarını inceleyin. Doğrulanmış yorumlar ve online randevu. DoktorPusula güvencesiyle.`,
    alternates: { canonical: `https://doktorpusula.com/tedaviler/${slug}` },
  };
}

export async function generateStaticParams() {
  return TEDAVILER.map((t) => ({ slug: t.slug }));
}

const SEHIRLER = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana"];

function sehirSlugYap(sehir) {
  return sehir.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-");
}
function uzmanlikSlugYap(uzmanlik) {
  return uzmanlik.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
}

export default async function TedaviDetay({ params }) {
  const { slug } = await params;
  const tedavi = TEDAVILER.find((t) => t.slug === slug);
  if (!tedavi) notFound();

  const uzmanlikSlug = uzmanlikSlugYap(tedavi.uzmanlik);

  // Bu uzmanlıkta onaylı doktorları çek (eslesimler regex ile geniş eşleşim)
  const pattern = tedavi.eslesimler || tedavi.uzmanlik.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c");
  const doktorlar = await sql`
    SELECT id, ad, uzmanlik, sehir, ilce, puan, yorum_sayisi, deneyim, slug, foto_url, onaylandi, fiyat, online_randevu
    FROM doktorlar
    WHERE translate(LOWER(uzmanlik),'ğüşıöçâîûê ','gusiocaiue-') ~* ${pattern}
      AND onaylandi = true
    ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST
    LIMIT 8
  `;

  const benzerTedaviler = TEDAVILER.filter((t) => t.slug !== slug && t.kategori === tedavi.kategori).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": tedavi.ad,
            "description": tedavi.aciklama,
            "procedureType": "https://health-lifesci.schema.org/MedicalProcedure",
          }),
        }}
      />

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/tedaviler" className="hover:text-white">Tedaviler</Link>
            <span>/</span>
            <span className="text-white">{tedavi.ad}</span>
          </nav>
          <div className="flex items-center gap-5">
            <div style={{ backgroundColor: tedavi.bg, color: tedavi.renk }} className="p-3 rounded-2xl">
              <tedavi.Ikon />
            </div>
            <div>
              <span style={{ backgroundColor: "#0E7C7B20", color: "#4DD9D8" }} className="text-xs px-3 py-1 rounded-full font-semibold mb-2 inline-block">
                {tedavi.kategori}
              </span>
              <h1 className="text-white text-3xl font-bold">{tedavi.ad}</h1>
              <p className="text-gray-300 mt-1">{tedavi.aciklama}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* SOL — Doktorlar */}
          <div className="md:col-span-2">
            <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-5">
              {tedavi.ad} Uzmanları
              <span style={{ color: "#0E7C7B" }} className="text-base font-normal ml-2">({doktorlar.length} doktor)</span>
            </h2>

            {doktorlar.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500 text-sm mb-4">Henüz bu tedavi için kayıtlı uzman yok.</p>
                <Link href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90">
                  Uzman misiniz? Kaydolun
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {doktorlar.map((doktor) => {
                  const initials = doktor.ad.split(" ").slice(1).map((n) => n[0]).join("").slice(0, 2);
                  return (
                    <div key={doktor.slug} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        {doktor.foto_url ? (
                          <img src={doktor.foto_url} alt={doktor.ad} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                        ) : (
                          <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                            {initials}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900">{doktor.ad}</h3>
                              <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                              <p className="text-gray-400 text-xs mt-0.5">📍 {doktor.sehir}{doktor.ilce ? ` · ${doktor.ilce}` : ""}</p>
                              <div className="flex items-center gap-3 mt-2 flex-wrap">
                                {doktor.yorum_sayisi > 0 && (
                                  <span className="text-sm font-bold text-yellow-500">★ {doktor.puan} <span className="text-gray-400 font-normal text-xs">({doktor.yorum_sayisi})</span></span>
                                )}
                                {doktor.online_randevu && (
                                  <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs px-2 py-0.5 rounded-full font-medium">💻 Online</span>
                                )}
                                {doktor.fiyat && (
                                  <span className="text-xs text-gray-500">{doktor.fiyat}</span>
                                )}
                              </div>
                            </div>
                            <Link href={`/doktor/${doktor.slug}`} style={{ backgroundColor: "#0D2137" }} className="text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity flex-shrink-0">
                              Profil →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Şehre göre linkler (SEO) */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">{tedavi.ad} — Şehre Göre</h3>
              <div className="flex flex-wrap gap-2">
                {SEHIRLER.map((sehir) => (
                  <Link
                    key={sehir}
                    href={`/${sehirSlugYap(sehir)}/${uzmanlikSlug}`}
                    className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    {sehir} {tedavi.ad}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ — Benzer tedaviler */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Benzer Tedaviler</h3>
              <div className="space-y-2">
                {benzerTedaviler.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tedaviler/${t.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span style={{ backgroundColor: t.bg, color: t.renk }} className="p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <t.Ikon />
                    </span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t.ad}</p>
                      <p className="text-xs text-gray-400">{t.aciklama}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/tedaviler" className="block mt-4 text-center text-xs font-medium" style={{ color: "#0E7C7B" }}>
                Tüm Tedavileri Gör →
              </Link>
            </div>

            <div style={{ backgroundColor: "#0D2137" }} className="rounded-2xl p-5 text-center">
              <div className="text-3xl mb-3">👨‍⚕️</div>
              <h3 className="text-white font-bold text-sm mb-2">Bu alanda uzman mısınız?</h3>
              <p className="text-gray-400 text-xs mb-4">Ücretsiz profil oluşturun, hastalara ulaşın.</p>
              <Link href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="block text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90">
                Hemen Kaydol →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
