"use client";

import { useState } from "react";

export default function SifreDegistir() {
  const [form, setForm] = useState({ eskiSifre: "", yeniSifre: "", tekrar: "" });
  const [durum, setDurum] = useState(null); // { tip: "basari" | "hata", mesaj }
  const [yukleniyor, setYukleniyor] = useState(false);

  async function gonder(e) {
    e.preventDefault();
    if (form.yeniSifre !== form.tekrar) {
      setDurum({ tip: "hata", mesaj: "Yeni şifreler eşleşmiyor." });
      return;
    }
    setYukleniyor(true);
    setDurum(null);

    const res = await fetch("/api/sifre-degistir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eskiSifre: form.eskiSifre, yeniSifre: form.yeniSifre }),
    });

    const data = await res.json();
    setYukleniyor(false);

    if (res.ok) {
      setDurum({ tip: "basari", mesaj: data.mesaj });
      setForm({ eskiSifre: "", yeniSifre: "", tekrar: "" });
    } else {
      setDurum({ tip: "hata", mesaj: data.hata });
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Şifre Değiştir</h2>

      {durum && (
        <div
          className={`text-sm px-4 py-3 rounded-lg mb-4 ${
            durum.tip === "basari"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {durum.mesaj}
        </div>
      )}

      <form onSubmit={gonder} className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Mevcut Şifre</label>
          <input
            type="password"
            value={form.eskiSifre}
            onChange={(e) => setForm({ ...form, eskiSifre: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Yeni Şifre</label>
          <input
            type="password"
            value={form.yeniSifre}
            onChange={(e) => setForm({ ...form, yeniSifre: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            minLength={8}
            required
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Yeni Şifre Tekrar</label>
          <input
            type="password"
            value={form.tekrar}
            onChange={(e) => setForm({ ...form, tekrar: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={yukleniyor}
          style={{ backgroundColor: "#0D2137" }}
          className="w-full text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {yukleniyor ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
      </form>
    </div>
  );
}
