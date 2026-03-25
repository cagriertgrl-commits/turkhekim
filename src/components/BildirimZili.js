"use client";
import { useState, useEffect, useRef } from "react";

export default function BildirimZili() {
  const [bildirimler, setBildirimler] = useState([]);
  const [okunmamis, setOkunmamis] = useState(0);
  const [acik, setAcik] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    yukle();
    const interval = setInterval(yukle, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function disariTikla(e) {
      if (ref.current && !ref.current.contains(e.target)) setAcik(false);
    }
    document.addEventListener("mousedown", disariTikla);
    return () => document.removeEventListener("mousedown", disariTikla);
  }, []);

  async function yukle() {
    try {
      const res = await fetch("/api/bildirim");
      const veri = await res.json();
      setBildirimler(veri.bildirimler || []);
      setOkunmamis(veri.okunmamis || 0);
    } catch (err) {
      console.error("Bildirim yükleme hatası:", err);
    }
  }

  async function tumunuOku() {
    try {
      const res = await fetch("/api/bildirim", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setBildirimler(bildirimler.map((b) => ({ ...b, okundu: true })));
      setOkunmamis(0);
    } catch (err) {
      console.error("Bildirimleri okundu işaretleme hatası:", err);
    }
  }

  const tipIkon = {
    yorum_dogrulama: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    randevu_durumu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    yorum_moderasyon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    anlaşmazlik: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  };
  const varsayilanIkon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setAcik(!acik)}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
        title="Bildirimler"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {okunmamis > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
            {okunmamis > 9 ? "9+" : okunmamis}
          </span>
        )}
      </button>

      {acik && (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span style={{ color: "#0D2137" }} className="font-bold text-sm">Bildirimler</span>
            {okunmamis > 0 && (
              <button onClick={tumunuOku} className="text-xs" style={{ color: "#0E7C7B" }}>
                Tümünü okundu işaretle
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {bildirimler.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">Bildirim yok</div>
            ) : (
              bildirimler.map((b) => (
                <a
                  key={b.id}
                  href={b.link || "/panel"}
                  style={{ backgroundColor: b.okundu ? "#fff" : "#F0FDFA" }}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <span className="text-lg flex-shrink-0" style={{color:"#0D2137"}}>{tipIkon[b.tip] || varsayilanIkon}</span>
                  <div className="flex-1 min-w-0">
                    <p style={{ color: "#0D2137" }} className="font-semibold text-xs mb-0.5">{b.baslik}</p>
                    <p className="text-gray-500 text-xs line-clamp-2">{b.mesaj}</p>
                    <p className="text-gray-300 text-xs mt-1">
                      {new Date(b.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {!b.okundu && <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-1" />}
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
