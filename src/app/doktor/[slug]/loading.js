import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0D2137", minHeight: "100vh" }} className="px-6 py-12 animate-pulse">
        <div className="max-w-4xl mx-auto">

          {/* Profil kartı */}
          <div style={{ backgroundColor: "#0a1c2e", borderColor: "#ffffff10" }} className="border rounded-2xl p-8 mb-6 flex gap-6 items-start">
            {/* Avatar */}
            <div style={{ backgroundColor: "#0E7C7B30" }} className="w-28 h-28 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div style={{ backgroundColor: "#ffffff15" }} className="h-7 rounded-full w-56" />
              <div style={{ backgroundColor: "#0E7C7B20" }} className="h-5 rounded-full w-40" />
              <div className="flex gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ backgroundColor: "#C9A84C30" }} className="w-5 h-5 rounded" />
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <div style={{ backgroundColor: "#0E7C7B25" }} className="h-10 w-36 rounded-xl" />
                <div style={{ backgroundColor: "#ffffff10" }} className="h-10 w-28 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Hakkında */}
          <div style={{ backgroundColor: "#0a1c2e", borderColor: "#ffffff10" }} className="border rounded-2xl p-6 mb-6 space-y-3">
            <div style={{ backgroundColor: "#ffffff15" }} className="h-5 rounded-full w-32 mb-4" />
            <div style={{ backgroundColor: "#ffffff08" }} className="h-3 rounded-full w-full" />
            <div style={{ backgroundColor: "#ffffff08" }} className="h-3 rounded-full w-5/6" />
            <div style={{ backgroundColor: "#ffffff08" }} className="h-3 rounded-full w-4/6" />
          </div>

          {/* Yorumlar */}
          <div style={{ backgroundColor: "#0a1c2e", borderColor: "#ffffff10" }} className="border rounded-2xl p-6 space-y-4">
            <div style={{ backgroundColor: "#ffffff15" }} className="h-5 rounded-full w-24 mb-4" />
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ borderColor: "#ffffff08" }} className="border-b pb-4 space-y-2">
                <div className="flex gap-2">
                  <div style={{ backgroundColor: "#0E7C7B20" }} className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div style={{ backgroundColor: "#ffffff12" }} className="h-3 rounded-full w-32" />
                    <div style={{ backgroundColor: "#ffffff08" }} className="h-3 rounded-full w-full" />
                    <div style={{ backgroundColor: "#ffffff08" }} className="h-3 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
