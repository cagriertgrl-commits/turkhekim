"use client";

import { useState, useRef, useEffect } from "react";

export default function GorusmeOzetSayfasi() {
  const [tarayiciDestekli, setTarayiciDestekli] = useState(null);
  const [kayitDurumu, setKayitDurumu] = useState("bekliyor"); // bekliyor | kayit | bitti
  const [transkript, setTranskript] = useState("");
  const [geciciMetin, setGeciciMetin] = useState("");
  const [ozet, setOzet] = useState(null);
  const [ozetYukleniyor, setOzetYukleniyor] = useState(false);
  const [kayitYukleniyor, setKayitYukleniyor] = useState(false);
  const [kaydedildi, setKaydedildi] = useState(false);
  const [hata, setHata] = useState(null);
  const [hastaAd, setHastaAd] = useState("");
  const [hastaSoyad, setHastaSoyad] = useState("");
  const [sure, setSure] = useState(0);

  const recognitionRef = useRef(null);
  const sureRef = useRef(null);
  const transkriptRef = useRef("");
  const aktifRef = useRef(false);

  useEffect(() => {
    const destekli = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    setTarayiciDestekli(destekli);
  }, []);

  function kaydiBaslat() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "tr-TR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      let gecici = "";
      let kesin = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) kesin += e.results[i][0].transcript + " ";
        else gecici += e.results[i][0].transcript;
      }
      if (kesin) {
        transkriptRef.current += kesin;
        setTranskript(transkriptRef.current);
      }
      setGeciciMetin(gecici);
    };

    recognition.onerror = (e) => {
      if (e.error === "aborted" || e.error === "no-speech") return;
      setHata("Mikrofon hatası: " + e.error);
      aktifRef.current = false;
      setKayitDurumu("bitti");
    };

    recognition.onend = () => {
      if (aktifRef.current) recognition.start();
    };

    aktifRef.current = true;
    recognition.start();
    recognitionRef.current = recognition;
    setKayitDurumu("kayit");
    setHata(null);
    sureRef.current = setInterval(() => setSure((s) => s + 1), 1000);
  }

  function kaydiBitir() {
    aktifRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }
    clearInterval(sureRef.current);
    setGeciciMetin("");
    setKayitDurumu("bitti");
  }

  function sureFormat(s) {
    return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  }

  const hastaAdiTam = [hastaAd, hastaSoyad].filter(Boolean).join(" ");

  async function ozetle() {
    const tamMetin = transkriptRef.current.trim();
    if (!tamMetin) return setHata("Özetlenecek bir transkript yok.");
    setOzetYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/gorusme-ozet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transkript: tamMetin, hastaAdi: hastaAdiTam }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Sunucu hatası");
      setOzet(data.ozet);
    } catch (err) {
      setHata(err.message);
    } finally {
      setOzetYukleniyor(false);
    }
  }

  async function gorusmeKaydet() {
    setKayitYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/gorusme-kaydet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hastaAd,
          hastaSoyad,
          transkript: transkriptRef.current.trim(),
          ozet,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Kayıt hatası");
      setKaydedildi(true);
    } catch (err) {
      setHata(err.message);
    } finally {
      setKayitYukleniyor(false);
    }
  }

  function sifirla() {
    kaydiBitir();
    setTranskript("");
    setGeciciMetin("");
    setOzet(null);
    setHata(null);
    setSure(0);
    setKaydedildi(false);
    transkriptRef.current = "";
    setHastaAd("");
    setHastaSoyad("");
    setKayitDurumu("bekliyor");
  }

  if (tarayiciDestekli === null) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
              <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
              <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            </svg>
            <span className="text-white font-bold">Doktor<span style={{ color: "#C9A84C" }}>Pusula</span></span>
          </a>
          <a href="/panel" className="text-gray-300 hover:text-white text-sm flex items-center gap-1.5">
            ← Panele Dön
          </a>
        </div>
      </nav>

      <div style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-3">🎙️</div>
          <h1 className="text-white text-3xl font-bold mb-2">Görüşme Özetle</h1>
          <p className="text-purple-200 text-sm">Hasta görüşmenizi kaydedin — AI şikayetleri, talepleri ve kritik noktaları otomatik özetler</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {/* Tarayıcı uyarısı */}
        {!tarayiciDestekli && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="font-semibold text-red-800 mb-1">Bu özellik tarayıcınızda çalışmıyor</div>
              <p className="text-red-700 text-sm">Görüşme Özetle yalnızca <strong>Google Chrome</strong> veya <strong>Microsoft Edge</strong> tarayıcısında çalışır.</p>
            </div>
          </div>
        )}

        {tarayiciDestekli && (
          <>
            {/* 1. Hasta Bilgisi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 text-sm mb-4">Hasta Bilgisi</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Ad</label>
                  <input
                    type="text"
                    value={hastaAd}
                    onChange={(e) => setHastaAd(e.target.value)}
                    placeholder="Ahmet"
                    disabled={kayitDurumu === "kayit"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Soyad</label>
                  <input
                    type="text"
                    value={hastaSoyad}
                    onChange={(e) => setHastaSoyad(e.target.value)}
                    placeholder="Yılmaz"
                    disabled={kayitDurumu === "kayit"}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* 2. Kayıt Kontrolü */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              {kayitDurumu === "bekliyor" && (
                <button
                  onClick={kaydiBaslat}
                  className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors"
                >
                  🎙️ Kaydı Başlat
                </button>
              )}

              {kayitDurumu === "kayit" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-600 font-semibold text-sm">Kayıt yapılıyor</span>
                    <span className="text-gray-400 text-sm font-mono">{sureFormat(sure)}</span>
                  </div>
                  <button
                    onClick={kaydiBitir}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
                  >
                    ⏹ Kaydı Durdur
                  </button>
                </div>
              )}

              {kayitDurumu === "bitti" && (
                <div className="flex items-center justify-center gap-3">
                  <span className="text-green-600 font-semibold text-sm">✓ Kayıt tamamlandı — {sureFormat(sure)}</span>
                  <button onClick={sifirla} className="text-gray-400 text-xs underline hover:text-gray-600">Sıfırla</button>
                </div>
              )}
            </div>

            {/* 3. Transkript */}
            {(transkript || geciciMetin) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">📝 Görüşme Transkripti</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {transkript.split(" ").filter(Boolean).length} kelime
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed max-h-64 overflow-y-auto">
                  <span>{transkript}</span>
                  {geciciMetin && <span className="text-gray-400 italic">{geciciMetin}</span>}
                </div>
              </div>
            )}

            {/* 4. Özetle butonu */}
            {kayitDurumu === "bitti" && transkript && !ozet && (
              <button
                onClick={ozetle}
                disabled={ozetYukleniyor}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "#7C3AED" }}
              >
                {ozetYukleniyor ? "⏳ Özet hazırlanıyor..." : "✨ Görüşmeyi Özetle"}
              </button>
            )}

            {/* Hata */}
            {hata && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{hata}</div>
            )}

            {/* 5. AI Özeti */}
            {ozet && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">✨ AI Özeti</h2>
                  {hastaAdiTam && (
                    <span className="text-xs text-purple-700 bg-purple-100 px-3 py-1 rounded-full font-medium">
                      {hastaAdiTam}
                    </span>
                  )}
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {ozet}
                </div>

                {/* Butonlar */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(ozet)}
                    className="text-xs text-purple-600 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    📋 Kopyala
                  </button>

                  {!kaydedildi ? (
                    <button
                      onClick={gorusmeKaydet}
                      disabled={kayitYukleniyor}
                      className="text-xs text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60"
                      style={{ backgroundColor: "#059669" }}
                    >
                      {kayitYukleniyor ? "⏳ Kaydediliyor..." : "💾 Görüşmeyi Kaydet"}
                    </button>
                  ) : (
                    <span className="text-xs text-green-700 bg-green-100 px-4 py-2 rounded-lg font-medium">
                      ✓ Hastalarım bölümüne kaydedildi
                    </span>
                  )}

                  <button
                    onClick={sifirla}
                    className="text-xs text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors ml-auto"
                  >
                    Yeni Görüşme
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
