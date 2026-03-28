"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminOzet from "./AdminOzet";
import AdminDoktorTablosu from "./AdminDoktorTablosu";
import AdminYorumModerasyon from "./AdminYorumModerasyon";

const SEKMELER = [
  { key: "ozet", label: "Özet" },
  { key: "bekleyen", label: "Bekleyen" },
  { key: "doktorlar", label: "Doktorlar" },
  { key: "yorumlar", label: "Yorum Moderasyon" },
  { key: "dogrulamalar", label: "Doğrulamalar" },
  { key: "randevular", label: "Randevular" },
  { key: "api", label: "API Kullanımı" },
];

const DURUM_RENK = {
  doktor_bekleniyor: { renk: "#D97706", bg: "#FFFBEB", metin: "Doktor Bekleniyor" },
  moderasyon_bekliyor: { renk: "#7C3AED", bg: "#F5F3FF", metin: "Moderasyon" },
  yayinlandi: { renk: "#059669", bg: "#F0FDF4", metin: "Yayında" },
  reddedildi: { renk: "#DC2626", bg: "#FFF1F2", metin: "Reddedildi" },
};

export default function AdminPanel() {
  const [aktifSekme, setAktifSekme] = useState("ozet");
  const [doktorlar, setDoktorlar] = useState([]);
  const [yorumlar, setYorumlar] = useState([]);
  const [dogrulamalar, setDogrulamalar] = useState([]);
  const [randevular, setRandevular] = useState([]);
  const [apiKullanim, setApiKullanim] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => { veriCek(); }, []);

  async function veriCek() {
    setYukleniyor(true);
    try {
      const [d, y, dg, r, apiData] = await Promise.all([
        fetch("/api/admin/doktorlar").then(r => r.ok ? r.json() : []),
        fetch("/api/yorum-listesi").then(r => r.ok ? r.json() : { yorumlar: [] }),
        fetch("/api/admin/dogrulamalar").then(r => r.ok ? r.json() : { dogrulamalar: [] }).catch(() => ({ dogrulamalar: [] })),
        fetch("/api/admin/randevular").then(r => r.ok ? r.json() : { randevular: [] }).catch(() => ({ randevular: [] })),
        fetch("/api/admin/api-kullanim").then(r => r.ok ? r.json() : null).catch(() => null),
      ]);
      setDoktorlar(Array.isArray(d) ? d : (d.doktorlar || []));
      setYorumlar(y.yorumlar || []);
      setDogrulamalar(dg.dogrulamalar || []);
      setRandevular(r.randevular || []);
      setApiKullanim(apiData);
    } catch { /* sessiz */ }
    setYukleniyor(false);
  }

  async function doktorOnayla(id, onaylandi) {
    try {
      const res = await fetch("/api/admin/doktorlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, onaylandi }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDoktorlar(doktorlar.map(d => d.id === id ? { ...d, onaylandi } : d));
    } catch { /* sessiz */ }
  }

  async function paketGuncelle(id, paket) {
    try {
      const res = await fetch("/api/admin/doktorlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, paket }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDoktorlar(doktorlar.map(d => d.id === id ? { ...d, paket } : d));
    } catch { /* sessiz */ }
  }

  async function doktorSil(id) {
    if (!confirm("Bu doktoru gerçekten silmek istiyor musunuz? Bu işlem geri alınamaz!")) return;
    try {
      const res = await fetch("/api/admin/doktorlar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setDoktorlar(doktorlar.filter(d => d.id !== id));
    } catch { /* sessiz */ }
  }

  async function yorumYayinla(id) {
    try {
      const res = await fetch("/api/admin/yorumlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, islem: "yayinla" }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setYorumlar(yorumlar.map(y => y.id === id ? { ...y, dogrulama_durumu: "onaylandi" } : y));
    } catch { /* sessiz */ }
  }

  async function yorumReddet(id, neden) {
    try {
      const res = await fetch("/api/admin/yorumlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, islem: "reddet", neden }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setYorumlar(yorumlar.map(y => y.id === id ? { ...y, dogrulama_durumu: "reddedildi" } : y));
    } catch { /* sessiz */ }
  }

  async function yorumSil(id) {
    if (!confirm("Yorum silinsin mi?")) return;
    try {
      const res = await fetch("/api/admin/yorumlar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, doktor_id: yorumlar.find(y => y.id === id)?.doktor_id }) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setYorumlar(yorumlar.filter(y => y.id !== id));
    } catch { /* sessiz */ }
  }

  const bekleyenDoktorlar = doktorlar.filter(d => !d.onaylandi);
  const moderasyonBekleyen = yorumlar.filter(y => y.dogrulama_durumu === "moderasyon_bekliyor");
  const toplamBekleyen = bekleyenDoktorlar.length + moderasyonBekleyen.length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="0.6" opacity="0.35"/>
              <line x1="16" y1="2.5" x2="16" y2="5.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <line x1="16" y1="26.5" x2="16" y2="29.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <line x1="2.5" y1="16" x2="5.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <line x1="26.5" y1="16" x2="29.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <polygon points="16,4.5 14,15 18,15" fill="#C9A84C"/>
              <polygon points="16,27.5 18,17 14,17" fill="white" opacity="0.5"/>
              <polygon points="4.5,16 15,14 15,18" fill="white" opacity="0.3"/>
              <polygon points="27.5,16 17,18 17,14" fill="white" opacity="0.3"/>
              <circle cx="16" cy="16" r="2" fill="white"/>
              <circle cx="16" cy="16" r="0.8" fill="#C9A84C"/>
            </svg>
            <div>
              <span className="text-white font-bold">DoktorPusula</span>
              <span style={{ color: "#C9A84C" }} className="text-xs ml-2 font-semibold">ADMIN PANELİ</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {toplamBekleyen > 0 && (
              <span style={{ backgroundColor: "#DC2626" }} className="text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                {toplamBekleyen} işlem bekliyor
              </span>
            )}
            <Link href="/" className="text-gray-400 hover:text-white text-sm">Siteye Dön</Link>
          </div>
        </div>
      </nav>

      {/* İSTATİSTİKLER */}
      <div style={{ backgroundColor: "#0D2137" }} className="px-6 pb-8 pt-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { baslik: "Toplam Doktor", deger: doktorlar.length, renk: "#4DD9D8" },
            { baslik: "Onaylı", deger: doktorlar.filter(d => d.onaylandi).length, renk: "#6EE7B7" },
            { baslik: "Bekleyen", deger: bekleyenDoktorlar.length, renk: "#FCD34D" },
            { baslik: "Toplam Yorum", deger: yorumlar.length, renk: "#C4B5FD" },
            { baslik: "Mod. Bekleyen", deger: moderasyonBekleyen.length, renk: "#FCA5A5" },
            { baslik: "Toplam Randevu", deger: randevular.length, renk: "#93C5FD" },
          ].map(k => (
            <div key={k.baslik} style={{ backgroundColor: "#ffffff08" }} className="rounded-xl p-4 text-center">
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
            <p>Veriler yükleniyor...</p>
          </div>
        )}

        {/* ÖZET */}
        {!yukleniyor && aktifSekme === "ozet" && (
          <AdminOzet doktorlar={doktorlar} yorumlar={yorumlar} />
        )}

        {/* BEKLEYENLER */}
        {!yukleniyor && aktifSekme === "bekleyen" && (
          <div className="space-y-3">
            {bekleyenDoktorlar.length === 0 ? (
              <div className="bg-white rounded-2xl p-14 text-center shadow-sm">
                <p style={{ color: "#0D2137" }} className="font-bold text-lg">Bekleyen kayıt yok!</p>
                <p className="text-gray-400 text-sm mt-1">Tüm doktorlar onaylanmış.</p>
              </div>
            ) : bekleyenDoktorlar.map(d => (
              <div key={d.id} className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-yellow-400">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 style={{ color: "#0D2137" }} className="font-bold text-lg">{d.unvan ? `${d.unvan} ${d.ad}` : d.ad}</h3>
                      {d.diploma_no && <span style={{ backgroundColor: "#EFF6FF", color: "#1E40AF" }} className="text-xs px-2 py-0.5 rounded-full">Diploma: {d.diploma_no}</span>}
                    </div>
                    <p style={{ color: "#0E7C7B" }} className="font-semibold text-sm mb-1">{d.uzmanlik}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-3">
                      <span>{d.sehir}{d.ilce ? `, ${d.ilce}` : ""}</span>
                      {d.email && <span>{d.email}</span>}
                      {d.telefon && <span>{d.telefon}</span>}
                      {d.klinik_adi && <span>{d.klinik_adi}</span>}
                    </div>
                    {d.hakkinda && <p className="text-gray-500 text-sm bg-gray-50 rounded-xl p-3 italic">{d.hakkinda.slice(0, 200)}{d.hakkinda.length > 200 ? "..." : ""}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a href={`/doktor/${d.slug}`} target="_blank" className="text-xs px-3 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">
                      Profil
                    </a>
                    <button onClick={() => doktorOnayla(d.id, true)} style={{ backgroundColor: "#059669" }} className="text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                      Onayla
                    </button>
                    <button onClick={() => doktorSil(d.id)} className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90">
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TÜM DOKTORLAR */}
        {!yukleniyor && aktifSekme === "doktorlar" && (
          <AdminDoktorTablosu
            doktorlar={doktorlar}
            onOnayla={doktorOnayla}
            onPaketGuncelle={paketGuncelle}
            onSil={doktorSil}
          />
        )}

        {/* YORUM MODERASYON */}
        {!yukleniyor && aktifSekme === "yorumlar" && (
          <AdminYorumModerasyon
            yorumlar={yorumlar}
            onYayinla={yorumYayinla}
            onReddet={yorumReddet}
            onSil={yorumSil}
          />
        )}

        {/* DOĞRULAMALAR */}
        {!yukleniyor && aktifSekme === "dogrulamalar" && (
          <div>
            <p className="text-sm text-gray-400 mb-4">Doktor-hasta arasındaki anlaşmazlıkları buradan yönetin.</p>
            {dogrulamalar.length === 0 ? (
              <div className="bg-white rounded-2xl p-14 text-center shadow-sm">
                <p style={{ color: "#0D2137" }} className="font-bold">Anlaşmazlık yok!</p>
                <p className="text-gray-400 text-sm mt-1">Herkes birbirine güveniyor.</p>
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
                          Hasta belge gönderdi: {d.hasta_itiraz_belgesi}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* API KULLANIMI */}
        {!yukleniyor && aktifSekme === "api" && (
          <div className="space-y-4">
            {!apiKullanim || apiKullanim.hata ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-700 text-sm">
                Henüz API kullanım verisi yok. İlk AI Asistan kullanımından sonra burada görünür.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { baslik: "Bu Ay İstek", deger: Number(apiKullanim.buAy?.istek_sayisi || 0).toLocaleString("tr-TR"), renk: "#7C3AED" },
                    { baslik: "Giriş Token", deger: Number(apiKullanim.buAy?.input_tokens || 0).toLocaleString("tr-TR"), renk: "#0E7C7B" },
                    { baslik: "Çıkış Token", deger: Number(apiKullanim.buAy?.output_tokens || 0).toLocaleString("tr-TR"), renk: "#D97706" },
                    { baslik: "Tahmini Maliyet", deger: `$${(apiKullanim.buAyMaliyet || 0).toFixed(4)}`, renk: "#059669" },
                  ].map(k => (
                    <div key={k.baslik} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div style={{ color: k.renk }} className="text-xl font-bold">{k.deger}</div>
                      <div className="text-gray-400 text-xs mt-1">{k.baslik}</div>
                    </div>
                  ))}
                </div>

                {apiKullanim.endpoint?.length > 0 && (
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm">Bu Ay — Endpoint Bazlı</h3>
                    <div className="space-y-3">
                      {apiKullanim.endpoint.map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <span className="font-medium text-sm text-gray-800">{row.endpoint}</span>
                            <span className="text-xs text-gray-400 ml-2">{row.model}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-700">{Number(row.istek_sayisi).toLocaleString("tr-TR")} istek</div>
                            <div className="text-xs text-gray-400">{(Number(row.input_tokens) + Number(row.output_tokens)).toLocaleString("tr-TR")} token</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {apiKullanim.gunluk?.length > 0 && (
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm">Son 7 Gün</h3>
                    <div className="space-y-2">
                      {apiKullanim.gunluk.map((g, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <span className="text-sm text-gray-600">{new Date(g.tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</span>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span>{Number(g.istek_sayisi)} istek</span>
                            <span>{(Number(g.input_tokens) + Number(g.output_tokens)).toLocaleString("tr-TR")} token</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 text-center">* Maliyet tahminidir. Gerçek fatura Anthropic Console&apos;dan görülebilir.</p>
              </>
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
                        {r.tip === "online" ? "Online" : "Yüz Yüze"}
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
            {randevular.length === 0 && <div className="text-center py-10 text-gray-400">Henüz randevu yok</div>}
          </div>
        )}

      </div>
    </div>
  );
}
