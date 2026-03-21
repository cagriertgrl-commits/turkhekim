"use client";

import { useState } from "react";
import { gorselSikistir } from "@/utils/imageCompress";

export default function KapakFoto({ kapakUrl: baslangic }) {
  const [kapakUrl, setKapakUrl] = useState(baslangic || null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  async function dosyaSec(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    e.target.value = "";
    setYukleniyor(true);
    setMesaj(null);
    try {
      const base64 = await gorselSikistir(dosya, 1200, 400, 0.88);
      const r = await fetch("/api/hesabim/arka-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.url) {
        setKapakUrl(data.url);
        setMesaj({ tip: "basari", metin: "Kapak fotoğrafı güncellendi!" });
        setTimeout(() => setMesaj(null), 2500);
      } else {
        setMesaj({ tip: "hata", metin: data.hata || "Yükleme başarısız." });
      }
    } catch (_) {
      setMesaj({ tip: "hata", metin: "Yükleme sırasında hata oluştu." });
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="relative w-full" style={{ height: "200px" }}>
      {/* Fotoğraf veya varsayılan degrade */}
      {kapakUrl ? (
        <img src={kapakUrl} alt="Kapak fotoğrafı" className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full"
          style={{ background: "linear-gradient(135deg, #0a1c2e 0%, #0D2137 60%, #0e3251 100%)" }}
        />
      )}

      {/* Hover overlay — yükleme butonu */}
      <label
        className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-200 ${
          kapakUrl ? "bg-transparent hover:bg-black/30" : ""
        }`}
      >
        <div
          className={`flex items-center gap-2 bg-black/55 backdrop-blur-sm text-white text-sm px-4 py-2.5 rounded-xl transition-all duration-200 ${
            kapakUrl ? "opacity-0 hover:opacity-100 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {yukleniyor ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>📷</span>
          )}
          <span className="font-medium">{kapakUrl ? "Kapağı Değiştir" : "Kapak Fotoğrafı Ekle"}</span>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={dosyaSec}
        />
      </label>

      {/* Yükleniyor overlay */}
      {yukleniyor && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Mesaj */}
      {mesaj && (
        <div
          className={`absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-lg font-medium ${
            mesaj.tip === "hata" ? "bg-red-500/90 text-white" : "bg-green-500/90 text-white"
          }`}
        >
          {mesaj.metin}
        </div>
      )}
    </div>
  );
}
