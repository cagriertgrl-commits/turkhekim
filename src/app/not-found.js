import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Sayfa Bulunamadı | DoktorPusula",
  description: "Aradığınız sayfa bulunamadı.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{ backgroundColor: "#0D2137", minHeight: "calc(100vh - 72px)" }}
        className="flex items-center justify-center px-6"
      >
        <div className="text-center">
          <div
            style={{ color: "#0E7C7B" }}
            className="text-8xl font-bold mb-4"
          >
            404
          </div>
          <h1 className="text-white text-2xl font-bold mb-3">
            Sayfa Bulunamadı
          </h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              style={{ backgroundColor: "#0E7C7B" }}
              className="text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/istanbul/kbb-uzmani"
              className="text-gray-300 border border-gray-600 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:text-white transition-colors"
            >
              Doktor Bul
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
