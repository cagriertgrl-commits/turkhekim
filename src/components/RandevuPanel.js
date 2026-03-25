"use client";

import { useState, useEffect } from "react";

const DURUM_RENK = {
  bekliyor: { bg: "#FEF3C7", text: "#92400E", etiket: "Bekliyor", ikon: "hourglass" },
  onaylandi: { bg: "#D1FAE5", text: "#065F46", etiket: "Onaylandı", ikon: "check" },
  iptal: { bg: "#FEE2E2", text: "#991B1B", etiket: "İptal", ikon: "x" },
  tamamlandi: { bg: "#EDE9FE", text: "#5B21B6", etiket: "Tamamlandı", ikon: "flag" },
};

const IPTAL_SEBEPLER = [
  { deger: "hasta_istedigi", etiket: "Hasta isteği ile" },
  { deger: "doktor_istedigi", etiket: "Doktor isteği ile" },
  { deger: "hasta_gelmedi", etiket: "Hasta gelmedi" },
  { deger: "yanlis_randevu", etiket: "Yanlış randevu" },
  { deger: "diger", etiket: "Diğer" },
];

function IptalModal({ randevu, onKapat, onOnayla }) {
  const [sebep, setSebep] = useState("");
  const [not, setNot] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="font-bold text-gray-900 mb-1">Randevuyu İptal Et</h3>
        <p className="text-sm text-gray-500 mb-4">{randevu.hasta_adi} adlı hastanın randevusu iptal edilecek.</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">İptal Sebebi <span className="text-red-500">*</span></label>
            <div className="space-y-1.5">
              {IPTAL_SEBEPLER.map((s) => (
                <label key={s.deger} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sebep"
                    value={s.deger}
                    checked={sebep === s.deger}
                    onChange={() => setSebep(s.deger)}
                    className="accent-red-500"
                  />
                  <span className="text-sm text-gray-700">{s.etiket}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Ek Not (opsiyonel)</label>
            <textarea
              value={not}
              onChange={(e) => setNot(e.target.value)}
              rows={2}
              placeholder="Hastaya iletilecek not..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400 resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onKapat} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
              Vazgeç
            </button>
            <button
              onClick={() => sebep && onOnayla(randevu.id, sebep, not)}
              disabled={!sebep}
              style={{ backgroundColor: "#DC2626" }}
              className="flex-1 text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-40"
            >
              İptal Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RandevuPanel({ doktorId }) {
  const [randevular, setRandevular] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [iptalRandevu, setIptalRandevu] = useState(null);
  const [filtre, setFiltre] = useState("bekliyor");

  useEffect(() => {
    fetch(`/api/randevu?doktor_id=${doktorId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => { setRandevular(Array.isArray(data) ? data : []); })
      .catch((err) => console.error("Randevu yükleme hatası:", err))
      .finally(() => setYukleniyor(false));
  }, [doktorId]);

  async function durumGuncelle(id, yeniDurum, sebep, not) {
    try {
      const res = await fetch("/api/randevu-durum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ randevu_id: id, durum: yeniDurum, doktor_notu: not || null, iptal_sebep: sebep || null }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setRandevular((prev) =>
        prev.map((r) => r.id === id ? { ...r, durum: yeniDurum, doktor_notu: not || r.doktor_notu, iptal_sebep: sebep || null } : r)
      );
      setIptalRandevu(null);
    } catch (err) {
      console.error("Randevu durum güncelleme hatası:", err);
    }
  }

  const filtreliler = filtre === "hepsi" ? randevular : randevular.filter((r) => r.durum === filtre);
  const bekleyenSayi = randevular.filter((r) => r.durum === "bekliyor").length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg">Randevu Talepleri</h2>
        {bekleyenSayi > 0 && (
          <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-sm font-bold px-3 py-1 rounded-full">
            {bekleyenSayi} bekliyor
          </span>
        )}
      </div>

      {/* Filtre */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {[
          { k: "bekliyor", e: "Bekliyor" },
          { k: "onaylandi", e: "Onaylı" },
          { k: "tamamlandi", e: "Tamamlanan" },
          { k: "iptal", e: "İptal" },
          { k: "hepsi", e: "Tümü" },
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

      {yukleniyor ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ backgroundColor: "#F5F7FA" }} className="h-16 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtreliler.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-3" style={{color:"#CBD5E1"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={44} height={44}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
          <p className="text-gray-400 text-sm">Bu kategoride randevu yok.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtreliler.map((r) => {
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>{r.telefon}
                    </a>
                    {r.tarih && (
                      <p className="text-xs font-medium mt-1" style={{ color: "#0D2137" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>{new Date(r.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" })}
                        {r.saat && <span style={{ color: "#0E7C7B" }}> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:2}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{r.saat}</span>}
                      </p>
                    )}
                    {r.sikayet && (
                      <p className="text-xs text-gray-400 mt-1 truncate"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={12} height={12} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>{r.sikayet}</p>
                    )}
                    {r.iptal_sebep && (
                      <p className="text-xs text-red-400 mt-1">
                        İptal sebebi: {IPTAL_SEBEPLER.find(s => s.deger === r.iptal_sebep)?.etiket || r.iptal_sebep}
                      </p>
                    )}
                    {r.doktor_notu && (
                      <p className="text-xs text-gray-400 mt-1 italic">Not: {r.doktor_notu}</p>
                    )}
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(r.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    {r.durum === "bekliyor" && (
                      <>
                        <button
                          onClick={() => durumGuncelle(r.id, "onaylandi")}
                          style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => setIptalRandevu(r)}
                          style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80"
                        >
                          İptal
                        </button>
                      </>
                    )}
                    {r.durum === "onaylandi" && (
                      <>
                        <button
                          onClick={() => durumGuncelle(r.id, "tamamlandi")}
                          style={{ backgroundColor: "#EDE9FE", color: "#5B21B6" }}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80"
                        >
                          Tamamlandı
                        </button>
                        <button
                          onClick={() => setIptalRandevu(r)}
                          style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-80"
                        >
                          İptal
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {iptalRandevu && (
        <IptalModal
          randevu={iptalRandevu}
          onKapat={() => setIptalRandevu(null)}
          onOnayla={durumGuncelle}
        />
      )}
    </div>
  );
}
