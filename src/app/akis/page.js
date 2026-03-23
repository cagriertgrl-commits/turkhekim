import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";
import sql from "@/lib/db";
import AkisIstemci from "./AkisIstemci";

export const metadata = {
  title: "Sağlık Akışı — DoktorPusula",
  description: "Doktorların ve sağlık kurumlarının güncel paylaşımları, kongre duyuruları ve sağlık haberleri.",
};

export const dynamic = "force-dynamic";

const KATEGORILER = [
  { deger: "", etiket: "Tümü" },
  { deger: "genel", etiket: "📢 Genel" },
  { deger: "kongre", etiket: "🎓 Kongre & Etkinlik" },
  { deger: "saglik-ipucu", etiket: "💡 Sağlık İpucu" },
  { deger: "arastirma", etiket: "🔬 Araştırma" },
  { deger: "duyuru", etiket: "📣 Duyuru" },
  { deger: "firma", etiket: "🏢 Firma" },
];

export default async function AkisSayfasi({ searchParams }) {
  const sp = await searchParams;
  const kategori = sp?.kategori || "";

  const session = await getSession();

  let baslangicPostlar = [];
  try {
    if (kategori) {
      baslangicPostlar = await sql`
        SELECT p.*,
          d.ad as doktor_ad, d.unvan as doktor_unvan, d.uzmanlik, d.foto_url as doktor_foto, d.slug as doktor_slug,
          f.ad as firma_ad, f.logo_url as firma_logo, f.slug as firma_slug
        FROM paylasilar p
        LEFT JOIN doktorlar d ON p.doktor_id = d.id
        LEFT JOIN firmalar f ON p.firma_id = f.id
        WHERE p.yayinda = true AND p.kategori = ${kategori}
        ORDER BY p.created_at DESC LIMIT 20
      `;
    } else {
      baslangicPostlar = await sql`
        SELECT p.*,
          d.ad as doktor_ad, d.unvan as doktor_unvan, d.uzmanlik, d.foto_url as doktor_foto, d.slug as doktor_slug,
          f.ad as firma_ad, f.logo_url as firma_logo, f.slug as firma_slug
        FROM paylasilar p
        LEFT JOIN doktorlar d ON p.doktor_id = d.id
        LEFT JOIN firmalar f ON p.firma_id = f.id
        WHERE p.yayinda = true
        ORDER BY p.created_at DESC LIMIT 20
      `;
    }
  } catch {}

  // Beğeni durumları
  let begenilenler = new Set();
  if (session && baslangicPostlar.length) {
    const ids = baslangicPostlar.map(p => p.id);
    try {
      const b = await sql`SELECT paylasi_id FROM paylasi_begeni WHERE doktor_id = ${session.id} AND paylasi_id = ANY(${ids})`;
      begenilenler = new Set(b.map(r => r.paylasi_id));
    } catch {}
  }

  const postlarJson = baslangicPostlar.map(p => ({
    ...p,
    begendi: begenilenler.has(p.id),
    created_at: p.created_at?.toISOString?.() || p.created_at,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F7FA" }}>
      <Navbar />

      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white text-2xl font-bold mb-1">Sağlık Akışı</h1>
          <p className="text-gray-300 text-sm">Doktorlar, klinikler ve medikal firmalardan güncel paylaşımlar</p>
        </div>
      </div>

      {/* Kategori filtreleri */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {KATEGORILER.map((k) => (
            <a
              key={k.deger}
              href={k.deger ? `/akis?kategori=${k.deger}` : "/akis"}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: kategori === k.deger ? "#0D2137" : "#F3F4F6",
                color: kategori === k.deger ? "#fff" : "#6B7280",
              }}
            >
              {k.etiket}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        <AkisIstemci
          baslangicPostlar={postlarJson}
          session={session ? { id: session.id, ad: session.ad } : null}
          kategori={kategori}
          kategoriler={KATEGORILER}
        />
      </div>
    </div>
  );
}
