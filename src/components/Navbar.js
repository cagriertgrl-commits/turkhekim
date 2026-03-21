"use client";

import { useState, useEffect } from "react";
import DilSecici from "./DilSecici";

export default function Navbar({ aktifSayfa }) {
  const [menuAcik, setMenuAcik] = useState(false);
  const [kullanici, setKullanici] = useState(undefined); // undefined = yükleniyor, null = giriş yok

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => setKullanici(d.kullanici))
      .catch(() => setKullanici(null));
  }, []);

  async function cikisYap() {
    await fetch("/api/auth/logout", { method: "POST" });
    setKullanici(null);
    window.location.href = "/";
  }

  const linkler = [
    { href: "/istanbul/kbb-uzmani", etiket: "Doktor Bul" },
    { href: "/tedaviler", etiket: "Tedaviler" },
    { href: "/saglik", etiket: "Sağlık Rehberi" },
    { href: "/medikal-turizm", etiket: "Medikal Turizm" },
    { href: "/hasta-formlari", etiket: "Hasta Formları" },
  ];

  return (
    <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4 relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
            <circle cx="16" cy="16" r="1.8" fill="white"/>
            <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
            <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
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
          <DilSecici />

          {kullanici === undefined ? (
            // Yükleniyor — boş yer tut
            <div className="w-24 h-8 rounded-lg bg-white/10 animate-pulse" />
          ) : kullanici ? (
            // Giriş yapılmış
            <>
              <a href="/panel" title="Panelim" className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden border-2 hover:border-teal-300 transition-colors"
                  style={{ borderColor: "#0E7C7B" }}
                >
                  {kullanici.foto_url ? (
                    <img src={kullanici.foto_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: "#0E7C7B" }}
                    >
                      {kullanici.ad?.charAt(0)}
                    </div>
                  )}
                </div>
              </a>
              <a
                href="/panel"
                style={{ borderColor: "#0E7C7B", color: "#4DD9D8" }}
                className="border text-xs px-3 py-1.5 rounded-lg hover:opacity-80"
              >
                Panelim
              </a>
              <button
                onClick={cikisYap}
                className="text-gray-400 hover:text-white text-sm bg-transparent border-0 cursor-pointer"
              >
                Çıkış
              </button>
            </>
          ) : (
            // Giriş yapılmamış
            <>
              <a href="/giris" className="text-gray-300 hover:text-white text-sm transition-colors">
                Giriş Yap
              </a>
              <a
                href="/doktor-ol"
                style={{ backgroundColor: "#0E7C7B" }}
                className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Kayıt Ol
              </a>
            </>
          )}
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
            {kullanici ? (
              <>
                <a href="/panel" className="block text-teal-400 hover:text-white py-2 text-sm font-medium transition-colors">
                  {kullanici.ad?.split(" ")[0]} — Panelim
                </a>
                <button
                  onClick={cikisYap}
                  className="block w-full text-left text-gray-400 hover:text-white py-2 text-sm transition-colors bg-transparent border-0 cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <a href="/giris" className="block text-gray-300 hover:text-white py-2 text-sm transition-colors">
                  Giriş Yap
                </a>
                <a
                  href="/doktor-ol"
                  style={{ backgroundColor: "#0E7C7B" }}
                  className="block text-white text-center py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Kayıt Ol
                </a>
              </>
            )}
            <div className="pt-2">
              <DilSecici />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
