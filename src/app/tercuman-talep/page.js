import Navbar from "@/components/Navbar";
import TalepFormu from "./TalepFormu";

export const metadata = {
  title: "Tıbbi Tercüman Talep Et | TurkHekim",
  description:
    "Sağlık turizmi, klinik tercüme ve tıbbi yazışma için Arapça, İngilizce, Rusça, Farsça uzman tercüman talebinizi yayınlayın.",
  alternates: { canonical: "https://turkhekim.com/tercuman-talep" },
};

export default function TercumanTalep() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Tıbbi Tercüman Talep Et</h1>
          <p className="text-gray-300">
            Talebinizi yayınlayın, uygun tercümanlar size doğrudan teklif sunsun.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <TalepFormu />
      </section>
    </div>
  );
}
