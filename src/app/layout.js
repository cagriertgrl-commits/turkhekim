import "./globals.css";

export const metadata = {
  title: {
    default: "TurkHekim — Türkiye'nin Sağlık Otoritesi",
    template: "%s | TurkHekim",
  },
  description: "Türkiye'nin bağımsız, şeffaf sağlık platformu. Doğrulanmış yorumlar, kolay randevu, çok dilli destek. Doğru hekime güvenle ulaşın.",
  keywords: ["doktor bul", "randevu al", "türkiye doktor", "kbb uzmanı", "medikal turizm türkiye"],
  authors: [{ name: "TurkHekim" }],
  creator: "TurkHekim",
  metadataBase: new URL("https://turkhekim.vercel.app"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://turkhekim.vercel.app",
    siteName: "TurkHekim",
    title: "TurkHekim — Türkiye'nin Sağlık Otoritesi",
    description: "Doğrulanmış yorumlar, kolay randevu, çok dilli destek. Türkiye'nin bağımsız sağlık platformu.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TurkHekim" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TurkHekim — Türkiye'nin Sağlık Otoritesi",
    description: "Doğrulanmış yorumlar, kolay randevu, çok dilli destek.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://turkhekim.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
