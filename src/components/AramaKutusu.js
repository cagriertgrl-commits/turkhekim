"use client";

import { useState } from "react";
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

const populerAramalar = [
  { etiket: "KBB Uzmanı", sehir: "istanbul", uzmanlik: "kbb-uzmani" },
  { etiket: "Rinoplasti", sehir: "istanbul", uzmanlik: "rinoplasti" },
  { etiket: "Estetik Cerrahi", sehir: "istanbul", uzmanlik: "estetik-cerrahi" },
  { etiket: "Diş Hekimi", sehir: "istanbul", uzmanlik: "dis-hekimi" },
  { etiket: "Göz Doktoru", sehir: "istanbul", uzmanlik: "goz-doktoru" },
];

export default function AramaKutusu() {
  const router = useRouter();
  const [uzmanlik, setUzmanlik] = useState("");
  const [sehir, setSehir] = useState("");

  function ara(e) {
    e.preventDefault();
    const u = slugYap(uzmanlik || "doktor");
    const s = slugYap(sehir || "istanbul");
    router.push(`/${s}/${u}`);
  }

  return (
    <div className="bg-white rounded-2xl p-4 max-w-3xl mx-auto shadow-2xl">
      <form onSubmit={ara}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1 text-left">
              Uzmanlık Alanı
            </label>
            <input
              type="text"
              value={uzmanlik}
              onChange={(e) => setUzmanlik(e.target.value)}
              placeholder="KBB, Kardiyoloji, Ortopedi..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1 text-left">
              Şehir
            </label>
            <input
              type="text"
              value={sehir}
              onChange={(e) => setSehir(e.target.value)}
              placeholder="İstanbul, Ankara, İzmir..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              style={{ backgroundColor: "#0D2137" }}
              className="w-full md:w-auto text-white px-8 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Doktor Ara
            </button>
          </div>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-gray-500">Popüler:</span>
        {populerAramalar.map((item) => (
          <button
            key={item.etiket}
            onClick={() => router.push(`/${item.sehir}/${item.uzmanlik}`)}
            className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
          >
            {item.etiket}
          </button>
        ))}
      </div>
    </div>
  );
}
