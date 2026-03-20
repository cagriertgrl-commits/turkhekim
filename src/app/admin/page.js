"use client";
import { useState, useEffect } from "react";

const SEKMELER = [
  { key: "ozet", label: "📊 Özet" },
  { key: "bekleyen", label: "⏳ Bekleyen" },
  { key: "doktorlar", label: "👨‍⚕️ Doktorlar" },
  { key: "yorumlar", label: "💬 Yorum Moderasyon" },
  { key: "dogrulamalar", label: "🔍 Doğrulamalar" },
  { key: "randevular", label: "📅 Randevular" },
];

const DURUM_RENK = {
  doktor_bekleniyor: { renk: "#D97706", bg: "#FFFBEB", metin: "⏳ Doktor Bekleniyor" },
  moderasyon_bekliyor: { renk: "#7C3AED", bg: "#F5F3FF", metin: "🔍 Moderasyon" },
  hasta_belge_bekliyor: { renk: "#0369A1", bg: "#F0F9FF", metin: "📎 Belge Bekleniyor" },
  yayinlandi: { renk: "#059669", bg: "#F0FDF4", metin: "✅ Yayında" },
  reddedildi: { renk: "#DC2626", bg: "#FFF1F2", metin: "❌ Reddedildi" },
};

export default function AdminPanel() {
  const [aktifSekme, setAktifSekme] = useState("ozet");
  const [doktorlar, setDoktorlar] = useState([]);
  const [yorumlar, setYorumlar] = useState([]);
  const [dogrulamalar, setDogrulamalar] = useState([]);
  const [randevular, setRandevular] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");
  const [moderasyonNotu, setModerayonNotu] = useState({});

  useEffect(() => { veriCek(); }, []);

  async function veriCek() {
    setYukleniyor(true);
    try {
      const [d, y, dg, r] = await Promise.all([
        fetch("/api/admin/doktorlar").then(r => r.json()),
        fetch("/api/yorum-listesi").then(r => r.json()),
        fetch("/api/admin/dogrulamalar").then(r => r.json()).catch(() => ({ dogrulamalar: [] })),
        fetch("/api/admin/randevular").then(r => r.json()).catch(() => ({ randevular: [] })),
      ]);
      setDoktorlar(Array.isArray(d) ? d : (d.doktorlar || []));
      setYorumlar(y.yorumlar || []);
      setDogrulamalar(dg.dogrulamalar || []);
      setRandevular(r.randevular || []);
    } catch (e) { console.error(e); }
    setYukleniyor(false);
  }

  async function doktorOnayla(id, onaylandi) {
    await fetch("/api/admin/doktorlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, onaylandi }) });
    setDoktorlar(doktorlar.map(d => d.id === id ? { ...d, onaylandi } : d));
  }

  async function doktorSil(id) {
    if (!confirm("🗑️ Bu doktoru gerçekten silmek istiyor musunuz? Bu işlem geri alınamaz!")) return;
    await fetch("/api/admin/doktorlar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setDoktorlar(doktorlar.filter(d => d.id !== id));
  }

  async function yorumYayinla(id) {
    await fetch("/api/admin/yorumlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, islem: "yayinla" }) });
    setYorumlar(yorumlar.map(y => y.id === id ? { ...y, dogrulama_durumu: "onaylandi" } : y));
  }

  async function yorumReddet(id) {
    const neden = moderasyonNotu[id] || "";
    await fetch("/api/admin/yorumlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, islem: "reddet", neden }) });
    setYorumlar(yorumlar.map(y => y.id === id ? { ...y, dogrulama_durumu: "reddedildi" } : y));
  }

  async function yorumSil(id) {
    if (!confirm("Yorum silinsin mi?")) return;
    await fetch("/api/admin/yorumlar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, doktor_id: yorumlar.find(y => y.id === id)?.doktor_id }) });
    setYorumlar(yorumlar.filter(y => y.id !== id));
  }

  const bekleyenDoktorlar = doktorlar.filter(d => !d.onaylandi);
  const moderasyonBekleyen = yorumlar.filter(y => y.dogrulama_durumu === "moderasyon_bekliyor");
  const toplamBekleyen = bekleyenDoktorlar.length + moderasyonBekleyen.length;

  const filtreliDoktorlar = arama
    ? doktorlar.filter(d => d.ad?.toLowerCase().includes(arama.toLowerCase()) || d.uzmanlik?.toLowerCase().includes(arama.toLowerCase()))
    : doktorlar;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
              <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
              <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            </svg>
            <div>
              <span className="text-white font-bold">DoktorPusula</span>
              <span style={{ color: "#C9A84C" }} className="text-xs ml-2 font-semibold">ADMIN PANELİ</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {toplamBekleyen > 0 && (
              <span style={{ backgroundColor: "#DC2626" }} className="text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                🔴 {toplamBekleyen} işlem bekliyor
              </span>
            )}
            <a href="/" className="text-gray-400 hover:text-white text-sm">← Siteye Dön</a>
          </div>
        </div>
      </nav>

      {/* İSTATİSTİKLER */}
      <div style={{ backgroundColor: "#0D2137" }} className="px-6 pb-8 pt-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { baslik: "Toplam Doktor", deger: doktorlar.length, icon: "👨‍⚕️", renk: "#4DD9D8" },
            { baslik: "Onaylı", deger: doktorlar.filter(d => d.onaylandi).length, icon: "✅", renk: "#6EE7B7" },
            { baslik: "Bekleyen", deger: bekleyenDoktorlar.length, icon: "⏳", renk: "#FCD34D" },
            { baslik: "Toplam Yorum", deger: yorumlar.length, icon: "💬", renk: "#C4B5FD" },
            { baslik: "Mod. Bekleyen", deger: moderasyonBekleyen.length, icon: "🔍", renk: "#FCA5A5" },
            { baslik: "Toplam Randevu", deger: randevular.length, icon: "📅", renk: "#93C5FD" },
          ].map(k => (
            <div key={k.baslik} style={{ backgroundColor: "#ffffff08" }} className="rounded-xl p-4 text-center">
              <div className="text-xl mb-1">{k.icon}</div>
              <div style={{ color: k.renk }} className="text-2xl font-bold">{k.deger}</div>
              <div className="text-gray-400 text-xs mt-0.5">{k.baslik}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* SEKMELER */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SEKMELER.map(s => (
            <button
              key={s.key}
              onClick={() => setAktifSekme(s.key)}
              style={aktifSekme === s.key ? { backgroundColor: "#0D2137", color: "white" } : { backgroundColor: "white", color: "#6B7280" }}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 transition-all hover:opacity-90 flex items-center gap-1.5"
            >
              {s.label}
              {s.key === "bekleyen" && bekleyenDoktorlar.length > 0 && (
                <span className="bg-yellow-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{bekleyenDoktorlar.length}</span>
              )}
              {s.key === "yorumlar" && moderasyonBekleyen.length > 0 && (
                <span className="bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{moderasyonBekleyen.length}</span>
              )}
            </button>
          ))}
        </div>

        {yukleniyor && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">⏳</div>
            <p>Veriler yükleniyor... (kahvenizi bekleyebilir)</p>
          </div>
        )}

        {/* ÖZET */}
        {!yukleniyor && aktifSekme === "ozet" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">📈 Son Kayıtlar</h3>
              <div className="space-y-3">
                {doktorlar.slice(0, 5).map(d => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{d.ad}</p>
                      <p style={{ color: "#0E7C7B" }} className="text-xs">{d.uzmanlik} · {d.sehir}</p>
                    </div>
                    {d.onaylandi ? (
                      <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-1 rounded-full">✓ Yayında</span>
                    ) : (
                      <span style={{ backgroundColor: "#FFFBEB", color: "#D97706" }} className="text-xs px-2 py-1 rounded-full">⏳ Bekliyor</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">💬 Son Yorumlar</h3>
              <div className="space-y-3">
                {yorumlar.slice(0, 5).map(y => (
                  <div key={y.id} className="py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-gray-900">{y.hasta_adi}</span>
                      <span style={{ backgroundColor: (DURUM_RENK[y.dogrulama_durumu || "doktor_bekleniyor"]?.bg), color: (DURUM_RENK[y.dogrulama_durumu || "doktor_bekleniyor"]?.renk) }} className="text-xs px-2 py-0.5 rounded-full">
                        {DURUM_RENK[y.dogrulama_durumu || "doktor_bekleniyor"]?.metin}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-1">{y.metin}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hızlı Aksiyonlar */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">⚡ Hızlı Aksiyonlar</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "/hasta-formlari", etiket: "📋 Hasta Formları", renk: "#0E7C7B" },
                  { href: "/tedaviler", etiket: "🩺 Tedaviler", renk: "#7C3AED" },
                  { href: "/", etiket: "🏠 Ana Sayfa", renk: "#0D2137" },
                  { href: "mailto:info@doktorpusula.com", etiket: "📧 Mail At", renk: "#059669" },
                ].map(item => (
                  <a key={item.href} href={item.href} target="_blank" style={{ backgroundColor: item.renk }} className="text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
                    {item.etiket}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BEKLEYENler */}
        {!yukleniyor && aktifSekme === "bekleyen" && (
          <div className="space-y-3">
            {bekleyenDoktorlar.length === 0 ? (
              <div className="bg-white rounded-2xl p-14 text-center shadow-sm">
                <p className="text-5xl mb-3">🎉</p>
                <p style={{ color: "#0D2137" }} className="font-bold text-lg">Bekleyen kayıt yok!</p>
                <p className="text-gray-400 text-sm mt-1">Tüm doktorlar onaylanmış. Kahvenizi hak ettiniz.</p>
              </div>
            ) : bekleyenDoktorlar.map(d => (
              <div key={d.id} className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-yellow-400">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 style={{ color: "#0D2137" }} className="font-bold text-lg">{d.unvan ? `${d.unvan} ${d.ad}` : d.ad}</h3>
                      {d.diploma_no && <span style={{ backgroundColor: "#EFF6FF", color: "#1E40AF" }} className="text-xs px-2 py-0.5 rounded-full">🎓 Diploma: {d.diploma_no}</span>}
                    </div>
                    <p style={{ color: "#0E7C7B" }} className="font-semibold text-sm mb-1">{d.uzmanlik}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-3">
                      <span>📍 {d.sehir}{d.ilce ? `, ${d.ilce}` : ""}</span>
                      {d.email && <span>📧 {d.email}</span>}
                      {d.telefon && <span>📞 {d.telefon}</span>}
                      {d.klinik_adi && <span>🏥 {d.klinik_adi}</span>}
                      {d.website && <a href={d.website} target="_blank" style={{ color: "#0E7C7B" }} className="hover:underline">🌐 Web</a>}
                    </div>
                    {d.hakkinda && <p className="text-gray-500 text-sm bg-gray-50 rounded-xl p-3 italic">{d.hakkinda.slice(0, 200)}{d.hakkinda.length > 200 ? "..." : ""}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a href={`/doktor/${d.slug}`} target="_blank" className="text-xs px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">
                      👁️ Profil
                    </a>
                    <button onClick={() => doktorOnayla(d.id, true)} style={{ backgroundColor: "#059669" }} className="text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                      ✓ Onayla
                    </button>
                    <button onClick={() => doktorSil(d.id)} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TÜM DOKTORLAR */}
        {!yukleniyor && aktifSekme === "doktorlar" && (
          <div>
            <div className="mb-4">
              <input
                value={arama}
                onChange={e => setArama(e.target.value)}
                placeholder="Doktor adı veya uzmanlık ara..."
                className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-400"
              />
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: "#F5F7FA" }}>
                  <tr>
                    {["Doktor", "Uzmanlık", "Şehir", "Klinik", "Puan", "Durum", "İşlem"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtreliDoktorlar.map((d, i) => (
                    <tr key={d.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#FAFAFA" }} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-gray-900">{d.unvan ? `${d.unvan} ${d.ad}` : d.ad}</p>
                          {d.email && <p className="text-gray-400 text-xs">{d.email}</p>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{d.uzmanlik}</td>
                      <td className="px-4 py-3 text-gray-600">{d.sehir}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{d.klinik_adi || "—"}</td>
                      <td className="px-4 py-3">
                        {d.yorum_sayisi > 0 ? <span className="text-yellow-500 font-bold">★ {d.puan}</span> : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        {d.onaylandi
                          ? <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-1 rounded-full font-semibold">✓ Yayında</span>
                          : <span style={{ backgroundColor: "#FFFBEB", color: "#D97706" }} className="text-xs px-2 py-1 rounded-full font-semibold">⏳ Bekliyor</span>
                        }
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => doktorOnayla(d.id, !d.onaylandi)} className={`text-xs px-2.5 py-1 rounded-lg font-semibold ${d.onaylandi ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                            {d.onaylandi ? "Durdur" : "Onayla"}
                          </button>
                          <a href={`/doktor/${d.slug}`} target="_blank" className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">Gör</a>
                          <button onClick={() => doktorSil(d.id)} className="text-xs px-2.5 py-1 rounded-lg bg-red-100 text-red-600">Sil</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtreliDoktorlar.length === 0 && (
                <div className="text-center py-10 text-gray-400">Sonuç bulunamadı 🔍</div>
              )}
            </div>
          </div>
        )}

        {/* YORUM MODERASYON */}
        {!yukleniyor && aktifSekme === "yorumlar" && (
          <div className="space-y-4">
            {/* Moderasyon Bekleyenler */}
            {moderasyonBekleyen.length > 0 && (
              <div>
                <h3 style={{ color: "#7C3AED" }} className="font-bold text-sm mb-3 flex items-center gap-2">
                  🔍 Moderasyon Bekleyen ({moderasyonBekleyen.length})
                  <span className="text-xs text-gray-400 font-normal">— Doktor muayene onayını verdi, sizin kararınızı bekliyor</span>
                </h3>
                {moderasyonBekleyen.map(y => (
                  <div key={y.id} className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-400 mb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">{y.hasta_adi?.[0]}</div>
                          <div>
                            <span className="font-semibold text-sm text-gray-900">{y.hasta_adi}</span>
                            <span className="text-gray-400 text-xs ml-2">{y.tarih}</span>
                          </div>
                          <div className="flex">{[...Array(y.puan || 0)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
                        </div>
                        <p className="text-gray-700 text-sm mb-2 bg-gray-50 rounded-xl p-3">{y.metin}</p>
                        {y.doktor_adi && <p className="text-xs text-gray-400">Doktor: <strong>{y.doktor_adi}</strong></p>}
                        <div className="mt-3">
                          <input
                            value={moderasyonNotu[y.id] || ""}
                            onChange={e => setModerayonNotu({ ...moderasyonNotu, [y.id]: e.target.value })}
                            placeholder="Ret nedeni (opsiyonel)..."
                            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button onClick={() => yorumYayinla(y.id)} style={{ backgroundColor: "#059669" }} className="text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                          ✅ Yayınla
                        </button>
                        <button onClick={() => yorumReddet(y.id)} style={{ backgroundColor: "#DC2626" }} className="text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                          ❌ Reddet
                        </button>
                        <button onClick={() => yorumSil(y.id)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200">
                          🗑️ Sil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Diğer Yorumlar */}
            <div>
              <h3 style={{ color: "#0D2137" }} className="font-bold text-sm mb-3">Tüm Yorumlar ({yorumlar.length})</h3>
              <div className="space-y-2">
                {yorumlar.filter(y => y.dogrulama_durumu !== "moderasyon_bekliyor").map(y => {
                  const durum = DURUM_RENK[y.dogrulama_durumu || "doktor_bekleniyor"];
                  return (
                    <div key={y.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">{y.hasta_adi}</span>
                          <div className="flex">{[...Array(y.puan || 0)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}</div>
                          <span style={{ backgroundColor: durum?.bg, color: durum?.renk }} className="text-xs px-2 py-0.5 rounded-full">{durum?.metin}</span>
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2">{y.metin}</p>
                      </div>
                      <button onClick={() => yorumSil(y.id)} className="text-gray-300 hover:text-red-400 text-xs flex-shrink-0 mt-1">🗑️</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* DOĞRULAMALAR */}
        {!yukleniyor && aktifSekme === "dogrulamalar" && (
          <div>
            <p className="text-sm text-gray-400 mb-4">Doktor-hasta arasındaki anlaşmazlıkları buradan yönetin. Arabulucu olarak devreye girebilirsiniz.</p>
            {dogrulamalar.length === 0 ? (
              <div className="bg-white rounded-2xl p-14 text-center shadow-sm">
                <p className="text-4xl mb-2">🤝</p>
                <p style={{ color: "#0D2137" }} className="font-bold">Anlaşmazlık yok!</p>
                <p className="text-gray-400 text-sm mt-1">Herkes birbirine güveniyor. Sağlık sistemine inanç tazelendi.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dogrulamalar.map(d => {
                  const durum = DURUM_RENK[d.durum] || DURUM_RENK.doktor_bekleniyor;
                  return (
                    <div key={d.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{d.hasta_adi}</p>
                          <p className="text-xs text-gray-400">{new Date(d.created_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</p>
                        </div>
                        <span style={{ backgroundColor: durum.bg, color: durum.renk }} className="text-xs px-2 py-1 rounded-full font-semibold">{durum.metin}</span>
                      </div>
                      {d.hasta_itiraz_belgesi && (
                        <div style={{ backgroundColor: "#F0F9FF", borderColor: "#BAE6FD" }} className="border rounded-xl p-3 text-sm text-blue-800">
                          📎 Hasta belge gönderdi: {d.hasta_itiraz_belgesi}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* RANDEVULAR */}
        {!yukleniyor && aktifSekme === "randevular" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#F5F7FA" }}>
                <tr>
                  {["Hasta", "Telefon", "Şikayet", "Tip", "Durum", "Tarih"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {randevular.map((r, i) => (
                  <tr key={r.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#FAFAFA" }}>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.hasta_adi}</td>
                    <td className="px-4 py-3 text-gray-500">{r.telefon}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs"><p className="truncate">{r.sikayet}</p></td>
                    <td className="px-4 py-3">
                      <span style={{ backgroundColor: r.tip === "online" ? "#D1FAE5" : "#EFF6FF", color: r.tip === "online" ? "#059669" : "#1E40AF" }} className="text-xs px-2 py-1 rounded-full font-semibold">
                        {r.tip === "online" ? "🎥 Online" : "🏥 Yüz Yüze"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ backgroundColor: { bekliyor: "#FFFBEB", onaylandi: "#D1FAE5", reddedildi: "#FFF1F2" }[r.durum] || "#F5F7FA", color: { bekliyor: "#D97706", onaylandi: "#059669", reddedildi: "#DC2626" }[r.durum] || "#6B7280" }} className="text-xs px-2 py-1 rounded-full font-semibold">
                        {r.durum || "bekliyor"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString("tr-TR") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {randevular.length === 0 && <div className="text-center py-10 text-gray-400">Henüz randevu yok 📅</div>}
          </div>
        )}

      </div>
    </div>
  );
}
