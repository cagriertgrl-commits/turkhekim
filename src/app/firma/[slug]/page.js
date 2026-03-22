import { notFound } from "next/navigation";
import sql from "@/lib/db";
import Navbar from "@/components/Navbar";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [firma] = await sql`SELECT ad, aciklama FROM firmalar WHERE slug = ${slug} AND aktif = true`;
  if (!firma) return { title: "Firma Bulunamadı" };
  return {
    title: `${firma.ad} | DoktorPusula`,
    description: firma.aciklama || `${firma.ad} ürün ve hizmetleri`,
  };
}

export default async function FirmaProfil({ params }) {
  const { slug } = await params;

  const [firma] = await sql`
    SELECT id, slug, ad, tip, aciklama, logo_url, website, telefon
    FROM firmalar
    WHERE slug = ${slug} AND aktif = true
  `;

  if (!firma) notFound();

  const urunler = await sql`
    SELECT id, ad, aciklama, kategori, indirimde, indirim_detay
    FROM firma_urunler
    WHERE firma_id = ${firma.id} AND aktif = true
    ORDER BY indirimde DESC, created_at DESC
  `;

  const takipciSayisi = await sql`
    SELECT COUNT(*) as sayi FROM firma_takip WHERE firma_id = ${firma.id}
  `;

  const TIP_ETIKETLER = {
    ilac: "İlaç Firması",
    tibbi_cihaz: "Tıbbi Cihaz",
    utt: "Ürün Tanıtım Temsilcisi",
    saglik_hizmeti: "Sağlık Hizmeti",
    sigorta: "Sigorta",
    diger: "Diğer",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* BAŞLIK */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }} className="px-6 py-12">
        <div className="max-w-4xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-4xl flex-shrink-0">
            {firma.logo_url ? (
              <img src={firma.logo_url} alt={firma.ad} className="w-full h-full object-contain rounded-2xl" />
            ) : (
              "🏢"
            )}
          </div>
          <div>
            <div className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-2" style={{ backgroundColor: "var(--teal)", color: "white" }}>
              {TIP_ETIKETLER[firma.tip] || firma.tip}
            </div>
            <h1 className="text-white text-2xl font-bold">{firma.ad}</h1>
            {firma.aciklama && (
              <p className="text-gray-300 text-sm mt-1 max-w-xl">{firma.aciklama}</p>
            )}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
              <span>👨‍⚕️ {takipciSayisi[0].sayi} doktor takip ediyor</span>
              {firma.website && (
                <a href={firma.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  🌐 Web sitesi →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ÜRÜNLER */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {urunler.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-lg mb-4">Ürün Kataloğu</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {urunler.map((urun) => (
                <div key={urun.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative">
                  {urun.indirimde && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      İndirim
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 pr-12">{urun.ad}</h3>
                  {urun.aciklama && (
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{urun.aciklama}</p>
                  )}
                  {urun.indirimde && urun.indirim_detay && (
                    <p className="text-xs text-green-600 font-medium">📣 {urun.indirim_detay}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {urunler.length === 0 && (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">Bu firma henüz ürün eklememiş.</p>
          </div>
        )}

        {/* İletişim */}
        {firma.telefon && (
          <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">İletişim</h2>
            <a
              href={`https://wa.me/90${firma.telefon.replace(/\D/g, "").replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white px-5 py-2.5 rounded-xl"
              style={{ backgroundColor: "#25D366" }}
            >
              💬 WhatsApp ile İletişim
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
