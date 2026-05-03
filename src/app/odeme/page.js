"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function OdemeSonuc() {
  const params = useSearchParams();
  const durum = params.get("durum");
  const sebep = params.get("sebep");

  const basarili = durum === "basarili";

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">{basarili ? "✓" : "✗"}</div>
      <h1 style={{ color: "var(--navy)" }} className="text-xl font-bold mb-2">
        {basarili ? "Ödeme Başarılı" : "Ödeme Başarısız"}
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        {basarili
          ? "Paketiniz aktif edildi. Premium özelliklerin keyfini çıkarın."
          : sebep || "Ödeme tamamlanamadı. Tekrar denemek isterseniz paket sayfasına dönebilirsiniz."}
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/panel" style={{ backgroundColor: "var(--teal)" }}
          className="text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
          Panele Dön
        </Link>
        {!basarili && (
          <Link href="/paketler" className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50">
            Paketlere Dön
          </Link>
        )}
      </div>
    </div>
  );
}

export default function OdemeSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
          <Suspense fallback={<div className="text-center py-8 text-gray-400">Yükleniyor...</div>}>
            <OdemeSonuc />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
