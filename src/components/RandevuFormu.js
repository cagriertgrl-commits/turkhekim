"use client";

import { useState } from "react";

export default function RandevuFormu({ doktorId, doktorAd, onlineRandevu }) {
  const [tip, setTip] = useState("yuzyuze");
  const [form, setForm] = useState({ hasta_adi: "", telefon: "", sikayet: "" });
  const [durum, setDurum] = useState(null);
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
      body: JSON.stringify({ ...form, doktor_id: doktorId, tip }),
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
        <div className="text-4xl mb-3">{tip === "online" ? "💻" : "📅"}</div>
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

      {/* Randevu Tipi */}
      {onlineRandevu && (
        <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ backgroundColor: "#F5F7FA" }}>
          <button
            type="button"
            onClick={() => setTip("yuzyuze")}
            className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
            style={tip === "yuzyuze"
              ? { backgroundColor: "#0D2137", color: "white" }
              : { color: "#6B7280" }}
          >
            🏥 Yüz Yüze
          </button>
          <button
            type="button"
            onClick={() => setTip("online")}
            className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
            style={tip === "online"
              ? { backgroundColor: "#0E7C7B", color: "white" }
              : { color: "#6B7280" }}
          >
            💻 Online
          </button>
        </div>
      )}

      {tip === "online" && (
        <div style={{ backgroundColor: "#E8F5F5", borderColor: "#0E7C7B" }} className="border rounded-xl p-3 mb-4">
          <p className="text-xs text-gray-600">
            📹 Online görüşme için doktor sizi arayıp video görüşme bağlantısı paylaşacak.
          </p>
        </div>
      )}

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
          style={{ backgroundColor: tip === "online" ? "#0E7C7B" : "#0D2137" }}
          className="w-full text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {yukleniyor ? "Gönderiliyor..." : tip === "online" ? "Online Randevu Talebi Gönder" : "Randevu Talebi Gönder"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          📞 Doktor telefon numaranızı alır ve geri arar
        </p>
      </form>
    </div>
  );
}
