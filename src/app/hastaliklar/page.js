import Link from "next/link";
import Navbar from "@/components/Navbar";
import { HASTALIKLAR } from "@/lib/hastaliklar";

export const metadata = {
  title: "Hastalıklar Rehberi — Belirtiler ve Tedavi | DoktorPusula",
  description:
    "Sinüzit, migren, diyabet, bel fıtığı ve daha fazlası. Hastalık belirtilerini öğrenin, uzman doktorlara ulaşın.",
  alternates: { canonical: "https://doktorpusula.com/hastaliklar" },
  openGraph: {
    title: "Hastalıklar Rehberi | DoktorPusula",
    description: "30+ hastalık için belirtiler, tedavi yöntemleri ve uzman doktor bilgileri.",
    url: "https://doktorpusula.com/hastaliklar",
  },
};

function grupla(liste) {
  return liste.reduce((acc, h) => {
    if (!acc[h.kategori]) acc[h.kategori] = [];
    acc[h.kategori].push(h);
    return acc;
  }, {});
}

export default function HastalıklarPage() {
  const gruplar = grupla(HASTALIKLAR);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#0D2137" }} className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#0E7C7B22", color: "#4DD9D8" }}
            >
              Sağlık Rehberi
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Hastalıklar <span style={{ color: "#C9A84C" }}>Rehberi</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Belirtilerden tedaviye — merak ettiğiniz hastalıkları keşfedin ve uzman doktorlara kolayca ulaşın.
            </p>
          </div>
        </section>

        {/* İçerik */}
        <section className="py-14 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-14">
            {Object.entries(gruplar).map(([kategori, hastaliklar]) => (
              <div key={kategori}>
                {/* Kategori başlığı */}
                <div className="flex items-center gap-3 mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "#0D2137" }}
                  >
                    {kategori}
                  </h2>
                  <div
                    className="flex-1 h-px"
                    style={{ backgroundColor: "#0E7C7B33" }}
                  />
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#0E7C7B15", color: "#0E7C7B" }}
                  >
                    {hastaliklar.length} hastalık
                  </span>
                </div>

                {/* Kartlar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {hastaliklar.map((h) => (
                    <Link
                      key={h.slug}
                      href={`/hastaliklar/${h.slug}`}
                      className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      {/* İkon + Ad */}
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl leading-none">{h.ikon}</span>
                        <div>
                          <h3
                            className="font-bold text-base leading-snug group-hover:text-teal-600 transition-colors"
                            style={{ color: "#0D2137" }}
                          >
                            {h.ad}
                          </h3>
                          <span
                            className="inline-block text-xs font-medium mt-1 px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "#C9A84C18", color: "#9A7530" }}
                          >
                            {h.uzmanlik}
                          </span>
                        </div>
                      </div>

                      {/* Kısa açıklama */}
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {h.aciklama}
                      </p>

                      {/* Belirtiler özet */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {h.belirtiler.slice(0, 2).map((b) => (
                          <span
                            key={b}
                            className="text-xs px-2 py-0.5 rounded-full border"
                            style={{ borderColor: "#0E7C7B33", color: "#0E7C7B" }}
                          >
                            {b}
                          </span>
                        ))}
                        {h.belirtiler.length > 2 && (
                          <span className="text-xs text-gray-400 self-center">
                            +{h.belirtiler.length - 2} daha
                          </span>
                        )}
                      </div>

                      {/* Devamı oku */}
                      <div
                        className="mt-4 text-xs font-semibold flex items-center gap-1 transition-colors"
                        style={{ color: "#0E7C7B" }}
                      >
                        Detaylı bilgi
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#0D2137" }} className="py-14 px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Doğru Uzmana Ulaşmaya Hazır mısınız?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Türkiye'nin dört bir yanında binlerce uzman doktorla randevu alın.
          </p>
          <Link
            href="/istanbul/kbb-uzmani"
            className="inline-block font-semibold px-8 py-3 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0E7C7B" }}
          >
            Doktor Bul
          </Link>
        </section>
      </main>
    </>
  );
}
