import Navbar from "@/components/Navbar";
import AramaKutusu from "@/components/AramaKutusu";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div style={{ backgroundColor: "#0E7C7B20", borderColor: "#0E7C7B" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
            <span style={{ color: "#0E7C7B" }} className="text-sm font-medium">🇹🇷 Türkiye'nin Bağımsız Sağlık Platformu</span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Doğru Hekime<br />
            <span style={{ color: "#0E7C7B" }}>Güvenle Ulaş</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Doğrulanmış yorumlar, şeffaf profiller ve kolay randevu. Yabancı sermayeden bağımsız, Türkiye'nin sağlık otoritesi.
          </p>

          {/* ARAMA KUTUSU */}
          <AramaKutusu />
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ backgroundColor: "#0E7C7B" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { sayi: "180K+", etiket: "Kayıtlı Hekim" },
              { sayi: "500+", etiket: "Doğrulanmış Yorum" },
              { sayi: "5 Dil", etiket: "Çok Dilli Destek" },
              { sayi: "81 İl", etiket: "Türkiye Geneli" },
            ].map((item) => (
              <div key={item.etiket}>
                <div className="text-3xl font-bold">{item.sayi}</div>
                <div className="text-sm opacity-80 mt-1">{item.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN TURKHEKİM */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-4">Neden TurkHekim?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Mevcut platformların çözemediği sorunları çözüyoruz.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "✅",
                baslik: "Doğrulanmış Yorumlar",
                aciklama: "Her yorum telefon numarasıyla doğrulanır. Hiçbir yorum silinemez. Şeffaflık ilkemiz vazgeçilmezdir.",
              },
              {
                icon: "🇹🇷",
                baslik: "Tamamen Yerli",
                aciklama: "Hiçbir yabancı sermaye veya platform bağlantısı yok. Türk doktorların güvendiği, Türk hastalar için.",
              },
              {
                icon: "🌍",
                baslik: "Çok Dilli Destek",
                aciklama: "Türkçe, Farsça, Arapça, Azerbaycan Türkçesi. Medikal turistler kendi dilinde rehberlik alır.",
              },
              {
                icon: "📅",
                baslik: "Kolay Randevu",
                aciklama: "Doktor profilinden direkt randevu al. SMS ve email ile otomatik hatırlatma.",
              },
              {
                icon: "🏥",
                baslik: "Medikal Turizm",
                aciklama: "İranlı, Arap ve Orta Asyalı hastalar için özel portal. Paket hizmetler, tercüman, transfer.",
              },
              {
                icon: "🔒",
                baslik: "KVKK Uyumlu",
                aciklama: "Sağlık verileriniz Türkiye sunucularında şifreli tutulur. Kişisel verileriniz güvende.",
              },
            ].map((kart) => (
              <div key={kart.baslik} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{kart.icon}</div>
                <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">{kart.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{kart.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOKTOR KARTLARI */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold">Öne Çıkan Doktorlar</h2>
            <a href="#" style={{ color: "#0E7C7B" }} className="text-sm font-medium hover:underline">Tümünü Gör →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { ad: "Dr. Ayşe Kaya", uzmanlik: "KBB Uzmanı", sehir: "İstanbul", puan: 4.9, yorum: 127, deneyim: "12 yıl" },
              { ad: "Dr. Mehmet Demir", uzmanlik: "Plastik Cerrah", sehir: "Ankara", puan: 4.8, yorum: 94, deneyim: "15 yıl" },
              { ad: "Dr. Fatma Yıldız", uzmanlik: "Göz Hastalıkları", sehir: "İzmir", puan: 4.9, yorum: 203, deneyim: "18 yıl" },
            ].map((doktor) => (
              <div key={doktor.ad} className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg">
                    {doktor.ad.split(" ")[1][0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{doktor.ad}</h3>
                    <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                    <p className="text-gray-400 text-xs">{doktor.sehir} · {doktor.deneyim}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold text-sm">{doktor.puan}</span>
                  <span className="text-gray-400 text-xs">({doktor.yorum} doğrulanmış yorum)</span>
                </div>
                <button style={{ backgroundColor: "#0D2137" }} className="w-full text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Randevu Al
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOKTOR İÇİN */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-3xl font-bold mb-4">Siz de TurkHekim'de Yerinizi Alın</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                180.000'den fazla Türk hekimi arasında öne çıkın. Ücretsiz profilinizi oluşturun, randevu takviminizi yönetin ve hasta tabanınızı büyütün.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Ücretsiz profil oluşturma",
                  "Doğrulanmış hasta yorumları",
                  "Online randevu takvimi",
                  "Çok dilli hasta erişimi",
                ].map((madde) => (
                  <div key={madde} className="flex items-center gap-3">
                    <span style={{ color: "#0E7C7B" }} className="text-lg">✓</span>
                    <span className="text-gray-300 text-sm">{madde}</span>
                  </div>
                ))}
              </div>
              <a href="#" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                Ücretsiz Kayıt Ol
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { sayi: "1.500 TL", etiket: "Aylık Pro Paket" },
                { sayi: "3x", etiket: "Daha Fazla Hasta" },
                { sayi: "%8-12", etiket: "Medikal Turizm Komisyonu" },
                { sayi: "7/24", etiket: "Destek" },
              ].map((item) => (
                <div key={item.etiket} style={{ backgroundColor: "#ffffff10", borderColor: "#ffffff20" }} className="border rounded-xl p-5 text-center">
                  <div style={{ color: "#0E7C7B" }} className="text-2xl font-bold">{item.sayi}</div>
                  <div className="text-gray-400 text-xs mt-1">{item.etiket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#060F1A" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ backgroundColor: "#0E7C7B" }} className="w-7 h-7 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">TH</span>
                </div>
                <span className="text-white font-bold">TurkHekim</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">Türkiye'nin bağımsız, şeffaf sağlık otorite platformu.</p>
            </div>
            {[
              { baslik: "Platform", linkler: ["Doktor Bul", "Sağlık Rehberi", "Medikal Turizm", "Klinikler"] },
              { baslik: "Doktorlar", linkler: ["Ücretsiz Profil", "Pro Paket", "Klinik Paketi", "Turizm Paketi"] },
              { baslik: "Kurumsal", linkler: ["Hakkımızda", "Gizlilik", "Kullanım Koşulları", "İletişim"] },
            ].map((kolon) => (
              <div key={kolon.baslik}>
                <h4 className="text-white font-medium mb-4 text-sm">{kolon.baslik}</h4>
                <ul className="space-y-2">
                  {kolon.linkler.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderColor: "#ffffff10" }} className="border-t pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-xs">© 2025 TurkHekim.com — Tüm hakları saklıdır.</p>
            <p className="text-gray-600 text-xs mt-2 md:mt-0">🇹🇷 Türkiye'de geliştirildi</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
