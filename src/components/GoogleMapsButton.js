"use client";

export default function GoogleMapsButton({ enlem, boylam }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${enlem},${boylam}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        backgroundColor: "#0E7C7B",
        padding: "8px 12px",
        borderRadius: 8,
        color: "white",
        fontSize: "12px",
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: "0 4px 12px rgba(14, 124, 123, 0.25)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        transition: "all 0.3s"
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
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
      </svg>
      <span>Google Haritalar</span>
    </a>
  );
}
