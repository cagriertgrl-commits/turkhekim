"use client";

import { useState } from "react";

export default function RandevuFormu({ doktorId, doktorAd }) {
  const [form, setForm] = useState({ hasta_adi: "", telefon: "", sikayet: "" });
  const [durum, setDurum] = useState(null); // null | "basari" | "hata"
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const guncelle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const gonder = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setDurum(null);

    const res = await fetch("/api/randevu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, doktor_id: doktorId }),
    });

    const data = await res.json();
    setYukleniyor(false);

    if (res.ok) {
      setDurum("basari");
      setMesaj(data.mesaj);
      setForm({ hasta_adi: "", telefon: "", sikayet: "" });
    } else {
      setDurum("hata");
      setMesaj(data.hata);
    }
  };

  if (durum === "basari") {
    return (
      <div id="randevu" className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <div className="text-4xl mb-3">📅</div>
        <h3 className="font-bold text-gray-900 mb-2">Talebiniz Alındı!</h3>
        <p className="text-gray-500 text-sm mb-4">{mesaj}</p>
        <div style={{ backgroundColor: "#D1FAE5", borderColor: "#059669" }} className="border rounded-xl p-3">
          <p style={{ color: "#059669" }} className="text-xs font-medium">
            ✓ {doktorAd} en kısa sürede sizi arayacak
          </p>
        </div>
        <button
          onClick={() => setDurum(null)}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Yeni talep oluştur
        </button>
      </div>
    );
  }

  return (
    <div id="randevu" className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-1">Randevu Al</h3>
      <p className="text-xs text-gray-400 mb-4">Doktor bilgilerinizi aldıktan sonra sizi arayacak.</p>

      <form onSubmit={gonder} className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Adınız Soyadınız <span className="text-red-500">*</span></label>
          <input
            name="hasta_adi"
            value={form.hasta_adi}
            onChange={guncelle}
            placeholder="Ad Soyad"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Telefon <span className="text-red-500">*</span></label>
          <input
            name="telefon"
            value={form.telefon}
            onChange={guncelle}
            placeholder="0532 xxx xx xx"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Şikayet / Not (opsiyonel)</label>
          <textarea
            name="sikayet"
            value={form.sikayet}
            onChange={guncelle}
            placeholder="Kısaca belirtin..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 resize-none"
          />
        </div>

        {durum === "hata" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-xs">{mesaj}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={yukleniyor}
          style={{ backgroundColor: "#0D2137" }}
          className="w-full text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {yukleniyor ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          📞 Doktor telefon numaranızı alır ve geri arar
        </p>
      </form>
    </div>
  );
}
