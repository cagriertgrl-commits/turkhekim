import Navbar from "@/components/Navbar";
import { HASTA_FORMLARI } from "@/lib/hastaFormlari";
import { notFound } from "next/navigation";
import FormIcerik from "./FormIcerik";

export async function generateStaticParams() {
  return HASTA_FORMLARI.map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const form = HASTA_FORMLARI.find((f) => f.id === id);
  if (!form) return { title: "Form Bulunamadı" };
  return {
    title: `${form.baslik} — DoktorPusula`,
    description: form.aciklama,
  };
}

export default async function FormDetay({ params }) {
  const { id } = await params;
  const form = HASTA_FORMLARI.find((f) => f.id === id);
  if (!form) notFound();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <FormIcerik form={form} />
      </div>
    </div>
  );
}
