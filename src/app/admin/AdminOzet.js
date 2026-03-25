"use client";

const DURUM_RENK = {
  doktor_bekleniyor: { renk: "#D97706", bg: "#FFFBEB", metin: "Doktor Bekleniyor" },
  moderasyon_bekliyor: { renk: "#7C3AED", bg: "#F5F3FF", metin: "Moderasyon" },
  hasta_belge_bekliyor: { renk: "#0369A1", bg: "#F0F9FF", metin: "Belge Bekleniyor" },
  yayinlandi: { renk: "#059669", bg: "#F0FDF4", metin: "Yayında" },
  reddedildi: { renk: "#DC2626", bg: "#FFF1F2", metin: "Reddedildi" },
};

export default function AdminOzet({ doktorlar, yorumlar }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Son Kayıtlar</h3>
        <div className="space-y-3">
          {doktorlar.slice(0, 5).map(d => (
            <div key={d.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="font-semibold text-sm text-gray-900">{d.ad}</p>
                <p style={{ color: "#0E7C7B" }} className="text-xs">{d.uzmanlik} · {d.sehir}</p>
              </div>
              {d.onaylandi ? (
                <span style={{ backgroundColor: "#D1FAE5", color: "#059669" }} className="text-xs px-2 py-1 rounded-full">Yayında</span>
              ) : (
                <span style={{ backgroundColor: "#FFFBEB", color: "#D97706" }} className="text-xs px-2 py-1 rounded-full">Bekliyor</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Son Yorumlar</h3>
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
        <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-4">Hızlı Aksiyonlar</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/hasta-formlari", etiket: "Hasta Formları", renk: "#0E7C7B" },
            { href: "/tedaviler", etiket: "Tedaviler", renk: "#7C3AED" },
            { href: "/", etiket: "Ana Sayfa", renk: "#0D2137" },
            { href: "mailto:info@doktorpusula.com", etiket: "Mail At", renk: "#059669" },
          ].map(item => (
            <a key={item.href} href={item.href} target="_blank" style={{ backgroundColor: item.renk }} className="text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
              {item.etiket}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
