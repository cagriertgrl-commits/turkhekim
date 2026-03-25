import Navbar from "@/components/Navbar";
import AramaKutusu from "@/components/AramaKutusu";
import MobilFiltre from "@/components/MobilFiltre";
import sql from "@/lib/db";
import Link from "next/link";
import { slugGorunum } from "@/lib/branslar";

const SEHIR_MAP = {
  istanbul: "İstanbul", ankara: "Ankara", izmir: "İzmir", bursa: "Bursa",
  antalya: "Antalya", adana: "Adana", konya: "Konya", gaziantep: "Gaziantep",
  mersin: "Mersin", kayseri: "Kayseri", trabzon: "Trabzon", diyarbakir: "Diyarbakır",
  samsun: "Samsun", eskisehir: "Eskişehir",
};

function sehirGorunum(slug) {
  return SEHIR_MAP[slug.toLowerCase()] || (slug.charAt(0).toUpperCase() + slug.slice(1));
}

function uzmanlikGorunum(slug) {
  return slugGorunum(slug.toLowerCase());
}

export async function generateMetadata({ params }) {
  const { sehir, uzmanlik } = await params;
  const sehirAd = sehirGorunum(sehir);
  const uzmanlikAd = uzmanlikGorunum(uzmanlik);
  const doktorSayisi = await sql`SELECT COUNT(*) as sayi FROM doktorlar WHERE onaylandi = true`.then(r => parseInt(r[0].sayi)).catch(() => 0);
  const sayi = doktorSayisi > 0 ? `${doktorSayisi}+` : "";
  return {
    title: `${sehirAd} ${uzmanlikAd}${sayi ? ` — ${sayi} Doktor` : ""} | DoktorPusula`,
    description: `${sehirAd} şehrinde ${sayi ? sayi + " " : ""}${uzmanlikAd} doktoru. Doğrulanmış yorumlar, şeffaf fiyatlar ve kolay randevu. DoktorPusula güvencesiyle.`,
    alternates: { canonical: `https://doktorpusula.com/${sehir}/${uzmanlik}` },
  };
}

function formatDeneyim(d) {
  if (!d) return d;
  const s = d.toString().trim();
  return /^\d+$/.test(s) ? `${s} yıl` : s;
}

function rozetHesapla(doktor) {
  const rozetler = [];
  if (doktor.onaylandi) rozetler.push({ ad: "✓ Doğrulanmış", renk: "var(--success)", bg: "#D1FAE5" });
  if (doktor.deneyim) rozetler.push({ ad: `⭐ ${formatDeneyim(doktor.deneyim)} Deneyim`, renk: "#2563EB", bg: "#DBEAFE" });
  if (doktor.online_randevu) rozetler.push({ ad: "💻 Online Randevu", renk: "var(--teal)", bg: "var(--light-teal)" });
  if (doktor.sigorta) rozetler.push({ ad: "🛡️ Sigorta", renk: "#7C3AED", bg: "#EDE9FE" });
  return rozetler;
}

export default async function DoktorListesi({ params, searchParams }) {
  const { sehir: sehirParam, uzmanlik: uzmanlikParam } = await params;
  const sp = await searchParams;
  const sehirAd = sehirGorunum(sehirParam);
  const uzmanlikAd = uzmanlikGorunum(uzmanlikParam);

  const onlineFiltreAktif = sp?.online === "1";
  const sigortaFiltreAktif = sp?.sigorta === "1";
  const GECERLI_SIRALAMA = ["puan", "yorum", "deneyim"];
  const siralamaPrm = GECERLI_SIRALAMA.includes(sp?.siralama) ? sp.siralama : "puan";

  // URL builder — tüm aktif parametreleri tutarlı şekilde birleştirir
  function buildUrl(params = {}) {
    const base = `/${sehirParam}/${uzmanlikParam}`;
    const merged = {
      siralama: siralamaPrm !== "puan" ? siralamaPrm : null,
      sigorta: sigortaFiltreAktif ? "1" : null,
      online: onlineFiltreAktif ? "1" : null,
      ...params,
    };
    const qs = Object.entries(merged).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join("&");
    return qs ? `${base}?${qs}` : base;
  }

  const sehirLike = "%" + sehirParam.toLowerCase() + "%";
  const uzmanlikLike = "%" + uzmanlikParam.toLowerCase() + "%";
  const tumTurkiye = sehirParam === "turkiye";
  const tumDoktor = uzmanlikParam === "doktor";

  // translate() Türkçe karakterleri normalize eder; neon v1'de sadece tagged template kullanılabilir
  let doktorlar;
  if (!tumDoktor && !tumTurkiye) {
    doktorlar = await sql`SELECT id, slug, ad, soyad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi, deneyim, hizmetler FROM doktorlar WHERE onaylandi = true AND (translate(LOWER(uzmanlik),'ğüşıöçâîûê ','gusiocaiue-') LIKE ${uzmanlikLike} OR translate(LOWER(COALESCE(hizmetler,'')),'ğüşıöçâîûê ','gusiocaiue-') LIKE ${uzmanlikLike}) AND translate(LOWER(sehir),'ğüşıöçâîûê ','gusiocaiue-') LIKE ${sehirLike} ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  } else if (!tumDoktor) {
    doktorlar = await sql`SELECT id, slug, ad, soyad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi, deneyim, hizmetler FROM doktorlar WHERE onaylandi = true AND (translate(LOWER(uzmanlik),'ğüşıöçâîûê ','gusiocaiue-') LIKE ${uzmanlikLike} OR translate(LOWER(COALESCE(hizmetler,'')),'ğüşıöçâîûê ','gusiocaiue-') LIKE ${uzmanlikLike}) ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  } else if (!tumTurkiye) {
    doktorlar = await sql`SELECT id, slug, ad, soyad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi, deneyim, hizmetler FROM doktorlar WHERE onaylandi = true AND translate(LOWER(sehir),'ğüşıöçâîûê ','gusiocaiue-') LIKE ${sehirLike} ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  } else {
    doktorlar = await sql`SELECT id, slug, ad, soyad, unvan, uzmanlik, sehir, ilce, foto_url, puan, yorum_sayisi, hakkinda, fiyat, online_randevu, sigorta, klinik_adi, adres_tipi, deneyim, hizmetler FROM doktorlar WHERE onaylandi = true ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST`;
  }

  if (onlineFiltreAktif) doktorlar = doktorlar.filter(d => d.online_randevu);
  if (sigortaFiltreAktif) doktorlar = doktorlar.filter(d => d.sigorta);

  // Post-sort: DB puan'a göre sıraladı; diğer seçenekler JS'te uygulanır
  if (siralamaPrm === "yorum") {
    doktorlar = [...doktorlar].sort((a, b) => (b.yorum_sayisi - a.yorum_sayisi) || (b.puan - a.puan));
  } else if (siralamaPrm === "deneyim") {
    doktorlar = [...doktorlar].sort((a, b) => (parseInt(b.deneyim) || 0) - (parseInt(a.deneyim) || 0));
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

          {/* SOL — Filtreler (sadece masaüstü) */}
          <div className="hidden md:block md:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-5 text-sm">Filtrele</h3>

              <div className="mb-5">
                <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Sıralama</p>
                <div className="space-y-1">
                  {[
                    { label: "En Yüksek Puan", val: "puan" },
                    { label: "En Fazla Yorum", val: "yorum" },
                    { label: "En Deneyimli", val: "deneyim" },
                  ].map((opt) => {
                    const aktif = siralamaPrm === opt.val;
                    return (
                      <Link
                        key={opt.val}
                        href={buildUrl({ siralama: opt.val !== "puan" ? opt.val : null })}
                        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${aktif ? "font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                        style={aktif ? { backgroundColor: "var(--light-teal)", color: "var(--teal)" } : {}}
                      >
                        <span className="text-xs opacity-60">{aktif ? "●" : "○"}</span>
                        {opt.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wide">Özellikler</p>
                <div className="space-y-1">
                  <Link
                    href={buildUrl({ sigorta: sigortaFiltreAktif ? null : "1" })}
                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${sigortaFiltreAktif ? "font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                    style={sigortaFiltreAktif ? { backgroundColor: "var(--light-teal)", color: "var(--teal)" } : {}}
                  >
                    🛡️ Sigorta Kabul Ediyor {sigortaFiltreAktif && "✓"}
                  </Link>
                  <Link
                    href={buildUrl({ online: onlineFiltreAktif ? null : "1" })}
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
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    {sehirGorunum(s)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ — Doktor Listesi */}
          <div className="md:col-span-3 space-y-4">
            {/* İstatistik Çubuğu */}
            {doktorlar.length > 0 && (() => {
              const onlineSayisi = doktorlar.filter(d => d.online_randevu).length;
              const puanlilar = doktorlar.filter(d => d.puan && d.yorum_sayisi > 0);
              const ortPuan = puanlilar.length > 0
                ? (puanlilar.reduce((s, d) => s + parseFloat(d.puan), 0) / puanlilar.length).toFixed(1)
                : null;
              return (
                <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex flex-wrap gap-4 text-sm">
                  <span className="text-gray-600">
                    <strong className="text-gray-900">{doktorlar.length}</strong> doktor
                  </span>
                  {onlineSayisi > 0 && (
                    <span className="text-gray-600">
                      <strong style={{ color: "var(--teal)" }}>{onlineSayisi}</strong> online randevu
                    </span>
                  )}
                  {ortPuan && (
                    <span className="text-gray-600">
                      ★ <strong className="text-gray-900">{ortPuan}</strong> ortalama puan
                    </span>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                <strong className="text-gray-700">{doktorlar.length}</strong> doktor listeleniyor
              </p>
              <MobilFiltre
                sehirParam={sehirParam}
                uzmanlikParam={uzmanlikParam}
                sigortaFiltreAktif={sigortaFiltreAktif}
                onlineFiltreAktif={onlineFiltreAktif}
                siralamaPrm={siralamaPrm}
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
                const tamIsim = [doktor.ad, doktor.soyad].filter(Boolean).join(" ");
                const initials = tamIsim.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
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
                              {doktor.unvan ? `${doktor.unvan} ${tamIsim}` : tamIsim}
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
