import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Gizlilik Politikası | TurkHekim",
  description: "TurkHekim kişisel verilerin korunması ve gizlilik politikası.",
};

export default function GizlilikPolitikasi() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen px-6 py-14">
        <div className="max-w-3xl mx-auto">

          <div style={{ borderColor: "#0E7C7B" }} className="border-l-4 pl-5 mb-10">
            <h1 style={{ color: "#0D2137" }} className="text-3xl font-bold mb-1">Gizlilik Politikası</h1>
            <p className="text-gray-500 text-sm">Son güncelleme: Mart 2026</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8 text-sm text-amber-800">
            Bu platform Türkiye Cumhuriyeti <strong>6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong> kapsamında faaliyet göstermektedir.
          </div>

          {[
            {
              baslik: "1. Veri Sorumlusu",
              icerik: `TurkHekim ("Platform"), kişisel verilerinizin işlenmesinden sorumlu veri sorumlusudur. Platform; doktor-hasta buluşmasını kolaylaştıran bağımsız bir rehber hizmetidir, sağlık hizmeti sunucusu değildir.`
            },
            {
              baslik: "2. Toplanan Kişisel Veriler",
              icerik: null,
              liste: [
                "Doktor kaydı sırasında: Ad soyad, e-posta, telefon, şehir, uzmanlık bilgisi",
                "Yorum bırakırken: Ad, telefon numarası (hash'lenmiş olarak saklanır)",
                "Ziyaretçiler için: IP adresi (rate limiting amacıyla, 24 saat sonra silinir)",
                "Teknik veriler: Çerezler, tarayıcı bilgisi",
              ]
            },
            {
              baslik: "3. Verilerin İşlenme Amaçları",
              icerik: null,
              liste: [
                "Doktor profillerinin oluşturulması ve yönetilmesi",
                "Yorumların doğrulanması ve sahte yorum önlenmesi",
                "Platform güvenliğinin sağlanması (kötüye kullanım tespiti)",
                "Yasal yükümlülüklerin yerine getirilmesi",
              ]
            },
            {
              baslik: "4. Verilerin Saklanma Süresi",
              icerik: null,
              liste: [
                "Doktor hesabı verileri: Hesap silinene kadar + 2 yıl",
                "Yorumlar: Kalıcı (şeffaflık ilkesi gereği silinemez)",
                "IP logları: 24 saat",
              ]
            },
            {
              baslik: "5. Üçüncü Taraflarla Paylaşım",
              icerik: "Kişisel verileriniz hiçbir koşulda satılmaz veya ticari amaçla üçüncü taraflarla paylaşılmaz. Yalnızca aşağıdaki teknik altyapı sağlayıcıları veri işleyeni konumundadır:",
              liste: [
                "Vercel Inc. (ABD) — Hosting",
                "Neon Inc. (ABD) — Veritabanı",
              ]
            },
            {
              baslik: "6. Haklarınız (KVKK Madde 11)",
              icerik: "KVKK kapsamında aşağıdaki haklara sahipsiniz:",
              liste: [
                "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
                "İşlenmişse bilgi talep etme",
                "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
                "Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme",
                "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme",
                "Koşulların sağlanması halinde silinmesini talep etme",
              ]
            },
            {
              baslik: "7. İletişim",
              icerik: "Gizlilik politikamıza ilişkin sorularınız veya KVKK kapsamındaki talepleriniz için: iletisim@turkhekim.com adresine yazabilirsiniz."
            },
          ].map((bolum) => (
            <section key={bolum.baslik} className="mb-8">
              <h2 style={{ color: "#0D2137" }} className="text-lg font-bold mb-3">{bolum.baslik}</h2>
              {bolum.icerik && <p className="text-gray-600 text-sm leading-relaxed mb-3">{bolum.icerik}</p>}
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
