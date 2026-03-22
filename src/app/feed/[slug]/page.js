import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const KATEGORI_MAP = {
  "saglik-ipucu": { etiket: "Sağlık İpucu", emoji: "💡", renk: "#0E7490", bg: "#CFFAFE" },
  "haber": { etiket: "Haber", emoji: "📰", renk: "#1D4ED8", bg: "#DBEAFE" },
  "duyuru": { etiket: "Duyuru", emoji: "📢", renk: "#7C3AED", bg: "#EDE9FE" },
  "tedavi": { etiket: "Tedavi", emoji: "💊", renk: "#059669", bg: "#D1FAE5" },
  "beslenme": { etiket: "Beslenme", emoji: "🥗", renk: "#D97706", bg: "#FEF3C7" },
  "egzersiz": { etiket: "Egzersiz", emoji: "🏃", renk: "#DC2626", bg: "#FEE2E2" },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rows = await sql`SELECT baslik, icerik FROM paylasilar WHERE slug = ${slug} AND yayinda = true`.catch(() => []);
  if (!rows[0]) return { title: "Sayfa Bulunamadı | DoktorPusula" };
  const ozet = rows[0].icerik?.slice(0, 150).replace(/\s+/g, " ").trim();
  return {
    title: `${rows[0].baslik} | DoktorPusula`,
    description: ozet,
  };
}

function tarihFormat(tarih) {
  return new Date(tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function okumaSuresi(icerik) {
  if (!icerik) return 1;
  return Math.max(1, Math.ceil(icerik.trim().split(/\s+/).length / 200));
}

export default async function FeedDetay({ params }) {
  const { slug } = await params;

  const rows = await sql`
    SELECT p.id, p.slug, p.baslik, p.icerik, p.kategori, p.okunma, p.created_at,
           d.ad, d.soyad, d.unvan, d.uzmanlik, d.sehir, d.slug as doktor_slug,
           d.foto_url, d.hakkinda, d.yorum_sayisi, d.puan
    FROM paylasilar p
    JOIN doktorlar d ON d.id = p.doktor_id
    WHERE p.slug = ${slug} AND p.yayinda = true AND d.onaylandi = true
  `.catch(() => []);

  if (!rows[0]) notFound();

  const p = rows[0];
  const info = KATEGORI_MAP[p.kategori] || { etiket: p.kategori, emoji: "📄", renk: "#6B7280", bg: "#F3F4F6" };
  const tamIsim = [p.ad, p.soyad].filter(Boolean).join(" ");
  const initials = tamIsim.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "DR";

  // Okunma sayısını artır (fire and forget)
  sql`UPDATE paylasilar SET okunma = okunma + 1 WHERE id = ${p.id}`.catch(() => {});

  // İlgili paylaşımlar
  const ilgili = await sql`
    SELECT p2.slug, p2.baslik, p2.kategori, p2.created_at,
           d2.ad, d2.soyad, d2.uzmanlik
    FROM paylasilar p2
    JOIN doktorlar d2 ON d2.id = p2.doktor_id
    WHERE p2.yayinda = true AND d2.onaylandi = true AND p2.slug != ${slug}
    ORDER BY p2.created_at DESC
    LIMIT 3
  `.catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
          <span className="mx-2">›</span>
          <Link href="/feed" className="hover:text-gray-700">Sağlık Haberleri</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{p.baslik.slice(0, 40)}{p.baslik.length > 40 ? "…" : ""}</span>
        </p>

        {/* Makale */}
        <article className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          {/* Kategori + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: info.bg, color: info.renk }}
            >
              {info.emoji} {info.etiket}
            </span>
            <span className="text-gray-400 text-xs">{tarihFormat(p.created_at)}</span>
            <span className="text-gray-400 text-xs">· {okumaSuresi(p.icerik)} dk okuma</span>
          </div>

          <h1 className="text-gray-900 font-bold text-2xl md:text-3xl leading-tight mb-6">
            {p.baslik}
          </h1>

          {/* İçerik */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
            {p.icerik}
          </div>
        </article>

        {/* Yazar Kartı */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Yazar Hakkında</h3>
          <div className="flex items-start gap-4">
            {p.foto_url ? (
              <img src={p.foto_url} alt={tamIsim} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 flex-shrink-0" />
            ) : (
              <div style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="flex-1">
              <Link href={`/doktor/${p.doktor_slug}`} className="font-bold text-gray-900 hover:text-teal-700 transition-colors">
                {p.unvan ? `${p.unvan} ${tamIsim}` : tamIsim}
              </Link>
              <p style={{ color: "var(--teal)" }} className="text-sm font-semibold">{p.uzmanlik}</p>
              {p.sehir && <p className="text-gray-500 text-sm">📍 {p.sehir}</p>}
              {p.hakkinda && <p className="text-gray-600 text-sm mt-2 line-clamp-2">{p.hakkinda}</p>}
              <div className="flex items-center gap-4 mt-3">
                {p.yorum_sayisi > 0 && (
                  <span className="text-xs text-gray-500">★ {p.puan} ({p.yorum_sayisi} yorum)</span>
                )}
                <Link href={`/doktor/${p.doktor_slug}`} style={{ color: "var(--navy)" }} className="text-xs font-semibold hover:underline">
                  Profili İncele →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* İlgili Paylaşımlar */}
        {ilgili.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-4">Diğer Paylaşımlar</h3>
            <div className="space-y-3">
              {ilgili.map((r) => {
                const rInfo = KATEGORI_MAP[r.kategori] || { etiket: r.kategori, emoji: "📄", renk: "#6B7280", bg: "#F3F4F6" };
                const rIsim = [r.ad, r.soyad].filter(Boolean).join(" ");
                return (
                  <Link key={r.slug} href={`/feed/${r.slug}`} className="block bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{rInfo.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{r.baslik}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{rIsim} · {r.uzmanlik}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <Link href="/feed" style={{ color: "var(--teal)" }} className="text-sm font-semibold hover:underline">
                Tüm Paylaşımları Gör →
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
