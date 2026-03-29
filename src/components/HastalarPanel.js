"use client";

import { useState } from "react";
import Link from "next/link";

export default function HastalarPanel({ gorusmeler }) {
  const [acikId, setAcikId] = useState(null);

  if (!gorusmeler || gorusmeler.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Hastalarım</h2>
        <div className="text-center py-10">
          <div className="flex justify-center mb-3" style={{color:"#CBD5E1"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={44} height={44}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg></div>
          <p className="text-gray-400 text-sm">Henüz kaydedilmiş görüşme yok.</p>
          <Link href="/gorusme-ozet" className="inline-block mt-3 text-xs text-purple-600 underline hover:opacity-80">
            Görüşme Özetle →
          </Link>
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
          <Link href="/gorusme-ozet" style={{ backgroundColor: "#7C3AED" }} className="text-white text-xs px-3 py-1.5 rounded-lg hover:opacity-90">
            + Yeni Görüşme
          </Link>
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
          <span className="text-purple-500 text-sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={14} height={14}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></span>
          <span className="text-sm text-gray-700">{tarih}</span>
        </div>
        <span className="text-gray-400 text-xs">{detayAcik ? "Kapat" : "Görüşmeyi Gör"}</span>
      </button>

      {detayAcik && (
        <div className="mt-3 space-y-3">
          {/* Transkript */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Transkript</div>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed max-h-32 overflow-y-auto">
              {kayit.transkript}
            </div>
          </div>
          {/* Özet */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> AI Özeti</div>
            <div className="bg-purple-50 rounded-lg p-3 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
              {kayit.ozet}
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(kayit.ozet)}
            className="text-xs text-purple-600 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Özeti Kopyala
          </button>
        </div>
      )}
    </div>
  );
}
