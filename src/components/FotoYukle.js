"use client";

import { useState } from "react";
import { gorselSikistir } from "@/utils/imageCompress";

export default function FotoYukle({ fotoUrl: baslangic, initials }) {
  const [fotoUrl, setFotoUrl] = useState(baslangic || null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  async function dosyaSec(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    e.target.value = "";
    setYukleniyor(true);
    setMesaj(null);
    try {
      const base64 = await gorselSikistir(dosya, 300, 300, 0.85);
      const r = await fetch("/api/foto-yukle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMesaj({ tip: "hata", metin: data.hata || "Yükleme başarısız." });
        return;
      }
      setFotoUrl(data.url);
      setMesaj({ tip: "basari", metin: "Fotoğraf güncellendi!" });
      setTimeout(() => setMesaj(null), 2500);
    } catch (_) {
      setMesaj({ tip: "hata", metin: "Yükleme sırasında hata oluştu." });
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="text-center mb-4">
      {yukleniyor ? (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 border-4 border-gray-100">
          <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : fotoUrl ? (
        <img
          src={fotoUrl}
          alt="Profil fotoğrafı"
          className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-4 border-gray-100"
        />
      ) : (
        <div
          style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }}
          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2"
        >
          {initials}
        </div>
      )}
      <label className="cursor-pointer text-xs text-teal-600 hover:underline">
        {fotoUrl ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={dosyaSec}
        />
      </label>
      {mesaj && (
        <p className={`text-xs mt-1 ${mesaj.tip === "hata" ? "text-red-500" : "text-green-600"}`}>
          {mesaj.metin}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-0.5">Maks. 2MB · JPG/PNG/WEBP</p>
    </div>
  );
}
