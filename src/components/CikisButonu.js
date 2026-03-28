"use client";

export default function CikisButonu() {
  return (
    <button
      onClick={async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } catch {
          /* sessiz */
        }
        window.location.href = "/giris";
      }}
      className="text-gray-400 hover:text-white text-sm cursor-pointer bg-transparent border-0"
    >
      Çıkış
    </button>
  );
}
