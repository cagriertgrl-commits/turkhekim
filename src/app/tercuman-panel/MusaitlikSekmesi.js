"use client";
import { useEffect, useState } from "react";

export default function MusaitlikSekmesi({ tercumanId }) {
  const [slots, setSlots] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yeni, setYeni] = useState({ tarih: "", baslangic_saat: "09:00", bitis_saat: "12:00" });
  const [ekleniyor, setEkleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function yukle() {
    setYukleniyor(true);
    try {
      const r = await fetch(`/api/tercuman/musaitlik?tercuman_id=${tercumanId}`);
      const data = await r.json();
      setSlots(data.slots || []);
    } catch {}
    setYukleniyor(false);
  }
  useEffect(() => { if (tercumanId) yukle(); }, [tercumanId]);

  async function ekle(e) {
    e.preventDefault();
    setHata(null);
    setEkleniyor(true);
    try {
      const r = await fetch("/api/tercuman/musaitlik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(yeni),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Eklenemedi.");
      else { setYeni({ tarih: "", baslangic_saat: "09:00", bitis_saat: "12:00" }); await yukle(); }
    } catch { setHata("Sunucu hatası."); }
    setEkleniyor(false);
  }

  async function sil(id) {
    if (!confirm("Bu zaman dilimini silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/tercuman/musaitlik?id=${id}`, { method: "DELETE" });
    await yukle();
  }

  const inp = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Müsaitlik Takvimi</h2>

      <form onSubmit={ekle} className="grid sm:grid-cols-4 gap-2 mb-4 items-end">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Tarih</label>
          <input required type="date" value={yeni.tarih} onChange={(e) => setYeni({ ...yeni, tarih: e.target.value })} className={`${inp} w-full`} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Başlangıç</label>
          <input required type="time" value={yeni.baslangic_saat} onChange={(e) => setYeni({ ...yeni, baslangic_saat: e.target.value })} className={`${inp} w-full`} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Bitiş</label>
          <input required type="time" value={yeni.bitis_saat} onChange={(e) => setYeni({ ...yeni, bitis_saat: e.target.value })} className={`${inp} w-full`} />
        </div>
        <button type="submit" disabled={ekleniyor} style={{ backgroundColor: "var(--teal)" }}
                className="text-white text-sm py-2 rounded-lg font-semibold disabled:opacity-40">
          {ekleniyor ? "…" : "+ Ekle"}
        </button>
      </form>

      {hata && <div className="text-xs text-red-600 mb-3">{hata}</div>}

      {yukleniyor ? (
        <div className="text-sm text-gray-400">Yükleniyor…</div>
      ) : slots.length === 0 ? (
        <div className="text-sm text-gray-400 py-2">Henüz zaman dilimi eklenmedi.</div>
      ) : (
        <ul className="space-y-1">
          {slots.map((s) => (
            <li key={s.id} className="flex items-center justify-between border-b border-gray-100 py-2 text-sm">
              <span className="text-gray-700">
                {new Date(s.tarih).toLocaleDateString("tr-TR", { weekday: "short", day: "numeric", month: "short" })} ·
                <span className="font-semibold ml-1">{s.baslangic_saat?.slice(0, 5)} – {s.bitis_saat?.slice(0, 5)}</span>
                {s.dolu && <span className="ml-2 text-amber-600 text-xs">(Dolu)</span>}
              </span>
              {!s.dolu && (
                <button onClick={() => sil(s.id)} className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded">✕</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
