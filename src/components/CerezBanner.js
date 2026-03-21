"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CerezBanner() {
  const [goster, setGoster] = useState(false);

  useEffect(() => {
    try {
      const onay = localStorage.getItem("cerez-onay");
      if (!onay) setGoster(true);
    } catch {
      // localStorage erişimi yoksa sessizce geç
    }
  }, []);

  function kabul() {
    try {
      localStorage.setItem("cerez-onay", "1");
    } catch {
      // sessiz hata
    }
    setGoster(false);
  }

  if (!goster) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 shadow-lg"
      style={{ backgroundColor: "#0D2137" }}
      role="dialog"
      aria-label="Çerez bildirimi"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white text-sm text-center sm:text-left leading-relaxed">
          Bu site, daha iyi bir deneyim sunmak için çerez kullanmaktadır. Devam ederek{" "}
          <Link
            href="/gizlilik"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "#4DD9D8" }}
          >
            çerez politikamızı
          </Link>{" "}
          kabul etmiş olursunuz.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/gizlilik"
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors underline"
          >
            Gizlilik Politikası
          </Link>
          <button
            onClick={kabul}
            className="text-sm font-semibold px-5 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0E7C7B" }}
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
