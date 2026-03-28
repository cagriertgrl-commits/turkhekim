"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function TercumanPanel() {
  const [tercuman, setTercuman] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);
  const [duzenle, setDuzenle] = useState(false);
  const [form, setForm] = useState({});
  const [kaydediyor, setKaydediyor] = useState(false);

  useEffect(() => {
    async function yukle() {
      try {
        const res = await fetch("/api/tercuman/beni-getir");
        const data = await res.json();

        if (!res.ok || !data.tercuman) {
          window.location.href = "/tercuman-giris";
          return;
        }

        setTercuman(data.tercuman);
        setForm({
          telefon: data.tercuman.telefon || "",
          diller: data.tercuman.diller || "",
          uzmanlik_alani: data.tercuman.uzmanlik_alani || "",
          sertifikalar: data.tercuman.sertifikalar || "",
          deneyim_yil: data.tercuman.deneyim_yil || 0,
          sehir: data.tercuman.sehir || "",
          fiyat: data.tercuman.fiyat || "",
          hakkinda: data.tercuman.hakkinda || "",
          musait: data.tercuman.musait,
        });
      } catch {
        setHata("Veriler yüklenemedi.");
      } finally {
        setYukleniyor(false);
      }
    }
    yukle();
  }, []);

  async function cikisYap() {
    await fetch("/api/tercuman/cikis", { method: "POST" });
    window.location.href = "/tercuman-giris";
  }

  async function profilKaydet() {
    setKaydediyor(true);
    try {
      const res = await fetch("/api/tercuman/profil-guncelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        setTercuman((p) => ({ ...p, ...data.tercuman }));
        setDuzenle(false);
      }
    } catch {
      setHata("Profil güncellenemedi.");
    } finally {
      setKaydediyor(false);
    }
  }

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-48 bg-gray-200 rounded-2xl" />
            <div className="h-32 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!tercuman) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Merhaba, {tercuman.ad} {tercuman.soyad || ""}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Tercüman Panelinize Hoşgeldiniz</p>
          </div>
          <button onClick={cikisYap}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors">
            Çıkış Yap
          </button>
        </div>

        {hata && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
            {hata}
          </div>
        )}

        {/* Durum kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Hesap Durumu</p>
            <p className={`text-sm font-bold ${tercuman.aktif ? "text-green-600" : "text-orange-500"}`}>
              {tercuman.aktif ? "Aktif" : "Onay Bekliyor"}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Müsaitlik</p>
            <p className={`text-sm font-bold ${tercuman.musait ? "text-green-600" : "text-gray-400"}`}>
              {tercuman.musait ? "Müsait" : "Meşgul"}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Diller</p>
            <p className="text-sm font-bold text-gray-800">{tercuman.diller || "-"}</p>
          </div>
        </div>

        {/* Profil kartı */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Profil Bilgileri</h2>
            <button onClick={() => setDuzenle(!duzenle)}
              style={{ color: "var(--teal)" }}
              className="text-sm font-medium hover:underline">
              {duzenle ? "İptal" : "Düzenle"}
            </button>
          </div>

          {duzenle ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Telefon</label>
                  <input type="tel" value={form.telefon} onChange={(e) => setForm((p) => ({ ...p, telefon: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Şehir</label>
                  <input type="text" value={form.sehir} onChange={(e) => setForm((p) => ({ ...p, sehir: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Diller</label>
                <input type="text" value={form.diller} onChange={(e) => setForm((p) => ({ ...p, diller: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="İngilizce, Almanca, Arapça" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Uzmanlık Alanı</label>
                  <input type="text" value={form.uzmanlik_alani} onChange={(e) => setForm((p) => ({ ...p, uzmanlik_alani: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Seans Ücreti</label>
                  <input type="text" value={form.fiyat} onChange={(e) => setForm((p) => ({ ...p, fiyat: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Sertifikalar</label>
                <input type="text" value={form.sertifikalar} onChange={(e) => setForm((p) => ({ ...p, sertifikalar: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Hakkınızda</label>
                <textarea rows={3} maxLength={500} value={form.hakkinda} onChange={(e) => setForm((p) => ({ ...p, hakkinda: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none" />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.musait} onChange={(e) => setForm((p) => ({ ...p, musait: e.target.checked }))}
                    className="accent-teal-500" />
                  <span className="text-sm text-gray-700">Müsaitim</span>
                </label>
              </div>

              <button onClick={profilKaydet} disabled={kaydediyor}
                style={{ backgroundColor: "var(--teal)" }}
                className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                {kaydediyor ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <Bilgi label="E-posta" value={tercuman.email} />
              <Bilgi label="Telefon" value={tercuman.telefon} />
              <Bilgi label="Şehir" value={tercuman.sehir} />
              <Bilgi label="Uzmanlık" value={tercuman.uzmanlik_alani} />
              <Bilgi label="Sertifikalar" value={tercuman.sertifikalar} />
              <Bilgi label="Deneyim" value={tercuman.deneyim_yil ? `${tercuman.deneyim_yil} yıl` : null} />
              <Bilgi label="Seans Ücreti" value={tercuman.fiyat} />
              <Bilgi label="Hakkında" value={tercuman.hakkinda} className="col-span-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Bilgi({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value || "—"}</p>
    </div>
  );
}