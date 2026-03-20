import Navbar from "@/components/Navbar";
import Link from "next/link";
import { HASTA_FORMLARI, tumKategoriler } from "@/lib/hastaFormlari";

export const metadata = {
  title: "Hasta Formları — DoktorPusula",
  description: "Branşa özel hasta onam formları, KVKK formu ve tıbbi belgeler. PDF olarak görüntüleyin ve indirin.",
};

const KATEGORI_IKON = {
  "Estetik Cerrahi": "✨",
  "Diş Hekimliği": "🦷",
  "Psikiyatri": "🧠",
  "Kardiyoloji": "❤️",
  "Ortopedi": "🦴",
  "Göz Hastalıkları": "👁️",
  "Dermatoloji": "🩺",
  "KBB": "👂",
  "Çocuk Sağlığı": "👶",
  "Genel": "📄",
};

export default async function HastaFormlariSayfasi({ searchParams }) {
  const sp = await searchParams;
  const seciliKategori = sp?.kategori || "";
  const kategoriler = tumKategoriler();

  const filtrelenmis = seciliKategori
    ? HASTA_FORMLARI.filter((f) => f.kategori === seciliKategori)
    : HASTA_FORMLARI;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">📋 Hasta Formları</h1>
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
          {kategoriler.map((kat) => (
            <Link
              key={kat}
              href={`/hasta-formlari?kategori=${encodeURIComponent(kat)}`}
              style={{
                backgroundColor: seciliKategori === kat ? "#0E7C7B" : "#fff",
                color: seciliKategori === kat ? "#fff" : "#6B7280",
                borderColor: seciliKategori === kat ? "#0E7C7B" : "#E5E7EB",
              }}
              className="border px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80"
            >
              {KATEGORI_IKON[kat] || "📄"} {kat}
            </Link>
          ))}
        </div>

        {/* Form Listesi */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtrelenmis.map((form) => (
            <div key={form.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-teal-200 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">
                      {KATEGORI_IKON[form.kategori]} {form.kategori}
                    </span>
                    <span style={{ backgroundColor: "#EFF6FF", color: "#1E40AF" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">
                      🇹🇷 TR
                    </span>
                  </div>
                  <h3 style={{ color: "#0D2137" }} className="font-bold text-sm leading-snug">{form.baslik}</h3>
                </div>
                <span className="text-2xl flex-shrink-0">{KATEGORI_IKON[form.kategori] || "📄"}</span>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed mb-4">{form.aciklama}</p>

              <div className="flex gap-2">
                <Link
                  href={`/hasta-formlari/${form.id}`}
                  style={{ backgroundColor: "#0D2137" }}
                  className="flex-1 text-center text-white text-xs py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  👁️ Görüntüle
                </Link>
                <Link
                  href={`/hasta-formlari/${form.id}?indir=1`}
                  style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }}
                  className="flex-1 text-center border text-xs py-2 rounded-xl font-semibold hover:bg-teal-50 transition-colors"
                >
                  ⬇️ İndir
                </Link>
              </div>
            </div>
          ))}
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
