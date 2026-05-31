import Navbar from "@/components/Navbar";
import KayitFormu from "./KayitFormu";

export const metadata = {
  title: "Firma Kayıt | TurkHekim Pazaryeri",
  description: "Tıbbi cihaz, sarf, implant, ilaç ve sağlık hizmet firmalarınızı TurkHekim Pazaryeri'ne kayıt edin. Doktor ağına doğrudan erişim.",
};

export default function FirmaKayit() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Firma Kaydı</h1>
          <p className="text-gray-300">
            Vergi levhanız ve faaliyet belgenizin incelenmesinin ardından hesabınız aktif edilir.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <KayitFormu />
      </section>
    </div>
  );
}
