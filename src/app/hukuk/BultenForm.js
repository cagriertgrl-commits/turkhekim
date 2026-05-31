"use client";
import { useState } from "react";

export default function BultenForm() {
  const [email, setEmail] = useState("");
  const [ad, setAd] = useState("");
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
      const r = await fetch("/api/hukuk/bulten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ad, kvkk_onaylandi: kvkk }),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Bir hata oluştu.");
      } else {
        setMesaj(data.mesaj);
        setEmail("");
        setAd("");
        setKvkk(false);
      }
    } catch {
      setHata("Sunucuya ulaşılamadı.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <form onSubmit={gonder} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Adınız (opsiyonel)"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
        <input
          type="email"
          required
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={kvkk}
          onChange={(e) => setKvkk(e.target.checked)}
          className="mt-1"
          required
        />
        <span>
          KVKK kapsamında e-posta adresimin mevzuat bülteni gönderimi için işlenmesini onaylıyorum.
          Her e-postanın altındaki bağlantıdan aboneliği iptal edebilirim.
        </span>
      </label>
      <button
        type="submit"
        disabled={yukleniyor || !kvkk}
        style={{ backgroundColor: "var(--navy)" }}
        className="w-full text-white font-semibold py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
      >
        {yukleniyor ? "Gönderiliyor…" : "Bültene Abone Ol"}
      </button>
      {mesaj && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">{mesaj}</div>}
      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
    </form>
  );
}
