"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const HASTA_SORULAR = [
  {
    soru: "DoktorPusula nedir?",
    cevap:
      "DoktorPusula, Türkiye'nin bağımsız ve şeffaf sağlık platformudur. Gerçek hasta yorumlarına dayalı doktor profilleri, kolay randevu talebi ve çok dilli destek ile doğru hekime güvenle ulaşmanızı sağlıyoruz. Medikal turizm kapsamında yurt dışından Türkiye'ye gelen hastalara da hizmet sunuyoruz.",
  },
  {
    soru: "Doktor yorumları nasıl doğrulanıyor?",
    cevap:
      "Her yorum, ilgili doktor tarafından onaylandıktan sonra editoryal moderasyon sürecinden geçmektedir. Sahte veya spam içerikli yorumlar sistem tarafından engellenmekte; yalnızca gerçek hasta deneyimleri yayınlanmaktadır.",
  },
  {
    soru: "Randevu almak ücretsiz mi?",
    cevap:
      "Evet, DoktorPusula üzerinden gönderilen tüm randevu talepleri tamamen ücretsizdir. Platform; doktorlar ve hastalar arasında köprü kurar, herhangi bir aracılık ücreti almaz.",
  },
  {
    soru: "Hangi şehirlerde hizmet veriliyor?",
    cevap:
      "DoktorPusula, İstanbul başta olmak üzere Türkiye'nin tüm illerinde hizmet vermektedir. Ayrıca medikal turizm kapsamında yurt dışından Türkiye'ye gelen hastalar için özel destek ve organizasyon hizmeti de sunulmaktadır.",
  },
  {
    soru: "Yorumumu nasıl yazabilirim?",
    cevap:
      "Ziyaret ettiğiniz doktorun profil sayfasındaki 'Yorum Yaz' butonunu kullanabilirsiniz. Yorumunuz doktor tarafından onaylandıktan ve moderasyon sürecinden geçtikten sonra profilde görünür hale gelir.",
  },
  {
    soru: "Verilerim güvende mi?",
    cevap:
      "Evet. DoktorPusula, KVKK (Kişisel Verilerin Korunması Kanunu) ile tam uyumlu çalışmaktadır. Tüm veri iletişimi SSL şifreleme ile korunmakta, kişisel bilgileriniz üçüncü şahıslarla paylaşılmamaktadır.",
  },
];

const DOKTOR_SORULAR = [
  {
    soru: "Kayıt nasıl yapılır?",
    cevap:
      "Doktor kaydı tamamen ücretsizdir. Sitemizin üst menüsündeki 'Doktor Ol' bağlantısına tıklayarak veya doğrudan /doktor-ol adresini ziyaret ederek birkaç dakika içinde profilinizi oluşturabilirsiniz.",
  },
  {
    soru: "Ücretsiz pakette neler var?",
    cevap:
      "Ücretsiz paket; doktor profili oluşturma, hasta yorumlarını alma ve soru-cevap özelliğini kapsamaktadır. Herhangi bir ücret veya kredi kartı bilgisi gerektirmez.",
  },
  {
    soru: "Premium ve Pro paketlerin farkı nedir?",
    cevap:
      "Premium ve Pro paketler; öne çıkarılmış profil, gelişmiş istatistikler, öncelikli destek ve daha fazla özellik sunmaktadır. Ayrıntılar ve fiyatlandırma için paketler sayfamızı inceleyebilirsiniz.",
    link: { href: "/paketler", etiket: "Paketleri İncele" },
  },
  {
    soru: "Görüşme Özetle özelliği nedir?",
    cevap:
      "Görüşme Özetle, yapay zeka destekli bir özet aracıdır. Hasta görüşmelerinizden otomatik özetler oluşturarak notlarınızı hızlıca kayıt altına almanıza yardımcı olur. Doktor panelinizden erişebilirsiniz.",
  },
  {
    soru: "Profilim ne zaman yayına girer?",
    cevap:
      "Kayıt başvurunuz ekibimiz tarafından 24 saat içinde incelenerek onaylanmaktadır. Onay sonrasında profiliniz sitemizde görünür hale gelir ve hasta randevu talebi almaya başlayabilirsiniz.",
  },
  {
    soru: "Fatura ve ödeme nasıl yapılır?",
    cevap:
      "Paket ödemeleri ve faturalama konusunda destek ekibimizle iletişime geçebilirsiniz. Kurumsal fatura ve özel ödeme planları için info@doktorpusula.com adresinden bize ulaşın.",
  },
];

function AkordeonItem({ soru, cevap, link }) {
  const [acik, setAcik] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setAcik(!acik)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-white text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-sm" style={{ color: "#0D2137" }}>
          {soru}
        </span>
        <svg
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{
            color: "#0E7C7B",
            transform: acik ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {acik && (
        <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-50">
          <p className="text-gray-600 text-sm leading-relaxed">{cevap}</p>
          {link && (
            <Link
              href={link.href}
              className="inline-block mt-3 text-xs font-semibold px-4 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0E7C7B" }}
            >
              {link.etiket}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function SSSPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: "#0D2137" }} className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#0E7C7B22", color: "#4DD9D8" }}
            >
              Yardım Merkezi
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Sıkça Sorulan <span style={{ color: "#C9A84C" }}>Sorular</span>
            </h1>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              DoktorPusula hakkında merak ettiklerinizi burada bulabilirsiniz. Cevap bulamazsanız bize yazın.
            </p>
          </div>
        </section>

        {/* SSS İçerik */}
        <section className="py-14 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto space-y-12">

            {/* Hastalar İçin */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🏥</span>
                <h2 className="text-xl font-bold" style={{ color: "#0D2137" }}>
                  Hastalar İçin
                </h2>
              </div>
              <div className="space-y-3">
                {HASTA_SORULAR.map((item) => (
                  <AkordeonItem key={item.soru} {...item} />
                ))}
              </div>
            </div>

            {/* Doktorlar İçin */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">👨‍⚕️</span>
                <h2 className="text-xl font-bold" style={{ color: "#0D2137" }}>
                  Doktorlar İçin
                </h2>
              </div>
              <div className="space-y-3">
                {DOKTOR_SORULAR.map((item) => (
                  <AkordeonItem key={item.soru} {...item} />
                ))}
              </div>
            </div>

            {/* İletişim kutusu */}
            <div
              className="rounded-2xl p-7 text-center"
              style={{ backgroundColor: "#0D2137" }}
            >
              <p className="text-white font-semibold text-lg mb-2">
                Sorunuz cevaplanmadı mı?
              </p>
              <p className="text-gray-400 text-sm mb-5">
                Ekibimiz size yardımcı olmaktan memnuniyet duyar.
              </p>
              <a
                href="mailto:info@doktorpusula.com"
                className="inline-block font-semibold px-7 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90 text-sm"
                style={{ backgroundColor: "#0E7C7B" }}
              >
                Bize Yazın
              </a>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
