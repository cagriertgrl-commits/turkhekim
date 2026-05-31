import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p = await params;
  try {
    const [m] = await sql`SELECT baslik, ozet, slug FROM hukuki_makaleler WHERE slug = ${p.slug} AND yayinda = true`;
    if (!m) return { title: "Makale Bulunamadı | TurkHekim" };
    return {
      title: `${m.baslik} | TurkHekim Hukuk`,
      description: m.ozet || m.baslik,
      alternates: { canonical: `https://turkhekim.com/hukuk/makale/${m.slug}` },
      openGraph: { title: m.baslik, description: m.ozet || "" },
    };
  } catch {
    return { title: "TurkHekim Hukuk" };
  }
}

function basitMarkdownToHtml(md) {
  if (!md) return "";
  const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escape(md)
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-7 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/\n\n/g, '</p><p class="my-3">')
    .replace(/^(.+)$/m, '<p class="my-3">$1</p>');
}

export default async function MakaleDetay({ params }) {
  const p = await params;
  let makale;
  try {
    [makale] = await sql`
      SELECT m.*, a.ad AS yazar_ad, a.soyad AS yazar_soyad, a.slug AS yazar_slug, a.foto_url AS yazar_foto
      FROM hukuki_makaleler m
      LEFT JOIN avukatlar a ON a.id = m.yazar_avukat_id
      WHERE m.slug = ${p.slug} AND m.yayinda = true
    `;
  } catch (err) {
    console.error("Makale detay hatası:", err);
  }

  if (!makale) notFound();

  try {
    await sql`UPDATE hukuki_makaleler SET goruntulenme = goruntulenme + 1 WHERE id = ${makale.id}`;
  } catch {}

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: makale.baslik,
    description: makale.ozet || "",
    datePublished: makale.yayin_tarihi,
    dateModified: makale.updated_at,
    author: makale.yazar_ad ? { "@type": "Person", name: `Av. ${makale.yazar_ad} ${makale.yazar_soyad || ""}` } : undefined,
    publisher: { "@type": "Organization", name: "TurkHekim" },
    articleSection: makale.kategori,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-3xl mx-auto px-6 py-10">
        <Link href="/hukuk/makaleler" className="text-xs text-gray-500 hover:underline">← Tüm makaleler</Link>

        <div className="mt-3 mb-2 text-xs font-semibold uppercase" style={{ color: "var(--teal)" }}>
          {makale.kategori}
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ color: "var(--navy)" }}>{makale.baslik}</h1>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-6">
          {makale.yazar_ad && (
            <Link href={`/hukuk/avukat/${makale.yazar_slug}`} className="flex items-center gap-2 hover:underline">
              {makale.yazar_foto ? (
                <img src={makale.yazar_foto} alt="" className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">👨‍⚖️</span>
              )}
              <span>Av. {makale.yazar_ad} {makale.yazar_soyad || ""}</span>
            </Link>
          )}
          <span>·</span>
          <span>{new Date(makale.yayin_tarihi).toLocaleDateString("tr-TR")}</span>
          <span>·</span>
          <span>{makale.goruntulenme + 1} okunma</span>
        </div>

        {makale.ozet && (
          <p className="text-lg text-gray-700 border-l-4 pl-4 mb-6" style={{ borderColor: "var(--teal)" }}>
            {makale.ozet}
          </p>
        )}

        <div
          className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: basitMarkdownToHtml(makale.icerik_markdown) }}
        />

        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900">
            ⚖️ Bu makale genel bilgilendirme amaçlıdır. Somut hukuki süreçleriniz için
            <Link href="/hukuk/danismanlik-talep" className="underline mx-1">anlaşmalı avukatlarımızdan</Link>
            danışmanlık alabilirsiniz.
          </div>
        </div>
      </article>
    </div>
  );
}
