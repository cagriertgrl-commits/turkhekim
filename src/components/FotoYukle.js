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
      const base64 = await gorselSikistir(dosya, 600, 600, 0.95);
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
    <div className="mb-4">
      <label className="relative block w-full cursor-pointer group" style={{ aspectRatio: "1/1" }}>
        {/* Fotoğraf veya placeholder */}
        {yukleniyor ? (
          <div
            className="w-full h-full rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#E8F5F5" }}
          >
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : fotoUrl ? (
          <img
            src={fotoUrl}
            alt="Profil fotoğrafı"
            className="w-full h-full rounded-2xl object-cover"
          />
        ) : (
          <div
            className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: "#E8F5F5" }}
          >
            <span className="text-4xl font-bold" style={{ color: "#0E7C7B" }}>{initials}</span>
            <span className="text-xs" style={{ color: "#0E7C7B" }}>Fotoğraf Yükle</span>
          </div>
        )}

        {/* Hover overlay */}
        {!yukleniyor && (
          <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/35 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={14} height={14}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> {fotoUrl ? "Değiştir" : "Yükle"}
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={dosyaSec}
        />
      </label>

      {mesaj && (
        <p className={`text-xs mt-2 text-center ${mesaj.tip === "hata" ? "text-red-500" : "text-green-600"}`}>
          {mesaj.metin}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-1 text-center">Maks. 2MB · JPG/PNG/WEBP</p>
    </div>
  );
}
