"use client";
import { useState, useRef, useEffect } from "react";

const ORNEK_SORULAR = [
  "Estetik operasyon sonrası hasta dava açtı, malpraktis riski nedir?",
  "Sosyal medyada önce-sonra fotoğrafı paylaşmak yasal mı?",
  "Kliniğimde indirim kampanyası yapabilir miyim?",
  "Hasta yorumunu Instagram'da paylaşmak ihlal mi?",
  "Yanlış teşhis davasında zamanaşımı nedir?",
  "TİTCK reçetesiz ilaç reklamı için onay nasıl alınır?",
];

export default function AIChat() {
  const [mesajlar, setMesajlar] = useState([]);
  const [girdi, setGirdi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);
  const sonRef = useRef(null);

  useEffect(() => {
    sonRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar, yukleniyor]);

  async function gonder(soru) {
    const metin = (soru ?? girdi).trim();
    if (metin.length < 5) {
      setHata("Sorunuzu en az 5 karakter yazın.");
      return;
    }
    setHata(null);

    const yeniMesajlar = [...mesajlar, { role: "user", content: metin }];
    setMesajlar(yeniMesajlar);
    setGirdi("");
    setYukleniyor(true);

    try {
      const r = await fetch("/api/hukuk/ai-danisman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soru: metin, gecmis: mesajlar }),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Yanıt alınamadı.");
        setMesajlar(yeniMesajlar);
      } else {
        setMesajlar([...yeniMesajlar, { role: "assistant", content: data.yanit }]);
      }
    } catch {
      setHata("Sunucuya ulaşılamadı.");
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col" style={{ height: "70vh", minHeight: 520 }}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mesajlar.length === 0 && !yukleniyor && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-5xl mb-3">⚖️</div>
            <p className="font-semibold mb-1" style={{ color: "var(--navy)" }}>Sağlık hukuku sorunuzu sorun</p>
            <p className="text-sm mb-6">Yapay zekâ asistanı malpraktis ve sağlıkta reklam mevzuatında uzmanlaştırılmıştır.</p>
            <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {ORNEK_SORULAR.map((s) => (
                <button
                  key={s}
                  onClick={() => gonder(s)}
                  className="text-left text-xs border border-gray-200 rounded-lg px-3 py-2 hover:border-teal-400 hover:bg-teal-50 transition text-gray-700"
                >
                  💭 {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {mesajlar.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap text-sm ${
                m.role === "user"
                  ? "text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
              style={m.role === "user" ? { backgroundColor: "var(--teal)" } : undefined}
            >
              {m.content}
            </div>
          </div>
        ))}

        {yukleniyor && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-500">
              ⚖️ Mevzuat taranıyor…
            </div>
          </div>
        )}

        <div ref={sonRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          gonder();
        }}
        className="border-t border-gray-200 p-3"
      >
        {hata && (
          <div className="mb-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded p-2">{hata}</div>
        )}
        <div className="flex gap-2">
          <textarea
            value={girdi}
            onChange={(e) => setGirdi(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                gonder();
              }
            }}
            placeholder="Hukuki sorunuzu yazın… (Shift+Enter = yeni satır)"
            rows={2}
            disabled={yukleniyor}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500 resize-none"
            maxLength={3000}
          />
          <button
            type="submit"
            disabled={yukleniyor || girdi.trim().length < 5}
            style={{ backgroundColor: "var(--navy)" }}
            className="text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-40 hover:opacity-90"
          >
            {yukleniyor ? "…" : "Gönder"}
          </button>
        </div>
        <div className="mt-1 text-[10px] text-gray-400 text-right">
          Saatlik limit: 15 soru
        </div>
      </form>
    </div>
  );
}
