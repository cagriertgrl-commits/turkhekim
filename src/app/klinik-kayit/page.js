import Navbar from "@/components/Navbar";
import KayitFormu from "./KayitFormu";

export const metadata = {
  title: "Klinik Kayıt | TurkHekim",
  description: "Kliniğinizi, polikliniğinizi, hastane veya tıp merkezinizi TurkHekim klinik rehberine ekleyin.",
};

export default function KlinikKayit() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Kliniğinizi Ekleyin</h1>
          <p className="text-gray-300">Faaliyet belgenizin doğrulanmasının ardından profiliniz yayına çıkar.</p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <KayitFormu />
      </section>
    </div>
  );
}
