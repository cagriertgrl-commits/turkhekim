"use client";

import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [aktifSekme, setAktifSekme] = useState("doktorlar");
  const [doktorlar, setDoktorlar] = useState([]);
  const [yorumlar, setYorumlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);

  useEffect(() => { veriCek(); }, []);

  const veriCek = async () => {
    setYukleniyor(true);
    const [d, y] = await Promise.all([
      fetch("/api/doktorlar").then(r => r.json()),
      fetch("/api/yorum-listesi").then(r => r.json()),
    ]);
    setDoktorlar(d);
    setYorumlar(y);
    setYukleniyor(false);
  };

  const doktorOnayla = async (id, onaylandi) => {
    await fetch("/api/admin/doktorlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, onaylandi }),
    });
    setDoktorlar(doktorlar.map(d => d.id === id ? { ...d, onaylandi } : d));
  };

  const doktorSil = async (id) => {
    if (!confirm("Bu doktoru silmek istediğinize emin misiniz?")) return;
    await fetch("/api/admin/doktorlar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDoktorlar(doktorlar.filter(d => d.id !== id));
  };

  const yorumSil = async (id, doktor_id) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    await fetch("/api/admin/yorumlar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, doktor_id }),
    });
    setYorumlar(yorumlar.filter(y => y.id !== id));
  };

  const bekleyenDoktorlar = doktorlar.filter(d => !d.onaylandi);
  const onayliDoktorlar = doktorlar.filter(d => d.onaylandi);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-white font-bold">DoktorPusula Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ backgroundColor: "#DC262620", color: "#DC2626", borderColor: "#DC2626" }} className="border text-xs px-3 py-1 rounded-full font-medium">
              {bekleyenDoktorlar.length} bekliyor
            </span>
            <a href="/" className="text-gray-400 hover:text-white text-sm">← Siteye Dön</a>
          </div>
        </div>
      </nav>

      {/* İSTATİSTİKLER */}
      <div style={{ backgroundColor: "#0D2137" }} className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { baslik: "Toplam Doktor", deger: doktorlar.length, icon: "👨‍⚕️" },
            { baslik: "Onaylı", deger: onayliDoktorlar.length, icon: "✅" },
            { baslik: "Bekleyen", deger: bekleyenDoktorlar.length, icon: "⏳" },
            { baslik: "Toplam Yorum", deger: yorumlar.length, icon: "💬" },
          ].map(k => (
            <div key={k.baslik} style={{ backgroundColor: "#ffffff10" }} className="rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{k.icon}</div>
              <div className="text-white text-2xl font-bold">{k.deger}</div>
              <div className="text-gray-400 text-xs">{k.baslik}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* SEKMELER */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "bekleyen", label: `Bekleyen (${bekleyenDoktorlar.length})` },
            { key: "doktorlar", label: `Tüm Doktorlar (${doktorlar.length})` },
            { key: "yorumlar", label: `Yorumlar (${yorumlar.length})` },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setAktifSekme(s.key)}
              style={aktifSekme === s.key ? { backgroundColor: "#0D2137", color: "white" } : { backgroundColor: "white", color: "#6B7280" }}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        {yukleniyor && <p className="text-gray-400 text-sm">Yükleniyor...</p>}

        {/* BEKLEYENDOKTORlar */}
        {aktifSekme === "bekleyen" && (
          <div className="space-y-3">
            {bekleyenDoktorlar.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <p className="text-4xl mb-3">✅</p>
                <p className="text-gray-500">Bekleyen kayıt yok.</p>
              </div>
            ) : bekleyenDoktorlar.map(d => (
              <div key={d.id} className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-yellow-400">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{d.ad}</h3>
                    <p style={{ color: "#0E7C7B" }} className="text-sm">{d.uzmanlik}</p>
                    <p className="text-gray-400 text-sm">📍 {d.sehir} · {d.ilce}</p>
                    {d.email && <p className="text-gray-400 text-xs mt-1">📧 {d.email}</p>}
                    {d.telefon && <p className="text-gray-400 text-xs">📞 {d.telefon}</p>}
                    {d.hakkinda && <p className="text-gray-500 text-xs mt-2 max-w-xl">{d.hakkinda}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => doktorOnayla(d.id, true)}
                      style={{ backgroundColor: "#059669" }}
                      className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      ✓ Onayla
                    </button>
                    <button
                      onClick={() => doktorSil(d.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TÜM DOKTORLAR */}
        {aktifSekme === "doktorlar" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#F5F7FA" }}>
                <tr>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Doktor</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Uzmanlık</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Şehir</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Puan</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Durum</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {doktorlar.map((d, i) => (
                  <tr key={d.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                    <td className="px-4 py-3 font-medium text-gray-900">{d.ad}</td>
                    <td className="px-4 py-3 text-gray-500">{d.uzmanlik}</td>
                    <td className="px-4 py-3 text-gray-500">{d.sehir}</td>
                    <td className="px-4 py-3">
                      {d.yorum_sayisi > 0 ? (
                        <span className="text-yellow-500 font-medium">★ {d.puan}</span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {d.onaylandi ? (
                        <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-1 rounded-full font-medium">Yayında</span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">İncelemede</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => doktorOnayla(d.id, !d.onaylandi)}
                          className={`text-xs px-3 py-1 rounded-lg font-medium ${d.onaylandi ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}
                        >
                          {d.onaylandi ? "Yayından Al" : "Onayla"}
                        </button>
                        <a href={`/doktor/${d.slug}`} target="_blank" className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                          Gör
                        </a>
                        <button onClick={() => doktorSil(d.id)} className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-600">
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* YORUMLAR */}
        {aktifSekme === "yorumlar" && (
          <div className="space-y-3">
            {yorumlar.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center shadow-sm">
                <p className="text-gray-500">Henüz yorum yok.</p>
              </div>
            ) : yorumlar.map(y => (
              <div key={y.id} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{y.hasta_adi}</span>
                      <div className="flex">
                        {[...Array(y.puan)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                      </div>
                      <span className="text-gray-400 text-xs">{y.tarih}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{y.metin}</p>
                    {y.telefon && <p className="text-gray-400 text-xs mt-1">📞 {y.telefon}</p>}
                  </div>
                  <button
                    onClick={() => yorumSil(y.id, y.doktor_id)}
                    className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-lg flex-shrink-0 ml-4"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
