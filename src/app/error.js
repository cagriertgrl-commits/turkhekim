"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Hatayı sunucuya log'la
    fetch("/api/hata-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mesaj: error?.message || String(error),
        stack: error?.stack,
        path: typeof window !== "undefined" ? window.location.pathname : "",
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-10 max-w-md text-center border border-gray-100 shadow-sm">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 style={{ color: "var(--navy)" }} className="text-xl font-bold mb-2">Bir hata oluştu</h1>
        <p className="text-gray-500 text-sm mb-6">
          Beklenmeyen bir hata yaşandı. Ekibimiz haberdar edildi.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} style={{ backgroundColor: "var(--teal)" }}
            className="text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
            Tekrar Dene
          </button>
          <Link href="/" className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50">
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
