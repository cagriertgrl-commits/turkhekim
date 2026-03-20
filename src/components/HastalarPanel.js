"use client";

import { useState } from "react";

export default function HastalarPanel({ gorusmeler }) {
  const [acikId, setAcikId] = useState(null);

  if (!gorusmeler || gorusmeler.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Hastalarım</h2>
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🩺</p>
          <p className="text-gray-400 text-sm">Henüz kaydedilmiş görüşme yok.</p>
          <a href="/gorusme-ozet" className="inline-block mt-3 text-xs text-purple-600 underline hover:opacity-80">
            Görüşme Özetle →
          </a>
        </div>
      </div>
    );
  }

  // Hasta bazında grupla
  const hastalar = {};
  for (const g of gorusmeler) {
    const anahtar = [g.hasta_ad, g.hasta_soyad].filter(Boolean).join(" ") || g.hasta_adi || "İsimsiz Hasta";
    if (!hastalar[anahtar]) hastalar[anahtar] = [];
    hastalar[anahtar].push(g);
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg">Hastalarım</h2>
        <div className="flex items-center gap-2">
          <span style={{ backgroundColor: "#F5F3FF", color: "#7C3AED" }} className="text-xs font-bold px-3 py-1 rounded-full">
            {Object.keys(hastalar).length} hasta
          </span>
          <a href="/gorusme-ozet" style={{ backgroundColor: "#7C3AED" }} className="text-white text-xs px-3 py-1.5 rounded-lg hover:opacity-90">
            + Yeni Görüşme
          </a>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(hastalar).map(([hastaAdi, kayitlar]) => (
          <div key={hastaAdi} className="border border-gray-100 rounded-xl overflow-hidden">
            {/* Hasta başlığı */}
            <button
              onClick={() => setAcikId(acikId === hastaAdi ? null : hastaAdi)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div style={{ backgroundColor: "#F5F3FF", color: "#7C3AED" }} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {hastaAdi.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{hastaAdi}</div>
                  <div className="text-gray-400 text-xs">{kayitlar.length} görüşme</div>
                </div>
              </div>
              <span className="text-gray-400 text-xs">{acikId === hastaAdi ? "▲" : "▼"}</span>
            </button>

            {/* Görüşme listesi */}
            {acikId === hastaAdi && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {kayitlar.map((kayit) => (
                  <GorusmeKarti key={kayit.id} kayit={kayit} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GorusmeKarti({ kayit }) {
  const [detayAcik, setDetayAcik] = useState(false);

  const tarih = new Date(kayit.created_at).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="px-4 py-3 bg-white">
      <button
        onClick={() => setDetayAcik(!detayAcik)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-purple-500 text-sm">🎙️</span>
          <span className="text-sm text-gray-700">{tarih}</span>
        </div>
        <span className="text-gray-400 text-xs">{detayAcik ? "Kapat" : "Görüşmeyi Gör"}</span>
      </button>

      {detayAcik && (
        <div className="mt-3 space-y-3">
          {/* Transkript */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1">📝 Transkript</div>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed max-h-32 overflow-y-auto">
              {kayit.transkript}
            </div>
          </div>
          {/* Özet */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1">✨ AI Özeti</div>
            <div className="bg-purple-50 rounded-lg p-3 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {kayit.ozet}
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(kayit.ozet)}
            className="text-xs text-purple-600 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50"
          >
            📋 Özeti Kopyala
          </button>
        </div>
      )}
    </div>
  );
}
