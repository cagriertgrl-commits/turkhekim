import { getSession } from "@/lib/session";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { HASTA_FORMLARI, tumKategoriler } from "@/lib/hastaFormlari";
import {
  IkonEstetik, IkonDis, IkonPsikiyatri, IkonKardiyoloji, IkonOrtopedi,
  IkonGoz, IkonDermatoloji, IkonKBB, IkonCocuk, IkonNoroloji,
  IkonUroloji, IkonKadin, IkonGenelCerrahi, IkonFizikTedavi,
  IkonGastro, IkonIcHastaliklari, IkonOnkoloji, IkonRomatoloji, IkonEndokrin,
} from "@/components/UzmanlikIkonlari";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Hasta Onam Formları — DoktorPusula",
  description: "Branşa özel hasta onam formları, KVKK formu ve tıbbi belgeler. PDF olarak görüntüleyin ve indirin.",
};

const KATEGORI_BILGI = {
  "Estetik Cerrahi":    { Ikon: IkonEstetik,        renk: "#D97706", bg: "#FFFBEB" },
  "Diş Hekimliği":      { Ikon: IkonDis,            renk: "#0E7C7B", bg: "#F0FDFA" },
  "KBB":                { Ikon: IkonKBB,            renk: "#0E7C7B", bg: "#E6F4F4" },
  "Kardiyoloji":        { Ikon: IkonKardiyoloji,    renk: "#DC2626", bg: "#FFF1F2" },
  "Ortopedi":           { Ikon: IkonOrtopedi,       renk: "#2563EB", bg: "#EFF6FF" },
  "Göz Hastalıkları":   { Ikon: IkonGoz,            renk: "#0369A1", bg: "#E0F2FE" },
  "Dermatoloji":        { Ikon: IkonDermatoloji,    renk: "#BE185D", bg: "#FDF2F8" },
  "Psikiyatri":         { Ikon: IkonPsikiyatri,     renk: "#7C3AED", bg: "#F5F3FF" },
  "Çocuk Sağlığı":      { Ikon: IkonCocuk,          renk: "#059669", bg: "#ECFDF5" },
  "Üroloji":            { Ikon: IkonUroloji,        renk: "#0369A1", bg: "#E0F2FE" },
  "Kadın Hast. & Doğum":{ Ikon: IkonKadin,          renk: "#BE185D", bg: "#FDF2F8" },
  "Genel Cerrahi":      { Ikon: IkonGenelCerrahi,   renk: "#059669", bg: "#ECFDF5" },
  "Nöroloji":           { Ikon: IkonNoroloji,       renk: "#1D4ED8", bg: "#EFF6FF" },
  "Fizik Tedavi":       { Ikon: IkonFizikTedavi,    renk: "#0E7C7B", bg: "#E6F4F4" },
  "Gastroenteroloji":   { Ikon: IkonGastro,         renk: "#92400E", bg: "#FFFBEB" },
  "İç Hastalıkları":    { Ikon: IkonIcHastaliklari, renk: "#374151", bg: "#F3F4F6" },
  "Onkoloji":           { Ikon: IkonOnkoloji,       renk: "#DC2626", bg: "#FFF1F2" },
  "Romatoloji":         { Ikon: IkonRomatoloji,     renk: "#7C3AED", bg: "#F5F3FF" },
  "Endokrinoloji":      { Ikon: IkonEndokrin,       renk: "#059669", bg: "#ECFDF5" },
  "Genel":              { Ikon: null,               renk: "#6B7280", bg: "#F3F4F6" },
};

export default async function HastaFormlariSayfasi({ searchParams }) {
  const session = await getSession();
  if (!session) redirect("/giris?callbackUrl=/hasta-formlari");

  const sp = await searchParams;
  const seciliKategori = sp?.kategori || "";
  const kategoriler = tumKategoriler();

  const filtrelenmis = seciliKategori
    ? HASTA_FORMLARI.filter((f) =>
        f.kategori === seciliKategori || f.ekKategoriler?.includes(seciliKategori)
      )
    : HASTA_FORMLARI;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">📋 Hasta Onam Formları</h1>
          <p className="text-gray-300 text-lg mb-2">Branşa özel onam formları, KVKK belgeleri</p>
          <p className="text-gray-400 text-sm">PDF olarak görüntüleyin veya doğrudan indirin</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/hasta-formlari"
            style={{
              backgroundColor: !seciliKategori ? "#0D2137" : "#fff",
              color: !seciliKategori ? "#fff" : "#6B7280",
              borderColor: !seciliKategori ? "#0D2137" : "#E5E7EB",
            }}
            className="border px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
          >
            Tümü ({HASTA_FORMLARI.length})
          </Link>
          {kategoriler.map((kat) => {
            const bilgi = KATEGORI_BILGI[kat];
            const aktif = seciliKategori === kat;
            return (
              <Link
                key={kat}
                href={`/hasta-formlari?kategori=${encodeURIComponent(kat)}`}
                style={{
                  backgroundColor: aktif ? (bilgi?.renk || "#0E7C7B") : "#fff",
                  color: aktif ? "#fff" : (bilgi?.renk || "#6B7280"),
                  borderColor: aktif ? (bilgi?.renk || "#0E7C7B") : "#E5E7EB",
                }}
                className="flex items-center gap-1.5 border px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
              >
                {bilgi?.Ikon && <span className="opacity-90"><bilgi.Ikon /></span>}
                {kat}
              </Link>
            );
          })}
        </div>

        {/* Form Listesi */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtrelenmis.map((form) => {
            const bilgi = KATEGORI_BILGI[form.kategori];
            return (
            <div key={form.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-teal-200 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      style={{ backgroundColor: bilgi?.bg || "#E8F5F5", color: bilgi?.renk || "#0E7C7B" }}
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold"
                    >
                      {bilgi?.Ikon && <bilgi.Ikon />}
                      {form.kategori}
                    </span>
                    {form.ekKategoriler?.map((ek) => {
                      const ekBilgi = KATEGORI_BILGI[ek];
                      return ekBilgi ? (
                        <span key={ek} style={{ backgroundColor: ekBilgi.bg, color: ekBilgi.renk }} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold">
                          {ekBilgi.Ikon && <ekBilgi.Ikon />} {ek}
                        </span>
                      ) : null;
                    })}
                    <span style={{ backgroundColor: "#EFF6FF", color: "#1E40AF" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">
                      🇹🇷 TR
                    </span>
                  </div>
                  <h3 style={{ color: "#0D2137" }} className="font-bold text-sm leading-snug">{form.baslik}</h3>
                </div>
                {bilgi?.Ikon ? (
                  <span style={{ color: bilgi.renk, backgroundColor: bilgi.bg }} className="p-2.5 rounded-xl flex-shrink-0">
                    <bilgi.Ikon />
                  </span>
                ) : (
                  <span className="text-2xl flex-shrink-0">📄</span>
                )}
              </div>

              <p className="text-gray-400 text-xs leading-relaxed mb-4">{form.aciklama}</p>

              <div className="flex gap-2">
                <Link
                  href={`/hasta-formlari/${form.id}`}
                  style={{ backgroundColor: "#0D2137" }}
                  className="flex-1 text-center text-white text-xs py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  👁️ Görüntüle & Yazdır
                </Link>
              </div>
            </div>
          );
          })}
        </div>

        {/* Bilgi Kutusu */}
        <div style={{ backgroundColor: "#FFFBEB", borderColor: "#FDE68A" }} className="border rounded-2xl p-5 mt-10">
          <h3 style={{ color: "#92400E" }} className="font-bold mb-2">⚠️ Önemli Not</h3>
          <p className="text-sm text-yellow-800 leading-relaxed">
            Bu formlar genel bilgilendirme amaçlıdır. Hukuki geçerlilik için formların yetkili hekim veya hukuk danışmanı tarafından incelenmesi önerilir.
            Mevzuat değişikliklerine göre güncellenmiş sürümler için{" "}
            <a href="mailto:hukuk@doktorpusula.com" style={{ color: "#0E7C7B" }} className="font-semibold hover:underline">
              hukuk@doktorpusula.com
            </a>{" "}
            adresine yazın.
          </p>
        </div>

      </div>
    </div>
  );
}
