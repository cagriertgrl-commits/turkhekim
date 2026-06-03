"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import IstatistikDashboard from "./IstatistikDashboard";
import AdminTablo from "./AdminTablo";
import SMSKuyrugu from "./SMSKuyrugu";
import BildirimGonder from "./BildirimGonder";

const SEKMELER = [
  { kod: "ozet",          ad: "📊 Özet",                    grup: "ana" },
  { kod: "doktorlar",     ad: "👨‍⚕️ Doktorlar",              grup: "kullanici" },
  { kod: "tercumanlar",   ad: "🌐 Tercümanlar",              grup: "kullanici" },
  { kod: "avukatlar",     ad: "⚖️ Avukatlar",                grup: "kullanici" },
  { kod: "firmalar",      ad: "🏢 Firmalar",                 grup: "kullanici" },
  { kod: "klinikler",     ad: "🏥 Klinikler",                grup: "kullanici" },
  { kod: "yorumlar",      ad: "💬 Yorum Moderasyon",         grup: "moderasyon" },
  { kod: "dogrulamalar",  ad: "✅ Yorum Doğrulama",          grup: "moderasyon" },
  { kod: "ilanlar",       ad: "🏷️ Pazaryeri İlanlar",        grup: "icerik" },
  { kod: "rfq",           ad: "📋 Doktor RFQ'ları",         grup: "icerik" },
  { kod: "hukukTalep",    ad: "⚖️ Hukuki Talepler",          grup: "icerik" },
  { kod: "hukukMakale",   ad: "📰 Hukuk Makaleleri",         grup: "icerik" },
  { kod: "randevular",    ad: "📅 Randevular",               grup: "operasyon" },
  { kod: "sms",           ad: "📱 SMS Kuyruğu",              grup: "operasyon" },
  { kod: "bildirim",      ad: "🔔 Bildirim Gönder",          grup: "operasyon" },
  { kod: "bulten",        ad: "📩 Hukuk Bülten",             grup: "operasyon" },
  { kod: "hatalar",       ad: "🐛 Hata Logu",                grup: "sistem" },
  { kod: "api",           ad: "🤖 AI/API Kullanım",          grup: "sistem" },
];

const TABLO_KONFIG = {
  doktorlar: {
    api: "/api/admin/doktorlar",
    altAnahtar: "doktorlar",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "ad", b: "Ad" },
      { k: "soyad", b: "Soyad" },
      { k: "uzmanlik", b: "Uzmanlık" },
      { k: "sehir", b: "Şehir" },
      { k: "email", b: "E-posta" },
      { k: "paket", b: "Paket" },
      { k: "onaylandi", b: "Onay", tip: "boolean" },
    ],
    toggleAlan: "onaylandi",
    aramaAlanlari: ["ad", "soyad", "email", "uzmanlik", "sehir"],
  },
  tercumanlar: {
    api: "/api/admin/tercumanlar",
    altAnahtar: "tercumanlar",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "ad", b: "Ad" }, { k: "soyad", b: "Soyad" },
      { k: "diller", b: "Diller" },
      { k: "sehir", b: "Şehir" }, { k: "email", b: "E-posta" },
      { k: "aktif", b: "Aktif", tip: "boolean" },
    ],
    toggleAlan: "aktif",
    aramaAlanlari: ["ad", "soyad", "email", "diller"],
  },
  avukatlar: {
    api: "/api/admin/avukatlar",
    altAnahtar: "avukatlar",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "ad", b: "Ad" }, { k: "soyad", b: "Soyad" },
      { k: "baro_sicil_no", b: "Baro Sicil" },
      { k: "uzmanlik_alanlari", b: "Uzmanlık" },
      { k: "sehir", b: "Şehir" },
      { k: "aktif", b: "Aktif", tip: "boolean" },
    ],
    toggleAlan: "aktif",
    aramaAlanlari: ["ad", "soyad", "email", "baro_sicil_no", "uzmanlik_alanlari"],
  },
  firmalar: {
    api: "/api/admin/firmalar",
    altAnahtar: "firmalar",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "ad", b: "Firma" },
      { k: "vergi_no", b: "Vergi No" },
      { k: "ad_soyad_yetkili", b: "Yetkili" },
      { k: "kategori", b: "Kategori" },
      { k: "sehir", b: "Şehir" }, { k: "email", b: "E-posta" },
      { k: "aktif", b: "Aktif", tip: "boolean" },
    ],
    toggleAlan: "aktif",
    aramaAlanlari: ["ad", "vergi_no", "email", "ad_soyad_yetkili"],
  },
  klinikler: {
    api: "/api/admin/klinikler",
    altAnahtar: "klinikler",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "ad", b: "Klinik" },
      { k: "kurum_tipi", b: "Tip" },
      { k: "sehir", b: "Şehir" },
      { k: "telefon", b: "Telefon" }, { k: "email", b: "E-posta" },
      { k: "onaylandi", b: "Onay", tip: "boolean" },
    ],
    toggleAlan: "onaylandi",
    aramaAlanlari: ["ad", "sehir", "email"],
  },
  ilanlar: {
    api: "/api/admin/pazaryeri-ilanlar",
    altAnahtar: "ilanlar",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "baslik", b: "Başlık" },
      { k: "firma_ad", b: "Firma" },
      { k: "kategori", b: "Kategori" },
      { k: "stok_durumu", b: "Stok" },
      { k: "goruntulenme", b: "👁️" },
      { k: "aktif", b: "Aktif", tip: "boolean" },
    ],
    toggleAlan: "aktif",
    aramaAlanlari: ["baslik", "firma_ad", "kategori"],
  },
  rfq: {
    api: "/api/admin/malzeme-talepleri",
    altAnahtar: "talepler",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "baslik", b: "Talep" },
      { k: "kategori", b: "Kategori" },
      { k: "doktor_ad", b: "Doktor" },
      { k: "butce", b: "Bütçe" },
      { k: "durum", b: "Durum" },
    ],
    aramaAlanlari: ["baslik", "kategori", "doktor_ad"],
  },
  hukukTalep: {
    api: "/api/admin/hukuki-talepler",
    altAnahtar: "talepler",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "talep_eden_tip", b: "Talep Eden" },
      { k: "konu_kategori", b: "Konu" },
      { k: "aciliyet", b: "Aciliyet" },
      { k: "butce", b: "Bütçe" },
      { k: "avukat_ad", b: "Atanan Avukat" },
      { k: "durum", b: "Durum" },
    ],
    aramaAlanlari: ["konu_kategori", "soru_metni"],
  },
  hukukMakale: {
    api: "/api/admin/hukuki-makaleler",
    altAnahtar: "makaleler",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "baslik", b: "Başlık" },
      { k: "kategori", b: "Kategori" },
      { k: "yazar_ad", b: "Yazar" },
      { k: "goruntulenme", b: "👁️" },
      { k: "yayinda", b: "Yayında", tip: "boolean" },
    ],
    toggleAlan: "yayinda",
    aramaAlanlari: ["baslik", "kategori", "yazar_ad"],
  },
  bulten: {
    api: "/api/admin/bulten",
    altAnahtar: "aboneler",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "email", b: "E-posta" },
      { k: "ad", b: "Ad" },
      { k: "kvkk_onaylandi", b: "KVKK", tip: "boolean" },
      { k: "aktif", b: "Aktif", tip: "boolean" },
    ],
    toggleAlan: "aktif",
    aramaAlanlari: ["email", "ad"],
    ekstraIslem: { tip: "csv-export", api: "/api/admin/bulten?format=csv", etiket: "📥 CSV İndir" },
  },
  hatalar: {
    api: "/api/admin/hata-logu",
    altAnahtar: "loglar",
    kolonlar: [
      { k: "id", b: "ID", w: "w-12" },
      { k: "error_msg", b: "Hata" },
      { k: "url", b: "URL" },
      { k: "doktor_id", b: "Doktor" },
      { k: "ip", b: "IP" },
    ],
    aramaAlanlari: ["error_msg", "url"],
  },
};

export default function YonetimPaneli() {
  const [aktif, setAktif] = useState("ozet");
  const [yetkisiz, setYetkisiz] = useState(false);

  useEffect(() => {
    fetch("/api/admin/istatistik").then(r => { if (r.status === 401) setYetkisiz(true); });
  }, []);

  if (yetkisiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center max-w-md">
          <div className="text-5xl mb-3">🔒</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Yetkisiz Erişim</h1>
          <p className="text-sm text-gray-500 mb-4">Yönetim panelini kullanmak için admin olarak giriş yapmalısınız.</p>
          <Link href="/admin" className="inline-block bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-semibold">Admin Girişi</Link>
        </div>
      </div>
    );
  }

  const grupAdlari = { ana: "Ana", kullanici: "Kullanıcılar", moderasyon: "Moderasyon", icerik: "İçerik", operasyon: "Operasyon", sistem: "Sistem" };
  const grupSekmeler = Object.keys(grupAdlari).map(g => ({ g, sekmeler: SEKMELER.filter(s => s.grup === g) }));

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-4 py-3 sticky top-0 z-40 shadow">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold">TurkHekim</Link>
            <span className="text-gray-400 text-sm">/ Yönetim Paneli</span>
          </div>
          <div className="flex gap-2 text-xs">
            <Link href="/admin" className="bg-white/10 px-3 py-1.5 rounded">Eski Admin</Link>
            <Link href="/" className="bg-white/10 px-3 py-1.5 rounded">Anasayfa</Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-52px)] sticky top-[52px] overflow-y-auto">
          {grupSekmeler.map(({ g, sekmeler }) => (
            <div key={g} className="border-b border-gray-100 py-2">
              <div className="text-[10px] font-bold uppercase text-gray-400 px-4 pb-1">{grupAdlari[g]}</div>
              {sekmeler.map(s => (
                <button key={s.kod}
                        onClick={() => setAktif(s.kod)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${aktif === s.kod ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-500" : "text-gray-700"}`}>
                  {s.ad}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="flex-1 p-6 max-w-screen-2xl">
          {aktif === "ozet" && <IstatistikDashboard />}
          {aktif === "sms" && <SMSKuyrugu />}
          {aktif === "bildirim" && <BildirimGonder />}

          {TABLO_KONFIG[aktif] && <AdminTablo key={aktif} konfig={TABLO_KONFIG[aktif]} />}

          {(aktif === "yorumlar" || aktif === "dogrulamalar" || aktif === "randevular" || aktif === "api") && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-3">Bu sekme mevcut admin panelinde detaylı yönetiliyor.</p>
              <Link href={`/admin?tab=${aktif}`} className="inline-block bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-semibold">
                Eski admin panelinde aç →
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
