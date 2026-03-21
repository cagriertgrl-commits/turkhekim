import "./globals.css";
import Footer from "@/components/Footer";
import CerezBanner from "@/components/CerezBanner";

export const metadata = {
  title: {
    default: "DoktorPusula — Türkiye'nin Sağlık Otoritesi",
    template: "%s | DoktorPusula",
  },
  description: "Türkiye'nin bağımsız, şeffaf sağlık platformu. Doğrulanmış yorumlar, kolay randevu, çok dilli destek. Doğru hekime güvenle ulaşın.",
  keywords: ["doktor bul", "randevu al", "türkiye doktor", "kbb uzmanı", "medikal turizm türkiye"],
  authors: [{ name: "DoktorPusula" }],
  creator: "DoktorPusula",
  metadataBase: new URL("https://doktorpusula.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://doktorpusula.com",
    siteName: "DoktorPusula",
    title: "DoktorPusula — Türkiye'nin Sağlık Otoritesi",
    description: "Doğrulanmış yorumlar, kolay randevu, çok dilli destek. Türkiye'nin bağımsız sağlık platformu.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "DoktorPusula" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoktorPusula — Türkiye'nin Sağlık Otoritesi",
    description: "Doğrulanmış yorumlar, kolay randevu, çok dilli destek.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://doktorpusula.com",
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
      <body className="min-h-full flex flex-col">{children}<Footer /><CerezBanner /></body>
    </html>
  );
}
