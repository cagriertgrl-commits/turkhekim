import Navbar from "@/components/Navbar";
import TalepFormu from "./TalepFormu";

export const metadata = {
  title: "Malzeme Talebi Oluştur (RFQ) | TurkHekim Pazaryeri",
  description: "Doktor olarak aradığınız tıbbi cihaz, sarf veya implant talebinizi yayınlayın. İlgili firmalar size doğrudan teklif sunsun.",
  alternates: { canonical: "https://turkhekim.com/pazaryeri/talep-olustur" },
};

export default function TalepOlustur() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <span style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }} className="text-xs font-bold px-3 py-1 rounded-full">
            RFQ — Request for Quotation
          </span>
          <h1 className="text-white text-2xl md:text-3xl font-bold mt-3 mb-2">Malzeme / Cihaz Talebi Oluştur</h1>
          <p className="text-gray-300">
            Aradığınız ürünü tarif edin, ilgili firmalar size doğrudan teklif sunsun.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <TalepFormu />
      </section>
    </div>
  );
}
