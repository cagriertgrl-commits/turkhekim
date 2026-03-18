export default function SkeletonKart() {
  return (
    <div
      style={{ backgroundColor: "#0a1c2e", borderColor: "#ffffff10" }}
      className="border rounded-2xl p-5 animate-pulse"
    >
      {/* Üst: avatar + isim */}
      <div className="flex items-center gap-4 mb-4">
        <div style={{ backgroundColor: "#0E7C7B30" }} className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div style={{ backgroundColor: "#ffffff15" }} className="h-4 rounded-full w-3/4" />
          <div style={{ backgroundColor: "#ffffff10" }} className="h-3 rounded-full w-1/2" />
        </div>
      </div>

      {/* Yıldızlar */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ backgroundColor: "#C9A84C30" }} className="w-4 h-4 rounded-sm" />
        ))}
        <div style={{ backgroundColor: "#ffffff10" }} className="h-4 w-10 rounded-full ml-2" />
      </div>

      {/* Etiketler */}
      <div className="flex gap-2 mb-4">
        <div style={{ backgroundColor: "#0E7C7B20" }} className="h-6 w-20 rounded-full" />
        <div style={{ backgroundColor: "#ffffff10" }} className="h-6 w-16 rounded-full" />
      </div>

      {/* Buton */}
      <div style={{ backgroundColor: "#0E7C7B25" }} className="h-10 rounded-xl w-full" />
    </div>
  );
}
