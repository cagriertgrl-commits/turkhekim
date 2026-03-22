import Navbar from "@/components/Navbar";
import AramaKutusu from "@/components/AramaKutusu";
import MobilFiltre from "@/components/MobilFiltre";
import sql from "@/lib/db";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { sehir, uzmanlik } = await params;
  const sehirAd = sehir.charAt(0).toUpperCase() + sehir.slice(1);
  const uzmanlikAd = uzmanlik.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${sehirAd} ${uzmanlikAd} — En İyi Doktorlar | DoktorPusula`,
    description: `${sehirAd} şehrindeki en iyi ${uzmanlikAd} doktorlarını inceleyin. Doğrulanmış yorumlar ve kolay randevu. DoktorPusula güvencesiyle.`,
    alternates: { canonical: `https://doktorpusula.com/${sehir}/${uzmanlik}` },
  };
}

function rozetHesapla(doktor) {
  const rozetler = [];
  if (doktor.onaylandi) rozetler.push({ ad: "✓ Doğrulanmış", renk: "var(--success)", bg: "#D1FAE5" });
  if (doktor.deneyim) rozetler.push({ ad: `⭐ ${doktor.deneyim} Deneyim`, renk: "#2563EB", bg: "#DBEAFE" });
  if (doktor.online_randevu) rozetler.push({ ad: "💻 Online Randevu", renk: "var(--teal)", bg: "var(--light-teal)" });
  if (doktor.sigorta) rozetler.push({ ad: "🛡️ Sigorta", renk: "#7C3AED", bg: "#EDE9FE" });
  return rozetler;
}

export default async function DoktorListesi({ params, searchParams }) {
  const { sehir: sehirParam, uzmanlik: uzmanlikParam } = await params;
  const sp = await searchParams;
  const sehirAd = sehirParam.charAt(0).toUpperCase() + sehirParam.slice(1);
  const uzmanlikAd = uzmanlikParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const onlineFiltreAktif = sp?.online === "1";
  const sigortaFiltreAktif = sp?.sigorta === "1";

  // Türkçe karakterleri slug formatına çevirerek karşılaştır
  const TR = "ğüşıöçâîûê ";
  const EN = "gusiocaiue-";
  const sehirLike = "%" + sehirParam.toLowerCase() + "%";
  const uzmanlikLike = "%" + uzmanlikParam.toLowerCase() + "%";
  const tumTurkiye = sehirParam === "turkiye"; // şehir filtresi yok
  const tumDoktor = uzmanlikParam === "doktor"; // uzmanlık filtresi yok

  let doktorlar;
  if (onlineFiltreAktif && sigortaFiltreAktif) {
    if (tumTurkiye && tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE onaylandi = true AND online_randevu = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumTurkiye)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true AND online_randevu = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND onaylandi = true AND online_randevu = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true AND online_randevu = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  } else if (onlineFiltreAktif) {
    if (tumTurkiye && tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE onaylandi = true AND online_randevu = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumTurkiye)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true AND online_randevu = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND onaylandi = true AND online_randevu = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true AND online_randevu = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  } else if (sigortaFiltreAktif) {
    if (tumTurkiye && tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE onaylandi = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumTurkiye)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND onaylandi = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true AND sigorta IS NOT NULL AND sigorta != '' ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  } else {
    if (tumTurkiye && tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE onaylandi = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumTurkiye)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else if (tumDoktor)
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND onaylandi = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
    else
      doktorlar = await sql`SELECT id, slug, ad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi FROM doktorlar WHERE translate(LOWER(sehir),${TR},${EN}) LIKE ${sehirLike} AND translate(LOWER(uzmanlik),${TR},${EN}) LIKE ${uzmanlikLike} AND onaylandi = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Doktor Bul" />

      {/* BAŞLIK */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }} className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-300">{sehirAd}</span>
            <span className="mx-2">›</span>
            <span className="text-white">{uzmanlikAd}</span>
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
            {sehirAd} {uzmanlikAd}
            <span style={{ color: "#4DD9D8" }} className="text-lg font-normal ml-3">
              {doktorlar.length} doktor
            </span>
          </h1>
          <AramaKutusu />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">

          {/* SOL — Filtreler */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-5 text-sm">Filtrele</h3>

              <div className="mb-5">
                <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Sıralama</p>
                <div className="space-y-2">
                  {["En Yüksek Puan", "En Fazla Yorum", "En Deneyimli"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="siralama" className="accent-teal-600" defaultChecked={opt === "En Yüksek Puan"} />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Müsaitlik</p>
                <div className="space-y-2">
                  {["Tümü", "Bu Hafta Müsait"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="musait" className="accent-teal-600" defaultChecked={opt === "Tümü"} />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wide">Özellikler</p>
                <div className="space-y-1">
                  <Link
                    href={sigortaFiltreAktif ? `/${sehirParam}/${uzmanlikParam}${onlineFiltreAktif ? "?online=1" : ""}` : `/${sehirParam}/${uzmanlikParam}?sigorta=1${onlineFiltreAktif ? "&online=1" : ""}`}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${sigortaFiltreAktif ? "font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                    style={sigortaFiltreAktif ? { backgroundColor: "var(--light-teal)", color: "var(--teal)" } : {}}
                  >
                    🛡️ Sigorta Kabul Ediyor {sigortaFiltreAktif && "✓"}
                  </Link>
                  <Link
                    href={onlineFiltreAktif ? `/${sehirParam}/${uzmanlikParam}${sigortaFiltreAktif ? "?sigorta=1" : ""}` : `/${sehirParam}/${uzmanlikParam}?online=1${sigortaFiltreAktif ? "&sigorta=1" : ""}`}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${onlineFiltreAktif ? "font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                    style={onlineFiltreAktif ? { backgroundColor: "var(--light-teal)", color: "var(--teal)" } : {}}
                  >
                    💻 Online Randevu {onlineFiltreAktif && "✓"}
                  </Link>
                </div>
              </div>
            </div>

            {/* Popüler Şehirler */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Diğer Şehirler</h3>
              <div className="flex flex-wrap gap-2">
                {["istanbul", "ankara", "izmir", "bursa", "antalya"].map((s) => (
                  <Link
                    key={s}
                    href={`/${s}/${uzmanlikParam}`}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors capitalize"
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ — Doktor Listesi */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-700">{doktorlar.length}</strong> doktor listeleniyor
              </p>
              <MobilFiltre
                sehirParam={sehirParam}
                uzmanlikParam={uzmanlikParam}
                sigortaFiltreAktif={sigortaFiltreAktif}
                onlineFiltreAktif={onlineFiltreAktif}
                doktorSayisi={doktorlar.length}
              />
            </div>

            {doktorlar.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-gray-700 font-bold text-lg mb-2">Sonuç Bulunamadı</h3>
                <p className="text-gray-400 text-sm mb-6">
                  {sehirAd} şehrinde onaylı {uzmanlikAd} doktoru henüz yok.
                </p>
                <Link
                  href="/"
                  style={{ backgroundColor: "var(--teal)" }}
                  className="inline-block text-white px-6 py-2 rounded-xl text-sm font-medium hover:opacity-90"
                >
                  Yeni Arama Yap
                </Link>
              </div>
            ) : (
              doktorlar.map((doktor) => {
                const initials = doktor.ad.split(" ").slice(1).map((n) => n[0]).join("").slice(0, 2);
                const rozetler = rozetHesapla(doktor);
                return (
                  <div key={doktor.slug} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 group">
                    <div className="flex items-start gap-4">

                      {/* Fotoğraf */}
                      {doktor.foto_url ? (
                        <img
                          src={doktor.foto_url}
                          alt={doktor.ad}
                          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border-2 border-gray-100"
                        />
                      ) : (
                        <div
                          style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }}
                          className="w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
                        >
                          {initials}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div>
                            <h2 className="font-bold text-gray-900 text-lg group-hover:text-teal-700 transition-colors">
                              {doktor.ad}
                            </h2>
                            <p style={{ color: "var(--teal)" }} className="text-sm font-semibold">{doktor.uzmanlik}</p>
                            <p className="text-gray-500 text-sm mt-0.5">
                              📍 {doktor.sehir}{doktor.ilce ? ` · ${doktor.ilce}` : ""}
                            </p>

                            {/* Puan */}
                            <div className="flex items-center gap-2 mt-2">
                              {doktor.yorum_sayisi > 0 ? (
                                <>
                                  <div className="flex">
                                    {[1,2,3,4,5].map((y) => (
                                      <span key={y} className={`text-sm ${y <= Math.round(doktor.puan) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                                    ))}
                                  </div>
                                  <span className="font-bold text-sm text-gray-900">{doktor.puan}</span>
                                  <span className="text-gray-500 text-xs">({doktor.yorum_sayisi} yorum)</span>
                                </>
                              ) : (
                                <span className="text-gray-400 text-xs">Henüz yorum yok</span>
                              )}
                            </div>

                            {/* Rozetler */}
                            {rozetler.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
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
                          </div>

                          {/* Sağ taraf */}
                          <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                            {doktor.fiyat && (
                              <span className="text-gray-500 text-sm">
                                Muayene: <strong className="text-gray-900">{doktor.fiyat}</strong>
                              </span>
                            )}
                            {doktor.musait ? (
                              <span style={{ backgroundColor: "#D1FAE5", color: "var(--success)" }} className="text-xs px-3 py-1 rounded-full font-semibold">
                                ● Bu hafta müsait
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-400 text-xs px-3 py-1 rounded-full">
                                Müsaitlik belirtilmedi
                              </span>
                            )}
                            <Link
                              href={`/doktor/${doktor.slug}`}
                              style={{ backgroundColor: "var(--navy)" }}
                              className="text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity mt-1"
                            >
                              Profili İncele →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
