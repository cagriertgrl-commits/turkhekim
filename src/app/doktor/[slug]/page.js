import Navbar from "@/components/Navbar";
import YorumFormu from "@/components/YorumFormu";
import YorumListesi from "@/components/YorumListesi";
import RandevuFormu from "@/components/RandevuFormu";
import SoruFormu from "@/components/SoruFormu";
import BaglantiKopyala from "@/components/BaglantiKopyala";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doktorlar = await sql`SELECT ad, uzmanlik, sehir, unvan FROM doktorlar WHERE slug = ${slug}`;
  if (!doktorlar.length) return { title: "Doktor Bulunamadı" };
  const d = doktorlar[0];
  const tamIsim = [d.ad, d.soyad].filter(Boolean).join(" ");
  const unvanAd = d.unvan ? `${d.unvan} ${tamIsim}` : tamIsim;
  return {
    title: `${unvanAd} — ${d.uzmanlik} | DoktorPusula`,
    description: `${unvanAd} profilini inceleyin. ${d.sehir} şehrinde ${d.uzmanlik}. Doğrulanmış yorumlar ve online randevu.`,
    alternates: { canonical: `https://doktorpusula.com/doktor/${slug}` },
  };
}

function YildizBar({ puan, toplam }) {
  const yuzde = toplam > 0 ? Math.round((puan / toplam) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 w-4">{puan}★</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div style={{ width: `${yuzde}%`, backgroundColor: "var(--gold)" }} className="h-full rounded-full" />
      </div>
      <span className="text-gray-400 w-4">{puan}</span>
    </div>
  );
}

const TIP_ETIKET = {
  makale: { etiket: "📄 Makale", renk: "#1E40AF", bg: "#EFF6FF" },
  haber: { etiket: "📰 Haber", renk: "#065F46", bg: "#ECFDF5" },
  dergi: { etiket: "📖 Dergi", renk: "#7C3AED", bg: "#F5F3FF" },
  kitap: { etiket: "📚 Kitap", renk: "#92400E", bg: "#FFFBEB" },
  video: { etiket: "🎥 Video", renk: "#DC2626", bg: "#FFF1F2" },
  sosyal: { etiket: "🔗 Sosyal Medya", renk: "#0369A1", bg: "#F0F9FF" },
};

function slugify(s = "") {
  return s.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
}

export default async function DoktorProfil({ params }) {
  const { slug } = await params;

  const [doktorlar, session] = await Promise.all([
    sql`SELECT * FROM doktorlar WHERE slug = ${slug}`,
    getSession(),
  ]);
  if (!doktorlar.length) notFound();
  const doktor = doktorlar[0];
  const kendiProfili = session?.id === doktor.id;

  const [yorumlar, sorular, medya] = await Promise.all([
    sql`SELECT * FROM yorumlar WHERE doktor_id = ${doktor.id} AND dogrulama_durumu = 'onaylandi' ORDER BY created_at DESC`,
    sql`SELECT * FROM sorular WHERE doktor_id = ${doktor.id} AND yanit IS NOT NULL AND gizli = false ORDER BY created_at DESC LIMIT 10`,
    sql`SELECT * FROM doktor_medya WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC`,
  ]);

  sql`UPDATE doktorlar SET profil_goruntulenme = COALESCE(profil_goruntulenme,0)+1 WHERE id=${doktor.id}`.catch(()=>{});

  const tamIsim = [doktor.ad, doktor.soyad].filter(Boolean).join(" ");
  const initials = (tamIsim.split(" ").map(n => n[0]).join("").slice(0, 2) || "DR").toUpperCase();
  const unvanAd = doktor.unvan ? `${doktor.unvan} ${tamIsim}` : tamIsim;
  const sehirSlug = slugify(doktor.sehir || "istanbul");
  const uzmanlikSlug = slugify(doktor.uzmanlik || "doktor");

  const sigortalar = (doktor.sigorta || "").split(",").map(s => s.trim()).filter(Boolean);
  const hizmetler = (doktor.hizmetler || "").split("\n").map(s => s.trim()).filter(Boolean);
  const diller = (doktor.diller || "").split(",").map(s => s.trim()).filter(Boolean);

  // Profil teması
  const tema = doktor.tema || "varsayilan";
  const temaStiller = {
    beyaz: { background: "#FFFFFF" },
    varsayilan: { background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" },
    turkuaz: { background: "linear-gradient(135deg, #0E7C7B 0%, #06B6D4 100%)" },
    koyu: { background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)" },
    mor: { background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" },
    pembe: { background: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)" },
  };
  const heroStyle = temaStiller[tema] || temaStiller.varsayilan;

  const adresTipEtiket = {
    muayenehane: "🏠 Muayenehane",
    klinik: "🏥 Klinik",
    hastane: "🏨 Hastane",
    tip_merkezi: "🏢 Tıp Merkezi",
  }[doktor.adres_tipi || "muayenehane"];

  // WhatsApp mesajı
  const whatsappMesaj = encodeURIComponent(
    `Merhaba ${unvanAd},\n\nDoktorPusula üzerinden profilinizi inceledim ve randevu almak istiyorum.\n\nAd Soyad: \nŞikayet: \nTercih Edilen Tarih: \n\nTeşekkürler.`
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Physician",
        "name": unvanAd, "medicalSpecialty": doktor.uzmanlik,
        "address": { "@type": "PostalAddress", "addressLocality": doktor.sehir, "addressCountry": "TR" },
        "url": doktor.website || undefined,
        "aggregateRating": doktor.yorum_sayisi > 0 ? { "@type": "AggregateRating", "ratingValue": doktor.puan, "reviewCount": doktor.yorum_sayisi } : undefined,
      }) }} />

      {/* HERO */}
      <div style={heroStyle} className="px-6 pt-10 pb-10 relative">
        {tema === "desen" && doktor.arka_plan_foto_url && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${doktor.arka_plan_foto_url})`, backgroundRepeat: "repeat", backgroundSize: "160px 160px", opacity: 0.07, pointerEvents: "none" }} />
        )}
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href={`/${sehirSlug}/${uzmanlikSlug}`} className="hover:text-white">{doktor.uzmanlik}</Link>
            <span>/</span>
            <span className="text-gray-300">{unvanAd}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              {doktor.foto_url ? (
                <img src={doktor.foto_url} alt={unvanAd} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 shadow-xl" style={{ borderColor: "var(--teal)" }} />
              ) : (
                <div style={{ backgroundColor: "var(--teal)" }} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center font-bold text-4xl text-white shadow-xl">
                  {initials}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {doktor.onaylandi && <span style={{ backgroundColor: "var(--success)" }} className="text-white text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">✓ Doğrulanmış Doktor</span>}
                {doktor.deneyim && <span style={{ backgroundColor: "#1E40AF" }} className="text-white text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">⭐ {/^\d+$/.test(doktor.deneyim.toString().trim()) ? `${doktor.deneyim} yıl` : doktor.deneyim} Deneyim</span>}
                {doktor.online_randevu && <span style={{ backgroundColor: "var(--success)" }} className="text-white text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">🎥 Online Randevu</span>}
              </div>

              <h1 className="text-white text-2xl md:text-4xl font-bold mb-1">{unvanAd}</h1>
              <p style={{ color: "#4DD9D8" }} className="text-lg font-medium mb-1">{doktor.uzmanlik}</p>

              <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                <span>📍 {doktor.sehir}{doktor.ilce ? `, ${doktor.ilce}` : ""}</span>
                {doktor.klinik_adi && <span>🏥 {doktor.klinik_adi}</span>}
                {diller.length > 0 && <span>🌐 {diller.join(", ")}</span>}
              </div>

              <div className="flex flex-wrap gap-3">
                {doktor.yorum_sayisi > 0 && (
                  <div style={{ backgroundColor: "#ffffff15", borderColor: "#ffffff20" }} className="border rounded-xl px-4 py-2">
                    <span className="text-yellow-400 text-xl font-bold">★ {doktor.puan}</span>
                    <span className="text-gray-400 text-sm ml-1">({doktor.yorum_sayisi} yorum)</span>
                  </div>
                )}
                {doktor.fiyat && (
                  <div style={{ backgroundColor: "#ffffff15", borderColor: "#ffffff20" }} className="border rounded-xl px-4 py-2 text-center">
                    <div style={{ color: "var(--gold)" }} className="font-bold text-sm">{doktor.fiyat}</div>
                    <div className="text-gray-400 text-xs">Muayene</div>
                  </div>
                )}
                {doktor.website && (
                  <a href={doktor.website} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#ffffff15", borderColor: "#ffffff20" }} className="border rounded-xl px-4 py-2 text-center hover:opacity-80">
                    <div className="text-white text-sm font-medium">🌐 Web Sitesi</div>
                  </a>
                )}
                {doktor.whatsapp && (
                  <a href={`https://wa.me/${doktor.whatsapp}?text=${whatsappMesaj}`} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#25D366", borderColor: "#25D366" }} className="border rounded-xl px-4 py-2 text-center hover:opacity-80">
                    <div className="text-white text-sm font-bold">💬 WhatsApp</div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İÇERİK */}
      <div className="max-w-6xl mx-auto px-6 mt-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">

          {/* SIDEBAR */}
          <div className="md:col-span-1 space-y-4 md:order-2">
            {kendiProfili ? (
              <div style={{ backgroundColor: "#F0FDF4", borderColor: "#86EFAC" }} className="border rounded-2xl p-5">
                <p className="font-bold text-green-800 mb-1 text-sm">👋 Kendi profilindesiniz</p>
                <p className="text-xs text-green-700 mb-3">Yorum yapma, soru sorma ve randevu butonları sadece hastalar için görünür.</p>
                <Link href="/panel" style={{ backgroundColor: "#0D2137" }} className="block text-center text-white text-xs py-2 rounded-xl font-semibold hover:opacity-90">
                  Panele Git →
                </Link>
              </div>
            ) : (
              <RandevuFormu doktorId={doktor.id} doktorAd={unvanAd} onlineRandevu={doktor.online_randevu} />
            )}

            {/* Çalışma Saatleri */}
            {doktor.calisma_saatleri && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">🕐 Çalışma Saatleri</h3>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">{doktor.calisma_saatleri}</pre>
              </div>
            )}

            {/* Harita */}
            {doktor.enlem && doktor.boylam && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">📍 Konum</h3>
                <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB" }}>
                  <iframe
                    title="Konum"
                    width="100%"
                    height="200"
                    style={{ display: "block" }}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${doktor.boylam - 0.01},${doktor.enlem - 0.01},${parseFloat(doktor.boylam) + 0.01},${parseFloat(doktor.enlem) + 0.01}&layer=mapnik&marker=${doktor.enlem},${doktor.boylam}`}
                  />
                </div>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${doktor.enlem}&mlon=${doktor.boylam}#map=16/${doktor.enlem}/${doktor.boylam}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: "#0E7C7B" }}
                  className="text-xs font-semibold mt-2 inline-block hover:underline"
                >
                  Haritada Aç →
                </a>
              </div>
            )}

            {/* Paylaş */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Profili Paylaş</h3>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${unvanAd} - DoktorPusula\nhttps://doktorpusula.com/doktor/${slug}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ backgroundColor: "#25D366" }}
                  className="flex-1 text-center text-xs py-2 rounded-xl font-semibold text-white hover:opacity-80"
                >
                  WhatsApp
                </a>
                <BaglantiKopyala url={`https://doktorpusula.com/doktor/${slug}`} />
              </div>
            </div>
          </div>

          {/* ANA İÇERİK */}
          <div className="md:col-span-2 space-y-5 md:order-1">

            {/* Hakkında */}
            {doktor.hakkinda && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-3">👨‍⚕️ Hakkında</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{doktor.hakkinda}</p>
              </div>
            )}

            {/* Eğitim */}
            {doktor.egitim && Object.keys(doktor.egitim).length > 0 && (() => {
              const eg = doktor.egitim;
              const satirlar = [];
              if (eg.lise?.goster && eg.lise?.okul) satirlar.push({ ikon: "🏫", baslik: "Lise", deger: `${eg.lise.okul}${eg.lise.sehir ? ` — ${eg.lise.sehir}` : ""}${eg.lise.yil ? ` (${eg.lise.yil})` : ""}` });
              if (eg.universite?.goster && eg.universite?.universite) satirlar.push({ ikon: "🎓", baslik: "Tıp Fakültesi", deger: `${eg.universite.universite}${eg.universite.fakulte ? ` / ${eg.universite.fakulte}` : ""}${eg.universite.yil ? ` (${eg.universite.yil})` : ""}` });
              if (eg.uzmanlik?.goster && eg.uzmanlik?.dal) satirlar.push({ ikon: "⭐", baslik: "Uzmanlık", deger: `${eg.uzmanlik.dal}${eg.uzmanlik.kurum ? ` — ${eg.uzmanlik.kurum}` : ""}${eg.uzmanlik.yil ? ` (${eg.uzmanlik.yil})` : ""}` });
              if (eg.yan_dal?.length) eg.yan_dal.filter(y => y.goster && y.dal).forEach(y => satirlar.push({ ikon: "🔬", baslik: "Yan Dal", deger: `${y.dal}${y.kurum ? ` — ${y.kurum}` : ""}${y.yil ? ` (${y.yil})` : ""}` }));
              if (!satirlar.length) return null;
              return (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="font-bold text-gray-900 text-lg mb-4">🎓 Eğitim</h2>
                  <div className="space-y-3">
                    {satirlar.map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-lg">{s.ikon}</span>
                        <div>
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{s.baslik}</p>
                          <p className="text-sm text-gray-700">{s.deger}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Hizmetler */}
            {hizmetler.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-4">🩺 Hizmetler & İşlemler</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hizmetler.map((h, i) => (
                    <div key={i} style={{ backgroundColor: "#F0FDFA", borderColor: "#CCFBF1" }} className="border rounded-xl px-3 py-2 text-sm text-gray-700 flex items-center gap-2">
                      <span style={{ color: "var(--teal)" }}>✓</span> {h}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Klinik & Sigorta Bilgileri */}
            {(doktor.sigorta || doktor.adres || doktor.klinik_adi) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-4">🏥 {doktor.klinik_adi || adresTipEtiket} Bilgileri</h2>
                <div className="space-y-4">
                  {doktor.klinik_adi && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🏥</span>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{adresTipEtiket}</p>
                        <p className="text-sm font-semibold text-gray-800">{doktor.klinik_adi}</p>
                        {doktor.calisan_sayisi && <p className="text-xs text-gray-400 mt-0.5">{doktor.calisan_sayisi} personel</p>}
                      </div>
                    </div>
                  )}
                  {doktor.adres && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📍</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Adres</p>
                        <p className="text-sm text-gray-700">{doktor.adres}</p>
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(doktor.adres)}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)" }} className="text-xs hover:underline mt-1 inline-block">
                          📌 Haritada Gör →
                        </a>
                        {/* Harita embed */}
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                          <iframe
                            src={
                              doktor.enlem && doktor.boylam
                                ? `https://maps.google.com/maps?q=${doktor.enlem},${doktor.boylam}&output=embed&z=16`
                                : `https://maps.google.com/maps?q=${encodeURIComponent(doktor.adres)}&output=embed&z=15`
                            }
                            width="100%"
                            height="220"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Konum haritası"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {diller.length > 0 && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🌐</span>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Hizmet Dilleri</p>
                        <div className="flex flex-wrap gap-1.5">
                          {diller.map((d) => (
                            <span key={d} style={{ backgroundColor: "#EFF6FF", color: "#1E40AF" }} className="text-xs px-2 py-1 rounded-full font-medium">{d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {sigortalar.length > 0 && (
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🛡️</span>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Kabul Edilen Sigortalar</p>
                        <div className="flex flex-wrap gap-1.5">
                          {sigortalar.map((s) => (
                            <span key={s} style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="text-xs px-2 py-1 rounded-full font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tanıtım Videosu */}
            {doktor.tanitim_video && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-4">🎥 Tanıtım Videosu</h2>
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    src={doktor.tanitim_video}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Tanıtım videosu"
                  />
                </div>
              </div>
            )}

            {/* Medya & Yayınlar */}
            {medya.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 text-lg mb-4">📰 Yayınlar & Medyada</h2>
                <div className="space-y-3">
                  {medya.map((m) => {
                    const tip = TIP_ETIKET[m.tip] || TIP_ETIKET.makale;
                    return (
                      <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                        <span style={{ backgroundColor: tip.bg, color: tip.renk }} className="text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0 mt-0.5">
                          {tip.etiket}
                        </span>
                        <div className="flex-1">
                          {m.url ? (
                            <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--navy)" }} className="font-semibold text-sm hover:underline">
                              {m.baslik}
                            </a>
                          ) : (
                            <p style={{ color: "var(--navy)" }} className="font-semibold text-sm">{m.baslik}</p>
                          )}
                          {m.aciklama && <p className="text-gray-400 text-xs mt-0.5">{m.aciklama}</p>}
                          {m.yayin_tarihi && <p className="text-gray-300 text-xs mt-0.5">{new Date(m.yayin_tarihi).toLocaleDateString("tr-TR")}</p>}
                        </div>
                        {m.url && (
                          <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)" }} className="text-xs hover:underline flex-shrink-0">
                            →
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Yorumlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900 text-lg">⭐ Hasta Yorumları</h2>
                {doktor.yorum_sayisi > 0 && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-yellow-400 text-2xl font-bold">{doktor.puan}</span>
                      <span className="text-gray-400 text-sm">/ 5</span>
                    </div>
                    <div className="flex mt-1 justify-end">
                      {[1,2,3,4,5].map(y => <span key={y} className={parseFloat(doktor.puan) >= y ? "text-yellow-400" : "text-gray-200"}>★</span>)}
                    </div>
                    <p className="text-xs text-gray-400">{doktor.yorum_sayisi} değerlendirme</p>
                  </div>
                )}
              </div>

              {doktor.yorum_sayisi > 0 && (
                <div className="mb-6 space-y-1.5 p-4 rounded-xl" style={{ backgroundColor: "#F5F7FA" }}>
                  {[5,4,3,2,1].map(p => <YildizBar key={p} puan={p} toplam={yorumlar.filter(y => y.puan === p).length} />)}
                </div>
              )}

              <div style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }} className="border rounded-xl p-3 mb-5">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Tüm yorumlar doğrulama sürecinden geçer ve moderasyonla yayınlanır.
                </p>
              </div>

              <YorumListesi yorumlar={yorumlar} />
            </div>

            {!kendiProfili && <YorumFormu doktorId={doktor.id} />}
            {!kendiProfili && <SoruFormu doktorId={doktor.id} sorular={sorular} />}

          </div>
        </div>
      </div>
    </div>
  );
}
