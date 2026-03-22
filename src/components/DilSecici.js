"use client";

const DILLER = [
  { kod: "tr", etiket: "🇹🇷 TR", href: "/" },
  { kod: "en", etiket: "🇬🇧 EN", href: "/en" },
  { kod: "ar", etiket: "🇸🇦 AR", href: "/ar" },
  { kod: "fa", etiket: "🇮🇷 FA", href: "/fa" },
];

export default function DilSecici() {
  const aktif = typeof window !== "undefined"
    ? (window.location.pathname === "/" ? "tr"
      : window.location.pathname.startsWith("/en") ? "en"
      : window.location.pathname.startsWith("/ar") ? "ar"
      : window.location.pathname.startsWith("/fa") ? "fa"
      : "tr")
    : "tr";

  return (
    <div className="flex items-center gap-1">
      {DILLER.map((dil) => (
        <a
          key={dil.kod}
          href={dil.href}
          className="text-xs px-2 py-1 rounded-md transition-all"
          style={
            aktif === dil.kod
              ? { backgroundColor: "#0E7C7B", color: "white" }
              : { color: "#9CA3AF" }
          }
        >
          {dil.etiket}
        </a>
      ))}
    </div>
  );
}
