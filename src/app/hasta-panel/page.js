import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HastaPanelIstemci from "./HastaPanelIstemci";

export const metadata = {
  title: "Hasta Panelim | DoktorPusula",
  description: "Randevularınızı görüntüleyin, yorumlarınızı takip edin. Telefon numaranızla giriş yapın.",
};

export default function HastaPanelSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hasta Panelim</h1>
          <p className="text-gray-500 text-sm mt-1">Randevularınızı telefon numaranızla sorgulayın.</p>
        </div>
        <HastaPanelIstemci />
      </div>
      <Footer />
    </div>
  );
}
