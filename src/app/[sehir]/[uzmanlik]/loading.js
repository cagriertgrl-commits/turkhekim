import Navbar from "@/components/Navbar";
import SkeletonKart from "@/components/SkeletonKart";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0D2137", minHeight: "100vh" }} className="px-6 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Başlık skeleton */}
          <div className="mb-8 animate-pulse">
            <div style={{ backgroundColor: "#ffffff15" }} className="h-8 rounded-full w-64 mb-3" />
            <div style={{ backgroundColor: "#ffffff10" }} className="h-4 rounded-full w-48" />
          </div>

          {/* Filtre çubuğu skeleton */}
          <div className="flex gap-3 mb-8 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ backgroundColor: "#ffffff10" }} className="h-9 w-24 rounded-full" />
            ))}
          </div>

          {/* Kart grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <SkeletonKart key={i} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
