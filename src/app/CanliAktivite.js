"use client";

import { useState, useEffect } from "react";

const SEHIRLER = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa", "Adana", "Mersin", "Konya", "Gaziantep", "Trabzon"];
const ISLEMLER = [
  "randevu alındı",
  "doktor profili incelendi",
  "yorum yazıldı",
  "randevu onaylandı",
];

function rastgele(dizi) {
  return dizi[Math.floor(Math.random() * dizi.length)];
}

function rastgeleSayi(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CanliAktivite() {
  const [mesaj, setMesaj] = useState(null);

  useEffect(() => {
    function uret() {
      const sehir = rastgele(SEHIRLER);
      const islem = rastgele(ISLEMLER);
      const dakika = rastgeleSayi(1, 45);
      setMesaj(`${sehir}'da ${dakika} dk önce ${islem}`);
    }
    uret();
    const interval = setInterval(uret, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!mesaj) return null;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 transition-all"
      style={{ backgroundColor: "rgba(14,124,123,0.12)", borderColor: "rgba(14,124,123,0.31)", border: "1px solid rgba(14,124,123,0.31)" }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span style={{ color: "#4DD9D8" }} className="text-sm font-medium">{mesaj}</span>
    </div>
  );
}
