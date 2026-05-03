"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function SifreSifirlaForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [basarili, setBasarili] = useState(false);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    if (sifre !== sifreTekrar) {
      setHata("Şifreler eşleşmiyor.");
      return;
    }
    setYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/auth/sifre-sifirla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, yeniSifre: sifre }),
      });
      const data = await res.json();
      if (res.ok) setBasarili(true);
      else setHata(data.hata || "Bir hata oluştu.");
    } catch {
      setHata("Bağlantı hatası.");
    } finally {
      setYukleniyor(false);
    }
  }

  if (!token) {
    return <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">Geçersiz bağlantı.</div>;
  }

  if (basarili) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-3">✓</div>
        <h2 className="font-bold text-gray-900 mb-2">Şifre Sıfırlandı</h2>
        <p className="text-sm text-gray-500 mb-6">Yeni şifrenizle giriş yapabilirsiniz.</p>
        <Link href="/giris" style={{ backgroundColor: "var(--teal)" }}
          className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={gonder} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
        <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} required minLength={6}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar</label>
        <input type="password" value={sifreTekrar} onChange={(e) => setSifreTekrar(e.target.value)} required minLength={6}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
      </div>
      {hata && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{hata}</div>}
      <button type="submit" disabled={yukleniyor}
        style={{ backgroundColor: "var(--navy)" }}
        className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-60">
        {yukleniyor ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"}
      </button>
    </form>
  );
}

export default function SifreSifirla() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Yeni Şifre Belirle</h1>
          <p className="text-sm text-gray-500 mb-6">Hesabınız için yeni bir şifre belirleyin.</p>
          <Suspense fallback={<div>Yükleniyor...</div>}>
            <SifreSifirlaForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
