import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "İletişim",
  description: "DoktorPusula ile iletişime geçin. Sorularınız, önerileriniz ve iş birliği talepleriniz için bize ulaşın.",
  alternates: { canonical: "https://doktorpusula.com/iletisim" },
};

const KANALLAR = [
  {
    baslik: "Genel Destek",
    aciklama: "Platformla ilgili sorularınız, öneri ve şikayetleriniz için",
    email: "destek@doktorpusula.com",
    ikonBg: "#F0FDFA",
    ikonRenk: "#0E7C7B",
  },
  {
    baslik: "Hukuk & KVKK",
    aciklama: "Malpraktis, hukuki danışmanlık ve KVKK talepleri için",
    email: "hukuk@doktorpusula.com",
    ikonBg: "#EFF6FF",
    ikonRenk: "#1E40AF",
  },
  {
    baslik: "Firma İş Birlikleri",
    aciklama: "İlaç, medikal cihaz, sağlık turizmi firmaları için",
    email: "firma@doktorpusula.com",
    ikonBg: "#FEF3C7",
    ikonRenk: "#D97706",
  },
  {
    baslik: "Basın & Medya",
    aciklama: "Röportaj, haber, iş birliği talepleri için",
    email: "basin@doktorpusula.com",
    ikonBg: "#F5F3FF",
    ikonRenk: "#7C3AED",
  },
];

export default function Iletisim() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="İletişim" />

      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">Bize Ulaşın</h1>
          <p className="text-gray-300">
            Sorularınız, önerileriniz veya iş birliği talepleriniz için doğru kanalı seçin
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {KANALLAR.map((k) => (
            <a
              key={k.email}
              href={`mailto:${k.email}`}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div style={{ backgroundColor: k.ikonBg, color: k.ikonRenk }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 style={{ color: "var(--navy)" }} className="font-bold mb-1">{k.baslik}</h3>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">{k.aciklama}</p>
                  <p style={{ color: k.ikonRenk }} className="text-sm font-semibold">{k.email}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Hızlı bağlantılar */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 style={{ color: "var(--navy)" }} className="text-lg font-bold mb-6 text-center">Aradığınız şey bu muydu?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/sss" className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">❓</div>
              <h3 style={{ color: "var(--teal)" }} className="text-sm font-semibold mb-1">Sıkça Sorulan Sorular</h3>
              <p className="text-xs text-gray-400">Yaygın soruların cevabı burada</p>
            </Link>
            <Link href="/hakkimizda" className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">💡</div>
              <h3 style={{ color: "var(--teal)" }} className="text-sm font-semibold mb-1">Hakkımızda</h3>
              <p className="text-xs text-gray-400">Biz kimiz, ne yapıyoruz</p>
            </Link>
            <Link href="/kayit-ol" className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-2xl mb-2">✨</div>
              <h3 style={{ color: "var(--teal)" }} className="text-sm font-semibold mb-1">Kayıt Ol</h3>
              <p className="text-xs text-gray-400">Hekim, tercüman veya firma üyeliği</p>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Tüm taleplere 24 saat içinde yanıt veriyoruz.
        </p>
      </div>
    </div>
  );
}
