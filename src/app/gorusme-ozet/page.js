"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function GorusmeOzetSayfasi() {
  const [tarayiciDestekli, setTarayiciDestekli] = useState(null);
  const [kayitDurumu, setKayitDurumu] = useState("bekliyor"); // bekliyor | kayit | durakladi | bitti
  const [transkript, setTranskript] = useState("");
  const [geciciMetin, setGeciciMetin] = useState("");
  const [ozet, setOzet] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);
  const [hastaAdi, setHastaAdi] = useState("");
  const [sure, setSure] = useState(0);

  const recognitionRef = useRef(null);
  const sureRef = useRef(null);
  const transkriptRef = useRef("");

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
        if (e.results[i].isFinal) {
          kesin += e.results[i][0].transcript + " ";
        } else {
          gecici += e.results[i][0].transcript;
        }
      }
      if (kesin) {
        transkriptRef.current += kesin;
        setTranskript(transkriptRef.current);
      }
      setGeciciMetin(gecici);
    };

    recognition.onerror = (e) => {
      if (e.error !== "aborted") setHata("Mikrofon hatası: " + e.error);
      setKayitDurumu("bitti");
    };

    recognition.onend = () => {
      if (kayitDurumu === "kayit") recognition.start();
    };

    recognition.start();
    recognitionRef.current = recognition;
    setKayitDurumu("kayit");
    setHata(null);

    sureRef.current = setInterval(() => setSure((s) => s + 1), 1000);
  }

  function kaydiBitir() {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }
    clearInterval(sureRef.current);
    setGeciciMetin("");
    setKayitDurumu("bitti");
  }

  function sureFormat(s) {
    const d = Math.floor(s / 60).toString().padStart(2, "0");
    const sn = (s % 60).toString().padStart(2, "0");
    return `${d}:${sn}`;
  }

  async function ozetle() {
    const tamMetin = transkriptRef.current.trim();
    if (!tamMetin) return setHata("Özetlenecek bir transkript yok.");
    setYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/gorusme-ozet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transkript: tamMetin, hastaAdi }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Sunucu hatası");
      setOzet(data.ozet);
    } catch (err) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
    }
  }

  function sifirla() {
    kaydiBitir();
    setTranskript("");
    setGeciciMetin("");
    setOzet(null);
    setHata(null);
    setSure(0);
    transkriptRef.current = "";
    setKayitDurumu("bekliyor");
  }

  if (tarayiciDestekli === null) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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
              <p className="text-red-700 text-sm">Görüşme Özetle yalnızca <strong>Google Chrome</strong> veya <strong>Microsoft Edge</strong> tarayıcısında çalışır. Lütfen bu tarayıcılardan birini kullanın.</p>
            </div>
          </div>
        )}

        {tarayiciDestekli && (
          <>
            {/* Hasta bilgisi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hasta Adı <span className="text-gray-400 font-normal">(isteğe bağlı)</span></label>
              <input
                type="text"
                value={hastaAdi}
                onChange={(e) => setHastaAdi(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
                disabled={kayitDurumu === "kayit"}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 disabled:bg-gray-50"
              />
            </div>

            {/* Kayıt kontrolü */}
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

            {/* Transkript */}
            {(transkript || geciciMetin) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-gray-800 text-sm">Transkript</h2>
                  <span className="text-xs text-gray-400">{transkript.split(" ").filter(Boolean).length} kelime</span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed max-h-48 overflow-y-auto">
                  <span>{transkript}</span>
                  {geciciMetin && <span className="text-gray-400 italic">{geciciMetin}</span>}
                </div>
              </div>
            )}

            {/* Özetle butonu */}
            {kayitDurumu === "bitti" && transkript && !ozet && (
              <button
                onClick={ozetle}
                disabled={yukleniyor}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "#7C3AED" }}
              >
                {yukleniyor ? "⏳ Özet hazırlanıyor..." : "✨ Görüşmeyi Özetle"}
              </button>
            )}

            {/* Hata */}
            {hata && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{hata}</div>
            )}

            {/* Özet */}
            {ozet && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">Görüşme Özeti</h2>
                  {hastaAdi && <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{hastaAdi}</span>}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{ozet}</div>
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(ozet)}
                    className="text-xs text-purple-600 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    📋 Kopyala
                  </button>
                  <button
                    onClick={sifirla}
                    className="text-xs text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
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
