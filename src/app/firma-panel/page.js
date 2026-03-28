"use client";

import { useState, useEffect } from "react";

const KATEGORILER = [
  { deger: "ilac", etiket: "İlaç" },
  { deger: "tibbi_cihaz", etiket: "Tıbbi Cihaz" },
  { deger: "takviye", etiket: "Gıda Takviyesi" },
  { deger: "diger", etiket: "Diğer" },
];

export default function FirmaPaneli() {
  const [firma, setFirma] = useState(null);
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifSekme, setAktifSekme] = useState("urunler");

  // Yeni ürün formu
  const [yeniUrun, setYeniUrun] = useState({ ad: "", aciklama: "", kategori: "ilac" });
  const [urunEkleniyor, setUrunEkleniyor] = useState(false);
  const [urunHata, setUrunHata] = useState(null);
  const [formAcik, setFormAcik] = useState(false);

  // Ürün düzenleme
  const [duzenlenenId, setDuzenlenenId] = useState(null);
  const [duzenlemeForm, setDuzenlemeForm] = useState({});

  async function yukleFirma() {
    try {
      const [firmaRes, urunRes] = await Promise.all([
        fetch("/api/firma/beni-getir"),
        fetch("/api/firma/urunler"),
      ]);

      if (firmaRes.status === 401) {
        window.location.href = "/firma-giris";
        return;
      }

      if (firmaRes.ok) {
        const data = await firmaRes.json();
        setFirma(data.firma);
      }
      if (urunRes.ok) {
        const data = await urunRes.json();
        setUrunler(data.urunler);
      }
    } catch (err) {
      console.error("Firma yükleme hatası:", err);
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    yukleFirma();
  }, []);

  async function urunEkle(e) {
    e.preventDefault();
    setUrunEkleniyor(true);
    setUrunHata(null);

    const res = await fetch("/api/firma/urunler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(yeniUrun),
    });
    const data = await res.json();

    if (!res.ok) {
      setUrunHata(data.hata || "Hata oluştu.");
    } else {
      setUrunler((prev) => [data.urun, ...prev]);
      setYeniUrun({ ad: "", aciklama: "", kategori: "ilac" });
      setFormAcik(false);
    }
    setUrunEkleniyor(false);
  }

  async function indirimToggle(urun) {
    const yeniDurum = !urun.indirimde;
    const detay = yeniDurum ? prompt("İndirim detayı (ör: %20 indirim, Mayıs sonuna kadar):") : null;
    if (yeniDurum && detay === null) return; // iptal

    const res = await fetch(`/api/firma/urunler/${urun.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ indirimde: yeniDurum, indirim_detay: detay }),
    });
    if (res.ok) {
      const data = await res.json();
      setUrunler((prev) => prev.map((u) => (u.id === urun.id ? { ...u, ...data.urun } : u)));
    }
  }

  async function aktifToggle(urun) {
    const res = await fetch(`/api/firma/urunler/${urun.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aktif: !urun.aktif }),
    });
    if (res.ok) {
      setUrunler((prev) => prev.map((u) => (u.id === urun.id ? { ...u, aktif: !u.aktif } : u)));
    }
  }

  async function urunSil(id) {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;
    const res = await fetch(`/api/firma/urunler/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUrunler((prev) => prev.filter((u) => u.id !== id));
    }
  }

  async function cikisYap() {
    await fetch("/api/firma/cikis", { method: "POST" });
    window.location.href = "/firma-giris";
  }

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Yükleniyor…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <div style={{ backgroundColor: "var(--navy)" }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-white font-bold text-lg">DoktorPusula</a>
            <span className="text-gray-400 text-sm hidden sm:block">/ Firma Paneli</span>
          </div>
          <div className="flex items-center gap-4">
            {firma && (
              <a
                href={`/firma/${firma.slug}`}
                target="_blank"
                className="text-xs text-gray-300 hover:text-white transition-colors hidden sm:block"
              >
                Profilimi Gör →
              </a>
            )}
            <button
              onClick={cikisYap}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Firma bilgisi */}
        {firma && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: "#EFF6FF" }}
            >
              🏢
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-gray-900 text-lg">{firma.ad}</h1>
              <p className="text-sm text-gray-500">{firma.email}</p>
            </div>
            {!firma.aktif && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-3 py-1.5 rounded-full font-medium">
                Onay bekliyor
              </div>
            )}
          </div>
        )}

        {/* Sekmeler */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "urunler", label: "Ürünlerim" },
            { id: "takipciler", label: "Takipçiler" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setAktifSekme(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                aktifSekme === s.id
                  ? "text-white"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
              }`}
              style={aktifSekme === s.id ? { backgroundColor: "var(--teal)" } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ÜRÜNLER SEKMESİ */}
        {aktifSekme === "urunler" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Ürün Kataloğu</h2>
              <button
                onClick={() => setFormAcik(!formAcik)}
                style={{ backgroundColor: "var(--teal)" }}
                className="text-white text-sm px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                + Ürün Ekle
              </button>
            </div>

            {/* Yeni ürün formu */}
            {formAcik && (
              <form
                onSubmit={urunEkle}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4"
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">Yeni Ürün</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Ürün Adı *</label>
                    <input
                      type="text"
                      value={yeniUrun.ad}
                      onChange={(e) => setYeniUrun((p) => ({ ...p, ad: e.target.value }))}
                      required
                      placeholder="ör. Amoksisilin 500mg"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Kategori</label>
                    <select
                      value={yeniUrun.kategori}
                      onChange={(e) => setYeniUrun((p) => ({ ...p, kategori: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      {KATEGORILER.map((k) => (
                        <option key={k.deger} value={k.deger}>{k.etiket}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Açıklama</label>
                    <textarea
                      value={yeniUrun.aciklama}
                      onChange={(e) => setYeniUrun((p) => ({ ...p, aciklama: e.target.value }))}
                      rows={2}
                      placeholder="Ürün hakkında kısa bilgi..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y"
                    />
                  </div>
                </div>
                {urunHata && (
                  <p className="text-red-600 text-xs mt-3">{urunHata}</p>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    type="submit"
                    disabled={urunEkleniyor}
                    style={{ backgroundColor: "var(--navy)" }}
                    className="text-white text-sm px-5 py-2 rounded-xl font-medium hover:opacity-90 disabled:opacity-60"
                  >
                    {urunEkleniyor ? "Ekleniyor…" : "Ekle"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormAcik(false)}
                    className="text-gray-500 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                  >
                    İptal
                  </button>
                </div>
              </form>
            )}

            {/* Ürün listesi */}
            {urunler.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
                <p className="text-gray-400 text-sm">Henüz ürün eklenmemiş.</p>
                <p className="text-gray-300 text-xs mt-1">Yukarıdaki "Ürün Ekle" butonuyla başlayın.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {urunler.map((urun) => (
                  <div
                    key={urun.id}
                    className={`bg-white rounded-2xl p-5 border shadow-sm flex items-start gap-4 ${
                      urun.aktif ? "border-gray-100" : "border-gray-100 opacity-60"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 text-sm">{urun.ad}</h3>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {KATEGORILER.find((k) => k.deger === urun.kategori)?.etiket || urun.kategori}
                        </span>
                        {urun.indirimde && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            İndirimde
                          </span>
                        )}
                        {!urun.aktif && (
                          <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                            Pasif
                          </span>
                        )}
                      </div>
                      {urun.aciklama && (
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{urun.aciklama}</p>
                      )}
                      {urun.indirimde && urun.indirim_detay && (
                        <p className="text-xs text-green-600 mt-1">📣 {urun.indirim_detay}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => indirimToggle(urun)}
                        title={urun.indirimde ? "İndirimi kaldır" : "İndirim ekle"}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-colors ${
                          urun.indirimde
                            ? "border-green-200 text-green-700 bg-green-50 hover:bg-green-100"
                            : "border-gray-200 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {urun.indirimde ? "İndirim ✓" : "İndirim"}
                      </button>
                      <button
                        onClick={() => aktifToggle(urun)}
                        title={urun.aktif ? "Pasife al" : "Aktife al"}
                        className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        {urun.aktif ? "Aktif" : "Pasif"}
                      </button>
                      <button
                        onClick={() => urunSil(urun.id)}
                        title="Sil"
                        className="text-xs px-2.5 py-1.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAKİPÇİLER SEKMESİ */}
        {aktifSekme === "takipciler" && (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
            <div className="text-3xl mb-3">👨‍⚕️</div>
            <p className="text-gray-500 text-sm font-medium">Takipçi listesi yakında</p>
            <p className="text-gray-400 text-xs mt-1">Sizi takip eden doktorları burada görebileceksiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
