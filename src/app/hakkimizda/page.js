import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Hakkımızda | DoktorPusula",
  description: "DoktorPusula hakkında — Türkiye'nin bağımsız sağlık platformunun hikayesi ve misyonu.",
};

export default function Hakkimizda() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* HERO */}
        <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-20 text-center">
          <div style={{ backgroundColor: "#0E7C7B20", borderColor: "#0E7C7B" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
            <span style={{ color: "#0E7C7B" }} className="text-sm font-medium">🇹🇷 Türkiye'nin Bağımsız Sağlık Platformu</span>
          </div>
          <h1 className="text-white text-4xl font-bold mb-4">Neden DoktorPusula?</h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Türkiye'de sağlık platformları ya yabancı sermayeye ya da reklam geliri için doktor sıralamasını bozan teşviklere dayanıyor.
            Biz farklıyız: tamamen şeffaf, tamamen yerli, tamamen bağımsız.
          </p>
        </section>

        {/* MİSYON */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔒", baslik: "Şeffaflık", aciklama: "Hiçbir yorum silinemez. Doktor sıralaması reklam bütçesine göre değil, gerçek hasta puanına göre yapılır." },
              { icon: "🇹🇷", baslik: "Bağımsızlık", aciklama: "Yabancı sermaye veya platform bağlantısı yoktur. Türk doktorların güvendiği, Türk hastalar için tasarlanmıştır." },
              { icon: "🌍", baslik: "Erişilebilirlik", aciklama: "Türkçe, Farsça, Arapça desteğiyle medikal turistler kendi dilinde hizmet alır." },
            ].map((m) => (
              <div key={m.baslik} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">{m.baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 style={{ color: "#0D2137" }} className="text-2xl font-bold mb-8">İletişim</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4 text-sm text-gray-600">
              {[
                { etiket: "E-posta", deger: "iletisim@doktorpusula.com" },
                { etiket: "Doktor destek", deger: "doktor@doktorpusula.com" },
                { etiket: "Basın", deger: "basin@doktorpusula.com" },
              ].map((item) => (
                <div key={item.etiket} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-400">{item.etiket}</span>
                  <a href={`mailto:${item.deger}`} style={{ color: "#0E7C7B" }} className="font-medium hover:underline">{item.deger}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
