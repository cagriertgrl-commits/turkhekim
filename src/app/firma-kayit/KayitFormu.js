"use client";
import { useState } from "react";
import Link from "next/link";
import { PAZARYERI_KATEGORILERI } from "@/lib/pazaryeriKategorileri";

export default function KayitFormu() {
  const [form, setForm] = useState({
    ad: "", vergi_no: "", ad_soyad_yetkili: "", email: "", sifre: "", telefon: "",
    kategori: "", sehir: "", adres: "", website: "", hakkinda: "",
  });
  const [kvkk, setKvkk] = useState(false);
  const [sozlesme, setSozlesme] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/firma/kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kvkk_onaylandi: kvkk, sozlesme_onaylandi: sozlesme }),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Kayıt başarısız.");
      } else {
        setMesaj(data.mesaj);
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
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className={lab}>Firma Unvanı *</label>
          <input required value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} className={inp}
                 placeholder="örn: ABC Medikal Cihaz San. Tic. A.Ş." />
        </div>
        <div>
          <label className={lab}>Vergi Numarası *</label>
          <input required value={form.vergi_no} onChange={(e) => setForm({ ...form, vergi_no: e.target.value })} className={inp} maxLength={11} />
        </div>
        <div>
          <label className={lab}>Faaliyet Kategorisi *</label>
          <select required value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className={inp}>
            <option value="">— Seçiniz —</option>
            {PAZARYERI_KATEGORILERI.map((k) => <option key={k.kod} value={k.kod}>{k.ad}</option>)}
          </select>
        </div>
        <div>
          <label className={lab}>Yetkili Adı Soyadı *</label>
          <input required value={form.ad_soyad_yetkili} onChange={(e) => setForm({ ...form, ad_soyad_yetkili: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Telefon *</label>
          <input required value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>E-posta *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Şifre (en az 8 karakter) *</label>
          <input required type="password" minLength={8} value={form.sifre} onChange={(e) => setForm({ ...form, sifre: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Şehir</label>
          <input value={form.sehir} onChange={(e) => setForm({ ...form, sehir: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Web Sitesi (opsiyonel)</label>
          <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inp} placeholder="https://" />
        </div>
        <div className="sm:col-span-2">
          <label className={lab}>Adres</label>
          <input value={form.adres} onChange={(e) => setForm({ ...form, adres: e.target.value })} className={inp} />
        </div>
      </div>

      <div>
        <label className={lab}>Firma Tanıtımı (opsiyonel)</label>
        <textarea rows={3} value={form.hakkinda} onChange={(e) => setForm({ ...form, hakkinda: e.target.value })} className={inp}
                  placeholder="Firmanız ve hizmetleriniz hakkında kısa bilgi…" />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
        📎 Onay sürecinde sizden vergi levhası ve faaliyet belgesi e-posta ile istenecektir.
        TİTCK belgeli firmalar için ek belge yüklemesi panelde mevcuttur.
      </div>

      <div className="space-y-2 text-xs text-gray-700">
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-0.5" />
          <span><Link href="/kvkk" target="_blank" className="underline">KVKK Aydınlatma Metni</Link>'ni okudum, onaylıyorum.</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={sozlesme} onChange={(e) => setSozlesme(e.target.checked)} className="mt-0.5" />
          <span><Link href="/kullanim-kosullari" target="_blank" className="underline">Firma Kullanım Sözleşmesi</Link>'ni kabul ediyorum.</span>
        </label>
      </div>

      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
      {mesaj && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">{mesaj}</div>}

      <button type="submit" disabled={yukleniyor || !kvkk || !sozlesme}
              style={{ backgroundColor: "var(--navy)" }}
              className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-40 hover:opacity-90">
        {yukleniyor ? "Kaydediliyor…" : "Kayıt Ol"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Zaten hesabınız var mı? <Link href="/firma-giris" className="underline" style={{ color: "var(--teal)" }}>Giriş yapın</Link>
      </p>
    </form>
  );
}
