"use client";

import { useState } from "react";

const SAATLER = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

function gelecekGunler(adet = 14) {
  const gunler = [];
  const bugun = new Date();
  const gunAdlari = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const ayAdlari = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

  for (let i = 1; i <= adet; i++) {
    const tarih = new Date(bugun);
    tarih.setDate(bugun.getDate() + i);
    if (tarih.getDay() === 0) continue; // Pazar gün kapalı (opsiyonel)
    gunler.push({
      tarih,
      gunAdi: gunAdlari[tarih.getDay()],
      gun: tarih.getDate(),
      ay: ayAdlari[tarih.getMonth()],
      deger: tarih.toISOString().split("T")[0],
    });
  }
  return gunler;
}

export default function RandevuFormu({ doktorId, doktorAd, onlineRandevu }) {
  const [adim, setAdim] = useState(1); // 1=tarih, 2=form
  const [tip, setTip] = useState("yuzyuze");
  const [seciliTarih, setSeciliTarih] = useState(null);
  const [seciliSaat, setSeciliSaat] = useState(null);
  const [form, setForm] = useState({ hasta_adi: "", telefon: "", sikayet: "" });
  const [durum, setDurum] = useState(null);
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const gunler = gelecekGunler(14);
  const guncelle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const gonder = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    setDurum(null);

    const res = await fetch("/api/randevu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        doktor_id: doktorId,
        tip,
        tarih: seciliTarih,
        saat: seciliSaat,
      }),
    });

    const data = await res.json();
    setYukleniyor(false);

    if (res.ok) {
      setDurum("basari");
      setMesaj(data.mesaj);
      setForm({ hasta_adi: "", telefon: "", sikayet: "" });
    } else {
      setDurum("hata");
      setMesaj(data.hata);
    }
  };

  if (durum === "basari") {
    return (
      <div id="randevu" className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <div className="text-4xl mb-3">{tip === "online" ? "💻" : "📅"}</div>
        <h3 className="font-bold text-gray-900 mb-2">Talebiniz Alındı!</h3>
        <p className="text-gray-500 text-sm mb-3">{mesaj}</p>
        {seciliTarih && (
          <div style={{ backgroundColor: "#E8F5F5", borderColor: "#0E7C7B" }} className="border rounded-xl p-3 mb-3">
            <p className="text-sm font-semibold" style={{ color: "#0E7C7B" }}>
              📅 {new Date(seciliTarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" })}
              {seciliSaat && ` — ⏰ ${seciliSaat}`}
            </p>
          </div>
        )}
        <div style={{ backgroundColor: "#D1FAE5", borderColor: "#059669" }} className="border rounded-xl p-3">
          <p style={{ color: "#059669" }} className="text-xs font-medium">✓ {doktorAd} en kısa sürede sizi arayacak</p>
        </div>
        <button onClick={() => { setDurum(null); setAdim(1); setSeciliTarih(null); setSeciliSaat(null); }} className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline">
          Yeni talep oluştur
        </button>
      </div>
    );
  }

  return (
    <div id="randevu" className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-1">Randevu Al</h3>

      {/* Tip seçimi */}
      {onlineRandevu && (
        <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ backgroundColor: "#F5F7FA" }}>
          <button type="button" onClick={() => setTip("yuzyuze")}
            className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
            style={tip === "yuzyuze" ? { backgroundColor: "#0D2137", color: "white" } : { color: "#6B7280" }}>
            🏥 Yüz Yüze
          </button>
          <button type="button" onClick={() => setTip("online")}
            className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
            style={tip === "online" ? { backgroundColor: "#0E7C7B", color: "white" } : { color: "#6B7280" }}>
            💻 Online
          </button>
        </div>
      )}

      {/* ADIM 1 — Tarih & Saat */}
      {adim === 1 && (
        <div>
          <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Tarih Seçin</p>

          {/* Gün scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
            {gunler.map((g) => {
              const aktif = seciliTarih === g.deger;
              return (
                <button
                  key={g.deger}
                  type="button"
                  onClick={() => { setSeciliTarih(g.deger); setSeciliSaat(null); }}
                  style={aktif ? { backgroundColor: "#0D2137", color: "white", borderColor: "#0D2137" } : { backgroundColor: "white", borderColor: "#E5E7EB", color: "#374151" }}
                  className="flex-shrink-0 w-14 border rounded-xl py-2.5 text-center transition-all hover:border-teal-400"
                >
                  <div className="text-xs font-medium mb-0.5">{g.gunAdi}</div>
                  <div className="text-base font-bold leading-tight">{g.gun}</div>
                  <div className="text-xs opacity-70">{g.ay}</div>
                </button>
              );
            })}
          </div>

          {/* Saat dilimleri */}
          {seciliTarih && (
            <>
              <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wide">Saat Seçin</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {SAATLER.map((saat) => {
                  const aktif = seciliSaat === saat;
                  return (
                    <button
                      key={saat}
                      type="button"
                      onClick={() => setSeciliSaat(saat)}
                      style={aktif ? { backgroundColor: "#0E7C7B", color: "white", borderColor: "#0E7C7B" } : { backgroundColor: "white", borderColor: "#E5E7EB", color: "#374151" }}
                      className="border rounded-lg py-2 text-xs font-medium transition-all hover:border-teal-400"
                    >
                      {saat}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => setAdim(2)}
            disabled={!seciliTarih}
            style={{ backgroundColor: seciliTarih ? "#0D2137" : "#9CA3AF" }}
            className="w-full text-white py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {seciliTarih
              ? `Devam Et${seciliSaat ? ` — ${seciliSaat}` : ""} →`
              : "Tarih Seçin"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-2">Saat seçimi opsiyonel — doktor geri arayarak netleştirir</p>
        </div>
      )}

      {/* ADIM 2 — İletişim Bilgileri */}
      {adim === 2 && (
        <div>
          {/* Seçilen tarih özeti */}
          <div style={{ backgroundColor: "#E8F5F5", borderColor: "#0E7C7B" }} className="border rounded-xl p-3 mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Seçilen Tarih</p>
              <p className="text-sm font-semibold" style={{ color: "#0D2137" }}>
                📅 {new Date(seciliTarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" })}
                {seciliSaat && <span style={{ color: "#0E7C7B" }}> ⏰ {seciliSaat}</span>}
              </p>
            </div>
            <button type="button" onClick={() => setAdim(1)} className="text-xs text-gray-400 hover:text-gray-600 underline flex-shrink-0">
              Değiştir
            </button>
          </div>

          <form onSubmit={gonder} className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Adınız Soyadınız <span className="text-red-500">*</span></label>
              <input name="hasta_adi" value={form.hasta_adi} onChange={guncelle} placeholder="Ad Soyad" required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Telefon <span className="text-red-500">*</span></label>
              <input name="telefon" value={form.telefon} onChange={guncelle} placeholder="0532 xxx xx xx" required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Şikayet / Not (opsiyonel)</label>
              <textarea name="sikayet" value={form.sikayet} onChange={guncelle} placeholder="Kısaca belirtin..." rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 resize-none" />
            </div>

            {durum === "hata" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-xs">{mesaj}</p>
              </div>
            )}

            <button type="submit" disabled={yukleniyor}
              style={{ backgroundColor: tip === "online" ? "#0E7C7B" : "#0D2137" }}
              className="w-full text-white py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
              {yukleniyor ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
            </button>
            <p className="text-xs text-gray-400 text-center">📞 Doktor sizi arayarak randevuyu onaylayacak</p>
          </form>
        </div>
      )}
    </div>
  );
}
