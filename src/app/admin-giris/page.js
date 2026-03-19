"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGiris() {
  const router = useRouter();
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const gonder = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setHata("");

    const res = await fetch("/api/admin-giris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sifre }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setHata("Hatalı şifre.");
      setYukleniyor(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-white text-xl font-bold">Admin Girişi</h1>
          <p className="text-gray-400 text-sm mt-1">DoktorPusula Yönetim</p>
        </div>
        <form onSubmit={gonder} className="space-y-3">
          <input
            type="password"
            value={sifre}
            onChange={e => { setSifre(e.target.value); setHata(""); }}
            placeholder="Admin şifresi"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
          />
          {hata && <p className="text-red-400 text-sm">{hata}</p>}
          <button
            type="submit"
            disabled={yukleniyor}
            style={{ backgroundColor: "#0E7C7B" }}
            className="w-full text-white py-3 rounded-xl font-medium hover:opacity-90 disabled:opacity-50"
          >
            {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
