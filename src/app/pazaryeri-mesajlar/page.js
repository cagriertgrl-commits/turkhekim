import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";
import MesajlarSekmesi from "../firma-panel/MesajlarSekmesi";

export const metadata = {
  title: "Pazaryeri Mesajlarım | TurkHekim",
  description: "Firma tedarikçilerinizle güvenli mesajlaşma.",
};

export const dynamic = "force-dynamic";

export default async function DoktorPazaryeriMesajlar() {
  const session = await getSession();
  if (!session) redirect("/giris?next=/pazaryeri-mesajlar");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section style={{ background: "var(--navy)" }} className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl font-bold mb-1">💬 Pazaryeri Mesajlarım</h1>
          <p className="text-gray-300 text-sm">Tedarikçi firmalarla yazışmalarınız.</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-6">
        <MesajlarSekmesi tip="doktor" />
      </section>
    </div>
  );
}
