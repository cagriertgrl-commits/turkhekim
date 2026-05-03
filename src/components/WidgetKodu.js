"use client";

import { useState } from "react";

export default function WidgetKodu({ slug }) {
  const [tema, setTema] = useState("acik");
  const [tip, setTip] = useState("script"); // script | iframe
  const [kopyalandi, setKopyalandi] = useState(false);

  const baseUrl = "https://doktorpusula.com";

  const scriptKodu = `<!-- DoktorPusula Widget — başla -->
<div data-doktorpusula="${slug}" data-tema="${tema}"></div>
<script src="${baseUrl}/widget.js" async></script>
<!-- DoktorPusula Widget — bitti -->`;

  const iframeKodu = `<!-- DoktorPusula Widget — başla -->
<iframe src="${baseUrl}/embed/${slug}?tema=${tema}"
  width="400" height="340"
  frameborder="0" scrolling="no"
  loading="lazy"
  title="DoktorPusula Profili"
  style="border:0;max-width:100%;display:block;">
</iframe>
<!-- DoktorPusula Widget — bitti -->`;

  const aktifKod = tip === "script" ? scriptKodu : iframeKodu;

  function kopyala() {
    navigator.clipboard.writeText(aktifKod).then(() => {
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    });
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
        <h2 style={{ color: "var(--navy)" }} className="font-bold text-lg">Web Sitenize Profil Widget'ı Ekleyin</h2>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Aşağıdaki kodu kendi web sitenize yapıştırın. Ziyaretçiler DoktorPusula profilinizin önizlemesini görür ve tıklayarak randevu alabilir.
      </p>

      {/* Tema seçimi */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTema("acik")}
          style={tema === "acik" ? { backgroundColor: "var(--teal)", color: "white" } : { backgroundColor: "white", color: "var(--navy)", borderColor: "#E5E7EB" }}
          className="border px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          ☀️ Açık Tema
        </button>
        <button
          onClick={() => setTema("koyu")}
          style={tema === "koyu" ? { backgroundColor: "var(--navy)", color: "white" } : { backgroundColor: "white", color: "var(--navy)", borderColor: "#E5E7EB" }}
          className="border px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          🌙 Koyu Tema
        </button>
      </div>

      {/* Kod tipi */}
      <div className="flex gap-2 mb-3 text-sm">
        <button
          onClick={() => setTip("script")}
          style={{ color: tip === "script" ? "var(--teal)" : "#94a3b8" }}
          className="font-semibold border-b-2 pb-1 transition-colors"
        >
          <span style={{ borderBottomColor: tip === "script" ? "var(--teal)" : "transparent" }}>
            Önerilen (Script)
          </span>
        </button>
        <button
          onClick={() => setTip("iframe")}
          style={{ color: tip === "iframe" ? "var(--teal)" : "#94a3b8" }}
          className="font-semibold pb-1 transition-colors"
        >
          iframe
        </button>
      </div>

      {/* Kod kutusu */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed">
          <code>{aktifKod}</code>
        </pre>
        <button
          onClick={kopyala}
          style={{ backgroundColor: kopyalandi ? "#059669" : "var(--teal)" }}
          className="absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
        >
          {kopyalandi ? "✓ Kopyalandı" : "Kopyala"}
        </button>
      </div>

      {/* Önizleme */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
          Önizleme Göster
        </summary>
        <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <iframe
            src={`/embed/${slug}?tema=${tema}`}
            width="400"
            height="340"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
            title="Widget Önizleme"
            style={{ border: 0, maxWidth: "100%", display: "block" }}
          />
        </div>
      </details>

      <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>İpucu:</strong> Script versiyon, sayfanız yüklendiğinde otomatik widget oluşturur.
          Birden fazla widget eklemek isterseniz, sadece <code className="bg-blue-100 px-1 rounded">{`<div data-doktorpusula="...">`}</code> etiketini birden fazla yere koymanız yeterli.
        </p>
      </div>
    </div>
  );
}
