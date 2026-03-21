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
  const [digerGiris, setDigerGiris] = useState("");

  function toggle(sigorta) {
    setSecili((prev) =>
      prev.includes(sigorta) ? prev.filter((s) => s !== sigorta) : [...prev, sigorta]
    );
  }

  function digerEkle() {
    const temiz = digerGiris.trim();
    if (temiz && !secili.includes(temiz)) {
      setSecili((prev) => [...prev, temiz]);
    }
    setDigerGiris("");
  }

  return (
    <div>
      <label className="text-xs text-gray-500 block mb-2">Kabul Edilen Sigortalar</label>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg mb-2">
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

      {/* Özel sigorta */}
      <div className="flex gap-2">
        <input
          type="text"
          value={digerGiris}
          onChange={(e) => setDigerGiris(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), digerEkle())}
          placeholder="Listede yok mu? Buraya yazın... (ör: Eureko)"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
        />
        <button
          type="button"
          onClick={digerEkle}
          style={{ backgroundColor: "#0D2137" }}
          className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 whitespace-nowrap"
        >
          + Ekle
        </button>
      </div>

      {/* Elle eklenenler */}
      {secili.filter((s) => !SIGORTALAR.includes(s)).length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {secili.filter((s) => !SIGORTALAR.includes(s)).map((s) => (
            <span key={s} style={{ backgroundColor: "#0E7C7B", color: "white" }} className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              {s}
              <button type="button" onClick={() => toggle(s)} className="ml-1 hover:opacity-70">×</button>
            </span>
          ))}
        </div>
      )}

      <input type="hidden" name="sigorta" value={secili.join(", ")} />
      {secili.length > 0 && (
        <p className="text-xs text-teal-600 mt-1">{secili.length} sigorta seçildi</p>
      )}
    </div>
  );
}
