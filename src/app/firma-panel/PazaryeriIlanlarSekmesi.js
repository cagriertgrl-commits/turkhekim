"use client";
import { useEffect, useState } from "react";
import { PAZARYERI_KATEGORILERI, STOK_DURUMU, kategoriBul } from "@/lib/pazaryeriKategorileri";

export default function PazaryeriIlanlarSekmesi({ firmaId }) {
  const [ilanlar, setIlanlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [formAcik, setFormAcik] = useState(false);
  const [form, setForm] = useState({
    baslik: "", kategori: "", aciklama: "",
    fiyat_min: "", fiyat_max: "", para_birimi: "TRY", stok_durumu: "stokta",
  });
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function yukle() {
    setYukleniyor(true);
    try {
      const r = await fetch(`/api/pazaryeri/ilanlar?firma_id=${firmaId}`);
      const data = await r.json();
      setIlanlar(data.ilanlar || []);
    } catch {}
    setYukleniyor(false);
  }

  useEffect(() => { yukle(); }, [firmaId]);

  async function ekle(e) {
    e.preventDefault();
    setHata(null);
    setGonderiliyor(true);
    try {
      const r = await fetch("/api/pazaryeri/ilanlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Eklenemedi.");
      else {
        setForm({ baslik: "", kategori: "", aciklama: "", fiyat_min: "", fiyat_max: "", para_birimi: "TRY", stok_durumu: "stokta" });
        setFormAcik(false);
        await yukle();
      }
    } catch { setHata("Sunucu hatası."); }
    setGonderiliyor(false);
  }

  async function sil(id) {
    if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    const r = await fetch(`/api/pazaryeri/ilanlar/${id}`, { method: "DELETE" });
    if (r.ok) setIlanlar(ilanlar.filter(i => i.id !== id));
  }

  async function aktifToggle(ilan) {
    const r = await fetch(`/api/pazaryeri/ilanlar/${ilan.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aktif: !ilan.aktif }),
    });
    if (r.ok) await yukle();
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";
  const lab = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">Pazaryeri İlanlarım</h2>
        <button onClick={() => setFormAcik(!formAcik)} style={{ backgroundColor: "var(--teal)" }} className="text-white text-sm px-4 py-2 rounded-xl font-medium">
          {formAcik ? "İptal" : "+ Yeni İlan"}
        </button>
      </div>

      {formAcik && (
        <form onSubmit={ekle} className="bg-white rounded-2xl p-6 border border-gray-100 mb-4 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2"><label className={lab}>Başlık *</label>
              <input required value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} className={inp} /></div>
            <div><label className={lab}>Kategori *</label>
              <select required value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className={inp}>
                <option value="">— Seçiniz —</option>
                {PAZARYERI_KATEGORILERI.map(k => <option key={k.kod} value={k.kod}>{k.ikon} {k.ad}</option>)}
              </select></div>
            <div><label className={lab}>Stok</label>
              <select value={form.stok_durumu} onChange={(e) => setForm({ ...form, stok_durumu: e.target.value })} className={inp}>
                {STOK_DURUMU.map(s => <option key={s.kod} value={s.kod}>{s.ad}</option>)}
              </select></div>
            <div><label className={lab}>Fiyat Min</label>
              <input type="number" min="0" step="0.01" value={form.fiyat_min} onChange={(e) => setForm({ ...form, fiyat_min: e.target.value })} className={inp} /></div>
            <div><label className={lab}>Fiyat Max</label>
              <input type="number" min="0" step="0.01" value={form.fiyat_max} onChange={(e) => setForm({ ...form, fiyat_max: e.target.value })} className={inp} /></div>
            <div className="sm:col-span-2"><label className={lab}>Açıklama</label>
              <textarea rows={4} value={form.aciklama} onChange={(e) => setForm({ ...form, aciklama: e.target.value })} className={inp} /></div>
          </div>
          {hata && <div className="text-sm text-red-600">{hata}</div>}
          <button type="submit" disabled={gonderiliyor} style={{ backgroundColor: "var(--navy)" }} className="text-white px-5 py-2 rounded-xl text-sm font-medium disabled:opacity-40">
            {gonderiliyor ? "Yayınlanıyor…" : "Yayınla"}
          </button>
        </form>
      )}

      {yukleniyor ? (
        <div className="text-center text-gray-400 py-10">Yükleniyor…</div>
      ) : ilanlar.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center text-gray-400 text-sm">
          Henüz pazaryeri ilanınız yok. + Yeni İlan ile başlayın.
        </div>
      ) : (
        <div className="space-y-2">
          {ilanlar.map((i) => {
            const kat = kategoriBul(i.kategori);
            return (
              <div key={i.id} className={`bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4 ${i.aktif ? "" : "opacity-60"}`}>
                <div className="text-2xl">{kat.ikon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">{i.baslik}</div>
                  <div className="text-xs text-gray-500">
                    {kat.ad} · 👁️ {i.goruntulenme || 0}
                    {(i.fiyat_min || i.fiyat_max) && ` · ${i.fiyat_min || ""}${i.fiyat_min && i.fiyat_max ? "–" : ""}${i.fiyat_max || ""} ${i.para_birimi}`}
                  </div>
                </div>
                <a href={`/pazaryeri/ilan/${i.id}`} target="_blank" className="text-xs text-gray-500 hover:underline">Gör →</a>
                <button onClick={() => aktifToggle(i)} className="text-xs border border-gray-200 px-3 py-1.5 rounded-xl hover:bg-gray-50">
                  {i.aktif ? "Aktif" : "Pasif"}
                </button>
                <button onClick={() => sil(i.id)} className="text-xs border border-red-100 text-red-500 px-2.5 py-1.5 rounded-xl hover:bg-red-50">✕</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
