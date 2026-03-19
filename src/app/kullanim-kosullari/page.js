import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Kullanım Koşulları | DoktorPusula",
  description: "DoktorPusula platform kullanım koşulları ve sorumluluk bildirimi.",
};

export default function KullanimKosullari() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen px-6 py-14">
        <div className="max-w-3xl mx-auto">

          <div style={{ borderColor: "#0E7C7B" }} className="border-l-4 pl-5 mb-10">
            <h1 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-1">Kullanım Koşulları</h1>
            <p className="text-gray-500 text-sm">Son güncelleme: Mart 2026</p>
          </div>

          {[
            {
              baslik: "1. Platform Niteliği",
              icerik: "DoktorPusula, doktor ve hasta buluşmasını kolaylaştıran bağımsız bir rehber platformudur. Platform, tıbbi tavsiye vermez, teşhis koymaz ve sağlık hizmeti sunmaz. Platforma erişiminiz bu koşulları kabul ettiğiniz anlamına gelir.",
            },
            {
              baslik: "2. Doktorlar İçin Koşullar",
              icerik: null,
              liste: [
                "Platforma kayıt yaptıran doktorlar, tüm bilgilerini doğru ve güncel tutmakla yükümlüdür.",
                "Diploma, uzmanlık belgesi ve diploma bilgilerinin gerçeği yansıtması zorunludur; aksi hâlde hesap silinir.",
                "Türk Tabipleri Birliği mevzuatına aykırı içerik yayınlanamaz.",
                "Onay sürecinden geçemeyen hesaplar yayına alınmaz.",
                "Platform, doktor bilgilerini doğrulama hakkını saklı tutar.",
              ],
            },
            {
              baslik: "3. Yorumlar İçin Koşullar",
              icerik: null,
              liste: [
                "Yorumlar telefon numarasıyla doğrulanır; sahte yorum bırakmak yasaktır.",
                "Hakaret, iftira veya kişisel saldırı içeren yorumlar yasal işleme konu olabilir.",
                "Doğrulanmış yorumlar, platform şeffaflık ilkesi gereği silinemez.",
                "Yorum bırakarak kişisel verilerinizin Gizlilik Politikası kapsamında işlenmesini kabul etmiş olursunuz.",
              ],
            },
            {
              baslik: "4. Sorumluluk Reddi",
              icerik: null,
              liste: [
                "DoktorPusula, doktorların verdikleri hizmetlerden sorumlu değildir.",
                "Platform yalnızca bilgi sunar; tıbbi karar tamamen doktor-hasta arasındaki ilişkiye aittir.",
                "Doktor profil bilgilerinin doğruluğundan birincil sorumlu ilgili doktordur.",
                "Platform, teknik kesintilerden doğan zararlardan sorumlu tutulamaz.",
              ],
            },
            {
              baslik: "5. Fikri Mülkiyet",
              icerik: "DoktorPusula markası, logosu ve platform içeriği platforma aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz.",
            },
            {
              baslik: "6. Değişiklikler",
              icerik: "Platform, bu koşulları önceden haber vermeksizin değiştirme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayınlanır.",
            },
            {
              baslik: "7. Uygulanacak Hukuk",
              icerik: "Bu sözleşmeden doğabilecek her türlü uyuşmazlıkta Türkiye Cumhuriyeti hukuku uygulanır; yetkili mahkemeler İstanbul mahkemeleridir.",
            },
            {
              baslik: "8. İletişim",
              icerik: "Kullanım koşullarına ilişkin sorularınız için: iletisim@doktorpusula.com",
            },
          ].map((bolum) => (
            <section key={bolum.baslik} className="mb-8">
              <h2 style={{ color: "#0D2137" }} className="text-lg font-bold mb-3">{bolum.baslik}</h2>
              {bolum.icerik && <p className="text-gray-600 text-sm leading-relaxed">{bolum.icerik}</p>}
              {bolum.liste && (
                <ul className="space-y-2">
                  {bolum.liste.map((m, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <span style={{ color: "#0E7C7B" }} className="mt-0.5 flex-shrink-0">›</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

        </div>
      </main>
    </>
  );
}
