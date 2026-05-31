"use client";
import { useEffect, useState } from "react";

export default function YorumBolumu({ tercumanId }) {
  const [yorumlar, setYorumlar] = useState([]);
  const [formAcik, setFormAcik] = useState(false);
  const [form, setForm] = useState({ yazan_adi: "", puan: 5, metin: "" });
  const [kvkk, setKvkk] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  function yenile() {
    setYukleniyor(true);
    fetch(`/api/tercuman/yorumlar?tercuman_id=${tercumanId}`)
      .then(r => r.json())
      .then(data => setYorumlar(data.yorumlar || []))
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }
  useEffect(yenile, [tercumanId]);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    setGonderiliyor(true);
    try {
      const r = await fetch("/api/tercuman/yorumlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tercuman_id: tercumanId, kvkk_onaylandi: kvkk }),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Gönderilemedi.");
      else {
        setMesaj(data.mesaj);
        setForm({ yazan_adi: "", puan: 5, metin: "" });
        setKvkk(false);
        setFormAcik(false);
      }
    } catch { setHata("Sunucu hatası."); }
    setGonderiliyor(false);
  }

  const ort = yorumlar.length > 0 ? (yorumlar.reduce((s, y) => s + y.puan, 0) / yorumlar.length).toFixed(1) : null;
  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="font-bold" style={{ color: "var(--navy)" }}>⭐ Yorumlar</h2>
          {ort && <div className="text-xs text-gray-500">Ortalama: {ort}/5 · {yorumlar.length} yorum</div>}
        </div>
        <button onClick={() => setFormAcik(!formAcik)} style={{ backgroundColor: "var(--teal)" }} className="text-white text-xs px-3 py-1.5 rounded-lg font-semibold">
          {formAcik ? "İptal" : "Yorum Yaz"}
        </button>
      </div>

      {formAcik && (
        <form onSubmit={gonder} className="border border-gray-200 rounded-xl p-3 mb-3 space-y-2">
          <input required minLength={2} placeholder="Adınız" value={form.yazan_adi} onChange={(e) => setForm({ ...form, yazan_adi: e.target.value })} className={inp} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Puan:</span>
            {[1, 2, 3, 4, 5].map((p) => (
              <button key={p} type="button" onClick={() => setForm({ ...form, puan: p })}
                      className={`text-xl ${p <= form.puan ? "text-amber-400" : "text-gray-300"}`}>★</button>
            ))}
          </div>
          <textarea required rows={3} minLength={15} placeholder="Tercüme deneyiminizi paylaşın…" value={form.metin}
                    onChange={(e) => setForm({ ...form, metin: e.target.value })} className={inp} />
          <label className="flex items-start gap-2 text-[11px] text-gray-600">
            <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} required />
            <span>KVKK kapsamında yorumumun yayınlanmasını onaylıyorum.</span>
          </label>
          <button type="submit" disabled={gonderiliyor || !kvkk}
                  style={{ backgroundColor: "var(--navy)" }}
                  className="w-full text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-40">
            {gonderiliyor ? "Gönderiliyor…" : "Yorumu Gönder"}
          </button>
          {hata && <div className="text-xs text-red-600">{hata}</div>}
          {mesaj && <div className="text-xs text-green-700">{mesaj}</div>}
        </form>
      )}

      {yukleniyor ? (
        <div className="text-sm text-gray-400">Yükleniyor…</div>
      ) : yorumlar.length === 0 ? (
        <div className="text-sm text-gray-400">Henüz yorum yok. İlk yorumu siz yapın.</div>
      ) : (
        <ul className="space-y-3">
          {yorumlar.map((y) => (
            <li key={y.id} className="border-b border-gray-100 pb-2 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-semibold text-gray-800">
                  {y.yazan_adi} {y.dogrulanmis && <span className="text-[10px] text-teal-600 ml-1">✓ Doğrulanmış</span>}
                </div>
                <div className="text-amber-400 text-sm">{"★".repeat(y.puan)}<span className="text-gray-200">{"★".repeat(5 - y.puan)}</span></div>
              </div>
              <p className="text-xs text-gray-700">{y.metin}</p>
              <div className="text-[10px] text-gray-400 mt-1">{new Date(y.created_at).toLocaleDateString("tr-TR")}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
