"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const DILLER = [
  { kod: "tr", ad: "Türkçe", bayrak: "🇹🇷", href: "/" },
  { kod: "en", ad: "English", bayrak: "🇬🇧", href: "/en" },
  { kod: "ar", ad: "العربية", bayrak: "🇸🇦", href: "/ar" },
  { kod: "fa", ad: "فارسی", bayrak: "🇮🇷", href: "/fa" },
];

export default function DilSecici() {
  const pathname = usePathname();
  const [acik, setAcik] = useState(false);
  const ref = useRef(null);

  const aktifDil = DILLER.find((d) =>
    d.kod === "tr" ? !pathname.startsWith("/ar") && !pathname.startsWith("/fa") && !pathname.startsWith("/en")
    : pathname.startsWith("/" + d.kod)
  ) || DILLER[0];

  useEffect(() => {
    function kapat(e) {
      if (ref.current && !ref.current.contains(e.target)) setAcik(false);
    }
    document.addEventListener("mousedown", kapat);
    return () => document.removeEventListener("mousedown", kapat);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setAcik(!acik)}
        className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition-colors px-2 py-1 rounded-lg hover:bg-white hover:bg-opacity-10"
      >
        <span className="text-base">{aktifDil.bayrak}</span>
        <span className="hidden md:inline text-xs">{aktifDil.ad}</span>
        <svg className={`w-3 h-3 transition-transform ${acik ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {acik && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[140px]">
          {DILLER.map((dil) => (
            <a
              key={dil.kod}
              href={dil.href}
              onClick={() => setAcik(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
              style={dil.kod === aktifDil.kod ? { backgroundColor: "#F0FDFA", color: "#0E7C7B", fontWeight: 600 } : { color: "#374151" }}
            >
              <span className="text-base">{dil.bayrak}</span>
              <span>{dil.ad}</span>
              {dil.kod === aktifDil.kod && <span className="ml-auto text-xs">✓</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
