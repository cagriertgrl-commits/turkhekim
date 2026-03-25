"use client";
import { useState } from "react";
import Link from "next/link";

const S = /** @type {const} */ ({ viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round", width:12, height:12 });

const KATEGORI_ETIKET = {
  genel:         { etiket: "Genel",       renk: "#6B7280", bg: "#F3F4F6", svg: <svg {...S}><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg> },
  kongre:        { etiket: "Kongre",      renk: "#7C3AED", bg: "#F5F3FF", svg: <svg {...S}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  "saglik-ipucu":{ etiket: "Sağlık İpucu",renk: "#059669", bg: "#ECFDF5", svg: <svg {...S}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  arastirma:     { etiket: "Araştırma",   renk: "#1D4ED8", bg: "#EFF6FF", svg: <svg {...S}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg> },
  duyuru:        { etiket: "Duyuru",      renk: "#D97706", bg: "#FFFBEB", svg: <svg {...S}><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg> },
  firma:         { etiket: "Firma",       renk: "#0E7C7B", bg: "#E6F4F4", svg: <svg {...S}><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
};

function zaman(iso) {
  const d = new Date(iso);
  const now = new Date();
  const fark = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (fark < 60) return "az önce";
  if (fark < 3600) return `${Math.floor(fark / 60)} dk önce`;
  if (fark < 86400) return `${Math.floor(fark / 3600)} sa önce`;
  if (fark < 604800) return `${Math.floor(fark / 86400)} gün önce`;
  return d.toLocaleDateString("tr-TR");
}

function PostKart({ post, session }) {
  const [begeniSayisi, setBegeniSayisi] = useState(post.begeni_sayisi || 0);
  const [begendi, setBegendi] = useState(post.begendi || false);
  const [yukleniyor, setYukleniyor] = useState(false);

  const isim = post.kaynak_tipi === "firma"
    ? post.firma_ad
    : [post.doktor_unvan, post.doktor_ad].filter(Boolean).join(" ");

  const initials = isim?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "DP";
  const profil_url = post.kaynak_tipi === "firma"
    ? `/firma/${post.firma_slug}`
    : `/doktor/${post.doktor_slug}`;
  const foto = post.kaynak_tipi === "firma" ? post.firma_logo : post.doktor_foto;

  const kat = KATEGORI_ETIKET[post.kategori] || KATEGORI_ETIKET.genel;

  async function toggleBegen() {
    if (!session || yukleniyor) return;
    setYukleniyor(true);
    try {
      const res = await fetch("/api/akis/begen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paylasi_id: post.id }),
      });
      const data = await res.json();
      setBegendi(data.begendi);
      setBegeniSayisi(s => data.begendi ? s + 1 : s - 1);
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Üst: Profil + Zaman + Kategori */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Link href={profil_url}>
            {foto ? (
              <img src={foto} alt={isim} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div style={{ backgroundColor: "#0D2137" }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
            )}
          </Link>
          <div>
            <Link href={profil_url} className="font-semibold text-sm text-gray-900 hover:underline">{isim}</Link>
            {post.uzmanlik && <p className="text-xs text-gray-400">{post.uzmanlik}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span style={{ backgroundColor: kat.bg, color: kat.renk }} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold">
            {kat.svg}{kat.etiket}
          </span>
          <span className="text-xs text-gray-400">{zaman(post.created_at)}</span>
        </div>
      </div>

      {/* İçerik */}
      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-3">{post.icerik}</p>

      {/* Resim */}
      {post.resim_url && (
        <img src={post.resim_url} alt="" className="w-full rounded-xl object-cover max-h-72 mb-3" />
      )}

      {/* Etiketler */}
      {post.etiketler && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.etiketler.split(",").map(e => e.trim()).filter(Boolean).map(e => (
            <span key={e} className="text-xs text-teal-600 font-medium">#{e}</span>
          ))}
        </div>
      )}

      {/* Alt: Beğeni */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
        <button
          onClick={toggleBegen}
          disabled={!session || yukleniyor}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
          style={{ color: begendi ? "#DC2626" : "#9CA3AF" }}
          title={session ? "" : "Beğenmek için giriş yapın"}
        >
          <svg viewBox="0 0 24 24" fill={begendi ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={14} height={14}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {begeniSayisi > 0 && <span>{begeniSayisi}</span>}
          <span>{begendi ? "Beğenildi" : "Beğen"}</span>
        </button>
      </div>
    </div>
  );
}

function PaylasiForm({ session, kategori, onYeni }) {
  const [icerik, setIcerik] = useState("");
  const [seciliKat, setSeciliKat] = useState(kategori || "genel");
  const [etiketler, setEtiketler] = useState("");
  const [gonderiyor, setGonderiyor] = useState(false);
  const [hata, setHata] = useState("");

  async function gonder(e) {
    e.preventDefault();
    if (!icerik.trim()) return;
    setGonderiyor(true);
    setHata("");
    try {
      const res = await fetch("/api/akis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ icerik, kategori: seciliKat, etiketler }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.hata || "Bir hata oluştu");
      setIcerik("");
      setEtiketler("");
      onYeni(data.post);
    } catch (err) {
      setHata(err.message);
    } finally {
      setGonderiyor(false);
    }
  }

  if (!session) return null;

  return (
    <form onSubmit={gonder} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
      <p className="text-xs font-semibold text-gray-500 mb-2">Yeni Paylaşım</p>
      <textarea
        value={icerik}
        onChange={e => setIcerik(e.target.value)}
        placeholder="Sağlık alanında güncel bir gelişme, ipucu veya duyuruyu paylaşın..."
        rows={3}
        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
      />
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={seciliKat}
          onChange={e => setSeciliKat(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="genel">Genel</option>
          <option value="kongre">Kongre & Etkinlik</option>
          <option value="saglik-ipucu">Sağlık İpucu</option>
          <option value="arastirma">Araştırma</option>
          <option value="duyuru">Duyuru</option>
        </select>
        <input
          value={etiketler}
          onChange={e => setEtiketler(e.target.value)}
          placeholder="Etiketler (virgülle ayır)"
          className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-0"
        />
        <button
          type="submit"
          disabled={gonderiyor || !icerik.trim()}
          style={{ backgroundColor: "#0D2137" }}
          className="text-white text-xs px-4 py-1.5 rounded-lg font-semibold hover:opacity-90 disabled:opacity-40"
        >
          {gonderiyor ? "Paylaşılıyor..." : "Paylaş"}
        </button>
      </div>
      {hata && <p className="text-red-500 text-xs mt-2">{hata}</p>}
    </form>
  );
}

export default function AkisIstemci({ baslangicPostlar, session, kategori }) {
  const [postlar, setPostlar] = useState(baslangicPostlar);
  const [sayfa, setSayfa] = useState(1);
  const [dahaVar, setDahaVar] = useState(baslangicPostlar.length === 20);
  const [yukleniyor, setYukleniyor] = useState(false);

  function yeniEkle(post) {
    const zengin = {
      ...post,
      doktor_ad: session?.ad || "",
      begendi: false,
      created_at: new Date().toISOString(),
    };
    setPostlar(p => [zengin, ...p]);
  }

  async function dahayukle() {
    setYukleniyor(true);
    try {
      const res = await fetch(`/api/akis?sayfa=${sayfa + 1}${kategori ? `&kategori=${kategori}` : ""}`);
      const data = await res.json();
      setPostlar(p => [...p, ...data.posts]);
      setSayfa(s => s + 1);
      setDahaVar(data.posts.length === 20);
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <div>
      <PaylasiForm session={session} kategori={kategori} onYeni={yeniEkle} />

      {postlar.length === 0 ? (
        <div className="text-center py-16">
          <div style={{ color: "#CBD5E1" }} className="flex justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={48} height={48}><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
          </div>
          <p className="text-gray-500 text-sm">Henüz paylaşım yok.</p>
          {session && <p className="text-gray-400 text-xs mt-1">İlk paylaşımı siz yapın!</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {postlar.map(post => (
            <PostKart key={post.id} post={post} session={session} />
          ))}
        </div>
      )}

      {dahaVar && (
        <div className="text-center mt-6">
          <button
            onClick={dahayukle}
            disabled={yukleniyor}
            style={{ backgroundColor: "#0D2137" }}
            className="text-white text-sm px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {yukleniyor ? "Yükleniyor..." : "Daha Fazla"}
          </button>
        </div>
      )}
    </div>
  );
}
