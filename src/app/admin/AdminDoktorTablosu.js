"use client";

import { useState } from "react";

export default function AdminDoktorTablosu({ doktorlar, onOnayla, onPaketGuncelle, onSil }) {
  const [arama, setArama] = useState("");

  const filtreliDoktorlar = arama
    ? doktorlar.filter(d => d.ad?.toLowerCase().includes(arama.toLowerCase()) || d.uzmanlik?.toLowerCase().includes(arama.toLowerCase()))
    : doktorlar;

  return (
    <div>
      <div className="mb-4">
        <input
          value={arama}
          onChange={e => setArama(e.target.value)}
          placeholder="Doktor adı veya uzmanlık ara..."
          className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#F5F7FA" }}>
            <tr>
              {["Doktor", "Uzmanlık", "Şehir", "Paket", "Puan", "Med.Tur.", "Durum", "İşlem"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtreliDoktorlar.map((d, i) => (
              <tr key={d.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#FAFAFA" }} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold text-gray-900">{d.unvan ? `${d.unvan} ${d.ad}` : d.ad}</p>
                    {d.email && <p className="text-gray-400 text-xs">{d.email}</p>}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{d.uzmanlik}</td>
                <td className="px-4 py-3 text-gray-600">{d.sehir}</td>
                <td className="px-4 py-3">
                  <select
                    value={d.paket || "ucretsiz"}
                    onChange={e => onPaketGuncelle(d.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-teal-400"
                    style={{
                      color: d.paket === "ucretsiz" || !d.paket ? "#6B7280"
                        : d.paket === "premium" ? "#D97706"
                        : d.paket === "pro" ? "#7C3AED"
                        : "#059669"
                    }}
                  >
                    <option value="ucretsiz">Ücretsiz</option>
                    <option value="premium">Premium</option>
                    <option value="pro">Pro</option>
                    <option value="kurumsal">Kurumsal</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  {d.yorum_sayisi > 0 ? <span className="text-yellow-500 font-bold">{d.puan}</span> : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-3">
                  {d.medikal_turizm
                    ? <span className="text-xs text-teal-700 font-semibold">{d.medikal_turizm_komisyon || "Evet"}</span>
                    : <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="px-4 py-3">
                  {d.onaylandi
                    ? <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-1 rounded-full font-semibold">Yayında</span>
                    : <span style={{ backgroundColor: "#FFFBEB", color: "#D97706" }} className="text-xs px-2 py-1 rounded-full font-semibold">Bekliyor</span>
                  }
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => onOnayla(d.id, !d.onaylandi)} className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${d.onaylandi ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {d.onaylandi ? "Durdur" : "Onayla"}
                    </button>
                    <a href={`/doktor/${d.slug}`} target="_blank" className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">Gör</a>
                    <button onClick={() => onSil(d.id)} className="text-xs px-2.5 py-1 rounded-lg bg-red-100 text-red-600">Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtreliDoktorlar.length === 0 && (
          <div className="text-center py-10 text-gray-400">Sonuç bulunamadı</div>
        )}
      </div>
    </div>
  );
}
