"use client";
import { useEffect, useState, useMemo } from "react";

export default function AdminTablo({ konfig }) {
  const [veri, setVeri] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");
  const [sayfa, setSayfa] = useState(1);
  const SAYFA_BOY = 25;

  async function yukle() {
    setYukleniyor(true);
    try {
      const r = await fetch(konfig.api);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const data = await r.json();
      setVeri(Array.isArray(data) ? data : (data[konfig.altAnahtar] || []));
    } catch { setVeri([]); }
    setYukleniyor(false);
  }

  useEffect(() => { yukle(); }, [konfig.api]);

  const filtreli = useMemo(() => {
    if (!arama) return veri;
    const q = arama.toLowerCase();
    return veri.filter(v => (konfig.aramaAlanlari || []).some(a => String(v[a] || "").toLowerCase().includes(q)));
  }, [veri, arama, konfig.aramaAlanlari]);

  const toplamSayfa = Math.max(1, Math.ceil(filtreli.length / SAYFA_BOY));
  const gosterilen = filtreli.slice((sayfa - 1) * SAYFA_BOY, sayfa * SAYFA_BOY);

  async function toggleAlan(item) {
    const alan = konfig.toggleAlan;
    if (!alan) return;
    const yeniDeger = !item[alan];
    try {
      const r = await fetch(konfig.api, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, [alan]: yeniDeger }),
      });
      if (r.ok) setVeri(veri.map(v => v.id === item.id ? { ...v, [alan]: yeniDeger } : v));
    } catch {}
  }

  async function sil(id) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      const r = await fetch(konfig.api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (r.ok) setVeri(veri.filter(v => v.id !== id));
    } catch {}
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3">
        <input value={arama} onChange={(e) => { setArama(e.target.value); setSayfa(1); }}
               placeholder="Ara…"
               className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500" />
        <div className="text-xs text-gray-500">{filtreli.length} kayıt</div>
        {konfig.ekstraIslem?.tip === "csv-export" && (
          <a href={konfig.ekstraIslem.api}
             className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">
            {konfig.ekstraIslem.etiket}
          </a>
        )}
        <button onClick={yukle} className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">🔄 Yenile</button>
      </div>

      {yukleniyor ? (
        <div className="p-10 text-center text-gray-400 text-sm">Yükleniyor…</div>
      ) : filtreli.length === 0 ? (
        <div className="p-10 text-center text-gray-400 text-sm">Kayıt bulunamadı.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {konfig.kolonlar.map(c => (
                  <th key={c.k} className={`text-left px-3 py-2 text-xs font-semibold text-gray-600 ${c.w || ""}`}>{c.b}</th>
                ))}
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-600 w-32">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {gosterilen.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  {konfig.kolonlar.map(c => (
                    <td key={c.k} className="px-3 py-2 text-gray-700">
                      {c.tip === "boolean"
                        ? (item[c.k] ? <span className="text-green-600 text-xs font-semibold">✓</span> : <span className="text-amber-600 text-xs font-semibold">○</span>)
                        : <span className="truncate inline-block max-w-[220px] align-middle" title={String(item[c.k] ?? "")}>{String(item[c.k] ?? "—")}</span>}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right">
                    {konfig.toggleAlan && (
                      <button onClick={() => toggleAlan(item)}
                              className={`text-xs px-2 py-1 rounded mr-1 ${item[konfig.toggleAlan] ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {item[konfig.toggleAlan] ? "Pasifle" : "Onayla"}
                      </button>
                    )}
                    <button onClick={() => sil(item.id)}
                            className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100">
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toplamSayfa > 1 && (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <button disabled={sayfa <= 1} onClick={() => setSayfa(s => s - 1)}
                  className="px-3 py-1.5 border border-gray-200 rounded disabled:opacity-30">← Önceki</button>
          <span className="text-gray-500">Sayfa {sayfa} / {toplamSayfa}</span>
          <button disabled={sayfa >= toplamSayfa} onClick={() => setSayfa(s => s + 1)}
                  className="px-3 py-1.5 border border-gray-200 rounded disabled:opacity-30">Sonraki →</button>
        </div>
      )}
    </div>
  );
}
