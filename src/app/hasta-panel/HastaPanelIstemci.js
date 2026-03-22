"use client";

import { useState } from "react";
import Link from "next/link";

const DURUM_MAP = {
  bekliyor: { metin: "Bekliyor", renk: "#D97706", bg: "#FEF3C7", ikon: "⏳" },
  onaylandi: { metin: "Onaylandı", renk: "#059669", bg: "#D1FAE5", ikon: "✓" },
  tamamlandi: { metin: "Tamamlandı", renk: "#1D4ED8", bg: "#DBEAFE", ikon: "✓✓" },
  iptal: { metin: "İptal Edildi", renk: "#DC2626", bg: "#FEE2E2", ikon: "✗" },
};

function durumBilgi(durum) {
  return DURUM_MAP[durum] || { metin: durum, renk: "#6B7280", bg: "#F3F4F6", ikon: "?" };
}

function tarihFormat(tarih, saat) {
  if (!tarih) return null;
  const d = new Date(tarih);
  const gun = d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  return saat ? `${gun} – ${saat}` : gun;
}

function iptalEdilebilirMi(r) {
  if (r.durum !== "bekliyor" && r.durum !== "onaylandi") return false;
  if (!r.tarih) return true;
  const fark = (new Date(r.tarih) - new Date()) / (1000 * 60 * 60);
  return fark > 2;
}

export default function HastaPanelIstemci() {
  const [telefon, setTelefon] = useState("");
  const [ad, setAd] = useState("");
  const [sorguluyor, setSorguluyor] = useState(false);
  const [randevular, setRandevular] = useState(null);
  const [hata, setHata] = useState(null);
  const [iptalYapiliyor, setIptalYapiliyor] = useState(null);

  async function sorgula(e) {
    e.preventDefault();
    if (!telefon.trim()) return;
    setSorguluyor(true);
    setHata(null);
    setRandevular(null);
    try {
      const params = new URLSearchParams({ telefon: telefon.trim() });
      if (ad.trim()) params.append("ad", ad.trim());
      const res = await fetch(`/api/hasta-randevu?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setHata(data.hata || "Bir hata oluştu.");
      } else {
        setRandevular(data.randevular || []);
      }
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setSorguluyor(false);
    }
  }

  async function randevuIptal(randevuId, iptalToken) {
    if (!confirm("Bu randevuyu iptal etmek istediğinize emin misiniz?")) return;
    setIptalYapiliyor(randevuId);
    try {
      if (iptalToken) {
        // Token'lı iptal linki varsa POST to randevu-iptal API
        const res = await fetch(`/api/randevu-iptal`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: iptalToken }),
        });
        if (res.ok) {
          setRandevular(prev => prev.map(r => r.id === randevuId ? { ...r, durum: "iptal" } : r));
        }
      } else {
        // Fallback: direkt durum güncellemesi
        await fetch("/api/randevu-durum", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: randevuId, durum: "iptal" }),
        });
        setRandevular(prev => prev.map(r => r.id === randevuId ? { ...r, durum: "iptal" } : r));
      }
    } catch {
      alert("İptal işlemi başarısız. Lütfen tekrar deneyin.");
    } finally {
      setIptalYapiliyor(null);
    }
  }

  const aktifler = randevular?.filter(r => r.durum === "bekliyor" || r.durum === "onaylandi") || [];
  const gecmis = randevular?.filter(r => r.durum === "tamamlandi" || r.durum === "iptal") || [];

  return (
    <div className="space-y-6">
      {/* Sorgulama Formu */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4">Randevularımı Sorgula</h2>
        <form onSubmit={sorgula} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası *</label>
            <input
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="05XX XXX XX XX"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad (opsiyonel)</label>
            <input
              type="text"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              placeholder="Adınızı girin"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button
            type="submit"
            disabled={sorguluyor || !telefon.trim()}
            style={{ backgroundColor: "var(--navy)" }}
            className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {sorguluyor ? "Sorgulanıyor…" : "Randevularımı Göster"}
          </button>
        </form>
      </div>

      {/* Hata */}
      {hata && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {hata}
        </div>
      )}

      {/* Sonuçlar */}
      {randevular !== null && (
        <>
          {randevular.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-600 font-semibold">Randevu Bulunamadı</p>
              <p className="text-gray-400 text-sm mt-1">Bu telefon numarasına ait randevu kaydı yok.</p>
            </div>
          ) : (
            <>
              {/* Aktif Randevular */}
              {aktifler.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Aktif Randevular ({aktifler.length})</h3>
                  <div className="space-y-4">
                    {aktifler.map((r) => {
                      const d = durumBilgi(r.durum);
                      const tarihMetni = tarihFormat(r.tarih, r.saat);
                      const iptalOlur = iptalEdilebilirMi(r);
                      return (
                        <div key={r.id} className="rounded-xl border border-gray-100 p-4">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              <Link href={`/doktor/${r.doktor_slug}`} className="font-semibold text-gray-900 hover:text-teal-700 transition-colors">
                                {r.doktor_unvan ? `${r.doktor_unvan} ` : ""}{r.doktor_ad} {r.doktor_soyad || ""}
                              </Link>
                              <p style={{ color: "var(--teal)" }} className="text-sm">{r.uzmanlik}</p>
                              {tarihMetni && <p className="text-gray-500 text-sm mt-1">📅 {tarihMetni}</p>}
                              {r.sikayet && <p className="text-gray-500 text-sm mt-1">🗒 {r.sikayet}</p>}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ backgroundColor: d.bg, color: d.renk }}
                              >
                                {d.ikon} {d.metin}
                              </span>
                              {iptalOlur && (
                                <button
                                  onClick={() => randevuIptal(r.id, r.iptal_token)}
                                  disabled={iptalYapiliyor === r.id}
                                  className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-60"
                                >
                                  {iptalYapiliyor === r.id ? "İptal ediliyor…" : "İptal Et"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Geçmiş Randevular */}
              {gecmis.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Geçmiş Randevular ({gecmis.length})</h3>
                  <div className="space-y-3">
                    {gecmis.map((r) => {
                      const d = durumBilgi(r.durum);
                      const tarihMetni = tarihFormat(r.tarih, r.saat);
                      return (
                        <div key={r.id} className="rounded-xl border border-gray-100 p-4">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                              <Link href={`/doktor/${r.doktor_slug}`} className="font-semibold text-gray-800 text-sm hover:text-teal-700 transition-colors">
                                {r.doktor_unvan ? `${r.doktor_unvan} ` : ""}{r.doktor_ad} {r.doktor_soyad || ""}
                              </Link>
                              <p className="text-gray-500 text-xs">{r.uzmanlik}{tarihMetni ? ` · ${tarihMetni}` : ""}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ backgroundColor: d.bg, color: d.renk }}
                              >
                                {d.ikon} {d.metin}
                              </span>
                              {r.durum === "tamamlandi" && (
                                <Link
                                  href={`/doktor/${r.doktor_slug}#yorumlar`}
                                  className="text-xs font-semibold"
                                  style={{ color: "var(--teal)" }}
                                >
                                  Yorum Yaz →
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Hızlı Linkler */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 text-sm">Hızlı Erişim</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/istanbul/kbb-uzmani" className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-teal-300 transition-colors text-sm text-gray-600">
            🔍 Doktor Ara
          </Link>
          <Link href="/hasta-profili" className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-teal-300 transition-colors text-sm text-gray-600">
            👤 Sağlık Profilim
          </Link>
          <Link href="/feed" className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-teal-300 transition-colors text-sm text-gray-600">
            📰 Sağlık Haberleri
          </Link>
          <Link href="/hasta-formlari" className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-teal-300 transition-colors text-sm text-gray-600">
            📋 Hasta Formları
          </Link>
        </div>
      </div>
    </div>
  );
}
