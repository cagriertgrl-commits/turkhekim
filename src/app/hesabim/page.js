"use client";

import { useState, useEffect } from "react";

const TEMALAR = [
  {
    id: "varsayilan",
    ad: "Varsayılan",
    aciklama: "Temiz & Minimal",
    pageBg: { backgroundColor: "#F5F7FA" },
    cardBg: "bg-white border-gray-100",
    text: "text-gray-900",
    subtext: "text-gray-500",
    bannerBg: { background: "linear-gradient(135deg, #e8f5f5 0%, #f0f9f9 100%)" },
  },
  {
    id: "koyu",
    ad: "Koyu Mavi",
    aciklama: "Profesyonel & Güçlü",
    pageBg: { backgroundColor: "#0D2137" },
    cardBg: "bg-white/10 border-white/20",
    text: "text-white",
    subtext: "text-blue-200",
    bannerBg: { background: "linear-gradient(135deg, #0a1c2e 0%, #0D2137 100%)" },
  },
  {
    id: "teal",
    ad: "Teal Gradient",
    aciklama: "Ferah & Modern",
    pageBg: { background: "linear-gradient(160deg, #0E7C7B 0%, #059669 50%, #047857 100%)" },
    cardBg: "bg-white/15 border-white/25",
    text: "text-white",
    subtext: "text-emerald-100",
    bannerBg: { background: "linear-gradient(135deg, #0a5c5c 0%, #065f46 100%)" },
  },
  {
    id: "desen",
    ad: "Logo Deseni",
    aciklama: "Markan her yerde",
    pageBg: {},
    cardBg: "bg-white/90 border-gray-200",
    text: "text-gray-900",
    subtext: "text-gray-500",
    bannerBg: {},
  },
];

function FotoYukleKarti({ baslik, aciklama, mevcut, initials, onYukle, yukleniyor, tip }) {
  function dosyaSec(e) {
    const dosya = e.target.files?.[0];
    if (dosya) onYukle(dosya);
    e.target.value = "";
  }

  return (
    <label className="flex items-center gap-4 cursor-pointer group">
      <div
        className={`flex-shrink-0 overflow-hidden border-2 border-gray-200 group-hover:border-teal-400 transition-colors ${
          tip === "profil" ? "w-16 h-16 rounded-full" : "w-16 h-16 rounded-xl"
        }`}
      >
        {yukleniyor ? (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : mevcut ? (
          <img src={mevcut} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
            {tip === "profil" ? (
              <span className="text-teal-600 font-bold text-sm">{initials}</span>
            ) : (
              "🖼️"
            )}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800">{baslik}</p>
        <p className="text-xs text-gray-500 mt-0.5">{aciklama}</p>
        <span className="text-xs text-teal-600 group-hover:underline mt-1 block">
          {mevcut ? "Değiştir" : "Yükle"}
        </span>
      </div>
      <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={dosyaSec} />
    </label>
  );
}

export default function HesabimPage() {
  const [veri, setVeri] = useState(null);
  const [tema, setTema] = useState("varsayilan");
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);
  const [profilYukleniyor, setProfilYukleniyor] = useState(false);
  const [arkaplanYukleniyor, setArkaplanYukleniyor] = useState(false);
  const [temaKaydediliyor, setTemaKaydediliyor] = useState(false);

  useEffect(() => {
    fetch("/api/hesabim")
      .then((r) => {
        if (r.status === 401) { window.location.href = "/giris"; return null; }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        setVeri(d);
        setTema(d.tema || "varsayilan");
      })
      .catch(() => setHata("Veriler yüklenemedi."));
  }, []);

  async function temaKaydet(yeniTema) {
    setTema(yeniTema);
    setTemaKaydediliyor(true);
    try {
      const r = await fetch("/api/hesabim", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema: yeniTema }),
      });
      if (r.ok) {
        gosterMesaj("Tema güncellendi!");
      } else {
        const d = await r.json().catch(() => ({}));
        setHata(d.hata || "Tema kaydedilemedi.");
      }
    } catch (_) {
      setHata("Tema kaydedilemedi — bağlantı hatası.");
    } finally {
      setTemaKaydediliyor(false);
    }
  }

  async function fotoYukle(dosya, tip) {
    const yukleniyorSetter = tip === "profil" ? setProfilYukleniyor : setArkaplanYukleniyor;
    yukleniyorSetter(true);
    setHata(null);
    try {
      const form = new FormData();
      form.append("foto", dosya);
      const url = tip === "profil" ? "/api/hesabim/profil-foto" : "/api/hesabim/arka-plan";
      const r = await fetch(url, { method: "POST", body: form });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setHata(data.hata || `Yükleme başarısız (HTTP ${r.status}).`);
        return;
      }
      if (!data.url) {
        setHata("Sunucu URL döndürmedi — tekrar deneyin.");
        return;
      }
      setVeri((prev) => ({
        ...prev,
        [tip === "profil" ? "foto_url" : "arka_plan_foto_url"]: data.url,
      }));
      gosterMesaj(tip === "profil" ? "Profil fotoğrafı güncellendi!" : "Arka plan güncellendi!");
    } catch (_) {
      setHata("Yükleme başarısız — bağlantı hatası.");
    } finally {
      yukleniyorSetter(false);
    }
  }

  function gosterMesaj(m) {
    setHata(null);
    setMesaj(m);
    setTimeout(() => setMesaj(null), 3000);
  }

  async function cikisYap() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  if (!veri) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const t = TEMALAR.find((x) => x.id === tema) || TEMALAR[0];
  const initials = veri.ad?.split(" ").slice(1).map((n) => n[0]).join("").slice(0, 2) || veri.ad?.slice(0, 2) || "DR";

  const pageStyle = tema === "desen" && veri.arka_plan_foto_url
    ? {
        backgroundImage: `url(${veri.arka_plan_foto_url})`,
        backgroundRepeat: "repeat",
        backgroundSize: "140px 140px",
      }
    : tema === "desen"
    ? { backgroundColor: "#F5F7FA" }
    : t.pageBg;

  const bannerStyle = tema === "desen" && veri.arka_plan_foto_url
    ? {
        backgroundImage: `url(${veri.arka_plan_foto_url})`,
        backgroundRepeat: "repeat",
        backgroundSize: "120px 120px",
        backgroundColor: "rgba(255,255,255,0.5)",
      }
    : veri.arka_plan_foto_url && tema !== "koyu" && tema !== "teal"
    ? { backgroundImage: `url(${veri.arka_plan_foto_url})`, backgroundSize: "cover", backgroundPosition: "center" }
    : t.bannerBg;

  return (
    <div className="min-h-screen" style={pageStyle}>
      {/* NAVBAR */}
      <nav style={{ backgroundColor: "rgba(13,33,55,0.97)", backdropFilter: "blur(8px)" }} className="px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#0E7C7B" />
                <circle cx="16" cy="16" r="1.8" fill="white" />
                <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C" />
                <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6" />
              </svg>
              <span className="text-white font-bold text-lg">
                Doktor<span style={{ color: "#C9A84C" }}>Pusula</span>
              </span>
            </a>
            <span className="text-gray-600 mx-1">/</span>
            <span className="text-gray-400 text-sm">Hesabım</span>
          </div>
          <a href="/panel" style={{ borderColor: "#0E7C7B", color: "#4DD9D8" }} className="border text-xs px-3 py-1.5 rounded-lg hover:opacity-80">
            ← Panele Dön
          </a>
        </div>
      </nav>

      {/* BANNER + PROFİL */}
      <div className="relative h-44 overflow-hidden" style={bannerStyle}>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Avatar — banner'a taşıyor */}
        <div className="flex items-end gap-5 -mt-14 mb-6 relative z-10">
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
              {veri.foto_url ? (
                <img src={veri.foto_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                  {initials}
                </div>
              )}
            </div>
            <label className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
              <span className="text-base leading-none">📷</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && fotoYukle(e.target.files[0], "profil")}
              />
            </label>
          </div>
          <div className="pb-2">
            <h1 className={`text-xl font-bold ${t.text}`}>{veri.ad}</h1>
            <p className={`text-sm ${t.subtext}`}>{veri.uzmanlik}</p>
          </div>
        </div>

        {/* MESAJ / HATA */}
        {hata && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200 flex items-start justify-between gap-3">
            <span>✗ {hata}</span>
            <button onClick={() => setHata(null)} className="text-red-400 hover:text-red-700 text-lg leading-none flex-shrink-0 bg-transparent border-0 cursor-pointer">×</button>
          </div>
        )}
        {mesaj && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            ✓ {mesaj}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 pb-10">
          {/* TEMA SEÇİMİ */}
          <div className={`rounded-2xl p-6 border backdrop-blur-sm ${t.cardBg}`}>
            <h2 className={`font-bold text-base mb-4 ${t.text}`}>🎨 Sayfa Teması</h2>
            <div className="grid grid-cols-2 gap-3">
              {TEMALAR.map((temaSec) => {
                const onizlemeBg =
                  temaSec.id === "desen"
                    ? veri.arka_plan_foto_url
                      ? {
                          backgroundImage: `url(${veri.arka_plan_foto_url})`,
                          backgroundRepeat: "repeat",
                          backgroundSize: "30px 30px",
                        }
                      : { background: "repeating-linear-gradient(45deg, #e5e7eb 0px, #e5e7eb 4px, #f3f4f6 4px, #f3f4f6 12px)" }
                    : temaSec.pageBg;
                return (
                  <button
                    key={temaSec.id}
                    onClick={() => temaKaydet(temaSec.id)}
                    className={`relative rounded-xl overflow-hidden border-2 text-left transition-all ${
                      tema === temaSec.id
                        ? "border-teal-400 shadow-lg ring-2 ring-teal-400 ring-offset-1"
                        : "border-transparent hover:border-teal-300"
                    }`}
                  >
                    <div className="h-14" style={onizlemeBg} />
                    <div className="px-3 py-2 bg-white">
                      <p className="text-xs font-semibold text-gray-800">{temaSec.ad}</p>
                      <p className="text-xs text-gray-400">{temaSec.aciklama}</p>
                    </div>
                    {tema === temaSec.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 10 10">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className={`text-xs mt-3 ${t.subtext}`}>
              "Logo Deseni" temasında yüklediğin arka plan resmi sayfa boyunca döşenir.
            </p>
          </div>

          {/* FOTOĞRAFLAR */}
          <div className={`rounded-2xl p-6 border backdrop-blur-sm ${t.cardBg}`}>
            <h2 className={`font-bold text-base mb-5 ${t.text}`}>📸 Fotoğraflar</h2>
            <div className="space-y-5">
              <FotoYukleKarti
                baslik="Profil Fotoğrafı"
                aciklama="Navbar ve profilinde görünür · Maks. 2MB"
                mevcut={veri.foto_url}
                initials={initials}
                onYukle={(d) => fotoYukle(d, "profil")}
                yukleniyor={profilYukleniyor}
                tip="profil"
              />

              <div className="border-t border-gray-100 pt-5">
                <FotoYukleKarti
                  baslik="Arka Plan / Logo"
                  aciklama={'PNG logo veya banner foto · "Logo Deseni" temasında döşenir · Maks. 5MB'}
                  mevcut={veri.arka_plan_foto_url}
                  onYukle={(d) => fotoYukle(d, "arkaplan")}
                  yukleniyor={arkaplanYukleniyor}
                  tip="arkaplan"
                />
              </div>

              {veri.arka_plan_foto_url && (
                <div className="border border-dashed border-gray-200 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-2">Ön izleme (döşenmiş)</p>
                  <div
                    className="h-16 rounded-lg"
                    style={{
                      backgroundImage: `url(${veri.arka_plan_foto_url})`,
                      backgroundRepeat: "repeat",
                      backgroundSize: "60px 60px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* HIZLI ERİŞİM */}
          <div className={`md:col-span-2 rounded-2xl p-5 border backdrop-blur-sm ${t.cardBg}`}>
            <h2 className={`font-bold text-sm mb-3 ${t.text}`}>Hızlı Erişim</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "/panel", label: "📊 Panel" },
                { href: "/gorusme-ozet", label: "🎙️ Görüşme Özetle" },
                { href: `/doktor/${veri.slug || ""}`, label: "👤 Profilimi Gör" },
                { href: "/paketler", label: "🚀 Paketler" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    ["koyu", "teal"].includes(tema)
                      ? "border-white/30 text-white hover:bg-white/20"
                      : "border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 bg-white/60"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={cikisYap}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all bg-transparent cursor-pointer ${
                  ["koyu", "teal"].includes(tema)
                    ? "border-red-400/50 text-red-300 hover:bg-red-400/20"
                    : "border-red-200 text-red-500 hover:border-red-400 bg-white/60"
                }`}
              >
                🚪 Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
