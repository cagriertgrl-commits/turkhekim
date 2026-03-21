"use client";

export default function CikisButonu() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/giris";
      }}
      className="text-gray-400 hover:text-white text-sm cursor-pointer bg-transparent border-0"
    >
      Çıkış
    </button>
  );
}
