"use client";

import { useState } from "react";

export default function SoruPanel({ sorular: baslangicSorular }) {
  const [sorular, setSorular] = useState(baslangicSorular);
  const [yanitlar, setYanitlar] = useState({});
  const [yukleniyor, setYukleniyor] = useState({});
  const [mesajlar, setMesajlar] = useState({});
  const [duzenlenenId, setDuzenlenenId] = useState(null);
  const [filtre, setFiltre] = useState("bekleyen"); // bekleyen | yanitlanan | gizli

  const bekleyenler = sorular.filter((s) => !s.yanit);
  const yanitlananlar = sorular.filter((s) => s.yanit && !s.gizli);
  const gizliler = sorular.filter((s) => s.gizli);

  const gosterilenler = filtre === "bekleyen" ? bekleyenler : filtre === "yanitlanan" ? yanitlananlar : gizliler;

  async function yanitle(soruId) {
    const yanit = yanitlar[soruId]?.trim();
    if (!yanit || yanit.length < 5) return;
    setYukleniyor((p) => ({ ...p, [soruId]: true }));
    const endpoint = duzenlenenId === soruId ? "/api/soru-yanit" : "/api/soru-yanit";
    const method = duzenlenenId === soruId ? "PATCH" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soru_id: soruId, yanit }),
    });
    const data = await res.json();
    setYukleniyor((p) => ({ ...p, [soruId]: false }));
    if (res.ok) {
      setSorular((p) => p.map((s) => s.id === soruId ? { ...s, yanit } : s));
      setYanitlar((p) => ({ ...p, [soruId]: "" }));
      setDuzenlenenId(null);
      setMesajlar((p) => ({ ...p, [soruId]: "basari" }));
    } else {
      setMesajlar((p) => ({ ...p, [soruId]: data.hata || "Hata." }));
    }
  }

  async function gizleDegistir(soruId, gizli) {
    try {
      const res = await fetch("/api/soru", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soru_id: soruId, gizli }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSorular((p) => p.map((s) => s.id === soruId ? { ...s, gizli } : s));
    } catch {
      /* sessiz */
    }
  }

  async function soruSil(soruId) {
    if (!confirm("Bu soruyu silmek istiyor musunuz?")) return;
    const res = await fetch("/api/soru", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soru_id: soruId }),
    });
    if (res.ok) setSorular((p) => p.filter((s) => s.id !== soruId));
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg">Hasta Soruları</h2>
        <div className="flex gap-2">
          {bekleyenler.length > 0 && (
            <span style={{ backgroundColor: "#FEF3C7", color: "#D97706" }} className="text-xs font-bold px-3 py-1 rounded-full">
              {bekleyenler.length} bekliyor
            </span>
          )}
          <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs font-bold px-3 py-1 rounded-full">
            {sorular.length} toplam
          </span>
        </div>
      </div>

      {/* Filtre */}
      <div className="flex gap-1.5 mb-4">
        {[
          { k: "bekleyen", e: `Bekleyen (${bekleyenler.length})` },
          { k: "yanitlanan", e: `Yanıtlanan (${yanitlananlar.length})` },
          { k: "gizli", e: `Gizli (${gizliler.length})` },
        ].map(({ k, e }) => (
          <button
            key={k}
            onClick={() => setFiltre(k)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
            style={filtre === k
              ? { backgroundColor: "#0D2137", color: "white" }
              : { backgroundColor: "#F5F7FA", color: "#6B7280" }}
          >
            {e}
          </button>
        ))}
      </div>

      {gosterilenler.length === 0 ? (
        <div className="text-center py-10">
          <div className="flex justify-center mb-3" style={{color:"#CBD5E1"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={44} height={44}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <p className="text-gray-400 text-sm">Bu kategoride soru yok.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bekleyen sorular */}
          {filtre === "bekleyen" && gosterilenler.map((s) => (
            <div key={s.id} className="rounded-xl p-4 border" style={{ borderColor: "#FED7AA", backgroundColor: "#FFFBEB" }}>
              <div className="flex items-start gap-2 mb-3">
                <div style={{ backgroundColor: "#FEF3C7", color: "#D97706" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {s.soran_adi[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">{s.soran_adi}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString("tr-TR")}</span>
                      <button onClick={() => soruSil(s.id)} className="text-gray-300 hover:text-red-400 text-xs ml-1" title="Soruyu sil"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={13} height={13}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5">{s.soru}</p>
                </div>
              </div>
              <textarea
                value={yanitlar[s.id] || ""}
                onChange={(e) => setYanitlar((p) => ({ ...p, [s.id]: e.target.value }))}
                placeholder="Yanıtınızı yazın... (en az 5 karakter)"
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none mb-2"
              />
              {mesajlar[s.id] && mesajlar[s.id] !== "basari" && (
                <p className="text-xs text-red-500 mb-2">{mesajlar[s.id]}</p>
              )}
              <button
                onClick={() => yanitle(s.id)}
                disabled={yukleniyor[s.id] || (yanitlar[s.id]?.trim()?.length || 0) < 5}
                style={{ backgroundColor: "#0E7C7B" }}
                className="text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-50"
              >
                {yukleniyor[s.id] ? "Kaydediliyor..." : "Yanıtla"}
              </button>
            </div>
          ))}

          {/* Yanıtlananlar + gizliler */}
          {(filtre === "yanitlanan" || filtre === "gizli") && gosterilenler.map((s) => (
            <div key={s.id} className="rounded-xl p-4 border border-gray-100" style={{ backgroundColor: s.gizli ? "#FFF7ED" : "#F5F7FA" }}>
              <div className="flex items-start gap-2 mb-2">
                <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {s.soran_adi[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-700">{s.soran_adi}</span>
                    <div className="flex items-center gap-1.5">
                      {s.gizli
                        ? <span style={{ backgroundColor: "#FEF3C7", color: "#D97706" }} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={10} height={10}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg> Gizli</span>
                        : <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={10} height={10}><polyline points="20 6 9 17 4 12"/></svg> Yayında</span>
                      }
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{s.soru}</p>
                </div>
              </div>

              {duzenlenenId === s.id ? (
                <div className="mt-2">
                  <textarea
                    value={yanitlar[s.id] ?? s.yanit}
                    onChange={(e) => setYanitlar((p) => ({ ...p, [s.id]: e.target.value }))}
                    rows={3}
                    className="w-full border border-teal-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none mb-2"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => { setDuzenlenenId(null); setYanitlar((p) => ({ ...p, [s.id]: "" })); }} className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600">İptal</button>
                    <button onClick={() => yanitle(s.id)} disabled={yukleniyor[s.id]} style={{ backgroundColor: "#0E7C7B" }} className="text-xs px-3 py-1.5 rounded-lg text-white font-medium hover:opacity-90 disabled:opacity-50">
                      {yukleniyor[s.id] ? "..." : "Kaydet"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pl-3 border-l-2 mt-2 mb-2" style={{ borderColor: "#0E7C7B" }}>
                  <p className="text-sm text-gray-700">{s.yanit}</p>
                </div>
              )}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => { setDuzenlenenId(s.id); setYanitlar((p) => ({ ...p, [s.id]: s.yanit })); }}
                  className="text-xs px-2.5 py-1 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Düzenle
                </button>
                <button
                  onClick={() => gizleDegistir(s.id, !s.gizli)}
                  className="text-xs px-2.5 py-1 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
                >
                  {s.gizli ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>Yayına Al</> : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>Gizle</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
