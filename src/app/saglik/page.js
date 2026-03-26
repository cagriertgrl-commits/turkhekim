import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import SaglikRehberiIcerik from "./SaglikRehberiIcerik";

export const metadata = {
  title: "Sağlık Rehberi — DoktorPusula",
  description: "Uzman doktorların kaleme aldığı güvenilir, güncel sağlık içerikleri.",
  alternates: { canonical: "https://doktorpusula.com/saglik" },
};

// Platform makaleleri (DoktorPusula.com yazarı)
const PLATFORM_MAKALELER = [
  {
    slug: "kulak-cinlamasi-neden-olur",
    baslik: "Kulak Çınlaması Neden Olur? Nedenleri ve Tedavisi",
    kategori: "KBB",
    ozet: "Tinnitus olarak da bilinen kulak çınlaması, birçok farklı nedenden kaynaklanabilir. Uzman görüşleri ve tedavi yöntemleri.",
    yazar: "DoktorPusula.com",
    tarih: "15 Mart 2025",
    okumaSuresi: "6 dk",
    goruntu: "ear",
    kaynak: "platform",
  },
  {
    slug: "rinoplasti-ne-kadar-surer",
    baslik: "Rinoplasti Ameliyatı Ne Kadar Sürer? Nelere Dikkat Edilmeli?",
    kategori: "Estetik Cerrahi",
    ozet: "Burun estetiği ameliyatı öncesi ve sonrası bilmeniz gereken her şey. İyileşme süreci, riskler ve beklentiler.",
    yazar: "DoktorPusula.com",
    tarih: "10 Mart 2025",
    okumaSuresi: "8 dk",
    goruntu: "nose",
    kaynak: "platform",
  },
  {
    slug: "uyku-apnesi-belirtileri",
    baslik: "Uyku Apnesi Belirtileri: Kendinizde Bu İşaretleri Görüyor musunuz?",
    kategori: "KBB",
    ozet: "Uyku apnesi hayat kalitesini ciddi ölçüde düşürür. Erken teşhis için bu belirtilere dikkat edin.",
    yazar: "DoktorPusula.com",
    tarih: "5 Mart 2025",
    okumaSuresi: "5 dk",
    goruntu: "sleep",
    kaynak: "platform",
  },
  {
    slug: "botoks-zararli-mi",
    baslik: "Botoks Zararlı mı? Doğru Bilinen 5 Yanlış",
    kategori: "Estetik Cerrahi",
    ozet: "Botoks hakkında doğru bilinen yanlışları uzman görüşüyle ele alıyoruz. Güvenli mi, kimlere uygulanır?",
    yazar: "DoktorPusula.com",
    tarih: "15 Şubat 2025",
    okumaSuresi: "4 dk",
    goruntu: "injection",
    kaynak: "platform",
  },
  {
    slug: "lasik-lazer-goz",
    baslik: "Lazer Göz Ameliyatı: LASIK ve LASEK Farkları",
    kategori: "Göz",
    ozet: "Gözlükten ve lenstenden kurtulmak isteyenler için kapsamlı lazer tedavi rehberi.",
    yazar: "DoktorPusula.com",
    tarih: "1 Şubat 2025",
    okumaSuresi: "7 dk",
    goruntu: "eye",
    kaynak: "platform",
  },
  {
    slug: "sac-ekimi-turkiye",
    baslik: "Saç Ekimi Fiyatları 2025: Türkiye'de Gerçekçi Beklentiler",
    kategori: "Medikal Turizm",
    ozet: "Türkiye'de saç ekimi için ortalama maliyetler, klinik seçimi ve dikkat edilmesi gereken noktalar.",
    yazar: "DoktorPusula.com",
    tarih: "8 Şubat 2025",
    okumaSuresi: "6 dk",
    goruntu: "hair",
    kaynak: "platform",
  },
];

export default async function SaglikRehberi() {
  // Doktor makalelerini DB'den çek
  let doktorMakaleleri = [];
  try {
    const rows = await sql`
      SELECT
        dm.id,
        dm.baslik,
        dm.aciklama,
        dm.yayin_tarihi,
        dm.olusturulma,
        d.ad       AS doktor_ad,
        d.uzmanlik AS doktor_uzmanlik,
        d.slug     AS doktor_slug
      FROM doktor_medya dm
      JOIN doktorlar d ON d.id = dm.doktor_id
      WHERE dm.tip = 'makale'
        AND dm.baslik IS NOT NULL
        AND d.onaylandi = true
      ORDER BY COALESCE(dm.yayin_tarihi, dm.olusturulma) DESC
      LIMIT 50
    `;

    doktorMakaleleri = rows.map((r) => ({
      slug: `doktor-makalesi-${r.id}`,
      href: `/saglik/doktor-makalesi-${r.id}`,
      baslik: r.baslik,
      kategori: r.doktor_uzmanlik || "Genel",
      ozet: r.aciklama || "",
      yazar: r.doktor_ad,
      tarih: r.yayin_tarihi
        ? new Date(r.yayin_tarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
        : new Date(r.olusturulma).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
      goruntu: "article",
      kaynak: "doktor",
      doktorSlug: r.doktor_slug,
    }));
  } catch {
    // DB erişilemiyorsa sadece platform makaleleri göster
  }

  // Platform makalelerine href ekle
  const platformMakaleler = PLATFORM_MAKALELER.map((m) => ({
    ...m,
    href: `/saglik/${m.slug}`,
  }));

  // Doktor makaleleri önce, platform makaleleri sonra
  const tumMakaleler = [...doktorMakaleleri, ...platformMakaleler];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Sağlık Rehberi" />

      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: "#4DD9D8" }} className="text-sm font-semibold mb-3 uppercase tracking-widest">Uzman Doktorlardan</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">Sağlık Rehberi</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Doğrulanmış uzman doktorların ve DoktorPusula editörlerinin güvenilir sağlık içerikleri.
          </p>
        </div>
      </div>

      <SaglikRehberiIcerik makaleler={tumMakaleler} />
    </div>
  );
}
