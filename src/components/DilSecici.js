"use client";
import { useState, useEffect } from "react";
import { DILLER_LIST } from "@/lib/dilCeviriler";

export default function DilSecici() {
  const [aktif, setAktif] = useState("tr");

  useEffect(() => {
    const p = window.location.pathname;
    if (p === "/en" || p.startsWith("/en/")) setAktif("en");
    else if (p === "/ru" || p.startsWith("/ru/")) setAktif("ru");
    else if (p === "/ar" || p.startsWith("/ar/")) setAktif("ar");
    else if (p === "/fa" || p.startsWith("/fa/")) setAktif("fa");
    else setAktif("tr");
  }, []);

  return (
    <div className="flex items-center gap-1">
      {DILLER_LIST.map((dil) => (
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
