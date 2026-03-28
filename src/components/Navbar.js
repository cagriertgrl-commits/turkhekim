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
    { href: "/akis", etiket: "Akış" },
    { href: "/tedaviler", etiket: "Tedaviler" },
    { href: "/medikal-turizm", etiket: "Medikal Turizm" },
    { href: "/tercuman-ol", etiket: "Tercüman" },
    { href: "/hasta-formlari", etiket: "Onam Formları" },
  ];

  return (
    <nav style={{ backgroundColor: "var(--navy)" }} className="px-6 py-4 relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="var(--teal)"/>
            <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="0.6" opacity="0.35"/>
            <line x1="16" y1="2.5" x2="16" y2="5.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <line x1="16" y1="26.5" x2="16" y2="29.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <line x1="2.5" y1="16" x2="5.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <line x1="26.5" y1="16" x2="29.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
            <polygon points="16,4.5 14,15 18,15" fill="var(--gold)"/>
            <polygon points="16,27.5 18,17 14,17" fill="white" opacity="0.5"/>
            <polygon points="4.5,16 15,14 15,18" fill="white" opacity="0.3"/>
            <polygon points="27.5,16 17,18 17,14" fill="white" opacity="0.3"/>
            <circle cx="16" cy="16" r="2" fill="white"/>
            <circle cx="16" cy="16" r="0.8" fill="var(--gold)"/>
          </svg>
          <span className="text-white font-bold text-xl tracking-tight">
            Doktor<span style={{ color: "var(--gold)" }}>Pusula</span>
          </span>
        </a>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden md:flex items-center gap-8">
          {linkler.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={aktifSayfa === link.etiket ? { color: "var(--teal)" } : {}}
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
                  style={{ borderColor: "var(--teal)" }}
                >
                  {kullanici.foto_url ? (
                    <img src={kullanici.foto_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: "var(--teal)" }}
                    >
                      {kullanici.ad?.charAt(0)}
                    </div>
                  )}
                </div>
              </a>
            </>
          ) : (
            // Giriş yapılmamış
            <>
              <a href="/giris" className="text-gray-300 hover:text-white text-sm transition-colors">
                Giriş Yap
              </a>
              <a
                href="/kayit-ol"
                style={{ backgroundColor: "var(--teal)" }}
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
              style={aktifSayfa === link.etiket ? { color: "var(--teal)" } : {}}
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
                  href="/kayit-ol"
                  style={{ backgroundColor: "var(--teal)" }}
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
