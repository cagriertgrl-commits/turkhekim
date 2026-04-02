import Navbar from "@/components/Navbar";
import sql from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEDAVILER } from "../page";

const TEDAVI_ICERIK = {
  rinoplasti: {
    nedir: "Rinoplasti, burnun dış görünümünü düzeltmek veya solunum problemlerini gidermek amacıyla uygulanan bir cerrahi işlemdir. Hem estetik hem de fonksiyonel amaçlı yapılabilir.",
    cesitler: ["Açık Rinoplasti — Burun ucu kaldırılarak müdahale edilir, karmaşık vakalarda tercih edilir", "Kapalı Rinoplasti — Burun içinden kesi yapılır, izi görünmez, iyileşme daha hızlıdır", "Revizyon Rinoplasti — Daha önceki ameliyattan memnun olmayan hastalar için düzeltme ameliyatı", "Septoplasti — Burun bölme eğriliği düzeltme (fonksiyonel)"],
    nasil: "İşlem genel anestezi altında 1-3 saat sürer. Burun kemik ve kıkırdak yapısı şekillendirilir. İyileşme süreci 7-14 gündür, tam sonuç 6-12 ayda ortaya çıkar.",
    kimler: "Burun şeklinden memnun olmayanlar, nefes alma güçlüğü yaşayanlar, travma sonrası burun eğriliği olanlar.",
  },
  botoks: {
    nedir: "Botoks (Botulinum toksini), kasları geçici olarak gevşeterek kırışıklıkları azaltan non-invaziv bir estetik uygulamadır. FDA onaylıdır ve dünyada en çok uygulanan estetik işlemdir.",
    cesitler: ["Alın kırışıklıkları — Yatay alın çizgilerini düzeltir", "Kaz ayağı — Göz kenarındaki çizgileri giderir", "Kaş kaldırma — Kaş hattını yukarı kaldırır", "Diş gıcırdatma (Bruksizm) — Çene kaslarını gevşetir", "Aşırı terleme — Koltuk altı ve el terlemesini azaltır"],
    nasil: "İşlem 10-15 dakika sürer, anestezi gerektirmez. İnce iğnelerle hedef kaslara enjekte edilir. Etki 3-5 gün içinde başlar, 4-6 ay sürer.",
    kimler: "Kırışıklıklarını azaltmak isteyenler, migren hastaları, aşırı terleme problemi olanlar.",
  },
  dolgu: {
    nedir: "Yüz dolgusu, hyaluronik asit veya benzeri biyouyumlu maddelerle yüzdeki hacim kaybını gideren, kırışıklıkları dolduran ve yüz hatlarını belirginleştiren non-cerrahi bir estetik uygulamadır.",
    cesitler: ["Dudak dolgusu — Dudakları dolgunlaştırır ve şekillendirir", "Elmacık kemiği dolgusu — Yüze hacim ve genç görünüm kazandırır", "Çene dolgusu — Yüz hatlarını belirginleştirir", "Göz altı dolgusu — Morluk ve çöküklüğü giderir", "Burun dolgusu (non-surgical rhinoplasty) — Ameliyatsız burun düzeltme"],
    nasil: "İşlem 15-30 dakika sürer, lokal anestezi ile uygulanır. Sonuç anında görülür, etki 6-18 ay sürer.",
    kimler: "Yüzde hacim kaybı yaşayanlar, dudaklarını belirginleştirmek isteyenler, ameliyatsız çözüm arayanlar.",
  },
  "gogus-estetigi": {
    nedir: "Göğüs estetiği, meme boyutunu büyütme, küçültme veya dikleştirme amacıyla uygulanan cerrahi prosedürlerin genel adıdır.",
    cesitler: ["Meme büyütme (augmentation) — Silikon veya salin protezle", "Meme küçültme (reduction) — Fazla doku çıkarılır", "Meme dikleştirme (mastopexy) — Sarkmış memeleri dikleştirir", "Jinekomasti — Erkeklerde meme dokusu küçültme"],
    nasil: "Genel anestezi altında 1-3 saat sürer. Protez kullanımı, yağ enjeksiyonu veya doku çıkarma yöntemleri uygulanır. İyileşme 2-4 hafta.",
    kimler: "Meme boyutundan memnun olmayanlar, gebelik sonrası şekil bozukluğu yaşayanlar.",
  },
  "sac-ekimi": {
    nedir: "Saç ekimi, genetik veya hormonal nedenlerle saç kaybı yaşayan kişilerin kendi saç köklerinin seyrelmiş bölgelere nakledilmesidir. Kalıcı ve doğal sonuç verir.",
    cesitler: ["FUE (Follicular Unit Extraction) — Kökler tek tek alınır, iz kalmaz", "DHI (Direct Hair Implantation) — Choi kalemiyle direkt ekim, daha yoğun sonuç", "Safir FUE — Safir uçlu bıçaklarla daha hassas kanallar açılır", "Sakal/Kaş ekimi — Yüz bölgesine saç kökü nakli"],
    nasil: "Lokal anestezi altında 6-8 saat sürer. Ense bölgesinden alınan kökler seyrek bölgelere ekilir. 6-12 ayda tam sonuç.",
    kimler: "Erkek tipi saç dökülmesi yaşayanlar, kadınlarda seyrelen saç çizgisi, kaza/yanık sonrası saçsız bölge olanlar.",
  },
  "lazer-epilasyon": {
    nedir: "Lazer epilasyon, yoğun ışık enerjisi kullanarak kıl köklerini kalıcı olarak etkisiz hale getiren bir tüy azaltma yöntemidir.",
    cesitler: ["Alexandrite Lazer — Açık tenliler için ideal, hızlı uygulama", "Nd:YAG Lazer — Koyu tenler için güvenli", "Diyot Lazer — Her ten rengine uygun, en yaygın kullanılan", "IPL (Intense Pulsed Light) — Geniş alanlar için etkili"],
    nasil: "Seans 15-60 dakika sürer (bölgeye göre). 6-8 seans önerilir, 4-6 hafta arayla. Kalıcı %80-90 tüy azaltma sağlar.",
    kimler: "İstenmeyen tüy problemi yaşayan herkes, tıraş tahrişinden kurtulmak isteyenler.",
  },
  implant: {
    nedir: "Diş implantı, eksik dişlerin yerine titanyum vida ve porselen kuron ile kalıcı, doğal görünümlü yapay diş uygulamasıdır.",
    cesitler: ["Tek diş implantı — Tek eksik diş için", "Çoklu implant — Birden fazla eksik diş için köprü destekli", "All-on-4 / All-on-6 — Tüm çene için 4 veya 6 implant üzerine sabit protez", "Zigomatik implant — Kemik yetersizliğinde elmacık kemiğine yerleştirilen implant"],
    nasil: "Lokal anestezi altında implant çene kemiğine yerleştirilir. 2-6 ay kemikle kaynaşma (osseointegrasyon) süreci beklenir, ardından porselen kuron takılır.",
    kimler: "Bir veya birden fazla dişini kaybedenler, hareketli protez kullanmak istemeyenler.",
  },
  "dis-beyazlatma": {
    nedir: "Diş beyazlatma, diş mine tabakasındaki lekeleri gidererek dişlere doğal beyazlığını kazandıran kozmetik bir diş hekimliği uygulamasıdır.",
    cesitler: ["Ofis tipi beyazlatma — Klinikte tek seansta yapılır, en etkili yöntem", "Ev tipi beyazlatma — Kişiye özel plaklar ile evde uygulanır", "Kombine beyazlatma — Ofis + ev tedavisi birlikte", "Lazer beyazlatma — Lazer aktivasyonlu jel ile hızlı sonuç"],
    nasil: "Ofis tipi tek seans 45-60 dakika sürer. Beyazlatma jeli dişlere uygulanır ve özel ışıkla aktive edilir. 2-8 ton açılma sağlanır.",
    kimler: "Çay, kahve, sigara lekesi olanlar, doğal diş rengini açmak isteyenler.",
  },
  ortodonti: {
    nedir: "Ortodonti, diş ve çene düzensizliklerini düzelterek hem estetik hem fonksiyonel iyileşme sağlayan diş hekimliği dalıdır.",
    cesitler: ["Metal braketler — Klasik diş teli, en etkili yöntem", "Seramik braketler — Diş renginde, daha estetik", "Lingual braketler — Dişlerin iç yüzeyine takılır, dışarıdan görünmez", "Şeffaf plaklar (Invisalign) — Çıkarılabilir, görünmez hizalama sistemi"],
    nasil: "Tedavi süresi 6-24 ay arasında değişir. Ortodontist düzenli kontroller yapar, teller/plaklar ayarlanır. Tedavi sonrası pekiştirme teli gerekir.",
    kimler: "Çapraşık dişleri olanlar, kapanış bozukluğu olanlar, estetik gülüş isteyenler.",
  },
  zirkonyum: {
    nedir: "Zirkonyum kaplama, doğal diş görünümüne en yakın, dayanıklı ve biyouyumlu porselen kaplama uygulamasıdır.",
    cesitler: ["Tam zirkonyum kaplama — Tamamen zirkonyum, en dayanıklı", "Zirkonyum destekli porselen — Alt yapı zirkonyum, üst katman porselen, en estetik", "Zirkonyum laminate — Dişin ön yüzeyine ince tabaka kaplanır"],
    nasil: "Dişler hafifçe törpülenir, ölçü alınır, laboratuvarda kaplanır. 2-3 seansta tamamlanır. Ortalama ömür 10-15 yıl.",
    kimler: "Kırık, çürük veya renk değişimi olan dişleri olanlar, Hollywood gülüşü isteyenler.",
  },
  lasik: {
    nedir: "LASIK, kornea tabakasını lazer ile şekillendirerek miyop, hipermetrop ve astigmatı kalıcı olarak düzelten göz ameliyatıdır.",
    cesitler: ["LASIK — Kornea flebi oluşturulur, altındaki doku lazerle şekillendirilir", "Femto-LASIK — Flep bıçak yerine femtosaniye lazerle oluşturulur", "PRK — Flebi olmayan yüzey lazeri, ince kornea için uygun", "SMILE — Küçük kesiyle yapılan minimal invaziv yöntem"],
    nasil: "İşlem her göz için 5-10 dakika sürer, ağrısızdır. Görme aynı gün düzelmeye başlar, 1 hafta içinde stabilize olur.",
    kimler: "18 yaş üstü, numara sabitleşmiş miyop/hipermetrop/astigmat hastaları.",
  },
  katarakt: {
    nedir: "Katarakt ameliyatı, bulanıklaşmış göz merceğinin çıkarılıp yerine yapay mercek takılması işlemidir. Dünyanın en sık yapılan ameliyatlarından biridir.",
    cesitler: ["Fakoemülsifikasyon (Fako) — Ultrason ile mercek parçalanır, küçük kesiden çıkarılır", "Femto katarakt — Lazer destekli, daha hassas kesi", "Multifokal mercek — Hem uzak hem yakın görüş için", "Torik mercek — Astigmatı da düzelten mercek"],
    nasil: "İşlem lokal anestezi ile 15-20 dakika sürer. Aynı gün taburcu olunur, 1-2 hafta iyileşme.",
    kimler: "Bulanık görme, gece görüşte bozulma, çift görme şikayeti olanlar, genellikle 60 yaş üstü.",
  },
  psikoterapi: {
    nedir: "Psikoterapi, ruhsal problemlerin konuşma ve davranış teknikleriyle tedavi edilmesidir. İlaç tedavisinin yanı sıra veya tek başına uygulanabilir.",
    cesitler: ["Bilişsel Davranışçı Terapi (BDT) — Düşünce kalıplarını değiştirir", "Psikodinamik Terapi — Bilinçaltı süreçleri inceler", "EMDR — Travma sonrası stres bozukluğu için", "Şema Terapi — Kalıcı olumsuz şemaları değiştirir", "Çift/Aile Terapisi — İlişki problemleri için"],
    nasil: "Seans 45-50 dakika sürer, haftada 1 veya 2 seans. Online veya yüz yüze. Tedavi süresi 8-24 seans arasında değişir.",
    kimler: "Anksiyete, depresyon, travma, ilişki sorunları, stres ve uyum güçlüğü yaşayanlar.",
  },
  "fizik-tedavi": {
    nedir: "Fizik tedavi, kas-iskelet sistemi hastalıklarının egzersiz, elektroterapi ve manuel tekniklerle tedavi edilmesidir.",
    cesitler: ["Ortopedik rehabilitasyon — Ameliyat sonrası iyileşme", "Nörolojik rehabilitasyon — İnme, MS gibi hastalıklar", "Spor rehabilitasyonu — Sporcu yaralanmaları", "Bel-boyun tedavisi — Fıtık, ağrı tedavisi"],
    nasil: "Seans 30-60 dakika sürer, genellikle 10-20 seans. Ultrason, TENS, egzersiz, sıcak-soğuk tedavi uygulanır.",
    kimler: "Bel/boyun fıtığı, ameliyat sonrası rehabilitasyon, spor yaralanmaları, kronik ağrı.",
  },
  prp: {
    nedir: "PRP (Platelet Rich Plasma), kişinin kendi kanından elde edilen trombositten zengin plazmanın hasarlı bölgeye enjekte edilmesidir. Doğal iyileşmeyi hızlandırır.",
    cesitler: ["Yüz gençleştirme PRP — Cilt yenileme ve kırışıklık azaltma", "Saç PRP — Saç dökülmesini yavaşlatır, kalınlaştırır", "Ortopedik PRP — Eklem ve tendon yaralanmalarında", "Diz PRP — Kıkırdak hasarında ağrı azaltma"],
    nasil: "Kandan alınan numune santrifüj edilir, zengin plazma ayrıştırılır ve enjekte edilir. İşlem 30 dakika. 3-4 seans önerilir.",
    kimler: "Saç dökülmesi, cilt yaşlanması, tendon/eklem yaralanmaları, sporcular.",
  },
  "ozon-terapi": {
    nedir: "Ozon terapi, tıbbi ozon gazının vücuda çeşitli yollarla verilmesiyle bağışıklık sistemini güçlendiren ve iyileşmeyi destekleyen tamamlayıcı bir tedavi yöntemidir.",
    cesitler: ["Major otohemoterapi — Kan alınır, ozonlanır, geri verilir", "Minor otohemoterapi — Küçük hacimli kan ile", "Rektal ozon — Bağırsak yoluyla uygulama", "Lokal ozon — Yara ve cilt tedavisi"],
    nasil: "Seans 20-40 dakika sürer. 10-20 seans kür halinde uygulanır. Uzman doktor gözetiminde yapılmalıdır.",
    kimler: "Kronik yorgunluk, bağışıklık sistemi zayıflığı, diyabet, cilt hastalıkları.",
  },
  "manuel-terapi": {
    nedir: "Manuel terapi, el ile uygulanan özel tekniklerle omurga, eklem ve yumuşak doku sorunlarını tedavi eden fizyoterapi dalıdır.",
    cesitler: ["Spinal manipülasyon — Omurga düzeltme", "Mobilizasyon — Eklem hareket açıklığını artırma", "Miyofasyal gevşetme — Kas zarı gerginliğini çözme", "Kraniyosakral terapi — Kafa ve omurga dengeleme"],
    nasil: "Seans 30-45 dakika sürer. Fizyoterapist elle baskı, çekme ve döndürme hareketleri uygular. 5-10 seans.",
    kimler: "Bel/boyun ağrısı, duruş bozukluğu, migren, sporcu yaralanmaları.",
  },
  liposuction: {
    nedir: "Liposuction, diyet ve sporla giderilemeyen lokal yağ birikintilerinin vakumla alınması işlemidir. Vücut şekillendirme prosedürüdür.",
    cesitler: ["Tumescent liposuction — Sıvı enjekte edilir, yağ vakumla alınır", "VASER liposuction — Ultrason ile yağ hücreleri çözülür", "Lazer liposuction — Lazer ile yağ eritilir", "Yağ transferi — Alınan yağ başka bölgeye enjekte edilir"],
    nasil: "Genel veya lokal anestezi ile 1-3 saat sürer. Küçük kesilerden kanül ile yağ emilir. Korse kullanımı 4-6 hafta.",
    kimler: "Lokal yağlanma problemi olanlar, ideal kiloya yakın ama bölgesel yağdan kurtulamayanlar.",
  },
  "kbb-ameliyat": {
    nedir: "KBB ameliyatları, kulak, burun ve boğaz hastalıklarının cerrahi tedavisidir. Sinüzit, bademcik, kulak tüpü gibi çok çeşitli operasyonları kapsar.",
    cesitler: ["Septoplasti — Burun bölme eğriliği düzeltme", "Bademcik / Geniz eti — Kronik enfeksiyon tedavisi", "Sinüs ameliyatı (FESS) — Endoskopik sinüzit tedavisi", "Timpanostomi — Kulak tüpü takılması", "Tiroidektomi — Tiroid bezi ameliyatı"],
    nasil: "İşlem türüne göre 30 dakika - 3 saat. Çoğu endoskopik (kapalı) yapılır. İyileşme 1-2 hafta.",
    kimler: "Kronik sinüzit, burun tıkanıklığı, işitme kaybı, bademcik enfeksiyonu.",
  },
  anjiyografi: {
    nedir: "Anjiyografi, kalp damarlarının röntgen altında görüntülenmesi ve gerektiğinde stent takılarak tıkanıklığın açılması işlemidir.",
    cesitler: ["Tanısal anjiyografi — Sadece görüntüleme amaçlı", "Perkütan koroner girişim (stent) — Tıkanık damar balonla açılır, stent yerleştirilir", "Periferik anjiyografi — Bacak damarlarının görüntülenmesi"],
    nasil: "Kasık veya bilek damarından girilerek kateter kalbe yönlendirilir. Kontrast madde verilerek damarlar görüntülenir. İşlem 30-60 dakika.",
    kimler: "Göğüs ağrısı, nefes darlığı, stres testinde anormallik saptanan hastalar.",
  },
  "diz-protezi": {
    nedir: "Diz protezi, ileri derecede kireçlenmiş veya hasarlı diz ekleminin yapay eklemle değiştirilmesi ameliyatıdır.",
    cesitler: ["Total diz protezi — Tüm diz eklemi değiştirilir", "Parsiyel (tek kompartman) diz protezi — Sadece hasarlı bölüm değişir", "Revizyon protez — Eski protezin yenilenmesi", "Robotik diz protezi — Robot yardımlı hassas yerleştirme"],
    nasil: "Genel veya spinal anestezi altında 1-2 saat sürer. Hastanede 3-5 gün kalış. Fizik tedavi ile 6-12 haftada normale dönüş.",
    kimler: "İleri diz kireçlenmesi, yürüme güçlüğü, konservatif tedaviye yanıt vermeyen diz ağrısı.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tedavi = TEDAVILER.find((t) => t.slug === slug);
  if (!tedavi) return { title: "Bulunamadı" };
  return {
    title: `${tedavi.ad} — En İyi Uzmanlar | DoktorPusula`,
    description: `${tedavi.ad} için Türkiye'nin en iyi uzmanlarını inceleyin. Doğrulanmış yorumlar ve online randevu. DoktorPusula güvencesiyle.`,
    alternates: { canonical: `https://doktorpusula.com/tedaviler/${slug}` },
  };
}

export async function generateStaticParams() {
  return TEDAVILER.map((t) => ({ slug: t.slug }));
}

const SEHIRLER = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana"];

function sehirSlugYap(sehir) {
  return sehir.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-");
}
function uzmanlikSlugYap(uzmanlik) {
  return uzmanlik.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
}

export default async function TedaviDetay({ params }) {
  const { slug } = await params;
  const tedavi = TEDAVILER.find((t) => t.slug === slug);
  if (!tedavi) notFound();

  const uzmanlikSlug = uzmanlikSlugYap(tedavi.uzmanlik);

  // Bu uzmanlıkta onaylı doktorları çek (eslesimler regex ile geniş eşleşim)
  const pattern = tedavi.eslesimler || tedavi.uzmanlik.toLowerCase()
    .replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s")
    .replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c");
  const doktorlar = await sql`
    SELECT id, ad, uzmanlik, sehir, ilce, puan, yorum_sayisi, deneyim, slug, foto_url, onaylandi, fiyat, online_randevu
    FROM doktorlar
    WHERE translate(LOWER(uzmanlik),'ğüşıöçâîûê ','gusiocaiue-') ~* ${pattern}
      AND onaylandi = true
    ORDER BY puan DESC NULLS LAST, yorum_sayisi DESC NULLS LAST
    LIMIT 8
  `;

  const benzerTedaviler = TEDAVILER.filter((t) => t.slug !== slug && t.kategori === tedavi.kategori).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": tedavi.ad,
            "description": tedavi.aciklama,
            "procedureType": "https://health-lifesci.schema.org/MedicalProcedure",
          }),
        }}
      />

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #0D2137 0%, #0a3d62 100%)" }} className="px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/tedaviler" className="hover:text-white">Tedaviler</Link>
            <span>/</span>
            <span className="text-white">{tedavi.ad}</span>
          </nav>
          <div className="flex items-center gap-5">
            <div style={{ backgroundColor: tedavi.bg, color: tedavi.renk }} className="p-3 rounded-2xl">
              <tedavi.Ikon />
            </div>
            <div>
              <span style={{ backgroundColor: "#0E7C7B20", color: "#4DD9D8" }} className="text-xs px-3 py-1 rounded-full font-semibold mb-2 inline-block">
                {tedavi.kategori}
              </span>
              <h1 className="text-white text-3xl font-bold">{tedavi.ad}</h1>
              <p className="text-gray-300 mt-1">{tedavi.aciklama}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BİLGİLENDİRME BÖLÜMÜ */}
      {TEDAVI_ICERIK[slug] && (
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* Nedir */}
            <h2 style={{ color: "var(--navy)" }} className="text-xl font-bold mb-3">{tedavi.ad} Nedir?</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{TEDAVI_ICERIK[slug].nedir}</p>

            {/* Çeşitleri */}
            <h3 style={{ color: "var(--navy)" }} className="text-base font-bold mb-3">{tedavi.ad} Çeşitleri</h3>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {TEDAVI_ICERIK[slug].cesitler.map((c, i) => {
                const [baslik, ...aciklamaArr] = c.split(" — ");
                const aciklama = aciklamaArr.join(" — ");
                return (
                  <div key={i} className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3">
                    <span style={{ color: tedavi.renk }} className="text-sm font-bold mt-0.5 flex-shrink-0">•</span>
                    <div>
                      <span className="text-sm font-semibold text-gray-800">{baslik}</span>
                      {aciklama && <span className="text-xs text-gray-500 block mt-0.5">{aciklama}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nasıl Yapılır + Kimler */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div style={{ backgroundColor: tedavi.bg }} className="rounded-xl p-4">
                <h4 style={{ color: tedavi.renk }} className="text-sm font-bold mb-2">Nasıl Yapılır?</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{TEDAVI_ICERIK[slug].nasil}</p>
              </div>
              <div style={{ backgroundColor: tedavi.bg }} className="rounded-xl p-4">
                <h4 style={{ color: tedavi.renk }} className="text-sm font-bold mb-2">Kimler İçin Uygun?</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{TEDAVI_ICERIK[slug].kimler}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* SOL — Doktorlar */}
          <div className="md:col-span-2">
            <h2 style={{ color: "#0D2137" }} className="text-xl font-bold mb-5">
              {tedavi.ad} Uzmanları
              <span style={{ color: "#0E7C7B" }} className="text-base font-normal ml-2">({doktorlar.length} doktor)</span>
            </h2>

            {doktorlar.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500 text-sm mb-4">Henüz bu tedavi için kayıtlı uzman yok.</p>
                <Link href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="inline-block text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90">
                  Uzman misiniz? Kaydolun
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {doktorlar.map((doktor) => {
                  const initials = doktor.ad.split(" ").slice(1).map((n) => n[0]).join("").slice(0, 2);
                  return (
                    <div key={doktor.slug} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        {doktor.foto_url ? (
                          <img src={doktor.foto_url} alt={doktor.ad} loading="lazy" className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                        ) : (
                          <div style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                            {initials}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900">{doktor.ad}</h3>
                              <p style={{ color: "#0E7C7B" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                              <p className="text-gray-400 text-xs mt-0.5">📍 {doktor.sehir}{doktor.ilce ? ` · ${doktor.ilce}` : ""}</p>
                              <div className="flex items-center gap-3 mt-2 flex-wrap">
                                {doktor.yorum_sayisi > 0 && (
                                  <span className="text-sm font-bold text-yellow-500">★ {doktor.puan} <span className="text-gray-400 font-normal text-xs">({doktor.yorum_sayisi})</span></span>
                                )}
                                {doktor.online_randevu && (
                                  <span style={{ backgroundColor: "#E8F5F5", color: "#0E7C7B" }} className="text-xs px-2 py-0.5 rounded-full font-medium">💻 Online</span>
                                )}
                                {doktor.fiyat && (
                                  <span className="text-xs text-gray-500">{doktor.fiyat}</span>
                                )}
                              </div>
                            </div>
                            <Link href={`/doktor/${doktor.slug}`} style={{ backgroundColor: "#0D2137" }} className="text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity flex-shrink-0">
                              Profil →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Şehre göre linkler (SEO) */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">{tedavi.ad} — Şehre Göre</h3>
              <div className="flex flex-wrap gap-2">
                {SEHIRLER.map((sehir) => (
                  <Link
                    key={sehir}
                    href={`/${sehirSlugYap(sehir)}/${uzmanlikSlug}`}
                    className="text-sm px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors"
                  >
                    {sehir} {tedavi.ad}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ — Benzer tedaviler */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Benzer Tedaviler</h3>
              <div className="space-y-2">
                {benzerTedaviler.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tedaviler/${t.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <span style={{ backgroundColor: t.bg, color: t.renk }} className="p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <t.Ikon />
                    </span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t.ad}</p>
                      <p className="text-xs text-gray-400">{t.aciklama}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/tedaviler" className="block mt-4 text-center text-xs font-medium" style={{ color: "#0E7C7B" }}>
                Tüm Tedavileri Gör →
              </Link>
            </div>

            <div style={{ backgroundColor: "#0D2137" }} className="rounded-2xl p-5 text-center">
              <div className="text-3xl mb-3">👨‍⚕️</div>
              <h3 className="text-white font-bold text-sm mb-2">Bu alanda uzman mısınız?</h3>
              <p className="text-gray-400 text-xs mb-4">Ücretsiz profil oluşturun, hastalara ulaşın.</p>
              <Link href="/kayit-ol" style={{ backgroundColor: "#0E7C7B" }} className="block text-white text-xs font-semibold py-2.5 rounded-xl hover:opacity-90">
                Hemen Kaydol →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
