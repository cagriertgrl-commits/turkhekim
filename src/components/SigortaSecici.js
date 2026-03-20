"use client";
import { useState } from "react";

const SIGORTALAR = [
  "SGK",
  "Anadolu Sigorta",
  "Allianz",
  "AXA Sigorta",
  "Mapfre Sigorta",
  "Güneş Sigorta",
  "HDI Sigorta",
  "Türkiye Sigorta",
  "Groupama",
  "NN Hayat & Emeklilik",
  "Generali",
  "Zurich",
  "Aksigorta",
  "BNP Paribas Cardif",
  "Cigna",
  "Özel Sağlık Sigortası (Genel)",
];

export default function SigortaSecici({ mevcutSigorta = "" }) {
  const baslangic = mevcutSigorta
    ? mevcutSigorta.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const [secili, setSecili] = useState(baslangic);

  function toggle(sigorta) {
    setSecili((prev) =>
      prev.includes(sigorta) ? prev.filter((s) => s !== sigorta) : [...prev, sigorta]
    );
  }

  return (
    <div>
      <label className="text-xs text-gray-500 block mb-2">Kabul Edilen Sigortalar</label>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg">
        {SIGORTALAR.map((sig) => {
          const aktif = secili.includes(sig);
          return (
            <button
              key={sig}
              type="button"
              onClick={() => toggle(sig)}
              style={aktif
                ? { backgroundColor: "#0E7C7B", color: "white", borderColor: "#0E7C7B" }
                : { backgroundColor: "white", color: "#6B7280", borderColor: "#E5E7EB" }
              }
              className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all hover:border-teal-400"
            >
              {aktif ? "✓ " : ""}{sig}
            </button>
          );
        })}
      </div>
      <input type="hidden" name="sigorta" value={secili.join(", ")} />
      {secili.length > 0 && (
        <p className="text-xs text-teal-600 mt-1">{secili.length} sigorta seçildi</p>
      )}
    </div>
  );
}
