"use client";

import { useState, useEffect } from "react";

const FIRMA_TIPLERI = [
  { deger: "ilac", etiket: "💊 İlaç Firması" },
  { deger: "tibbi_cihaz", etiket: "🔬 Tıbbi Cihaz Firması" },
  { deger: "utt", etiket: "🩺 Ürün Tanıtım Temsilcisi (ÜTT)" },
  { deger: "saglik_hizmeti", etiket: "🏥 Sağlık Hizmeti" },
  { deger: "sigorta", etiket: "🛡️ Sigorta" },
  { deger: "diger", etiket: "📦 Diğer" },
];

const PAKETLER = [
  { deger: "baslangic", etiket: "Başlangıç — ₺299/ay" },
  { deger: "standart", etiket: "Standart — ₺799/ay" },
  { deger: "premium", etiket: "Premium — ₺1999/ay" },
];

export default function FirmaBaşvuruFormu() {
  const [form, setForm] = useState({
    firmaAdi: "",
    yetkiliAdi: "",
    email: "",
    telefon: "",
    firmaType: "ilac",
    paket: "standart",
    notlar: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tip = params.get("tip");
    if (tip && FIRMA_TIPLERI.some((f) => f.deger === tip)) {
      setForm((prev) => ({ ...prev, firmaType: tip }));
    }
  }, []);
  const [gonderiyor, setGonderiyor] = useState(false);
  const [sonuc, setSonuc] = useState(null);

  function guncelle(alan, deger) {
    setForm((prev) => ({ ...prev, [alan]: deger }));
  }

  async function gonder(e) {
    e.preventDefault();
    setGonderiyor(true);
    setSonuc(null);
    try {
      const res = await fetch("/api/firma-basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSonuc({ tip: "hata", metin: data.hata || "Bir hata oluştu." });
      } else {
        setSonuc({ tip: "basari", metin: "Başvurunuz alındı! Ekibimiz en kısa sürede sizinle iletişime geçecek." });
        setForm({ firmaAdi: "", yetkiliAdi: "", email: "", telefon: "", firmaType: "ilac", paket: "standart", notlar: "" });
      }
    } catch {
      setSonuc({ tip: "hata", metin: "Bağlantı hatası. Lütfen tekrar deneyin." });
    } finally {
      setGonderiyor(false);
    }
  }

  return (
    <form onSubmit={gonder} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Firma Adı *</label>
          <input
            type="text"
            value={form.firmaAdi}
            onChange={(e) => guncelle("firmaAdi", e.target.value)}
            placeholder="ABC İlaç A.Ş."
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Yetkili Adı Soyadı *</label>
          <input
            type="text"
            value={form.yetkiliAdi}
            onChange={(e) => guncelle("yetkiliAdi", e.target.value)}
            placeholder="Ahmet Yılmaz"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => guncelle("email", e.target.value)}
            placeholder="info@firma.com"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
          <input
            type="tel"
            value={form.telefon}
            onChange={(e) => guncelle("telefon", e.target.value)}
            placeholder="05XX XXX XX XX"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Firma Tipi *</label>
          <select
            value={form.firmaType}
            onChange={(e) => guncelle("firmaType", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {FIRMA_TIPLERI.map((t) => (
              <option key={t.deger} value={t.deger}>{t.etiket}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">İlgilenilen Paket</label>
          <select
            value={form.paket}
            onChange={(e) => guncelle("paket", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            {PAKETLER.map((p) => (
              <option key={p.deger} value={p.deger}>{p.etiket}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notlar / Özel Talepler</label>
        <textarea
          value={form.notlar}
          onChange={(e) => guncelle("notlar", e.target.value)}
          rows={3}
          placeholder="Hedef bölge, uzmanlık alanı, özel gereksinimler..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y"
        />
      </div>

      {sonuc && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${sonuc.tip === "basari" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {sonuc.metin}
        </div>
      )}

      <button
        type="submit"
        disabled={gonderiyor}
        style={{ backgroundColor: "var(--navy)" }}
        className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {gonderiyor ? "Gönderiliyor…" : "Başvuruyu Gönder"}
      </button>
    </form>
  );
}
