"use client";

import { useState } from "react";

export default function SoruPanel({ sorular: baslangicSorular }) {
  const [sorular, setSorular] = useState(baslangicSorular);
  const [yanitlar, setYanitlar] = useState({});
  const [yukleniyor, setYukleniyor] = useState({});
  const [mesajlar, setMesajlar] = useState({});

  const bekleyenler = sorular.filter((s) => !s.yanit);
  const yanitlananlar = sorular.filter((s) => s.yanit);

  async function yanitle(soruId) {
    const yanit = yanitlar[soruId]?.trim();
    if (!yanit) return;

    setYukleniyor((prev) => ({ ...prev, [soruId]: true }));

    const res = await fetch("/api/soru-yanit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soru_id: soruId, yanit }),
    });

    const data = await res.json();
    setYukleniyor((prev) => ({ ...prev, [soruId]: false }));

    if (res.ok) {
      setSorular((prev) =>
        prev.map((s) => (s.id === soruId ? { ...s, yanit } : s))
      );
      setYanitlar((prev) => ({ ...prev, [soruId]: "" }));
      setMesajlar((prev) => ({ ...prev, [soruId]: "basari" }));
    } else {
      setMesajlar((prev) => ({ ...prev, [soruId]: data.hata || "Hata oluştu." }));
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
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

      {sorular.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">❓</p>
          <p className="text-gray-400 text-sm">Henüz soru yok.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bekleyen sorular */}
          {bekleyenler.map((s) => (
            <div key={s.id} className="rounded-xl p-4 border" style={{ borderColor: "#FED7AA", backgroundColor: "#FFFBEB" }}>
              <div className="flex items-start gap-2 mb-3">
                <div style={{ backgroundColor: "#FEF3C7", color: "#D97706" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {s.soran_adi[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">{s.soran_adi}</span>
                    <span className="text-xs text-gray-400">{new Date(s.created_at).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5">{s.soru}</p>
                </div>
              </div>
              <textarea
                value={yanitlar[s.id] || ""}
                onChange={(e) => setYanitlar((prev) => ({ ...prev, [s.id]: e.target.value }))}
                placeholder="Yanıtınızı yazın..."
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none mb-2"
              />
              {mesajlar[s.id] && mesajlar[s.id] !== "basari" && (
                <p className="text-xs text-red-500 mb-2">{mesajlar[s.id]}</p>
              )}
              <button
                onClick={() => yanitle(s.id)}
                disabled={yukleniyor[s.id] || !yanitlar[s.id]?.trim()}
                style={{ backgroundColor: "#0E7C7B" }}
                className="text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-50"
              >
                {yukleniyor[s.id] ? "Kaydediliyor..." : "Yanıtla"}
              </button>
            </div>
          ))}

          {/* Yanıtlananlar */}
          {yanitlananlar.map((s) => (
            <div key={s.id} className="rounded-xl p-4 border border-gray-100" style={{ backgroundColor: "#F5F7FA" }}>
              <div className="flex items-start gap-2 mb-2">
                <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {s.soran_adi[0]}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-700">{s.soran_adi}</span>
                    <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-0.5 rounded-full">✓ Yanıtlandı</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{s.soru}</p>
                </div>
              </div>
              <div className="pl-3 border-l-2 mt-2" style={{ borderColor: "#0E7C7B" }}>
                <p className="text-sm text-gray-700">{s.yanit}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
