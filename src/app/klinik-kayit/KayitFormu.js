"use client";
import { useState } from "react";
import Link from "next/link";

const KURUM_TIPLERI = [
  { kod: "muayenehane", ad: "Muayenehane" },
  { kod: "poliklinik", ad: "Poliklinik" },
  { kod: "hastane", ad: "Hastane" },
  { kod: "tip_merkezi", ad: "Tıp Merkezi" },
];

export default function KayitFormu() {
  const [form, setForm] = useState({
    ad: "", kurum_tipi: "", sehir: "", adres: "",
    telefon: "", email: "", website: "", hakkinda: "",
    calisma_saatleri: "", hizmetler: "",
  });
  const [kvkk, setKvkk] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/klinik/kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kvkk_onaylandi: kvkk }),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Kayıt başarısız.");
      else setMesaj(data.mesaj);
    } catch { setHata("Sunucuya ulaşılamadı."); }
    setYukleniyor(false);
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";
  const lab = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={gonder} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2"><label className={lab}>Klinik / Tesis Adı *</label>
          <input required value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} className={inp} /></div>
        <div><label className={lab}>Kurum Tipi *</label>
          <select required value={form.kurum_tipi} onChange={(e) => setForm({ ...form, kurum_tipi: e.target.value })} className={inp}>
            <option value="">— Seçiniz —</option>
            {KURUM_TIPLERI.map(t => <option key={t.kod} value={t.kod}>{t.ad}</option>)}
          </select></div>
        <div><label className={lab}>Şehir *</label>
          <input required value={form.sehir} onChange={(e) => setForm({ ...form, sehir: e.target.value })} className={inp} /></div>
        <div className="sm:col-span-2"><label className={lab}>Adres</label>
          <input value={form.adres} onChange={(e) => setForm({ ...form, adres: e.target.value })} className={inp} /></div>
        <div><label className={lab}>Telefon *</label>
          <input required value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className={inp} /></div>
        <div><label className={lab}>E-posta *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inp} /></div>
        <div className="sm:col-span-2"><label className={lab}>Web Sitesi</label>
          <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inp} placeholder="https://" /></div>
      </div>

      <div><label className={lab}>Hakkında</label>
        <textarea rows={4} value={form.hakkinda} onChange={(e) => setForm({ ...form, hakkinda: e.target.value })} className={inp} /></div>
      <div><label className={lab}>Çalışma Saatleri</label>
        <input value={form.calisma_saatleri} onChange={(e) => setForm({ ...form, calisma_saatleri: e.target.value })} className={inp}
               placeholder="Pzt-Cuma 09:00-18:00, Cmt 09:00-13:00" /></div>
      <div><label className={lab}>Hizmetler (virgülle ayır)</label>
        <textarea rows={2} value={form.hizmetler} onChange={(e) => setForm({ ...form, hizmetler: e.target.value })} className={inp}
                  placeholder="Diş hekimliği, implant, ortodonti, çocuk diş hekimliği…" /></div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
        📎 Onay sürecinde faaliyet belgesi e-posta ile istenecektir.
      </div>

      <label className="flex items-start gap-2 text-xs text-gray-700">
        <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-0.5" />
        <span><Link href="/kvkk" target="_blank" className="underline">KVKK Aydınlatma Metni</Link>'ni okudum, onaylıyorum.</span>
      </label>

      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
      {mesaj && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">{mesaj}</div>}

      <button type="submit" disabled={yukleniyor || !kvkk}
              style={{ backgroundColor: "var(--navy)" }}
              className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-40 hover:opacity-90">
        {yukleniyor ? "Kaydediliyor…" : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}
