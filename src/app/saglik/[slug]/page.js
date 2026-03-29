import Link from "next/link";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import sql from "@/lib/db";

// Platform makaleleri (statik içerik)
const PLATFORM_MAKALELER = {
  "kulak-cinlamasi-neden-olur": {
    baslik: "Kulak Çınlaması Neden Olur? Nedenleri ve Tedavisi",
    kategori: "KBB",
    yazar: "DoktorPusula.com",
    tarih: "15 Mart 2025",
    okumaSuresi: "6 dk",
    goruntu: "👂",
    icerik: [
      { tip: "giris", metin: "Kulak çınlaması (tinnitus), dışarıdan herhangi bir ses kaynağı olmaksızın kulakta veya kafada hissedilen ses algısıdır. Çınlama, uğultu, vızıltı veya tiz bir ses şeklinde kendini gösterebilir. Türkiye'de yaklaşık 5 milyon kişiyi etkileyen bu durum, hayat kalitesini önemli ölçüde düşürebilir." },
      { tip: "baslik", metin: "Kulak Çınlamasının Başlıca Nedenleri" },
      { tip: "liste", items: ["Gürültüye maruz kalma (konser, iş yeri gürültüsü)", "Yaşa bağlı işitme kaybı", "Kulak kiri tıkanıklığı", "Orta kulak enfeksiyonları", "Meniere hastalığı", "Bazı ilaçların yan etkileri", "Yüksek tansiyon"] },
      { tip: "baslik", metin: "Ne Zaman Doktora Gitmelisiniz?" },
      { tip: "metin", metin: "Kulak çınlaması ani başladıysa, tek taraflıysa veya işitme kaybıyla birlikte geliyorsa vakit kaybetmeden bir KBB uzmanına başvurmanız gerekir." },
      { tip: "kutu", renk: "mavi", metin: "💡 Önemli: Kalıcı çınlamalarda mutlaka uzman değerlendirmesi yapılmalıdır." },
    ],
    faq: [
      { soru: "Kulak çınlaması geçer mi?", cevap: "Nedene bağlıdır. Geçici nedenlerle oluşan çınlamalar genellikle düzelir. Kronik tinnitus kontrol altına alınabilir." },
      { soru: "Hangi doktora gitmeliyim?", cevap: "Kulak Burun Boğaz (KBB) uzmanına başvurmanız gerekir." },
    ],
  },
  "rinoplasti-ne-kadar-surer": {
    baslik: "Rinoplasti Ameliyatı Ne Kadar Sürer? Nelere Dikkat Edilmeli?",
    kategori: "Estetik Cerrahi",
    yazar: "DoktorPusula.com",
    tarih: "10 Mart 2025",
    okumaSuresi: "8 dk",
    goruntu: "👃",
    icerik: [
      { tip: "giris", metin: "Rinoplasti, burun şeklini ve boyutunu değiştiren estetik veya işlevsel bir ameliyattır. Türkiye'de en sık yapılan estetik operasyonlar arasında yer alır." },
      { tip: "baslik", metin: "Ameliyat Ne Kadar Sürer?" },
      { tip: "metin", metin: "Rinoplasti ameliyatı genellikle 2-4 saat sürer. Açık veya kapalı teknik tercihine göre süre değişebilir." },
      { tip: "baslik", metin: "İyileşme Süreci" },
      { tip: "liste", items: ["İlk hafta: Alçı ve şişlik", "2-3. hafta: Sosyal aktivitelere dönüş", "6. ay: Nihai şekil oturur", "1 yıl: Tam iyileşme"] },
      { tip: "kutu", renk: "yesil", metin: "✅ DoktorPusula'da doğrulanmış rinoplasti uzmanlarıyla randevu alın." },
    ],
    faq: [
      { soru: "Rinoplasti kalıcı mı?", cevap: "Evet, kalıcıdır. Ancak yaşlanmayla birlikte minimal değişiklikler olabilir." },
      { soru: "Ne zaman işe dönebilirim?", cevap: "Genellikle 7-10 gün içinde ofis işine dönülebilir." },
    ],
  },
  "uyku-apnesi-belirtileri": {
    baslik: "Uyku Apnesi Belirtileri: Kendinizde Bu İşaretleri Görüyor musunuz?",
    kategori: "KBB",
    yazar: "DoktorPusula.com",
    tarih: "5 Mart 2025",
    okumaSuresi: "5 dk",
    goruntu: "😴",
    icerik: [
      { tip: "giris", metin: "Uyku apnesi, uyku sırasında nefes alıp vermenin defalarca durduğu ciddi bir uyku bozukluğudur. Fark edilmeden yıllarca devam edebilir." },
      { tip: "baslik", metin: "Uyku Apnesi Belirtileri" },
      { tip: "liste", items: ["Yüksek sesle horlama", "Uyku sırasında boğulma hissi", "Sabah baş ağrısı", "Gündüz aşırı uyku hali", "Konsantrasyon güçlüğü", "Gece sık uyanma"] },
      { tip: "kutu", renk: "mavi", metin: "💡 Bu belirtilerin birkaçı varsa mutlaka bir KBB veya uyku uzmanına başvurun." },
    ],
    faq: [
      { soru: "Uyku apnesi tehlikeli midir?", cevap: "Evet, tedavi edilmezse kalp hastalığı, hipertansiyon ve felç riskini artırır." },
    ],
  },
  "botoks-zararli-mi": {
    baslik: "Botoks Zararlı mı? Doğru Bilinen 5 Yanlış",
    kategori: "Estetik Cerrahi",
    yazar: "DoktorPusula.com",
    tarih: "15 Şubat 2025",
    okumaSuresi: "4 dk",
    goruntu: "💉",
    icerik: [
      { tip: "giris", metin: "Botoks (botulinum toksin), yüz kırışıklıklarını azaltmak için en yaygın kullanılan estetik uygulamalardan biridir. Ancak etrafında birçok yanlış inanç dolaşmaktadır." },
      { tip: "baslik", metin: "5 Yaygın Botoks Efsanesi" },
      { tip: "liste", items: ["&apos;Botoks zehirdir&apos; — Kontrollü dozda tamamen güvenlidir", "&apos;Yüz donup kalır&apos; — Doğru uygulamada ifade korunur", "&apos;Bağımlılık yapar&apos; — Tıbbi bağımlılık yoktur", "&apos;Herkes anlıyor&apos; — İyi uygulamada doğal görünür", "&apos;Kalıcıdır&apos; — 4-6 ay içinde etkisi geçer"] },
      { tip: "kutu", renk: "yesil", metin: "✅ Güvenli botoks için mutlaka sertifikalı hekim tercih edin." },
    ],
    faq: [
      { soru: "Botoks ne kadar sürer?", cevap: "Etki genellikle 4-6 ay sürer, kişiden kişiye değişir." },
    ],
  },
  "lasik-lazer-goz": {
    baslik: "Lazer Göz Ameliyatı: LASIK ve LASEK Farkları",
    kategori: "Göz",
    yazar: "DoktorPusula.com",
    tarih: "1 Şubat 2025",
    okumaSuresi: "7 dk",
    goruntu: "👁️",
    icerik: [
      { tip: "giris", metin: "LASIK ve LASEK, miyop, hipermetrop ve astigmat tedavisinde kullanılan iki popüler lazer göz ameliyatı yöntemidir." },
      { tip: "baslik", metin: "LASIK vs LASEK Farkları" },
      { tip: "liste", items: ["LASIK: Flep açılır, hızlı iyileşme (1-2 gün)", "LASEK: Yüzey tedavisi, iyileşme 1 hafta", "LASIK: İnce kornea için uygun olmayabilir", "LASEK: Aktif sporculara daha uygun"] },
      { tip: "kutu", renk: "mavi", metin: "💡 Hangi yöntemin size uygun olduğunu göz muayenesiyle öğrenebilirsiniz." },
    ],
    faq: [
      { soru: "Lazer ameliyatı kalıcı mı?", cevap: "Büyük ölçüde kalıcıdır ancak yaşla birlikte göz numarası değişebilir." },
    ],
  },
  "sac-ekimi-turkiye": {
    baslik: "Saç Ekimi Fiyatları 2025: Türkiye'de Gerçekçi Beklentiler",
    kategori: "Medikal Turizm",
    yazar: "DoktorPusula.com",
    tarih: "8 Şubat 2025",
    okumaSuresi: "6 dk",
    goruntu: "💈",
    icerik: [
      { tip: "giris", metin: "Türkiye, dünya saç ekimi turizminin merkezi haline gelmiştir. Her yıl 500.000'den fazla kişi saç ekimi için Türkiye'yi tercih etmektedir." },
      { tip: "baslik", metin: "2025 Ortalama Fiyatlar" },
      { tip: "liste", items: ["FUE yöntemi: 1.500 - 3.000 €", "DHI yöntemi: 2.000 - 4.000 €", "Safir FUE: 2.000 - 3.500 €", "Avrupa fiyatlarına göre %60-70 daha uygun"] },
      { tip: "kutu", renk: "mavi", metin: "💡 Fiyat tek başına kriter olmamalı — doktor deneyimi ve klinik akreditasyonu da kontrol edin." },
    ],
    faq: [
      { soru: "Saç ekimi acı verir mi?", cevap: "Lokal anestezi altında yapıldığından ameliyat sırasında ağrı hissedilmez." },
    ],
  },
};

function MakaleIcerik({ makale }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center text-7xl mb-6">{makale.goruntu}</div>
      {makale.icerik.map((blok, i) => {
        if (blok.tip === "giris") return (
          <p key={i} className="text-gray-700 leading-relaxed text-lg border-l-4 pl-4 mb-6" style={{ borderColor: "#0E7C7B" }}>{blok.metin}</p>
        );
        if (blok.tip === "baslik") return (
          <h2 key={i} style={{ color: "#0D2137" }} className="text-xl font-bold mt-8 mb-3">{blok.metin}</h2>
        );
        if (blok.tip === "metin") return (
          <p key={i} className="text-gray-600 leading-relaxed mb-4">{blok.metin}</p>
        );
        if (blok.tip === "liste") return (
          <ul key={i} className="space-y-2 mb-6">
            {blok.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                <span style={{ color: "#0E7C7B" }} className="mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        );
        if (blok.tip === "kutu") return (
          <div
            key={i}
            style={blok.renk === "yesil" ? { backgroundColor: "#D1FAE5", borderColor: "#059669" } : { backgroundColor: "#E8F5F5", borderColor: "#0E7C7B" }}
            className="border rounded-xl p-4 mb-6"
          >
            <p className="text-sm leading-relaxed text-gray-700">{blok.metin}</p>
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default async function MakaleSayfasi({ params }) {
  const { slug } = await params;

  // DB makalesi mi?
  if (slug.startsWith("doktor-makalesi-")) {
    const id = parseInt(slug.replace("doktor-makalesi-", ""), 10);
    if (isNaN(id)) notFound();

    const [makale] = await sql`
      SELECT dm.*, d.ad AS doktor_ad, d.uzmanlik, d.slug AS doktor_slug, d.foto_url, d.puan, d.yorum_sayisi
      FROM doktor_medya dm
      JOIN doktorlar d ON d.id = dm.doktor_id
      WHERE dm.id = ${id} AND dm.tip = 'makale'
    `;
    if (!makale) notFound();

    const tarih = makale.yayin_tarihi
      ? new Date(makale.yayin_tarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
      : new Date(makale.olusturulma).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar aktifSayfa="Sağlık Rehberi" />
        <div className="max-w-4xl mx-auto px-6 py-10">
          <p className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link>
            <span className="mx-2">›</span>
            <Link href="/saglik" className="hover:text-gray-600">Sağlık Rehberi</Link>
            <span className="mx-2">›</span>
            <span style={{ color: "#0E7C7B" }}>{makale.uzmanlik}</span>
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs font-medium px-3 py-1 rounded-full">
              {makale.uzmanlik}
            </span>
            <h1 style={{ color: "#0D2137" }} className="text-2xl md:text-3xl font-bold mt-4 mb-4 leading-tight">{makale.baslik}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <Link href={`/doktor/${makale.doktor_slug}`} style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
                👨‍⚕️ {makale.doktor_ad}
              </Link>
              <span>📅 {tarih}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-center text-6xl mb-6">📝</div>
                {makale.aciklama && (
                  <p className="text-gray-700 leading-relaxed text-base border-l-4 pl-4 mb-6" style={{ borderColor: "#0E7C7B" }}>
                    {makale.aciklama}
                  </p>
                )}
                {makale.url && (
                  <a href={makale.url} target="_blank" rel="noopener noreferrer"
                    style={{ color: "#0E7C7B" }} className="text-sm font-medium hover:underline block mt-4">
                    🔗 Makalenin Tamamını Oku →
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center sticky top-6">
                {makale.foto_url ? (
                  <img src={makale.foto_url} alt={makale.doktor_ad} loading="lazy" className="w-16 h-16 rounded-full object-cover mx-auto mb-3" />
                ) : (
                  <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {makale.doktor_ad?.split(" ").slice(-1)[0]?.[0] || "D"}
                  </div>
                )}
                <p className="text-xs text-gray-400 mb-1">Bu makaleyi yazan uzman</p>
                <h3 className="font-bold text-gray-900">{makale.doktor_ad}</h3>
                <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{makale.uzmanlik}</p>
                {makale.yorum_sayisi > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-bold">{makale.puan}</span>
                  </div>
                )}
                <a href={`/doktor/${makale.doktor_slug}`} style={{ backgroundColor: "#0D2137" }}
                  className="block mt-4 text-white text-sm py-2 rounded-xl font-medium hover:opacity-90">
                  Randevu Al
                </a>
              </div>
              <Link href="/saglik" style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }}
                className="block border rounded-xl p-4 text-center text-sm font-medium hover:bg-gray-50">
                ← Tüm Makaleler
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Platform makalesi
  const makale = PLATFORM_MAKALELER[slug];
  if (!makale) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Sağlık Rehberi" />
      <div className="max-w-4xl mx-auto px-6 py-10">

        <p className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link>
          <span className="mx-2">›</span>
          <Link href="/saglik" className="hover:text-gray-600">Sağlık Rehberi</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "#0E7C7B" }}>{makale.kategori}</span>
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs font-medium px-3 py-1 rounded-full">
            {makale.kategori}
          </span>
          <h1 style={{ color: "#0D2137" }} className="text-2xl md:text-3xl font-bold mt-4 mb-4 leading-tight">{makale.baslik}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="font-medium" style={{ color: "#0E7C7B" }}>✍️ {makale.yazar}</span>
            <span>📅 {makale.tarih}</span>
            {makale.okumaSuresi && <span>⏱ {makale.okumaSuresi} okuma</span>}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <MakaleIcerik makale={makale} />

            {makale.faq && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-6">Sık Sorulan Sorular</h2>
                <div className="space-y-4">
                  {makale.faq.map((item, i) => (
                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-2">❓ {item.soru}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.cevap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center sticky top-6">
              <div className="text-4xl mb-3">{makale.goruntu}</div>
              <p className="font-bold text-gray-900 mb-1">DoktorPusula</p>
              <p className="text-xs text-gray-400 mb-4">Editöryal İçerik</p>
              <Link href="/istanbul/kbb-uzmani" style={{ backgroundColor: "#0D2137" }}
                className="block text-white text-sm py-2 rounded-xl font-medium hover:opacity-90">
                Uzman Bul →
              </Link>
            </div>
            <Link href="/saglik" style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }}
              className="block border rounded-xl p-4 text-center text-sm font-medium hover:bg-gray-50">
              ← Tüm Makaleler
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
