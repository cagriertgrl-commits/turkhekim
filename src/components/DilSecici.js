"use client";
import { useState } from "react";

const DILLER = [
  { kod: "tr", etiket: "🇹🇷 TR" },
  { kod: "en", etiket: "🇬🇧 EN" },
  { kod: "ru", etiket: "🇷🇺 RU" },
  { kod: "ar", etiket: "🇸🇦 AR" },
  { kod: "fa", etiket: "🇮🇷 FA" },
];

export default function DilSecici() {
  const [aktif, setAktif] = useState("tr");

  return (
    <div className="flex items-center gap-1">
      {DILLER.map((dil) => (
        <button
          key={dil.kod}
          onClick={() => setAktif(dil.kod)}
          className="text-xs px-2 py-1 rounded-md transition-all"
          style={
            aktif === dil.kod
              ? { backgroundColor: "#0E7C7B", color: "white" }
              : { color: "#9CA3AF" }
          }
        >
          {dil.etiket}
        </button>
      ))}
    </div>
  );
}
