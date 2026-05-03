"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SifreUnuttum() {
  const [email, setEmail] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setYukleniyor(true);
    setHata(null);
    setMesaj(null);
    try {
      const res = await fetch("/api/auth/sifre-sifirla-iste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMesaj(data.mesaj || "E-posta gönderildi.");
      } else {
        setHata(data.hata || "Bir hata oluştu.");
      }
    } catch {
      setHata("Bağlantı hatası.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Şifremi Unuttum</h1>
          <p className="text-sm text-gray-500 mb-6">E-posta adresinize sıfırlama linki göndereceğiz.</p>

          <form onSubmit={gonder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="hesabiniz@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>

            {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{hata}</div>}
            {mesaj && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">{mesaj}</div>}

            <button type="submit" disabled={yukleniyor || !!mesaj}
              style={{ backgroundColor: "var(--navy)" }}
              className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-60">
              {yukleniyor ? "Gönderiliyor..." : "Sıfırlama Linki Gönder"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/giris" style={{ color: "var(--teal)" }} className="hover:underline">← Girişe dön</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
