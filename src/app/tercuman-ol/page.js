"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const SEHIRLER = [
  "İstanbul", "Ankara", "İzmir", "Antalya", "Bursa", "Adana", "Gaziantep",
  "Konya", "Mersin", "Kayseri", "Trabzon", "Samsun", "Eskişehir", "Diyarbakır",
  "Muğla", "Aydın", "Denizli", "Tekirdağ", "Sakarya", "Manisa",
];

const DILLER = [
  "İngilizce", "Almanca", "Fransızca", "Arapça", "Rusça", "Farsça",
  "İspanyolca", "İtalyanca", "Çince", "Japonca", "Korece", "Portekizce",
  "Hollandaca", "Lehçe", "Romence", "Bulgarca", "Gürcüce", "Ukraynaca",
];

const UZMANLIK_ALANLARI = [
  "Tıbbi Tercümanlık",
  "Diş Hekimliği",
  "Estetik / Plastik Cerrahi",
  "Göz Hastalıkları",
  "Ortopedi",
  "Kardiyoloji",
  "Onkoloji",
  "Genel Sağlık",
  "Hasta Refakatçiliği",
];

export default function TercumanOl() {
  const [adim, setAdim] = useState(1);
  const [form, setForm] = useState({
    ad: "", soyad: "", email: "", sifre: "", telefon: "",
    diller: [], uzmanlik_alani: "", sertifikalar: "",
    deneyim_yil: "", sehir: "", fiyat: "", hakkinda: "",
    sozlesme_onaylandi: false, kvkk_onaylandi: false,
  });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);
  const [basarili, setBasarili] = useState(false);

  function guncelle(alan, deger) {
    setForm((p) => ({ ...p, [alan]: deger }));
  }

  function dilToggle(dil) {
    setForm((p) => ({
      ...p,
      diller: p.diller.includes(dil) ? p.diller.filter((d) => d !== dil) : [...p.diller, dil],
    }));
  }

  async function kayitOl(e) {
    e.preventDefault();
    setYukleniyor(true);
    setHata(null);

    try {
      const res = await fetch("/api/tercuman/kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          diller: form.diller.join(", "),
          deneyim_yil: parseInt(form.deneyim_yil) || 0,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setHata(data.hata || "Kayıt yapılamadı.");
      } else {
        setBasarili(true);
      }
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  }

  if (basarili) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: "#D1FAE5" }}>
              ✓
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Kayıt Başarılı!</h1>
            <p className="text-gray-500 text-sm mb-6">
              Başvurunuz alındı. Ekibimiz bilgilerinizi inceledikten sonra hesabınız aktif edilecektir. Size e-posta ile bilgi vereceğiz.
            </p>
            <Link href="/" style={{ color: "var(--teal)" }} className="text-sm font-medium hover:underline">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tercüman Olarak Katılın</h1>
          <p className="text-gray-500 text-sm mt-2">
            Medikal turizm tercümanı olarak DoktorPusula ailesine katılın
          </p>
        </div>

        {/* Adım göstergesi */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  adim >= s ? "text-white" : "bg-gray-200 text-gray-500"
                }`}
                style={adim >= s ? { backgroundColor: "var(--teal)" } : {}}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${adim > s ? "bg-teal-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={kayitOl}>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">

            {/* ADIM 1: Kişisel Bilgiler */}
            {adim === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad *</label>
                    <input type="text" required value={form.ad} onChange={(e) => guncelle("ad", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="Adınız" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
                    <input type="text" value={form.soyad} onChange={(e) => guncelle("soyad", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="Soyadınız" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                  <select value={form.sehir} onChange={(e) => guncelle("sehir", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                    <option value="">Şehir seçin</option>
                    {SEHIRLER.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input type="tel" required value={form.telefon} onChange={(e) => guncelle("telefon", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="+90 5XX XXX XX XX" />
                </div>

                <button type="button" onClick={() => setAdim(2)}
                  disabled={!form.ad || !form.telefon}
                  style={{ backgroundColor: "var(--teal)" }}
                  className="w-full text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 mt-4">
                  Devam Et
                </button>
              </div>
            )}

            {/* ADIM 2: Dil & Uzmanlık */}
            {adim === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Dil ve Uzmanlık</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bildiğiniz Diller * (en az 1)</label>
                  <div className="flex flex-wrap gap-2">
                    {DILLER.map((dil) => (
                      <button key={dil} type="button" onClick={() => dilToggle(dil)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          form.diller.includes(dil)
                            ? "text-white border-transparent"
                            : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
                        }`}
                        style={form.diller.includes(dil) ? { backgroundColor: "var(--teal)" } : {}}>
                        {dil}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Uzmanlık Alanı</label>
                  <select value={form.uzmanlik_alani} onChange={(e) => guncelle("uzmanlik_alani", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                    <option value="">Seçin (opsiyonel)</option>
                    {UZMANLIK_ALANLARI.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sertifikalar</label>
                  <input type="text" value={form.sertifikalar} onChange={(e) => guncelle("sertifikalar", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Ör: Yeminli Tercüman, Tıbbi Tercüme Sertifikası" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deneyim (yıl)</label>
                    <input type="number" min="0" max="50" value={form.deneyim_yil} onChange={(e) => guncelle("deneyim_yil", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seans Ücreti</label>
                    <input type="text" value={form.fiyat} onChange={(e) => guncelle("fiyat", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="Ör: 1500 TL / seans" />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setAdim(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Geri
                  </button>
                  <button type="button" onClick={() => setAdim(3)}
                    disabled={form.diller.length === 0}
                    style={{ backgroundColor: "var(--teal)" }}
                    className="flex-1 text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40">
                    Devam Et
                  </button>
                </div>
              </div>
            )}

            {/* ADIM 3: Hesap & Onay */}
            {adim === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hesap Bilgileri</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                  <input type="email" required value={form.email} onChange={(e) => guncelle("email", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="ornek@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şifre * (min 6 karakter)</label>
                  <input type="password" required minLength={6} value={form.sifre} onChange={(e) => guncelle("sifre", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="••••••••" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hakkınızda</label>
                  <textarea rows={3} maxLength={500} value={form.hakkinda} onChange={(e) => guncelle("hakkinda", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                    placeholder="Kendinizi kısaca tanıtın (max 500 karakter)" />
                  <p className="text-xs text-gray-400 text-right mt-1">{form.hakkinda.length}/500</p>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.sozlesme_onaylandi} onChange={(e) => guncelle("sozlesme_onaylandi", e.target.checked)}
                      className="mt-0.5 accent-teal-500" />
                    <span className="text-xs text-gray-600">
                      <Link href="/sozlesme" target="_blank" style={{ color: "var(--teal)" }} className="hover:underline">Kullanım sözleşmesini</Link> okudum ve kabul ediyorum.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.kvkk_onaylandi} onChange={(e) => guncelle("kvkk_onaylandi", e.target.checked)}
                      className="mt-0.5 accent-teal-500" />
                    <span className="text-xs text-gray-600">
                      <Link href="/kvkk" target="_blank" style={{ color: "var(--teal)" }} className="hover:underline">KVKK aydınlatma metnini</Link> okudum ve onaylıyorum.
                    </span>
                  </label>
                </div>

                {hata && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {hata}
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setAdim(2)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Geri
                  </button>
                  <button type="submit" disabled={yukleniyor || !form.sozlesme_onaylandi || !form.kvkk_onaylandi}
                    style={{ backgroundColor: "var(--navy)" }}
                    className="flex-1 text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40">
                    {yukleniyor ? "Kaydediliyor..." : "Kayıt Ol"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Zaten hesabınız var mı?{" "}
          <Link href="/tercuman-giris" style={{ color: "var(--teal)" }} className="font-medium hover:underline">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
