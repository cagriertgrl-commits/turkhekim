"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";



const uzmanliklar = [
  "KBB Uzmanı", "Plastik Cerrah", "Göz Hastalıkları", "Ortopedi",
  "Kardiyoloji", "Nöroloji", "Dermatoloji", "Diş Hekimi",
  "Genel Cerrahi", "Üroloji", "Kadın Hastalıkları ve Doğum",
  "Çocuk Sağlığı ve Hastalıkları", "Psikiyatri", "Fizik Tedavi",
  "Onkoloji", "Endokrinoloji", "Gastroenteroloji", "Diğer",
];

const sehirler = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya",
  "Eskişehir", "Adana", "Gaziantep", "Konya", "Kayseri",
];

export default function DoktorOl() {
  const [adim, setAdim] = useState(1);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [tamamlandi, setTamamlandi] = useState(false);
  const [profilSlug, setProfilSlug] = useState("");
  const [hata, setHata] = useState("");

  const baslangicUzmanlik = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("uzmanlik") || ""
    : "";

  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    unvan: "",
    uzmanlik: baslangicUzmanlik,
    sehir: "",
    ilce: "",
    telefon: "",
    email: "",
    sifre: "",
    deneyim: "",
    diploma_no: "",
    hakkinda: "",
  });

  const [onaylar, setOnaylar] = useState({
    sozlesme: false,
    kvkk: false,
  });

  const guncelle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setHata("");
  };

  const ileriGit = () => {
    if (adim === 1) {
      if (!form.ad || !form.soyad || !form.uzmanlik || !form.sehir) {
        setHata("Lütfen tüm zorunlu alanları doldurun.");
        return;
      }
    }
    if (adim === 2) {
      if (!form.telefon || !form.email) {
        setHata("Lütfen telefon ve email alanlarını doldurun.");
        return;
      }
    }
    setAdim(adim + 1);
  };

  const gonder = async () => {
    if (!onaylar.sozlesme || !onaylar.kvkk) {
      setHata("Devam edebilmek için kullanım koşullarını ve KVKK metnini onaylamanız gerekiyor.");
      return;
    }
    setYukleniyor(true);
    setHata("");
    try {
      const res = await fetch("/api/doktor-kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sozlesme_onaylandi: true, kvkk_onaylandi: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(data.hata || "Bir hata oluştu.");
        setYukleniyor(false);
        return;
      }
      setProfilSlug(data.slug);
      setTamamlandi(true);
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
    setYukleniyor(false);
  };

  if (tamamlandi) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <div className="text-6xl mb-4">🎉</div>
            <h1 style={{ color: "#0D2137" }} className="text-2xl font-bold mb-3">Kaydınız Alındı!</h1>
            <p className="text-gray-500 mb-6">Profiliniz inceleme aşamasındadır. En kısa sürede yayına alınacaktır.</p>
            <a
              href={`/doktor/${profilSlug}`}
              style={{ backgroundColor: "#0E7C7B" }}
              className="inline-block text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Profilimi Gör
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* BAŞLIK */}
      <div style={{ backgroundColor: "#0D2137" }} className="px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-white text-3xl font-bold mb-3">Ücretsiz Profilinizi Oluşturun</h1>
          <p className="text-gray-300">180.000 Türk hekimi arasında öne çıkın. Kayıt ücretsiz.</p>
        </div>
      </div>

      {/* ADIM GÖSTERGESİ */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2 flex-1">
              <div
                style={adim >= n ? { backgroundColor: "#0E7C7B" } : { backgroundColor: "#E5E7EB" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              >
                {adim > n ? "✓" : n}
              </div>
              <span className={`text-sm ${adim >= n ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                {n === 1 ? "Klinik Bilgileri" : n === 2 ? "İletişim" : "Hakkında"}
              </span>
              {n < 3 && <div style={{ backgroundColor: adim > n ? "#0E7C7B" : "#E5E7EB" }} className="flex-1 h-0.5 mx-2" />}
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">

          {/* ADIM 1 */}
          {adim === 1 && (
            <div className="space-y-5">
              <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-6">Klinik Bilgileriniz</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unvan</label>
                  <select name="unvan" value={form.unvan} onChange={guncelle}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-teal-500 bg-white">
                    <option value="">Seçiniz</option>
                    <option value="Pratisyen Dr.">Pratisyen Dr.</option>
                    <option value="Uzm. Dr.">Uzm. Dr.</option>
                    <option value="Asst. Dr.">Asst. Dr.</option>
                    <option value="Doç. Dr.">Doç. Dr.</option>
                    <option value="Prof. Dr.">Prof. Dr.</option>
                    <option value="Op. Dr.">Op. Dr.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ad <span className="text-red-500">*</span></label>
                  <input name="ad" value={form.ad} onChange={guncelle} placeholder="Adınız"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soyad <span className="text-red-500">*</span></label>
                  <input name="soyad" value={form.soyad} onChange={guncelle} placeholder="Soyadınız"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uzmanlık Alanı <span className="text-red-500">*</span></label>
                <select
                  name="uzmanlik"
                  value={form.uzmanlik}
                  onChange={guncelle}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 bg-white"
                >
                  <option value="">Seçiniz...</option>
                  {uzmanliklar.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Şehir <span className="text-red-500">*</span></label>
                  <select
                    name="sehir"
                    value={form.sehir}
                    onChange={guncelle}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="">Seçiniz...</option>
                    {sehirler.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
                  <input
                    name="ilce"
                    value={form.ilce}
                    onChange={guncelle}
                    placeholder="Kadıköy"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deneyim Yılı</label>
                  <input name="deneyim" value={form.deneyim} onChange={guncelle} placeholder="10 yıl"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diploma No</label>
                  <input name="diploma_no" value={form.diploma_no} onChange={guncelle} placeholder="123456"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500" />
                  <p className="text-xs text-gray-400 mt-1">Doğrulama sürecini hızlandırır</p>
                </div>
              </div>
            </div>
          )}

          {/* ADIM 2 */}
          {adim === 2 && (
            <div className="space-y-5">
              <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-6">İletişim Bilgileriniz</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon <span className="text-red-500">*</span></label>
                <input
                  name="telefon"
                  value={form.telefon}
                  onChange={guncelle}
                  placeholder="0532 xxx xx xx"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                />
                <p className="text-xs text-gray-400 mt-1">Randevu bildirimleri bu numaraya gelecektir.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta <span className="text-red-500">*</span></label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={guncelle}
                  placeholder="doktor@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifre <span className="text-red-500">*</span></label>
                <input
                  name="sifre"
                  type="password"
                  value={form.sifre}
                  onChange={guncelle}
                  placeholder="En az 6 karakter"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
                />
                <p className="text-xs text-gray-400 mt-1">Panele giriş için kullanacaksınız.</p>
              </div>

              <div style={{ backgroundColor: "#E8F5F5", borderColor: "#0E7C7B" }} className="border rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  🔒 Bilgileriniz üçüncü şahıslarla paylaşılmaz. Sadece randevu bildirimleri için kullanılır.
                </p>
              </div>
            </div>
          )}

          {/* ADIM 3 */}
          {adim === 3 && (
            <div className="space-y-5">
              <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-6">Kendinizi Tanıtın</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hakkınızda</label>
                <textarea
                  name="hakkinda"
                  value={form.hakkinda}
                  onChange={guncelle}
                  rows={5}
                  placeholder="Eğitiminiz, uzmanlık alanlarınız ve hasta yaklaşımınız hakkında kısa bir bilgi yazın..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">{form.hakkinda.length} / 500 karakter</p>
              </div>

              {/* Özet */}
              <div style={{ backgroundColor: "#F5F7FA" }} className="rounded-xl p-5">
                <h3 className="font-bold text-sm text-gray-700 mb-3">Profil Özeti</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>👤 {form.unvan ? `${form.unvan} ${form.ad}` : form.ad}</p>
                  <p>🏥 {form.uzmanlik}</p>
                  <p>📍 {form.sehir}{form.ilce ? ` · ${form.ilce}` : ""}</p>
                  <p>📞 {form.telefon}</p>
                  <p>📧 {form.email}</p>
                </div>
              </div>

              {/* ONAY KUTULARI */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onaylar.sozlesme}
                    onChange={(e) => setOnaylar({ ...onaylar, sozlesme: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-teal-600 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    <a href="/kullanim-kosullari" target="_blank" style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
                      Doktor Kullanım Koşulları
                    </a>
                    'nı okudum ve kabul ediyorum.{" "}
                    <span className="text-red-500 font-medium">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onaylar.kvkk}
                    onChange={(e) => setOnaylar({ ...onaylar, kvkk: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-teal-600 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    <a href="/gizlilik" target="_blank" style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
                      KVKK Aydınlatma Metni
                    </a>
                    'ni okudum; kişisel verilerimin işlenmesine açık rıza veriyorum.{" "}
                    <span className="text-red-500 font-medium">*</span>
                  </span>
                </label>

                {(!onaylar.sozlesme || !onaylar.kvkk) && (
                  <p className="text-xs text-gray-400">
                    * İşaretli alanlar profil oluşturabilmek için zorunludur.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* HATA */}
          {hata && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{hata}</p>
            </div>
          )}

          {/* BUTONLAR */}
          <div className="flex gap-3 mt-8">
            {adim > 1 && (
              <button
                onClick={() => setAdim(adim - 1)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                ← Geri
              </button>
            )}
            {adim < 3 ? (
              <button
                onClick={ileriGit}
                style={{ backgroundColor: "#0D2137" }}
                className="flex-1 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Devam Et →
              </button>
            ) : (
              <button
                onClick={gonder}
                disabled={yukleniyor}
                style={{ backgroundColor: "#0E7C7B" }}
                className="flex-1 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {yukleniyor ? "Kaydediliyor..." : "Profili Oluştur ✓"}
              </button>
            )}
          </div>
        </div>

        {/* ALT BİLGİ */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: "🆓", baslik: "Ücretsiz", aciklama: "Temel profil tamamen ücretsiz" },
            { icon: "✅", baslik: "Hızlı Yayın", aciklama: "24 saat içinde profiliniz yayında" },
            { icon: "📈", baslik: "Büyüyün", aciklama: "Aylık hasta analitiği ile gelişin" },
          ].map((item) => (
            <div key={item.baslik} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-bold text-sm text-gray-900">{item.baslik}</p>
              <p className="text-xs text-gray-400 mt-1">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
