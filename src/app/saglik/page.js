const makaleler = [
  {
    slug: "kulak-cinlamasi-neden-olur",
    baslik: "Kulak Çınlaması Neden Olur? Nedenleri ve Tedavisi",
    kategori: "KBB",
    ozet: "Tinnitus olarak da bilinen kulak çınlaması, birçok farklı nedenden kaynaklanabilir. Uzman görüşleri ve tedavi yöntemleri.",
    yazar: "Dr. Ayşe Kaya",
    tarih: "15 Mart 2025",
    okumaSuresi: "6 dk",
    goruntu: "👂",
  },
  {
    slug: "rinoplasti-ne-kadar-surer",
    baslik: "Rinoplasti Ameliyatı Ne Kadar Sürer? Nelere Dikkat Edilmeli?",
    kategori: "Estetik Cerrahi",
    ozet: "Burun estetiği ameliyatı öncesi ve sonrası bilmeniz gereken her şey. İyileşme süreci, riskler ve beklentiler.",
    yazar: "Dr. Mehmet Demir",
    tarih: "10 Mart 2025",
    okumaSuresi: "8 dk",
    goruntu: "👃",
  },
  {
    slug: "uyku-apnesi-belirtileri",
    baslik: "Uyku Apnesi Belirtileri: Kendinizde Bu İşaretleri Görüyor musunuz?",
    kategori: "KBB",
    ozet: "Uyku apnesi hayat kalitesini ciddi ölçüde düşürür. Erken teşhis için bu belirtilere dikkat edin.",
    yazar: "Dr. Ayşe Kaya",
    tarih: "5 Mart 2025",
    okumaSuresi: "5 dk",
    goruntu: "😴",
  },
  {
    slug: "septum-deviasyonu-ameliyati",
    baslik: "Septum Deviasyonu Ameliyatı: Septoplasti Hakkında Her Şey",
    kategori: "KBB",
    ozet: "Burun tıkanıklığının en yaygın nedeni olan septum eğriliği için cerrahi tedavi seçenekleri.",
    yazar: "Dr. Fatma Yıldız",
    tarih: "28 Şubat 2025",
    okumaSuresi: "7 dk",
    goruntu: "🏥",
  },
  {
    slug: "cocuklarda-geniz-eti",
    baslik: "Çocuklarda Geniz Eti: Belirtiler, Teşhis ve Tedavi Yöntemleri",
    kategori: "Çocuk KBB",
    ozet: "Adenoid hipertrofisi olarak da bilinen geniz eti büyümesi çocuklarda sık görülür. İşte ebeveynlerin bilmesi gerekenler.",
    yazar: "Dr. Ayşe Kaya",
    tarih: "20 Şubat 2025",
    okumaSuresi: "6 dk",
    goruntu: "👶",
  },
  {
    slug: "botoks-zararlı-mi",
    baslik: "Botoks Zararlı mı? Doğru Bilinen 5 Yanlış",
    kategori: "Estetik",
    ozet: "Botoks hakkında doğru bilinen yanlışları uzman görüşüyle ele alıyoruz. Güvenli mi, kimlere uygulanır?",
    yazar: "Dr. Mehmet Demir",
    tarih: "15 Şubat 2025",
    okumaSuresi: "4 dk",
    goruntu: "💉",
  },
];

const kategoriler = ["Tümü", "KBB", "Estetik Cerrahi", "Çocuk KBB", "Estetik", "Göz", "Ortopedi"];

import Navbar from "@/components/Navbar";

export default function SaglikRehberi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Sağlık Rehberi" />

      {/* BAŞLIK */}
      <div style={{ backgroundColor: "#0D2137" }} className="px-6 py-14">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-white text-4xl font-bold mb-4">Sağlık Rehberi</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Uzman doktorlarımızın kaleme aldığı, güvenilir ve güncel sağlık içerikleri.
          </p>
          <div className="mt-6 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Makale ara... (örn: kulak çınlaması)"
              className="w-full bg-white rounded-xl px-5 py-3 text-sm focus:outline-none shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* KATEGORİLER */}
        <div className="flex flex-wrap gap-2 mb-8">
          {kategoriler.map((kat) => (
            <button
              key={kat}
              style={kat === "Tümü" ? { backgroundColor: "#0D2137", color: "white" } : { backgroundColor: "white", color: "#6B7280" }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-400 transition-colors"
            >
              {kat}
            </button>
          ))}
        </div>

        {/* ÖNE ÇIKAN MAKALE */}
        <a href={`/saglik/${makaleler[0].slug}`} className="block mb-8">
          <div style={{ backgroundColor: "#0D2137" }} className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 hover:opacity-95 transition-opacity">
            <div className="text-8xl">{makaleler[0].goruntu}</div>
            <div>
              <span style={{ backgroundColor: "#0E7C7B20", color: "#0E7C7B", borderColor: "#0E7C7B" }} className="border text-xs font-medium px-3 py-1 rounded-full">
                {makaleler[0].kategori}
              </span>
              <h2 className="text-white text-2xl font-bold mt-3 mb-2">{makaleler[0].baslik}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{makaleler[0].ozet}</p>
              <div className="flex items-center gap-4 text-gray-500 text-xs">
                <span>✍️ {makaleler[0].yazar}</span>
                <span>📅 {makaleler[0].tarih}</span>
                <span>⏱ {makaleler[0].okumaSuresi}</span>
              </div>
            </div>
          </div>
        </a>

        {/* MAKALE LİSTESİ */}
        <div className="grid md:grid-cols-3 gap-6">
          {makaleler.slice(1).map((makale) => (
            <a key={makale.slug} href={`/saglik/${makale.slug}`} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div style={{ backgroundColor: "#F5F7FA" }} className="h-36 flex items-center justify-center text-6xl">
                {makale.goruntu}
              </div>
              <div className="p-5">
                <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs font-medium px-2 py-1 rounded-full">
                  {makale.kategori}
                </span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2 text-sm leading-snug line-clamp-2">{makale.baslik}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">{makale.ozet}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{makale.yazar}</span>
                  <span>⏱ {makale.okumaSuresi}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
