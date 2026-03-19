"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Giris() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", sifre: "" });
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const guncelle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const gonder = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setHata("");

    const sonuc = await signIn("credentials", {
      email: form.email,
      sifre: form.sifre,
      redirect: false,
    });

    if (sonuc?.error) {
      setHata("Email veya şifre hatalı.");
      setYukleniyor(false);
      return;
    }

    router.push("/panel");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <a href="/" className="flex items-center gap-2 w-fit">
          <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TH</span>
          </div>
          <span className="text-white font-bold text-xl">DoktorPusula</span>
        </a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div style={{ backgroundColor: "#E8F5F5" }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏥</span>
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
            <a href="/doktor-ol" style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
              Ücretsiz kayıt olun
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
