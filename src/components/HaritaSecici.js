"use client";
import { useEffect, useState, useRef } from "react";

export default function HaritaSecici({ mevcutEnlem, mevcutBoylam, onChange }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const instanceRef = useRef(null);
  const [konum, setKonum] = useState({
    enlem: parseFloat(mevcutEnlem) || 41.0082,
    boylam: parseFloat(mevcutBoylam) || 28.9784,
  });
  const [yuklendi, setYuklendi] = useState(false);
  const [aramaMetni, setAramaMetni] = useState("");
  const [araniyor, setAraniyor] = useState(false);
  const [sonuclar, setSonuclar] = useState([]);

  useEffect(() => {
    if (instanceRef.current) return;

    import("leaflet").then((L) => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current).setView([konum.enlem, konum.boylam], 14);
      instanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const marker = L.marker([konum.enlem, konum.boylam], { draggable: true }).addTo(map);
      markerRef.current = marker;

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        const yeni = { enlem: parseFloat(pos.lat.toFixed(6)), boylam: parseFloat(pos.lng.toFixed(6)) };
        setKonum(yeni);
        onChange?.(yeni);
      });

      map.on("click", (e) => {
        const yeni = { enlem: parseFloat(e.latlng.lat.toFixed(6)), boylam: parseFloat(e.latlng.lng.toFixed(6)) };
        marker.setLatLng([yeni.enlem, yeni.boylam]);
        setKonum(yeni);
        onChange?.(yeni);
      });

      setYuklendi(true);

      const ro = new ResizeObserver(() => {
        if (mapRef.current?.offsetWidth > 0) map.invalidateSize();
      });
      if (mapRef.current) ro.observe(mapRef.current.parentElement || mapRef.current);
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, []);

  async function adresAra(e) {
    e.preventDefault();
    if (!aramaMetni.trim()) return;
    setAraniyor(true);
    setSonuclar([]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(aramaMetni)}&countrycodes=tr&limit=5`,
        { headers: { "Accept-Language": "tr" } }
      );
      const data = await res.json();
      setSonuclar(data);
    } catch {
      // sessiz hata
    } finally {
      setAraniyor(false);
    }
  }

  function sonucSec(s) {
    const yeni = { enlem: parseFloat(parseFloat(s.lat).toFixed(6)), boylam: parseFloat(parseFloat(s.lon).toFixed(6)) };
    setKonum(yeni);
    setSonuclar([]);
    setAramaMetni(s.display_name.split(",").slice(0, 2).join(","));
    onChange?.(yeni);
    if (instanceRef.current && markerRef.current) {
      instanceRef.current.setView([yeni.enlem, yeni.boylam], 16);
      markerRef.current.setLatLng([yeni.enlem, yeni.boylam]);
    }
  }

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />

      {/* Adres arama */}
      <form onSubmit={adresAra} className="flex gap-2 mb-2">
        <input
          type="text"
          value={aramaMetni}
          onChange={(e) => setAramaMetni(e.target.value)}
          placeholder="Adres veya klinik adı ara..."
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={araniyor}
          className="px-3 py-2 rounded-lg text-sm font-medium text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          {araniyor ? "..." : "Ara"}
        </button>
      </form>

      {/* Arama sonuçları */}
      {sonuclar.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-2 shadow-sm">
          {sonuclar.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sonucSec(s)}
              className="w-full text-left px-3 py-2 text-xs hover:bg-teal-50 border-b border-gray-100 last:border-0 text-gray-700"
            >
              {s.display_name}
            </button>
          ))}
        </div>
      )}

      {/* Harita */}
      <div
        ref={mapRef}
        style={{ height: 240, borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB" }}
      />
      {!yuklendi && (
        <div style={{ height: 240, borderRadius: 12, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
          className="flex items-center justify-center text-sm text-gray-400">
          Harita yükleniyor...
        </div>
      )}

      {/* Hidden inputs for form submission */}
      <div className="flex gap-3 mt-2">
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1">Enlem</label>
          <input readOnly value={konum.enlem} name="enlem"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-gray-50 text-gray-600" />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1">Boylam</label>
          <input readOnly value={konum.boylam} name="boylam"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-gray-50 text-gray-600" />
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1">Adres arayın veya haritaya tıklayın / işaretçiyi sürükleyin.</p>
    </div>
  );
}
