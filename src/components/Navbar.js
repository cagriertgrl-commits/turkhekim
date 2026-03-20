"use client";

import { useState } from "react";

export default function Navbar({ aktifSayfa }) {
  const [menuAcik, setMenuAcik] = useState(false);

  const linkler = [
    { href: "/istanbul/kbb-uzmani", etiket: "Doktor Bul" },
    { href: "/saglik", etiket: "Sağlık Rehberi" },
    { href: "/medikal-turizm", etiket: "Medikal Turizm" },
  ];

  return (
    <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4 relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
            <circle cx="16" cy="16" r="1.8" fill="white"/>
            {/* Kuzey iğnesi — altın */}
            <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
            {/* Güney iğnesi — beyaz */}
            <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            {/* Kuzey D harfi */}
            <text x="14.5" y="11" fontSize="5" fill="white" fontWeight="bold" fontFamily="sans-serif">N</text>
          </svg>
          <span className="text-white font-bold text-xl tracking-tight">
            Doktor<span style={{ color: "#C9A84C" }}>Pusula</span>
          </span>
        </a>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden md:flex items-center gap-8">
          {linkler.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={aktifSayfa === link.etiket ? { color: "#0E7C7B" } : {}}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              {link.etiket}
            </a>
          ))}
        </div>

        {/* MASAÜSTÜ SAĞ */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/fa" className="text-gray-400 hover:text-white text-xs transition-colors">🇮🇷 فارسی</a>
          <a href="/ar" className="text-gray-400 hover:text-white text-xs transition-colors">🌍 العربية</a>
          <a href="/giris" className="text-gray-300 hover:text-white text-sm transition-colors">Giriş Yap</a>
          <a href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Kayıt Ol
          </a>
        </div>

        {/* MOBİL HAMBURGER */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuAcik(!menuAcik)}
          aria-label="Menü"
        >
          <span style={{ backgroundColor: menuAcik ? "transparent" : "white" }} className="block w-6 h-0.5 transition-all duration-300" />
          <span
            style={{ backgroundColor: "white" }}
            className={`block w-6 h-0.5 transition-all duration-300 ${menuAcik ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            style={{ backgroundColor: "white" }}
            className={`block w-6 h-0.5 transition-all duration-300 ${menuAcik ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* MOBİL DROPDOWN MENÜ */}
      {menuAcik && (
        <div style={{ backgroundColor: "#0a1c2e", borderColor: "#ffffff10" }} className="md:hidden absolute top-full left-0 right-0 border-t px-6 py-4 space-y-1">
          {linkler.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuAcik(false)}
              style={aktifSayfa === link.etiket ? { color: "#0E7C7B" } : {}}
              className="block text-gray-300 hover:text-white py-3 text-sm border-b border-white border-opacity-10 transition-colors"
            >
              {link.etiket}
            </a>
          ))}
          <div className="pt-3 space-y-2">
            <a href="/giris" className="block text-gray-300 hover:text-white py-2 text-sm transition-colors">
              Giriş Yap
            </a>
            <a
              href="/kayit-ol"
              style={{ backgroundColor: "#0E7C7B" }}
              className="block text-white text-center py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Kayıt Ol
            </a>
            <div className="flex gap-4 pt-2">
              <a href="/fa" className="text-gray-400 hover:text-white text-xs transition-colors">🇮🇷 فارسی</a>
              <a href="/ar" className="text-gray-400 hover:text-white text-xs transition-colors">🌍 العربية</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
