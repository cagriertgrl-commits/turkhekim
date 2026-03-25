"use client";
import { useState } from "react";

const TIP_ETIKETLER = {
  makale: { etiket: "Makale", renk: "#1E40AF", bg: "#EFF6FF" },
  haber: { etiket: "Haber", renk: "#065F46", bg: "#ECFDF5" },
  dergi: { etiket: "Dergi", renk: "#7C3AED", bg: "#F5F3FF" },
  kitap: { etiket: "Kitap", renk: "#92400E", bg: "#FFFBEB" },
  video: { etiket: "Video", renk: "#DC2626", bg: "#FFF1F2" },
  sosyal: { etiket: "Sosyal Medya", renk: "#0369A1", bg: "#F0F9FF" },
};

export default function MedyaPanel({ baslangicMedya = [] }) {
  const [medya, setMedya] = useState(baslangicMedya);
  const [form, setForm] = useState({ tip: "makale", baslik: "", aciklama: "", url: "", yayin_tarihi: "" });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [formAcik, setFormAcik] = useState(false);

  async function ekle() {
    if (!form.baslik.trim()) { setHata("Başlık zorunlu."); return; }
    setYukleniyor(true);
    setHata("");
    try {
      const res = await fetch("/api/doktor-medya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const veri = await res.json();
      if (res.ok) {
        setMedya([veri.medya, ...medya]);
        setForm({ tip: "makale", baslik: "", aciklama: "", url: "", yayin_tarihi: "" });
        setFormAcik(false);
      } else {
        setHata(veri.hata || "Hata oluştu.");
      }
    } catch { setHata("Bağlantı hatası."); }
    setYukleniyor(false);
  }

  async function sil(id) {
    try {
      const res = await fetch(`/api/doktor-medya?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setMedya(medya.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Medya silme hatası:", err);
      setHata("Silme işlemi başarısız.");
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ color: "#0D2137" }} className="font-bold text-lg flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={20} height={20}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="18" y2="14"/></svg> Yayınlar & Medya
        </h2>
        <button
          onClick={() => setFormAcik(!formAcik)}
          style={{ backgroundColor: "#0E7C7B" }}
          className="text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:opacity-90"
        >
          + Ekle
        </button>
      </div>

      {formAcik && (
        <div style={{ backgroundColor: "#F5F7FA" }} className="rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Tür</label>
              <select
                value={form.tip}
                onChange={(e) => setForm({ ...form, tip: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                {Object.entries(TIP_ETIKETLER).map(([k, v]) => (
                  <option key={k} value={k}>{v.etiket}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Yayın Tarihi</label>
              <input
                type="date"
                value={form.yayin_tarihi}
                onChange={(e) => setForm({ ...form, yayin_tarihi: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Başlık *</label>
            <input
              value={form.baslik}
              onChange={(e) => setForm({ ...form, baslik: e.target.value })}
              placeholder="Makale/haber başlığı"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Açıklama</label>
            <textarea
              value={form.aciklama}
              onChange={(e) => setForm({ ...form, aciklama: e.target.value })}
              rows={2}
              placeholder="Kısa özet..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Bağlantı URL</label>
            <input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          {hata && <p className="text-xs text-red-500">{hata}</p>}
          <div className="flex gap-2">
            <button
              onClick={ekle}
              disabled={yukleniyor}
              style={{ backgroundColor: "#0D2137" }}
              className="flex-1 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {yukleniyor ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => setFormAcik(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-500 border border-gray-200"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {medya.length === 0 ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-2" style={{color:"#CBD5E1"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={44} height={44}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="18" y2="14"/></svg></div>
          <p className="text-gray-400 text-sm">Henüz yayın eklenmemiş.</p>
          <p className="text-gray-400 text-xs mt-1">Makale, haber veya sosyal medya paylaşımlarınızı ekleyin.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {medya.map((m) => {
            const tip = TIP_ETIKETLER[m.tip] || TIP_ETIKETLER.makale;
            return (
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <span
                  style={{ backgroundColor: tip.bg, color: tip.renk }}
                  className="text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0 mt-0.5"
                >
                  {tip.etiket}
                </span>
                <div className="flex-1 min-w-0">
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "#0D2137" }} className="font-semibold text-sm hover:underline line-clamp-1">
                      {m.baslik}
                    </a>
                  ) : (
                    <p style={{ color: "#0D2137" }} className="font-semibold text-sm line-clamp-1">{m.baslik}</p>
                  )}
                  {m.aciklama && <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{m.aciklama}</p>}
                  {m.yayin_tarihi && <p className="text-gray-400 text-xs mt-0.5">{new Date(m.yayin_tarihi).toLocaleDateString("tr-TR")}</p>}
                </div>
                <button onClick={() => sil(m.id)} className="text-gray-300 hover:text-red-400 transition-colors text-xs flex-shrink-0">
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
