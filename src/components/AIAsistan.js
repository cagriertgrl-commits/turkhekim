"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HIZLI_SORULAR = [
  { etiket: "Malpraktis Nedir?", soru: "Tıbbi malpraktis nedir, Türk hukukunda nasıl tanımlanır?" },
  { etiket: "Emsal Kararlar", soru: "Türkiye'de malpraktis davalarında emsal Yargıtay kararları hakkında bilgi verir misin?" },
  { etiket: "Aydınlatılmış Rıza", soru: "Aydınlatılmış rıza formu nedir, hukuki önemi nedir?" },
  { etiket: "Klinik Kurulum", soru: "Özel klinik açmak için gerekli izinler ve süreçler nelerdir?" },
  { etiket: "Hasta Hakları", soru: "Hasta hakları yönetmeliğine göre doktorların sorumlulukları nelerdir?" },
  { etiket: "SGK & Sigorta", soru: "Doktor malpraktis sigortası nedir, nasıl alınır?" },
];

export default function AIAsistan({ doktorId, paket = "ucretsiz" }) {
  const [acik, setAcik] = useState(false);
  const [mesajlar, setMesajlar] = useState([
    {
      rol: "assistant",
      icerik: "Merhaba! Ben DoktorPusula AI Asistanıyım.\n\nSize özellikle **malpraktis hukuku**, **emsal kararlar**, **hasta hakları** ve **klinik yönetim** konularında yardımcı olabilirim.\n\nNasıl yardımcı olabilirim?",
    },
  ]);
  const [girdi, setGirdi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const mesajSonuRef = useRef(null);

  const yetkiliPaketler = ["premium", "pro", "kurumsal"];
  const erisimVar = yetkiliPaketler.includes(paket);

  useEffect(() => {
    mesajSonuRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar]);

  async function gonder(metin) {
    const soru = metin || girdi.trim();
    if (!soru || yukleniyor) return;

    const yeniMesajlar = [...mesajlar, { rol: "user", icerik: soru }];
    setMesajlar(yeniMesajlar);
    setGirdi("");
    setYukleniyor(true);

    try {
      const res = await fetch("/api/ai-asistan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mesajlar: yeniMesajlar }),
      });
      const veri = await res.json();
      if (veri.yanit) {
        setMesajlar([...yeniMesajlar, { rol: "assistant", icerik: veri.yanit }]);
      } else {
        setMesajlar([...yeniMesajlar, { rol: "assistant", icerik: "Bir hata oluştu. Lütfen tekrar deneyin." }]);
      }
    } catch {
      setMesajlar([...yeniMesajlar, { rol: "assistant", icerik: "Bağlantı hatası oluştu." }]);
    } finally {
      setYukleniyor(false);
    }
  }

  function metniFormatla(metin) {
    const temiz = metin
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    return temiz
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Başlık */}
      <button
        onClick={() => setAcik(!acik)}
        className="w-full flex items-center justify-between p-5 hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: "#0D2137" }} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="4"/><line x1="12" y1="9" x2="12" y2="11"/><circle cx="8" cy="16" r="1" fill="white"/><circle cx="16" cy="16" r="1" fill="white"/></svg>
          </div>
          <div className="text-left">
            <h3 style={{ color: "#0D2137" }} className="font-bold text-sm">DoktorPusula AI Asistan</h3>
            <p className="text-xs text-gray-400">Malpraktis, hukuk, klinik yönetim</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {erisimVar ? (
            <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-1 rounded-full font-semibold">
              Aktif
            </span>
          ) : (
            <span style={{ backgroundColor: "#FEF3C7", color: "#D97706" }} className="text-xs px-2 py-1 rounded-full font-semibold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={11} height={11} style={{display:"inline",verticalAlign:"middle",marginRight:3}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Premium
            </span>
          )}
          <span className="text-gray-400 text-sm">{acik ? "▲" : "▼"}</span>
        </div>
      </button>

      {acik && !erisimVar && (
        <div className="border-t border-gray-100 p-6 text-center">
          <div className="flex justify-center mb-3" style={{color:"#0E7C7B"}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={40} height={40}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
          <h3 style={{ color: "#0D2137" }} className="font-bold mb-2">Premium Özellik</h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            AI Asistan, malpraktis hukuku ve klinik yönetim konularında anında yanıt veriyor.
            Bu özellik <strong>Premium paket</strong> ve üstü için geçerlidir.
          </p>
          <Link
            href="/paketler"
            style={{ backgroundColor: "#0E7C7B" }}
            className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Paketi Yükselt →
          </Link>
        </div>
      )}

      {acik && erisimVar && (
        <div className="border-t border-gray-100">
          {/* Hızlı Sorular */}
          {mesajlar.length <= 1 && (
            <div className="p-4 border-b border-gray-50">
              <p className="text-xs text-gray-400 mb-2 font-medium">Hızlı Konular:</p>
              <div className="flex flex-wrap gap-2">
                {HIZLI_SORULAR.map((hs) => (
                  <button
                    key={hs.soru}
                    onClick={() => gonder(hs.soru)}
                    style={{ backgroundColor: "#F5F7FA", borderColor: "#E5E7EB" }}
                    className="text-xs px-3 py-1.5 rounded-full border hover:border-teal-400 hover:text-teal-700 transition-colors text-gray-700"
                  >
                    {hs.etiket}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mesajlar */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {mesajlar.map((msg, i) => (
              <div key={i} className={`flex ${msg.rol === "user" ? "justify-end" : "justify-start"}`}>
                {msg.rol === "assistant" && (
                  <div style={{ backgroundColor: "#0D2137" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="4"/><line x1="12" y1="9" x2="12" y2="11"/><circle cx="8" cy="16" r="1" fill="white"/><circle cx="16" cy="16" r="1" fill="white"/></svg>
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: msg.rol === "user" ? "#0E7C7B" : "#F5F7FA",
                    color: msg.rol === "user" ? "#fff" : "#1F2937",
                    maxWidth: "80%",
                  }}
                  className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: metniFormatla(msg.icerik) }}
                />
              </div>
            ))}
            {yukleniyor && (
              <div className="flex justify-start">
                <div style={{ backgroundColor: "#0D2137" }} className="w-7 h-7 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="4"/><line x1="12" y1="9" x2="12" y2="11"/><circle cx="8" cy="16" r="1" fill="white"/><circle cx="16" cy="16" r="1" fill="white"/></svg>
                </div>
                <div style={{ backgroundColor: "#F5F7FA" }} className="rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: "#0E7C7B", animationDelay: `${i * 0.15}s` }}
                        className="w-2 h-2 rounded-full animate-bounce"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={mesajSonuRef} />
          </div>

          {/* Giriş */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                value={girdi}
                onChange={(e) => setGirdi(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && gonder()}
                placeholder="Sorunuzu yazın..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400"
              />
              <button
                onClick={() => gonder()}
                disabled={!girdi.trim() || yukleniyor}
                style={{ backgroundColor: "#0E7C7B" }}
                className="px-4 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                Gönder
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Yanıtlar bilgi amaçlıdır, kesin hukuki tavsiye değildir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
