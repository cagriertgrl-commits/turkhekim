import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import FotoYukle from "@/components/FotoYukle";
import SifreDegistir from "@/components/SifreDegistir";
import RandevuPanel from "@/components/RandevuPanel";

export default async function Panel() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/giris");

  const doktorlar = await sql`
    SELECT * FROM doktorlar WHERE id = ${session.user.id} LIMIT 1
  `;
  const doktor = doktorlar[0];

  const yorumlar = await sql`
    SELECT * FROM yorumlar WHERE doktor_id = ${doktor.id} ORDER BY created_at DESC
  `;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-white font-bold text-xl">DoktorPusula</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">Hoş geldiniz, {doktor.ad}</span>
            <a href="/api/auth/signout" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
              Çıkış
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ÖZET KARTLAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { baslik: "Puan", deger: doktor.puan || "—", icon: "⭐", renk: "#FCD34D" },
            { baslik: "Yorum", deger: yorumlar.length, icon: "💬", renk: "#0E7C7B" },
            { baslik: "Durum", deger: doktor.onaylandi ? "Yayında" : "İncelemede", icon: doktor.onaylandi ? "✅" : "⏳", renk: doktor.onaylandi ? "#059669" : "#D97706" },
            { baslik: "Müsaitlik", deger: doktor.musait ? "Aktif" : "Kapalı", icon: "📅", renk: "#0D2137" },
          ].map((kart) => (
            <div key={kart.baslik} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{kart.icon}</span>
                <span style={{ color: kart.renk }} className="text-xl font-bold">{kart.deger}</span>
              </div>
              <p className="text-gray-500 text-sm">{kart.baslik}</p>
            </div>
          ))}
        </div>

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
