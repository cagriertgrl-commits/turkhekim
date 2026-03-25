"use client";

import { useState } from "react";

const DURUM_RENK = {
  doktor_bekleniyor: { renk: "#D97706", bg: "#FFFBEB", metin: "Doktor Bekleniyor" },
  moderasyon_bekliyor: { renk: "#7C3AED", bg: "#F5F3FF", metin: "Moderasyon" },
  hasta_belge_bekliyor: { renk: "#0369A1", bg: "#F0F9FF", metin: "Belge Bekleniyor" },
  yayinlandi: { renk: "#059669", bg: "#F0FDF4", metin: "Yayında" },
  reddedildi: { renk: "#DC2626", bg: "#FFF1F2", metin: "Reddedildi" },
};

export default function AdminYorumModerasyon({ yorumlar, onYayinla, onReddet, onSil }) {
  const [moderasyonNotu, setModerayonNotu] = useState({});
  const moderasyonBekleyen = yorumlar.filter(y => y.dogrulama_durumu === "moderasyon_bekliyor");

  return (
    <div className="space-y-4">
      {/* Moderasyon Bekleyenler */}
      {moderasyonBekleyen.length > 0 && (
        <div>
          <h3 style={{ color: "#7C3AED" }} className="font-bold text-sm mb-3 flex items-center gap-2">
            Moderasyon Bekleyen ({moderasyonBekleyen.length})
            <span className="text-xs text-gray-400 font-normal">— Doktor muayene onayını verdi, sizin kararınızı bekliyor</span>
          </h3>
          {moderasyonBekleyen.map(y => (
            <div key={y.id} className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-400 mb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{y.hasta_adi?.[0]}</div>
                    <div>
                      <span className="font-semibold text-sm text-gray-900">{y.hasta_adi}</span>
                      <span className="text-gray-400 text-xs ml-2">{y.tarih}</span>
                    </div>
                    <div className="flex">{[...Array(y.puan || 0)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2 bg-gray-50 rounded-xl p-3">{y.metin}</p>
                  {y.doktor_adi && <p className="text-xs text-gray-400">Doktor: <strong>{y.doktor_adi}</strong></p>}
                  <div className="mt-3">
                    <input
                      value={moderasyonNotu[y.id] || ""}
                      onChange={e => setModerayonNotu({ ...moderasyonNotu, [y.id]: e.target.value })}
                      placeholder="Ret nedeni (opsiyonel)..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button onClick={() => onYayinla(y.id)} style={{ backgroundColor: "#059669" }} className="text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                    Yayınla
                  </button>
                  <button onClick={() => onReddet(y.id, moderasyonNotu[y.id] || "")} style={{ backgroundColor: "#DC2626" }} className="text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                    Reddet
                  </button>
                  <button onClick={() => onSil(y.id)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200">
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diğer Yorumlar */}
      <div>
        <h3 style={{ color: "#0D2137" }} className="font-bold text-sm mb-3">Tüm Yorumlar ({yorumlar.length})</h3>
        <div className="space-y-2">
          {yorumlar.filter(y => y.dogrulama_durumu !== "moderasyon_bekliyor").map(y => {
            const durum = DURUM_RENK[y.dogrulama_durumu || "doktor_bekleniyor"];
            return (
              <div key={y.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">{y.hasta_adi}</span>
                    <div className="flex">{[...Array(y.puan || 0)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}</div>
                    <span style={{ backgroundColor: durum?.bg, color: durum?.renk }} className="text-xs px-2 py-0.5 rounded-full">{durum?.metin}</span>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2">{y.metin}</p>
                </div>
                <button onClick={() => onSil(y.id)} className="text-gray-300 hover:text-red-400 text-xs flex-shrink-0 mt-1">Sil</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
