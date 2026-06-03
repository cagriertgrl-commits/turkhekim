"use client";
import { useEffect, useState } from "react";

export default function SMSKuyrugu() {
  const [kuyruk, setKuyruk] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [tetikleniyor, setTetikleniyor] = useState(false);
  const [sonuc, setSonuc] = useState(null);

  async function yukle() {
    setYukleniyor(true);
    try {
      const r = await fetch("/api/admin/sms-kuyrugu");
      const d = await r.json();
      setKuyruk(d.kuyruk || []);
    } catch {}
    setYukleniyor(false);
  }

  async function manuelTetikle() {
    if (!confirm("Bekleyen SMS'leri şimdi göndermek istediğinize emin misiniz?")) return;
    setTetikleniyor(true);
    setSonuc(null);
    try {
      const r = await fetch("/api/admin/sms-kuyrugu", { method: "POST" });
      const d = await r.json();
      setSonuc(d);
      await yukle();
    } catch { setSonuc({ hata: "Hata oluştu." }); }
    setTetikleniyor(false);
  }

  async function sil(id) {
    if (!confirm("Bu SMS'i silmek istediğinize emin misiniz?")) return;
    const r = await fetch("/api/admin/sms-kuyrugu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (r.ok) setKuyruk(kuyruk.filter(k => k.id !== id));
  }

  useEffect(() => { yukle(); }, []);

  const bekleyenSayisi = kuyruk.filter(k => !k.gonderildi).length;

  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS / WhatsApp Kuyruğu</h1>
          <p className="text-sm text-gray-500">{bekleyenSayisi} bekleyen, {kuyruk.length - bekleyenSayisi} gönderildi</p>
        </div>
        <div className="flex gap-2">
          <button onClick={manuelTetikle} disabled={tetikleniyor}
                  className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg font-semibold disabled:opacity-40">
            {tetikleniyor ? "Gönderiliyor…" : "🚀 Şimdi Gönder"}
          </button>
          <button onClick={yukle} className="border border-gray-200 px-3 py-2 rounded-lg text-sm">🔄</button>
        </div>
      </div>

      {sonuc && (
        <div className={`rounded-lg p-3 mb-4 text-sm border ${sonuc.hata ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
          {sonuc.hata || `✅ İşlendi: ${sonuc.islendi || 0} · Başarılı: ${sonuc.basarili || 0} · Hatalı: ${sonuc.basarisiz || 0} · Provider: ${sonuc.provider}`}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {yukleniyor ? (
          <div className="p-10 text-center text-gray-400 text-sm">Yükleniyor…</div>
        ) : kuyruk.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">Kuyruk boş.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Telefon</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Kanal</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Mesaj</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Planlanan</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Durum</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Deneme</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-gray-600">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {kuyruk.slice(0, 100).map(k => (
                  <tr key={k.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-xs">{k.alici_telefon}</td>
                    <td className="px-3 py-2">{k.kanal}</td>
                    <td className="px-3 py-2 max-w-md"><span className="truncate inline-block max-w-md" title={k.mesaj}>{k.mesaj}</span></td>
                    <td className="px-3 py-2 text-xs text-gray-500">{new Date(k.planlanan_tarih).toLocaleString("tr-TR")}</td>
                    <td className="px-3 py-2">
                      {k.gonderildi
                        ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">✓ Gönderildi</span>
                        : k.hata
                          ? <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">✕ Hata</span>
                          : <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">⏳ Bekliyor</span>}
                    </td>
                    <td className="px-3 py-2 text-xs">{k.deneme_sayisi}</td>
                    <td className="px-3 py-2 text-right">
                      <button onClick={() => sil(k.id)} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100">Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
