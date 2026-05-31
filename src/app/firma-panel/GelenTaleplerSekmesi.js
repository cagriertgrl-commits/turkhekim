"use client";
import { useEffect, useState } from "react";
import { kategoriBul } from "@/lib/pazaryeriKategorileri";

export default function GelenTaleplerSekmesi({ firmaKategori, firmaId }) {
  const [talepler, setTalepler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [filtre, setFiltre] = useState("uygun");
  const [mesajForm, setMesajForm] = useState(null);

  async function yukle() {
    setYukleniyor(true);
    try {
      const url = filtre === "uygun" && firmaKategori
        ? `/api/pazaryeri/talepler?kategori=${firmaKategori}`
        : "/api/pazaryeri/talepler";
      const r = await fetch(url);
      const data = await r.json();
      setTalepler(data.talepler || []);
    } catch {}
    setYukleniyor(false);
  }

  useEffect(() => { yukle(); }, [filtre, firmaKategori]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="font-bold text-gray-900">Gelen Talepler (RFQ)</h2>
          <p className="text-xs text-gray-500">Doktorların açık malzeme talepleri.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFiltre("uygun")} className={`text-xs px-3 py-1.5 rounded-xl border ${filtre === "uygun" ? "border-teal-400 bg-teal-50 text-teal-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            Kategorime Uygun
          </button>
          <button onClick={() => setFiltre("tumu")} className={`text-xs px-3 py-1.5 rounded-xl border ${filtre === "tumu" ? "border-teal-400 bg-teal-50 text-teal-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
            Tümü
          </button>
        </div>
      </div>

      {yukleniyor ? (
        <div className="text-center text-gray-400 py-10">Yükleniyor…</div>
      ) : talepler.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center text-gray-400 text-sm">
          Açık talep yok.
        </div>
      ) : (
        <div className="space-y-3">
          {talepler.map((t) => {
            const kat = kategoriBul(t.kategori);
            return (
              <div key={t.id} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <div className="text-[10px] font-semibold uppercase mb-0.5" style={{ color: "var(--teal)" }}>{kat.ikon} {kat.ad}</div>
                    <h3 className="font-bold text-sm text-gray-900">{t.baslik}</h3>
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(t.created_at).toLocaleDateString("tr-TR")}</span>
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-wrap line-clamp-3 mb-3">{t.aciklama}</p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-3 text-xs text-gray-500">
                    {t.doktor_ad && <span>Dr. {t.doktor_ad}</span>}
                    {t.doktor_sehir && <span>📍 {t.doktor_sehir}</span>}
                    {t.butce && <span style={{ color: "var(--teal)" }}>💰 {t.butce}</span>}
                  </div>
                  <button onClick={() => setMesajForm({ talep: t })}
                          style={{ backgroundColor: "var(--navy)" }}
                          className="text-white text-xs px-4 py-1.5 rounded-xl font-medium">
                    📨 Teklif Gönder
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {mesajForm && <TeklifMesajModal talep={mesajForm.talep} onKapat={() => setMesajForm(null)} firmaId={firmaId} />}
    </div>
  );
}

function TeklifMesajModal({ talep, onKapat, firmaId }) {
  const [mesaj, setMesaj] = useState(`"${talep.baslik}" talebiniz için teklifimiz: \n\n`);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);
  const [basarili, setBasarili] = useState(false);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setYukleniyor(true);
    try {
      // Doktor ID'sini almak için talep detayı gerekli. API talep listesinden doktor_id getirilmiyor — yeni endpoint'e ihtiyaç olur.
      // Şimdilik: talep_eden_id alanı endpoint'ten gelmiyor, ek endpoint ekleyene kadar uyarı.
      const r = await fetch("/api/pazaryeri/mesaj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alici_tip: "doktor",
          alici_id: talep.doktor_id, // talep listesinden gelmeli — alttaki API güncellemesi sonra
          mesaj,
          referans_talep_id: talep.id,
        }),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Gönderilemedi.");
      else setBasarili(true);
    } catch { setHata("Sunucu hatası."); }
    setYukleniyor(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={onKapat}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-900">Teklif Mesajı</h3>
            <p className="text-xs text-gray-500">{talep.baslik}</p>
          </div>
          <button onClick={onKapat} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        {basarili ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
            ✅ Mesajınız doktora iletildi. Yanıtı Mesajlar sekmesinden takip edebilirsiniz.
          </div>
        ) : (
          <form onSubmit={gonder}>
            <textarea rows={6} value={mesaj} onChange={(e) => setMesaj(e.target.value)} maxLength={4000}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" required />
            {hata && <div className="mt-2 text-xs text-red-600">{hata}</div>}
            <button type="submit" disabled={yukleniyor}
                    style={{ backgroundColor: "var(--navy)" }}
                    className="mt-3 w-full text-white py-2 rounded-lg text-sm font-medium disabled:opacity-40">
              {yukleniyor ? "Gönderiliyor…" : "Gönder"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
