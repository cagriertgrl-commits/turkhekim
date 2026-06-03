"use client";
import { useEffect, useState } from "react";

export default function IstatistikDashboard() {
  const [istatistik, setIstatistik] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    fetch("/api/admin/istatistik")
      .then(r => r.ok ? r.json() : null)
      .then(setIstatistik)
      .catch(() => {})
      .finally(() => setYukleniyor(false));
  }, []);

  if (yukleniyor) return <div className="text-gray-400">Yükleniyor…</div>;
  if (!istatistik) return <div className="text-red-600">İstatistik yüklenemedi.</div>;

  const i = istatistik;
  const onayBekleyenToplam = (i.doktor?.onayBekleyen || 0) + (i.tercuman?.onayBekleyen || 0) + (i.avukat?.onayBekleyen || 0) + (i.firma?.onayBekleyen || 0) + (i.klinik?.onayBekleyen || 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Yönetim Özeti</h1>
      <p className="text-sm text-gray-500 mb-6">Tüm modüllerin anlık durumu.</p>

      {onayBekleyenToplam > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <div className="text-2xl">⏳</div>
          <div className="flex-1">
            <div className="font-semibold text-amber-900">{onayBekleyenToplam} kullanıcı onayınızı bekliyor</div>
            <div className="text-xs text-amber-700">
              {i.doktor?.onayBekleyen ? `${i.doktor.onayBekleyen} doktor · ` : ""}
              {i.tercuman?.onayBekleyen ? `${i.tercuman.onayBekleyen} tercüman · ` : ""}
              {i.avukat?.onayBekleyen ? `${i.avukat.onayBekleyen} avukat · ` : ""}
              {i.firma?.onayBekleyen ? `${i.firma.onayBekleyen} firma · ` : ""}
              {i.klinik?.onayBekleyen ? `${i.klinik.onayBekleyen} klinik` : ""}
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xs font-bold uppercase text-gray-500 mt-2 mb-2">Kullanıcılar</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <K ad="Doktor" ana={i.doktor?.toplam} alt={`${i.doktor?.onayBekleyen || 0} onay bekleyen`} ikon="👨‍⚕️" renk="blue" />
        <K ad="Hasta" ana={i.hasta?.toplam} alt="kayıtlı" ikon="🧑" renk="cyan" />
        <K ad="Tercüman" ana={i.tercuman?.toplam} alt={`${i.tercuman?.onayBekleyen || 0} bekleyen`} ikon="🌐" renk="teal" />
        <K ad="Avukat" ana={i.avukat?.toplam} alt={`${i.avukat?.onayBekleyen || 0} bekleyen`} ikon="⚖️" renk="indigo" />
        <K ad="Firma" ana={i.firma?.toplam} alt={`${i.firma?.onayBekleyen || 0} bekleyen`} ikon="🏢" renk="purple" />
      </div>

      <h2 className="text-xs font-bold uppercase text-gray-500 mt-2 mb-2">Operasyon</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <K ad="Randevu" ana={i.randevu?.toplam} alt={`bugün ${i.randevu?.bugun || 0}`} ikon="📅" renk="green" />
        <K ad="Yorum" ana={i.yorum?.toplam} alt={`${i.yorum?.moderasyonBekleyen || 0} moderasyon`} ikon="💬" renk="amber" />
        <K ad="Klinik" ana={i.klinik?.toplam} alt={`${i.klinik?.onayBekleyen || 0} bekleyen`} ikon="🏥" renk="rose" />
        <K ad="SMS Kuyruğu" ana={i.sms?.toplam} alt={`${i.sms?.bekleyen || 0} gönderim bekliyor`} ikon="📱" renk="emerald" />
      </div>

      <h2 className="text-xs font-bold uppercase text-gray-500 mt-2 mb-2">Pazaryeri & Hukuk</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <K ad="Aktif İlan" ana={i.pazaryeri?.aktifIlan} alt="pazaryeri" ikon="🏷️" renk="orange" />
        <K ad="Açık RFQ" ana={i.pazaryeri?.acikRfq} alt="doktor talebi" ikon="📋" renk="yellow" />
        <K ad="Hukuki Talep" ana={i.hukuk?.acikTalep} alt="açık" ikon="⚖️" renk="indigo" />
        <K ad="Hukuk Makale" ana={i.hukuk?.yayindaMakale} alt="yayında" ikon="📰" renk="slate" />
      </div>

      <h2 className="text-xs font-bold uppercase text-gray-500 mt-2 mb-2">Finansal & Sistem (son 30 gün)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <K ad="Gelir" ana={`₺${Number(i.gelir30g?.tutar || 0).toLocaleString("tr-TR")}`} alt={`${i.gelir30g?.sayi || 0} ödeme`} ikon="💰" renk="green" />
        <K ad="AI Token" ana={Number(i.apiKullanim30g?.token || 0).toLocaleString("tr-TR")} alt={`${i.apiKullanim30g?.cagri || 0} çağrı`} ikon="🤖" renk="violet" />
        <K ad="Hata Logu" ana={i.hata?.son7Gun} alt="son 7 gün" ikon="🐛" renk="red" />
        <K ad="Bülten" ana={i.hukuk?.bulten} alt="abone" ikon="📩" renk="blue" />
      </div>
    </div>
  );
}

function K({ ad, ana, alt, ikon, renk = "gray" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-gray-500">{ad}</div>
        <div className="text-lg">{ikon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{ana ?? "—"}</div>
      <div className="text-[11px] text-gray-400 mt-0.5">{alt}</div>
    </div>
  );
}
