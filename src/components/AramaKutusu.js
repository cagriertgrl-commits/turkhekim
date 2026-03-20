"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function slugYap(metin) {
  return metin
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const UZMANLIKLAR = [
  "KBB Uzmanı", "Kardiyoloji", "Ortopedi", "Plastik Cerrahi",
  "Göz Hastalıkları", "Diş Hekimi", "Dermatoloji", "Nöroloji",
  "Üroloji", "Psikiyatri", "Çocuk Hastalıkları", "Estetik Cerrahi",
  "Genel Cerrahi", "İç Hastalıkları", "Kadın Doğum", "Rinoplasti",
  "Onkoloji", "Endokrinoloji", "Gastroenteroloji", "Fizik Tedavi",
  "Radyoloji", "Anesteziyoloji", "Acil Tıp", "Aile Hekimi",
];

const SEHIRLER = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya",
  "Adana", "Konya", "Gaziantep", "Mersin", "Kayseri",
  "Trabzon", "Diyarbakır", "Samsun", "Eskişehir", "Erzurum",
];

const POPULER = [
  { etiket: "KBB · İstanbul", sehir: "istanbul", uzmanlik: "kbb-uzmani" },
  { etiket: "Rinoplasti · İstanbul", sehir: "istanbul", uzmanlik: "rinoplasti" },
  { etiket: "Estetik Cerrahi · Ankara", sehir: "ankara", uzmanlik: "estetik-cerrahi" },
  { etiket: "Diş · İzmir", sehir: "izmir", uzmanlik: "dis-hekimi" },
  { etiket: "Göz · İstanbul", sehir: "istanbul", uzmanlik: "goz-hastaliklari" },
];

function DropdownInput({ value, onChange, placeholder, onaylar, label, icon }) {
  const [acik, setAcik] = useState(false);
  const ref = useRef(null);

  const filtreli = onaylar.filter((o) =>
    o.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    function kapat(e) {
      if (ref.current && !ref.current.contains(e.target)) setAcik(false);
    }
    document.addEventListener("mousedown", kapat);
    return () => document.removeEventListener("mousedown", kapat);
  }, []);

  return (
    <div className="flex-1 relative" ref={ref}>
      <label className="block text-xs font-semibold text-gray-500 mb-1 text-left uppercase tracking-wide">
        {icon} {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setAcik(true); }}
        onFocus={() => setAcik(true)}
        placeholder={placeholder}
        className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors bg-gray-50 focus:bg-white"
      />
      {acik && value.length > 0 && filtreli.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-xl mt-1 z-50 overflow-hidden">
          {filtreli.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { onChange(o); setAcik(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AramaKutusu() {
  const router = useRouter();
  const [uzmanlik, setUzmanlik] = useState("");
  const [sehir, setSehir] = useState("");
  const [mod, setMod] = useState("yuzyuze"); // "yuzyuze" | "online"

  function ara(e) {
    e.preventDefault();
    const u = slugYap(uzmanlik || "doktor");
    const s = slugYap(sehir || "istanbul");
    const query = mod === "online" ? "?online=1" : "";
    router.push(`/${s}/${u}${query}`);
  }

  return (
    <div className="bg-white rounded-2xl p-5 max-w-3xl mx-auto shadow-2xl">
      {/* MOD SEÇİCİ */}
      <div className="flex gap-1 p-1 rounded-xl mb-4" style={{ backgroundColor: "#F5F7FA" }}>
        <button
          type="button"
          onClick={() => setMod("yuzyuze")}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
          style={mod === "yuzyuze"
            ? { backgroundColor: "#0D2137", color: "white", boxShadow: "0 2px 8px rgba(13,33,55,0.3)" }
            : { color: "#6B7280" }}
        >
          🏥 Yüz Yüze Randevu
        </button>
        <button
          type="button"
          onClick={() => setMod("online")}
          className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
          style={mod === "online"
            ? { backgroundColor: "#0E7C7B", color: "white", boxShadow: "0 2px 8px rgba(14,124,123,0.3)" }
            : { color: "#6B7280" }}
        >
          💻 Online Görüşme
        </button>
      </div>

      <form onSubmit={ara}>
        <div className="flex flex-col md:flex-row gap-3">
          <DropdownInput
            label="Uzmanlık"
            icon="🔍"
            value={uzmanlik}
            onChange={setUzmanlik}
            placeholder="KBB, Kardiyoloji, Ortopedi..."
            onaylar={UZMANLIKLAR}
          />
          <DropdownInput
            label="Şehir"
            icon="📍"
            value={sehir}
            onChange={setSehir}
            placeholder="İstanbul, Ankara, İzmir..."
            onaylar={SEHIRLER}
          />
          <div className="flex items-end">
            <button
              type="submit"
              style={{ backgroundColor: mod === "online" ? "#0E7C7B" : "#0D2137" }}
              className="w-full md:w-auto text-white px-8 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
            >
              {mod === "online" ? "Online Doktor Ara →" : "Doktor Ara →"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-400 font-medium">Popüler:</span>
        {POPULER.map((item) => (
          <button
            key={item.etiket}
            type="button"
            onClick={() => router.push(`/${item.sehir}/${item.uzmanlik}`)}
            className="text-xs text-gray-600 bg-gray-50 border border-gray-200 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-full transition-all"
          >
            {item.etiket}
          </button>
        ))}
      </div>
    </div>
  );
}
