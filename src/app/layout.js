import "./globals.css";
import Script from "next/script";
import { headers } from "next/headers";
import Footer from "@/components/Footer";
import CerezBanner from "@/components/CerezBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

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
  verification: {
    google: "jH0OkxAT8LwYb6n_Ghs6ago4Q200Jdsihyq_oBR5NOk",
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || headersList.get("x-matched-path") || "";
  const embedSayfasi = pathname.startsWith("/embed");

  return (
    <html lang="tr" className="h-full antialiased">
      <head>
        {!embedSayfasi && <link rel="preconnect" href="https://fonts.googleapis.com" />}
        {!embedSayfasi && <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />}
        {!embedSayfasi && <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />}
      </head>
      <body className={embedSayfasi ? "" : "min-h-full flex flex-col"}>
        {children}
        {!embedSayfasi && (
          <>
            <Footer />
            <CerezBanner />
          </>
        )}
        {GA_ID && !embedSayfasi && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
