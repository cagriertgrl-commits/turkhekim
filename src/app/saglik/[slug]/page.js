const makaleler = {
  "kulak-cinlamasi-neden-olur": {
    baslik: "Kulak Çınlaması Neden Olur? Nedenleri ve Tedavisi",
    kategori: "KBB",
    yazar: "Dr. Ayşe Kaya",
    yazarSlug: "dr-ayse-kaya",
    tarih: "15 Mart 2025",
    okumaSuresi: "6 dk",
    goruntu: "👂",
    icerik: [
      {
        tip: "giris",
        metin: "Kulak çınlaması (tinnitus), dışarıdan herhangi bir ses kaynağı olmaksızın kulakta veya kafada hissedilen ses algısıdır. Çınlama, uğultu, vızıltı veya tiz bir ses şeklinde kendini gösterebilir. Türkiye'de yaklaşık 5 milyon kişiyi etkileyen bu durum, hayat kalitesini önemli ölçüde düşürebilir."
      },
      {
        tip: "baslik",
        metin: "Kulak Çınlamasının Başlıca Nedenleri"
      },
      {
        tip: "liste",
        items: [
          "Gürültüye maruz kalma (konser, iş yeri gürültüsü)",
          "Yaşa bağlı işitme kaybı (presbycusis)",
          "Kulak kiri tıkanıklığı",
          "Orta kulak enfeksiyonları",
          "Meniere hastalığı",
          "Bazı ilaçların yan etkileri (aspirin, antibiyotikler)",
          "Yüksek tansiyon ve kardiyovasküler sorunlar",
          "Temporomandibüler eklem (çene eklemi) bozuklukları",
        ]
      },
      {
        tip: "baslik",
        metin: "Ne Zaman Doktora Gitmelisiniz?"
      },
      {
        tip: "metin",
        metin: "Kulak çınlaması ani başladıysa, tek taraflıysa, işitme kaybıyla birlikte geliyorsa veya baş dönmesiyle eşlik ediyorsa vakit kaybetmeden bir KBB uzmanına başvurmanız gerekir. Özellikle ani işitme kaybıyla birlikte gelen çınlama bir acil durum kabul edilir ve ilk 72 saat içinde tedavi başlanması kritik önem taşır."
      },
      {
        tip: "kutu",
        renk: "mavi",
        metin: "💡 Önemli: Kulak çınlaması genellikle bir hastalığın semptomu olmakla birlikte, nadir durumlarda akustik nöroma gibi ciddi durumların belirtisi olabilir. Bu nedenle kalıcı çınlamalarda mutlaka uzman değerlendirmesi yapılmalıdır."
      },
      {
        tip: "baslik",
        metin: "Tedavi Yöntemleri"
      },
      {
        tip: "metin",
        metin: "Tinnitus tedavisinde tek bir 'mucize çözüm' yoktur. Tedavi nedene göre şekillenir. Kulak kirine bağlıysa temizlik yeterlidir. Enfeksiyona bağlıysa antibiyotik tedavisi uygulanır. Kronik vakalarda ise ses terapisi (TRT), bilişsel davranışçı terapi (CBT) ve işitme cihazları gibi seçenekler değerlendirilir."
      },
      {
        tip: "kutu",
        renk: "yesil",
        metin: "✅ DoktorPusula'de KBB uzmanı doktorlarımız kulak çınlaması konusunda size yardımcı olmaya hazır. Hemen randevu alın."
      },
    ],
    ilgiliDoktor: { ad: "Dr. Ayşe Kaya", uzmanlik: "KBB Uzmanı", slug: "dr-ayse-kaya", puan: 4.9 },
    faq: [
      { soru: "Kulak çınlaması geçer mi?", cevap: "Nedene bağlıdır. Geçici nedenlerle (gürültü, kulak kiri) oluşan çınlamalar genellikle düzelir. Kronik tinnitus kontrol altına alınabilir ancak tamamen geçmeyebilir." },
      { soru: "Kulak çınlaması ciddi bir hastalık belirtisi midir?", cevap: "Çoğu zaman değildir, ancak ani başlayan, tek taraflı veya işitme kaybıyla birlikte gelen çınlamalarda mutlaka doktora başvurulmalıdır." },
      { soru: "Hangi doktora gitmeliyim?", cevap: "Kulak Burun Boğaz (KBB) uzmanı ya da odyoloji uzmanına başvurmanız gerekir." },
    ]
  }
};

import Navbar from "@/components/Navbar";

export default async function MakaleSayfasi({ params }) {
  const { slug } = await params;
  const makale = makaleler[slug];

  if (!makale) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Makale bulunamadı.</p>
          <a href="/saglik" style={{ color: "#0E7C7B" }} className="text-sm mt-2 block hover:underline">← Sağlık Rehberi'ne Dön</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Sağlık Rehberi" />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* BREADCRUMB */}
        <p className="text-sm text-gray-400 mb-6">
          <a href="/" className="hover:text-gray-600">Ana Sayfa</a>
          <span className="mx-2">›</span>
          <a href="/saglik" className="hover:text-gray-600">Sağlık Rehberi</a>
          <span className="mx-2">›</span>
          <span style={{ color: "#0E7C7B" }}>{makale.kategori}</span>
        </p>

        {/* MAKALE BAŞLIĞI */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs font-medium px-3 py-1 rounded-full">
            {makale.kategori}
          </span>
          <h1 style={{ color: "#0D2137" }} className="text-3xl font-bold mt-4 mb-4 leading-tight">
            {makale.baslik}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <a href={`/doktor/${makale.yazarSlug}`} style={{ color: "#0E7C7B" }} className="font-medium hover:underline">
              ✍️ {makale.yazar}
            </a>
            <span>📅 {makale.tarih}</span>
            <span>⏱ {makale.okumaSuresi} okuma</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* MAKALE İÇERİĞİ */}
          <div className="md:col-span-2 space-y-0">
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
                    style={blok.renk === "yesil"
                      ? { backgroundColor: "#D1FAE5", borderColor: "#059669" }
                      : { backgroundColor: "#E8F5F5", borderColor: "#0E7C7B" }}
                    className="border rounded-xl p-4 mb-6"
                  >
                    <p className="text-sm leading-relaxed text-gray-700">{blok.metin}</p>
                  </div>
                );
                return null;
              })}
            </div>

            {/* SSS */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mt-6">
              <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-6">Sık Sorulan Sorular</h2>
              <div className="space-y-4">
                {makale.faq.map((item, i) => (
                  <div key={i} style={{ borderColor: "#F5F7FA" }} className="border-b pb-4 last:border-0">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">❓ {item.soru}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.cevap}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ — Yazar & Randevu */}
          <div className="md:col-span-1 space-y-4">

            {/* Yazar Kartı */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center sticky top-6">
              <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                AK
              </div>
              <p className="text-xs text-gray-400 mb-1">Bu makaleyi yazan uzman</p>
              <h3 className="font-bold text-gray-900">{makale.ilgiliDoktor.ad}</h3>
              <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{makale.ilgiliDoktor.uzmanlik}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-bold">{makale.ilgiliDoktor.puan}</span>
              </div>
              <a
                href={`/doktor/${makale.ilgiliDoktor.slug}`}
                style={{ backgroundColor: "#0D2137" }}
                className="block mt-4 text-white text-sm py-2 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Randevu Al
              </a>
            </div>

            {/* Geri Dön */}
            <a
              href="/saglik"
              style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }}
              className="block border rounded-xl p-4 text-center text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              ← Tüm Makaleler
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
