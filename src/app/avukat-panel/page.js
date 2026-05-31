import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import { getAvukatSession } from "@/lib/avukatSession";
import PanelIcerik from "./PanelIcerik";

export const metadata = { title: "Avukat Paneli | TurkHekim Hukuk" };
export const dynamic = "force-dynamic";

export default async function AvukatPanel() {
  const session = await getAvukatSession();
  if (!session) redirect("/avukat-giris");

  const [avukat] = await sql`
    SELECT id, slug, ad, soyad, email, telefon, baro_sicil_no, baro_sehir,
           uzmanlik_alanlari, deneyim_yil, sehir, hakkinda, saatlik_ucret, foto_url, aktif
    FROM avukatlar WHERE id = ${session.id}
  `;

  if (!avukat) redirect("/avukat-giris");

  const talepler = await sql`
    SELECT id, talep_eden_tip, konu_kategori, soru_metni, aciliyet, butce, durum, created_at
    FROM hukuki_danismanlik_talepleri
    WHERE atanan_avukat_id = ${avukat.id}
       OR (atanan_avukat_id IS NULL AND durum = 'acik' AND konu_kategori = ANY(${avukat.uzmanlik_alanlari?.split(",").map(s => s.trim()) || []}))
    ORDER BY created_at DESC LIMIT 30
  `;

  const makaleler = await sql`
    SELECT id, slug, baslik, kategori, yayin_tarihi, goruntulenme, yayinda
    FROM hukuki_makaleler
    WHERE yazar_avukat_id = ${avukat.id}
    ORDER BY yayin_tarihi DESC LIMIT 20
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PanelIcerik avukat={avukat} talepler={talepler} makaleler={makaleler} />
    </div>
  );
}
