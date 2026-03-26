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
  { deger: "", etiket: "Tümü", svg: null, renk: null },
  {
    deger: "genel",
    etiket: "Genel",
    renk: "#6B7280",
    svg: <svg viewBox="0 0 24 24" width={14} height={14}><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" stroke="#6B7280" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    deger: "kongre",
    etiket: "Kongre & Etkinlik",
    renk: "#7C3AED",
    svg: <svg viewBox="0 0 24 24" width={14} height={14}><path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    deger: "saglik-ipucu",
    etiket: "Sağlık İpucu",
    renk: "#059669",
    svg: <svg viewBox="0 0 24 24" width={14} height={14}><circle cx="12" cy="12" r="9" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12" y2="12" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/></svg>
  },
  {
    deger: "arastirma",
    etiket: "Araştırma",
    renk: "#1D4ED8",
    svg: <svg viewBox="0 0 24 24" width={14} height={14}><circle cx="11" cy="11" r="7" stroke="#1D4ED8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="m21 21-4.35-4.35" stroke="#1D4ED8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    deger: "duyuru",
    etiket: "Duyuru",
    renk: "#D97706",
    svg: <svg viewBox="0 0 24 24" width={14} height={14}><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  {
    deger: "firma",
    etiket: "Firma",
    renk: "#0E7C7B",
    svg: <svg viewBox="0 0 24 24" width={14} height={14}><rect x="2" y="7" width="20" height="15" rx="2" stroke="#0E7C7B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#0E7C7B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
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
      <Navbar aktifSayfa="Sağlık Akışı" />

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
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: kategori === k.deger ? "#0D2137" : "#F3F4F6",
                color: kategori === k.deger ? "#fff" : "#6B7280",
              }}
            >
              {k.svg && <span style={{ display: "flex", alignItems: "center" }}>{k.svg}</span>}
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
        />
      </div>
    </div>
  );
}
