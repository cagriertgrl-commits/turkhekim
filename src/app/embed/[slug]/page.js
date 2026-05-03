import sql from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug} — DoktorPusula Widget`,
    robots: { index: false, follow: false },
  };
}

export default async function EmbedDoktor({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const tema = sp?.tema || "acik";
  const koyu = tema === "koyu";

  const [doktor] = await sql`
    SELECT id, slug, ad, soyad, unvan, uzmanlik, sehir, ilce, puan, yorum_sayisi, deneyim, foto_url, hakkinda, onaylandi
    FROM doktorlar
    WHERE slug = ${slug} AND onaylandi = true
    LIMIT 1
  `;

  if (!doktor) notFound();

  const tamIsim = [doktor.ad, doktor.soyad].filter(Boolean).join(" ");
  const unvanAd = doktor.unvan ? `${doktor.unvan} ${tamIsim}` : tamIsim;
  const initials = tamIsim.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const profilUrl = `https://doktorpusula.com/doktor/${doktor.slug}?ref=widget`;

  return (
    <>
      <style>{`
        body { background: transparent !important; padding: 8px; margin: 0 !important; min-height: 0 !important; display: block !important; }
        nav, footer, [class*="Cerez"], .sticky { display: none !important; }
        .dp-embed-kart {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          border-radius: 16px;
          padding: 20px;
          background: ${koyu ? "#0D2137" : "#ffffff"};
          color: ${koyu ? "#ffffff" : "#0D2137"};
          border: 1px solid ${koyu ? "#1f3a5f" : "#E5E7EB"};
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          max-width: 380px;
          text-decoration: none !important;
          display: block;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .dp-embed-kart:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.10);
        }
        .dp-ust { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .dp-avatar {
          width: 60px; height: 60px; border-radius: 14px; object-fit: cover;
          background: #0E7C7B; color: white;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 20px; flex-shrink: 0;
        }
        .dp-isim { font-size: 16px; font-weight: 700; line-height: 1.3; margin-bottom: 2px; color: ${koyu ? "#fff" : "#0D2137"}; }
        .dp-uzmanlik { color: #0E7C7B; font-size: 13px; font-weight: 600; }
        .dp-konum { color: #94a3b8; font-size: 12px; margin-top: 2px; }
        .dp-bilgiler {
          display: flex; gap: 16px; margin-bottom: 14px;
          padding: 10px 12px;
          background: ${koyu ? "rgba(78,217,216,0.08)" : "#F0FDFA"};
          border-radius: 10px;
        }
        .dp-bilgi { flex: 1; }
        .dp-bilgi-deger { font-size: 16px; font-weight: 700; color: ${koyu ? "#4DD9D8" : "#0E7C7B"}; }
        .dp-bilgi-etiket { font-size: 11px; color: ${koyu ? "#94a3b8" : "#6B7280"}; margin-top: 2px; }
        .dp-yildiz { color: #FCD34D; }
        .dp-cta {
          display: block; background: #0E7C7B; color: white !important;
          text-align: center; padding: 11px 16px;
          border-radius: 10px; font-weight: 600; font-size: 13px;
        }
        .dp-marka {
          display: flex; align-items: center; justify-content: center; gap: 4px;
          margin-top: 10px; font-size: 10px;
          color: ${koyu ? "#64748b" : "#94a3b8"};
        }
        .dp-marka b { color: ${koyu ? "#94a3b8" : "#0D2137"}; }
        .dp-marka span { color: #C9A84C; }
      `}</style>
      <a href={profilUrl} target="_top" rel="noopener" className="dp-embed-kart">
        <div className="dp-ust">
          {doktor.foto_url ? (
            <img src={doktor.foto_url} alt={tamIsim} className="dp-avatar" />
          ) : (
            <div className="dp-avatar">{initials}</div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="dp-isim">{unvanAd}</div>
            <div className="dp-uzmanlik">{doktor.uzmanlik}</div>
            <div className="dp-konum">📍 {doktor.sehir}{doktor.ilce ? `, ${doktor.ilce}` : ""}</div>
          </div>
        </div>

        {(doktor.puan > 0 || doktor.yorum_sayisi > 0 || doktor.deneyim) && (
          <div className="dp-bilgiler">
            {doktor.puan > 0 && (
              <div className="dp-bilgi">
                <div className="dp-bilgi-deger"><span className="dp-yildiz">★</span> {Number(doktor.puan).toFixed(1)}</div>
                <div className="dp-bilgi-etiket">Puan</div>
              </div>
            )}
            {doktor.yorum_sayisi > 0 && (
              <div className="dp-bilgi">
                <div className="dp-bilgi-deger">{doktor.yorum_sayisi}</div>
                <div className="dp-bilgi-etiket">Yorum</div>
              </div>
            )}
            {doktor.deneyim && (
              <div className="dp-bilgi">
                <div className="dp-bilgi-deger">{String(doktor.deneyim).match(/\d+/)?.[0] || "—"}</div>
                <div className="dp-bilgi-etiket">Yıl Deneyim</div>
              </div>
            )}
          </div>
        )}

        <div className="dp-cta">Randevu Al →</div>

        <div className="dp-marka">
          <b>Doktor</b><span>Pusula</span> · doğrulanmış profil
        </div>
      </a>
    </>
  );
}
