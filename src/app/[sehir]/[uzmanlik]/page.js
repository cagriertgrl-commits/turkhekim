import Navbar from "@/components/Navbar";
import sql from "@/lib/db";

export default async function DoktorListesi({ params }) {
  const { sehir: sehirParam, uzmanlik: uzmanlikParam } = await params;
  const sehir = sehirParam.charAt(0).toUpperCase() + sehirParam.slice(1);
  const uzmanlik = uzmanlikParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const doktorlar = await sql`
    SELECT * FROM doktorlar
    WHERE LOWER(sehir) LIKE ${"%" + sehirParam.toLowerCase() + "%"}
    ORDER BY puan DESC
  `;

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar aktifSayfa="Doktor Bul" />

      {/* BAŞLIK & FİLTRE */}
      <div style={{ backgroundColor: "#0D2137" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-sm mb-2">
            <a href="/" className="hover:text-white transition-colors">Ana Sayfa</a>
            <span className="mx-2">›</span>
            <span className="text-white">{sehir} · {uzmanlik}</span>
          </p>
          <h1 className="text-white text-3xl font-bold mb-6">
            {sehir} {uzmanlik} — {doktorlar.length} Doktor Bulundu
          </h1>

          {/* Arama Filtresi */}
          <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              defaultValue={uzmanlik}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
            <input
              type="text"
              defaultValue={sehir}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
            <button style={{ backgroundColor: "#0D2137" }} className="text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90">
              Ara
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">

          {/* SOL — Filtreler */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Filtrele</h3>

              <div className="mb-4">
                <p className="text-xs text-gray-500 font-medium mb-2">SIRALAMA</p>
                <div className="space-y-2">
                  {["En Yüksek Puan", "En Fazla Yorum", "En Yakın Tarih"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="siralama" className="accent-teal-600" defaultChecked={opt === "En Yüksek Puan"} />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 font-medium mb-2">MÜSAİTLİK</p>
                <div className="space-y-2">
                  {["Tümü", "Bu Hafta Müsait", "Bugün Müsait"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="musait" className="accent-teal-600" defaultChecked={opt === "Tümü"} />
                      <span className="text-sm text-gray-600">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium mb-2">İLÇE</p>
                <div className="space-y-2">
                  {["Tümü", "Kadıköy", "Beşiktaş", "Şişli", "Üsküdar", "Bakırköy"].map((ilce) => (
                    <label key={ilce} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-teal-600" defaultChecked={ilce === "Tümü"} />
                      <span className="text-sm text-gray-600">{ilce}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ — Doktor Listesi */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{doktorlar.length} doktor listeleniyor</p>
            </div>

            {doktorlar.map((doktor) => (
              <div key={doktor.slug} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {doktor.ad.split(" ")[1][0]}{doktor.ad.split(" ")[2]?.[0] || ""}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div>
                        <h2 className="font-bold text-gray-900 text-lg">{doktor.ad}</h2>
                        <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                        <p className="text-gray-400 text-sm">📍 {doktor.sehir} · {doktor.ilce} · {doktor.deneyim}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-yellow-400">★</span>
                          <span className="font-bold text-sm">{doktor.puan}</span>
                          <span className="text-gray-400 text-xs">({doktor.yorum_sayisi} doğrulanmış yorum)</span>
                          <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full font-medium ml-1">
                            ✓ Doğrulanmış
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                        <span className="text-gray-500 text-sm">Muayene: <strong className="text-gray-900">{doktor.fiyat}</strong></span>
                        {doktor.musait ? (
                          <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-3 py-1 rounded-full font-medium">
                            ● Bu hafta müsait
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                            Yakın tarih yok
                          </span>
                        )}
                        <a
                          href={`/doktor/${doktor.slug}`}
                          style={{ backgroundColor: "#0D2137" }}
                          className="text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Profili İncele
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
