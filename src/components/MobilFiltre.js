"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobilFiltre({ sehirParam, uzmanlikParam, sigortaFiltreAktif, onlineFiltreAktif, doktorSayisi }) {
  const [acik, setAcik] = useState(false);
  const aktifSayisi = (sigortaFiltreAktif ? 1 : 0) + (onlineFiltreAktif ? 1 : 0);

  function sigortaHref() {
    if (sigortaFiltreAktif) return `/${sehirParam}/${uzmanlikParam}${onlineFiltreAktif ? "?online=1" : ""}`;
    return `/${sehirParam}/${uzmanlikParam}?sigorta=1${onlineFiltreAktif ? "&online=1" : ""}`;
  }
  function onlineHref() {
    if (onlineFiltreAktif) return `/${sehirParam}/${uzmanlikParam}${sigortaFiltreAktif ? "?sigorta=1" : ""}`;
    return `/${sehirParam}/${uzmanlikParam}?online=1${sigortaFiltreAktif ? "&sigorta=1" : ""}`;
  }

  const SEHIRLER = ["istanbul", "ankara", "izmir", "bursa", "antalya"];

  return (
    <>
      {/* Mobil filtre butonu */}
      <button
        onClick={() => setAcik(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M11 20h2" />
        </svg>
        Filtrele
        {aktifSayisi > 0 && (
          <span className="text-xs px-1.5 py-0.5 rounded-full text-white font-bold leading-none" style={{ backgroundColor: "#0E7C7B" }}>
            {aktifSayisi}
          </span>
        )}
      </button>

      {/* Overlay */}
      {acik && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/50" onClick={() => setAcik(false)} />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out ${acik ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Filtrele & Sırala</h3>
              <button onClick={() => setAcik(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                ✕
              </button>
            </div>

            {/* Sıralama */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Sıralama</p>
              <div className="space-y-1">
                {["En Yüksek Puan", "En Fazla Yorum", "En Deneyimli"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input type="radio" name="siralama_mobil" className="accent-teal-600 w-4 h-4" defaultChecked={opt === "En Yüksek Puan"} />
                    <span className="text-sm text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Özellikler */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Özellikler</p>
              <div className="space-y-2">
                <Link
                  href={sigortaHref()}
                  onClick={() => setAcik(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                  style={sigortaFiltreAktif ? { backgroundColor: "#E8F5F5", color: "#0E7C7B" } : { backgroundColor: "#F9FAFB", color: "#374151" }}
                >
                  <span>🛡️</span>
                  <span className="text-sm font-medium">Sigorta Kabul Ediyor</span>
                  {sigortaFiltreAktif && <span className="ml-auto text-xs font-bold">✓</span>}
                </Link>
                <Link
                  href={onlineHref()}
                  onClick={() => setAcik(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                  style={onlineFiltreAktif ? { backgroundColor: "#E8F5F5", color: "#0E7C7B" } : { backgroundColor: "#F9FAFB", color: "#374151" }}
                >
                  <span>💻</span>
                  <span className="text-sm font-medium">Online Randevu</span>
                  {onlineFiltreAktif && <span className="ml-auto text-xs font-bold">✓</span>}
                </Link>
              </div>
            </div>

            {/* Diğer Şehirler */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Diğer Şehirler</p>
              <div className="flex flex-wrap gap-2">
                {SEHIRLER.map((s) => (
                  <Link
                    key={s}
                    href={`/${s}/${uzmanlikParam}`}
                    onClick={() => setAcik(false)}
                    className="text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors capitalize"
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => setAcik(false)}
              style={{ backgroundColor: "#0D2137" }}
              className="w-full text-white py-3.5 rounded-2xl text-sm font-semibold hover:opacity-90"
            >
              {doktorSayisi} Sonucu Gör
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
