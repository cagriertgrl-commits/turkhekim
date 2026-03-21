"use client";

import { useState } from "react";
import { gorselSikistir } from "@/utils/imageCompress";

export default function ArkaplanYukle({ arkaplanUrl: baslangic }) {
  const [url, setUrl] = useState(baslangic || null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  async function dosyaSec(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    e.target.value = "";
    setYukleniyor(true);
    setMesaj(null);
    try {
      const base64 = await gorselSikistir(dosya, 800, 400, 0.82);
      const r = await fetch("/api/hesabim/arka-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMesaj({ tip: "hata", metin: data.hata || `Hata (${r.status})` });
        return;
      }
      setUrl(data.url);
      setMesaj({ tip: "basari", metin: "Arka plan güncellendi!" });
      setTimeout(() => setMesaj(null), 2500);
    } catch (_) {
      setMesaj({ tip: "hata", metin: "Yükleme başarısız." });
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-xs text-gray-500 mb-2 font-medium">Arka Plan / Logo</p>
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="w-14 h-10 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-teal-400 transition-colors flex-shrink-0">
          {yukleniyor ? (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : url ? (
            <img src={url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-lg">🖼️</div>
          )}
        </div>
        <div>
          <span className="text-xs text-teal-600 group-hover:underline">
            {url ? "Değiştir" : "Yükle"}
          </span>
          <p className="text-xs text-gray-400">PNG logo veya banner · Maks. 5MB</p>
        </div>
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={dosyaSec} />
      </label>
      {mesaj && (
        <p className={`text-xs mt-2 ${mesaj.tip === "hata" ? "text-red-600" : "text-green-600"}`}>
          {mesaj.tip === "hata" ? "✗" : "✓"} {mesaj.metin}
        </p>
      )}
    </div>
  );
}
