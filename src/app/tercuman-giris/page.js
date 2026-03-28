"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function TercumanGiris() {
  const [form, setForm] = useState({ email: "", sifre: "" });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setYukleniyor(true);
    setHata(null);

    try {
      const res = await fetch("/api/tercuman/giris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setHata(data.hata || "Giriş yapılamadı.");
      } else {
        window.location.href = "/tercuman-panel";
      }
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ backgroundColor: "#EFF6FF" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
                <path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Tercüman Girişi</h1>
            <p className="text-sm text-gray-500 mt-1">Tercüman panelinize erişin</p>
          </div>

          <form onSubmit={gonder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
                placeholder="ornek@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                value={form.sifre}
                onChange={(e) => setForm((p) => ({ ...p, sifre: e.target.value }))}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {hata && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {hata}
              </div>
            )}

            <button
              type="submit"
              disabled={yukleniyor}
              style={{ backgroundColor: "var(--navy)" }}
              className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Henüz hesabınız yok mu?{" "}
            <Link href="/tercuman-ol" style={{ color: "var(--teal)" }} className="font-medium hover:underline">
              Kayıt olun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
