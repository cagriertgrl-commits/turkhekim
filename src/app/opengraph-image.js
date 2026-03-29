import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DoktorPusula — Türkiye'nin Sağlık Otoritesi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D2137",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo kutusu */}
        <div
          style={{
            background: "#0E7C7B",
            width: 80,
            height: 80,
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <span style={{ color: "white", fontSize: 36, fontWeight: 800 }}>TH</span>
        </div>

        {/* Başlık */}
        <div style={{ color: "white", fontSize: 64, fontWeight: 800, marginBottom: 16, textAlign: "center" }}>
          DoktorPusula
        </div>

        {/* Açıklama */}
        <div style={{ color: "#94A3B8", fontSize: 28, textAlign: "center", maxWidth: 800 }}>
          Türkiye&apos;nin Bağımsız Sağlık Platformu
        </div>

        {/* Alt çizgi */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 48,
          }}
        >
          {["✅ Doğrulanmış Yorumlar", "🌍 Çok Dilli", "🇹🇷 %100 Yerli"].map((item) => (
            <div
              key={item}
              style={{
                background: "#ffffff15",
                borderRadius: 12,
                padding: "10px 24px",
                color: "white",
                fontSize: 20,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
