"use client";
import { useEffect, useState } from "react";

export default function MusaitlikBolumu({ tercumanId }) {
  const [slots, setSlots] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch(`/api/tercuman/musaitlik?tercuman_id=${tercumanId}`)
      .then(r => r.json())
      .then(data => setSlots(data.slots || []))
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, [tercumanId]);

  const tarihGruplari = slots.reduce((acc, s) => {
    if (s.dolu) return acc;
    (acc[s.tarih] ||= []).push(s);
    return acc;
  }, {});
  const tarihler = Object.keys(tarihGruplari).slice(0, 14);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="font-bold mb-3" style={{ color: "var(--navy)" }}>📅 Müsaitlik Takvimi</h2>
      {yukleniyor ? (
        <div className="text-sm text-gray-400">Yükleniyor…</div>
      ) : tarihler.length === 0 ? (
        <div className="text-sm text-gray-400">Yayınlanan müsait zaman yok. Doğrudan iletişime geçin.</div>
      ) : (
        <ul className="space-y-2 text-sm">
          {tarihler.map((tarih) => (
            <li key={tarih} className="border-b border-gray-100 pb-2">
              <div className="text-xs text-gray-500 mb-1">
                {new Date(tarih).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              <div className="flex flex-wrap gap-1">
                {tarihGruplari[tarih].map((s) => (
                  <span key={s.id} className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full">
                    {s.baslangic_saat?.slice(0, 5)} – {s.bitis_saat?.slice(0, 5)}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
