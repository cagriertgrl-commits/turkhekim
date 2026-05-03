"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaketCTA({ paketSlug, populer, renk, cta, fallbackHref }) {
  const router = useRouter();
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function odeYap() {
    if (!paketSlug) {
      // Ücretsiz veya kurumsal paket — link gibi davran
      window.location.href = fallbackHref;
      return;
    }

    setYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/odeme/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paket: paketSlug, periyod: "aylik" }),
      });

      if (res.status === 401) {
        // Giriş yapmamış
        router.push(`/giris?redirect=/paketler`);
        return;
      }

      const data = await res.json();
      if (res.ok && data.paymentPageUrl) {
        window.location.href = data.paymentPageUrl;
      } else {
        setHata(data.hata || "Ödeme başlatılamadı.");
      }
    } catch {
      setHata("Bağlantı hatası.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <>
      <button
        onClick={odeYap}
        disabled={yukleniyor}
        style={populer
          ? { backgroundColor: renk, color: "white" }
          : { borderColor: renk, color: renk, backgroundColor: "white" }
        }
        className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 ${populer ? "" : "border-2"}`}
      >
        {yukleniyor ? "Yönlendiriliyor..." : cta}
      </button>
      {hata && <p className="text-xs text-red-600 mt-2 text-center">{hata}</p>}
    </>
  );
}
