"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

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
    kategori: "Çocuk Sağlığı",
    ozet: "Adenoid hipertrofisi olarak da bilinen geniz eti büyümesi çocuklarda sık görülür. İşte ebeveynlerin bilmesi gerekenler.",
    yazar: "Dr. Ayşe Kaya",
    tarih: "20 Şubat 2025",
    okumaSuresi: "6 dk",
    goruntu: "👶",
  },
  {
    slug: "botoks-zararli-mi",
    baslik: "Botoks Zararlı mı? Doğru Bilinen 5 Yanlış",
    kategori: "Estetik Cerrahi",
    ozet: "Botoks hakkında doğru bilinen yanlışları uzman görüşüyle ele alıyoruz. Güvenli mi, kimlere uygulanır?",
    yazar: "Dr. Mehmet Demir",
    tarih: "15 Şubat 2025",
    okumaSuresi: "4 dk",
    goruntu: "💉",
  },
  {
    slug: "saç-ekimi-fiyatlari",
    baslik: "Saç Ekimi Fiyatları 2025: Türkiye'de Gerçekçi Beklentiler",
    kategori: "Medikal Turizm",
    ozet: "Türkiye'de saç ekimi için ortalama maliyetler, klinik seçimi ve dikkat edilmesi gereken noktalar.",
    yazar: "Dr. Mehmet Demir",
    tarih: "8 Şubat 2025",
    okumaSuresi: "6 dk",
    goruntu: "💈",
  },
  {
    slug: "lazer-goz-ameliyati",
    baslik: "Lazer Göz Ameliyatı: LASIK ve LASEK Farkları",
    kategori: "Göz",
    ozet: "Gözlükten ve lenstenden kurtulmak isteyenler için kapsamlı lazer tedavi rehberi.",
    yazar: "Dr. Fatma Yıldız",
    tarih: "1 Şubat 2025",
    okumaSuresi: "7 dk",
    goruntu: "👁️",
  },
];

const kategoriler = ["Tümü", "KBB", "Estetik Cerrahi", "Çocuk Sağlığı", "Göz", "Medikal Turizm"];

const kategoriRenkler = {
  "KBB": { bg: "#EFF6FF", text: "#2563EB" },
  "Estetik Cerrahi": { bg: "#FDF4FF", text: "#9333EA" },
  "Çocuk Sağlığı": { bg: "#FFFBEB", text: "#D97706" },
  "Göz": { bg: "#F0FDFA", text: "#0E7C7B" },
  "Medikal Turizm": { bg: "#FFF1F2", text: "#E11D48" },
};

export default function SaglikRehberi() {
  const [aktifKat, setAktifKat] = useState("Tümü");
  const [arama, setArama] = useState("");

  const filtreli = makaleler.filter((m) => {
    const katFiltre = aktifKat === "Tümü" || m.kategori === aktifKat;
    const aramaFiltre = arama === "" || m.baslik.toLowerCase().includes(arama.toLowerCase()) || m.ozet.toLowerCase().includes(arama.toLowerCase());
    return katFiltre && aramaFiltre;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar aktifSayfa="Sağlık Rehberi" />

      {/* BAŞLIK */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p style={{ color: "#4DD9D8" }} className="text-sm font-semibold mb-3 uppercase tracking-widest">Uzman Doktorlardan</p>
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Sağlık Rehberi</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Doğrulanmış uzman doktorların kaleme aldığı güvenilir, güncel sağlık içerikleri.
          </p>
          <div className="max-w-lg mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              placeholder="Makale ara... (örn: kulak çınlaması)"
              className="w-full bg-white rounded-2xl pl-10 pr-5 py-3.5 text-sm focus:outline-none shadow-xl"
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
              onClick={() => setAktifKat(kat)}
              style={
                aktifKat === kat
                  ? { backgroundColor: "#0D2137", color: "white", borderColor: "#0D2137" }
                  : { backgroundColor: "white", color: "#6B7280", borderColor: "#E5E7EB" }
              }
              className="px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:border-gray-400"
            >
              {kat}
            </button>
          ))}
        </div>

        {filtreli.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">Bu kategoride henüz makale yok.</p>
          </div>
        ) : (
          <>
            {/* ÖNE ÇIKAN MAKALE */}
            {aktifKat === "Tümü" && arama === "" && (
              <Link href={`/saglik/${makaleler[0].slug}`} className="block mb-8 group">
                <div style={{ background: "linear-gradient(135deg, #0D2137, #0a3d62)" }} className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 hover:opacity-95 transition-opacity">
                  <div className="text-8xl flex-shrink-0 w-32 h-32 flex items-center justify-center bg-white bg-opacity-10 rounded-2xl">
                    {makaleler[0].goruntu}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        style={{ backgroundColor: "#0E7C7B30", color: "#4DD9D8", borderColor: "#0E7C7B50" }}
                        className="border text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {makaleler[0].kategori}
                      </span>
                      <span className="text-gray-500 text-xs">Öne Çıkan</span>
                    </div>
                    <h2 className="text-white text-xl md:text-2xl font-bold mb-3 group-hover:text-teal-300 transition-colors">
                      {makaleler[0].baslik}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{makaleler[0].ozet}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-xs">
                      <span>✍️ {makaleler[0].yazar}</span>
                      <span>📅 {makaleler[0].tarih}</span>
                      <span>⏱ {makaleler[0].okumaSuresi}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* MAKALE LİSTESİ */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(aktifKat === "Tümü" && arama === "" ? filtreli.slice(1) : filtreli).map((makale) => {
                const renk = kategoriRenkler[makale.kategori] || { bg: "#F5F7FA", text: "#6B7280" };
                return (
                  <Link
                    key={makale.slug}
                    href={`/saglik/${makale.slug}`}
                    className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden border border-gray-100 group"
                  >
                    <div style={{ backgroundColor: renk.bg }} className="h-40 flex items-center justify-center text-7xl">
                      {makale.goruntu}
                    </div>
                    <div className="p-5">
                      <span
                        style={{ backgroundColor: renk.bg, color: renk.text }}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        {makale.kategori}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-3 mb-2 text-sm leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                        {makale.baslik}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">{makale.ozet}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3">
                        <span className="font-medium text-gray-600">{makale.yazar}</span>
                        <span>⏱ {makale.okumaSuresi}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* DOKTOR CTA */}
        <div style={{ backgroundColor: "#F0FDFA", borderColor: "#0E7C7B30" }} className="border rounded-2xl p-8 text-center mt-12">
          <p className="text-2xl mb-3">🩺</p>
          <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">Siz de Makale Yazın</h3>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            Uzman doktor olarak sağlık içerikleri üretin, hasta tabanınızı genişletin ve otoritenizi artırın.
          </p>
          <Link
            href="/doktor-ol"
            style={{ backgroundColor: "#0E7C7B" }}
            className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Doktor Olarak Katıl
          </Link>
        </div>

      </div>
    </div>
  );
}
