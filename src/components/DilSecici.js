"use client";
import { useState } from "react";

const HAZIR_DILLER = [
  "Türkçe", "İngilizce", "Arapça", "Farsça", "Almanca", "Fransızca", "Rusça",
  "İspanyolca", "İtalyanca", "Çince", "Japonca", "Korece", "Portekizce",
  "Hollandaca", "Lehçe", "Romence", "Bulgarca", "Yunanca", "Ukraynaca",
  "Azerbaycanca", "Özbekçe", "Kazakça", "Kürtçe", "Süryanice", "Ermenice",
];

export default function DilSecici({ mevcutDiller = "" }) {
  const baslangic = mevcutDiller
    ? mevcutDiller.split(",").map((d) => d.trim()).filter(Boolean)
    : [];
  const [secili, setSecili] = useState(baslangic);
  const [arama, setArama] = useState("");
  const [acik, setAcik] = useState(false);

  function toggle(dil) {
    setSecili((prev) =>
      prev.includes(dil) ? prev.filter((d) => d !== dil) : [...prev, dil]
    );
  }

  function ozelEkle() {
    const temiz = arama.trim();
    if (temiz && !secili.includes(temiz)) {
      setSecili((prev) => [...prev, temiz]);
    }
    setArama("");
    setAcik(false);
  }

  const filtrelenmis = HAZIR_DILLER.filter(
    (d) => !secili.includes(d) && d.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">Hizmet Verilen Diller</label>

      {/* Seçili diller — tag'ler */}
      <div
        className="min-h-[42px] flex flex-wrap gap-1.5 p-2 border border-gray-200 rounded-lg cursor-text"
        onClick={() => setAcik(true)}
      >
        {secili.map((dil) => (
          <span
            key={dil}
            style={{ backgroundColor: "#0E7C7B", color: "white" }}
            className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
          >
            {dil}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggle(dil); }}
              className="ml-1 hover:opacity-70"
            >×</button>
          </span>
        ))}
        <input
          type="text"
          value={arama}
          onChange={(e) => { setArama(e.target.value); setAcik(true); }}
          onFocus={() => setAcik(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (filtrelenmis.length === 1) { toggle(filtrelenmis[0]); setArama(""); }
              else if (filtrelenmis.length === 0 && arama.trim()) ozelEkle();
            }
            if (e.key === "Escape") setAcik(false);
          }}
          placeholder={secili.length === 0 ? "Dil ekle... (ör: İngilizce)" : ""}
          className="flex-1 min-w-[120px] text-xs outline-none bg-transparent"
        />
      </div>

      {/* Dropdown */}
      {acik && (
        <div className="relative">
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filtrelenmis.length > 0 ? (
              filtrelenmis.map((dil) => (
                <button
                  key={dil}
                  type="button"
                  onClick={() => { toggle(dil); setArama(""); setAcik(false); }}
                  className="w-full text-left text-xs px-3 py-2 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  + {dil}
                </button>
              ))
            ) : arama.trim() ? (
              <button
                type="button"
                onClick={ozelEkle}
                className="w-full text-left text-xs px-3 py-2 hover:bg-teal-50 text-teal-700 font-medium"
              >
                + &quot;{arama.trim()}&quot; ekle
              </button>
            ) : (
              <p className="text-xs text-gray-400 px-3 py-2">Tüm diller eklendi</p>
            )}
          </div>
          <div className="fixed inset-0 z-0" onClick={() => setAcik(false)} />
        </div>
      )}

      <input type="hidden" name="diller" value={secili.join(", ")} />
      {secili.length > 0 && (
        <p className="text-xs text-teal-600 mt-1">{secili.length} dil seçildi</p>
      )}
    </div>
  );
}
