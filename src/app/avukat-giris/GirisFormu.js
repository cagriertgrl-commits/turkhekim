"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GirisFormu() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/avukat/giris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sifre }),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Giriş başarısız.");
      } else {
        router.push("/avukat-panel");
      }
    } catch {
      setHata("Sunucuya ulaşılamadı.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <form onSubmit={gonder} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">E-posta</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Şifre</label>
        <input
          required
          type="password"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
        />
      </div>
      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
      <button
        type="submit"
        disabled={yukleniyor}
        style={{ backgroundColor: "var(--navy)" }}
        className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-40 hover:opacity-90"
      >
        {yukleniyor ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Hesabınız yok mu? <Link href="/avukat-kayit" className="underline" style={{ color: "var(--teal)" }}>Kayıt olun</Link>
      </p>
    </form>
  );
}
