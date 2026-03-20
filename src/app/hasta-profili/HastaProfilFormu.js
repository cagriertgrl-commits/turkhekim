"use client";

import { useState } from "react";

const KAN_GRUPLARI = ["A+", "A-", "B+", "B-", "AB+", "AB-", "0+", "0-", "Bilmiyorum"];
const CINSIYET = ["Kadın", "Erkek", "Belirtmek istemiyorum"];

export default function HastaProfilFormu() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    dogum_yili: "",
    cinsiyet: "",
    kan_grubu: "",
    kronik_hastaliklar: "",
    alerjiler: "",
    kullanilan_ilaclar: "",
    gecirilen_ameliyatlar: "",
    ozel_notlar: "",
    kvkk_onaylandi: false,
  });
  const [durum, setDurum] = useState(null); // null | "yukleniyor" | "basarili" | "hata"
  const [hataMsg, setHataMsg] = useState("");

  function guncelle(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function kaydet(e) {
    e.preventDefault();

    if (!form.kvkk_onaylandi) {
      setHataMsg("KVKK onayı zorunludur.");
      return;
    }
    if (!form.ad.trim() || !form.telefon.trim()) {
      setHataMsg("Ad ve telefon alanları zorunludur.");
      return;
    }

    setDurum("yukleniyor");
    setHataMsg("");

    try {
      const res = await fetch("/api/hasta-profil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Kayıt başarısız.");
      setDurum("basarili");
    } catch (err) {
      setHataMsg(err.message);
      setDurum("hata");
    }
  }

  if (durum === "basarili") {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-2">Profiliniz Kaydedildi!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Sağlık bilgileriniz güvenli şekilde saklandı. Randevu sırasında doktorunuzla paylaşabilirsiniz.
        </p>
        <button
          onClick={() => setDurum(null)}
          style={{ backgroundColor: "#0E7C7B" }}
          className="text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90"
        >
          Bilgileri Güncelle
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Başlık */}
      <div className="mb-6">
        <h1 style={{ color: "#0D2137" }} className="text-2xl font-bold mb-1">🩺 Hasta Profilim</h1>
        <p className="text-gray-400 text-sm">
          Sağlık bilgilerinizi kaydedin — doktorunuz sizi daha iyi tanısın.
        </p>
      </div>

      <form onSubmit={kaydet} className="space-y-5">

        {/* Kişisel Bilgiler */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 style={{ color: "#0D2137" }} className="font-semibold mb-4">Kişisel Bilgiler</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ad Soyad *</label>
              <input
                type="text"
                value={form.ad}
                onChange={(e) => guncelle("ad", e.target.value)}
                placeholder="Ad Soyad"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon *</label>
              <input
                type="tel"
                value={form.telefon}
                onChange={(e) => guncelle("telefon", e.target.value)}
                placeholder="05XX XXX XX XX"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Doğum Yılı</label>
              <input
                type="number"
                value={form.dogum_yili}
                onChange={(e) => guncelle("dogum_yili", e.target.value)}
                placeholder="1990"
                min="1900"
                max={new Date().getFullYear()}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Cinsiyet</label>
              <select
                value={form.cinsiyet}
                onChange={(e) => guncelle("cinsiyet", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Seçiniz</option>
                {CINSIYET.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Kan Grubu</label>
              <select
                value={form.kan_grubu}
                onChange={(e) => guncelle("kan_grubu", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Seçiniz</option>
                {KAN_GRUPLARI.map((kg) => <option key={kg}>{kg}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Sağlık Bilgileri */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 style={{ color: "#0D2137" }} className="font-semibold mb-1">Sağlık Bilgileri</h2>
          <p className="text-xs text-gray-400 mb-4">Bu bilgiler doktorunuzla paylaşılabilir. Boş bırakabilirsiniz.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Kronik Hastalıklar</label>
              <textarea
                value={form.kronik_hastaliklar}
                onChange={(e) => guncelle("kronik_hastaliklar", e.target.value)}
                placeholder="Diyabet, hipertansiyon, astım..."
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Alerjiler</label>
              <textarea
                value={form.alerjiler}
                onChange={(e) => guncelle("alerjiler", e.target.value)}
                placeholder="Penisilin, lateks, fıstık..."
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Kullandığım İlaçlar</label>
              <textarea
                value={form.kullanilan_ilaclar}
                onChange={(e) => guncelle("kullanilan_ilaclar", e.target.value)}
                placeholder="Metformin 850mg, Coraspin 100mg..."
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Geçirdiğim Ameliyatlar</label>
              <textarea
                value={form.gecirilen_ameliyatlar}
                onChange={(e) => guncelle("gecirilen_ameliyatlar", e.target.value)}
                placeholder="2018 apendektomi, 2021 diz protezi..."
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Özel Notlar</label>
              <textarea
                value={form.ozel_notlar}
                onChange={(e) => guncelle("ozel_notlar", e.target.value)}
                placeholder="Hekime iletmek istediğiniz ek bilgiler..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* KVKK */}
        <div style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }} className="border rounded-2xl p-4">
          <label className="flex gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.kvkk_onaylandi}
              onChange={(e) => guncelle("kvkk_onaylandi", e.target.checked)}
              className="mt-0.5 flex-shrink-0"
            />
            <span className="text-xs text-yellow-800 leading-relaxed">
              6698 sayılı KVKK kapsamında sağlık verilerimin işlenmesine{" "}
              <strong>açık rıza veriyorum</strong>. Bilgilerimin yalnızca sağlık hizmetleri
              amacıyla kullanılacağını ve üçüncü taraflarla yasal çerçeve dışında paylaşılmayacağını anlıyorum.
            </span>
          </label>
        </div>

        {hataMsg && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {hataMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={durum === "yukleniyor"}
          style={{ backgroundColor: durum === "yukleniyor" ? "#9CA3AF" : "#0E7C7B" }}
          className="w-full text-white py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          {durum === "yukleniyor" ? "Kaydediliyor..." : "💾 Profilimi Kaydet"}
        </button>
      </form>
    </div>
  );
}
