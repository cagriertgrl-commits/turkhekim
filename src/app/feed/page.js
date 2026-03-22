import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import sql from "@/lib/db";
import Link from "next/link";

export const metadata = {
  title: "Sağlık Haberleri & Doktor Paylaşımları | DoktorPusula",
  description: "Uzman doktorlardan sağlık ipuçları, tedavi bilgileri ve güncel sağlık haberleri. DoktorPusula güvencesiyle.",
};

const KATEGORI_MAP = {
  "saglik-ipucu": { etiket: "Sağlık İpucu", emoji: "💡", renk: "#0E7490", bg: "#CFFAFE" },
  "haber": { etiket: "Haber", emoji: "📰", renk: "#1D4ED8", bg: "#DBEAFE" },
  "duyuru": { etiket: "Duyuru", emoji: "📢", renk: "#7C3AED", bg: "#EDE9FE" },
  "tedavi": { etiket: "Tedavi", emoji: "💊", renk: "#059669", bg: "#D1FAE5" },
  "beslenme": { etiket: "Beslenme", emoji: "🥗", renk: "#D97706", bg: "#FEF3C7" },
  "egzersiz": { etiket: "Egzersiz", emoji: "🏃", renk: "#DC2626", bg: "#FEE2E2" },
};

function kategoriInfo(k) {
  return KATEGORI_MAP[k] || { etiket: k, emoji: "📄", renk: "#6B7280", bg: "#F3F4F6" };
}

function feedOzet(icerik, uzunluk = 180) {
  if (!icerik) return "";
  const temiz = icerik.replace(/\s+/g, " ").trim();
  return temiz.length <= uzunluk ? temiz : temiz.slice(0, uzunluk).trimEnd() + "…";
}

function okumaSuresi(icerik) {
  if (!icerik) return 1;
  return Math.max(1, Math.ceil(icerik.trim().split(/\s+/).length / 200));
}

function tarihFormat(tarih) {
  return new Date(tarih).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function FeedPage({ searchParams }) {
  const sp = await searchParams;
  const aktifKategori = KATEGORI_MAP[sp?.kategori] ? sp.kategori : null;

  let paylasilar;
  if (aktifKategori) {
    paylasilar = await sql`
      SELECT p.id, p.slug, p.baslik, p.icerik, p.kategori, p.okunma, p.created_at,
             d.ad, d.soyad, d.unvan, d.uzmanlik, d.sehir, d.slug as doktor_slug, d.foto_url
      FROM paylasilar p
      JOIN doktorlar d ON d.id = p.doktor_id
      WHERE p.yayinda = true AND d.onaylandi = true AND p.kategori = ${aktifKategori}
      ORDER BY p.created_at DESC
      LIMIT 30
    `.catch(() => []);
  } else {
    paylasilar = await sql`
      SELECT p.id, p.slug, p.baslik, p.icerik, p.kategori, p.okunma, p.created_at,
             d.ad, d.soyad, d.unvan, d.uzmanlik, d.sehir, d.slug as doktor_slug, d.foto_url
      FROM paylasilar p
      JOIN doktorlar d ON d.id = p.doktor_id
      WHERE p.yayinda = true AND d.onaylandi = true
      ORDER BY p.created_at DESC
      LIMIT 30
    `.catch(() => []);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Feed" />

      {/* BAŞLIK */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }} className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-3xl font-bold mb-3">Sağlık Haberleri</h1>
          <p className="text-gray-300 text-sm">Uzman doktorlardan güncel sağlık içerikleri</p>
        </div>
      </div>

      {/* KATEGORİ FİLTRESİ */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/feed"
            className={`text-sm px-4 py-2 rounded-full border transition-colors ${!aktifKategori ? "border-teal-500 text-teal-700 bg-teal-50 font-semibold" : "border-gray-200 text-gray-600 hover:border-teal-300"}`}
          >
            Tümü
          </Link>
          {Object.entries(KATEGORI_MAP).map(([slug, info]) => (
            <Link
              key={slug}
              href={`/feed?kategori=${slug}`}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${aktifKategori === slug ? "font-semibold" : "border-gray-200 text-gray-600 hover:border-teal-300"}`}
              style={aktifKategori === slug ? { borderColor: info.renk, color: info.renk, backgroundColor: info.bg } : {}}
            >
              {info.emoji} {info.etiket}
            </Link>
          ))}
        </div>
      </div>

      {/* İÇERİK */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {paylasilar.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-gray-700 font-bold text-lg mb-2">Henüz Paylaşım Yok</h3>
            <p className="text-gray-400 text-sm">Bu kategoride henüz bir paylaşım yapılmamış.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {paylasilar.map((p) => {
              const info = kategoriInfo(p.kategori);
              const tamIsim = [p.ad, p.soyad].filter(Boolean).join(" ");
              const initials = tamIsim.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "DR";
              return (
                <article key={p.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  {/* Kategori badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: info.bg, color: info.renk }}
                    >
                      {info.emoji} {info.etiket}
                    </span>
                    <span className="text-gray-400 text-xs">{tarihFormat(p.created_at)}</span>
                    <span className="text-gray-400 text-xs">· {okumaSuresi(p.icerik)} dk okuma</span>
                    {p.okunma > 0 && (
                      <span className="text-gray-400 text-xs">· {p.okunma} okunma</span>
                    )}
                  </div>

                  <h2 className="text-gray-900 font-bold text-xl mb-3 leading-snug">
                    {p.baslik}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    {feedOzet(p.icerik)}
                  </p>

                  {/* Yazar */}
                  <div className="flex items-center justify-between">
                    <Link href={`/doktor/${p.doktor_slug}`} className="flex items-center gap-3 group">
                      {p.foto_url ? (
                        <img src={p.foto_url} alt={tamIsim} className="w-10 h-10 rounded-full object-cover border-2 border-gray-100" />
                      ) : (
                        <div style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                          {initials}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                          {p.unvan ? `${p.unvan} ${tamIsim}` : tamIsim}
                        </p>
                        <p className="text-xs text-gray-500">{p.uzmanlik}{p.sehir ? ` · ${p.sehir}` : ""}</p>
                      </div>
                    </Link>
                    <Link
                      href={`/feed/${p.slug}`}
                      style={{ color: "var(--teal)" }}
                      className="text-sm font-semibold hover:underline"
                    >
                      Devamını Oku →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
