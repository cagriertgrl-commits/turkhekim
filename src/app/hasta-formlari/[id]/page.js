import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import Navbar from "@/components/Navbar";
import { HASTA_FORMLARI } from "@/lib/hastaFormlari";
import { notFound, redirect } from "next/navigation";
import FormIcerik from "./FormIcerik";

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
  const session = await getSession();
  if (!session) redirect(`/giris?callbackUrl=/hasta-formlari`);

  const { id } = await params;
  const form = HASTA_FORMLARI.find((f) => f.id === id);
  if (!form) notFound();

  const [doktor] = await sql`
    SELECT ad, unvan, diploma_no, sicil_no FROM doktorlar WHERE id = ${session.id}
  `;

  if (!doktor) {
    redirect("/giris");
  }

  const hekimBilgisi = {
    adUnvan: [doktor.unvan, doktor.ad].filter(Boolean).join(" ") || "",
    diplomaNo: doktor.diploma_no || "",
    sicilNo: doktor.sicil_no || "",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <FormIcerik form={form} hekim={hekimBilgisi} />
      </div>
    </div>
  );
}
