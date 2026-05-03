"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function EmailDogrulaContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const [durum, setDurum] = useState("yukluyor"); // yukluyor | basarili | hata
  const [mesaj, setMesaj] = useState("");

  useEffect(() => {
    if (!token) {
      setDurum("hata");
      setMesaj("Geçersiz bağlantı.");
      return;
    }
    fetch("/api/auth/email-dogrula", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (ok) {
          setDurum("basarili");
          setMesaj(d.mesaj || "E-postanız doğrulandı.");
        } else {
          setDurum("hata");
          setMesaj(d.hata || "Bir hata oluştu.");
        }
      })
      .catch(() => {
        setDurum("hata");
        setMesaj("Bağlantı hatası.");
      });
  }, [token]);

  if (durum === "yukluyor") {
    return <div className="text-center py-8 text-gray-400">Doğrulanıyor...</div>;
  }

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">{durum === "basarili" ? "✓" : "✗"}</div>
      <h2 className="font-bold text-gray-900 mb-2">
        {durum === "basarili" ? "E-postanız Doğrulandı" : "Doğrulama Başarısız"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">{mesaj}</p>
      <Link
        href={durum === "basarili" ? "/giris" : "/"}
        style={{ backgroundColor: "var(--teal)" }}
        className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90"
      >
        {durum === "basarili" ? "Giriş Yap" : "Ana Sayfa"}
      </Link>
    </div>
  );
}

export default function EmailDogrula() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <Suspense fallback={<div>Yükleniyor...</div>}>
            <EmailDogrulaContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
