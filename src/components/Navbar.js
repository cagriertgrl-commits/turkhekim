export default function Navbar({ aktifSayfa }) {
  const linkler = [
    { href: "/istanbul/kbb-uzmani", etiket: "Doktor Bul" },
    { href: "/saglik", etiket: "Sağlık Rehberi" },
    { href: "/medikal-turizm", etiket: "Medikal Turizm" },
  ];

  return (
    <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TH</span>
          </div>
          <span className="text-white font-bold text-xl">TurkHekim</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {linkler.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={aktifSayfa === link.etiket ? { color: "#0E7C7B" } : {}}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              {link.etiket}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Giriş Yap</a>
          <a href="#" style={{ backgroundColor: "#0E7C7B" }} className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Doktor Ol
          </a>
        </div>
      </div>
    </nav>
  );
}
