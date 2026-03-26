"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Giris() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", sifre: "" });
  const [beniHatirla, setBeniHatirla] = useState(false);
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const guncelle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const gonder = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setHata("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, sifre: form.sifre, hatirla: beniHatirla }),
    });

    if (!res.ok) {
      try {
        const d = await res.json();
        setHata(d.hata || "Email veya şifre hatalı.");
      } catch {
        setHata("Sunucu hatası, tekrar deneyin.");
      }
      setYukleniyor(false);
      return;
    }

    router.push("/panel");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="#0E7C7B"/>
            <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="0.6" opacity="0.35"/>
            <line x1="16" y1="2.5" x2="16" y2="5.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <line x1="16" y1="26.5" x2="16" y2="29.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <line x1="2.5" y1="16" x2="5.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <line x1="26.5" y1="16" x2="29.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <polygon points="16,4.5 14,15 18,15" fill="#C9A84C"/>
            <polygon points="16,27.5 18,17 14,17" fill="white" opacity="0.5"/>
            <polygon points="4.5,16 15,14 15,18" fill="white" opacity="0.3"/>
            <polygon points="27.5,16 17,18 17,14" fill="white" opacity="0.3"/>
            <circle cx="16" cy="16" r="2" fill="white"/>
            <circle cx="16" cy="16" r="0.8" fill="#C9A84C"/>
          </svg>
          <span className="text-white font-bold text-xl tracking-tight">
            Doktor<span style={{ color: "#C9A84C" }}>Pusula</span>
          </span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h1 style={{ color: "#0D2137" }} className="text-2xl font-bold">Doktor Girişi</h1>
            <p className="text-gray-400 text-sm mt-1">Panelinize erişmek için giriş yapın</p>
          </div>

          <form onSubmit={gonder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={guncelle}
                placeholder="doktor@email.com"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                name="sifre"
                type="password"
                value={form.sifre}
                onChange={guncelle}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={beniHatirla}
                onChange={(e) => setBeniHatirla(e.target.checked)}
                className="w-4 h-4 rounded accent-teal-600"
              />
              <span className="text-sm text-gray-600">Beni hatırla <span className="text-gray-400">(30 gün)</span></span>
            </label>

            {hata && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm">{hata}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={yukleniyor}
              style={{ backgroundColor: "#0D2137" }}
              className="w-full text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Hesabınız yok mu?{" "}
            <Link href="/kayit-ol" style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
              Ücretsiz kayıt olun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
