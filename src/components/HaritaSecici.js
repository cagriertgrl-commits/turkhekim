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

  useEffect(() => {
    if (instanceRef.current) return;

    import("leaflet").then((L) => {
      // Fix default icon paths
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

      // details açıldığında haritayı yeniden boyutlandır
      const ro = new ResizeObserver(() => {
        if (mapRef.current?.offsetWidth > 0) {
          map.invalidateSize();
        }
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

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
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
      <div className="flex gap-3 mt-2">
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1">Enlem</label>
          <input
            readOnly
            value={konum.enlem}
            name="enlem"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-gray-50 text-gray-600"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1">Boylam</label>
          <input
            readOnly
            value={konum.boylam}
            name="boylam"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-gray-50 text-gray-600"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1">Haritaya tıklayın veya işaretçiyi sürükleyin.</p>
    </div>
  );
}
