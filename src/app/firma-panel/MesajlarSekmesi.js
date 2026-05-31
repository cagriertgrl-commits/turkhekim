"use client";
import { useEffect, useState, useRef } from "react";

export default function MesajlarSekmesi({ tip }) {
  const [konusmalar, setKonusmalar] = useState([]);
  const [karsiTaraf, setKarsiTaraf] = useState([]);
  const [seciliKonusma, setSeciliKonusma] = useState(null);
  const [mesajlar, setMesajlar] = useState([]);
  const [girdi, setGirdi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const sonRef = useRef(null);

  async function yukleListe() {
    setYukleniyor(true);
    try {
      const r = await fetch("/api/pazaryeri/mesaj");
      const data = await r.json();
      setKonusmalar(data.konusmalar || []);
      setKarsiTaraf(data.karsiTaraf || []);
    } catch {}
    setYukleniyor(false);
  }

  async function konusmaAc(k) {
    setSeciliKonusma(k);
    const r = await fetch(`/api/pazaryeri/mesaj?konusma_id=${k.konusma_id}`);
    const data = await r.json();
    setMesajlar(data.mesajlar || []);
  }

  async function gonder(e) {
    e.preventDefault();
    if (!girdi.trim() || !seciliKonusma) return;
    setGonderiliyor(true);
    try {
      const alici_tip = tip === "firma" ? "doktor" : "firma";
      const r = await fetch("/api/pazaryeri/mesaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alici_tip,
          alici_id: seciliKonusma.karsi_taraf_id,
          mesaj: girdi,
        }),
      });
      if (r.ok) {
        setGirdi("");
        await konusmaAc(seciliKonusma);
      }
    } catch {}
    setGonderiliyor(false);
  }

  useEffect(() => { yukleListe(); }, []);
  useEffect(() => { sonRef.current?.scrollIntoView({ behavior: "smooth" }); }, [mesajlar]);

  const karsiBilgi = (id) => karsiTaraf.find(k => k.id === id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ minHeight: 500 }}>
      <div className="grid md:grid-cols-3 h-full" style={{ minHeight: 500 }}>
        <aside className="border-r border-gray-100 overflow-y-auto" style={{ maxHeight: 600 }}>
          {yukleniyor ? (
            <div className="p-6 text-center text-gray-400 text-sm">Yükleniyor…</div>
          ) : konusmalar.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">Konuşma yok</div>
          ) : (
            <ul>
              {konusmalar.map((k) => {
                const karsi = karsiBilgi(k.karsi_taraf_id);
                const aktif = seciliKonusma?.konusma_id === k.konusma_id;
                return (
                  <li key={k.konusma_id}>
                    <button onClick={() => konusmaAc(k)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 ${aktif ? "bg-teal-50" : ""}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
                          {karsi?.logo_url || karsi?.foto_url
                            ? <img src={karsi.logo_url || karsi.foto_url} alt="" className="w-full h-full object-cover" />
                            : (tip === "firma" ? "👨‍⚕️" : "🏢")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">
                            {karsi ? (karsi.ad ? `${tip === "firma" ? "Dr. " : ""}${karsi.ad} ${karsi.soyad || ""}` : "—") : "Bilinmeyen"}
                          </div>
                          <div className="text-[11px] text-gray-500 truncate">{k.son_mesaj}</div>
                        </div>
                        {k.okunmamis > 0 && (
                          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{k.okunmamis}</span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <div className="md:col-span-2 flex flex-col" style={{ maxHeight: 600 }}>
          {!seciliKonusma ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              ← Konuşma seçin
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                {mesajlar.map((m) => {
                  const bana = m.alici_tip === tip;
                  return (
                    <div key={m.id} className={`flex ${bana ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                        bana ? "bg-white border border-gray-200 text-gray-800" : "text-white"
                      }`} style={bana ? {} : { backgroundColor: "var(--teal)" }}>
                        {m.mesaj}
                        <div className={`text-[10px] mt-1 ${bana ? "text-gray-400" : "text-white/70"}`}>
                          {new Date(m.created_at).toLocaleString("tr-TR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={sonRef} />
              </div>
              <form onSubmit={gonder} className="border-t border-gray-100 p-3 flex gap-2">
                <textarea rows={1} value={girdi} onChange={(e) => setGirdi(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); gonder(e); } }}
                          placeholder="Mesaj yaz…" maxLength={4000}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-teal-500" />
                <button type="submit" disabled={gonderiliyor || !girdi.trim()}
                        style={{ backgroundColor: "var(--navy)" }}
                        className="text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40">
                  Gönder
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
