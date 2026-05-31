import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sağlık Hukuku SSS | TurkHekim",
  description: "Malpraktis, sağlıkta reklam, KVKK, TİTCK ve hekim disiplin alanlarında sık sorulan sorulara hızlı yanıtlar.",
  alternates: { canonical: "https://turkhekim.com/hukuk/sik-sorulan-sorular" },
};

const SSS = [
  {
    kategori: "Malpraktis",
    soru: "Malpraktis davasında zamanaşımı süresi nedir?",
    yanit: "Haksız fiil esaslı malpraktis davalarında TBK m.72 uygulanır: zararı ve sorumluyu öğrendiğiniz tarihten itibaren 2 yıl, her hâlükârda fiilin işlendiği tarihten itibaren 10 yıl. Estetik operasyonlar eser sözleşmesi sayıldığı için ayıba karşı tekeffül (TBK m.475) süreleri uygulanır. TCK kapsamındaki ceza davalarında ayrı süreler vardır.",
  },
  {
    kategori: "Malpraktis",
    soru: "Estetik ameliyat ile teşhis-tedavi ameliyatları arasında hukuki fark var mı?",
    yanit: "Evet, kritik bir fark vardır. Yargıtay 15. HD yerleşik içtihadında **estetik operasyonlar eser sözleşmesi** sayılır (TBK m.470 vd.) — sonuç taahhüdü vardır, ayıpsız ifa baskısı yüksektir. **Teşhis ve tedavi ise vekâlet sözleşmesidir** (TBK m.502) — özen yükümlülüğü esastır, sonuç garanti edilmez.",
  },
  {
    kategori: "Malpraktis",
    soru: "Aydınlatılmış onam yoksa hata olmasa bile dava açılabilir mi?",
    yanit: "Evet. Hasta Hakları Yönetmeliği m.15 ve m.31 uyarınca aydınlatılmış onam eksikliği başlı başına bir tazminat sebebidir. Ameliyat başarılı olsa bile, hasta önceden risk/komplikasyon/alternatif hakkında bilgilendirilmediği için manevi tazminat ve bazen maddi tazminat talep edilebilir.",
  },
  {
    kategori: "Sağlıkta Reklam",
    soru: "Sosyal medyada hasta yorumu / referans paylaşabilir miyim?",
    yanit: "Hayır. 29.07.2023 tarihli Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Yönetmeliği m.6/3 uyarınca hasta yorumu/tavsiyesi paylaşımı yasaktır. Yalnızca platform üzerinden değerlendirme alma istisnadır (TurkHekim gibi platformlarda yapılan, doğrulanmış hasta yorumları). İhlal Reklam Kurulu ve Sağlık Bakanlığı yaptırımına tâbidir.",
  },
  {
    kategori: "Sağlıkta Reklam",
    soru: "Önce-sonra fotoğrafı paylaşmak yasal mı?",
    yanit: "Hayır. 29.07.2023 Yön. m.6/2 önce-sonra fotoğraflarını kategorik olarak yasaklar. Hastanın izni olsa bile yayımlanamaz. Tıbbi vakada bilimsel sunum amaçlı kullanım istisnadır ancak halka açık platformda paylaşılamaz.",
  },
  {
    kategori: "Sağlıkta Reklam",
    soru: "İndirim kampanyası veya hediye sunabilir miyim?",
    yanit: "Hayır. Aynı yönetmeliğin m.7 maddesi indirim, kampanya, hediye, takdir hediyesi gibi her türlü maddi teşviği yasaklar. İdari para cezası 2026 itibarıyla 250.000-5.000.000 TL bandındadır. Tekrar eden ihlallerde meslekten men de söz konusu olabilir.",
  },
  {
    kategori: "Sağlıkta Reklam",
    soru: "'Mucize sonuç', 'kesin tedavi', 'lider klinik' gibi ifadeler reklamda kullanılabilir mi?",
    yanit: "Hayır. Aynı yönetmelik 'mucize', 'garantili', 'kesin sonuç', 'ilk', 'tek', 'en iyi', 'lider' gibi övücü ve aldatıcı ifadeleri yasaklar. Reklam Kurulu 6502 sayılı Kanun m.63 uyarınca para cezası ve yayın durdurma kararı verebilir.",
  },
  {
    kategori: "TİTCK & İlaç",
    soru: "Reçeteli ilaç reklamı halka yapabilir miyim?",
    yanit: "Hayır. Beşeri Tıbbi Ürünlerin Tanıtım Faaliyetleri Hakkında Yönetmelik (03.07.2015) reçeteli ilaçların halka reklam edilmesini yasaklar. Yalnızca sağlık profesyonellerine yönelik bilimsel tanıtım serbesttir. Reçetesiz ilaçların (OTC) halka reklamında TİTCK ön onayı gereklidir.",
  },
  {
    kategori: "KVKK",
    soru: "Hasta randevu defterimi dijital tutarken VERBİS kaydı şart mı?",
    yanit: "Çalışan sayısına bağlıdır. 100'den az çalışanı olan ve yıllık cirosu 25 milyon TL altındaki gerçek kişi sağlık tesisleri VERBİS kaydından muaftır (kategorik istisnalar dışında). Ancak özel nitelikli veri (sağlık verisi - KVKK m.6) işlediğiniz için yine de aydınlatma yükümlülüğünüz vardır ve açık rıza almalısınız. Tüzel kişi sağlık tesislerinde VERBİS zorunludur.",
  },
  {
    kategori: "KVKK",
    soru: "Hastama ait WhatsApp mesajlaşması KVKK ihlali mi?",
    yanit: "Hasta açık rıza vermediği sürece evet. KVKK m.6 sağlık verisini özel nitelikli kategoride sayar — açık ve aydınlatılmış rıza şarttır. Aydınlatma metni + ayrı açık rıza beyanı alın. WhatsApp uçtan uca şifreli olsa bile, kaydedildiği cihaz/bulut güvenliği sizin sorumluluğunuzdadır.",
  },
  {
    kategori: "TTB Disiplin",
    soru: "TTB Onur Kurulu kararına nasıl itiraz edilir?",
    yanit: "TTB Disiplin Yönetmeliği uyarınca onur kurulu kararlarına Yüksek Onur Kurulu nezdinde 15 gün içinde itiraz edilebilir. Yüksek Onur Kurulu kararı kesindir ancak idari yargı yolu açıktır — 60 gün içinde İdare Mahkemesinde iptal davası açılabilir.",
  },
  {
    kategori: "SGK",
    soru: "MEDULA üzerinden SGK'nın yaptığı geri ödeme kesintisine nasıl itiraz ederim?",
    yanit: "Kurum işlemine yönelik itiraz dilekçesi tebliğden itibaren 30 gün içinde SGK'ya verilir. SGK ret veya susarsa 60 gün içinde İş Mahkemesinde (sigortalı tarafından) veya İdare Mahkemesinde (kurum bazında) dava açılabilir. SUT (Sağlık Uygulama Tebliği) güncel sürümü esastır.",
  },
  {
    kategori: "Sağlık Turizmi",
    soru: "Uluslararası hastaya hizmet sunmak için ek yetki gerekli mi?",
    yanit: "Evet. Uluslararası Sağlık Turizmi ve Turistin Sağlığı Hakkında Yönetmelik (13.07.2017) uyarınca tıbbi turizm yetki belgesi şarttır. Aracı kuruluşlar USHAŞ kayıtlı olmalıdır. Yabancı hastaya aydınlatılmış onam, hastanın anlayacağı dilde (anadilinde veya yetkin tercüman aracılığıyla) verilmelidir.",
  },
];

export default function SSSPage() {
  const kategoriler = [...new Set(SSS.map(s => s.kategori))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SSS.map((q) => ({
      "@type": "Question",
      name: q.soru,
      acceptedAnswer: { "@type": "Answer", text: q.yanit },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section style={{ background: "var(--navy)" }} className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Sağlık Hukuku — Sık Sorulan Sorular</h1>
          <p className="text-gray-300">Hekim ve sağlık kuruluşlarının en çok merak ettiği soruların kısa yanıtları.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {kategoriler.map((kat) => (
          <div key={kat}>
            <h2 className="text-lg font-bold mb-3" style={{ color: "var(--teal)" }}>{kat}</h2>
            <div className="space-y-2">
              {SSS.filter(s => s.kategori === kat).map((q, i) => (
                <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                  <summary className="cursor-pointer px-5 py-4 font-semibold text-sm flex justify-between items-center" style={{ color: "var(--navy)" }}>
                    <span>{q.soru}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition">▾</span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-700 leading-relaxed">{q.yanit}</div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm">
          ⚖️ <strong>Önemli:</strong> Bu yanıtlar genel bilgilendirme amaçlıdır. Somut olayınız için
          <Link href="/hukuk/avukatlar" className="underline mx-1" style={{ color: "var(--teal)" }}>uzman avukat</Link>
          görüşü almanızı öneririz.
        </div>
      </section>
    </div>
  );
}
