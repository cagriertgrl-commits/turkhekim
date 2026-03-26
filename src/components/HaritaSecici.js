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

      const map = L.map(mapRef.current).setView([konum.enlem, konum.boylam], 15);
      instanceRef.current = map;

      // CartoDB Voyager - daha detaylı ve renkli harita
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastered/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '© OpenStreetMap contributors',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Attribution kontrolünü kapat (Haritada Aç link'ini gizle)
      map.attributionControl.setPrefix(false);

      // Custom marker icon - daha belirgin
      const markerIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:32px;height:32px;background:linear-gradient(135deg, #0E7C7B 0%, #06B6D4 100%);border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([konum.enlem, konum.boylam], { draggable: true, icon: markerIcon }).addTo(map);
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

      {/* Arama */}
      <form onSubmit={adresAra} className="mb-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={aramaMetni}
            onChange={(e) => setAramaMetni(e.target.value)}
            placeholder="Adres ara..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={araniyor}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
          >
            {araniyor ? "..." : "Ara"}
          </button>
        </div>

        {/* Arama sonuçları */}
        {sonuclar.length > 0 && (
          <div className="border border-gray-200 rounded-lg mt-2 overflow-hidden shadow-sm">
            {sonuclar.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sonucSec(s)}
                className="w-full text-left px-3 py-2 text-xs hover:bg-teal-50 border-b border-gray-100 last:border-0 text-gray-700"
              >
                {s.display_name.split(",")[0]}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Harita */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <div
          ref={mapRef}
          style={{ height: 300, borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB" }}
        />

        {/* Google Haritalar butonu */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${konum.enlem},${konum.boylam}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 1000,
            backgroundColor: "#0E7C7B",
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            boxShadow: "0 4px 12px rgba(14, 124, 123, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "13px",
            fontWeight: 600,
            color: "white",
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#06B6D4";
            e.target.style.boxShadow = "0 6px 16px rgba(14, 124, 123, 0.35)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#0E7C7B";
            e.target.style.boxShadow = "0 4px 12px rgba(14, 124, 123, 0.25)";
            e.target.style.transform = "translateY(0)";
          }}
          title="Google Haritalar'da aç"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
          </svg>
          <span>Google Haritalar</span>
        </a>
      </div>
      {!yuklendi && (
        <div style={{ height: 300, borderRadius: 12, border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB" }}
          className="flex items-center justify-center text-sm text-gray-400 mb-3">
          Harita yükleniyor...
        </div>
      )}

      {/* Hidden inputs for form submission */}
      <input type="hidden" name="enlem" value={konum.enlem} />
      <input type="hidden" name="boylam" value={konum.boylam} />

      <p className="text-xs text-gray-500">💡 Haritaya tıkla veya işaretçiyi sürükle</p>
    </div>
  );
}
