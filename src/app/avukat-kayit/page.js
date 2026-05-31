import Navbar from "@/components/Navbar";
import KayitFormu from "./KayitFormu";

export const metadata = {
  title: "Avukat Kayıt | TurkHekim Hukuk",
  description: "Sağlık hukuku alanında uzmanlaşmış avukatları TurkHekim'e davet ediyoruz. Anlaşmalı avukat ağına katılın.",
};

export default function AvukatKayit() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Avukat Kaydı</h1>
          <p className="text-gray-300">
            Sağlık hukuku alanında uzmanlaşmış avukatların buluşma noktası.
            Baro sicil doğrulamasının ardından profiliniz aktif edilecektir.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-6 py-8">
        <KayitFormu />
      </section>
    </div>
  );
}
