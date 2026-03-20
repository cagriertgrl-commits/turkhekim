"use client";
import { useState } from "react";
import Link from "next/link";

const kategoriRenkler = {
  "KBB":             { bg: "#EFF6FF", text: "#2563EB" },
  "Estetik Cerrahi": { bg: "#FDF4FF", text: "#9333EA" },
  "Çocuk Sağlığı":   { bg: "#FFFBEB", text: "#D97706" },
  "Göz":             { bg: "#F0FDFA", text: "#0E7C7B" },
  "Medikal Turizm":  { bg: "#FFF1F2", text: "#E11D48" },
  "Dermatoloji":     { bg: "#F0FDF4", text: "#059669" },
  "Kardiyoloji":     { bg: "#FFF7ED", text: "#EA580C" },
  "Ortopedi":        { bg: "#F5F3FF", text: "#7C3AED" },
  "Genel":           { bg: "#F5F7FA", text: "#6B7280" },
};

export default function SaglikRehberiIcerik({ makaleler }) {
  const kategoriler = ["Tümü", ...new Set(makaleler.map((m) => m.kategori))];
  const [aktifKat, setAktifKat] = useState("Tümü");
  const [arama, setArama] = useState("");

  const filtreli = makaleler.filter((m) => {
    const katOk = aktifKat === "Tümü" || m.kategori === aktifKat;
    const aramaOk = !arama || m.baslik.toLowerCase().includes(arama.toLowerCase()) || m.ozet?.toLowerCase().includes(arama.toLowerCase());
    return katOk && aramaOk;
  });

  return (
    <>
      {/* Arama */}
      <div className="max-w-lg mx-auto relative mb-0">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="Makale ara..."
          className="w-full bg-white rounded-2xl pl-10 pr-5 py-3.5 text-sm focus:outline-none shadow-xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Kategoriler */}
        <div className="flex flex-wrap gap-2 mb-8">
          {kategoriler.map((kat) => (
            <button
              key={kat}
              onClick={() => setAktifKat(kat)}
              style={aktifKat === kat
                ? { backgroundColor: "#0D2137", color: "white", borderColor: "#0D2137" }
                : { backgroundColor: "white", color: "#6B7280", borderColor: "#E5E7EB" }
              }
              className="px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:border-gray-400"
            >
              {kat} {kat !== "Tümü" && `(${makaleler.filter(m => m.kategori === kat).length})`}
            </button>
          ))}
        </div>

        {filtreli.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">Bu kategoride henüz makale yok.</p>
          </div>
        ) : (
          <>
            {/* Öne çıkan */}
            {aktifKat === "Tümü" && !arama && (
              <Link href={filtreli[0].href} className="block mb-8 group">
                <div style={{ background: "linear-gradient(135deg, #0D2137, #0a3d62)" }} className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 hover:opacity-95 transition-opacity">
                  <div className="text-7xl flex-shrink-0 w-28 h-28 flex items-center justify-center bg-white bg-opacity-10 rounded-2xl">
                    {filtreli[0].goruntu}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ backgroundColor: "#0E7C7B30", color: "#4DD9D8" }} className="text-xs font-semibold px-3 py-1 rounded-full border border-teal-700">
                        {filtreli[0].kategori}
                      </span>
                      {filtreli[0].kaynak === "doktor" && (
                        <span className="text-xs text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full">Doktor Makalesi</span>
                      )}
                    </div>
                    <h2 className="text-white text-xl md:text-2xl font-bold mb-3 group-hover:text-teal-300 transition-colors">{filtreli[0].baslik}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{filtreli[0].ozet}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-xs">
                      <span>✍️ {filtreli[0].yazar}</span>
                      <span>📅 {filtreli[0].tarih}</span>
                      {filtreli[0].okumaSuresi && <span>⏱ {filtreli[0].okumaSuresi}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Makale listesi */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(aktifKat === "Tümü" && !arama ? filtreli.slice(1) : filtreli).map((makale) => {
                const renk = kategoriRenkler[makale.kategori] || { bg: "#F5F7FA", text: "#6B7280" };
                return (
                  <Link
                    key={makale.href}
                    href={makale.href}
                    className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden border border-gray-100 group"
                  >
                    <div style={{ backgroundColor: renk.bg }} className="h-36 flex items-center justify-center text-6xl">
                      {makale.goruntu}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ backgroundColor: renk.bg, color: renk.text }} className="text-xs font-semibold px-2.5 py-1 rounded-full">
                          {makale.kategori}
                        </span>
                        {makale.kaynak === "doktor" && (
                          <span className="text-xs text-gray-400">👨‍⚕️ Doktor</span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mt-2 mb-2 text-sm leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                        {makale.baslik}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">{makale.ozet}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                        <span className="font-medium text-gray-600">{makale.yazar}</span>
                        {makale.okumaSuresi && <span>⏱ {makale.okumaSuresi}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* CTA */}
        <div style={{ backgroundColor: "#F0FDFA", borderColor: "#0E7C7B30" }} className="border rounded-2xl p-8 text-center mt-12">
          <p className="text-2xl mb-3">🩺</p>
          <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">Siz de Makale Yazın</h3>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            Uzman doktor olarak sağlık içerikleri üretin, hasta tabanınızı genişletin ve otoritenizi artırın.
          </p>
          <Link href="/doktor-ol" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
            Doktor Olarak Katıl
          </Link>
        </div>
      </div>
    </>
  );
}
