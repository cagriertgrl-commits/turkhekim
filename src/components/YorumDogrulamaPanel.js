"use client";
import { useState } from "react";

const DURUM_ETIKET = {
  doktor_bekleniyor: { metin: "Doktor Onayı Bekleniyor", renk: "#D97706", bg: "#FFFBEB" },
  moderasyon_bekliyor: { metin: "Moderasyon Bekliyor", renk: "#7C3AED", bg: "#F5F3FF" },
  hasta_belge_bekliyor: { metin: "Hasta Belge Bekleniyor", renk: "#0369A1", bg: "#F0F9FF" },
  yayinlandi: { metin: "Yayınlandı ✓", renk: "#059669", bg: "#F0FDF4" },
  reddedildi: { metin: "Reddedildi", renk: "#DC2626", bg: "#FFF1F2" },
};

export default function YorumDogrulamaPanel({ dogrulamalar = [] }) {
  const [liste, setListe] = useState(dogrulamalar);
  const [yukleniyor, setYukleniyor] = useState(null);

  async function karar(yorum_id, karar) {
    setYukleniyor(yorum_id + karar);
    try {
      await fetch("/api/yorum-dogrulama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yorum_id, karar }),
      });
      setListe(liste.map((d) =>
        d.yorum_id === yorum_id
          ? { ...d, durum: karar === "onayla" ? "moderasyon_bekliyor" : "hasta_belge_bekliyor" }
          : d
      ));
    } catch {}
    setYukleniyor(null);
  }

  const bekleyenler = liste.filter((d) => d.durum === "doktor_bekleniyor");
  const digerler = liste.filter((d) => d.durum !== "doktor_bekleniyor");

  if (liste.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg flex items-center gap-2">
          🔍 Yorum Doğrulama
        </h2>
        {bekleyenler.length > 0 && (
          <span style={{ backgroundColor: "#FFF3CD", color: "#D97706" }} className="text-xs px-2 py-1 rounded-full font-bold">
            {bekleyenler.length} bekliyor
          </span>
        )}
      </div>

      {bekleyenler.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-3">Aşağıdaki hastalar size yorum yazmak istiyor. Bu kişiler size gerçekten muayeneye geldi mi?</p>
          <div className="space-y-3">
            {bekleyenler.map((d) => (
              <div key={d.id} style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }} className="border rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p style={{ color: "#0D2137" }} className="font-semibold text-sm">{d.hasta_adi}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(d.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })} tarihinde yorum talebi
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => karar(d.yorum_id, "onayla")}
                      disabled={!!yukleniyor}
                      style={{ backgroundColor: "#059669" }}
                      className="text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50 hover:opacity-90"
                    >
                      ✓ Evet, geldi
                    </button>
                    <button
                      onClick={() => karar(d.yorum_id, "reddet")}
                      disabled={!!yukleniyor}
                      style={{ backgroundColor: "#DC2626" }}
                      className="text-white text-xs px-3 py-1.5 rounded-lg font-medium disabled:opacity-50 hover:opacity-90"
                    >
                      ✕ Hayır
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {digerler.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-400 font-medium mb-2">Geçmiş Doğrulamalar</p>
          {digerler.slice(0, 5).map((d) => {
            const durum = DURUM_ETIKET[d.durum] || DURUM_ETIKET.doktor_bekleniyor;
            return (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{d.hasta_adi}</span>
                <span style={{ backgroundColor: durum.bg, color: durum.renk }} className="text-xs px-2 py-1 rounded-full font-medium">
                  {durum.metin}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
