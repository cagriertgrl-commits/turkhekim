"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RandevuIptal() {
  const { token } = useParams();
  const [randevu, setRandevu] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");
  const [adim, setAdim] = useState("yukluyor"); // yukluyor | onay | basari | hata

  useEffect(() => {
    fetch(`/api/randevu-iptal?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.hata) {
          setHata(data.hata);
          setAdim("hata");
        } else {
          setRandevu(data);
          setAdim(data.durum === "iptal" ? "zaten_iptal" : "onay");
        }
        setYukleniyor(false);
      })
      .catch(() => { setHata("Bağlantı hatası."); setAdim("hata"); setYukleniyor(false); });
  }, [token]);

  async function iptalEt() {
    setAdim("yukluyor");
    try {
      const res = await fetch("/api/randevu-iptal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, sebep: "hasta_istedigi" }),
      });
      const data = await res.json();
      if (res.ok) setAdim("basari");
      else { setHata(data.hata || "Bir hata oluştu."); setAdim("hata"); }
    } catch (err) {
      console.error("Randevu iptal hatası:", err);
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
      setAdim("hata");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl text-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
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
          <span style={{ color: "#0D2137" }} className="font-bold text-lg">Doktor<span style={{ color: "#F5C842" }}>Pusula</span></span>
        </Link>

        {(adim === "yukluyor" || yukleniyor) && (
          <div>
            <div className="text-3xl mb-3">⏳</div>
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        )}

        {adim === "onay" && randevu && (
          <>
            <div className="text-3xl mb-3">📅</div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">Randevu İptali</h1>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <p className="text-sm text-gray-600"><span className="font-medium">Doktor:</span> {randevu.doktor_ad}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Uzmanlık:</span> {randevu.uzmanlik}</p>
              {randevu.tarih && <p className="text-sm text-gray-600"><span className="font-medium">Tarih:</span> {new Date(randevu.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}{randevu.saat ? ` · ${randevu.saat}` : ""}</p>}
            </div>
            <p className="text-gray-500 text-sm mb-6">Bu randevuyu iptal etmek istediğinize emin misiniz?</p>
            <div className="flex gap-3">
              <Link href="/" className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
                Vazgeç
              </Link>
              <button
                onClick={iptalEt}
                style={{ backgroundColor: "#DC2626" }}
                className="flex-1 text-white py-3 rounded-xl text-sm font-bold hover:opacity-90"
              >
                Randevuyu İptal Et
              </button>
            </div>
          </>
        )}

        {adim === "basari" && (
          <>
            <div className="text-4xl mb-3">✅</div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">İptal Edildi</h1>
            <p className="text-gray-500 text-sm mb-6">Randevunuz başarıyla iptal edildi. Doktorunuz bilgilendirildi.</p>
            <Link href="/" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-8 py-3 rounded-xl font-medium text-sm hover:opacity-90">
              Ana Sayfaya Dön
            </Link>
          </>
        )}

        {adim === "zaten_iptal" && (
          <>
            <div className="text-4xl mb-3">ℹ️</div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">Zaten İptal</h1>
            <p className="text-gray-500 text-sm mb-6">Bu randevu daha önce iptal edilmiş.</p>
            <Link href="/" className="inline-block border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-medium text-sm hover:bg-gray-50">
              Ana Sayfaya Dön
            </Link>
          </>
        )}

        {adim === "hata" && (
          <>
            <div className="text-4xl mb-3">❌</div>
            <h1 className="font-bold text-gray-900 text-xl mb-2">Bir Sorun Oluştu</h1>
            <p className="text-red-500 text-sm mb-6">{hata}</p>
            <Link href="/" className="inline-block border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-medium text-sm hover:bg-gray-50">
              Ana Sayfaya Dön
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
