"use client";

import { useState } from "react";

const KODLAR = [
  { kod: "+90", etiket: "🇹🇷 +90" },
  { kod: "+1",  etiket: "🇺🇸 +1"  },
  { kod: "+44", etiket: "🇬🇧 +44" },
  { kod: "+49", etiket: "🇩🇪 +49" },
  { kod: "+33", etiket: "🇫🇷 +33" },
  { kod: "+966",etiket: "🇸🇦 +966"},
  { kod: "+971",etiket: "🇦🇪 +971"},
  { kod: "+31", etiket: "🇳🇱 +31" },
  { kod: "+43", etiket: "🇦🇹 +43" },
  { kod: "+41", etiket: "🇨🇭 +41" },
];

function parse(val) {
  if (!val) return { kod: "+90", numara: "" };
  for (const k of KODLAR) {
    if (val.startsWith(k.kod)) return { kod: k.kod, numara: val.slice(k.kod.length) };
  }
  return { kod: "+90", numara: val };
}

export default function WhatsappInput({ mevcutDeger }) {
  const parsed = parse(mevcutDeger || "");
  const [kod, setKod] = useState(parsed.kod);
  const [numara, setNumara] = useState(parsed.numara);

  return (
    <div className="flex gap-1.5">
      <input type="hidden" name="whatsapp" value={numara ? `${kod}${numara}` : ""} readOnly />
      <select
        value={kod}
        onChange={(e) => setKod(e.target.value)}
        className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none bg-white flex-shrink-0"
        style={{ width: "96px" }}
      >
        {KODLAR.map((k) => (
          <option key={k.kod} value={k.kod}>{k.etiket}</option>
        ))}
      </select>
      <input
        type="tel"
        value={numara}
        onChange={(e) => setNumara(e.target.value.replace(/\D/g, ""))}
        placeholder="5XXXXXXXXX"
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
      />
    </div>
  );
}
