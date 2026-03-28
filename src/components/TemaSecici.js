"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEMALAR = [
  { id: "beyaz", ad: "Beyaz", stil: { backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" } },
  { id: "varsayilan", ad: "Mavi", stil: { background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" } },
  { id: "turkuaz", ad: "Turkuaz", stil: { background: "linear-gradient(135deg, #0E7C7B 0%, #06B6D4 100%)" } },
  { id: "koyu", ad: "Koyu", stil: { background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)" } },
  { id: "mor", ad: "Mor", stil: { background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" } },
  { id: "pembe", ad: "Pembe", stil: { background: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)" } },
];

export default function TemaSecici({ mevcutTema, gizleBashlik = false }) {
  const router = useRouter();
  const [tema, setTema] = useState(mevcutTema || "varsayilan");
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  async function sec(yeniTema) {
    setTema(yeniTema);
    setKaydediliyor(true);
    setMesaj(null);
    try {
      const r = await fetch("/api/hesabim", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema: yeniTema }),
      });
      const data = await r.json();

      if (r.ok) {
        setMesaj("✓ Kaydedildi");
        // Sayfa yenileme (tema değişikliği hemen görünsün)
        setTimeout(() => {
          router.refresh();
        }, 500);
      } else {
        setMesaj("✗ " + (data.hata || "Kaydedilemedi"));
      }
    } catch {
      setMesaj("✗ Bağlantı hatası");
    } finally {
      setKaydediliyor(false);
    }
  }

  return (
    <div className={gizleBashlik ? "" : "mt-4 pt-4 border-t border-gray-100"}>
      {!gizleBashlik && (
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 font-medium">Hesabım Teması</p>
          {kaydediliyor && <span className="text-xs text-gray-400">Kaydediliyor…</span>}
          {mesaj && !kaydediliyor && <span className={`text-xs ${mesaj.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{mesaj}</span>}
        </div>
      )}
      {gizleBashlik && (kaydediliyor || mesaj) && (
        <div className="flex justify-end mb-2">
          {kaydediliyor && <span className="text-xs text-gray-400">Kaydediliyor…</span>}
          {mesaj && !kaydediliyor && <span className={`text-xs ${mesaj.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>{mesaj}</span>}
        </div>
      )}
      <div className="grid grid-cols-6 gap-1.5">
        {TEMALAR.map((t) => {
          return (
            <button
              key={t.id}
              onClick={() => sec(t.id)}
              title={t.ad}
              className={`relative h-8 rounded-lg border-2 transition-all ${
                tema === t.id ? "border-teal-500 shadow-sm" : "border-gray-200 hover:border-teal-300"
              }`}
              style={t.stil}
            >
              {tema === t.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow flex items-center justify-center">
                    <svg width="7" height="7" fill="none" stroke="#0E7C7B" strokeWidth="2.5" viewBox="0 0 8 8">
                      <path d="M1 4l2 2 4-4" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-6 gap-1.5 mt-2">
        {TEMALAR.map((t) => (
          <span key={t.id} className="text-xs text-gray-400 text-center">{t.ad}</span>
        ))}
      </div>
    </div>
  );
}
