"use client";
import { useState } from "react";

export default function BaglantiKopyala({ url }) {
  const [kopyalandi, setKopyalandi] = useState(false);

  async function kopyala() {
    try {
      await navigator.clipboard.writeText(url);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    } catch {
      // Fallback: select + copy
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    }
  }

  return (
    <button
      onClick={kopyala}
      className="flex-1 text-center text-xs py-2 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
    >
      {kopyalandi ? "✓ Kopyalandı!" : "Bağlantıyı Kopyala"}
    </button>
  );
}
