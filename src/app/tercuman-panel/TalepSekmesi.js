"use client";
import { useEffect, useState } from "react";

const HIZMET_AD = {
  yuz_yuze: "Yüz Yüze", telefon: "Telefon", video: "Video", yazili: "Yazılı"
};

export default function TalepSekmesi({ tercumanId }) {
  const [talepler, setTalepler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  async function yukle() {
    setYukleniyor(true);
    try {
      const r = await fetch("/api/tercuman/talepler");
      const data = await r.json();
      setTalepler(data.talepler || []);
    } catch {}
    setYukleniyor(false);
  }
  useEffect(() => { yukle(); }, []);

  async function durumGuncelle(id, durum) {
    if (durum === "atandi" && !confirm("Bu talebi üstleniyorsunuz. Onaylıyor musunuz?")) return;
    const r = await fetch(`/api/tercuman/talepler/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durum }),
    });
    if (r.ok) await yukle();
    else { const data = await r.json(); alert(data.hata || "Hata"); }
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">📨 Gelen Talepler</h2>
        <button onClick={yukle} className="text-xs text-gray-500 hover:text-gray-800">Yenile</button>
      </div>

      {yukleniyor ? (
        <div className="text-sm text-gray-400">Yükleniyor…</div>
      ) : talepler.length === 0 ? (
        <div className="text-sm text-gray-400 py-4 text-center">Açık talep yok.</div>
      ) : (
        <div className="space-y-3">
          {talepler.map((t) => {
            const benimMi = t.atanan_tercuman_id === tercumanId;
            return (
              <div key={t.id} className={`border rounded-xl p-4 ${benimMi ? "border-teal-300 bg-teal-50/30" : "border-gray-200"}`}>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div className="flex flex-wrap gap-2 items-center text-xs">
                    <span className="font-bold text-gray-900">{t.dil_kaynak} → {t.dil_hedef}</span>
                    <span className="text-gray-500">· {HIZMET_AD[t.hizmet_tipi] || t.hizmet_tipi}</span>
                    {t.lokasyon && <span className="text-gray-500">· 📍 {t.lokasyon}</span>}
                    {t.sure_saat && <span className="text-gray-500">· ⏱ {t.sure_saat}h</span>}
                    {benimMi && <span className="bg-teal-500 text-white px-2 py-0.5 rounded-full text-[10px]">Size atandı</span>}
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(t.created_at).toLocaleDateString("tr-TR")}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap mb-2">{t.aciklama}</p>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="text-xs text-gray-500">
                    {t.tarih && <>🗓 {new Date(t.tarih).toLocaleDateString("tr-TR")} · </>}
                    {t.butce && <span className="font-semibold" style={{ color: "var(--teal)" }}>💰 {t.butce}</span>}
                    {t.talep_eden_iletisim && benimMi && <span className="ml-2">📧 {t.talep_eden_iletisim}</span>}
                  </div>
                  <div className="flex gap-2">
                    {!benimMi && t.durum === "acik" && (
                      <button onClick={() => durumGuncelle(t.id, "atandi")}
                              style={{ backgroundColor: "var(--teal)" }}
                              className="text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                        Üstlen
                      </button>
                    )}
                    {benimMi && (
                      <button onClick={() => durumGuncelle(t.id, "tamamlandi")}
                              style={{ backgroundColor: "var(--navy)" }}
                              className="text-white text-xs px-3 py-1.5 rounded-lg font-medium">
                        Tamamlandı
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
