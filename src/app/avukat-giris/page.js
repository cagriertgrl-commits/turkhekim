import Navbar from "@/components/Navbar";
import GirisFormu from "./GirisFormu";

export const metadata = {
  title: "Avukat Girişi | TurkHekim Hukuk",
  description: "TurkHekim anlaşmalı avukat hesabınıza giriş yapın.",
};

export default function AvukatGiris() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Avukat Girişi</h1>
          <p className="text-gray-300">Anlaşmalı avukat panelinize hoş geldiniz.</p>
        </div>
      </section>
      <section className="max-w-md mx-auto px-6 py-8">
        <GirisFormu />
      </section>
    </div>
  );
}
