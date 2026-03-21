"use client";
import { useState } from "react";

const HAZIR_HIZMETLER = [
  // Genel
  "Genel Muayene", "Check-up", "Kan Tahlili Yorumu", "Online Konsültasyon",
  // Estetik
  "Botoks", "Yüz Dolgusu", "Rinoplasti", "Göğüs Estetiği", "Liposuction",
  "Göz Kapağı Estetiği", "Yüz Germe", "Karın Germe", "Saç Ekimi",
  // Dermatoloji
  "Lazer Epilasyon", "PRP Tedavisi", "Akne Tedavisi", "Leke Tedavisi",
  "Dermatolojik Lazer", "Cilt Bakımı", "Siğil Tedavisi",
  // Diş
  "Diş İmplantı", "Diş Beyazlatma", "Ortodonti", "Zirkonyum Kaplama",
  "Diş Dolgusu", "Kanal Tedavisi", "Diş Çekimi", "Protez",
  // Göz
  "LASIK", "Katarakt Ameliyatı", "Göz Muayenesi", "Gözlük Reçetesi",
  // Ortopedi
  "Diz Protezi", "Kalça Protezi", "Spor Yaralanmaları", "PRP Enjeksiyonu",
  "Omurga Tedavisi", "Artroskopi",
  // Kardiyoloji
  "EKG", "Ekokardiyografi", "Efor Testi", "Holter", "Anjiyografi",
  // Psikiyatri
  "Bireysel Terapi", "Çift Terapisi", "EMDR", "Psikiyatrik Değerlendirme",
  "İlaç Tedavisi Yönetimi",
  // KBB
  "İşitme Testi", "Burun Ameliyatı", "Bademcik Ameliyatı", "Sinüs Tedavisi",
  // Çocuk
  "Aşılama", "Büyüme Takibi", "Pediatrik Muayene",
];

export default function HizmetSecici({ mevcutHizmetler = "" }) {
  const baslangic = mevcutHizmetler
    ? mevcutHizmetler.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];
  const [secili, setSecili] = useState(baslangic);
  const [arama, setArama] = useState("");

  function toggle(hizmet) {
    setSecili((prev) =>
      prev.includes(hizmet) ? prev.filter((h) => h !== hizmet) : [...prev, hizmet]
    );
  }

  function ozelEkle() {
    const temiz = arama.trim();
    if (temiz && !secili.includes(temiz)) {
      setSecili((prev) => [...prev, temiz]);
    }
    setArama("");
  }

  const filtrelenmis = HAZIR_HIZMETLER.filter((h) =>
    !secili.includes(h) && h.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div>
      <label className="text-xs text-gray-500 block mb-2">Hizmetler / İşlemler</label>

      {/* Seçili hizmetler */}
      {secili.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
          {secili.map((h) => (
            <span
              key={h}
              style={{ backgroundColor: "#0E7C7B", color: "white" }}
              className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
            >
              {h}
              <button type="button" onClick={() => toggle(h)} className="ml-1 hover:opacity-70">×</button>
            </span>
          ))}
        </div>
      )}

      {/* Arama + özel ekleme */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (filtrelenmis.length === 1) toggle(filtrelenmis[0]);
              else if (filtrelenmis.length === 0) ozelEkle();
            }
          }}
          placeholder="Hizmet ara veya ekle... (ör: botoks)"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400"
        />
        {arama && filtrelenmis.length === 0 && (
          <button
            type="button"
            onClick={ozelEkle}
            style={{ backgroundColor: "#0D2137" }}
            className="text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 whitespace-nowrap"
          >
            + Ekle
          </button>
        )}
      </div>

      {/* Filtrelenmiş liste */}
      <div className="flex flex-wrap gap-1.5 p-3 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
        {filtrelenmis.length > 0 ? filtrelenmis.map((hizmet) => (
          <button
            key={hizmet}
            type="button"
            onClick={() => toggle(hizmet)}
            className="text-xs px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors"
          >
            + {hizmet}
          </button>
        )) : (
          <p className="text-xs text-gray-400 w-full text-center py-2">
            {arama ? `"${arama}" listede yok — + Ekle butonuyla özel ekleyebilirsiniz` : "Tüm hizmetler seçildi"}
          </p>
        )}
      </div>

      <input type="hidden" name="hizmetler" value={secili.join("\n")} />
      {secili.length > 0 && (
        <p className="text-xs text-teal-600 mt-1">{secili.length} hizmet seçildi</p>
      )}
    </div>
  );
}
