export const metadata = {
  title: "تورك حكيم — منصة الصحة في تركيا",
  description: "ابحث عن أفضل الأطباء في تركيا. حجز مواعيد أونلاين، آراء موثقة، دعم عربي كامل. السياحة الطبية إلى تركيا.",
  alternates: {
    canonical: "https://doktorpusula.com/ar",
    languages: { "tr": "https://doktorpusula.com", "ar": "https://doktorpusula.com/ar" },
  },
};

const tedaviler = [
  { icon: "👃", ad: "تجميل الأنف", fiyat: "٢٠٠٠ - ٥٠٠٠ دولار" },
  { icon: "🦷", ad: "طب الأسنان", fiyat: "٥٠٠ - ٣٠٠٠ دولار" },
  { icon: "💇", ad: "زراعة الشعر", fiyat: "١٥٠٠ - ٣٥٠٠ دولار" },
  { icon: "👁️", ad: "جراحة العيون", fiyat: "١٠٠٠ - ٢٥٠٠ دولار" },
  { icon: "💉", ad: "الجراحة التجميلية", fiyat: "٢٠٠٠ - ٦٠٠٠ دولار" },
  { icon: "🦴", ad: "جراحة العظام", fiyat: "٣٠٠٠ - ٨٠٠٠ دولار" },
];

export default function ArapçaSayfa() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/ar" className="flex items-center gap-2">
            <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-white font-bold text-xl">تورك حكيم</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white text-sm">🇹🇷 Türkçe</a>
            <a href="https://wa.me/905000000000" style={{ backgroundColor: "#25D366" }} className="text-white px-4 py-2 rounded-lg text-sm font-medium">
              💬 واتساب
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div style={{ backgroundColor: "#0E7C7B20", borderColor: "#0E7C7B" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
            <span style={{ color: "#0E7C7B" }} className="text-sm font-medium">🌍 دعم عربي كامل</span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
            أفضل أطباء تركيا<br />
            <span style={{ color: "#0E7C7B" }}>بالعربية</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            سافر إلى تركيا بثقة تامة. نوفر لك كل شيء: الطبيب، المترجم، الفندق والنقل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/905000000000" style={{ backgroundColor: "#25D366" }} className="text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90">
              💬 استشارة مجانية عبر واتساب
            </a>
            <a href="#tedaviler" style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }} className="border-2 px-8 py-4 rounded-xl font-bold text-lg hover:opacity-80">
              عرض الخدمات
            </a>
          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ backgroundColor: "#0E7C7B" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { sayi: "+٢٠٠ ألف", etiket: "سائح عربي سنوياً" },
            { sayi: "%٦٠", etiket: "أرخص من أوروبا" },
            { sayi: "٢٤/٧", etiket: "دعم عربي" },
            { sayi: "+٥٠٠٠", etiket: "طبيب متخصص" },
          ].map(item => (
            <div key={item.etiket}>
              <div className="text-3xl font-bold">{item.sayi}</div>
              <div className="text-sm opacity-80 mt-1">{item.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEDAVİLER */}
      <section id="tedaviler" style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-4">أكثر العلاجات طلباً</h2>
            <p className="text-gray-500">الخدمات التي يبحث عنها العرب أكثر في تركيا</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tedaviler.map(t => (
              <div key={t.ad} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-3">{t.icon}</div>
                <h3 style={{ color: "#0D2137" }} className="font-bold text-lg mb-2">{t.ad}</h3>
                <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{t.fiyat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white text-3xl font-bold mb-4">هل أنت مستعد؟</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">تواصل معنا الآن عبر واتساب. استشارة مجانية، رد سريع.</p>
          <a
            href="https://wa.me/905000000000"
            style={{ backgroundColor: "#25D366" }}
            className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90"
          >
            💬 واتساب — استشارة مجانية
          </a>
          <p className="text-gray-500 text-sm mt-4">رد خلال ٣٠ دقيقة</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#060F1A" }} className="px-6 py-8 text-center">
        <p className="text-gray-500 text-sm">© ٢٠٢٥ تورك حكيم — جميع الحقوق محفوظة</p>
        <a href="/" className="text-gray-600 hover:text-gray-400 text-xs mt-2 block">🇹🇷 العودة إلى الموقع التركي</a>
      </footer>

    </div>
  );
}
