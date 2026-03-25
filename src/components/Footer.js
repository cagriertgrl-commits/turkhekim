import Link from "next/link";

const LINKLER = {
  "Platform": [
    { href: "/istanbul/kbb-uzmani", ad: "Doktor Bul" },
    { href: "/tedaviler", ad: "Tedaviler" },
    { href: "/hastaliklar", ad: "Hastalıklar" },
    { href: "/hasta-formlari", ad: "Hasta Formları" },
    { href: "/saglik", ad: "Sağlık Rehberi" },
    { href: "/medikal-turizm", ad: "Medikal Turizm" },
    { href: "/sss", ad: "Sıkça Sorulan Sorular" },
  ],
  "Doktorlar İçin": [
    { href: "/kayit-ol", ad: "Ücretsiz Kayıt Ol" },
    { href: "/giris", ad: "Doktor Girişi" },
    { href: "/paketler", ad: "Paketler & Fiyatlar" },
    { href: "/panel", ad: "Doktor Paneli" },
  ],
  "Şirket": [
    { href: "/hakkimizda", ad: "Hakkımızda" },
    { href: "/gizlilik", ad: "Gizlilik Politikası" },
    { href: "/kullanim-kosullari", ad: "Kullanım Koşulları" },
    { href: "mailto:info@doktorpusula.com", ad: "İletişim" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0D2137" }} className="mt-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & açıklama */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="#0E7C7B"/>
                <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="0.6" opacity="0.35"/>
                <line x1="16" y1="2.5" x2="16" y2="5.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                <line x1="16" y1="26.5" x2="16" y2="29.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                <line x1="2.5" y1="16" x2="5.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                <line x1="26.5" y1="16" x2="29.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
                <polygon points="16,4.5 14,15 18,15" fill="#C9A84C"/>
                <polygon points="16,27.5 18,17 14,17" fill="white" opacity="0.5"/>
                <polygon points="4.5,16 15,14 15,18" fill="white" opacity="0.3"/>
                <polygon points="27.5,16 17,18 17,14" fill="white" opacity="0.3"/>
                <circle cx="16" cy="16" r="2" fill="white"/>
                <circle cx="16" cy="16" r="0.8" fill="#C9A84C"/>
              </svg>
              <span className="text-white font-bold text-lg">
                Doktor<span style={{ color: "#C9A84C" }}>Pusula</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Türkiye'nin bağımsız, şeffaf sağlık platformu. Doğrulanmış yorumlar ve kolay randevu.
            </p>
            <div className="flex gap-3">
              <a href="mailto:info@doktorpusula.com" style={{ color: "#4DD9D8" }} className="text-xs hover:underline">
                info@doktorpusula.com
              </a>
            </div>
          </div>

          {/* Link grupları */}
          {Object.entries(LINKLER).map(([baslik, linkler]) => (
            <div key={baslik}>
              <h3 className="text-gray-300 font-semibold text-xs uppercase tracking-wider mb-4">{baslik}</h3>
              <ul className="space-y-2.5">
                {linkler.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                      {link.ad}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt çizgi */}
        <div style={{ borderColor: "#ffffff10" }} className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} DoktorPusula. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>🇹🇷 Türkiye</span>
            <span>•</span>
            <Link href="/en" className="hover:text-gray-400 transition-colors">English</Link>
            <Link href="/ar" className="hover:text-gray-400 transition-colors">العربية</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
