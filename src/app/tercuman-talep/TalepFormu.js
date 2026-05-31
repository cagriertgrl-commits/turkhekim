"use client";
import { useState } from "react";

const DILLER = ["Türkçe", "İngilizce", "Arapça", "Rusça", "Farsça", "Almanca", "Fransızca", "İspanyolca", "Ukraynaca", "Azerice", "Kazakça", "Çince", "Japonca", "Korece", "İbranice"];
const HIZMET_TIPLERI = [
  { kod: "yuz_yuze", ad: "Yüz Yüze (klinikte)" },
  { kod: "telefon", ad: "Telefon" },
  { kod: "video", ad: "Görüntülü Online" },
  { kod: "yazili", ad: "Yazılı Çeviri (belge)" },
];

export default function TalepFormu() {
  const [form, setForm] = useState({
    dil_kaynak: "Türkçe", dil_hedef: "", tarih: "", sure_saat: "", lokasyon: "",
    hizmet_tipi: "yuz_yuze", aciklama: "", butce: "", iletisim_email: "", iletisim_telefon: "",
  });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/tercuman/talepler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Talep gönderilemedi.");
      else {
        setMesaj(data.mesaj);
        setForm({ ...form, aciklama: "", iletisim_email: "", iletisim_telefon: "" });
      }
    } catch { setHata("Sunucuya ulaşılamadı."); }
    setYukleniyor(false);
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";
  const lab = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={gonder} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lab}>Kaynak Dil *</label>
          <select required value={form.dil_kaynak} onChange={(e) => setForm({ ...form, dil_kaynak: e.target.value })} className={inp}>
            {DILLER.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className={lab}>Hedef Dil *</label>
          <select required value={form.dil_hedef} onChange={(e) => setForm({ ...form, dil_hedef: e.target.value })} className={inp}>
            <option value="">— Seçiniz —</option>
            {DILLER.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className={lab}>Hizmet Tipi</label>
          <select value={form.hizmet_tipi} onChange={(e) => setForm({ ...form, hizmet_tipi: e.target.value })} className={inp}>
            {HIZMET_TIPLERI.map(h => <option key={h.kod} value={h.kod}>{h.ad}</option>)}
          </select>
        </div>
        <div>
          <label className={lab}>Tarih (opsiyonel)</label>
          <input type="date" value={form.tarih} onChange={(e) => setForm({ ...form, tarih: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Süre (saat)</label>
          <input type="number" min="0" step="0.5" value={form.sure_saat} onChange={(e) => setForm({ ...form, sure_saat: e.target.value })} className={inp} placeholder="örn: 2" />
        </div>
        <div>
          <label className={lab}>Lokasyon / Şehir</label>
          <input value={form.lokasyon} onChange={(e) => setForm({ ...form, lokasyon: e.target.value })} className={inp} placeholder="İstanbul / online vs." />
        </div>
      </div>

      <div>
        <label className={lab}>Açıklama * (uzmanlık, branş, doküman türü…)</label>
        <textarea required rows={5} minLength={20} value={form.aciklama} onChange={(e) => setForm({ ...form, aciklama: e.target.value })} className={inp}
                  placeholder="Onkoloji konsültasyonu için Arapça-Türkçe yüz yüze tercüman; iki saatlik görüşme; hastam Suudi Arabistan'dan geliyor…" />
      </div>

      <div>
        <label className={lab}>Bütçe (opsiyonel)</label>
        <input value={form.butce} onChange={(e) => setForm({ ...form, butce: e.target.value })} className={inp} placeholder="örn: 1.500-3.000 TL" />
      </div>

      <fieldset className="border border-gray-200 rounded-lg p-3">
        <legend className="text-xs font-semibold text-gray-600 px-2">İletişim (giriş yapmadıysanız zorunlu)</legend>
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          <input type="email" value={form.iletisim_email} onChange={(e) => setForm({ ...form, iletisim_email: e.target.value })} className={inp} placeholder="E-posta" />
          <input value={form.iletisim_telefon} onChange={(e) => setForm({ ...form, iletisim_telefon: e.target.value })} className={inp} placeholder="Telefon" />
        </div>
      </fieldset>

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
