"use client";

import { useState, useEffect } from "react";

const DURUM_RENK = {
  bekliyor: { bg: "#FEF3C7", text: "#92400E", etiket: "Bekliyor" },
  onaylandi: { bg: "#D1FAE5", text: "#065F46", etiket: "Onaylandı" },
  iptal: { bg: "#FEE2E2", text: "#991B1B", etiket: "İptal" },
};

export default function RandevuPanel({ doktorId }) {
  const [randevular, setRandevular] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch(`/api/randevu?doktor_id=${doktorId}`)
      .then((r) => r.json())
      .then((data) => { setRandevular(data); setYukleniyor(false); });
  }, [doktorId]);

  async function durumGuncelle(id, yeniDurum) {
    await fetch("/api/randevu", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, durum: yeniDurum }),
    });
    setRandevular((prev) =>
      prev.map((r) => (r.id === id ? { ...r, durum: yeniDurum } : r))
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg">Randevu Talepleri</h2>
        <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-sm font-bold px-3 py-1 rounded-full">
          {randevular.filter((r) => r.durum === "bekliyor").length} bekliyor
        </span>
      </div>

      {yukleniyor ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ backgroundColor: "#F5F7FA" }} className="h-16 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : randevular.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-400 text-sm">Henüz randevu talebi yok.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {randevular.map((r) => {
            const d = DURUM_RENK[r.durum] || DURUM_RENK.bekliyor;
            return (
              <div key={r.id} style={{ borderColor: "#F0F4F8" }} className="border rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{r.hasta_adi}</span>
                      <span style={{ backgroundColor: d.bg, color: d.text }} className="text-xs px-2 py-0.5 rounded-full font-medium">
                        {d.etiket}
                      </span>
                    </div>
                    <a href={`tel:${r.telefon}`} style={{ color: "#0E7C7B" }} className="text-sm font-medium hover:underline">
                      📞 {r.telefon}
                    </a>
                    {r.sikayet && (
                      <p className="text-xs text-gray-400 mt-1 truncate">💬 {r.sikayet}</p>
                    )}
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(r.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {r.durum === "bekliyor" && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => durumGuncelle(r.id, "onaylandi")}
                        style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80 transition-opacity"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => durumGuncelle(r.id, "iptal")}
                        style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80 transition-opacity"
                      >
                        İptal
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
