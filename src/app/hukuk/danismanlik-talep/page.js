import Navbar from "@/components/Navbar";
import TalepFormu from "./TalepFormu";

export const metadata = {
  title: "Hukuki Danışmanlık Talep | TurkHekim Hukuk",
  description: "Sağlık hukuku konusunda uzman avukatlarımızdan danışmanlık talep edin. 24 saat içinde dönüş.",
  alternates: { canonical: "https://turkhekim.com/hukuk/danismanlik-talep" },
};

export default function DanismanlikTalep() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Hukuki Danışmanlık Talep Et</h1>
          <p className="text-gray-300">
            Konunuzu detaylı yazın, anlaşmalı avukatlarımız 24 saat içinde dönüş yapacak.
            Tüm görüşmeler avukat-müvekkil gizliliği kapsamındadır.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <TalepFormu />
      </section>
    </div>
  );
}
