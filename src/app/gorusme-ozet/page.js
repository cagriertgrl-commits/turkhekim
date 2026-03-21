"use client";

import { useState, useRef, useEffect } from "react";

// adim: bekliyor | kayit | bitti | transkript | ozetleniyor | ozet
export default function GorusmeOzetSayfasi() {
  const [tarayiciDestekli, setTarayiciDestekli] = useState(null);
  const [adim, setAdim] = useState("bekliyor"); // bekliyor | kayit | bitti | isleniyor | transkript | ozetleniyor | ozet
  const [yuklemePct, setYuklemePct] = useState(0);
  const [transkript, setTranskript] = useState("");
  const [geciciMetin, setGeciciMetin] = useState("");
  const [ozet, setOzet] = useState("");
  const [ozetDuzenle, setOzetDuzenle] = useState(false);
  const [hata, setHata] = useState(null);
  const [sure, setSure] = useState(0);
  const [dalgalar, setDalgalar] = useState(Array(28).fill(3));

  // Hasta kayıt
  const [kayitMod, setKayitMod] = useState(null); // null | "secili" | "yeni"
  const [eskiHastalar, setEskiHastalar] = useState([]);
  const [secilenHasta, setSecilenHasta] = useState(null);
  const [yeniHastaAd, setYeniHastaAd] = useState("");
  const [yeniHastaSoyad, setYeniHastaSoyad] = useState("");
  const [kaydedildi, setKaydedildi] = useState(false);
  const [kayitYukleniyor, setKayitYukleniyor] = useState(false);

  const recognitionRef = useRef(null);
  const sureRef = useRef(null);
  const transkriptRef = useRef("");
  const aktifRef = useRef(false);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const animRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const ok = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
    setTarayiciDestekli(ok);
    return () => temizle();
  }, []);

  function temizle() {
    aktifRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      try { recognitionRef.current.stop(); } catch {}
    }
    clearInterval(sureRef.current);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (audioCtxRef.current) { try { audioCtxRef.current.close(); } catch {} }
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  }

  async function kaydiBaslat() {
    setHata(null);
    transkriptRef.current = "";
    setTranskript("");
    setGeciciMetin("");
    setSure(0);

    // Ses görselleştirici
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      audioCtx.createMediaStreamSource(stream).connect(analyser);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      const guncelle = () => {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        setDalgalar(Array.from(data).slice(0, 28).map(v => Math.max(3, (v / 255) * 72)));
        animRef.current = requestAnimationFrame(guncelle);
      };
      guncelle();
    } catch {}

    // Konuşma tanıma
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "tr-TR";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (e) => {
      let gecici = "", kesin = "";
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

    rec.onerror = (e) => {
      if (e.error === "aborted" || e.error === "no-speech") return;
      setHata("Mikrofon hatası: " + e.error);
      aktifRef.current = false;
      setAdim("bitti");
    };

    rec.onend = () => { if (aktifRef.current) rec.start(); };

    aktifRef.current = true;
    rec.start();
    recognitionRef.current = rec;
    setAdim("kayit");
    sureRef.current = setInterval(() => setSure(s => s + 1), 1000);
  }

  function kaydiBitir() {
    aktifRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      try { recognitionRef.current.stop(); } catch {}
    }
    clearInterval(sureRef.current);
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (audioCtxRef.current) { try { audioCtxRef.current.close(); } catch {} }
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    setGeciciMetin("");
    setDalgalar(Array(28).fill(3));
    setAdim("bitti");
  }

  function yukle() {
    setAdim("isleniyor");
    setYuklemePct(0);
    let pct = 0;
    const iv = setInterval(() => {
      pct += 2;
      setYuklemePct(pct);
      if (pct >= 100) {
        clearInterval(iv);
        setTranskript(transkriptRef.current);
        setAdim("transkript");
      }
    }, 40); // 40ms * 50 adım = 2 saniye
  }

  async function ozetle() {
    const metin = transkript.trim();
    if (!metin) return setHata("Özetlenecek transkript yok.");
    setAdim("ozetleniyor");
    setHata(null);
    try {
      const res = await fetch("/api/gorusme-ozet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transkript: metin }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Sunucu hatası");
      setOzet(data.ozet);
      setAdim("ozet");
    } catch (err) {
      setHata(err.message);
      setAdim("transkript");
    }
  }

  async function hastaListesiAc() {
    setKayitMod("secili");
    if (eskiHastalar.length === 0) {
      try {
        const res = await fetch("/api/hastalar");
        const data = await res.json();
        setEskiHastalar(data.hastalar || []);
      } catch {}
    }
  }

  async function kaydet() {
    let hastaAd = "", hastaSoyad = "";
    if (kayitMod === "secili" && secilenHasta) {
      hastaAd = secilenHasta.ad;
      hastaSoyad = secilenHasta.soyad;
    } else if (kayitMod === "yeni") {
      hastaAd = yeniHastaAd;
      hastaSoyad = yeniHastaSoyad;
    }
    setKayitYukleniyor(true);
    try {
      const res = await fetch("/api/gorusme-kaydet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hastaAd, hastaSoyad, transkript: transkript.trim(), ozet }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Kayıt hatası");
      setKaydedildi(true);
      setKayitMod(null);
    } catch (err) {
      setHata(err.message);
    } finally {
      setKayitYukleniyor(false);
    }
  }

  function sifirla() {
    temizle();
    setAdim("bekliyor");
    setTranskript("");
    setGeciciMetin("");
    setOzet("");
    setHata(null);
    setSure(0);
    setDalgalar(Array(28).fill(3));
    setKayitMod(null);
    setSecilenHasta(null);
    setYeniHastaAd("");
    setYeniHastaSoyad("");
    setKaydedildi(false);
    transkriptRef.current = "";
  }

  function fmt(s) {
    return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  }

  if (tarayiciDestekli === null) return null;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
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
          <a href="/panel" className="text-gray-300 hover:text-white text-sm">← Panele Dön</a>
        </div>
      </nav>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)" }} className="px-6 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-3">🎙️</div>
          <h1 className="text-white text-3xl font-bold mb-2">Görüşme Özetle</h1>
          <p className="text-purple-200 text-sm">Hasta görüşmenizi kaydedin — AI şikayetleri, talepleri ve kritik noktaları otomatik özetler</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">

        {/* Tarayıcı uyarısı */}
        {!tarayiciDestekli && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-800 mb-1">Bu özellik tarayıcınızda çalışmıyor</p>
              <p className="text-red-700 text-sm">Yalnızca <strong>Google Chrome</strong> veya <strong>Microsoft Edge</strong> desteklenmektedir.</p>
            </div>
          </div>
        )}

        {tarayiciDestekli && (
          <>

            {/* ── KAYIT KARTI ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Başlamadan önce */}
              {adim === "bekliyor" && (
                <div className="p-10 flex flex-col items-center gap-5">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F5F3FF" }}>
                    <span className="text-4xl">🎙️</span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800 mb-1">Görüşmeye hazır mısınız?</p>
                    <p className="text-gray-400 text-sm">Kaydı başlattıktan sonra hastanızla konuşabilirsiniz.</p>
                  </div>
                  <button
                    onClick={kaydiBaslat}
                    className="px-10 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#7C3AED" }}
                  >
                    🎙️ Kaydı Başlat
                  </button>
                </div>
              )}

              {/* Kayıt sırasında */}
              {adim === "kayit" && (
                <div className="p-8 flex flex-col items-center gap-6">

                  {/* Timer */}
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-600 font-bold text-xl font-mono">{fmt(sure)}</span>
                    <span className="text-gray-400 text-sm">kayıt yapılıyor</span>
                  </div>

                  {/* Ses dalgaları */}
                  <div className="flex items-end justify-center gap-0.5 h-20 w-full px-4">
                    {dalgalar.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full transition-all duration-75"
                        style={{
                          height: `${h}px`,
                          backgroundColor: h > 30 ? "#7C3AED" : h > 15 ? "#A78BFA" : "#DDD6FE",
                        }}
                      />
                    ))}
                  </div>

                  {/* Anlık transkript (soluk, küçük) */}
                  {(transkript || geciciMetin) && (
                    <div className="w-full bg-gray-50 rounded-xl p-4 text-xs text-gray-500 max-h-28 overflow-y-auto leading-relaxed">
                      {transkript}
                      {geciciMetin && <span className="text-gray-300 italic">{geciciMetin}</span>}
                    </div>
                  )}

                  <button
                    onClick={kaydiBitir}
                    className="px-10 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90"
                    style={{ backgroundColor: "#DC2626" }}
                  >
                    ⏹ Kaydı Durdur
                  </button>
                </div>
              )}

              {/* Kayıt bitti — Yükle */}
              {adim === "bitti" && (
                <div className="p-8 flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F0FDF4" }}>
                    <span className="text-3xl">✅</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-800 mb-1">Kayıt tamamlandı</p>
                    <p className="text-gray-400 text-sm">{fmt(sure)} süre kaydedildi</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={sifirla}
                      className="px-6 py-3 rounded-xl font-medium text-sm text-gray-500 border border-gray-200 hover:bg-gray-50"
                    >
                      Yeniden Başla
                    </button>
                    <button
                      onClick={yukle}
                      className="px-10 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90"
                      style={{ backgroundColor: "#7C3AED" }}
                    >
                      📤 Yükle
                    </button>
                  </div>
                </div>
              )}

              {/* Kompakt başlık — transkript/özet adımları */}
              {["isleniyor", "transkript", "ozetleniyor", "ozet"].includes(adim) && (
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-green-500">✓</span>
                    <span>{fmt(sure)} görüşme yüklendi</span>
                  </div>
                  <button onClick={sifirla} className="text-xs text-gray-400 hover:text-gray-600 underline">
                    Yeni Görüşme
                  </button>
                </div>
              )}
            </div>

            {/* ── İŞLENİYOR ── */}
            {adim === "isleniyor" && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <svg className="animate-spin w-5 h-5 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Transkript oluşturuluyor...</p>
                    <p className="text-gray-400 text-xs mt-0.5">Ses işleniyor, lütfen bekleyin</p>
                  </div>
                  <span className="ml-auto font-bold text-purple-600 text-sm">{yuklemePct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-75"
                    style={{ width: `${yuklemePct}%`, backgroundColor: "#7C3AED" }}
                  />
                </div>
              </div>
            )}

            {/* ── TRANSKRİPT ── */}
            {adim === "transkript" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">📄 Transkript</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {transkript.trim().split(/\s+/).filter(Boolean).length} kelime
                  </span>
                </div>
                <textarea
                  value={transkript}
                  onChange={(e) => setTranskript(e.target.value)}
                  rows={10}
                  placeholder="Otomatik transkripsiyon burada görünür. Eksik veya hatalı yerleri düzeltebilirsiniz..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed focus:outline-none focus:border-purple-400 resize-none"
                />
                {!transkript.trim() && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                    ⚠️ Konuşma algılanamadı. Chrome kullandığınızdan emin olun veya transkripti buraya manuel olarak yazabilirsiniz.
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-2">💡 Hatalı kelimeleri düzeltip özetleyin.</p>
                <button
                  onClick={ozetle}
                  disabled={!transkript.trim()}
                  className="mt-4 w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-40 hover:opacity-90"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  ✨ Özetini Çıkar
                </button>
              </div>
            )}

            {/* ── ÖZETLENİYOR ── */}
            {adim === "ozetleniyor" && (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                <svg className="animate-spin w-8 h-8 text-purple-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <p className="font-semibold text-gray-700 mb-1">Özet hazırlanıyor...</p>
                <p className="text-gray-400 text-sm">Şikayetler, bulgular ve öneriler çıkarılıyor</p>
              </div>
            )}

            {/* ── ÖZET ── */}
            {adim === "ozet" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">✨ AI Özeti</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(ozet)}
                      className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                    >
                      📋 Kopyala
                    </button>
                    <button
                      onClick={() => setOzetDuzenle(!ozetDuzenle)}
                      className="text-xs text-purple-600 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50"
                    >
                      {ozetDuzenle ? "✓ Bitti" : "✏️ Düzenle"}
                    </button>
                  </div>
                </div>

                {ozetDuzenle ? (
                  <textarea
                    value={ozet}
                    onChange={(e) => setOzet(e.target.value)}
                    rows={12}
                    className="w-full border border-purple-200 rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed focus:outline-none focus:border-purple-400 resize-none"
                  />
                ) : (
                  <div className="bg-purple-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {ozet}
                  </div>
                )}
              </div>
            )}

            {/* ── HASTA KAYDET ── */}
            {adim === "ozet" && !kaydedildi && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-800 mb-1">💾 Hastaya Kaydet</h2>
                <p className="text-gray-400 text-xs mb-5">Bu görüşmeyi hangi hasta profiline kaydetmek istiyorsunuz?</p>

                {/* Mod seçimi */}
                {!kayitMod && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={hastaListesiAc}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                    >
                      <div className="text-3xl mb-2">👤</div>
                      <div className="font-semibold text-gray-700 text-sm group-hover:text-purple-700">Kayıtlı Hastam</div>
                      <div className="text-gray-400 text-xs mt-1">Önceki hastalardan seç</div>
                    </button>
                    <button
                      onClick={() => setKayitMod("yeni")}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                    >
                      <div className="text-3xl mb-2">➕</div>
                      <div className="font-semibold text-gray-700 text-sm group-hover:text-purple-700">Yeni Hasta</div>
                      <div className="text-gray-400 text-xs mt-1">Ad soyad girerek kaydet</div>
                    </button>
                  </div>
                )}

                {/* Kayıtlı hastalar */}
                {kayitMod === "secili" && (
                  <div>
                    <button
                      onClick={() => { setKayitMod(null); setSecilenHasta(null); }}
                      className="text-xs text-gray-400 mb-4 hover:text-gray-600 flex items-center gap-1"
                    >
                      ← Geri
                    </button>
                    {eskiHastalar.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">Henüz kayıtlı hasta görüşmesi yok.</p>
                        <button
                          onClick={() => setKayitMod("yeni")}
                          className="mt-3 text-xs text-purple-600 underline"
                        >
                          Yeni hasta olarak kaydet →
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2 max-h-52 overflow-y-auto mb-4">
                          {eskiHastalar.map((h, i) => (
                            <button
                              key={i}
                              onClick={() => setSecilenHasta(h)}
                              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                                secilenHasta === h
                                  ? "border-purple-400 bg-purple-50 text-purple-700 font-semibold"
                                  : "border-gray-200 hover:border-purple-200 hover:bg-purple-50 text-gray-700"
                              }`}
                            >
                              👤 {h.ad} {h.soyad}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={kaydet}
                          disabled={!secilenHasta || kayitYukleniyor}
                          className="w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40 hover:opacity-90"
                          style={{ backgroundColor: "#059669" }}
                        >
                          {kayitYukleniyor ? "⏳ Kaydediliyor..." : "💾 Kaydet"}
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Yeni hasta */}
                {kayitMod === "yeni" && (
                  <div>
                    <button
                      onClick={() => setKayitMod(null)}
                      className="text-xs text-gray-400 mb-4 hover:text-gray-600 flex items-center gap-1"
                    >
                      ← Geri
                    </button>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Ad</label>
                        <input
                          type="text"
                          value={yeniHastaAd}
                          onChange={e => setYeniHastaAd(e.target.value)}
                          placeholder="Ahmet"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Soyad</label>
                        <input
                          type="text"
                          value={yeniHastaSoyad}
                          onChange={e => setYeniHastaSoyad(e.target.value)}
                          placeholder="Yılmaz"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400"
                        />
                      </div>
                    </div>
                    <button
                      onClick={kaydet}
                      disabled={!yeniHastaAd.trim() || kayitYukleniyor}
                      className="w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40 hover:opacity-90"
                      style={{ backgroundColor: "#059669" }}
                    >
                      {kayitYukleniyor ? "⏳ Kaydediliyor..." : "💾 Yeni Hasta Olarak Kaydet"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Kaydedildi */}
            {kaydedildi && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div className="flex-1">
                  <p className="font-semibold text-green-800 text-sm">Görüşme başarıyla kaydedildi</p>
                  <p className="text-green-600 text-xs mt-0.5">Paneldeki "Hastalarım" bölümünden görüntüleyebilirsiniz.</p>
                </div>
                <button
                  onClick={sifirla}
                  className="text-xs text-green-700 border border-green-300 px-3 py-1.5 rounded-lg hover:bg-green-100 whitespace-nowrap"
                >
                  Yeni Görüşme
                </button>
              </div>
            )}

            {/* Hata */}
            {hata && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {hata}
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}
