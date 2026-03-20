import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import FotoYukle from "@/components/FotoYukle";
import SifreDegistir from "@/components/SifreDegistir";
import RandevuPanel from "@/components/RandevuPanel";
import SoruPanel from "@/components/SoruPanel";

export default async function Panel() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/giris");

  const doktorlar = await sql`
    SELECT * FROM doktorlar WHERE id = ${session.user.id} LIMIT 1
  `;
  const doktor = doktorlar[0];

  const [yorumlar, sorular, analitkler] = await Promise.all([
    sql`SELECT * FROM yorumlar WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC`,
    sql`SELECT * FROM sorular WHERE doktor_id = ${doktor.id} ORDER BY yanit NULLS FIRST, created_at DESC`,
    sql`
      SELECT
        (SELECT COUNT(*) FROM randevular WHERE doktor_id = ${doktor.id} AND created_at >= date_trunc('month', NOW())) as bu_ay_randevu,
        (SELECT COUNT(*) FROM randevular WHERE doktor_id = ${doktor.id} AND durum = 'bekliyor') as bekleyen_randevu,
        (SELECT COUNT(*) FROM yorumlar WHERE doktor_id = ${doktor.id} AND created_at >= date_trunc('month', NOW())) as bu_ay_yorum,
        (SELECT COALESCE(profil_goruntulenme, 0) FROM doktorlar WHERE id = ${doktor.id}) as profil_goruntulenme
    `,
  ]);
  const analitik = analitkler[0];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
              <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
              <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            </svg>
            <span className="text-white font-bold text-lg tracking-tight">
              Doktor<span style={{ color: "#C9A84C" }}>Pusula</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {doktor.ad?.split(" ")[1]?.[0] || "D"}
              </div>
              <span className="text-gray-300 text-sm">{doktor.ad}</span>
            </div>
            <a href={`/doktor/${doktor.slug}`} style={{ borderColor: "#0E7C7B", color: "#4DD9D8" }} className="border text-xs px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity hidden md:block">
              Profilimi Gör
            </a>
            <a href="/api/auth/signout" className="text-gray-400 hover:text-white text-sm transition-colors">
              Çıkış
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* HOŞGELDIN BAŞLIĞI */}
        <div className="mb-6">
          <h1 style={{ color: "#0D2137" }} className="text-2xl font-bold">Hoş geldiniz, {doktor.ad.split(" ")[1]} 👋</h1>
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
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{kart.icon}</span>
              </div>
              <p style={{ color: kart.renk }} className="text-xl font-bold">{kart.deger}</p>
              <p className="text-gray-500 text-xs mt-1">{kart.baslik}</p>
            </div>
          ))}
        </div>

        {/* ANALİTİK KARTLAR */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { baslik: "Bu Ay Randevu", deger: Number(analitik.bu_ay_randevu) || 0, icon: "📊", renk: "#0D2137", bg: "#EFF6FF", alt: "Bu ay" },
            { baslik: "Bu Ay Yorum", deger: Number(analitik.bu_ay_yorum) || 0, icon: "💬", renk: "#7C3AED", bg: "#F5F3FF", alt: "Bu ay" },
            { baslik: "Profil Görüntülenme", deger: Number(analitik.profil_goruntulenme) || 0, icon: "👁️", renk: "#059669", bg: "#F0FDF4", alt: "Toplam" },
          ].map((kart) => (
            <div key={kart.baslik} style={{ backgroundColor: kart.bg }} className="rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{kart.icon}</span>
                <span className="text-xs text-gray-400">{kart.alt}</span>
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
            { ad: "Sigorta Bilgisi", tamam: !!doktor.sigorta },
            { ad: "Adres", tamam: !!doktor.adres },
            { ad: "Online Randevu Ayarı", tamam: doktor.online_randevu !== null },
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
                  <span key={a.ad} className="text-xs px-2 py-1 rounded-full border border-dashed border-gray-300 text-gray-400">
                    ✗ {a.ad}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

        <div className="grid md:grid-cols-3 gap-6">

          {/* SOL — Profil */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Profilim</h2>

              {/* Fotoğraf */}
              <FotoYukle
                fotoUrl={doktor.foto_url}
                initials={`${doktor.ad?.split(" ")[1]?.[0] || ""}${doktor.ad?.split(" ")[2]?.[0] || ""}`}
              />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ad</span>
                  <span className="font-medium text-gray-900">{doktor.ad}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Uzmanlık</span>
                  <span className="font-medium text-gray-900">{doktor.uzmanlik}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Şehir</span>
                  <span className="font-medium text-gray-900">{doktor.sehir}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Deneyim</span>
                  <span className="font-medium text-gray-900">{doktor.deneyim || "—"}</span>
                </div>
              </div>
              <a
                href={`/doktor/${doktor.slug}`}
                style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }}
                className="block mt-5 border text-center py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Profilimi Gör →
              </a>
            </div>

            {/* Profil Düzenle */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Profil Düzenle</h2>
              <form action="/api/profil-guncelle" method="POST" className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Hakkında</label>
                  <textarea
                    name="hakkinda"
                    defaultValue={doktor.hakkinda || ""}
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Muayene Ücreti</label>
                  <input
                    name="fiyat"
                    defaultValue={doktor.fiyat || ""}
                    placeholder="800 TL"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Kabul Edilen Sigortalar</label>
                  <input
                    name="sigorta"
                    defaultValue={doktor.sigorta || ""}
                    placeholder="SGK, Anadolu Sigorta, Allianz..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Adres / Klinik</label>
                  <input
                    name="adres"
                    defaultValue={doktor.adres || ""}
                    placeholder="Mahalle, Sokak, Bina No..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer py-1">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      name="online_randevu"
                      defaultChecked={doktor.online_randevu}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-teal-600 transition-colors"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
                  </div>
                  <span className="text-sm text-gray-700">Online Randevu Kabul Ediyorum</span>
                </label>
                <button
                  type="submit"
                  style={{ backgroundColor: "#0D2137" }}
                  className="w-full text-white py-2 rounded-lg text-sm font-medium hover:opacity-90"
                >
                  Kaydet
                </button>
              </form>
            </div>

            <SifreDegistir />
          </div>

          {/* SAĞ — Randevular + Yorumlar */}
          <div className="md:col-span-2 space-y-6">
            <RandevuPanel doktorId={doktor.id} />
            <SoruPanel sorular={sorular} />
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ color: "#0D2137" }} className="font-bold text-lg">Hasta Yorumları</h2>
                <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-sm font-bold px-3 py-1 rounded-full">
                  {yorumlar.length} yorum
                </span>
              </div>

              {yorumlar.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">💬</p>
                  <p className="text-gray-400 text-sm">Henüz yorum yok.</p>
                  <p className="text-gray-400 text-xs mt-1">Hastalar randevu sonrası yorum bırakabilir.</p>
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
                                <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full">
                                  ✓ Doğrulanmış
                                </span>
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
