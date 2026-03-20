import Navbar from "@/components/Navbar";
import HastaProfilFormu from "./HastaProfilFormu";

export const metadata = {
  title: "Hasta Profilim — DoktorPusula",
  description: "Sağlık bilgilerinizi kaydedin. Kronik hastalıklar, alerjiler, kullanılan ilaçlar.",
};

export default function HastaProfilSayfasi() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <HastaProfilFormu />
      </div>
    </div>
  );
}
