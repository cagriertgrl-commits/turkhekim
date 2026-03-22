"use client";

import { useState } from "react";

const KATEGORILER = [
  { deger: "hakaret", etiket: "Hakaret / Küfür" },
  { deger: "yanlis_bilgi", etiket: "Yanlış Bilgi" },
  { deger: "spam", etiket: "Spam / Reklam" },
  { deger: "gizlilik_ihlali", etiket: "Gizlilik İhlali" },
  { deger: "diger", etiket: "Diğer" },
];

export default function SikayetModal({ yorumId, onKapat }) {
  const [kategori, setKategori] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [durum, setDurum] = useState(null); // null | "yukleniyor" | "basari" | "hata"
  const [hataMetni, setHataMetni] = useState("");

  async function gonder(e) {
    e.preventDefault();
    if (!kategori) { setHataMetni("Lütfen bir kategori seçin."); return; }
    if (aciklama.trim().length < 5) { setHataMetni("Açıklama en az 5 karakter olmalıdır."); return; }

    setDurum("yukleniyor");
    setHataMetni("");
    try {
      const res = await fetch("/api/sikayet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yorum_id: yorumId, kategori, aciklama: aciklama.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHataMetni(data.hata || "Bir hata oluştu.");
        setDurum("hata");
      } else {
        setDurum("basari");
      }
    } catch {
      setHataMetni("Bağlantı hatası.");
      setDurum("hata");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        {durum === "basari" ? (
          <div className="text-center">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-bold text-gray-900 mb-2">Şikayetiniz alındı</h3>
            <p className="text-gray-500 text-sm mb-4">Moderasyon ekibimiz inceleyecek. Teşekkürler.</p>
            <button onClick={onKapat} style={{ backgroundColor: "#0E7C7B" }} className="text-white px-6 py-2 rounded-xl text-sm font-medium">
              Tamam
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Yorumu Bildir</h3>
              <button onClick={onKapat} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <form onSubmit={gonder} className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Sebep <span className="text-red-500">*</span></label>
                <div className="space-y-2">
                  {KATEGORILER.map((k) => (
                    <label key={k.deger} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="kategori"
                        value={k.deger}
                        checked={kategori === k.deger}
                        onChange={() => setKategori(k.deger)}
                        className="accent-teal-600"
                      />
                      <span className="text-sm text-gray-700">{k.etiket}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Açıklama <span className="text-red-500">*</span></label>
                <textarea
                  value={aciklama}
                  onChange={(e) => { setAciklama(e.target.value); setHataMetni(""); }}
                  placeholder="Şikayetinizi kısaca açıklayın..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>
              {hataMetni && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <p className="text-red-600 text-xs">{hataMetni}</p>
                </div>
              )}
              <div className="flex gap-2">
                <button type="button" onClick={onKapat} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={durum === "yukleniyor"}
                  style={{ backgroundColor: "#DC2626" }}
                  className="flex-1 text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {durum === "yukleniyor" ? "Gönderiliyor..." : "Bildir"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
