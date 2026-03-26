"use client";
import { useState } from "react";
import Link from "next/link";

const MakaleIcon = ({ name, color = "currentColor" }) => {
  const icons = {
    ear: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M12.02 20c.88 0 1.71-.35 2.33-.97.62-.62.97-1.45.97-2.33 0-1.83-1.5-3.3-3.3-3.3-1.83 0-3.3 1.5-3.3 3.3 0 .88.35 1.71.97 2.33.62.62 1.45.97 2.33.97zm0-6.6c2.57 0 4.66-2.09 4.66-4.66S14.59 4.08 12.02 4.08 7.36 6.17 7.36 8.74s2.09 4.66 4.66 4.66z" />
      </svg>
    ),
    nose: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M9 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 4c-2.2 0-4 1.8-4 4 0 .3.2.5.5.5.3 0 .5-.2.5-.5 0-1.6 1.3-2.9 2.9-2.9s2.9 1.3 2.9 2.9c0 .3.2.5.5.5.3 0 .5-.2.5-.5 0-2.2-1.8-4-4-4zm6 0c-2.2 0-4 1.8-4 4 0 .3.2.5.5.5.3 0 .5-.2.5-.5 0-1.6 1.3-2.9 2.9-2.9s2.9 1.3 2.9 2.9c0 .3.2.5.5.5.3 0 .5-.2.5-.5 0-2.2-1.8-4-4-4z" />
      </svg>
    ),
    sleep: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
    injection: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M17.1 12.3c-.2-.2-.5-.3-.7-.3-.1 0-.2 0-.3.1l-1.4.4.6-1.6c.1-.2.1-.5 0-.7l-3.5-6c-.2-.3-.5-.5-.9-.5s-.7.2-.9.5l-3.5 6c-.1.2-.1.5 0 .7l.6 1.6-1.4-.4c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.3-.4.4-.4 1 0 1.4l4.4 4.4c.2.2.4.3.7.3s.5-.1.7-.3l4.4-4.4c.4-.4.4-1 0-1.4z" />
      </svg>
    ),
    eye: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    ),
    hair: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M17.75 7L14 3.25l-10 10V17h3.75L17.75 7zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15.96 2.3c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0L20.71 4.04zM6 19.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
    article: (
      <svg fill={color} viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-8-6z" />
      </svg>
    ),
  };

  return icons[name] || icons.article;
};

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
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
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
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.29-2.59c-.43-.5-1.18-.5-1.61 0-.43.49-.43 1.3 0 1.79l2.99 3.37c.43.5 1.18.5 1.61 0L21 9.08c.43-.49.43-1.3 0-1.79-.43-.49-1.18-.49-1.61 0L13.96 12.29z" />
            </svg>
            <p className="text-gray-500">Bu kategoride henüz makale yok.</p>
          </div>
        ) : (
          <>
            {/* Öne çıkan */}
            {aktifKat === "Tümü" && !arama && (
              <Link href={filtreli[0].href} className="block mb-8 group">
                <div style={{ background: "linear-gradient(135deg, #0D2137, #0a3d62)" }} className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 hover:opacity-95 transition-opacity">
                  <div className="text-white flex-shrink-0 w-28 h-28 flex items-center justify-center bg-white bg-opacity-10 rounded-2xl text-5xl">
                    <MakaleIcon name={filtreli[0].goruntu} color="#4DD9D8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ backgroundColor: "#0E7C7B30", color: "#4DD9D8" }} className="text-xs font-semibold px-3 py-1 rounded-full border border-teal-700">
                        {filtreli[0].kategori}
                      </span>
                      {filtreli[0].kaynak === "doktor" && (
                        <span className="text-xs text-gray-400 border border-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                          Doktor Makalesi
                        </span>
                      )}
                    </div>
                    <h2 className="text-white text-xl md:text-2xl font-bold mb-3 group-hover:text-teal-300 transition-colors">{filtreli[0].baslik}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{filtreli[0].ozet}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-xs">
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13.5h8v-12H3v12zm9.5 0h8v-12h-8v12zM3 3v1.5h8V3H3zm8 9v1.5h8V12h-8z" /></svg> {filtreli[0].yazar}</span>
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg> {filtreli[0].tarih}</span>
                      {filtreli[0].okumaSuresi && <span className="flex items-center gap-1.5"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 5V1h-1v4H8.98v2h3.01v4h1V7h3.01V5h-3.01zm.01 14c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> {filtreli[0].okumaSuresi}</span>}
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
                    <div style={{ backgroundColor: renk.bg }} className="h-36 flex items-center justify-center text-4xl">
                      <MakaleIcon name={makale.goruntu} color={renk.text} />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ backgroundColor: renk.bg, color: renk.text }} className="text-xs font-semibold px-2.5 py-1 rounded-full">
                          {makale.kategori}
                        </span>
                        {makale.kaynak === "doktor" && (
                          <span className="text-xs text-gray-400 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            Doktor
                          </span>
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
          <svg className="w-8 h-8 mx-auto mb-3 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-7h3v-2h-3V7h-2v3H7v2h3v3h2v-3z" />
          </svg>
          <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">Siz de Makale Yazın</h3>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            Uzman doktor olarak sağlık içerikleri üretin, hasta tabanınızı genişletin ve otoritenizi artırın.
          </p>
          <Link href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
            Doktor Olarak Katıl
          </Link>
        </div>
      </div>
    </>
  );
}
