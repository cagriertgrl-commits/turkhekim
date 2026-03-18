export const metadata = {
  title: "ترک‌حکیم — پلتفرم سلامت ترکیه",
  description: "بهترین پزشکان ترکیه را پیدا کنید. نوبت‌دهی آنلاین، نظرات تأییدشده، پشتیبانی فارسی. گردشگری پزشکی به ترکیه.",
  alternates: {
    canonical: "https://turkhekim.vercel.app/fa",
    languages: { "tr": "https://turkhekim.vercel.app", "fa": "https://turkhekim.vercel.app/fa" },
  },
};

const tedaviler = [
  { icon: "👃", ad: "رینوپلاستی", fiyat: "۲۰۰۰ - ۵۰۰۰ دلار" },
  { icon: "🦷", ad: "دندانپزشکی", fiyat: "۵۰۰ - ۳۰۰۰ دلار" },
  { icon: "💇", ad: "کاشت مو", fiyat: "۱۵۰۰ - ۳۵۰۰ دلار" },
  { icon: "👁️", ad: "جراحی چشم", fiyat: "۱۰۰۰ - ۲۵۰۰ دلار" },
  { icon: "💉", ad: "جراحی زیبایی", fiyat: "۲۰۰۰ - ۶۰۰۰ دلار" },
  { icon: "🦴", ad: "ارتوپدی", fiyat: "۳۰۰۰ - ۸۰۰۰ دلار" },
];

export default function FarsçaSayfa() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#0D2137" }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/fa" className="flex items-center gap-2">
            <div style={{ backgroundColor: "#0E7C7B" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-white font-bold text-xl">ترک‌حکیم</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">🇹🇷 Türkçe</a>
            <a href="https://wa.me/905000000000" style={{ backgroundColor: "#25D366" }} className="text-white px-4 py-2 rounded-lg text-sm font-medium">
              💬 واتساپ
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div style={{ backgroundColor: "#0E7C7B20", borderColor: "#0E7C7B" }} className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-6">
            <span style={{ color: "#0E7C7B" }} className="text-sm font-medium">🇮🇷 پشتیبانی کامل فارسی</span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "serif" }}>
            بهترین پزشکان ترکیه<br />
            <span style={{ color: "#0E7C7B" }}>به زبان فارسی</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            با اطمینان کامل به ترکیه سفر کنید. ما همه چیز را برای شما فراهم می‌کنیم: پزشک، مترجم، هتل و ترانسفر.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/905000000000" style={{ backgroundColor: "#25D366" }} className="text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
              💬 مشاوره رایگان در واتساپ
            </a>
            <a href="#tedaviler" style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }} className="border-2 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              مشاهده خدمات
            </a>
          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ backgroundColor: "#0E7C7B" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { sayi: "+۲۰۰ هزار", etiket: "ایرانی در سال به ترکیه" },
            { sayi: "%۶۰", etiket: "ارزان‌تر از اروپا" },
            { sayi: "۷/۲۴", etiket: "پشتیبانی فارسی" },
            { sayi: "+۵۰۰۰", etiket: "پزشک متخصص" },
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
            <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-4">محبوب‌ترین درمان‌ها</h2>
            <p className="text-gray-500">خدماتی که ایرانیان بیشتر در ترکیه دنبال می‌کنند</p>
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

      {/* NASIL ÇALIŞIR */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ color: "#0D2137" }} className="text-3xl font-bold text-center mb-12">چطور کار می‌کند؟</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { adim: "۱", baslik: "تماس بگیرید", aciklama: "از طریق واتساپ با ما در تماس باشید", icon: "💬" },
              { adim: "۲", baslik: "پزشک انتخاب کنید", aciklama: "ما بهترین پزشک را برای شما پیدا می‌کنیم", icon: "👨‍⚕️" },
              { adim: "۳", baslik: "سفر کنید", aciklama: "ترانسفر فرودگاه و هتل آماده است", icon: "✈️" },
              { adim: "۴", baslik: "درمان شوید", aciklama: "با مترجم فارسی در کنار شما", icon: "🏥" },
            ].map(item => (
              <div key={item.adim} className="text-center">
                <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div style={{ color: "#0E7C7B" }} className="font-bold text-lg mb-1">{item.baslik}</div>
                <p className="text-gray-500 text-sm">{item.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2137" }} className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-white text-3xl font-bold mb-4">آماده‌اید؟</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            همین الان با ما در واتساپ تماس بگیرید. مشاوره رایگان، پاسخ سریع.
          </p>
          <a
            href="https://wa.me/905000000000"
            style={{ backgroundColor: "#25D366" }}
            className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
          >
            💬 واتساپ — مشاوره رایگان
          </a>
          <p className="text-gray-500 text-sm mt-4">پاسخ در کمتر از ۳۰ دقیقه</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#060F1A" }} className="px-6 py-8 text-center">
        <p className="text-gray-500 text-sm">© ۲۰۲۵ ترک‌حکیم — تمام حقوق محفوظ است</p>
        <a href="/" className="text-gray-600 hover:text-gray-400 text-xs mt-2 block transition-colors">🇹🇷 Türkçe siteye dön</a>
      </footer>

    </div>
  );
}
