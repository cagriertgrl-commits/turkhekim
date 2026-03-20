"use client";

import { useState } from "react";

export default function SoruFormu({ doktorId, sorular }) {
  const [form, setForm] = useState({ soran_adi: "", soru: "" });
  const [durum, setDurum] = useState(null);
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  async function gonder(e) {
    e.preventDefault();
    setYukleniyor(true);
    setDurum(null);

    const res = await fetch("/api/soru", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, doktor_id: doktorId }),
    });

    const data = await res.json();
    setYukleniyor(false);

    if (res.ok) {
      setDurum("basari");
      setMesaj(data.mesaj);
      setForm({ soran_adi: "", soru: "" });
    } else {
      setDurum("hata");
      setMesaj(data.hata || "Bir hata oluştu.");
    }
  }

  const yanitlananlar = sorular.filter((s) => s.yanit);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
        <span style={{ color: "#0E7C7B" }}>❓</span> Doktora Soru Sor
      </h2>
      <p className="text-xs text-gray-400 mb-5">Yanıtlanan sorular herkese açık görünür.</p>

      {/* Mevcut sorular ve yanıtlar */}
      {yanitlananlar.length > 0 && (
        <div className="space-y-4 mb-6">
          {yanitlananlar.map((s) => (
            <div key={s.id} className="rounded-xl p-4 border border-gray-100" style={{ backgroundColor: "#F5F7FA" }}>
              <div className="flex items-start gap-2 mb-3">
                <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {s.soran_adi[0]}
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-700">{s.soran_adi}</span>
                  <p className="text-sm text-gray-600 mt-0.5">{s.soru}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pl-2 border-l-2" style={{ borderColor: "#0E7C7B" }}>
                <div>
                  <span className="text-xs font-semibold" style={{ color: "#0E7C7B" }}>Doktor yanıtı</span>
                  <p className="text-sm text-gray-700 mt-0.5">{s.yanit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      {durum === "basari" ? (
        <div style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }} className="border rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-sm text-gray-700 font-medium">{mesaj}</p>
          <button
            onClick={() => setDurum(null)}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Başka soru sor
          </button>
        </div>
      ) : (
        <form onSubmit={gonder} className="space-y-3">
          {durum === "hata" && (
            <div style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }} className="border rounded-xl p-3">
              <p className="text-xs text-red-600">{mesaj}</p>
            </div>
          )}
          <div>
            <label className="text-xs text-gray-500 block mb-1">Adınız <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.soran_adi}
              onChange={(e) => setForm({ ...form, soran_adi: e.target.value })}
              placeholder="Adınız Soyadınız"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Sorunuz <span className="text-red-500">*</span></label>
            <textarea
              value={form.soru}
              onChange={(e) => setForm({ ...form, soru: e.target.value })}
              placeholder="Doktora sormak istediğiniz soruyu yazın..."
              required
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={yukleniyor}
            style={{ backgroundColor: "#0E7C7B" }}
            className="w-full text-white py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {yukleniyor ? "Gönderiliyor..." : "Soruyu Gönder"}
          </button>
        </form>
      )}
    </div>
  );
}
