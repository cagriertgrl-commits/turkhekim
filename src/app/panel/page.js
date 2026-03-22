import { getSession } from "@/lib/session";


import { redirect } from "next/navigation";
import sql from "@/lib/db";
import FotoYukle from "@/components/FotoYukle";
import SifreDegistir from "@/components/SifreDegistir";
import RandevuPanel from "@/components/RandevuPanel";
import SoruPanel from "@/components/SoruPanel";
import AIAsistan from "@/components/AIAsistan";
import MedyaPanel from "@/components/MedyaPanel";
import BildirimZili from "@/components/BildirimZili";
import YorumDogrulamaPanel from "@/components/YorumDogrulamaPanel";
import KlinikFotoYukle from "@/components/KlinikFotoYukle";
import SigortaSecici from "@/components/SigortaSecici";
import HizmetSecici from "@/components/HizmetSecici";
import HastalarPanel from "@/components/HastalarPanel";
import PanelDilSecici from "@/components/PanelDilSecici";
import CikisButonu from "@/components/CikisButonu";
import WhatsappInput from "@/components/WhatsappInput";
import TemaSecici from "@/components/TemaSecici";

const ADRES_TIPLERI = [
  { deger: "muayenehane", etiket: "🏠 Muayenehane" },
  { deger: "klinik", etiket: "🏥 Klinik" },
  { deger: "hastane", etiket: "🏨 Hastane" },
  { deger: "tip_merkezi", etiket: "🏢 Tıp Merkezi" },
];


export default async function Panel() {
  const session = await getSession();
  if (!session) redirect("/giris");

  const doktorlar = await sql`SELECT * FROM doktorlar WHERE id = ${session.id} LIMIT 1`;
  const doktor = doktorlar[0];

  const [yorumlar, sorular, analitkler, medyaListesi, dogrulamalar, gorusmeler] = await Promise.all([
    sql`SELECT * FROM yorumlar WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC`,
    sql`SELECT * FROM sorular WHERE doktor_id = ${doktor.id} ORDER BY yanit NULLS FIRST, created_at DESC`,
    sql`
      SELECT
        (SELECT COUNT(*) FROM randevular WHERE doktor_id = ${doktor.id} AND created_at >= date_trunc('month', NOW())) as bu_ay_randevu,
        (SELECT COUNT(*) FROM randevular WHERE doktor_id = ${doktor.id} AND durum = 'bekliyor') as bekleyen_randevu,
        (SELECT COUNT(*) FROM yorumlar WHERE doktor_id = ${doktor.id} AND created_at >= date_trunc('month', NOW())) as bu_ay_yorum,
        (SELECT COALESCE(profil_goruntulenme, 0) FROM doktorlar WHERE id = ${doktor.id}) as profil_goruntulenme
    `,
    sql`SELECT * FROM doktor_medya WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC`,
    sql`SELECT * FROM yorum_dogrulama WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC LIMIT 20`,
    ["pro", "kurumsal"].includes(doktor.paket)
      ? sql`SELECT * FROM gorusme_ozetleri WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC`.catch(() => [])
      : Promise.resolve([]),
  ]);
  const analitik = analitkler[0];



  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
              <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
              <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            </svg>
            <span className="text-white font-bold text-lg">Doktor<span style={{ color: "#C9A84C" }}>Pusula</span></span>
          </a>
          <div className="flex items-center gap-3">
            <BildirimZili />
            {["pro", "kurumsal"].includes(doktor.paket) && (
              <a href="/gorusme-ozet" style={{ backgroundColor: "#7C3AED" }} className="text-white text-xs px-3 py-1.5 rounded-lg hover:opacity-90 hidden md:flex items-center gap-1.5">
                🎙️ Görüşme Özetle
              </a>
            )}
            <span className="text-gray-300 text-sm hidden md:block">{doktor.ad}</span>
            <a href={`/doktor/${doktor.slug}`} style={{ borderColor: "#0E7C7B", color: "#4DD9D8" }} className="border text-xs px-3 py-1.5 rounded-lg hover:opacity-80 hidden md:block">
              Profilimi Gör
            </a>
            <CikisButonu />
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="mb-6">
          <h1 style={{ color: "#0D2137" }} className="text-2xl font-bold">
            Hoş geldiniz, {doktor.ad.split(" ").slice(1).join(" ") || doktor.ad} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">Doktor panelinize genel bakış</p>
        </div>

        {/* ÖZET KARTLAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { baslik: "Ortalama Puan", deger: doktor.puan || "—", icon: "⭐", renk: "#D97706", bg: "#FFFBEB" },
            { baslik: "Toplam Yorum", deger: yorumlar.length, icon: "💬", renk: "#0E7C7B", bg: "#F0FDFA" },
            { baslik: "Profil Durumu", deger: doktor.onaylandi ? "Yayında" : "İncelemede", icon: doktor.onaylandi ? "✅" : "⏳", renk: doktor.onaylandi ? "#059669" : "#D97706", bg: doktor.onaylandi ? "#F0FDF4" : "#FFFBEB" },
            { baslik: "Bekleyen Randevu", deger: Number(analitik.bekleyen_randevu) || 0, icon: "📅", renk: Number(analitik.bekleyen_randevu) > 0 ? "#DC2626" : "#6B7280", bg: Number(analitik.bekleyen_randevu) > 0 ? "#FFF1F2" : "#F5F7FA" },
          ].map((kart) => (
            <div key={kart.baslik} style={{ backgroundColor: kart.bg }} className="rounded-2xl p-5 border border-gray-100">
              <span className="text-2xl">{kart.icon}</span>
              <p style={{ color: kart.renk }} className="text-xl font-bold mt-3">{kart.deger}</p>
              <p className="text-gray-500 text-xs mt-1">{kart.baslik}</p>
            </div>
          ))}
        </div>

        {/* ANALİTİK */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { baslik: "Bu Ay Randevu", deger: Number(analitik.bu_ay_randevu) || 0, icon: "📊", renk: "#0D2137", bg: "#EFF6FF" },
            { baslik: "Bu Ay Yorum", deger: Number(analitik.bu_ay_yorum) || 0, icon: "💬", renk: "#7C3AED", bg: "#F5F3FF" },
            { baslik: "Profil Görüntülenme", deger: Number(analitik.profil_goruntulenme) || 0, icon: "👁️", renk: "#059669", bg: "#F0FDF4" },
          ].map((kart) => (
            <div key={kart.baslik} style={{ backgroundColor: kart.bg }} className="rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{kart.icon}</span>
              </div>
              <p style={{ color: kart.renk }} className="text-2xl font-bold">{kart.deger.toLocaleString("tr-TR")}</p>
              <p className="text-gray-500 text-xs mt-1">{kart.baslik}</p>
            </div>
          ))}
        </div>

        {/* PROFİL TAMAMLAMA */}
        {(() => {
          const alanlar = [
            { ad: "Fotoğraf", tamam: !!doktor.foto_url },
            { ad: "Hakkında", tamam: !!doktor.hakkinda },
            { ad: "Muayene Ücreti", tamam: !!doktor.fiyat },
            { ad: "Adres", tamam: !!doktor.adres },
            { ad: "WhatsApp", tamam: !!doktor.whatsapp },
            { ad: "Web Sitesi", tamam: !!doktor.website },
            { ad: "Hizmetler", tamam: !!doktor.hizmetler },
            { ad: "Dil Bilgisi", tamam: !!doktor.diller },
          ];
          const tamamlanan = alanlar.filter((a) => a.tamam).length;
          const yuzde = Math.round((tamamlanan / alanlar.length) * 100);
          const renk = yuzde === 100 ? "#059669" : yuzde >= 60 ? "#0E7C7B" : "#D97706";
          if (yuzde === 100) return null;
          return (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ color: "#0D2137" }} className="font-bold text-sm">Profil Tamamlama</h3>
                <span style={{ color: renk }} className="font-bold text-sm">%{yuzde}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div style={{ width: `${yuzde}%`, backgroundColor: renk }} className="h-full rounded-full transition-all" />
              </div>
              <div className="flex flex-wrap gap-2">
                {alanlar.filter((a) => !a.tamam).map((a) => (
                  <span key={a.ad} className="text-xs px-2 py-1 rounded-full border border-dashed border-gray-300 text-gray-400">✗ {a.ad}</span>
                ))}
              </div>
            </div>
          );
        })()}

        <div className="grid md:grid-cols-3 gap-6">

          {/* SOL KOLON */}
          <div className="space-y-4">

            {/* Profil Bilgileri */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Profilim</h2>
              <FotoYukle fotoUrl={doktor.foto_url} initials={doktor.ad?.split(" ").slice(1).map(n => n[0]).join("").slice(0,2) || "DR"} />
              <div className="space-y-2 text-sm mt-3">
                {[
                  ["Ad", doktor.ad],
                  ["Unvan", doktor.unvan],
                  ["Uzmanlık", doktor.uzmanlik],
                  ["Şehir", doktor.sehir],
                  ["Deneyim", doktor.deneyim],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-gray-900 text-right">{v}</span>
                  </div>
                ))}
              </div>
              <a href={`/doktor/${doktor.slug}`} style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }} className="block mt-4 border text-center py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
                Profilimi Gör →
              </a>
            </div>

            {/* Profil Düzenle */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Profil Düzenle</h2>
              <form action="/api/profil-guncelle" method="POST" className="space-y-3">

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Unvan</label>
                  <select name="unvan" defaultValue={doktor.unvan || ""} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    <option value="">Seçiniz</option>
                    <option value="Pratisyen Dr.">Pratisyen Dr.</option>
                    <option value="Uzm. Dr.">Uzm. Dr. — Uzman Doktor</option>
                    <option value="Asst. Dr.">Asst. Dr. — Asistan Doktor</option>
                    <option value="Doç. Dr.">Doç. Dr. — Doçent</option>
                    <option value="Prof. Dr.">Prof. Dr. — Profesör</option>
                    <option value="Op. Dr.">Op. Dr. — Operatör Doktor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Hakkında</label>
                  <textarea name="hakkinda" defaultValue={doktor.hakkinda || ""} rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none" />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Muayene Ücreti</label>
                  <input name="fiyat" defaultValue={doktor.fiyat || ""} placeholder="1200 TL" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Web Sitesi</label>
                  <input name="website" defaultValue={doktor.website || ""} placeholder="https://dradi.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">WhatsApp Numarası</label>
                  <WhatsappInput mevcutDeger={doktor.whatsapp || ""} />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Kurum Tipi</label>
                  <select name="adres_tipi" defaultValue={doktor.adres_tipi || "muayenehane"} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                    {ADRES_TIPLERI.map((t) => (
                      <option key={t.deger} value={t.deger}>{t.etiket}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Klinik / Hastane Adı</label>
                  <input name="klinik_adi" defaultValue={doktor.klinik_adi || ""} placeholder="Örn: Sağlık Kliniği" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Adres</label>
                  <input name="adres" defaultValue={doktor.adres || ""} placeholder="Mahalle, Sokak, Bina No..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>

                <PanelDilSecici mevcutDiller={doktor.diller || ""} />

                <HizmetSecici mevcutHizmetler={doktor.hizmetler || ""} />

                <SigortaSecici mevcutSigorta={doktor.sigorta || ""} />

                {/* Klinik Fotoğrafları */}
                <div className="pt-2 border-t border-gray-100">
                  <KlinikFotoYukle baslangicFotolar={doktor.klinik_foto_urls || []} />
                </div>

                <label className="flex items-center gap-3 cursor-pointer py-1">
                  <div className="relative flex-shrink-0">
                    <input type="checkbox" name="online_randevu" defaultChecked={doktor.online_randevu} className="sr-only peer" />
                    <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-teal-600 transition-colors"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
                  </div>
                  <span className="text-sm text-gray-700">Online Randevu Kabul Ediyorum</span>
                </label>

                <button type="submit" style={{ backgroundColor: "#0D2137" }} className="w-full text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90">
                  Kaydet
                </button>
              </form>
            </div>

            <SifreDegistir />

            {/* Profil Teması */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-1">Profil Teması</h2>
              <p className="text-xs text-gray-400 mb-3">Herkese açık profil sayfanızın görünümünü özelleştirin</p>
              <TemaSecici mevcutTema={doktor.tema || "varsayilan"} arkaplanUrl={doktor.arka_plan_foto_url} gizleBashlik={true} />
            </div>

            {/* Paket Yükselt kartı — sadece ücretsiz pakette */}
            {(!doktor.paket || doktor.paket === "ucretsiz") && (
              <div style={{ background: "linear-gradient(135deg, #0D2137, #0a3d62)" }} className="rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="text-white font-bold text-sm mb-1">Premium'a Yükselt</h3>
                <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                  AI Asistan, öne çıkarma ve analitik dashboard için paketi yükseltin.
                </p>
                <a href="/paketler" style={{ backgroundColor: "#0E7C7B" }}
                  className="block text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  Paketleri İncele →
                </a>
              </div>
            )}
          </div>

          {/* SAĞ KOLON */}
          <div className="md:col-span-2 space-y-6">

            {/* Görüşme Özetle — Pro/Kurumsal */}
            {["pro", "kurumsal"].includes(doktor.paket) && (
              <a href="/gorusme-ozet" style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }} className="flex items-center gap-4 rounded-2xl p-5 hover:opacity-90 transition-opacity">
                <span className="text-3xl">🎙️</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm mb-0.5">Görüşme Özetle</div>
                  <p className="text-purple-200 text-xs leading-relaxed">Hasta görüşmenizi kaydedin, AI otomatik özetlesin</p>
                </div>
                <span className="text-purple-300 text-lg">→</span>
              </a>
            )}

            {/* AI Asistan */}
            <AIAsistan doktorId={doktor.id} paket={doktor.paket || "ucretsiz"} />

            {/* Yorum Doğrulama */}
            <YorumDogrulamaPanel dogrulamalar={dogrulamalar} />

            {/* Randevu Panel */}
            <RandevuPanel doktorId={doktor.id} />

            {/* Soru Panel */}
            <SoruPanel sorular={sorular} />

            {/* Medya Panel */}
            <MedyaPanel baslangicMedya={medyaListesi} />

            {/* Hastalarım — Pro/Kurumsal */}
            {["pro", "kurumsal"].includes(doktor.paket) && (
              <HastalarPanel gorusmeler={gorusmeler} />
            )}

            {/* Yorumlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ color: "#0D2137" }} className="font-bold text-lg">Hasta Yorumları</h2>
                <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-sm font-bold px-3 py-1 rounded-full">
                  {yorumlar.length} yorum
                </span>
              </div>
              {yorumlar.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-4xl mb-3">💬</p>
                  <p className="text-gray-400 text-sm">Henüz yorum yok.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {yorumlar.map((yorum) => (
                    <div key={yorum.id} style={{ borderColor: "#F5F7FA" }} className="border-b pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                            {yorum.hasta_adi[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{yorum.hasta_adi}</span>
                              {yorum.dogrulanmis && (
                                <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full">✓ Doğrulanmış</span>
                              )}
                              {yorum.dogrulama_durumu === "moderasyon_bekliyor" && (
                                <span style={{ backgroundColor: "#F5F3FF", color: "#7C3AED" }} className="text-xs px-2 py-0.5 rounded-full">🔍 Moderasyonda</span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{yorum.tarih}</span>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(yorum.puan)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{yorum.metin}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
