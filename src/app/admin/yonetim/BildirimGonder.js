"use client";
import { useState } from "react";

export default function BildirimGonder() {
  const [form, setForm] = useState({ hedef_tip: "tumu", hedef_id_listesi: "", baslik: "", mesaj: "", link: "" });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [sonuc, setSonuc] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setSonuc(null);
    setYukleniyor(true);
    try {
      const payload = { ...form };
      if (form.hedef_tip !== "tumu") {
        payload.hedef_id_listesi = form.hedef_id_listesi.split(",").map(s => s.trim()).filter(Boolean);
      }
      const r = await fetch("/api/admin/bildirim-gonder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await r.json();
      setSonuc(d);
      if (r.ok) setForm({ hedef_tip: "tumu", hedef_id_listesi: "", baslik: "", mesaj: "", link: "" });
    } catch { setSonuc({ hata: "Sunucu hatası." }); }
    setYukleniyor(false);
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500";
  const lab = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Bildirim Gönder</h1>
      <p className="text-sm text-gray-500 mb-6">Doktor, hasta veya tüm kullanıcılara in-app bildirim gönder.</p>

      <form onSubmit={gonder} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
        <div>
          <label className={lab}>Hedef</label>
          <select value={form.hedef_tip} onChange={(e) => setForm({ ...form, hedef_tip: e.target.value })} className={inp}>
            <option value="tumu">Tüm Aktif Doktorlar</option>
            <option value="doktor">Belirli Doktor(lar)</option>
            <option value="hasta">Belirli Hasta(lar)</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {form.hedef_tip !== "tumu" && form.hedef_tip !== "admin" && (
          <div>
            <label className={lab}>Hedef ID'leri (virgülle ayır)</label>
            <input value={form.hedef_id_listesi} onChange={(e) => setForm({ ...form, hedef_id_listesi: e.target.value })}
                   className={inp} placeholder="örn: 12, 45, 78" />
          </div>
        )}

        <div>
          <label className={lab}>Başlık *</label>
          <input required value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} className={inp} maxLength={100} />
        </div>

        <div>
          <label className={lab}>Mesaj *</label>
          <textarea required rows={4} value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} className={inp} maxLength={500} />
        </div>

        <div>
          <label className={lab}>Bağlantı (opsiyonel)</label>
          <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className={inp} placeholder="/panel veya /paketler" />
        </div>

        {sonuc && (
          <div className={`rounded-lg p-3 text-sm border ${sonuc.hata ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
            {sonuc.hata || `✅ ${sonuc.gonderilen || 0} bildirim gönderildi.`}
          </div>
        )}

        <button type="submit" disabled={yukleniyor}
                className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-40">
          {yukleniyor ? "Gönderiliyor…" : "📤 Bildirim Gönder"}
        </button>
      </form>
    </div>
  );
}
