import Link from "next/link";
import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import { AVUKAT_UZMANLIK_ALANLARI } from "@/lib/hukukKategorileri";

export const metadata = {
  title: "Sağlık Hukuku Avukatları | TurkHekim",
  description:
    "Malpraktis, sağlıkta reklam mevzuatı, TİTCK, SGK ve KVKK konularında uzmanlaşmış anlaşmalı avukatlar.",
  alternates: { canonical: "https://turkhekim.com/hukuk/avukatlar" },
};

export const dynamic = "force-dynamic";

export default async function AvukatListesi({ searchParams }) {
  const params = await searchParams;
  const uzmanlik = params?.uzmanlik?.toString() || "";
  const sehir = params?.sehir?.toString() || "";

  let avukatlar = [];
  try {
    if (uzmanlik && sehir) {
      avukatlar = await sql`
        SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
        FROM avukatlar
        WHERE aktif = true
          AND uzmanlik_alanlari ILIKE ${"%" + uzmanlik + "%"}
          AND sehir ILIKE ${"%" + sehir + "%"}
        ORDER BY deneyim_yil DESC LIMIT 60
      `;
    } else if (uzmanlik) {
      avukatlar = await sql`
        SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
        FROM avukatlar
        WHERE aktif = true AND uzmanlik_alanlari ILIKE ${"%" + uzmanlik + "%"}
        ORDER BY deneyim_yil DESC LIMIT 60
      `;
    } else if (sehir) {
      avukatlar = await sql`
        SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
        FROM avukatlar
        WHERE aktif = true AND sehir ILIKE ${"%" + sehir + "%"}
        ORDER BY deneyim_yil DESC LIMIT 60
      `;
    } else {
      avukatlar = await sql`
        SELECT id, slug, ad, soyad, uzmanlik_alanlari, sehir, deneyim_yil, foto_url, saatlik_ucret, hakkinda
        FROM avukatlar
        WHERE aktif = true
        ORDER BY deneyim_yil DESC LIMIT 60
      `;
    }
  } catch (err) {
    console.error("Avukat listesi hatası:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Sağlık Hukuku Avukatları</h1>
          <p className="text-gray-300">Sağlık sektörüne özel uzmanlaşmış avukat ağımız.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <form className="bg-white rounded-xl border border-gray-200 p-4 mb-6 grid sm:grid-cols-3 gap-3" method="GET">
          <select name="uzmanlik" defaultValue={uzmanlik} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="">Tüm uzmanlık alanları</option>
            {AVUKAT_UZMANLIK_ALANLARI.map((u) => (
              <option key={u.kod} value={u.ad}>{u.ad}</option>
            ))}
          </select>
          <input
            type="text"
            name="sehir"
            defaultValue={sehir}
            placeholder="Şehir (örn: İstanbul)"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            style={{ backgroundColor: "var(--teal)" }}
            className="text-white rounded-lg px-3 py-2 font-semibold text-sm hover:opacity-90"
          >
            Filtrele
          </button>
        </form>

        {avukatlar.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold mb-1">Sonuç bulunamadı</p>
            <p className="text-sm">Henüz aktif avukat yok veya filtrelerle eşleşen avukat yok.</p>
            <Link href="/hukuk/danismanlik-talep" className="inline-block mt-4 underline text-sm" style={{ color: "var(--teal)" }}>
              Danışmanlık talebi gönder
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {avukatlar.map((a) => (
              <Link
                key={a.id}
                href={`/hukuk/avukat/${a.slug}`}
                className="bg-white rounded-xl border border-gray-200 hover:border-teal-400 transition p-5 flex gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                  {a.foto_url ? (
                    <img src={a.foto_url} alt={`Av. ${a.ad} ${a.soyad}`} className="w-full h-full object-cover" />
                  ) : (
                    "👨‍⚖️"
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold" style={{ color: "var(--navy)" }}>Av. {a.ad} {a.soyad}</h3>
                  <p className="text-xs text-gray-500 mb-1">{a.sehir || "—"} · {a.deneyim_yil || 0} yıl deneyim</p>
                  <p className="text-xs text-gray-700 line-clamp-2">{a.uzmanlik_alanlari}</p>
                  {a.saatlik_ucret && (
                    <p className="text-xs mt-2 font-semibold" style={{ color: "var(--teal)" }}>
                      ₺{Number(a.saatlik_ucret).toLocaleString("tr-TR")}/saat
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
