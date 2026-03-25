"use client";

import { useState, useEffect } from "react";

const KATEGORILER = [
  { deger: "saglik-ipucu", etiket: "💡 Sağlık İpucu" },
  { deger: "haber", etiket: "📰 Haber" },
  { deger: "duyuru", etiket: "📢 Duyuru" },
  { deger: "tedavi", etiket: "💊 Tedavi" },
  { deger: "beslenme", etiket: "🥗 Beslenme" },
  { deger: "egzersiz", etiket: "🏃 Egzersiz" },
];

function okumaSuresi(icerik) {
  if (!icerik) return 0;
  return Math.max(1, Math.ceil(icerik.trim().split(/\s+/).length / 200));
}

function tarihFormat(tarih) {
  return new Date(tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function FeedPanel({ doktorId }) {
  const [paylasilar, setPaylasilar] = useState([]);
  const [yukluyor, setYukluyor] = useState(true);
  const [formAcik, setFormAcik] = useState(false);
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");
  const [kategori, setKategori] = useState("saglik-ipucu");
  const [gonderiyor, setGonderiyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  useEffect(() => {
    yukle();
  }, []);

  async function yukle() {
    setYukluyor(true);
    try {
      const res = await fetch(`/api/feed/doktor?doktorId=${doktorId}`);
      const data = await res.json();
      setPaylasilar(data.paylasilar || []);
    } catch (err) {
      console.error("Feed yükleme hatası:", err);
    } finally {
      setYukluyor(false);
    }
  }

  async function paylas() {
    if (!baslik.trim() || !icerik.trim()) {
      setMesaj({ tip: "hata", metin: "Başlık ve içerik zorunlu." });
      return;
    }
    setGonderiyor(true);
    setMesaj(null);
    try {
      const res = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baslik, icerik, kategori }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMesaj({ tip: "hata", metin: data.hata || "Bir hata oluştu." });
      } else {
        setMesaj({ tip: "basari", metin: "Paylaşım başarıyla yayınlandı!" });
        setBaslik("");
        setIcerik("");
        setKategori("saglik-ipucu");
        setFormAcik(false);
        yukle();
      }
    } catch {
      setMesaj({ tip: "hata", metin: "Bağlantı hatası." });
    } finally {
      setGonderiyor(false);
    }
  }

  async function sil(id) {
    if (!confirm("Bu paylaşımı silmek istediğinize emin misiniz?")) return;
    try {
      await fetch("/api/feed", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setPaylasilar((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Silme işlemi başarısız.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">Paylaşımlarım</h2>
          <p className="text-gray-500 text-sm">{paylasilar.length} paylaşım</p>
        </div>
        <button
          onClick={() => setFormAcik(!formAcik)}
          style={{ backgroundColor: "var(--teal)" }}
          className="text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          {formAcik ? "İptal" : "+ Yeni Paylaşım"}
        </button>
      </div>

      {/* Mesaj */}
      {mesaj && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${mesaj.tip === "basari" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {mesaj.metin}
        </div>
      )}

      {/* Yeni Paylaşım Formu */}
      {formAcik && (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4">
          <h3 className="font-semibold text-gray-800">Yeni Paylaşım</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık *</label>
            <input
              type="text"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              placeholder="Paylaşım başlığı (en az 5 karakter)"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              {KATEGORILER.map((k) => (
                <option key={k.deger} value={k.deger}>{k.etiket}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İçerik * <span className="text-gray-400 font-normal">({icerik.trim().split(/\s+/).filter(Boolean).length} kelime · ~{okumaSuresi(icerik)} dk)</span>
            </label>
            <textarea
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
              rows={8}
              placeholder="Sağlık ipucu, haber veya duyurunuzu paylaşın... (en az 50 karakter)"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y"
            />
          </div>

          <button
            onClick={paylas}
            disabled={gonderiyor}
            style={{ backgroundColor: "var(--navy)" }}
            className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {gonderiyor ? "Yayınlanıyor…" : "Yayınla"}
          </button>
        </div>
      )}

      {/* Paylaşım Listesi */}
      {yukluyor ? (
        <div className="text-center py-8 text-gray-400 text-sm">Yükleniyor…</div>
      ) : paylasilar.length === 0 && !formAcik ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
          <div className="text-4xl mb-3">✍️</div>
          <p className="text-gray-500 text-sm">Henüz paylaşım yapmadınız.</p>
          <p className="text-gray-400 text-xs mt-1">Sağlık ipuçları ve haberlerinizi hastalarınızla paylaşın.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {paylasilar.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{p.baslik}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{tarihFormat(p.created_at)}</span>
                    <span className="text-xs text-gray-500">{p.okunma || 0} okunma</span>
                    <span className="text-xs text-gray-500">~{okumaSuresi(p.icerik)} dk</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{p.icerik?.slice(0, 120)}…</p>
                </div>
                <button
                  onClick={() => sil(p.id)}
                  className="text-red-400 hover:text-red-600 text-sm flex-shrink-0 transition-colors"
                  title="Sil"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
