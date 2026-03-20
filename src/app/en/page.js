import Link from "next/link";

export const metadata = {
  title: "DoktorPusula — Find the Best Doctors in Turkey",
  description: "Find verified doctors in Turkey. Book appointments online, read real patient reviews. Medical tourism support. DoktorPusula.",
  alternates: {
    canonical: "https://doktorpusula.com/en",
    languages: { tr: "https://doktorpusula.com", en: "https://doktorpusula.com/en" },
  },
};

const TREATMENTS = [
  { icon: "👃", name: "Rhinoplasty", price: "$2,000 – $5,000" },
  { icon: "🦷", name: "Dental Treatment", price: "$500 – $3,000" },
  { icon: "💆", name: "Hair Transplant", price: "$1,500 – $3,500" },
  { icon: "👁️", name: "Eye Surgery (LASIK)", price: "$1,000 – $2,500" },
  { icon: "✨", name: "Aesthetic Surgery", price: "$2,000 – $6,000" },
  { icon: "🦴", name: "Orthopedics", price: "$3,000 – $8,000" },
];

const WHY = [
  { icon: "💰", title: "70% Lower Costs", desc: "Same quality procedures at a fraction of European/US prices" },
  { icon: "🏆", title: "World-Class Doctors", desc: "JCI-accredited hospitals with internationally trained specialists" },
  { icon: "✈️", title: "Full Support", desc: "Transfer, accommodation, and interpreter assistance included" },
  { icon: "⭐", title: "Verified Reviews", desc: "All reviews are authenticated by real patients" },
];

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/en" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
              <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
              <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            </svg>
            <span className="text-white font-bold text-xl tracking-tight">
              Doktor<span style={{ color: "#C9A84C" }}>Pusula</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white text-xs transition-colors">🇹🇷 Türkçe</a>
            <a href="/ar" className="text-gray-400 hover:text-white text-xs transition-colors">🇸🇦 العربية</a>
            <a href="/fa" className="text-gray-400 hover:text-white text-xs transition-colors">🇮🇷 فارسی</a>
            <a href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
              Register Free
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-white bg-opacity-10 text-white text-xs px-4 py-2 rounded-full mb-6 font-medium">
            🇹🇷 Medical Tourism in Turkey
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Find the Best Doctors<br />
            <span style={{ color: "#4DD9D8" }}>in Turkey</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            World-class healthcare at 70% lower cost. Verified doctors, real patient reviews, and online appointment booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Browse Doctors →
            </a>
            <a href="/medikal-turizm" className="inline-block text-white border border-white border-opacity-30 px-8 py-3.5 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all">
              Medical Tourism
            </a>
          </div>
        </div>
      </section>

      {/* WHY TURKEY */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#0D2137" }} className="text-2xl font-bold text-center mb-10">Why Choose Turkey?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WHY.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR TREATMENTS */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: "#0D2137" }} className="text-2xl font-bold text-center mb-2">Popular Treatments</h2>
          <p className="text-gray-400 text-sm text-center mb-10">Estimated costs in US dollars — final prices depend on the doctor</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {TREATMENTS.map((t) => (
              <a key={t.name} href="/" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all flex items-center gap-4">
                <span className="text-3xl">{t.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{t.name}</h3>
                  <p style={{ color: "#0E7C7B" }} className="text-xs font-semibold mt-0.5">{t.price}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/tedaviler" style={{ backgroundColor: "#0D2137" }} className="inline-block text-white px-8 py-3 rounded-xl font-semibold text-sm hover:opacity-90">
              View All Treatments →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-white text-2xl font-bold mb-4">Ready to Find Your Doctor?</h2>
          <p className="text-gray-300 mb-8">Browse verified specialists across Turkey and book your appointment today.</p>
          <a href="/" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            Find a Doctor →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <span>© 2026 DoktorPusula. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/gizlilik" className="hover:text-gray-600">Privacy</a>
            <a href="/kullanim-kosullari" className="hover:text-gray-600">Terms</a>
            <a href="/hakkimizda" className="hover:text-gray-600">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
