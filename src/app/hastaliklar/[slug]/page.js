import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { HASTALIKLAR } from "@/lib/hastaliklar";

export async function generateStaticParams() {
  return HASTALIKLAR.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hastalik = HASTALIKLAR.find((h) => h.slug === slug);
  if (!hastalik) return {};

  return {
    title: `${hastalik.ad} nedir? Belirtileri ve tedavisi | DoktorPusula`,
    description: hastalik.aciklama,
    alternates: {
      canonical: `https://doktorpusula.com/hastaliklar/${hastalik.slug}`,
    },
    openGraph: {
      title: `${hastalik.ad} nedir? | DoktorPusula`,
      description: hastalik.aciklama,
      url: `https://doktorpusula.com/hastaliklar/${hastalik.slug}`,
    },
  };
}

export default async function HastalıkDetayPage({ params }) {
  const { slug } = await params;
  const hastalik = HASTALIKLAR.find((h) => h.slug === slug);

  if (!hastalik) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#0D2137" }} className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-300 transition-colors">Ana Sayfa</Link>
              <span>/</span>
              <Link href="/hastaliklar" className="hover:text-gray-300 transition-colors">Hastalıklar</Link>
              <span>/</span>
              <span style={{ color: "#4DD9D8" }}>{hastalik.ad}</span>
            </nav>

            {/* İkon + Başlık */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{hastalik.ikon}</span>
              <div>
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-2"
                  style={{ backgroundColor: "#0E7C7B22", color: "#4DD9D8" }}
                >
                  {hastalik.kategori}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                  {hastalik.ad}
                </h1>
              </div>
            </div>

            <p className="text-gray-400 text-base leading-relaxed">
              {hastalik.aciklama}
            </p>
          </div>
        </section>

        {/* İçerik kartları */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Nedir */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2
                className="text-lg font-bold mb-3 flex items-center gap-2"
                style={{ color: "#0D2137" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "#0E7C7B" }}
                >
                  1
                </span>
                {hastalik.ad} Nedir?
              </h2>
              <p className="text-gray-600 leading-relaxed">{hastalik.aciklama}</p>
            </div>

            {/* Belirtiler */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: "#0D2137" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "#0E7C7B" }}
                >
                  2
                </span>
                Belirtiler
              </h2>
              <ul className="space-y-2.5">
                {hastalik.belirtiler.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-gray-700">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "#0E7C7B" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tedavi */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: "#0D2137" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: "#C9A84C" }}
                >
                  3
                </span>
                Tedavi Yöntemleri
              </h2>
              <ul className="space-y-2.5">
                {hastalik.tedavi.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-gray-700">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "#C9A84C" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: "#0D2137" }}
            >
              <p className="text-white font-semibold text-lg mb-2">
                {hastalik.uzmanlik} Arıyorsunuz?
              </p>
              <p className="text-gray-400 text-sm mb-5">
                Doğrulanmış {hastalik.uzmanlik.toLowerCase()} listesine göz atın, randevu alın.
              </p>
              <Link
                href={`/istanbul/${hastalik.uzmanlikSlug}`}
                className="inline-block font-semibold px-8 py-3 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0E7C7B" }}
              >
                Uzman Doktor Bul
              </Link>
            </div>

          </div>
        </section>

        {/* Diğer hastalıklar */}
        <section className="py-10 px-6 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-4">
              <Link href="/hastaliklar" className="font-semibold hover:underline" style={{ color: "#0E7C7B" }}>
                ← Tüm Hastalıklara Dön
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
