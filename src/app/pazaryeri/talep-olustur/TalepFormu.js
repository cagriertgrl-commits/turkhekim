"use client";
import { useState } from "react";
import Link from "next/link";
import { PAZARYERI_KATEGORILERI } from "@/lib/pazaryeriKategorileri";

export default function TalepFormu() {
  const [form, setForm] = useState({ kategori: "", baslik: "", aciklama: "", butce: "", son_tarih: "" });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/pazaryeri/talepler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Talep gönderilemedi.");
      } else {
        setMesaj(data.mesaj || "Talebiniz yayınlandı.");
        setForm({ kategori: "", baslik: "", aciklama: "", butce: "", son_tarih: "" });
      }
    } catch {
      setHata("Sunucuya ulaşılamadı.");
    } finally {
      setYukleniyor(false);
    }
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";
  const lab = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={gonder} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        💡 RFQ göndermek için <strong>doktor olarak giriş yapmış olmanız</strong> gerekir.
        Hesabınız yoksa <Link href="/doktor-ol" className="underline">kayıt olun</Link>.
      </div>

      <div>
        <label className={lab}>Kategori *</label>
        <select required value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className={inp}>
          <option value="">— Seçiniz —</option>
          {PAZARYERI_KATEGORILERI.map((k) => <option key={k.kod} value={k.kod}>{k.ikon} {k.ad}</option>)}
        </select>
      </div>

      <div>
        <label className={lab}>Başlık * (örn: "Dental implant 4.0mm, 50 adet")</label>
        <input required value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} className={inp} minLength={5} />
      </div>

      <div>
        <label className={lab}>Detaylı Açıklama * (marka, model, miktar, teslim koşulu…)</label>
        <textarea required rows={6} minLength={20} value={form.aciklama} onChange={(e) => setForm({ ...form, aciklama: e.target.value })} className={inp}
                  placeholder="Aradığınız ürünün özelliklerini, miktarı, teslim yerini ve özel notları detaylı belirtin." />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lab}>Bütçe (opsiyonel)</label>
          <input value={form.butce} onChange={(e) => setForm({ ...form, butce: e.target.value })} className={inp} placeholder="örn: 50.000-100.000 TL" />
        </div>
        <div>
          <label className={lab}>Son Tarih (opsiyonel)</label>
          <input type="date" value={form.son_tarih} onChange={(e) => setForm({ ...form, son_tarih: e.target.value })} className={inp} />
        </div>
      </div>

      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
      {mesaj && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">{mesaj}</div>}

      <button type="submit" disabled={yukleniyor}
              style={{ backgroundColor: "var(--navy)" }}
              className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-40 hover:opacity-90">
        {yukleniyor ? "Gönderiliyor…" : "Talebi Yayınla"}
      </button>
    </form>
  );
}
