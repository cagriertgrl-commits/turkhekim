"use client";

import { useState, useRef } from "react";

export default function KlinikFotoYukle({ baslangicFotolar = [] }) {
  const [fotolar, setFotolar] = useState(baslangicFotolar);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const inputRef = useRef(null);

  async function fotoYukle(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;

    setHata("");
    setYukleniyor(true);

    const fd = new FormData();
    fd.append("foto", dosya);

    try {
      const res = await fetch("/api/klinik-foto", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Yükleme başarısız.");
      setFotolar(data.fotolar);
    } catch (err) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function fotoSil(url) {
    if (!confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) return;

    setHata("");
    try {
      const res = await fetch("/api/klinik-foto", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Silinemedi.");
      setFotolar(data.fotolar);
    } catch (err) {
      setHata(err.message);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 style={{ color: "#0D2137" }} className="font-semibold text-sm">
          Klinik / Muayenehane Fotoğrafları
        </h3>
        <span className="text-xs text-gray-400">{fotolar.length}/8 fotoğraf</span>
      </div>

      {hata && (
        <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {hata}
        </div>
      )}

      {/* Fotoğraf grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {fotolar.map((url) => (
          <div key={url} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-100">
            <img src={url} alt="Klinik fotoğrafı" className="w-full h-full object-cover" />
            <button
              onClick={() => fotoSil(url)}
              className="absolute inset-0 bg-black bg-opacity-50 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={14} height={14} style={{display:"inline"}}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Sil
            </button>
          </div>
        ))}

        {/* Yükle butonu */}
        {fotolar.length < 8 && (
          <label
            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-teal-400 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1"
            style={{ minHeight: "80px" }}
          >
            {yukleniyor ? (
              <span className="text-xs text-gray-400">Yükleniyor...</span>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} style={{color:"#9CA3AF"}}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span className="text-xs text-gray-400 text-center px-1">Fotoğraf ekle</span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={fotoYukle}
              disabled={yukleniyor}
            />
          </label>
        )}
      </div>

      <p className="text-xs text-gray-400">JPG, PNG veya WebP · Maksimum 5MB · En fazla 8 fotoğraf</p>
    </div>
  );
}
