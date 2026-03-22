"use client";

import { useState } from "react";
import SikayetModal from "./SikayetModal";

export default function YorumListesi({ yorumlar }) {
  const [sikayetYorumId, setSikayetYorumId] = useState(null);

  if (!yorumlar || yorumlar.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-4xl mb-3">💬</div>
        <p className="text-gray-400 text-sm">Henüz yayınlanmış yorum yok.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {yorumlar.map((yorum) => (
          <div key={yorum.id} data-testid="yorum-kart" className="p-4 rounded-xl border border-gray-100 hover:border-teal-100 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {yorum.hasta_adi[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">{yorum.hasta_adi}</span>
                    {yorum.dogrulanmis && (
                      <span style={{ backgroundColor: "#D1FAE5", color: "var(--success)" }} className="text-xs px-2 py-0.5 rounded-full">✓ Doğrulanmış</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{yorum.tarih}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(y => (
                    <span key={y} className={y <= yorum.puan ? "text-yellow-400" : "text-gray-200"} style={{ fontSize: 14 }}>★</span>
                  ))}
                </div>
                <button
                  onClick={() => setSikayetYorumId(yorum.id)}
                  title="Yorumu bildir"
                  className="text-gray-300 hover:text-red-400 transition-colors text-xs ml-1"
                  aria-label="Bildir"
                >
                  ⚑
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{yorum.metin}</p>
          </div>
        ))}
      </div>

      {sikayetYorumId && (
        <SikayetModal yorumId={sikayetYorumId} onKapat={() => setSikayetYorumId(null)} />
      )}
    </>
  );
}
