"use client";
import { useRef, useState } from "react";

// Form şablonları — gerçek klinik içerik
const FORM_SABLONLARI = {
  "sosyal-medya-onam": {
    basliklar: ["FOTOĞRAF/VİDEO SOSYAL MEDYA PAYLAŞIM AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form; 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) madde 6, 1219 Sayılı Kanun, Hasta Hakları Yönetmeliği ve Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik kapsamında hazırlanmıştır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. KAPSAM — NE PAYLAŞILACAK?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aşağıdaki kayıt türleri için ayrı ayrı onay vermeniz gerekmektedir:

□ Tedavi öncesi fotoğraf(lar)
□ Tedavi sonrası fotoğraf(lar)
□ İşlem sırasında çekilen fotoğraf/video (operasyon görüntüsü hariç)
□ Tedavi sürecini anlatan kısa video/reels
□ Yalnızca vücut bölgesi (yüz gösterilmez)
□ Yüz dahil görüntüler

Tedavi/İşlem Adı: .......................................
Görüntülenecek Vücut Bölgesi: .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. NEREDE PAYLAŞILACAK?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Instagram (@.............................................)
□ YouTube (kanal: .............................................)
□ TikTok (@.............................................)
□ Klinik/hekim web sitesi
□ Tıbbi eğitim/kongre sunumu (anonim)
□ Diğer: .......................................

Hesap sahibi/Hekim adı: .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. YASAL ÇERÇEVE VE KISITLAMALAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Paylaşımlar aşağıdaki kurallara tabidir:

• Fotoğraflar aynı ışık, açı ve arka planda çekilir; filtre, rötuş veya dijital değişiklik uygulanamaz.
• Paylaşımlarda hastanın adı, T.C. Kimlik No, adresi veya kimliğini açığa çıkaran bilgi yer almaz.
• Görsellere yorum kapatılır; "garanti" veya "kesin sonuç" içeren ifade kullanılamaz.
• Ücret bilgisi veya kampanya içerikli reklam amacıyla kullanılamaz.
• Küçük hastalara ait görseller için ebeveyn/vasi onayı ayrıca alınır.
• Operasyon sırasındaki cerrahi görüntüler paylaşılamaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. HASTA HAKLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Bu onayı vermek zorunda değilsiniz. Reddetmeniz tedavi kalitenizi etkilemez.
• Onayınızı istediğiniz zaman yazılı olarak geri alabilirsiniz. İptal talebinden itibaren 5 iş günü içinde yeni paylaşımlar durdurulur; mevcut içeriklerin kaldırılması platforma göre değişen süre alabilir.
• KVKK md. 11 kapsamında verilerinize erişim, düzeltme, silme ve aktarım hakkına sahipsiniz.
• Şikâyet: Kişisel Verileri Koruma Kurumu — www.kvkk.gov.tr

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. VERİ SORUMLUSU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sağlık kuruluşu/hekim: .......................................
İletişim: .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yukarıda belirtilen koşulları okudum, anladım. Hangi görsel türlerin, hangi platformlarda paylaşılacağını bana açıklandı. Hiçbir baskı altında kalmaksızın kendi özgür irademle onay veriyorum.

□ Yukarıda işaretlediğim görsel kayıtların belirtilen platformlarda paylaşılmasına ONAY VERİYORUM.
□ KVKK kapsamında görsel verilerimin işlenmesine AÇIK RIZA VERİYORUM.

Ad Soyad        : .......................................    Tarih: ................
T.C. Kimlik No  : .......................................    İmza : ................
Veli/Vasi (18 yaş altı): ............................    İmza : ................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEKİM/YETKİLİ BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı yukarıdaki koşullar hakkında bilgilendirdim, sorularını yanıtladım ve onamını aldım. Paylaşımların ilgili mevzuata uygun yapılacağını taahhüt ederim.

Hekim/Yetkili Adı : .......................................
Diploma No        : .......................................
Tarih/İmza/Kaşe   : .......................................`,
  },
  "rinoplasti-onam": {
    basliklar: ["RİNOPLASTİ (BURUN ESTETİĞİ) AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, 1219 Sayılı Tababet ve Şuabatı San'atlarının Tarzı İcrasına Dair Kanun, Hasta Hakları Yönetmeliği ve Tıbbi Müdahalede Aydınlatılmış Onam ilkeleri çerçevesinde, planlanan rinoplasti (burun estetiği) operasyonu hakkında sizi bilgilendirmek ve yazılı onayınızı almak amacıyla hazırlanmıştır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT / İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rinoplasti; burunun şekli, boyutu ve oranlarını iyileştirmeye yönelik, gerektiğinde burun içi solunum yollarını da düzelten cerrahi bir girişimdir. Operasyon genel anestezi altında, açık (external) veya kapalı (endonazal) teknikle gerçekleştirilir. Açık teknikte columella (burun köprüsü) üzerinde küçük bir kesi yapılarak burun iskeleti geniş bir açıyla incelenir; kapalı teknikte tüm kesiler burun içinde kalır. Her iki yaklaşımın da avantaj ve kısıtları hekiminiz tarafından sizin anatomik durumunuza göre değerlendirilecektir.

Ameliyat sırasında burun kıkırdak ve kemik yapısı yeniden biçimlendirilir; gerektiğinde nazal septum (burun bölmesi) de düzeltilir. Yapısal destek için kendi dokularınızdan (septal kıkırdak, kulak kıkırdağı veya kaburga kıkırdağı) greft alınabilir. Greft gerekliliği ve kaynağı hekim tarafından preoperatif dönemde sizinle görüşülür.

Operasyon süresi genellikle 2–4 saat arasında değişmekle birlikte, revizyon vakalarında veya kombine septoplasti uygulamalarında bu süre uzayabilir. Operasyonun ardından burun içine tampon ve/veya atel, burun dışına alçı veya termoplastik splint uygulanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HASTANIN HEKİME BİLDİRMESİ GEREKENLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aşağıdaki bilgileri mutlaka hekiminizle paylaşınız:
• Kullandığınız tüm ilaçlar (aspirin, antikoagülan, bitkisel ürünler dahil)
• Kanama bozukluğu veya pıhtılaşma sorunları
• Daha önce geçirilmiş burun ameliyatı veya yüz travması
• Diyabet, kalp-damar, böbrek ve karaciğer hastalıkları
• Bilinen ilaç veya madde alerjileri
• Sigara ve alkol kullanım düzeyi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. ANESTEZİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rinoplasti genel anestezi altında uygulanır. Anesteziye bağlı riskler anestezi uzmanı tarafından ayrı bir onam formuyla açıklanacaktır. Operasyondan en az 6 saat önce katı gıda, 2 saat önce sıvı alınmamalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. AMELİYAT SÜRESİ VE HEMEN SONRASI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ameliyat süresi 2–4 saat arasındadır. Operasyon sonrası 1–2 gece hastanede kalış planlanır. Göz çevresinde morarmalar, burun ve yüzde belirgin şişlik oluşur; bu durum ameliyatın normal bir parçasıdır. Burunda bulunan tamponlar 24–48 saat içinde, splint ise 7–14. günde alınır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. İYİLEŞME SÜRECİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.–2. gün     : Ağrı, şişlik ve nazal tıkanıklık belirgindir. Baş yüksek tutulur, soğuk uygulama yapılır.
3.–7. gün     : Morarmalar en belirgin düzeye ulaşır, ardından giderek azalır.
2. hafta      : Splint çıkarılır. Sosyal yaşama kısmi dönüş mümkündür. Kamuya açık işlerde 2–3 hafta sonrasında dönüş önerilir.
1. ay         : Şişlik önemli ölçüde çekilir; genel form belirginleşir. Fiziksel temas ve ağır spor yasaktır.
3. ay         : Burun şekli belirginleşir; küçük iyileşmeler sürmektedir.
6.–12. ay    : Nihai estetik sonuç ortaya çıkar. Cilt kalınlığı ve iyileşme kapasitesi kişiden kişiye farklılık gösterir.

Alkol, sigara ve kan sulandırıcı ilaçlar ameliyattan en az 2 hafta önce kesilmelidir. Sigara kullanımı yara iyileşmesini ciddi ölçüde geciktirir ve cilt nekrozu riskini artırır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama ve hematom: Operasyon sırasında veya hemen sonrasında gelişebilir. Nazal tampon uygulaması ile kontrol altına alınır; nadiren müdahale gerektirir.
• Enfeksiyon: Antibiyotik profilaksisi uygulanır. Ateş, artan ağrı veya akıntı durumunda hekiminize başvurunuz.
• Burun tıkanıklığı ve şişlik: İlk haftalarda belirgindir, kademeli olarak azalır.
• Göz çevresi morluk ve şişlik: 2–3 haftada büyük ölçüde geçer.
• Anesteziye bağlı reaksiyonlar: Bulantı, kusma, boğaz ağrısı — geçicidir.
• Yara ayrılması: Özellikle açık teknikte columella kesisinde nadir görülür; bakım talimatlarına uyulması halinde riski azalır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Asimetri veya şekil memnuniyetsizliği: Nihai sonuç 12 aya kadar netleşmez; bu süre dolmadan revizyon kararı alınmaz.
• Yara izi ve skar: Kapalı teknikte iz oluşmaz; açık teknikte columella izinin geçici kızarıklığı 6–12 ayda solar.
• Kıkırdak görünürlüğü veya düzensizliği: İnce ciltli hastalarda daha belirgin olabilir.
• Revizyon ihtiyacı: Estetik kaygılar nedeniyle hastaların yaklaşık %5–15'inde revizyon operasyonu istenebilir. İlk operasyondan en az 12 ay sonra planlanır.
• Derin ven trombozu (DVT) / pulmoner emboli: Uzun süreli hareketsizlik ve genel anestezi ile ilişkili nadir ciddi komplikasyondur; profilaktif önlemler alınır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Septum Perforasyonu: Burun bölmesinde delik oluşmasıdır. Kuruluk, kabuk, ses ve solunum sorunu yaratabilir. Büyük perforasyonlarda cerrahi onarım gerekebilir. Riski yaklaşık %1'in altındadır; sigara kullanımı ve önceden geçirilmiş septal ameliyat riski artırır.

Uyuşukluk ve His Kaybı: Burun ucu ve çevre bölgelerde geçici his azalması sıktır, genellikle 3–6 ayda düzelir. Kalıcı his kaybı nadirdir.

Kronik Ağrı: Uzun süreli veya kalıcı ağrı gelişimi son derece nadir olmakla birlikte önceden mevcut ağrı durumlarında risk artar.

Alerjik Reaksiyonlar: Sütür malzemeleri, greft veya kullanılan materyallere karşı nadir reaksiyon gelişebilir.

Geç İyileşme: Diyabet, sigara kullanımı, immünosupresif tedavi gibi faktörler iyileşmeyi uzatabilir.

Uzun Dönem Etkiler: Yıllar içinde normal yaşlanmaya bağlı değişimler burun dokusunu etkiler; bu rinoplastiye özgü değil fizyolojik bir süreçtir.

Tatmin Edici Olmayan Sonuçlar: Estetik beklentiler öznel olup hekimle ameliyat öncesi ayrıntılı görüşülmeli; bilgisayar simülasyonları yalnızca fikir verme amaçlıdır, garanti sunmaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. GREFT BİLGİSİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yetersiz kıkırdak dokusu, revizyon vakası veya güçlü yapısal destek gereken durumlarda greft alınabilir:

□ Septal kıkırdak (burun içi — ek iz bırakmaz)
□ Kulak kıkırdağı (auricular — kulak arkasında küçük iz)
□ Kaburga kıkırdağı (costal/rib — göğüs yan duvarında iz, genel anestezi altında ek kesi)

Greft alınan bölgede ek ağrı, iz ve geçici rahatsızlık oluşabilir. Kulak kıkırdağı alındığında kulak şeklinde değişme olmaz; kaburga kıkırdağında çok nadir pnömotoraks (akciğer sönmesi) riski mevcuttur ve buna yönelik önlemler alınır.

Kullanılacak greft tipi: □ Septal  □ Auricular  □ Costal  □ Sentetik: ..............  □ Henüz belirlenmedi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dolgu enjeksiyonu ile burun şekillendirme: Dolgu maddeleri (hyaluronik asit) ile burun şekli geçici olarak düzeltilebilir; kalıcı değildir ve cerrahi ile aynı sonucu vermez.
• Non-invazif girişimler: Bazı minör şikayetler için uygun görülmeyebilir.
• Operasyon yapılmaması: Mevcut burun şekli ve solunumla yaşamak tercih edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan rinoplasti operasyonu, uygulama yöntemi, kullanılacak greft seçenekleri, olası erken ve geç dönem komplikasyonlar, alternatif tedaviler ve beklenen sonuçlar hakkında Türkçe olarak yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu ve tatmin edici yanıtlar aldım. Tedaviyi reddetme hakkım bulunduğu ve bu kararın tıbbi sonuçları konusunda bilgilendirildiğim tarafımca anlaşılmıştır. Baskı altında kalmaksızın kendi özgür irademle bu operasyona onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan rinoplasti operasyonu, riskleri, alternatifleri ve beklenen sonuçlar hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "genel-estetik-onam": {
    basliklar: ["GENEL ESTETİK CERRAHİ AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan estetik cerrahi operasyonu hakkında 1219 sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
Hekim tarafından belirlenen estetik cerrahi operasyon. Operasyonun adı, tekniği ve kapsamı muayene sırasında hastaya ayrıntılı olarak açıklanmıştır.

Planlanan operasyon: .......................................

2. ESTETİK CERRAHİNİN GENEL RİSKLERİ
• Kanama, hematom, seroma
• Yara yeri enfeksiyonu
• Skar (iz) oluşumu — hipertrofik veya keloid
• Anestezi komplikasyonları
• Asimetri veya beklentinin karşılanamaması
• Deri veya doku nekrozu (nadir)
• Seroma (sıvı birikmesi)
• Derin ven trombozu / pulmoner emboli (nadir, ciddi)
• Revizyon ihtiyacı

3. ÖZEL UYARILAR
• Estetik cerrahi sonuçları kişiye, deri yapısına ve iyileşme sürecine göre değişir.
• Sigara kullanımı yara iyileşmesini olumsuz etkiler; operasyon öncesi ve sonrası bırakılması önerilir.
• Sonuçlar kalıcı olsa da yaşlanma süreci devam eder.

4. ALTERNATİFLER
• Non-invazif/minimal invazif yöntemler
• Operasyon yapılmaması

5. HASTA BEYANI
Planlanan operasyon, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Eğitim/yayın amaçlı fotoğraflanmama onay veriyorum.  □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "liposuction-onam": {
    basliklar: ["LİPOSUCTİON (YAĞ ALIMI) AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan liposuction işlemi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Liposuction (lipoaspiration); vücuttaki bölgesel yağ birikimlerinin ince metal kanüller ve vakum yardımıyla aspire edilmesi işlemidir. Genel veya lokal/sedasyon anestezisi altında uygulanır. Tumescent teknikte işlem öncesi yağ dokusuna lokal anestezik+adrenalin karışımı enjekte edilir; bu yöntem kanama ve ağrıyı azaltır. Ultrasonik (VASER), lazer yardımlı veya mekanik yardımlı varyantlar da kullanılabilir.

Liposuction bir kilo verme yöntemi değildir; stabil kilosunda olan, bölgesel yağ birikimi bulunan kişilerde kontur şekillendirmesi amacıyla uygulanır.

İşlem yapılacak bölge(ler): .......................................
Uygulama tekniği: □ Tumescent  □ VASER  □ Lazer  □ Standart

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HASTANIN HEKİME BİLDİRMESİ GEREKENLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Aspirin, NSAİ, antikoagülan ilaçlar (en az 10 gün öncesinden kesilmeli)
• Kanama bozukluğu veya pıhtılaşma sorunları
• Diyabet, immün sistem hastalıkları
• Sigara kullanım düzeyi
• Kalp-damar hastalıkları ve derin ven trombozu öyküsü

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. İYİLEŞME SÜRECİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İlk 48 saat   : Şişlik, morluk ve kanüle giriş deliklerinden sıvı sızıntısı normaldir.
1.–2. hafta   : Kompresyon giysi gün boyu giyilir. Hafif yürüyüş teşvik edilir.
4.–6. hafta   : Kompresyon giysi devam eder; hafif egzersiz başlanabilir.
3. ay          : Şişlik büyük ölçüde iner; kontur belirginleşir.
6. ay          : Nihai sonuç değerlendirilir.

Kompresyon giysinin düzenli kullanımı seroma riskini azaltır ve nihai şekli iyileştirir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama ve hematom: Özellikle geniş alanlarda veya antikoagülan kullanımında risk artar.
• Seroma: Sıvı birikmesi; aspirasyon veya drenle tedavi edilir.
• Enfeksiyon: Ateş, kızarıklık veya kötü kokulu akıntıyla kendini gösterir; antibiyotikle yönetilir.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.
• Lokal anestezik toksisitesi (tumescent teknikte çok nadir): Uygulanan total lidokain dozu güvenli sınırda tutulur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kontur düzensizliği ve dalgalanma: En sık uzun dönem şikayetidir. Eşit olmayan yağ alımı, cilt elastikiyetindeki farklılıklar veya fibrosis nedeniyle oluşur. Revizyon gerektirebilir.
• Cilt sarkması: Elastikiyeti azalmış ciltte yağ alımı sonrası sarkma oluşabilir. Genç, elastik derili adaylar en uygun adaylar olup bu risk önceden değerlendirilir.
• His kaybı: İşlem bölgesinde geçici uyuşma; genellikle 3–6 ayda düzelir. Kalıcı his değişikliği nadirdir.
• Cilt renk değişikliği: Hiperpigmentasyon veya hipopigmentasyon nadir gelişebilir.
• Asimetri: İki taraf arasında kontur farkı; revizyon planlanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yağ Embolisi: Çok nadir ancak ciddi bir komplikasyondur. Yağ damlacıklarının kan dolaşımına girerek akciğer veya diğer organlarda tıkanmaya yol açmasıdır; geniş alanlarda ve çok miktarda yağ alımında risk artar.

Derin Ven Trombozu (DVT) / Pulmoner Emboli: Uzun süreli hareketsizlik ve anestezi ile ilişkilidir; profilaktif önlemler alınır. Bacak ağrısı, şişlik veya ani nefes darlığı durumunda acil başvurunuz.

Cilt Nekrozu: Cilt altında kanlanma bozukluğuna bağlı nadir gelişir; özellikle yüzeysel aşırı aspirasyonlarda risk artar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Diyet ve egzersiz: Genel yağ kaybı için etkili; bölgesel hedefleme mümkün değildir.
• Cryolipolysis (soğuk yağ eritme): Non-invazif; birden fazla seans gerekir, etkisi liposuction'dan daha sınırlıdır.
• HIFU ve radyofrekans: Cilt sıkılaştırma ile birlikte hafif yağ azaltma sağlar.
• Ameliyat yapmama: Mevcut görünümle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan liposuction işlemi, kontur düzensizliği ve cilt sarkması riskleri, DVT ve yağ embolisi gibi ciddi komplikasyonlar, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan işlem hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "dis-implant-onam": {
    basliklar: ["DENTAL İMPLANT AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan dental implant uygulaması hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
Eksik diş/dişlerin yerine titanyum vida (implant fikstur) yerleştirilmesi ve üzerine protetik restorasyon (kuron, köprü veya protez) yapılması.

İmplant sayısı ve bölgesi: .......................................

2. RİSKLER VE KOMPLİKASYONLAR
• Enfeksiyon (periimplantitis)
• İmplant osseointegrasyon (kemikle kaynaşma) başarısızlığı
• Sinir hasarı — geçici veya kalıcı his kaybı/uyuşma (alt çene)
• Sinüs komplikasyonları (üst çene arka bölge)
• Kanama, şişlik, ağrı
• Komşu diş köküne zarar (nadir)
• İmplant kırılması veya vida gevşemesi
• Kemik kaybı — greft ihtiyacı doğabilir

3. BAŞARI KOŞULLARI
• Düzenli ağız hijyeni zorunludur.
• Sigara kullanımı başarı oranını önemli ölçüde düşürür.
• Diyabet, osteoporoz, bisfosfonat kullanımı riski artırır.
• Osseointegrasyon süresi 3–6 ay; bu sürede geçici protez kullanılır.

4. ALTERNATİFLER
• Sabit köprü protezi
• Hareketli (tam/parsiyel) protez
• Boşluğun açık bırakılması

5. HASTA BEYANI
İşlem, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "dis-dolgu-onam": {
    basliklar: ["DİŞ DOLGUSU / KANAL TEDAVİSİ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan diş dolgusu ve/veya kanal tedavisi hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
□ Kompozit (beyaz) dolgu    □ Amalgam dolgu    □ İnley/Onley
□ Kök kanal tedavisi (endodonti)    □ Diğer: .......................

Tedavi yapılacak diş/dişler: .......................................

2. DİŞ DOLGUSUNA AİT RİSKLER
• İşlem sonrası geçici hassasiyet (soğuk/sıcağa)
• Dolgu kırılması veya düşmesi
• Renk uyumsuzluğu (zamanla değişim)
• Derin çürüklerde kök kanal tedavisi ihtiyacı doğabilir

3. KÖK KANAL TEDAVİSİNE AİT RİSKLER
• Alet kırılması (nadir)
• Kanal perforasyonu (nadir)
• Tedavi sonrası ağrı ve şişlik (antibiyotik gerektirebilir)
• Başarısız kanal tedavisi — retreatment veya cerrahi ihtiyacı
• Dişin uzun vadede kırılma riski (kuron önerilir)

4. ALTERNATİFLER
• Diş çekimi
• Tedavinin ertelenmesi (çürük ilerleyebilir)

5. HASTA BEYANI
Tedavi, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "ortodonti-sozlesme": {
    basliklar: ["ORTODONTİ TEDAVİ SÖZLEŞMESİ VE ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, başlatılacak ortodonti tedavisine ilişkin bilgilendirme ve tedavi sözleşmesi niteliği taşımaktadır.

1. PLANLANAN TEDAVİ
□ Metal braket    □ Seramik braket    □ Lingual braket    □ Şeffaf plak (aligner)
Tahmini tedavi süresi: .............. ay

2. TEDAVİNİN AMACI
Diş dizilimi bozukluklarının, çapraşıklıkların ve çene-diş uyumsuzluklarının düzeltilmesi.

3. RİSKLER VE KISITLAMALAR
• Tedavi süresince ağız hijyeninin yetersiz kalması halinde çürük ve diş eti hastalığı riski artar.
• Kök rezorpsiyonu (kök kısalması) — genellikle klinik önemi olmayan miktarda
• Atel/retainer kullanılmadığında nüks (dişlerin eski konumuna dönme) riski
• Geçici konuşma güçlüğü ve rahatsızlık hissi (adaptasyon süreci)
• Beyazlatma lekesi (braket altında dekalsifikasyon) — hijyen ile önlenir

4. HASTA YÜKÜMLÜLÜKLERİ
• Kontrol randevularına düzenli gelme (ortalama her 4–8 haftada bir)
• Hekimin önerdiği hijyen protokolüne uyma
• Sert/yapışkan gıdalardan kaçınma
• Tedavi sonrası retainer kullanımına uyma

5. MALİ KOŞULLAR
Tedavi ücreti, seans sayısı ve ödeme planı randevu sırasında ayrıca bildirilmiştir: .......................................
Hasta uyumsuzluğu veya kendi isteğiyle tedaviyi bırakması halinde o ana kadar yapılan işlemler ücretlendirilir. Yarım kalan tedavi olumsuz sonuçlara yol açabilir. Tüketicinin Korunması Hakkında Kanun (6502) kapsamındaki haklarınız saklıdır.

6. HASTA BEYANI
Tedavi planı, süresi, riskleri ve yükümlülüklerim hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "psikiyatri-ilac-onam": {
    basliklar: ["PSİKİYATRİK İLAÇ TEDAVİSİ AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, başlanacak psikiyatrik ilaç tedavisi hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. TANI VE PLANLANAN İLAÇ TEDAVİSİ
Tanı              : .......................................
Başlanacak ilaç   : .......................................
Doz ve kullanım   : .......................................

2. TEDAVİNİN AMACI
Belirti kontrolü, hastalığın seyrini iyileştirme ve yaşam kalitesini artırma.

3. OLASI YAN ETKİLER
Genel:
• Bulantı, baş dönmesi, ağız kuruluğu (genellikle geçici)
• Uyku bozukluğu veya uyku hali
• Kilo değişimi
• Cinsel işlev değişiklikleri

İlaca özgü yan etkiler hekim tarafından ayrıca açıklanmıştır:
.......................................

4. ÖZEL UYARILAR
• İlaç ani kesilmemelidir — doz azaltma mutlaka hekimle yapılmalıdır.
• Alkol kullanımı ilaç etkisini değiştirebilir ve tehlikeli olabilir.
• Araç ve ağır makine kullanımında dikkatli olunmalıdır.
• Gebelik planlanıyorsa mutlaka hekime bildirilmelidir.
• İlk 2 haftada intihar düşüncesi artışı (özellikle antidepresanlar) — bu durumda derhal başvurunuz.

5. TEDAVİYİ REDDETME HAKKI
Tedaviyi reddetme hakkınız vardır. Bu durumda hastalığın seyri ve riskleri hakkında bilgilendirildiniz.

6. HASTA BEYANI
İlaç tedavisi, etkileri, yan etkileri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "psikoloji-gizlilik": {
    basliklar: ["PSİKOLOJİK DANIŞMANLIK GİZLİLİK SÖZLEŞMESİ VE ONAM FORMU"],
    icerik: `Sayın Danışanımız,

Bu form, psikolojik danışmanlık/psikoterapötik hizmetin koşullarını, gizlilik ilkelerini ve sınırlarını açıklamaktadır.

1. GİZLİLİK İLKESİ
Seans içerisinde paylaşılan tüm bilgiler gizlidir. Üçüncü kişilerle paylaşılmaz.

2. GİZLİLİĞİN İSTİSNALARI (Yasal Zorunluluklar)
Aşağıdaki durumlarda gizlilik ihlal edilmeksizin yasal bildirim yapılabilir/yapılmak zorunda kalınabilir:
• Danışanın kendisine veya başkasına ciddi zarar verme riski
• Çocuk/yaşlı istismar ya da ihmaline ilişkin bilgi
• Mahkeme kararıyla talep edilen bilgiler
• Danışanın başka bir sağlık uzmanına sevk durumu (ilgili bilgilerle sınırlı)

3. SEANS KOŞULLARI
• Seans süresi: genellikle 45–50 dakika
• İptal bildirimi: en az 24 saat öncesinde yapılmalıdır; aksi halde seans ücreti talep edilebilir.
• Seans kayıtları (ses/video) danışan onayı olmaksızın alınmaz.
• Seanslar süpervizyon/eğitim amacıyla anonim olarak tartışılabilir.

4. SÜREÇ VE BEKLENTILER
• Psikolojik danışmanlık, kısa sürede kesin sonuç garantisi vermez.
• Süreç boyunca rahatsız edici duygular yaşanabilir; bu normaldir.
• İlaç tedavisi gerekirse psikiyatri konsültasyonu önerilecektir.

5. İLETİŞİM SINIRLARI
Seans dışında kriz durumları haricinde uzun iletişimlerden kaçınılması beklenir. Kriz durumunda: 182 (ALO Psikiyatri Hattı).

6. DANIŞAN BEYANI
Yukarıdaki koşulları okudum, anladım ve kabul ediyorum.

□ Gizlilik koşullarını ve istisnalarını anladım.
□ Seans koşullarını kabul ediyorum.
□ KVKK kapsamında verilerimin işlenmesine onay veriyorum.

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Uzman Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza       : .......................................`,
  },
  "kardiyoloji-anjio-onam": {
    basliklar: ["KORONER ANJİYOGRAFİ AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan koroner anjiyografi işlemi hakkında 1219 sayılı Kanun kapsamında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
Koroner arterlerin görüntülenmesi amacıyla kasık (femoral) veya bilek (radyal) bölgesinden kateter ilerletilerek kontrast madde verilmesi işlemi. Gerektiğinde aynı seansta anjiyoplasti (balon) ve/veya stent uygulanabilir.

2. İŞLEMİN GEREKÇESİ
.......................................

3. RİSKLER VE KOMPLİKASYONLAR
Genel (<%1):
• Giriş yerinde kanama, hematom, psödoanevrizma
• Kontrast madde alerjisi veya böbrek fonksiyon bozukluğu
• Aritmi (işlem sırasında geçici)
• Enfeksiyon

Ciddi (nadir, <%0.1):
• Miyokard enfarktüsü
• İnme
• Damar hasarı
• Ölüm (yüksek riskli hastalarda)

4. KONTRASTLI İŞLEM UYARISI
• Böbrek yetmezliği varsa önceden bildiriniz.
• Kontrast alerjisi hikayesi varsa önceden bildiriniz.
• Metformin kullananlar işlemden 48 saat önce ilacı kesilmelidir.

5. ANJİYOPLASTİ/STENT UYGULAMASI
Anjiyografi sırasında kritik darlık saptanırsa hekimin kararıyla aynı seansta girişimsel tedavi uygulanabilir. Bu durum için ayrıca onay veriyorum: □ Evet  □ Hayır

6. HASTA BEYANI
İşlem, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "kardiyoloji-genel": {
    basliklar: ["KARDİYOLOJİ HASTA BİLGİ VE ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, kardiyoloji muayenesi, tetkik ve tedavi sürecinize ilişkin bilgilendirme ve onay alınması amacıyla hazırlanmıştır.

1. MEVCUT ŞİKAYETLER
.......................................

2. KARDİYOLOJİK DEĞERLENDİRME KAPSAMINDAKİ İŞLEMLER
□ EKG (Elektrokardiyografi)          □ Ekokardiyografi
□ Efor testi (Stres EKG)             □ Holter monitorizasyon (24 saatlik EKG)
□ Kan basıncı Holter (24 saatlik)    □ Laboratuvar tetkikleri
□ Görüntüleme (BT anjiyografi, MRI)  □ Diğer: .......................

3. EKOKARDİYOGRAFİ / EFOR TESTİ RİSKLERİ
• Efor testi sırasında nadir de olsa aritmi veya anjina atağı gelişebilir; gerekli acil ekipman hazırda bulundurulur.
• Eforlu test kontrendikasyonları varsa hekim değerlendirmesi yapılır.

4. İLAÇ TEDAVİSİ
Başlanan/değiştirilen ilaçlar: .......................................
• Tansiyon ve kalp ilaçları düzenli kullanılmalıdır.
• Hekim önerisi olmaksızın ilaç kesilmemelidir.
• Yan etki şüphesinde derhal başvurunuz.

5. ACİL UYARI BELİRTİLERİ
Aşağıdaki durumlarda 112'yi arayınız veya en yakın acile gidiniz:
• Göğüs ağrısı / baskısı
• Nefes darlığı
• Çarpıntı / bayılma hissi
• Kol/çene/sırt ağrısıyla birlikte terleme

6. HASTA BEYANI
Muayene, tetkik ve tedavi süreci hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "ortopedi-ameliyat-onam": {
    basliklar: ["ORTOPEDİK CERRAHİ AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan ortopedik cerrahi operasyon hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN OPERASYON
İşlem adı       : .......................................
Bölge           : .......................................
Anestezi türü   : □ Genel  □ Spinal/Epidural  □ Lokal

2. OPERASYONUN AMACI
Kırık, eklem hasarı, bağ/kıkırdak yaralanması veya dejeneratif hastalığın cerrahi olarak düzeltilmesi.

3. RİSKLER VE KOMPLİKASYONLAR
Genel cerrahi riskleri:
• Kanama ve hematom
• Yara yeri enfeksiyonu
• Derin ven trombozu / pulmoner emboli
• Anestezi komplikasyonları

Ortopediye özgü riskler:
• İmplant (vida, plak, protez) gevşemesi veya kırılması
• Protez enfeksiyonu (revizyon gerektirebilir)
• Sinir veya damar hasarı — his kaybı, güçsüzlük
• Yavaş veya yetersiz kemik kaynaması
• Komşu eklem sorunları (uzun vadede)
• Hareket kısıtlılığı veya kronik ağrı

4. ANESTEZİ ONAM NOTU
Anestezi risklerine ilişkin ayrı bir anestezi onam formu imzalatılacaktır.

5. REHABİLİTASYON SÜRECİ
Operasyon sonrası fizyoterapi ve rehabilitasyon programı uygulanacaktır. Tam iyileşme süresi operasyona göre 6 hafta–12 ay arasında değişebilir.

6. HASTA BEYANI
Planlanan operasyon, riskleri, alternatifleri ve iyileşme süreci hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.  □ Kabul etmiyorum (din/vicdan gerekçesiyle).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "ortopedi-prp": {
    basliklar: ["PRP / KÖK HÜCRE TEDAVİSİ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan PRP (Trombositten Zengin Plazma) ve/veya kök hücre tedavisi hakkında bilgilendirme ve onay alınması amacıyla, 1219 Sayılı Kanun, Hasta Hakları Yönetmeliği ve Sağlık Bakanlığı Kök Hücre Nakli Yönetmeliği kapsamında düzenlenmiştir. Kök hücre tedavisi Sağlık Bakanlığı'nın ruhsatlandırdığı merkezlerde, onaylı endikasyonlar dahilinde uygulanabilir.

1. PLANLANAN İŞLEM
□ PRP (Trombositten Zengin Plazma) enjeksiyonu
□ Kök hücre tedavisi (Stromal vasküler fraksiyon / Kemik iliği aspiratı)
□ Diğer: .......................................

Uygulama bölgesi: .......................................
Seans sayısı    : .......................................

2. TEDAVİNİN AMACI
Doku hasarının onarımını hızlandırma, enflamasyonu azaltma ve rejenerasyonu destekleme. Eklem kıkırdağı, tendon, bağ hasarı ve dejeneratif eklem hastalıklarında uygulanır.

3. RİSKLER VE KOMPLİKASYONLAR
• Enjeksiyon bölgesinde geçici ağrı, şişlik, morluk
• Enfeksiyon (aseptik teknikle minimize edilir)
• Alerjik reaksiyon (kendi kanından elde edildiğinden çok nadir)
• Yanıt vermeme veya kısmi yanıt
• Semptomların geçici olarak artması (flare reaksiyonu — 48–72 saat)

4. ÖNEMLI NOTLAR
• PRP/kök hücre tedavisi, standart tedavilerin tükenmesi durumunda veya ek tedavi olarak uygulanır.
• Sonuçlar bireyden bireye değişir; tam iyileşme garanti edilemez.
• NSAİ ilaçlar (aspirin, ibuprofen) tedaviden en az 1 hafta önce kesilmelidir.
• Kortikosteroid kullanımı: son enjeksiyondan en az 4 hafta geçmiş olmalıdır.

5. ALTERNATİFLER
• Fizik tedavi ve rehabilitasyon
• Kortikosteroid enjeksiyonu
• Hyalüronik asit enjeksiyonu
• Cerrahi tedavi

6. HASTA BEYANI
Tedavi, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "goz-laser-onam": {
    basliklar: ["EXCİMER LASER (LASIK/LASEK/PRK) AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan excimer laser (LASIK/LASEK/PRK) refraktif cerrahi işlemi hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM VE UYGULANACAK GÖZ
□ LASIK    □ LASEK    □ PRK    □ SMILE    □ Trans-PRK
□ Sağ göz    □ Sol göz    □ Her iki göz

Mevcut refraksiyon: Sağ: ..........    Sol: ..........

2. OPERASYONUN AMACI
Kornea şekli değiştirilerek miyopi, hipermetropi ve/veya astigmatizmanın azaltılması ya da giderilmesi.

3. RİSKLER VE KOMPLİKASYONLAR
• Aşırı/yetersiz düzeltme — gözlük/lens ihtiyacı devam edebilir
• Gece görüşünde halelenmeler, parlama (halo/glare)
• Kuru göz sendromu (geçici veya kalıcı)
• Kornea ektazisi (LASIK'ta flap sorunları — nadir)
• Enfeksiyon veya kornea ülseri (çok nadir)
• Görme keskinliğinde kalıcı düşüş (çok nadir)
• Flap kayması veya katlantısı (LASIK'a özgü, nadir)

4. KİME UYGULANMAZ
• Kornea kalınlığı yetersiz hastalar
• Keratokonus veya kornea hastalığı bulunanlar
• Gebelik/emzirme dönemindekiler
• 18 yaş altı / refraksiyonu stabil olmayan hastalar
• Ciddi kuru göz sendromu bulunanlar

5. POSTOPERATIF SÜREÇ
• Koruyucu gözlük: ilk 1–2 hafta
• Kontrol muayeneleri: 1. gün, 1. hafta, 1. ay, 3. ay, 1. yıl
• Yüzme/sauna: ilk 1 ay yasak
• Kontak lens: tedaviden en az 1 ay önce çıkarılmış olmalı

6. HASTA BEYANI
İşlem, riskleri, alternatifleri ve postoperatif koşullar hakkında yeterince bilgilendirildim. Kendi özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "goz-katarakt-onam": {
    basliklar: ["KATARAKT OPERASYONU AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan katarakt operasyonu hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
Saydam olmaktan çıkmış göz merceğinin (katarakt) uzaklaştırılarak yerine yapay göz içi lensi (İOL) yerleştirilmesi.

□ Sağ göz    □ Sol göz
Planlanan lens tipi: .......................................

2. KATARAKT OPERASYONUNUN GEREKÇESİ
Katarakt nedeniyle günlük aktiviteleri kısıtlayan görme kaybı. Tedavisi olmayan tek yöntem cerrahidir.

3. RİSKLER VE KOMPLİKASYONLAR
İşlem sırasında:
• Posterior kapsül rüptürü — cam cismini (vitreus) etkileyebilir
• Iris veya kornea hasarı (nadir)
• Anestezi komplikasyonları

Sonrasında:
• Endoftalmi (göz içi enfeksiyon) — çok nadir, görme kaybı riski taşır
• Retina dekolmanı (nadir)
• Posterior kapsül opasifikasyonu (sekonder katarakt) — lazer ile tedavi edilir
• Göz içi basınç artışı
• Kornea ödemi
• Lens yanlış hesabı — artık refraksiyon, gözlük ihtiyacı

4. ANESTEZİ
□ Topikal (göz damlaları)    □ Peribulber    □ Genel anestezi

5. POSTOPERATIF BAKAM
• Antibiyotik ve antienflamatuar göz damlaları (4–6 hafta)
• İlk 2 haftada göze su/sabun kaçırmama
• Ağır yük kaldırmama, eğilmeme (ilk 1 hafta)
• Kontrol: 1. gün, 1. hafta, 1. ay

6. HASTA BEYANI
Operasyon, riskleri ve postoperatif süreç hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "dermatoloji-botoks": {
    basliklar: ["BOTOKS / DOLGU ENJEKSİYONU AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan botulinum toksini (botoks) ve/veya yüz dolgusu (filler) uygulaması hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PLANLANAN UYGULAMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ A. Botulinum Toksini (Botoks)     □ B. Hyalüronik Asit Dolgu
□ C. Kalsiyum Hidroksilapatit       □ D. Poli-L-Laktik Asit
□ E. Diğer dolgu: .....................................................

Uygulama bölgesi(leri): .......................................
Doz/miktar            : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. BOTOKS — BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Botulinum toksini; yüz mimik kaslarına enjekte edilerek kas kontraksiyonunu geçici olarak zayıflatır ve kırışıklıkları azaltır. Ayrıca bruksizm, hiperhidroz ve migren profilaksisinde de kullanılır. Etki 3–6 ay sürer; sonrasında kas aktivitesi geri döner. Etki süresi kişiden kişiye farklılık gösterir.

Kullanılacak preparat: .......................................   Ünite: ..........

Botoks Erken Dönem Komplikasyonları:
• Enjeksiyon bölgesinde geçici ağrı, kızarıklık, hafif morluk (1–3 gün)
• Baş ağrısı: İlk 24–48 saatte görülebilir; nadiren birkaç güne uzar
• Bulantı: Nadir, geçici

Botoks Geç Dönem Komplikasyonları:
• Kaş pitozu (düşüklüğü): Alın bölgesine botoks uygulamasında frontalis kası fazla etkilenirse kaş düşüklüğü oluşabilir. Geçici göz damlası (apraclonidine) ile tedavi edilebilir; 8–12 haftada düzelir.
• Göz kapağı pitozu: Üst kapağa yakın injeksiyonlarda çok nadir; yine geçicidir.
• Difüzyon (yayılım): Botoks komşu kaslara yayılarak istenmeyen kas zayıflığına yol açabilir. Gülümseme asimetrisi, dudak kenarı düşüklüğü bu tabloya örnektir.
• Asimetri: Kasların etkilenme düzeyindeki farklılıktan kaynaklanabilir; düzeltici doz ile yönetilir.
• Yetersiz etki veya beklenti karşılanamaması: Doz veya teknik ile ilgilidir; takip seansında değerlendirilir.
• Uzak yayılım (FDA uyarısı): Terapötik dozlarda son derece nadir; yutma güçlüğü veya nefes güçlüğü oluşursa acil başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. DOLGU ENJEKSİYONU — BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dermal dolgu maddeleri; hacim kaybı, derin kırışıklıklar veya kontur bozuklukları için cilde enjekte edilir. Hyalüronik asit dolgular geçici (%6–18 ay), bazı diğer dolgu maddeleri daha kalıcı etki gösterir.

Dolgu Erken Dönem Komplikasyonları:
• Morluk, şişlik ve hassasiyet: Enjeksiyon sonrası 1–2 haftada büyük ölçüde iner.
• Kızarıklık: Birkaç gün sürebilir.
• Ağrı: Enjeksiyon sırasında ve hemen sonrasında; lokal anestezik krem/blok ile azaltılır.
• Geçici asimetri: Şişlik azaldıkça düzelebilir.

Dolgu Geç Dönem Komplikasyonları:
• Granülom (geç enflamasyon): Dolgu materyaline karşı immün yanıt; aylarca sonra gelişebilir. Kortikosteroid enjeksiyonu veya hyaluronidaz ile tedavi edilir.
• Biyofilm enfeksiyonu: Bakterilerin dolgu etrafında biyofilm tabakası oluşturması; antibiyotike yanıtsız enfeksiyona yol açabilir. Hyaluronidaz ve uzun süreli antibiyotik tedavisi gerekebilir.
• Dolgu migrasyonu: Dolgu maddesinin uygulama bölgesinden zamanla kayması.
• Nodül oluşumu: Yüzeysel enjeksiyonlarda veya yanlış teknikte görülür; hyaluronidazla çözülebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vasküler Oklüzyon (Damar Tıkanması): En ciddi komplikasyondur. Dolgu maddesinin yanlışlıkla bir damar içine veya damar yakınına enjekte edilmesiyle kanlanma bozulur. Yüz derisinde kırmızı-mor renk değişikliği ve ağrı ilk belirtilerdir. Hızlı tedavi edilmezse cilt nekrozuna yol açabilir.

Körlük Riski: Dolgunun retinal veya oftalmik artere ulaşmasıyla görme kaybı gelişebilir. Bu komplikasyon son derece nadir ancak geri dönüşümsüzdür. Nazo-glabellar bölge, burun ve yanak enjeksiyonları en yüksek risk taşır. Hekimin vasküler anatomiye hakimiyeti ve uygun teknik kullanımı riski en aza indirir. Enjeksiyon sırasında gözlerde kararmaya benzer bir his yaşarsanız hemen haber veriniz.

Alerjik Reaksiyon ve Anafilaksi: Hyalüronik asit için anafilaksi çok nadirdir. İşlem sırasında ve sonrasında 20–30 dakika gözlem uygulanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. KONTRENDİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Gebelik ve emzirme dönemi
• Aktif deri enfeksiyonu (uçuk, akne, egzama) uygulama bölgesinde
• Nöromusküler hastalıklar (myastenia gravis, Lambert-Eaton sendromu) — botoks için
• Kanama bozuklukları veya antikoagülan kullanımı (morluk riski artar)
• Dolgu bölgesinde aktif enfeksiyon veya inflamasyon

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. TEKRARLAYİCİ DOZ BİLGİSİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Botoks etkisi 3–6 ayda azalır; koruyucu etki için düzenli tekrar enjeksiyonu gerekir. Uzun süreli kullanımda kasların zayıflaması nedeniyle doz gereksinimi azalabilir.

Dolgu etki süresi ürün tipine ve uygulama bölgesine göre 6–24 ay arasında değişir. Yıpranma hissedildiğinde ek dolgu planlanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Topikal retinoid ve antiaging kremler: Kırışıklıkları azaltır; etki botokstan çok daha yavaş ve sınırlıdır.
• Lazer yüzey yenileme, kimyasal peeling: Yüzeysel kırışıklık ve leke tedavisinde etkili.
• PRP veya HIFU: Cilt kalitesini artırır; hacim kaybını dolgu kadar etkin düzeltemez.
• Cerrahi (fasiyal lifting): Belirgin sarkma için daha kalıcı çözüm.
• İşlem yapmama: Mevcut görünümle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan botoks ve/veya dolgu enjeksiyonu, ptoz ve difüzyon riskleri, vasküler oklüzyon ve körlük riski dahil olası komplikasyonlar, tekrar doz gerekliliği, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu uygulamaya onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraflı belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan uygulama hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "dermatoloji-lazer": {
    basliklar: ["DERMATOLOJİK LAZER TEDAVİSİ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan dermatolojik lazer tedavisi hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
Lazer türü       : .......................................
Uygulama bölgesi : .......................................
Endikasyon       : □ Tüy giderme  □ Leke tedavisi  □ Damarsal lezyon
                   □ Yara izi     □ Gençleştirme   □ Diğer: .....

2. RİSKLER VE KOMPLİKASYONLAR
• Geçici kızarıklık, şişlik (birkaç gün)
• Hiperpigmentasyon (koyu leke) — güneşten korunmayla önlenir
• Hipopigmentasyon (açık leke) — nadir, kalıcı olabilir
• Yanık, kabarcık oluşumu (uygunsuz parametre kullanımında)
• Skar oluşumu (nadir)
• Enfeksiyon (özellikle ablatif lazerlerde)
• Herpetik reaktivasyon (predispozisyonu olanlarda — profilaksi verilir)
• Tüy giderimde tam kalıcılık garantisi verilemez

3. GÜNEŞTEN KORUNMA ZORUNLULUĞU
Lazer tedavisi öncesi ve sonrası güneşten korunma kritik önem taşır. Güneşlenme, pigmentasyon komplikasyonları riskini artırır. SPF 50+ güneş kremi kullanımı zorunludur.

4. SEANS SAYISI
Çoğu endikasyon birden fazla seans gerektirir. Seans aralıkları ve sayısı tedaviye yanıta göre belirlenir.

5. KONTRENDİKASYONLAR
• Aktif tan (güneş yanığı)
• Fotosensitizan ilaç kullanımı
• Gebelik (bazı lazer türleri için)
• Aktif herpes lezyonu

6. HASTA BEYANI
Tedavi, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "kbb-ameliyat-onam": {
    basliklar: ["KBB (KULAK BURUN BOĞAZ) CERRAHİ AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan KBB cerrahi operasyonu hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN OPERASYON
İşlem adı       : .......................................
(Örn: Tonsillektomi, Septoplasti, FESS, Timpanik membran onarımı, Adenoidektomi)
Anestezi türü   : □ Genel  □ Lokal/Sedasyon

2. OPERASYONUN AMACI
.......................................

3. RİSKLER VE KOMPLİKASYONLAR
Genel:
• Kanama (primer/sekonder) — en sık, hastaneye yatışı gerektirebilir
• Enfeksiyon
• Anestezi komplikasyonları

Operasyona Özgü Riskler:
Tonsillektomi/Adenoidektomi:
• Postoperatif kanama (operasyon veya 7–10. günde)
• Yutma güçlüğü (geçici)
• Nazofarinks skarı (nadir, adenoid)

Septoplasti/FESS:
• His değişikliği / koku alma değişimi
• Serebrospinal sıvı kaçağı (nadir)
• Göz eti hasarı (FESS'te nadir)
• Septal perforasyon

Timpanik membran/Kulak:
• İşitme değişikliği
• Yüz siniri hasarı (kronik kulak hastalıklarında)
• Labirent hasarı — denge bozukluğu

4. POSTOPERATİF SÜREÇ
• Kanama kontrolü için ilk 2 hafta ağır efor yasak
• Aspirin/NSAİ kullanımı: en az 10 gün önceden kesilmeli
• Gargara ve burun bakımı hekimin önerisine göre

5. HASTA BEYANI
Planlanan operasyon, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.  □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "cocuk-asi-onam": {
    basliklar: ["AŞI UYGULAMA AYDINLATILMIŞ ONAM FORMU (EBEVEYNİ/VASİSİ İÇİN)"],
    icerik: `Sayın Ebeveyn/Vasimiz,

Bu form, çocuğunuza uygulanacak aşı(lar) hakkında bilgilendirme ve yazılı onayınızı almak amacıyla düzenlenmiştir.

1. UYGULANACAK AŞI(LAR)
Aşı adı ve dozu: .......................................
Uygulama tarihi: .......................................

2. AŞI PROGRAMI KAYNAĞI
Türkiye Cumhuriyeti Sağlık Bakanlığı Genişletilmiş Bağışıklama Programı (GBP) kapsamındaki aşılar ve/veya ek önerilen aşılar.

3. AŞININ AMACI
Belirtilen hastalıklara karşı bağışıklık oluşturulması ve toplum sağlığının korunması.

4. OLASI YAN ETKİLER
Hafif (sık, geçici):
• Enjeksiyon bölgesinde kızarıklık, şişlik, hassasiyet
• Düşük ateş (38°C altı) — 1–3 gün
• Huzursuzluk, ağlama
• Hafif döküntü (canlı aşılarda)

Orta:
• Yüksek ateş (38°C üstü) — ateş düşürücü ile kontrol edilir
• Lokal şişlik (bazı aşılarda 3–7 gün sürebilir)

Ciddi (çok nadir):
• Alerjik reaksiyon (anafilaksi) — aşı sonrası 15–30 dk gözlem altında tutulur
• Febril konvülsiyon (ateşe bağlı, MMR gibi canlı aşılarda nadir)

5. UYARI
Aşı öncesinde çocuğunuzun aktif hastalığı, bilinen alerjisi veya immün yetmezliği varsa hekiminize bildiriniz.

6. AŞI SONRASI TAKİP
• Klinik/hastaneden ayrılmadan önce 20–30 dakika bekleyiniz.
• Ateş ve ağrı için paracetamol (hekimin onayladığı doz).
• Enjeksiyon bölgesini ovalamayınız.
• 38.5°C üstü ateş veya ciddi reaksiyon halinde hekime başvurunuz.

7. EBEVEYNİN BEYANI
Çocuğumun velisi/vasisi sıfatıyla yukarıdaki bilgileri okudum ve anladım.

□ Bilgileri okudum, anladım. Aşı uygulamasına ONAY VERİYORUM.
□ Bilgileri okudum. Aşı uygulamasını REDDEDIYORUM; aşı ret beyan formunu ayrıca imzalamayı kabul ederim.
□ KVKK kapsamında çocuğumun sağlık verilerinin işlenmesine onay veriyorum.

Çocuğun Adı Soyadı : .......................................    Doğum Tarihi: ................
Ebeveyn/Vasi Adı   : .......................................    Yakınlık: .......................
T.C. Kimlik No      : .......................................
Tarih               : .......................................    İmza: ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },
  "cocuk-genel-onam": {
    basliklar: ["PEDİATRİ GENEL MUAYENE VE İŞLEM ONAM FORMU (EBEVEYNİ/VASİSİ İÇİN)"],
    icerik: `Sayın Ebeveyn/Vasimiz,

Bu form, 18 yaşın altındaki hastanın muayene ve tedavi sürecine ilişkin bilgilendirme ve veli/vasi onayı alınması amacıyla düzenlenmiştir.

1. HASTA BİLGİLERİ
Adı Soyadı     : .......................................
Doğum Tarihi   : .......................................
Yakınlığınız   : □ Anne  □ Baba  □ Yasal Vasi

2. BAŞVURU ŞİKAYETİ
.......................................

3. PLANLANAN DEĞERLENDİRME VE İŞLEMLER
□ Fizik muayene                     □ Kan/idrar tahlili
□ Aşı uygulaması                    □ Görüntüleme (röntgen, USG)
□ Minör cerrahi (yara kapatma vb.)  □ İlaç tedavisi
□ Diğer: .......................................

4. ÇOCUK HEKİMLİĞİNE AİT GENEL BİLGİLENDİRME
• Pediyatrik hastalarda belirtiler erişkinlerden farklı seyredebilir; klinik takip önemlidir.
• Çocuğunuzun kiloya uygun doz hesabı yapılır; ilaç başlanması veya değiştirilmesinde ebeveyn bilgilendirilir.
• Acil durum işlemleri (solunum yolu tıkanıklığı, bilinç bozukluğu vb.) ebeveyn onayı beklenmeksizin uygulanabilir.

5. AİLEDEN BEKLENTİLER
• Çocuğun önceki hastalık/ameliyat/ilaç/alerji geçmişini eksiksiz bildirin.
• Kontrol randevularına uyun.
• Belirtiler kötüleşirse beklemeden başvurun.

6. ACİL BAŞVURU GEREKTİREN DURUMLAR
• Yüksek ateş (3 ay altında 38°C üstü, her yaşta 39.5°C üstü)
• Solunum sıkıntısı, burun kanadı solunumu
• Bilinç değişikliği, kas seğirmeleri
• Döküntü + ateş birlikteliği

7. EBEVEYNİN BEYANI
Çocuğumun velisi/vasisi sıfatıyla yukarıdaki bilgileri okudum ve anladım. Planlanan muayene ve işlemlere onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında çocuğumun sağlık verilerinin işlenmesine onay veriyorum.

Ebeveyn/Vasi Adı Soyadı : .......................................
T.C. Kimlik No           : .......................................
Tarih                    : .......................................    İmza: ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },
  "kvkk-hasta": {
    basliklar: ["KVKK AÇIK RIZA BEYANI"],
    icerik: `6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, aşağıda belirtilen kişisel ve sağlık verilerimin işlenmesine ilişkin açık rızamı beyan ederim.

1. VERİ SORUMLUSU
Sağlık kuruluşu ve/veya hekim.

2. İŞLENECEK VERİLER
• Kimlik bilgileri (Ad, soyad, T.C. Kimlik No, doğum tarihi)
• İletişim bilgileri (Telefon, e-posta, adres)
• Sağlık verileri (Tıbbi geçmiş, tanı, tedavi bilgileri, laboratuvar sonuçları)
• Finansal bilgiler (Ödeme ve fatura bilgileri)

3. VERİ İŞLEME AMAÇLARI
• Sağlık hizmetlerinin planlanması ve yürütülmesi
• Randevu ve takip süreçlerinin yönetimi
• Yasal yükümlülüklerin yerine getirilmesi
• İkinci görüş ve konsültasyon süreçleri

4. VERİ AKTARIMI
Kişisel verileriniz; kamu sağlık kurumları, sigorta şirketleri ve hizmet sağlayıcılarla KVKK'ya uygun olarak paylaşılabilir.

5. HAKLARINIZ
KVKK'nın 11. maddesi kapsamında verilerinize erişim, düzeltme, silme ve aktarım hakkına sahipsiniz.

□ Yukarıda belirtilen koşullarla kişisel verilerimin işlenmesine ONAY VERİYORUM.
□ Sağlık verilerimin işlenmesine AÇIK RIZA VERİYORUM.

Ad Soyad: ___________________________    Tarih: _______________
T.C. Kimlik No: _______________________    İmza: _______________`,
  },
  "anestezi-sedasyon-onam": {
    basliklar: ["ANESTEZİ / SEDASYON AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan cerrahi operasyon veya girişimsel işlem için uygulanacak anestezi/sedasyon hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN ANESTEZİ TİPİ
□ Genel anestezi (entübasyon)
□ Spinal / Epidural anestezi
□ Lokal anestezi / Sinir bloğu
□ Sedasyon (bilinçli / derin)
□ Monitörize anestezi bakımı (MAC)

Anestezi uygulanacak işlem: .......................................

2. ANESTEZİYE BAĞLI RİSKLER
Hafif / Geçici (sık):
• Bulantı, kusma
• Boğaz ağrısı, ses kısıklığı (entübasyon sonrası)
• Uyku hali, baş dönmesi
• Kas ağrısı

Orta (nadir):
• Diş hasarı (entübasyon sırasında)
• Alerjik reaksiyon
• Kan basıncı dalgalanması

Ciddi (çok nadir):
• Aspirasyon (açlık kuralı ihlalinde risk artar)
• Malign hipertermi (genetik yatkınlık)
• Anafilaksi
• Kalıcı nörolojik hasar
• Ölüm (genel popülasyonda 1/100.000 – 1/200.000)

3. SPİNAL / EPİDURAL ANESTEZİYE ÖZGÜ RİSKLER
• Şiddetli baş ağrısı (post-dural ponksiyon) — istirahatle düzelir
• Geçici alt ekstremite güçsüzlüğü
• İdrar tutulması — sonda gerektirebilir
• Sinir hasarı (çok nadir)

4. ANESTEZİ ÖNCESİ ZORUNLU KURALLAR
• Operasyondan 6 saat önce katı gıda, 2 saat önce sıvı alınmamalıdır (acil haller hariç).
• Kan sulandırıcı ilaçlar için anestezist onayı alınmalıdır.
• Bilinen ilaç/uyuşturucu alerjileri mutlaka bildirilmelidir.
• Daha önce anesteziye bağlı sorun yaşandıysa belirtiniz.
• Takma diş, lens ve takı çıkarılmalıdır.

5. ALTERNATİFLER
• Farklı anestezi tipi (klinik değerlendirmeye bağlı)
• Sadece lokal anestezi ile işlem (uygunsa)
• Operasyonun ertelenmesi veya vazgeçilmesi

6. HASTA BEYANI
Planlanan anestezi/sedasyon, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Açlık kurallarına uyacağımı ve tüm ilaç/alerji bilgilerimi bildirdiğimi beyan ederim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN ANESTEZİST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Anestezist Adı/Unvanı : .......................................
Diploma No            : .......................................
Tarih/İmza/Kaşe       : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "kan-transfuzyon-onam": {
    basliklar: ["KAN / KAN ÜRÜNÜ TRANSFÜZYONU AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan kan veya kan ürünü transfüzyonu hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. TRANSFÜZYON GEREKÇESİ
.......................................

2. UYGULANACAK KAN ÜRÜNÜ
□ Tam kan
□ Eritrosit süspansiyonu (ES)
□ Taze donmuş plazma (TDP)
□ Trombosit süspansiyonu
□ Albümin
□ Diğer: .......................................

3. TRANSFÜZYONUN AMACI
Hemoglobin düzeyinin yükseltilmesi, pıhtılaşma faktörlerinin tamamlanması veya kan volümünün desteklenmesi.

4. RİSKLER
Hafif (sık):
• Ateş, titreme (febril non-hemolitik reaksiyon)
• Lokal cilt reaksiyonu

Orta (nadir):
• Alerjik reaksiyon (ürtiker, kaşıntı)
• Volüm yüklenmesi (kalp/böbrek hastaları)

Ciddi (çok nadir):
• Hemolitik transfüzyon reaksiyonu (kan grubu uyumsuzluğu)
• Akut akciğer hasarı (TRALI)
• Enfeksiyon bulaşı (HIV, Hepatit B/C) — modern tarama yöntemleriyle risk çok düşük
• Anafilaksi

5. KAN REDDİ HAKKI
Kan/kan ürünü transfüzyonunu reddetme hakkınız vardır. Reddetmeniz durumunda tedavinin olası sonuçları hakkında bilgilendirildiniz.

□ Transfüzyon gerekirse ONAY VERİYORUM.
□ Dini/kişisel gerekçeyle transfüzyonu REDDEDIYORUM ve bu kararın tıbbi sonuçlarını kabul ediyorum.

6. HASTA BEYANI
Transfüzyon, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle beyanımı bildiriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "online-muayene-onam": {
    basliklar: ["UZAKTAN SAĞLIK HİZMETİ (TELETıP) AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, Sağlık Bakanlığı Uzaktan Sağlık Hizmetleri Yönetmeliği kapsamında sunulacak uzaktan muayene/danışmanlık hizmetine ilişkin bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. HİZMETİN KAPSAMI
□ Video görüşme ile muayene / konsültasyon
□ Takip muayenesi
□ İkinci görüş / danışma

Kullanılacak platform: .......................................

2. UZAKTAN MUAYENENİN SINIRLILIKLARI
• Fizik muayene yapılamamaktadır; bazı klinik bulgular değerlendirilemeyebilir.
• Bağlantı kalitesi tanı sürecini etkileyebilir.
• Acil ve hayati durumlarda uzaktan hizmet yetersiz kalır; 112'yi arayınız.
• Reçete ve rapor düzenlenmesi yasal kısıtlara tabidir.

3. GİZLİLİK VE VERİ GÜVENLİĞİ
• Görüşmeler şifreli bağlantı üzerinden gerçekleştirilir.
• Görüşmeler kaydedilmez; ekran görüntüsü/kayıt almak yasaktır.
• Üçüncü kişilerin bulunduğu ortamlarda görüşme yapılmaması önerilir.
• Paylaşılan sağlık verileri hasta dosyasına işlenir; KVKK md. 6 kapsamında korunur.

4. ACİL DURUM BİLDİRİMİ
Görüşme sırasında acil belirti saptanırsa hekim 112'ye yönlendirme yapacaktır.

5. ÜCRET
Uzaktan muayene ücreti: .......................................
Teknik sorun nedeniyle gerçekleşmeyen görüşmelerde ücret alınmaz.

6. HASTA BEYANI
Uzaktan sağlık hizmetinin kapsam ve sınırlılıkları hakkında bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında verilerimin işlenmesine onay veriyorum.
□ Acil durumda 112'yi arayacağımı kabul ediyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
  "asi-ret-formu": {
    basliklar: ["AŞI REDDİ BEYAN FORMU"],
    icerik: `Sayın Ebeveyn / Hastamız,

Bu form, önerilen aşı uygulamasını reddeden ebeveyn/vasi veya yetişkin hastanın 1593 Sayılı Umumi Hıfzıssıhha Kanunu kapsamında bilgilendirildiğini ve reddi kendi iradesiyle gerçekleştirdiğini belgelemek amacıyla düzenlenmiştir.

1. REDDEDİLEN AŞI
Aşı adı ve dozu : .......................................
Planlanan uygulama tarihi: .......................................

2. HEKİM BİLGİLENDİRMESİ
Aşağıdaki konularda bilgilendirme yapılmıştır:
• Reddedilen aşının koruduğu hastalık(lar) ve bulaş yolları
• Aşılanmama halinde oluşabilecek hastalık riski ve komplikasyonlar
• Hastalığın toplum sağlığına olası etkisi (sürü bağışıklığının bozulması)
• Aşıya bağlı yan etkiler ve bunların geçici/nadir niteliği
• Ulusal aşı takvimindeki yeri ve Sağlık Bakanlığı tavsiyesi

3. RED GEREKÇESİ (isteğe bağlı)
□ Dini gerekçe
□ Kişisel inanç / felsefi gerekçe
□ Önceki aşı reaksiyonu
□ Tıbbi kontrendikasyon (belirtiniz: ...................................)
□ Diğer: .......................................

4. YASAL UYARI
• 1593 Sayılı Kanun kapsamında salgın durumlarında zorunlu aşılama kararı alınabilir.
• Aşısız birey, bağışıklığı zayıf bireyler için risk oluşturabilir.
• Aşı reddi, kreş/okul kayıt süreçlerini etkileyebilir (ilgili yönetmeliklere bağlı olarak).

5. BEYAN
Yukarıdaki bilgileri okudum ve anladım. Hekimim tarafından sözlü olarak da bilgilendirildim. Olası sonuçların sorumluluğunu kabul ederek belirtilen aşı uygulamasını REDDEDIYORUM.

□ Bilgileri okudum, anladım. Aşıyı REDDEDIYORUM.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

Ad Soyad                    : .......................................    Tarih: ................
T.C. Kimlik No              : .......................................    İmza : ................
Çocuğun Adı Soyadı (varsa) : .......................................
Ebeveyn/Vasi Yakınlığı     : .......................................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },
  "genel-muayene-onam": {
    basliklar: ["GENEL MUAYENE VE TEDAVİ AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, sizi muayene ve tedavi sürecine ilişkin bilgilendirmek ve onayınızı almak amacıyla hazırlanmıştır.

1. TANIMLAMA
Muayene ve tedavi sırasında gerekli tıbbi işlemlerin uygulanmasına onay vermektesiniz. Hekiminiz tanı, tedavi seçenekleri, olası riskler ve alternatifler hakkında sizi bilgilendirmiş/bilgilendirecektir.

2. OLASI RİSKLER
Her tıbbi işlemin kendine özgü riskleri bulunmaktadır. Hekiminiz size özel riskleri açıklayacaktır.

3. HAKLARINIZ
• Tedaviyi reddetme hakkınız vardır
• İkinci görüş alma hakkınız vardır
• Gizliliğinizin korunması hakkınız vardır

4. BEYAN
Hekimim tarafından muayene ve tedavim hakkında yeterince bilgilendirildim. Sorularımı sormak için fırsatım oldu.

Ad Soyad: ___________________________    Tarih: _______________
Doğum Tarihi: _______________________    İmza: _______________
Yakını (18 yaş altı): _________________    Yakın İmzası: ________`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ESTETİK CERRAHİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "meme-buyutme-onam": {
    icerik: `MEME BÜYÜTME (AUGMENTASYON MAMMOPLASTİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan meme büyütme ameliyatı hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Augmentasyon mammoplasti; meme hacmini ve şeklini artırmak amacıyla silikon jel veya tuzlu su dolu implantların meme dokusu altına (submammarian), göğüs kası altına (submüsküler) veya her ikisi arasına (dual plane) yerleştirilmesi işlemidir. Genel anestezi altında uygulanır; operasyon süresi genellikle 1–2 saattir.

İmplant kesi yeri; göğüs altı kıvrımından (inframamarian), meme başı çevresinden (periareolar) veya koltukaltından (aksiller) seçilebilir. Her yaklaşımın avantaj ve iz riski farklıdır. Hekim, anatomik yapınıza ve beklentilerinize göre en uygun seçeneği önerir.

Meme büyütme ameliyatı öznel bir estetik girişimdir; sonuçlar kişinin deri yapısına, meme anatomisine ve iyileşme kapasitesine göre değişir. Kesin boyut veya şekil garantisi verilemez.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. AMELİYAT ÖNCESİ HAZIRLIK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Aspirin, NSAİ ve kan sulandırıcı ilaçlar ameliyattan en az 10 gün önce kesilmelidir
• Sigara kullanımı yara iyileşmesini olumsuz etkiler; en az 4 hafta bırakılması önerilir
• 40 yaş üstü hastalarda veya birinci derece akrabada meme kanseri öyküsü varsa mamografi/ultrasonografi istenebilir
• E vitamini, balık yağı ve bitkisel takviyeler 2 hafta öncesinden kesilmelidir
• Operasyon günü aç gelinmeli (en az 6 saat katı gıda, 2 saat sıvı alınmamalıdır)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. İMPLANT BİLGİSİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kullanılacak implant markası : ........................................................
Hacim (cc)                   : ......................
Profil                       : □ Düşük  □ Orta  □ Yüksek  □ Ultra Yüksek
Yüzey                        : □ Pürüzsüz  □ Dokulu (textured)
Şekil                        : □ Yuvarlak  □ Anatomik (damlacık)
Yerleştirme planı            : □ Submammarian  □ Submüsküler  □ Dual plane
Kesi yeri                    : □ İnframamarian  □ Periareolar  □ Aksiller

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. AMELİYAT SÜRESİ VE İYİLEŞME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operasyon 1–2 saat sürer ve genellikle 1 gece hastanede kalış gerekir. Ameliyat sonrası ilk günlerde gerginlik, ağrı ve şişlik belirgindir; ağrı kesici tedaviyle yönetilir. Özel destek sütyeni en az 6 hafta kullanılmalıdır. Ağır egzersiz ve kol üstüne yük alma ilk 4–6 hafta yasaktır. İyileşme sürecinde nihai görünüm 3–6 ayda ortaya çıkar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama ve hematom: İmplant cebinde kan birikmesidir; drenaj veya yeniden ameliyat gerektirebilir. Riski %1–2 civarındadır.
• Enfeksiyon: Ateş, artan ağrı veya akıntı ile kendini gösterir. Antibiyotik tedavisine yanıt vermezse implant geçici olarak çıkarılabilir.
• Yara iyileşme sorunları: Özellikle periareolar kesiyle ilişkili; sigara kullanımında risk artar.
• Seroma: İmplant çevresinde sıvı birikmesi; drenaj gerektirebilir.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kapsüler kontraktür: İmplant etrafında oluşan skar dokusunun sertleşmesidir. Baker sınıflamasına göre Grade III–IV'te ağrı ve şekil bozukluğu mevcuttur; revizyon gerektirebilir. Riski %1–10 arasında değişir; tekstüre implantlarda daha düşüktür.
• İmplant rüptürü: Silikon implantlarda "silent rupture" (sessiz yırtılma) olabilir; MRI ile saptanır. Tuzlu su implantlarda defasyon belirgindir. Yırtılan implantın çıkarılması veya değiştirilmesi gerekir.
• İmplant yer değiştirmesi (displacement): İmplant cebinde aşağı, yukarı veya yana kayabilir; revizyon ameliyatı gerektirir.
• Dalga veya kıvrım görünümü (rippling): İnce ciltli veya submammarian yerleşimli hastalarda implant kıvrımları cilt altında hissedilebilir ya da görünür hale gelebilir.
• Meme başı his değişikliği: Geçici veya kalıcı his artışı ya da azalması gelişebilir; riski yaklaşık %15'tir.
• Emzirme kapasitesinde değişim: Periareolar kesi ile uygulanan implantlarda süt kanallarına yakınlık nedeniyle emzirme kapasitesi etkilenebilir. Submüsküler yerleşimde bu risk daha düşüktür. Emzirme planınızı hekiminizle paylaşınız.
• İmplant görünür iz bölgelerinden sızıntı (extracapsular silicone): Çok nadir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BIA-ALCL (Breast Implant-Associated Anaplastic Large Cell Lymphoma — İmplant İlişkili Büyük Hücreli Lenfoma): Tekstüre (dokulu) yüzeyli implantlarla çok düşük oranda ilişkilendirilmiş, meme bezi kaynaklı nadir bir lenfoma türüdür. Seröz sıvı birikimi veya kitle şeklinde bulgu verir. Erken tespit ve implant çıkarımıyla büyük çoğunluğu tamamen iyileşir. Dünya genelinde insidansı 1/1.000–1/10.000 olarak bildirilmektedir.

Meme Kanseri Taraması: İmplant varlığı meme kanseri gelişme riskini artırmamakla birlikte mamografide ek pozisyonlar (Eklund tekniği) gerekebilir. Düzenli takip ve yıllık meme muayenesi önem taşır.

Asimetri: Doğal asimetri veya iyileşme sürecindeki farklılıklar nedeniyle iki meme arasında küçük boyut veya şekil farkları kalabilir.

Kronik Ağrı: Nadir de olsa uzun süreli ağrı ya da rahatsızlık gelişebilir.

Uzun Dönem Etkiler: İmplantların ömrü sınırsız değildir; ortalama 10–20 yıl içinde değiştirilmesi gerekebilir. Yaşlanma ve kilo değişimleri estetik sonucu etkiler.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Yağ enjeksiyonu (lipofilling): Kendi yağ dokunuzun memeye enjekte edilmesi. İmplanta göre daha sınırlı hacim artışı sağlar; birden fazla seans gerekebilir.
• Özel sütyen / protez: Estetik amaçlı geçici çözüm.
• Ameliyat yapmama: Mevcut meme boyutuyla yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan meme büyütme ameliyatı, implant tipleri ve özellikleri, olası erken ve geç dönem komplikasyonlar, BIA-ALCL riski, emzirme ve meme kanseri taramasına etkileri, alternatif tedaviler ve beklenen sonuçlar hakkında Türkçe olarak yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu ve tatmin edici yanıtlar aldım. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan ameliyat, riskleri, alternatifleri ve beklenen sonuçlar hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "meme-kucultme-onam": {
    icerik: `MEME KÜÇÜLTME (REDÜKSİYON MAMMOPLASTİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan meme küçültme ameliyatı hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Redüksiyon mammoplasti; aşırı büyük meme dokusunun (makromasti/hipertrofi) fazlasının cerrahi olarak çıkarılması, şeklin yeniden biçimlendirilmesi ve meme başının yukarı taşınması işlemidir. Genel anestezi altında uygulanır; operasyon süresi genellikle 2–4 saattir.

Ameliyatta kullanılan teknik (vertikal, ters-T/Wise desen, periareolar) hekim tarafından meme boyutu ve anatomisine göre belirlenir. Her teknik farklı miktarda doku çıkarılmasına ve farklı iz modellerine yol açar. Meme başı ve areolası genellikle pediküllü taşıma tekniğiyle yukarı taşınır; çok büyük memelerde serbest nippel grefti gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HASTANIN HEKİME BİLDİRMESİ GEREKENLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Gebelik planı veya emzirme isteği
• Diyabet, hipertansiyon, kalp-damar hastalıkları
• Aspirin, antikoagülan ve bitkisel ilaçlar
• Sigara kullanımı
• Birinci derece akrabada meme kanseri öyküsü

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. AMELİYAT SÜRESİ VE İYİLEŞME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operasyon 2–4 saat sürer ve 1–2 gece hastanede kalış gerekebilir. İlk hafta ağrı ve gerginlik yaşanır; ağrı kesici tedaviyle yönetilir. Destek sütyeni 6 hafta süreyle gün boyu kullanılmalıdır. Ağır egzersiz ve kol üstüne yük alma ilk 4–6 hafta yasaktır. Yara izlerinin olgunlaşması 12–18 ay sürer; bu süre içinde silik ve açık renk bir iz normaldir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama ve hematom: Drenaj veya yeniden müdahale gerektirebilir. Riski %1–3'tür.
• Enfeksiyon: Antibiyotik profilaksisi uygulanır. Yara kötüleşirse oral veya damar yoluyla antibiyotik gerekebilir.
• Yara ayrılması ve geç iyileşme: Özellikle T kesi birleşim noktasında görülür; sigara ve diyabet riski belirgin biçimde artırır.
• Seroma: Yüzeysel sıvı birikimi; drenajla çözülür.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Yara izi ve skar: Meme altı ve/veya areola çevresinde iz oluşur. Hipertrofik skar veya keloid gelişimi özellikle koyu tenlilerde görülebilir. İz tedavisinde silikon bant, lazer veya enjeksiyon kullanılabilir.
• Asimetri: Ameliyat sonrası iki meme arasında küçük farklılıklar kalabilir; belirgin asimetride revizyon planlanabilir.
• Şekil değişikliği: Zaman içinde yeniden kilo alımı, gebelik veya yaşlanmaya bağlı meme şeklinde değişim olabilir.
• Revizyon ihtiyacı: Estetik kaygılar veya teknik nedenlerle yaklaşık %5–10 hastada revizyon düşünülebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Meme Başı ve Areola Duyu Kaybı: Geçici his azalması veya kaybolması sıktır (%15–20); çoğunlukla 6–12 ayda düzelir. Kalıcı his kaybı daha az görülür.

Meme Başı Kanlanma Bozukluğu (Nekroz): Meme başına giden kan damarlarının cerrahi sırasında gerilmesi veya zedelenmesiyle kanlanma bozulabilir. Kısmi nekroz konservatif yolla iyileşir; tam nekroz son derece nadir ancak ciddi bir komplikasyondur. Riski artıran faktörler: çok büyük meme, sigara, diyabet, uzun pediküllü teknikler.

Emzirme Kapasitesi: Cerrahi sırasında süt kanalları ve bezleri etkilenebileceğinden emzirme kapasitesi azalabilir veya tamamen kaybolabilir. Kesin oran tahmin edilemez. Gelecekte emzirme planınız varsa hekiminize bildirmeniz önemlidir.

Doku Nekrozu: Cilt ve yağ dokusunda lokal kanlanma bozukluğu nedeniyle küçük alanlar nekroza uğrayabilir; yara bakımı ve zaman içinde iyileşir.

Meme Kanseri Taraması: Ameliyat meme kanseri riskini artırmaz; aksine uzaklaştırılan doku patolojik incelemeye gönderilir. Sonraki mamografi görüntüleri değişmiş anatomiye göre değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Destekleyici sütyen kullanımı: Fiziksel şikayetleri kısmen azaltabilir, estetik sorunu çözmez.
• Kilo verme: Büyük ölçüde yağ içeren memelerde meme boyutunu azaltabilir; kalıcı glandüler büyümede yetersiz kalır.
• Liposuction: Yalnızca yağ dokunun fazla olduğu bazı olgularda tek başına uygulanabilir.
• Ameliyat yapmama: Şikayetlerle yaşamayı tercih etmek her zaman mümkündür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan meme küçültme ameliyatı, teknik seçenekler, meme başı duyusu ve emzirme üzerine olası etkileri, doku nekrozu riskleri, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu ve tatmin edici yanıtlar aldım. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan ameliyat hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "blefaroplasti-onam": {
    icerik: `GÖZ KAPAĞI ESTETİĞİ (BLEFAROPLASTİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Tababet ve Şuabatı San'atlarının Tarzı İcrasına Dair Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan blefaroplasti ameliyatı hakkında sizi bilgilendirmek ve yazılı onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Blefaroplasti; sarkmış, fazla deri ve yağ dokusunu barındıran göz kapaklarının cerrahi olarak yeniden biçimlendirilmesi işlemidir. Üst kapak blefaroplastisinde fazla deri ve yağ dokusu kesi yapılarak çıkarılır; kesi doğal kıvrım çizgisi boyunca ilerler ve iyileşme sonrası görünür olmaz. Alt kapak blefaroplastisinde yağ torbacıkları ve cilt fazlalığı transkonjunktival (göz içinden) veya subsiliar (kirpik altından) yaklaşımla giderilir.

Operasyon lokal anestezi + sedasyon ya da genel anestezi altında gerçekleştirilir; ameliyat süresi tek kapak için 45–60 dakika, dört kapak için 90–120 dakikadır. İşlem yalnızca estetik kaygılarla değil, üst kapak sarkıklığının görme alanını daraltması durumunda fonksiyonel gerekçeyle de yapılabilir. Fonksiyonel endikasyon varsa görme alanı testi preoperatif dönemde uygulanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. AMELİYAT ÖNCESİ HAZIRLIK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Aspirin, NSAİ ve kan sulandırıcı ilaçlar ameliyattan en az 10 gün önce kesilmelidir
• E vitamini, balık yağı ve bitkisel takviyeler 1 hafta öncesinden kesilmelidir
• Kuru göz şikayeti varsa önceden hekiminize bildiriniz; Schirmer testi gerekebilir
• Kontakt lens ameliyat günü ve sonrasında belirli süre kullanılamaz
• İşlem günü makyaj yapılmamalıdır

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–2 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Ekimoz ve ödem: Göz çevresinde morluk ve şişlik beklenen bir durumdur; 10–14 günde büyük ölçüde geçer. Soğuk uygulama ilk 48 saatte şişliği azaltır.
• Kuru göz: Gözyaşı yapısındaki geçici değişime bağlı olarak gelişir; yapay gözyaşı damlaları ile tedavi edilir. Önceden var olan kuru göz sendromu olan hastalarda kalıcı kötüleşme olabilir.
• Lagoftalmi (göz kapanma güçlüğü): Üst kapaktan fazla deri alındığında göz tam kapanmayabilir; genellikle 4–6 haftada düzelir. Geceleri yağlı damla kullanımı önerilir.
• Enfeksiyon: Antibiyotik profilaksisi uygulanır; kızarıklık ve akıntı halinde hekiminize başvurunuz.
• Kanama/hematom: Göz çevresi hematomu nadir görülür; drenaj gerektirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Asimetri: İki göz kapağı arasında kısmi fark kalabilir; belirgin asimetride revizyon düşünülebilir.
• Yara izi: Kesi çizgisi giderek solar; hipertrofik skar gelişimi nadir, skar tedavisiyle yönetilir.
• Ektropion (alt kapak dışa dönmesi): Alt kapak blefaroplastisine özgü nadir komplikasyon; revizyon gerektirebilir.
• Retrobulbar hematom: Son derece nadir, görmeyi tehdit eden acil bir komplikasyon olup cerrahi drenaj gerektirir.
• Kalıcı kuru göz: Lakrimal gland hasarına bağlı; ön değerlendirmede risk tespiti kritiktir.
• Estetik sonuç memnuniyetsizliği: Nihai sonuç 3–6 ayda ortaya çıkar; bu süre dolmadan revizyon kararı alınmaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Botulinum toksini (botoks): Kaş yükseltme etkisiyle üst kapak görünümünü geçici iyileştirebilir; cilt fazlalığını gidermez.
• Radyofrekans/HIFU: Cilt sıkılaştırma etkisi; belirgin sarkıklıkta yetersiz kalır.
• Dolgu enjeksiyonu: Alt kapak çöküntüsünü düzeltmek için kullanılabilir; yağ torbasını gidermez.
• Ameliyat yapmama: Mevcut görünümle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. AMELİYAT SONRASI TAKİP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Sütürler 5–7. günde alınır
• Güneş gözlüğü ilk 4 hafta zorunludur; güneş kremi (SPF 50+) önerilir
• Ağır egzersiz ilk 2 hafta yasaktır
• Kontakt lens en az 2 hafta sonra takılabilir
• Kontrol muayeneleri: 1. gün, 1. hafta, 1. ay

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan blefaroplasti ameliyatı, anestezi tipi, kesi yaklaşımı, kuru göz ve lagoftalmi başta olmak üzere erken ve geç dönem komplikasyonlar, alternatif tedaviler ve beklenen sonuçlar hakkında Türkçe olarak yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu ve tatmin edici yanıtlar aldım. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "abdominoplasti-onam": {
    icerik: `KARIN GERME (ABDOMİNOPLASTİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan abdominoplasti ameliyatı hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Abdominoplasti; kilo kaybı veya gebelik sonrası oluşan gevşek karın cildinin ve fazla yağ dokusunun çıkarılması, karın kaslarının (diastazis rekti varsa) onarılması işlemidir. Genel anestezi altında uygulanır; ameliyat süresi genellikle 2–4 saattir. Kesi kasık bölgesinde inguinal kıvrım boyunca uzanır; göbek çevresi de yeniden konumlandırılır. Mini abdominoplastide daha kısa kesi ve sınırlı doku çıkarımı yapılır.

Kombine liposuction da planlanmışsa olası ek riskler ayrıca değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. AMELİYAT ÖNCESİ HAZIRLIK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Aspirin, NSAİ ve kan sulandırıcılar ameliyattan en az 10–14 gün önce kesilmeli
• Sigara kullanımı yara iyileşmesini ciddi ölçüde bozar; en az 4–6 hafta bırakılması zorunludur
• Stabil vücut ağırlığında olunması önerilir; ameliyat sonrası gebelik veya önemli kilo alımı sonuçları bozar
• Derin ven trombozu riski nedeniyle işlem öncesi değerlendirme yapılır

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. İYİLEŞME SÜRECİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.–3. gün  : Ağrı, gerginlik ve şişlik belirgindir. Hafif kamburlaşma postürü (bel bükük) daha rahat olabilir; zorla dik durmaktan kaçınılır. Drenler 24–72 saatte çekilir.
1. hafta   : Hafif yürüyüş teşvik edilir (pıhtı riskini azaltmak için). Ağır kaldırma yasaktır.
2.–4. hafta: Kompresyon korsesi gün boyu kullanılır. Sosyal yaşama kısmi dönüş başlar.
6 hafta    : Korseye devam, ağır egzersiz hâlâ yasak.
3. ay      : Nihai şekil büyük ölçüde ortaya çıkar. İz kırmızılığı sürmektedir.
6–12. ay  : İz solar; nihai sonuç değerlendirilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama ve hematom: %1–2 oranında görülür; drenaj veya yeniden ameliyat gerektirebilir.
• Enfeksiyon: Ateş, kızarıklık, akıntı ile kendini gösterir; antibiyotik tedavisi uygulanır.
• Seroma: En sık komplikasyondur; deri altında sıvı birikimi iğneyle aspire edilir. Tekrarlayan seromada dren takılabilir.
• Yara ayrılması: Kesi kenarlarının gerilime bağlı açılmasıdır; pansuman ve zaman ile iyileşir.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Derin Ven Trombozu (DVT) ve Pulmoner Emboli (PE): Abdominoplasti en yüksek DVT/PE riski taşıyan estetik ameliyatlardan biridir. Uzun ameliyat süresi, karın içi basınç artışı ve hareketsizlik tromboz riskini artırır. Pulmoner emboli hayati tehlike yaratabilir. Profilaksi (antikoagülan ilaç, kompresyon çorabı, erken mobilizasyon) uygulanır. Bacakta şişlik, kızarıklık, ağrı veya ani nefes darlığı gelişirse acil başvurunuz.

• Yara izi (skar): Kasık boyunca uzanan iz ilk aylarda kırmızı ve belirgindir; giderek solar ve soluklaşır. Hipertrofik skar veya keloid gelişimi mümkündür; silikon bant, lazer veya enjeksiyonla tedavi edilir.

• Asimetri ve şekil düzensizliği: Doku iyileşmesine bağlı kontur bozuklukları oluşabilir.

• Göbek nekrozu veya şekil bozukluğu: Göbeğin yeniden konumlandırıldığı vakalarda kanlanma bozukluğu nadir de olsa görülebilir.

• His kaybı: Karın cildinde kalıcı veya geçici his azalması olabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yağ Nekrozu: Yağ dokusunun parça parça kalsifiye olması; sertlik veya nodül olarak hissedilebilir. Genellikle konservatif olarak iyileşir, nadiren cerrahi müdahale gerekir.

Revizyon İhtiyacı: Şekil memnuniyetsizliği, asimetri veya skar nedeniyle yaklaşık %5–10 hastada revizyon düşünülebilir; en az 6–12 ay beklendikten sonra planlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Egzersiz ve diyet: Kas tonusunu artırabilir; gevşek cilt sorununu çözmez.
• Liposuction: Yalnızca yağ fazlalığı varsa uygulanabilir; cilt sarkıklığını gidermez.
• Non-invazif cilt sıkılaştırma (HIFU, radyofrekans): Sınırlı etki; belirgin sarkıklıkta yeterli değildir.
• Ameliyat yapmama: Mevcut görünümle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan abdominoplasti ameliyatı, seroma ve derin ven trombozu başta olmak üzere olası komplikasyonlar, iyileşme süreci, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan ameliyat hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // DİŞ HEKİMLİĞİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "dis-cekimi-onam": {
    icerik: `DİŞ ÇEKİMİ / GÖMÜLÜ DİŞ AMELİYATI AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, planlanan diş çekimi ve/veya gömülü diş (impakte diş) cerrahisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diş çekimi; çürük, kırık, periyodontal hastalık veya ortodontik endikasyon nedeniyle dişin ağız boşluğundan uzaklaştırılması işlemidir. Basit çekimlerde diş forseps ve elevatörle lokal anestezi altında çıkarılır. Cerrahi çekimde (gömülü/kısmen gömülü dişlerde) diş eti açılarak kemikten yardım alınabilir; dişin bölünerek çıkarılması gerekebilir. İşlem lokal anestezi altında yapılır; anksiyöz hastalarda sedasyon uygulanabilir.

Çekilecek diş(ler): .......................................
İşlem türü: □ Basit çekim  □ Cerrahi çekim (gömülü)  □ Yirmi yaş dişi cerrahisi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HASTANIN HEKİME BİLDİRMESİ GEREKENLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kullandığınız tüm ilaçlar (aspirin, warfarin, bitkisel ürünler)
• Kalp kapak hastalığı veya kalp pili (antibiyotik profilaksisi gerekebilir)
• Diyabet, osteoporoz (bisfosfonat kullanımı osteonekroz riski)
• Antikoagülan tedavi (doz düzenlemesi gerekebilir)
• Bilinen ilaç alerjileri

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. İŞLEM SONRASI SÜREÇ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İşlem sonrası 30–45 dakika ısırılan gazlı bez pıhtı oluşumunu destekler. İlk 24 saat: alkol, sigara ve sıcak yiyecekten kaçınılır. Ağrı için parasetamol/ibuprofen kullanılır (aspirin önerilmez). Antibiyotik reçete edildiyse tam kür tamamlanmalıdır. Cerrahi çekimlerde sütürler 5–7 günde alınır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama: Pıhtı oluşunca durur. Gazlı bez ısırma ile kontrol altına alınır; uzun süreli kanamalarda hekime başvurunuz.
• Şişlik ve morluk: Özellikle gömülü diş cerrahisinde 2–5 gün sürebilir. Buz uygulaması şişliği azaltır.
• Ağrı: Anestezi geçince başlar, ilk 24–48 saat belirgindir. Ağrı kesiciyle yönetilir.
• Lokal anestezik komplikasyonu: Geçici felç veya alerji çok nadirdir; acil ekipman hazırda bulunur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kuru Soket (Alveolar Osteitis): Çekim yuvası içinde pıhtının dağılması sonucu kemik açıkta kalır. Şiddetli ağrı ve kötü koku oluşur. Yirmi yaş dişi çekimlerinde riski %5–10'dur. Sigara kullanımı, oral kontraseptif kullanımı ve yetersiz pıhtı koruma riski artırır. Yuvayı irigasyon ve yara dolgusuyla (iodoform pansuman) tedavi edilir.
• Enfeksiyon: Ateş, şişlik artışı ve pürülan akıntıyla kendini gösterir; antibiyotikle tedavi edilir.
• Komşu Diş Hasarı: Çekim sırasında yanındaki dişe minimal hasar çok nadir görülür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sinir Hasarı: Alt yirmi yaş dişleri inferior alveolar sinir veya lingual sinire yakın olabilir.
• Inferior alveolar sinir: Alt dudak, çene ve dişeti uyuşukluğu. Geçici uyuşma sıktır; kalıcı uyuşma (parestezi) %0,5–2 oranında görülür.
• Lingual sinir: Dil uyuşukluğu ve tat değişikliği. Nadirdir; çoğunlukla geçicidir.
Sinir hasar riski önceden yapılan panoramik röntgenle değerlendirilir; yüksek riskli olgularda CBCT çekilebilir.

Üst Sinüs Perforasyonu: Üst çene arka bölge dişleri sinüs tabanına yakınsa çekim sırasında oroantral fistül açılabilir. Küçük açıklıklar kendiliğinden kapanır; büyük olanlar cerrahi onarım gerektirebilir.

Çene Kırığı: Son derece nadir; ilerlemiş osteoporozda veya geniş lezyonlarda gömülü diş çekiminde olabilir.

Bisfosfonat İlişkili Çene Osteonekrozu (BRONJ/MRONJ): Bisfosfonat veya anti-RANK-L ilaç kullanan hastalarda çekim sonrası kemik iyileşmesi bozulabilir; hekiminize ilaç bilgilerinizi mutlaka bildirin.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kök kanal tedavisi: Ağrılı veya çürük dişin çekilmeden korunmasını sağlar; her vakaya uygun değildir.
• Periodontal tedavi: Periodontitis kaynaklı dişlerde diş kaybını geciktirebilir.
• Gözlem (bekle-izle): Asemptomatik gömülü dişlerde bazı durumlarda tercih edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan diş çekimi işlemi, kuru soket, sinir hasarı ve komşu diş riskleri dahil olası komplikasyonlar, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan işlem hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "zirkonyum-kaplama-onam": {
    icerik: `ZİRKONYUM / PORSELEN KAPLAMA AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan zirkonyum veya porselen kaplama (kron/veneer) tedavisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Zirkonyum ve porselen kaplamalar; diş rengini, şeklini veya boyutunu yeniden düzenlemek, kırık/aşınmış dişleri güçlendirmek ya da estetik iyileştirme sağlamak amacıyla uygulanan sabit protetik restorasyonlardır. Tam kron uygulamasında diş tüm çevreden 0,5–2 mm preparasyon (traşlama) yapılarak sıyrılır; veneer uygulamasında yalnızca ön yüz preparasyonu yapılır.

Preparasyon sırasında ve sonrasında geçici kaplama (provizor) takılır; asıl kaplama 1–2 hafta içinde laboratuvar ortamında hazırlanarak kalıcı olarak simante edilir. Tam kron uygulaması geri dönüşümsüz bir işlemdir; diş mine dokusunun bir kısmı kalıcı olarak uzaklaştırılır.

Tedavi yapılacak diş/dişler : .......................................
Uygulama tipi               : □ Tam kron  □ Laminate veneer  □ İnley/Onley

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–4 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Preparasyon sonrası hassasiyet: Sıcak, soğuk ve tatlıya geçici hassasiyet sık görülür; 2–4 haftada düzelir. Aşırı hassasiyette hekiminize başvurunuz.
• Geçici kaplamada kırılma/düşme: Provizor kaplama geçici malzemeyle yapılmıştır; sert gıdalardan kaçınınız.
• Renk uyumsuzluğu: Geçici ve asıl kaplama rengi farklı görünebilir; nihai renk denemesi simantasyon öncesi yapılır.
• Diş eti tahrişi: Preparasyon bölgesinde geçici diş eti kızarıklığı ve hassasiyeti normal kabul edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Aylar–Yıllar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kaplama kırılması: Sert cisim ısırma, bruksizm (gece dişleri sıkma) veya travma sonucu kırılabilir. Bruksizm varlığında gece koruyucu plak zorunludur.
• Kaplama altında çürük: Ağız hijyeninin yetersiz kalması halinde dişin kaplama kenarından çürümesi mümkündür; düzenli kontrol ve hijyen kritik önem taşır.
• Kaplama gevşemesi veya çıkması: Simantasyon başarısızlığı veya termal stres nedeniyle kaplama çıkabilir; yeniden simantasyon veya yeni kaplama gerekebilir.
• Pulpitis / Kök kanal tedavisi ihtiyacı: Derin preparasyonlarda pulpa (diş siniri) etkilenebilir; ağrı, şişlik veya spontan ağrı gelişmesi durumunda kanal tedavisi gerekebilir.
• Estetik memnuniyetsizlik: Renk, şekil veya uyum açısından beklenti karşılanamaması; yeniden yapım düşünülebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Diş beyazlatma (bleaching): Renk sorunları için daha az invazif seçenek; şekil ve boyutu değiştirmez.
• Kompozit bonding: Dişlere aşındırma yapmadan veya minimal aşındırmayla estetik iyileştirme; dayanıklılığı krondan daha düşüktür.
• Ortodonti: Dizilim sorunları için kaplama yerine diş hareketini tercih etmek; daha uzun süreç gerektirir.
• Tedavinin ertelenmesi veya yapılmaması: Mevcut görünümle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Düzenli diş fırçalama (günde 2 kez) ve diş ipi/arayüz fırçası kullanımı zorunludur
• Sert, çıtırtılı veya yapışkan gıdalardan kaçınınız
• Gece dişçe sıkıyorsanız koruyucu splint kullanınız
• Yılda 2 kez kontrol muayenesi ve gerektiğinde profesyonel temizlik önerilir
• Kaplama rengi zamanla değişebilir; sigara ve koyu içecekler renk dönüşümünü hızlandırır

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan zirkonyum/porselen kaplama tedavisi, preparasyonun geri dönüşümsüzlüğü, kaplama kırılması ve kök kanal ihtiyacı başta olmak üzere komplikasyonlar, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "dis-beyazlatma-onam": {
    icerik: `DİŞ BEYAZLATMA (BLEACHING) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan diş beyazlatma (bleaching) işlemi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diş beyazlatma; diş yüzeyinde ve mine içinde birikmiş renk pigmentlerinin peroksit bazlı kimyasal ajanlarla oksidasyonu yoluyla açılması işlemidir. Ofis tipi beyazlatmada klinikte yüksek konsantrasyonlu (%35–40) hidrojen peroksit jeli dişlere uygulanarak 1–3 seans halinde tamamlanır; bazen ışık aktivasyonu da kullanılır. Ev tipi beyazlatmada ise ağıza özel hazırlanan şeffaf plak içine düşük konsantrasyonlu (%10–22) karbamid peroksit jeli yerleştirilerek geceleri uygulanır; tedavi 2–4 hafta sürer.

Beyazlatma yalnızca doğal diş mine dokusunu etkiler; zirkonyum kaplama, porselen veneer, kompozit dolgu ve dental implant rengini değiştirmez. Bu nedenle mevcut restorasyonlarınız hekiminiz tarafından önceden değerlendirilecektir. Sonuç mevcut diş rengine, boyaya derinliğine ve iyileşme kapasitesine göre değişir; belirli bir beyazlık garantisi verilemez.

Uygulama yöntemi : □ Ofis tipi (klinikte)  □ Ev tipi (plak+jel)  □ Kombine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24–72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Diş hassasiyeti: Soğuk, sıcak ve tatlıya geçici hassasiyet en sık yan etkidir; 24–72 saatte büyük ölçüde düzelir. Şiddetli hassasiyette tedaviye ara verilir.
• Diş eti tahrişi: Ofis tipi uygulamada jelin diş eti ile teması kızarıklık ve yanmaya yol açabilir; bariyer jeli ile korunma sağlanır.
• Düzensiz beyazlaşma: İlk seanslarda dişler arasında geçici renk farkı normaldir; tedavi süresince dengelenir.
• Bulantı: Jelin yutulması halinde hafif bulantı; uygulamaya özen gösterilmesi önleyicidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Mine demineralizasyonu: Gereğinden uzun veya sık uygulama mine yüzeyini zayıflatabilir; uyum kural ve sürelerine kesinlikle uyulmalıdır.
• Renk geri dönüşü (relaps): Sigara, çay, kahve, kırmızı şarap ve koyu meyveler beyazlatma etkisini hızla geri döndürür. Etki genellikle 1–3 yıl sürer; yaşam tarzına göre değişir.
• Ağız ülseri: Hassas dişeti dokusunda nadiren yüzeyel ülser gelişebilir; kendiliğinden iyileşir.
• Renk uyumsuzluğu: Beyazlatma sonrası eski restorasyonlar yeni diş rengiyle uyumsuz görünebilir; değiştirilmesi gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Porselen veneer / zirkonyum kaplama: Kalıcı renk ve şekil düzeltmesi; daha invazif ve maliyetli bir seçenektir.
• Kompozit bonding: Diş üzerine kompozit reçine uygulanması; aşındırma gerekmeyebilir, ancak renk stabilizasyonu daha düşüktür.
• Profesyonel diş temizliği (profilaksi): Yüzeysel lekeleri giderir; intrensek (mine içi) renkleri çözmez.
• Tedavinin yapılmaması: Mevcut diş rengiyle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İşlem sonrası 48 saat boyunca koyu renkli gıda ve içeceklerden kaçınınız
• Sigara içimi ilk 48 saatte kesinlikle yasaktır; süregelen kullanım sonucu hızla bozar
• Hassasiyet için hekiminizin önereceği desensitize diş macunu kullanılabilir
• 6 ay–1 yılda bir kontrol ve gerektiğinde rötuş seansı önerilir

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan diş beyazlatma işlemi, uygulamanın mevcut kaplamalar üzerinde etkisizliği, hassasiyet ve mine demineralizasyonu başta olmak üzere komplikasyonlar, etki süresi ve kalıcılık koşulları, alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // KBB — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "septoplasti-onam": {
    icerik: `SEPTOPLASTİ / SEPTUM AMELİYATI AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan septoplasti ameliyatı hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Septoplasti; burunu sağ ve sol yarıya ayıran kıkırdak-kemik yapının (nazal septum) eğrilik veya deformitesini düzeltmeye yönelik fonksiyonel bir cerrahidir. İşlem genel veya lokal/sedasyon anestezisi altında burun içinden (endonazal) yapılır; dışarıdan görünür kesi izi bırakmaz. Eğri kıkırdak ve kemik parçaları kesilir, düzeltilir veya gerektiğinde kısmen çıkarılır; çıkarılan kıkırdak ileride greft olarak kullanılmak üzere saklanabilir.

Septoplasti yalnızca nefes yolunu düzeltir; burunun dış görünümünü değiştirmez. Dış görünüm değişikliği de planlanıyorsa (septorhinoplasti) bu ayrıca görüşülür.

Ameliyat süresi genellikle 45–90 dakika arasındadır. Genellikle 1 gece hastanede kalış planlanır; tamponlar 24–48 saatte, septal splintler (varsa) 7–10. günde alınır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. SOLUNUM İYİLEŞME BEKLENTİSİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Septoplasti sonrası hastaların büyük çoğunluğunda (%80–90) nazal hava akımı belirgin şekilde iyileşir. Ancak nazal tıkanıklık yalnızca septal deviasyona bağlı olmayabilir; aşırı konka büyümesi (hipertrofisi), polip, alerji veya anatomik varyantlar da katkıda bulunabilir. Bu ek sorunlar için kombine işlemler (konka redüksiyonu, FESS vb.) gerekebilir. Solunum iyileşmesi garantisi verilemez.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. KIKILRDAK / KEMİK ÇIKARIMI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Eğri septal kıkırdak ve kemik parçaları, yeterli septal destek korunarak çıkarılır ya da yeniden şekillendirilir. Yapısal destek için "L strut" (ön ve kaudal septum) korunur; bu alan bozulursa burun çöküklüğü oluşabilir. Çıkarılan kıkırdak materyali ileride rinoplasti veya rekonstrüksiyon amacıyla kullanılmak üzere muhafaza edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama: Operasyon sırası veya hemen sonrasında gelişebilir. Nazal tampon ile kontrol altına alınır; ciddi kanamada ek müdahale gerekebilir.
• Enfeksiyon: Antibiyotik profilaksisi uygulanır. Yüksek ateş veya artan ağrı durumunda hekiminize başvurunuz.
• Nazal tıkanıklık ve şişlik: İlk 2–4 hafta beklenen durumdur; giderek azalır.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Septal perforasyon: Septumda kalıcı delik oluşmasıdır. Kuruluk, kabuklanma, hırıltılı ses ve solunum rahatsızlığına yol açabilir. Küçük perforasyonlar semptom vermeyebilir; büyük olanlar cerrahi onarım gerektirebilir. Riski %1'in altındadır; sigara, önceden geçirilmiş septal işlem ve aşırı manipülasyon riski artırır.
• Yetersiz solunum düzelmesi veya nüks: Kıkırdak esnekliğine bağlı geri dönme (spring-back) görülebilir; revizyon planlanabilir.
• Burun dış görünümünde değişim: İstemeden çöküklük veya asimetri nadir gelişebilir.
• Koku alma değişimi: Geçici koku azalması sıktır; kalıcı anosmia son derece nadirdir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Uyuşukluk: Burun ucu, üst diş ve damak bölgesinde geçici his azalması yaşanabilir; genellikle 3–6 ayda düzelir.

Beyin Omurilik Sıvısı (BOS) Kaçağı: Son derece nadir, ancak ciddi bir komplikasyondur. Kafa tabanına yakın çalışmalarda olabilir; tespit halinde acil müdahale gerektirir.

Göz/Orbita Komplikasyonları: Çok nadir; septuma geniş yaklaşım gerektiren olgularda teorik risk mevcuttur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. AMELİYAT SONRASI TAKİP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Burun tamponları 24–48 saat, splintler 7–10. günde alınır
• İlk 2 hafta yüksek tempolu egzersiz, ağır kaldırma yasaktır
• Burun kanama riskini artıran ilaçlar (aspirin, NSAİ) en az 10 gün önceden kesilmeli, iyileşme döneminde kullanılmamalıdır
• Buz torbası uygulaması ilk 48 saatte şişliği azaltır
• Düzenli salin nazal irrigasyon önerilir

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nazal dilatatörler / bantlar: Geçici semptom rahatlaması sağlar, deviasyonu düzeltmez.
• Topikal dekonjestanlar: Kısa süreli rahatlama; uzun süreli kullanımda bağımlılık riski vardır.
• İntranazal kortikosteroidler: Allerjik veya inflamatuvar tıkanıklıkta etkili; septal deviasyona yönelik değildir.
• Ameliyat yapmama: Mevcut solunum güçlüğüyle yaşamak her zaman bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan septoplasti ameliyatı, kıkırdak/kemik çıkarım yaklaşımı, solunum iyileşme beklentisi, septal perforasyon başta olmak üzere olası komplikasyonlar, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan ameliyat hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "tonsillektomi-onam": {
    icerik: `TONSİLLEKTOMİ / ADENOİDEKTOMİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız / Sayın Ebeveyn/Vasi,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan tonsillektomi ve/veya adenoidektomi ameliyatı hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tonsillektomi; ağız boşluğunun arka bölümünde bulunan bademciklerin (tonsilla palatina) cerrahi olarak çıkarılması işlemidir. Adenoidektomi ise burun arkasındaki geniz etinin (adenoid/tonsilla pharyngea) çıkarılmasıdır. Her iki işlem genel anestezi altında, birlikte veya ayrı ayrı yapılabilir. Ameliyat süresi genellikle 30–60 dakikadır.

Bademcik çıkarma yöntemleri: soğuk diseksiyon (bistüri), elektrokoter, koblasyon veya lazer tekniği kullanılabilir. Yöntem seçimi hastanın yaşı, dokusunun yapısı ve hekimin deneyimine göre belirlenir.

Planlanan işlem: □ Tonsillektomi  □ Adenoidektomi  □ Her ikisi birden

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. HASTANIN HEKİME BİLDİRMESİ GEREKENLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Aspirin, NSAİ ve diğer kan sulandırıcı ilaçlar (en az 10 gün öncesinden kesilmeli)
• Kanama bozuklukları veya ailede kanama hastalığı öyküsü
• Aktif üst solunum yolu enfeksiyonu (ameliyat ertelenebilir)
• Diyabet ve immün sistem hastalıkları
• Çocuklarda obstrüktif uyku apne semptomları

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. AMELİYAT SONRASI SÜREÇ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1.–3. gün  : Boğaz ağrısı, yutma güçlüğü ve hafif ateş yaygındır. Soğuk yumuşak gıdalar (dondurma, yoğurt, püre) önerilir; sıcak, sert ve baharatlı yiyeceklerden kaçınılır.
4.–10. gün : Bademcik çukurlarında beyaz-sarı renkli kabuk oluşur; bu normaldir, ağız hijyeninin bir işaretidir. Ağrı bu dönemde artabilir (özellikle 5.–7. günde "rebound" ağrı).
7.–10. gün : Sekonder kanama dönemidir; aktiviteyi artırmak, sert gıda yemek bu dönemde tehlikelidir.
14. gün    : Yaranın büyük bölümü iyileşir. Ağır egzersiz ve havuza girme bu güne kadar yasaktır.

Ağrı yönetimi için parasetamol kullanılır; aspirin ve NSAİ kullanılmamalıdır (kanama riskini artırır).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Primer kanama (ameliyat sırasında veya ilk 24 saatte): Nadir; cerrah tarafından kontrol altına alınır.
• Ağrı ve yutma güçlüğü: İlk haftada belirgindir; ağrı kesici ile yönetilir.
• Ateş: İlk 3 günde düşük dereceli ateş normaldir; 38,5°C üzerindeki ateş veya uzayan ateş için başvurunuz.
• Bulantı: Anestezi sonrası geçicidir.
• Konuşma değişikliği (rinolali): Adenoidektomi sonrası geçici burundan konuşma olabilir; genellikle birkaç haftada düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Sekonder kanama (ameliyat sonrası 5.–10. günler): En sık komplikasyondur; riski %1–2 civarındadır. Kabukların düşmesi, sert gıda veya fiziksel efor tetikleyebilir. Ağızdan kan gelmesi acil başvuruyu gerektirir.

  Çocuk ve erişkin farkı: Çocuklarda kanama hacmi küçük vücut ağırlığı nedeniyle orantısal olarak daha tehlikelidir; aileler bu konuda özellikle uyarılmalıdır. Erişkinlerde sekonder kanama oranı biraz daha yüksektir (%2–3).

• Nasopharyngeal stenoz (adenoidektomi sonrası nadir skar): Çok nadirdir.
• Velofaringeal yetmezlik: Adenoid büyük çıkarıldığında ses tonu bozukluğu yaşanabilir; genellikle geçicidir.
• Anestezi komplikasyonları (çocuklarda): Çocuk anestezisti eşliğinde uygulanır; hava yolu yönetimi özellikle önem taşır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. DİĞER / ÖZEL KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diş ve Dil Hasarı: Ağız açacağına (mouth gag) bağlı nadir geçici diş uyuşması veya dişe zarar riski.

Derin Ven Trombozu: Yetişkinlerde uzun ameliyat sürelerinde çok nadir gelişebilir.

Tat ve Koku Değişimi: Nadir ve geçici.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. ACİL DURUM BİLGİSİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aşağıdaki durumlarda ACİL servise başvurunuz:
• Ağızdan veya burundan bol kırmızı kan gelmesi
• Yutamama veya solunum güçlüğü
• 39°C üzerinde düşmeyen ateş

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tıbbi (antibiyotik) tedavi: Tekrarlayan enfeksiyonları geçici baskılayabilir; altta yatan anatomik sorunu çözmez.
• İzlem politikası: Seyrek atak durumunda bekleme tercih edilebilir.
• Kısmi tonsillektomi (tonsillotomi): Obstrüktif şikayetlerde seçilmiş olgularda uygulanabilir; enfeksiyon endikasyonunda yeterli değildir.
• Ameliyat yapmama: Mevcut şikayetlerle yaşamak bir seçenektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. HASTA / VELİ BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan tonsillektomi/adenoidektomi ameliyatı, kanama dönemleri (özellikle 5.–10. gün sekonder kanama riski), çocuk ve erişkine özgü farklılıklar, olası komplikasyonlar ve alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı planlanan ameliyat hakkında bilgilendirdim. Tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "timpanoplasti-onam": {
    icerik: `KULAK ZARI AMELİYATI (TİMPANOPLASTİ / MASTOİDEKTOMİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan timpanoplasti ve/veya mastoidektomi ameliyatı hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Timpanoplasti; kronik otitis media, travma veya başka nedenlerle perfore (delik) olan kulak zarının kendi doku greftiyle (temporalis fasia veya perikondriyum) onarılması ameliyatıdır. Eş zamanlı orta kulak kemikçiklerinin hasarı varsa ossiküler zincir rekonstrüksiyonu (ossiculoplasti) da yapılabilir. Mastoidektomi ise mastoid kemiğin havalanma hücrelerindeki kronik enfeksiyon veya kolesteatom (deri kisti) birikiminin temizlenmesi işlemidir.

Ameliyat genel anestezi altında gerçekleştirilir; yaklaşım retroauriküler (kulak arkasından) veya endaural (kulak kanalından) olabilir. Operasyon süresi 1–3 saattir; mastoidektomi eklenmesi süreyi uzatır. İşlem genellikle 1 gece hastanede kalış gerektirir.

Planlanan işlem: □ Timpanoplasti   □ Mastoidektomi   □ Her ikisi birden
Taraf: □ Sağ kulak   □ Sol kulak

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–2 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama: Operasyon sonrası veya pansuman değişiminde görülebilir; tampon uygulamasıyla kontrol edilir.
• Enfeksiyon: Kulak kanalında akıntı, şişlik ve ateş ile kendini gösterir; antibiyotikle tedavi edilir.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.
• Geçici baş dönmesi/denge bozukluğu: İç kulak irritasyonuna bağlı; genellikle 1–2 haftada geçer.
• Yüz siniri geçici zayıflığı: Anestezi veya minimal cerrahi temas nedeniyle geçici güçsüzlük; 2–6 haftada düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Greft başarısızlığı ve yeniden perforasyon: Kulak zarı tamiri %80–90 oranında başarıyla sonuçlanır. Sigara, enfeksiyon veya yetersiz dinlenme başarısızlık riskini artırır; revizyon gerekebilir.
• İşitme değişimi: Ameliyat sonrası işitmede iyileşme beklenir; ancak nadiren işitme düzeyi değişmeyebilir ya da kötüleşebilir.
• Tat bozukluğu: Korda timpani siniri cerrahi sırasında gerilebilir; dilde metalik tat veya tat değişikliği gelişebilir. Genellikle 3–6 ayda düzelir; kalıcı değişiklik nadirdir.
• Kulak çınlaması (tinnitus) artışı: Mevcut çınlama şiddetinde geçici artış nadir görülür.
• Kolesteatom nüksü (mastoidektomide): Tüm kolesteatom hücrelerinin uzaklaştırılması güç olabilir; 6–12 ayda kontrol ameliyatı gerekebilir.
• Yüz siniri kalıcı hasarı: Son derece nadir ancak ciddi komplikasyon; mastoid ameliyatlarında risk daha yüksektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tıbbi tedavi (antibiyotik kulak damlaları): Perforasyonun kendiliğinden kapanması bazı vakalarda mümkündür; kronik veya büyük perforasyonlarda yetersiz kalır.
• İşitme cihazı: İşitme kaybının medikal yönetimi için kullanılabilir; altta yatan hastalığı tedavi etmez.
• Kağıt yama (myringoplasty): Küçük perforasyonlarda klinkte lokal anestezi altında deneme niteliğinde uygulama yapılabilir; başarı oranı düşüktür.
• Ameliyatsız izlem: Kuru perforasyonlarda yıllarca asemptomatik seyir mümkündür; ancak enfeksiyon riski devam eder.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kulağa su kaçırmama ilk 4–6 hafta zorunludur; yüzme yasaktır
• Burun silme/sümkürme ve ağır kaldırma ilk 2 hafta yasaktır
• Uçak seyahati için hekiminizin onayını alınız
• Aspirinin ve NSAİ ilaçların ameliyat öncesi 10 gün kesilmesi gerekir
• Kontrol muayeneleri: 1. hafta, 1. ay, 3. ay, 1. yıl

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan timpanoplasti/mastoidektomi ameliyatı, greft başarısızlığı ve kolesteatom nüksü dahil komplikasyonlar, yüz siniri riski, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "fess-sinüs-onam": {
    icerik: `ENDOSKOPİK SİNÜS CERRAHİSİ (FESS) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan Fonksiyonel Endoskopik Sinüs Cerrahisi (FESS) hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FESS; kronik sinüzit, nazal polipozis (burun polipleri), sinüs kisti veya mukoseli tedavi etmek amacıyla burun deliklerinden endoskop (kamera) yardımıyla gerçekleştirilen minimal invaziv bir cerrahi yöntemdir. Dışarıdan görünür herhangi bir kesi izi bırakmaz. Enfekte veya tıkalı sinüs ostiumları (açıklıkları) genişletilir; polip ve hastalıklı mukoza doku alınır.

Eş zamanlı septoplasti, konka redüksiyonu veya nazal biyopsi planlanmışsa bu işlemler de aynı seansta yapılabilir. Ameliyat genel anestezi altında yapılır; süre 1–2,5 saattir. Operasyon sonrası burun tamponları 24–48 saat yerinde kalabilir.

Planlanan sinüsler: □ Etmoid  □ Maksiler  □ Frontal  □ Sfenoid  □ Tümü

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–2 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kanama: Nazal kanama tampon uygulaması ile kontrol altına alınır; ciddi arteriyel kanama çok nadir ancak mümkündür ve ek müdahale gerektirebilir.
• Göz çevresi şişlik ve ekimoz: Etmoid sinüse yakın çalışmalarda periorbital ödem gelişebilir; 5–7 günde büyük ölçüde düzelir.
• Nazal tıkanıklık ve şişlik: İlk 2 hafta beklenen bir durumdur; serum fizyolojik yıkamayla azaltılır.
• Anestezi komplikasyonları: Bulantı, kusma, boğaz ağrısı — geçicidir.
• Enfeksiyon: Antibiyotik profilaksisi uygulanır; ateş ve kötüleşen ağrıda hekiminize başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Polip nüksü: Nazal polipozis kronik bir hastalıktır; ilaç tedavisiyle (topikal steroid, biyolojik ajan) kontrol altına alınmadığında poliplerin yeniden büyümesi mümkündür. Düzenli kontrol ve uzun süreli tıbbi tedavi zorunludur.
• Koku alma değişikliği (anosmia/hiposmia): Polip cerrahisi sonrası koku iyileşme beklenir; ancak nadir olgularda kalıcı koku azalması görülebilir.
• BOS (Beyin Omurilik Sıvısı) kaçağı: Kafa tabanına yakın çalışmalarda lamina papyracea veya kafa tabanı hasarı nedeniyle BOS kaçağı gelişebilir; insidansı <%0,5'tir. Derhal müdahale gerektirir.
• Orbital komplikasyonlar: Lamina papyracea perforasyonuna bağlı retrobulbar hematom, diplopi veya görme bozukluğu son derece nadir ancak ciddi komplikasyonlardır.
• Sinüs yapışıklıkları (sineşi): Ameliyat sonrası sinüs açıklıklarının yeniden kapanmasına yol açabilir; düzenli endoskopik kontrol ve debridman önemlidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Topikal ve sistemik kortikosteroidler: Polip boyutunu azaltır; kronik sinüzit semptomlarını hafifletir. İlaç tedavisinin yetersiz kaldığı olgularda cerrahi önerilir.
• Biyolojik ilaçlar (dupilumab gibi): Ağır eozinofilik kronik rinosinüzit ve nazal polipoziste FDA onaylı; ameliyata alternatif veya destekleyici olarak kullanılabilir.
• Balon sinüs dilatasyonu: Bazı olgularda daha az invaziv bir açma yöntemi; polip varlığında yetersiz kalır.
• Ameliyatsız izlem: Semptomları tolere edilebilir düzeyde olan hastalar için ilaçla uzun vadeli yönetim seçeneği mevcuttur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Günlük tuzlu su nazal irrigasyonu (salin yıkama) ilk aydan itibaren uzun vadeli önerilir
• Topikal steroid spreyin düzenli kullanımı nüksü geciktirir
• İlk 2 hafta yüksek tempolu egzersiz, ağır kaldırma ve sümkürme yasaktır
• Hava yolu kuru ortamlarda nemlendirici kullanılması önerilir
• Kontrol muayeneleri: 1. hafta, 1. ay, 3. ay, 1. yıl (endoskopik debridman içerebilir)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan FESS ameliyatı, BOS kaçağı ve orbital komplikasyonlar dahil tüm riskler, polip nüksü olasılığı ve uzun süreli tıbbi tedavi gerekliliği, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // KARDİYOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kalp-pili-onam": {
    icerik: `KALICI KALP PİLİ (PACEMAKER) İMPLANTASYONU AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan kalıcı kalp pili implantasyonu hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kalıcı kalp pili (pacemaker); yavaş, duraklamalı veya düzensiz kalp ritmini (bradiaritmiler, ileti blokları) düzeltmek amacıyla elektriki uyarı üreten ve kalbe ileten küçük bir elektronik cihazdır. Cihaz genellikle sol köprücük kemiği altındaki deri altı "cep"e yerleştirilir; ince teller (elektrotlar) subklavyen veya sefalik ven yoluyla kalp boşluklarına ilerletilir ve kalp kasına sabitlenir.

İşlem lokal anestezi + sedasyon altında, floroskopi (X-ray) eşliğinde kateterlab ortamında gerçekleştirilir; operasyon süresi 1–2 saattir ve genellikle 1–2 gece hastanede kalış gerekir. Cihaz tipi (tek odacıklı, çift odacıklı, CRT-P/CRT-D) hastanın ritim bozukluğuna ve kalp fonksiyonuna göre seçilir.

Planlanan cihaz tipi: □ VVI  □ DDD  □ CRT-P  □ CRT-D  □ Leadless (elektrotsuz)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–4 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Pnömotoraks (akciğer zedelenmesi): Subklavyen ven ponksiyonuna bağlı akciğer sönmesi %1–2 oranında görülür; çoğunlukla kendiliğinden geçer, nadiren dren gerektirir.
• Hematom ve kanama: İmplant cebinde kan birikmesi; kompresyon uygulanır, nadiren drenaj gerekir. Antikoagülan kullanımında risk artar.
• Elektrot yer değişikliği (displacement): İmplantasyonun ilk 2–4 haftasında elektrot pozisyonunu kaybedebilir; yeniden pozisyon ameliyatı gerekebilir.
• Enfeksiyon: Cep bölgesinde kızarıklık, şişlik ve ağrı ile kendini gösterir; antibiyotikle tedavi edilir, ağır olgularda cihazın çıkarılması gerekebilir.
• Anestezi/sedasyon komplikasyonları: Bulantı, kan basıncı dalgalanması — izlenerek yönetilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Aylar–Yıllar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cihaz batarya tükenmesi: Pil ömrü cihaz tipine göre 5–15 yıl arasındadır; pil dolumu için jeneratör değişim ameliyatı gerekir.
• Elektrot hasarı veya kırılması: Uzun vadede elektrot yıpranması ritim bozukluğuna yol açabilir; yeniden tel takılması gerekebilir.
• Deri erozyonu ve cihazın cilt altından görünür hale gelmesi: İnce hastalarda deri incelip cihaz görünür hale gelebilir; revizyon gerektirebilir.
• Pacemaker sendromu: DDD yerine VVI pace kullanımında atriyoventriküler asenkroni nedeniyle baş dönmesi ve yorgunluk; cihaz programlama değişikliğiyle çözülür.
• Trikuspid kapak yetmezliği: Elektrotun trikuspid kapağa zarar vermesi nadiren görülür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İlaç tedavisi: Yavaş ritmi hızlandırmaya yönelik ilaçlar (atropin, izoproterenol); kalıcı çözüm değildir.
• Geçici kalp pili: Acil durumlarda geçici olarak uygulanabilir; uzun vadeli çözüm değildir.
• Altta yatan nedeni tedavi etme: İlaç kaynaklı bradikardide suçlu ilacın kesilmesi; elektrolit bozukluğu düzeltilmesi. Kalp bloğunun geri dönüşümlü nedenlerinde kalıcı pace gerekmeyebilir.
• Tedavisiz izlem: Semptom vermez ve progresyon göstermez ise bazı bradiaritmilerde bekleme politikası uygulanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE YAŞAM DÜZENLEMESİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cihaz kimlik kartı her zaman yanınızda bulundurulmalıdır
• İlk 4–6 hafta sol kolunuzu omuz üzerine kaldırmayınız; ağır kaldırmaktan kaçınınız
• Güçlü manyetik alanlardan (endüstriyel motorlar, bazı MR cihazları) kaçınınız; MR uyumluluğu hekiminizle görüşünüz
• Güvenlik kapıları: Cihaz kartınızı göstererek kapıdan hızlı geçiniz; uzun süre yanında durmayınız
• Kontrol muayeneleri: 1. ay, 3. ay, 6. ay, sonrasında yıllık telemetrik sorgulama

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan kalp pili implantasyonu, pnömotoraks ve elektrot yer değişikliği başta olmak üzere erken komplikasyonlar, pil ömrü ve uzun vadeli gereksinimler, yaşam kısıtlamaları, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "kardiyoversiyon-onam": {
    icerik: `ELEKTRİKSEL KARDİYOVERSİYON AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan elektriksel kardiyoversiyon işlemi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Elektriksel kardiyoversiyon (EKV); atrial fibrilasyon (AF), atrial flutter veya diğer semptomatik taşiaritmileri sinüs ritmine döndürmek amacıyla kısa süreli intravenöz sedasyon altında göğüs yüzeyine uygulanan senkronize elektrik şoku tedavisidir. İşlem kardiyoloji ünitesinde, hasta monitörizasyonu ve acil resüsitasyon ekipmanları hazır bulunarak gerçekleştirilir.

Sedasyon verilmeden önce en az 4–6 saat aç kalınması zorunludur. Antikoagülan (pıhtılaşmayı önleyen) ilaç kullanımının yeterliliği işlem öncesinde ekokardiyografi veya TEE ile değerlendirilebilir; yetersiz antikoagülasyonda işlem ertelenebilir.

Tanı / endikasyon: .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24–72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Cilt kızarıklığı ve yanma: Elektrot (ped) bölgesinde geçici deri tahrişi; 1–2 günde geçer.
• Sedasyon komplikasyonları: Bulantı, hipotansiyon, geçici oksijen desatürasyonu; monitorize ortamda izlenerek yönetilir.
• Geçici aritmi: İşlem sonrası bradikardi veya kısa süreli ventriküler ektopi görülebilir; çoğunlukla kendiliğinden düzelir.
• Sinüs nodu disfonksiyonu: Şok sonrası sinüs düğümünün geçici yavaşlaması; önceden var olan sinüs nodu hastalığında kalıcı pacemaker gerekebilir.
• Miyokardiyal hasar: Yüksek enerji veya tekrarlayan şokta troponin yüksekliği görülebilir; klinik önemi sınırlıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Günler–Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tromboembolik olay (inme/emboli): Sol atrial appendikste oluşan trombusun kardiyoversiyon sonrası dolaşıma geçmesi en ciddi komplikasyondur. İşlem öncesi yeterli antikoagülasyon zorunludur; işlem sonrası en az 4 hafta antikoagülan tedavi sürdürülür. Yetersiz antikoagülasyonda işlem yapılmaz.
• Ritim bozukluğunun nüksü: AF ilk yıl içinde hastaların %50–60'ında tekrarlayabilir; antiaritmik ilaç tedavisiyle bu risk azaltılır. Tekrarlayan nükslerde kateter ablasyon değerlendirilebilir.
• Pulmoner ödem: Kardiyoversiyon sonrası kalp fonksiyonunun ani değişimine bağlı, özellikle ciddi kalp yetmezliği olan hastalarda görülebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İlaçla kardiyoversiyon: Antiaritmik ilaçların IV veya oral yoldan verilmesi; başarı oranı elektriksel kardiyoversiondan düşüktür.
• Hız kontrolü (rate control): Ritmi sinüse döndürmek yerine kalp hızını kontrol altında tutmak; bazı hastalarda uygun bir stratejidir.
• Kateter ablasyonu: Tekrarlayan AF'de daha kalıcı ritim kontrolü sağlayan girişimsel yöntem; EKV'ye alternatif veya tamamlayıcı olabilir.
• Tedavisiz izlem: Semptomsuz veya tolere edilebilir semptomlarda hız kontrolü ve antikoagülasyon ile izlem mümkündür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İşlem sonrası en az 1–2 saat gözlem altında tutulursunuz
• Aynı gün araç kullanmanız yasaktır (sedasyon etkisi)
• Antikoagülan ve antiaritmik ilaçlarınızı düzenli alınız; hekiminiz onayı olmadan kesmeyiniz
• Kontrol EKG ve kontrol muayenesi için randevunuzu aksatmayınız
• Çarpıntı, baş dönmesi veya nefes darlığı tekrarlarsa hekiminizi arayınız

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan elektriksel kardiyoversiyon işlemi, tromboemboli/inme riski ve antikoagülasyon gerekliliği, ritim nüks olasılığı, sedasyon komplikasyonları, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ORTOPEDİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "diz-protezi-onam": {
    icerik: `DİZ PROTEZİ (TOTAL / PARSİYEL) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan diz protezi ameliyatı hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total diz protezi (TDP); ileri evre diz kireçlenmesi (gonartrozis), romatoid artrit veya travma sonrası diz eklem yüzeylerinin hasarlı kıkırdak ve kemik dokusunun cerrahi olarak uzaklaştırılarak metal ve polietilen komponentlerden oluşan yapay eklem yüzeyleriyle değiştirilmesi işlemidir. Parsiyel (unikondiler) diz protezinde yalnızca bir eklem bölmesi değiştirilir; total proteze göre daha az kemik kesilir.

Ameliyat spinal/epidural veya genel anestezi altında sırtüstü pozisyonda, dize turnike uygulanarak gerçekleştirilir. Kesi diz önünde dikey olarak yaklaşık 15–20 cm'dir. Süre genellikle 1–2 saattir. Kan kaybını azaltmak için tourniquet ve traneksamik asit kullanılır; gerektiğinde kan transfüzyonu uygulanabilir.

Protez tipi: □ Total diz protezi  □ Parsiyel (unikondiler) protez
Taraf       : □ Sağ  □ Sol  □ Her iki diz (zamanlama ayrıca planlanır)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–4 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Derin Ven Trombozu (DVT) ve Pulmoner Emboli (PE): Büyük ortopedik ameliyatlarda en ciddi komplikasyondur. Bacak venlerinde pıhtı oluşması (DVT) pulmoner emboliye (PE) yol açabilir ve hayati tehlike oluşturabilir. Antikoagülan ilaç, kompresyon çorabı ve erken mobilizasyon ile profilaksi uygulanır. Bacakta şişlik, kızarıklık veya ani nefes darlığı halinde acile başvurunuz.
• Kanama ve hematom: Drenaj veya transfüzyon gerektirebilir.
• Yara enfeksiyonu: Antibiyotik profilaksisi uygulanır. Yüzeysel enfeksiyonlar antibiyotikle, derin enfeksiyonlar ek müdahaleyle tedavi edilir.
• Anestezi komplikasyonları: Bulantı, kan basıncı değişimi, üretral kateter ihtiyacı.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Aylar–Yıllar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Protez periprostetik enfeksiyonu: Erken (ilk 3 ay) veya geç dönemde kan yoluyla yayılan bakterilerin proteze yerleşmesiyle gelişebilir. Diş çekimi veya cerrahi öncesinde antibiyotik profilaksisi gerekebilir; ciddi olgularda protezin çıkarılması kaçınılmazdır.
• Protez gevşemesi (aseptik loosening): Protez-kemik arayüzünde zaman içinde osteointegrasyon bozulması; ağrı ve fonksiyon kaybıyla kendini gösterir. Revizyon cerrahisi gerektirir. Ortalama protez ömrü 15–25 yıldır; yüksek kilolu veya genç aktif hastalarda daha erken gevşeme olabilir.
• Stifness (eklem sertliği): Yeterli rehabilitasyona rağmen 90°'nin altında kalabilen diz bükülme açısı; nadiren manipülasyon veya artroskopi gerektirir.
• Sinir ve damar hasarı: Peroneal sinir hasarı ayak düşüklüğüne yol açabilir; çoğunlukla geçicidir.
• Patellar komplikasyonlar: Patella (diz kapağı) kırığı veya protezinin gevşemesi nadir görülür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Konservatif tedavi: Ağrı kesici ve anti-inflamatuvar ilaçlar, fizik tedavi, yürüteç veya baston kullanımı; ileri evrede semptom kontrolü yetersiz kalır.
• Eklem içi enjeksiyonlar (kortikosteroid/hyaluronik asit/PRP): Geçici ağrı rahatlaması sağlar; hastalığın seyrini değiştirmez.
• Osteotomi: Genç hastalarda diz eksenini düzelterek protezi geciktirmeye yönelik cerrahi; uygun aday seçimi şarttır.
• Artroskopi: Gevşek kıkırdak parçaları veya menisküs yırtığı olan seçilmiş hastalarda semptomları geçici iyileştirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE REHABİLİTASYON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Erken mobilizasyon: Ameliyat günü veya ertesinde fizyoterapist eşliğinde ayağa kalkılır
• Antikoagülan tedavi 10–35 gün sürdürülür (hekiminizin reçetesine göre)
• Ambulasyon yardımcısı (yürüteç/baston) 4–6 hafta kullanılır
• Yoğun fizyoterapi 3. ayda tam fonksiyon hedefler; 6. ayda kademeli ağır aktiviteye dönülebilir
• Kontrol muayeneleri: 2. hafta (yara), 6. hafta, 3. ay, 1. yıl, sonrasında 2 yılda bir

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan diz protezi ameliyatı, DVT/PE riski, protez enfeksiyonu ve gevşemesi dahil komplikasyonlar, rehabilitasyon süreci, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "omurga-cerrahisi-onam": {
    icerik: `OMURGA CERRAHİSİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan omurga cerrahisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. AMELİYAT HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Omurga cerrahisi; disk hernisi (bel/boyun fıtığı), spinal stenoz (spinal kanal darlığı), spondilolistezis (kayma), spinal kırık veya omurga tümörü gibi nedenlerle sinir veya omuriliğe baskı yapan yapıların cerrahi olarak giderilmesini kapsar. Uygulanacak teknik tanıya ve hastanın klinik durumuna göre belirlenir: mikrodiskektomi, laminektomi (dekompresyon), spinal füzyon (vida-çubuk enstrümantasyonu), minimal invazif TLIF/PLIF ya da nöroşirürjik yaklaşımlar kullanılabilir.

Ameliyat genel anestezi altında, hasta pron (yüzüstü) veya supin (sırtüstü) pozisyonunda gerçekleştirilir. Süre ameliyat tipine göre 1–5 saat arasında değişir; nörointravizör monitorizasyon (SSEP/MEP) uygulanabilir.

Planlanan işlem: .......................................
Düzey           : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–2 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dura yırtığı ve BOS kaçağı: Sert zarın (dura mater) yırtılması sonucu BOS sızıntısı %1–3 oranında görülür. Primer onarım veya kama dikiş uygulanır; baş ağrısı, bulantı ve pozisyon bağımlı ağrı belirtileridir. Nadiren tekrar cerrahi gerekebilir.
• Kanama ve epidural hematom: Cerrahi sonrası spinal kanalda kan birikmesi sinir basısına yol açabilir; acil revizyonu gerektirebilir.
• Enfeksiyon: Yüzeysel yara enfeksiyonu veya daha nadir derin diskitis/osteomyelit; antibiyotik veya cerrahi debridmanla tedavi edilir.
• Anestezi komplikasyonları: Bulantı, kan basıncı değişimi — izlenerek yönetilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Yıllar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nörolojik kötüleşme: Sinir veya omuriliğin cerrahi sırasında gerilebilmesi ya da hasar görmesi çok nadir görülür (<1%) ancak kalıcı uyuşukluk, güçsüzlük veya mesane/bağırsak disfonksiyonuna yol açabilir.
• Füzyon başarısızlığı (psödoartroz): Enstrümantasyon uygulanan olgularda kemik kaynaşmasının gerçekleşmemesi; kronik ağrı ve implant kırılmasıyla sonuçlanabilir. Revizyon cerrahisi gerekebilir.
• İmplant gevşemesi veya kırılması: Vida, plak veya kafes malzemelerinin zamanla yer değiştirmesi; ilerlemiş olgularda yeniden operasyon yapılır.
• Komşu segment hastalığı: Füzyon yapılan segmentin üstündeki veya altındaki disk/ekleme artan yük; yıllarca sonra yeni fıtık veya stenoz gelişebilir.
• Disk nüksü: Mikrodiskektomiden sonra aynı segmentte disk fıtığının tekrarlaması %5–10 oranında görülür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Konservatif tedavi: Fizik tedavi, ağrı kesiciler, epidural steroid enjeksiyonu; akut disk hernisinin büyük çoğunluğu 6–12 haftada kendiliğinden iyileşir.
• Epidural steroid enjeksiyonu: Sinir kökü çevresine kortikosteroid; ağrı kontrolünde geçici rahatlama sağlar.
• Perkütan minimal invazif teknikler: Perkütan disk ablasyonu, nükleus pulposus enjeksiyonu; uygun hasta seçiminde cerrahi alternatifi olabilir.
• Tedavisiz bekle-izle: Neuromotor defisit (güçsüzlük, sfinkter kaybı) yoksa konservatif tedavi devam edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE REHABİLİTASYON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Erken mobilizasyon: Çoğu olguda ameliyat günü veya ertesi günü ayağa kalkılır
• Bel/boyun korsesi gereksinimi hekiminiz tarafından belirlenir
• 6. haftada kademeli aktivite artışı; 3. ayda fizik tedavi programı
• Ağır kaldırma ve bükme hareketlerinden 3 ay kaçınınız
• Kontrol muayeneleri: 2. hafta (yara), 6. hafta, 3. ay, 1. yıl — kontrol MRI gerekebilir

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan omurga cerrahisi, BOS kaçağı ve nörolojik komplikasyonlar başta olmak üzere cerrahi riskler, füzyon başarısızlığı ve uzun vadeli gereksinimler, alternatif tedaviler ve beklenen sonuçlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu ameliyata onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Kan transfüzyonu gerekirse kabul ediyorum.    □ Kabul etmiyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // GÖZ HASTALIKLARI — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "glokom-tedavi-onam": {
    icerik: `GLOKOM (GÖZ TANSİYONU) TEDAVİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan glokom tedavisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Glokom; göz içi basıncının (GİB) yüksek seyri veya bireysel hassasiyete bağlı optik sinir hasarı ile karakterli, ilerleyici görme alanı kaybına ve tedavi edilmezse körlüğe yol açabilen kronik bir göz hastalığıdır. Tedavinin amacı GİB'i güvenli bir düzeye indirerek optik sinir hasarının ilerlemesini yavaşlatmak veya durdurmaktır; mevcut görme alanı kaybı büyük ölçüde geri kazanılamaz.

Planlanan tedavi seçeneği:
□ a) İlaç tedavisi (göz damlası): GİB'i düşüren beta bloker, prostaglandin, karbonik anhidraz inhibitörü veya alfa agonist damlalar. Uzun süreli veya ömür boyu kullanım gerekebilir.
□ b) Lazer trabekuloplasti (SLT/ALT): Trabeküler ağ üzerine uygulanan lazer ışını drenajı artırarak GİB'i düşürür. Lokal anestezi altında poliklinik ortamında yapılır; 5–10 dakika sürer.
□ c) Glokom cerrahisi (trabekülektomi/tüp implantı): İlaç ve lazere yanıtsız olgularda GİB'i düşürmek için yeni bir drenaj yolu oluşturulur. Genel veya lokal anestezi altında yapılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İlaç Tedavisine Ait:
• Göz kızarıklığı, yanma ve batma (özellikle başlangıçta; birkaç haftada azalır)
• Prostaglandin damlaları: Kirpik uzaması, iris renk değişimi, göz çevresinde ciltte koyulaşma (geri dönüşümlü)
• Beta bloker damlalar: Nabız yavaşlaması, kan basıncı düşmesi, nefes darlığı (astım hastalarında kontrendike)
• Alerjik konjonktivit: İlaç değişikliği gerektirebilir

Lazer Tedavisine Ait:
• GİB'de geçici yükselme (ilk 1–4 saat); önceden önleyici damla verilir
• Hafif göz kızarıklığı ve rahatsızlık (1–2 gün)
• Lazerin tam etkisi 4–6 haftada ortaya çıkar

Cerrahi Tedaviye Ait:
• Kanama (hifema): Ön kamaraya kan geçmesi; çoğunlukla kendiliğinden emilir.
• Enfeksiyon: Postoperatif endoftalmi veya blebit; acil müdahale gerektirir.
• Hipotoni (göz basıncının aşırı düşmesi): Görmeyi olumsuz etkileyebilir; rebandon gerektirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tedaviye yanıtsızlık ve görme alanı kaybının ilerlemesi: Glokom kontrol altına alınsa dahi bazı hastalarda optik sinir kaybı devam edebilir; tedavi planı sürekli izlenip güncellenir.
• Katarakt hızlanması: Trabekülektomi sonrası sık görülür; gerektiğinde katarakt ameliyatı planlanır.
• Tüp malzeme komplikasyonları: Tüp göz içine girip kornea veya iris hasarına yol açabilir.
• İlaç bağımlılığı ve uyum sorunu: Ömür boyu düzenli damla kullanımı gerekebilir; ilaç uyumsuzluğu görme kaybını hızlandırır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İlaç tedavisi (damla/oral): Birinci basamak tedavi; etkili olduğunda cerrahi ihtiyacını geciktirir.
• SLT lazer: İlaç yerine veya ek olarak; tekrar edilebilir bir tedavidir.
• MIGS (Minimal İnvazif Glokom Cerrahisi): Daha az invazif cerrahi seçenekler (iStent, Hydrus) uygun hastalarda uygulanabilir.
• Tedavisiz izlem: Mümkün değildir; tedavisiz glokom körleğe ilerler.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İlaç damlalarınızı aksatmadan düzenli kullanınız; ani kesmeyin
• GİB kontrolü, görme alanı testi ve optik sinir görüntülemesi için düzenli kontrollere geliniz
• Göz ovmayınız; ağır kaldırmaktan ve ani eğilmekten kaçınınız (özellikle cerrahi sonrası)
• Kontrol muayeneleri: 1. hafta, 1. ay, 3. ay, 6. ay, 1. yıl ve sonrasında 6 aylık aralıklarla

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından glokom hastalığım, planlanan tedavi seçeneği, ilaç yan etkileri veya cerrahi riskler, tedavinin amacı ve sınırlılıkları (mevcut görme kaybının geri kazanılamaması), alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "intravitreal-onam": {
    icerik: `İNTRAVİTREAL ENJEKSİYON AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan intravitreal enjeksiyon işlemi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İntravitreal enjeksiyon; ilaçların göz içi vitreus boşluğuna ince iğne yoluyla doğrudan verildiği bir tedavi yöntemidir. Steril ortamda, topikal anestezi damlaları altında gerçekleştirilir; işlem süresi 5–10 dakikadır. Retinal hastalıkların tedavisinde kullanılan ilaçlar; anti-VEGF ajanlar (bevacizumab, ranibizumab, aflibercept, brolucizumab), kortikosteroid implantları (deksametazon, triamsinolon) veya antibiyotikler olabilir.

Anti-VEGF tedavisinde genellikle 3 aylık yükleme dozunu takiben hastalık aktivitesine göre idame enjeksiyonları sürdürülür. Enjeksiyonlar uzun süreli hatta ömür boyu gerekebilir.

Endikasyon: □ Yaşa bağlı maküla dejenerasyonu (nAMD)  □ Diyabetik maküla ödemi  □ Retinal ven tıkanıklığı  □ Diğer: .......
Etkilenen göz: □ Sağ  □ Sol  □ Her iki göz
Planlanan ilaç: .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–7 Gün)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Subkonjonktival kanama (kırmızı nokta): Enjeksiyon bölgesinde gözde kırmızılık; zararsız, 1–2 haftada kendiliğinden geçer.
• Geçici görme bulanıklığı: İlaç enjeksiyonu sonrası birkaç saate kadar sürebilir.
• Göz içi basınç yükselmesi: Enjeksiyon sonrası GİB artışı olabilir; tonometri ile kontrol edilir ve gerekirse tedavi uygulanır.
• Göz ağrısı ve rahatsızlık: Genellikle birkaç saat içinde geçer; ağrı kesici göz damlasıyla yönetilir.
• Endoftalmi (göz içi enfeksiyonu): En ciddi komplikasyondur; görme kaybına yol açabilir. İnsidansı enjeksiyon başına <1/1000'dir. Enjeksiyon sonrası artan ağrı, kızarıklık ve görme kaybında acil hekiminize başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Retinal dekolman: Enjeksiyon ile ilişkili son derece nadir bir komplikasyon; ani görme kaybı, parlama ve yüzen noktalar uyarı belirtileridir — acil başvurunuz.
• Göz içi basınç artışı (özellikle kortikosteroid implantlarda): İzlenmeli ve gerekirse ilaçla veya cerrahi yolla tedavi edilmelidir.
• Tedaviye yanıtsızlık: Görme kaybının stabilizasyonu başarıyla sağlanabilir; ancak tam görme kazanımı mümkün olmayabilir.
• Sistemik vasküler olaylar (inme/miyokard enfarktüsü): Anti-VEGF ilaçlar göz dışına minimal miktarda geçebilir; kanıtlar sistematik riski son derece düşük göstermektedir. Yüksek riskli kardiyovasküler hastalar için risk-fayda değerlendirmesi yapılır.
• Katarakt hızlanması (özellikle steroid implantlarda): Gözlenmeli ve gerektiğinde katarakt ameliyatı planlanmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Farklı anti-VEGF ajanı: Aynı sınıftan farklı bir ilaçla yanıt alınabilir.
• Fotodinamik tedavi (PDT): Klasik nAMD alt tipi için belirli endikasyonlarda hâlâ kullanılır.
• Lazer fotokoagülasyon: Periferik retinal hastalıklar ve bazı diyabetik retinopati formlarında; maküla ödemi için artık önerilmez.
• Tedavisiz izlem: Tedavisiz bırakılması durumunda ilerleyici görme kaybı riski yüksektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Enjeksiyon sonrası 1–2 gün göze su kaçırmayınız, ovmayınız
• Antibiyotik göz damlalarını reçeteye göre kullanınız
• Görme değişikliği, kızarıklık veya ağrı artarsa hemen başvurunuz
• Kontrol muayeneleri hastalık aktivitesine göre belirlenir (genellikle 4–8 haftada bir)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan intravitreal enjeksiyon, tekrarlayan seans gerekliliği, endoftalmi ve retinal dekolman başta olmak üzere komplikasyonlar, tedavinin görme kaybını yavaşlatma amacı ve sınırları, alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // DERMATOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "lazer-epilasyon-onam": {
    icerik: `LAZER EPİLASYON AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan lazer epilasyon tedavisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lazer epilasyon; seçici fototermoliz prensibiyle lazer enerjisinin kıl köklerindeki melanine selektif olarak emilmesi ve ısı yoluyla kıl kökünü kalıcı hasar görmesine neden olarak tüy büyümesinin azaltılması işlemidir. Kullanılan lazer tipi cilt rengi ve kıl tipine göre seçilir: alexandrite (755 nm), diyot (808 nm) veya Nd:YAG (1064 nm) lazerleri kullanılır. Nd:YAG koyu tenliler için en güvenli seçenektir.

Tüyler aktif büyüme fazında (anagen) lazer enerjisine en duyarlıdır; tüm kıllar aynı anda bu fazda olmadığından kalıcı azaltma için birden fazla seans gereklidir. Tam ve kalıcı epilasyon garantisi verilemez.

Tedavi bölgesi         : .......................................
Lazer tipi             : □ Alexandrite  □ Diyot  □ Nd:YAG
Cilt tipi (Fitzpatrick): .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24–72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kızarıklık ve ödem: Tedavi bölgesinde 1–2 gün süren eritem ve hafif şişlik beklenen bir tepkidir.
• Folikülit: Kıl kökü çevresinde küçük kızarık kabarıklıklar; birkaç günde kendiliğinden geçer.
• Ağrı ve sıcaklık hissi: Seans sırasında lastik tokatlama benzeri ağrı; soğutma başlıkları ve topikal anestezi kremleriyle azaltılır.
• Kabuklanma: Koyu tenlilerde veya parametrelerin bölgeye uyumsuzluğunda kısa süreli kabuk oluşabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hiperpigmentasyon: Tedavi bölgesinde koyu renk lekeleri özellikle Fitzpatrick IV–VI tipi (koyu tenli) hastalarda ve güneş maruziyeti sonrası gelişir. Düzenli SPF 50+ güneş kremi kullanımıyla riski önemli ölçüde azaltılır; lekelenmeler genellikle 3–6 ayda solar.
• Hipopigmentasyon: Ciltte açık renk leke oluşumu daha nadir görülür; özellikle yüksek enerji kullanımı veya güneşlenmede risk artar. Uzun süre devam edebilir.
• Yanık ve skar: Uygunsuz parametre kullanımı, soğutma sisteminin yetersizliği veya aktif tanda (güneşlenme) işlem yapılması durumunda kabarcık ve yara izi oluşabilir.
• Paradoksal hipertrikoz: Nadir görülen, lazer epilasyon sonrası tüylenme artışıdır; tedavi bölgesinin dışına yayılabilir. Hormonal bozukluklarda risk daha fazladır.
• Sınırlı etkinlik: Hormonal bozukluklarda (PKOS, hirsutizm) tedaviye rağmen tüyler yeniden çıkabilir; idame seans gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tıraş, ağda, iplik, pens: Geçici yöntemler; düzenli tekrar gerektirir.
• Elektroliz (iğne epilasyon): Kılları tek tek hedef alır; kalıcı ancak çok zaman alır ve daha ağrılıdır.
• Eflornitine krem: Yüz bölgesinde tüy büyümesini yavaşlatır; kalıcı değildir.
• Hormonal tedavi: Hormonal kaynaklı hirsutizmde oral kontraseptif veya antiandrojen ilaçlar tüylenmeyi azaltabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SEANS SONRASI BAKIM TALİMATLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İşlem sonrası ve iyileşme döneminde SPF 50+ güneş kremi düzenli kullanılmalıdır
• İşlem öncesi 4 hafta, sonrası 4 hafta güneşlenme ve solaryum yasaktır
• Cildi tahriş eden scrub, peeling ve sıcak duş 48 saat uygulanmamalıdır
• Epilasyon yapılmamalı; tıraş serbesttir
• Seanslar genellikle 4–8 hafta aralıklarla planlanır

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan lazer epilasyon tedavisi, kalıcı sonucun garantisinin verilemeyeceği, hiperpigmentasyon ve yanık riski başta olmak üzere olası komplikasyonlar, güneş korunmasının kritik önemi, alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "kimyasal-peeling-onam": {
    icerik: `KİMYASAL PEELİNG (CİLT SOYMA) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan kimyasal peeling uygulaması hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kimyasal peeling; glikolik asit, salisilik asit, laktik asit, TCA (trikloroasetik asit) veya fenol gibi kimyasal ajanların cilt yüzeyine kontrollü biçimde uygulanmasıyla epidermis ve/veya dermistin üst katmanlarının soyulması, yeni ve daha düzgün cilt dokusunun ortaya çıkmasının sağlanması işlemidir. Akne izi, melazma, leke, yüzeysel kırışıklık, foto-yaşlanma ve cilt dokusunun iyileştirilmesinde uygulanır.

Derinliğine göre üç tip peeling mevcuttur:
□ Yüzeyel peeling (AHA/BHA): Yalnızca epidermisi etkiler; 3–7 gün iyileşme. Rutin tıbbi kontrol gerektirmez.
□ Orta derinlikte peeling (TCA %20–35): Papiller dermise ulaşır; 7–14 gün iyileşme.
□ Derin peeling (fenol): Retiküler dermise ulaşır; 2–4 hafta iyileşme. Kardiyak monitorizasyon ve sedasyon gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1–2 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kızarıklık, soyulma ve kabuklanma: Beklenen ve normal bir iyileşme sürecidir; peeling derinliğine göre 3–14 gün sürer.
• Ödem ve yanma hissi: Orta ve derin peelinglerde belirgindir; analjezik ve soğuk uygulama ile yönetilir.
• Herpes simpleks reaktivasyonu: Önceden uçuk geçiren hastalarda antiviral profilaksi (asiklovir) başlanır; tedavisiz kalan uçuk belirgin iz bırakabilir.
• Enfeksiyon: Bakteri veya mantar enfeksiyonu nadir; antibiyotik ile tedavi edilir.
• Kardiyak toksisite (derin fenol peelingde): Fenol emilimi kardiyak aritmiye neden olabilir; monitorizasyon zorunludur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Post-inflamatuvar hiperpigmentasyon (PIH): Koyu tenli (Fitzpatrick IV–VI) hastalarda güneş maruziyetiyle tetiklenen en sık geç komplikasyondur; SPF 50+ kullanımı ve işlem öncesi hazırlık (hidroquinone, retinoid kür) ile riski azaltılır.
• Hipopigmentasyon: Özellikle derin peelinglerde gelişen kalıcı açık leke; risk değerlendirme preoperatif dönemde yapılır.
• Hipertrofik skar: Derin peelinglerde nadir; silikon bant ve intralezyonel steroid enjeksiyonuyla tedavi edilir.
• Uzamış kızarıklık (eritema): Aylarca sürebilir; topikal steroid ve güneş korumayla yönetilir.
• Demarcation line (sınır çizgisi): Derin fenol peelinginde tedavi edilen ve edilmeyen cilt arasında görünür renk farkı kalabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Topikal retinoidler ve hidroquinone: Yavaş etki; leke ve yaşlanma için güvenli uzun vadeli tedavi.
• Lazer yüzey yenileme (CO₂/Er:YAG): Daha kontrollü derinlik; defalarca seans gerektirmez ancak daha maliyetlidir.
• Mikrodermabrazyon: Çok yüzeysel, mekanik soyma; peeling kadar etkili değildir.
• Kinetin / azelaic asit gibi hafif aktifler: Hassas ciltler için daha güvenli alternatif.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. UYGULAMA SONRASI BAKIM TALİMATLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Soyulan deriye dokunmayınız; zorlayarak çıkarmayınız
• Nemlendirici krem düzenli uygulanmalıdır
• SPF 50+ geniş spektrumlu güneş kremi işlem sonrası en az 4–6 hafta zorunludur
• Güneşlenmeden ve solaryumdan kaçınınız
• Retinoid ve asit içerikli kremler iyileşme tamamlanana kadar kesilmelidir

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan kimyasal peeling uygulaması, derinlik seçimi, hiperpigmentasyon ve skar riski başta olmak üzere komplikasyonlar, güneş korumasının kritik önemi, alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu uygulamaya onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "dermatoloji-prp-onam": {
    icerik: `DERMATOLOJİK PRP / MEZOTERAPİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan PRP (Trombositten Zengin Plazma) ve/veya mezoterapi uygulaması hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRP (Trombositten Zengin Plazma): Hastanın kendi venöz kanından santrifüj yöntemiyle elde edilen trombosit konsantresinin büyüme faktörleri içermesi nedeniyle doku yenilenmesini ve saç büyümesini uyardığı düşünülmektedir. Saç dökülmesi (androgenetik alopesi) veya yüz/boyun cilt yenileme amacıyla ilgili bölgeye ince iğne ile çok sayıda nokta enjeksiyonu şeklinde uygulanır.

Mezoterapi: Vitamin, mineral, aminoasit, hyaluronik asit ve/veya diğer aktif bileşenlerin içeren kokteyl karışımının mezodermis seviyesinde enjekte edilmesi işlemidir; cilt nemlendirme, parlaklık kazanımı ve yüzeysel dolgunluk amaçlanır.

Her iki tedavinin bilimsel etkinlik kanıtları değişkenlik göstermektedir; sonuçlar kişiden kişiye farklılık gösterir ve garanti edilemez.

Planlanan tedavi   : □ PRP  □ Mezoterapi  □ Her ikisi
Uygulama bölgesi   : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24–72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kızarıklık ve ödem: Enjeksiyon bölgesinde 1–3 gün süren kızarıklık ve hafif şişlik normaldir.
• Ekimoz (morluk): Küçük kan damlacıklarının deri altına sızmasıyla oluşur; 5–10 günde geçer.
• Ağrı ve hassasiyet: Seans sırasında ve sonrasında olağandır; parasetamol ile yönetilir.
• Baş dönmesi: Kan alımı sırasında vazovagal reaksiyon nadir görülür; seans öncesi hafif bir şeyler yenilmesi önerilir.
• Geçici kaşıntı: Birkaç saatte kendiliğinden geçer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar–Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Yetersiz yanıt: PRP'ye yanıt bireysel büyüme faktörü konsantrasyonuna ve doku alıcılığına göre değişir; beklenen iyileşme sağlanamayabilir.
• Enfeksiyon: Steril olmayan teknikle uygulama halinde nadiren deri apsesi veya selülit gelişebilir; aseptik teknik riski minimuma indirir.
• Alerjik reaksiyon (mezoterapi): Karışımda kullanılan herhangi bir maddeye duyarlılık reaksiyonu gelişebilir; önceden ilaç alerjisi bildirilmelidir.
• Hiperpigmentasyon: Enjeksiyon noktalarında geçici koyu leke nadiren görülür; güneş korumasıyla riski azalır.
• Nodül oluşumu: Mezoterapi malzemesine bağlı nadir görülen deri altı sertliği.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Saç dökülmesi için: Minoksidil (topikal/oral), finasterid; kanıt düzeyi PRP'den daha yüksektir.
• Cilt bakımı için: Hyaluronik asit dolgu, botoks, lazer tedavileri; daha güçlü klinik kanıt mevcuttur.
• Biyotin ve vitamin takviyeleri: Etkisi sınırlı; beslenme kaynaklı eksiklikte faydalı.
• Saç ekimi (FUE/FUT): Kalıcı çözüm; ileri evre saç dökülmesinde tercih edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SEANS SONRASI BAKIM TALİMATLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Seans sonrası 24 saat boyunca uygulama bölgesini yıkamayınız ve ovmayınız
• Aspirin ve NSAİ ilaçlar seans öncesi ve sonrası 3–5 gün kullanılmamalıdır
• Seans günü alkol kullanmayınız
• Güneş koruyucu kullanımı önerilir
• Seanslar genellikle 4 hafta aralıklarla planlanır; idame 6 ayda bir

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan PRP/mezoterapi uygulaması, sonuçların bireysel değişkenliği ve garanti edilemeyeceği, olası komplikasyonlar, alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.    □ Onaylamıyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // PSİKİYATRİ — YENİ FORM
  // ════════════════════════════════════════════════════════════════════════

  "ect-onam": {
    icerik: `ELEKTROKONVÜLSİF TERAPİ (EKT) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız / Sayın Yasal Temsilci,

Bu form, 1219 Sayılı Kanun, Hasta Hakları Yönetmeliği ve Ruh Sağlığı Kanunu kapsamında planlanan Elektrokonvülsif Terapi (EKT) hakkında bilgilendirme ve onam almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EKT; kısa süreli genel anestezi ve kas gevşetici (süksinilkolin) altında, baş derisine yerleştirilen elektrotlar aracılığıyla beyne kısa süreli (0,5–8 saniye) elektrik akımı uygulanarak kontrollü terapötik konvülsiyon oluşturulması esasına dayanan psikiyatrik bir tedavi yöntemidir. Modern EKT monitörize ortamda uygulanır; hasta kasılması görülmez.

Endikasyonlar: İlaç tedavisine yanıtsız ağır depresyon, psikotik özellikli depresyon, bipolar mani, katatonik şizofreni, ciddi intihar riski veya hızlı klinik iyileşme gerektiren durumlar.

EKT, birçok tedaviye dirençli psikiyatrik hastalıkta etkili olduğu kanıtlanmış bir tedavidir.

Tedavi planı      : Haftada ...... seans, toplam ...... seans
Elektrot yerleşimi: □ Bifrontal  □ Bitemporal  □ Sağ unilateral
Tahmini endikasyon: .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR (Her Seans Sonrası)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Konfüzyon ve yönelim bozukluğu: Seans sonrası saatler içinde kendiliğinden geçer.
• Baş ağrısı ve kas ağrısı: Kas gevşetici kullanımına bağlı; analjezikle yönetilir.
• Bulantı: Anestezi ile ilişkili; antiemetik tedaviyle kontrol altına alınır.
• Kardiyovasküler değişiklikler: Anlık taşikardi veya bradikardi görülebilir; kardiyolojik monitorizasyon altında uygulanır.
• Diş/dil zedelenmesi: Isırma koruyucu rutin olarak uygulanır; nadir görülür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR (Kür Süresince ve Sonrasında)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Bellek bozukluğu (en önemli yan etki): Özellikle tedavi kürü sırasında ve hemen sonrasında yakın dönem bellek sorunları görülebilir. Unilateral ve bifrontal teknikler bilaterale göre daha az bellek etkisi yaratır. Kür tamamlandıktan sonra haftalarca aylar içinde büyük ölçüde iyileşir; bazı hastalarda tedavi dönemine ait kalıcı bellek boşlukları kalabilir.
• Uzamış apne veya konvülsiyon: Kas gevşetici doz değişikliğiyle yönetilir.
• Anestezi komplikasyonları: Aspirasyon pnömonisi, laringospazm — nadir.
• Eufori veya mani: Antidepresan etkiye bağlı; duygudurum dengeleyici ile yönetilir.
• Geç nörolojik etki: Uzun vadeli beyin hasarı kanıtlanmamıştır; araştırmalar devam etmektedir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İlaç tedavisi değişikliği: Farklı antidepresan/antipsikotik kombinasyonları denenmesi; yanıt geç ve yetersiz olabilir.
• Transkraniyal Manyetik Uyarı (TMS): Daha az invazif nöromodülasyon yöntemi; EKT kadar hızlı ve etkili değildir.
• Ketamin infüzyonu: Tedaviye dirençli depresyonda hızlı etki; sürdürme protokolü tartışmalıdır.
• Hastaneye yatış ve yoğun psikiyatri bakımı: Farmakolojik tedavinin optimize edilmesi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SEANS SONRASI BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Her seans günü en az 6 saat öncesinden aç olunması zorunludur
• Seans sonrası araç kullanılmamalıdır
• Yönelim yerine gelinceye kadar yalnız bırakılmamalıdır
• Bilişsel değişiklikler izlenecek; endişelerinizi ekibinizle paylaşınız

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA/TEMSİLCİ BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EKT tedavisi, bellek bozukluğu başta olmak üzere yan etkiler ve riskler, tedavinin sınırlılıkları ve alternatifleri hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle (veya hastanın yasal temsilcisi sıfatıyla) bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerinin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ÇOCUK SAĞLIĞI — YENİ FORM
  // ════════════════════════════════════════════════════════════════════════

  "cocuk-ameliyat-onam": {
    icerik: `PEDİATRİK CERRAHİ AYDINLATILMIŞ ONAM FORMU (VELİ / VASİ)

Sayın Ebeveyn / Yasal Vasimiz,

Çocuğunuz için planlanan cerrahi girişim hakkında 1219 Sayılı Tababet ve Şuabatı San'atlarının Tarzı İcrasına Dair Kanun ile Hasta Hakları Yönetmeliği kapsamında aydınlatılmış onam almak yasal zorunluluktur. Bu form 18 yaş altı hastalar için veli veya yasal vasi tarafından okunup imzalanmalıdır. Lütfen tüm bölümleri dikkatle okuyunuz.

Planlanan işlem adı: .................................................
Çocuğun yaşı / kilosu: .................. / ..................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Çocuğunuzda tanımlanan hastalık/durum, hekim tarafından cerrahi tedaviyi tıbben gerekli kılmıştır. Planlanan ameliyat, çocuk cerrahisi uzmanı ve çocuk anestezisti tarafından gerçekleştirilecektir. Pediatrik anestezi erişkin anestezisinden farklı özellikler taşır; çocuk vücut ağırlığına göre kalibre edilen ilaç dozları, uygun hava yolu ekipmanı ve ısı yönetimi protokolleri uygulanacaktır. Genel anestezi altında çocuğunuz işlem süresince ağrı hissetmeyecektir. Ameliyat süresi işlemin türüne ve karmaşıklığına göre 30 dakika ile birkaç saat arasında değişebilir.

Uygulama öncesinde çocuğunuzun genel sağlık durumu, kan değerleri ve gerektiğinde görüntüleme tetkikleri değerlendirilecektir. Laparoskopik (kapalı) veya açık teknik tercihinin yanı sıra ameliyat sırasında plan değişmesi gerekirse (örneğin laparoskopiden açığa geçiş) size bilgi verilecektir. Çocuğunuzun güvenliği her zaman önceliktir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Anesteziden uyanma reaksiyonları: Küçük çocuklarda ajitasyon, ağlama ve konfüzyon (emergence delirium) görülebilir; geçicidir.
• Hipotermi: Çocuklar yetişkinlere göre daha hızlı ısı kaybeder; ısıtıcı battaniye ve infüzyon ısıtıcıları kullanılır.
• Kanama: Cerrahiye özgü kanamalar hemostaz önlemleriyle kontrol altına alınır; nadir durumlarda transfüzyon gerekebilir.
• Bulantı ve kusma: Genel anestezi sonrası sıktır; antiemetik tedavi uygulanır, sıvı kaybı yakından izlenir.
• Yara yeri komplikasyonları: Sütür açılması, seröz akıntı; birkaç gün içinde düzelir, pansuman yapılır.
• Ateş: İlk 48 saatte hafif ateş normal karşılanabilir; devam eden veya yüksek ateş enfeksiyon açısından değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Yara yeri enfeksiyonu: Kızarıklık, şişlik veya akıntı belirirse antibiyotik tedavisi başlanır.
• Yapışıklık (adezyon): Karın içi ameliyatlarda bağırsak ileri dönemde tıkanabilir; nadir olup ek müdahale gerektirebilir.
• Skar dokusu gelişimi: Çocuklarda keloid oluşumu erişkinlere kıyasla farklı seyredebilir; büyüme sürecinde değişim izlenir.
• İşleme özgü geç komplikasyonlar: Planlanan cerrahi türüne bağlı olarak hekim tarafından ayrıca açıklanacaktır (örn. fıtık nüksü, safra yolu darlığı, anastomoz darlığı).
• Büyüme ve gelişime etkisi: Bazı operasyonlar uzun vadeli takip gerektirebilir; periyodik pediatrik kontroller planlanacaktır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Konservatif/tıbbi tedavi: Bazı durumlarda antibiyotik veya ilaç tedavisiyle bekleyici yaklaşım mümkün olabilir; ancak hekim bu seçeneğin yetersiz kaldığını değerlendirmiştir.
• Endoskopik/minimal invaziv yaklaşım: Ameliyat türüne göre laparoskopik veya robotik seçenek değerlendirilmiş olup en uygun yöntem planlanmıştır.
• Bekleme politikası (watchful waiting): Acil olmayan durumlarda izlemek bir seçenek olsa da mevcut tabloda gecikme risk oluşturabileceğinden önerilmemektedir.
• Başka merkeze sevk: Farklı bir çocuk cerrahisi kliniğinde ikinci görüş alınabilir; bu hakkınız mevcuttur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Çocuğunuz derlenme odasında uyandıktan sonra pediatri servisine veya yoğun bakıma alınacaktır.
• Sıvı ve beslenme takviyesi yaşa uygun protokolle yönetilecektir; emzirme veya anne sütü desteği mümkün olan en erken sürede yeniden başlanacaktır.
• Ağrı yönetimi için pediatrik doza uygun analjezi uygulanacaktır.
• Taburculukta yara bakımı, diyet ve aktivite kısıtlamaları yazılı olarak verilecektir.
• Kontrol randevusu: İşlem sonrasında belirtilen tarihte mutlaka getiriniz; 38°C üzeri ateş, artan ağrı, yara akıntısı veya kusma durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VELİ / VASİ BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ben aşağıda imzası bulunan veli/yasal vasi olarak;
☐ Çocuğumun sağlık durumu, planlanan cerrahi girişim ve anestezi hakkında hekimimden sözlü ve yazılı olarak yeterince bilgilendirildim.
☐ Erken ve geç dönem komplikasyonlar, alternatif tedaviler ve ameliyatsız bırakılmanın riskleri bana açıklandı.
☐ Sorularımı sormak için fırsat tanındı ve tüm sorularım yanıtlandı.
☐ İşlem sırasında gerekli görülmesi halinde planın genişletilebileceğini (ek girişim) kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum; ancak bu kararın sonuçlarından da haberdarım.
☐ Çocuğumun planlanan cerrahi girişimine ve gerekli anestezi uygulamasına ONAY VERİYORUM.

Çocuğun Adı Soyadı           : .......................................
T.C. Kimlik No (Çocuk)        : .......................................
Doğum Tarihi                  : .......................................

Veli / Vasinin Adı Soyadı     : .......................................    Tarih   : .................
T.C. Kimlik No (Veli/Vasi)    : .......................................    İmza    : .................
Çocukla Yakınlık Derecesi     : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İMZA TABLOSU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ÜROLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "prostat-ameliyat-onam": {
    icerik: `PROSTAT AMELİYATI (TUR-P / HoLEP / AÇIK) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Prostat hastalığınıza yönelik planlanan cerrahi girişim hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği çerçevesinde bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz ve anlamadığınız noktaları hekiminize sorunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prostat ameliyatı; iyi huylu prostat büyümesi (BPH) veya prostat kanseri nedeniyle prostat dokusunun tümüyle ya da kısmen çıkarılması/küçültülmesi işlemidir. Planlanan yöntem: TUR-P (transüretral rezeksiyon) endoskopik olarak üretradan girerek prostat dokusunu elektrik akımı veya lazerle tırpanlar; genel/spinal anestezi altında 60–90 dakika sürer, kesi gerektirmez. HoLEP yönteminde holmiyum lazer ile prostat lobları enüklee edilir. Açık veya robotik radikal prostatektomide ise prostat bezi karın veya perineal kesi yoluyla bütünüyle çıkarılır; bu işlem 2–4 saat sürer, genel anestezi gerektirir.

Ameliyat öncesinde idrar kültürü, PSA, tam kan sayımı ve kardiyak değerlendirme tamamlanacaktır. Antikoagülan ve antiplatelet ilaçlar hekimin yönlendirmesiyle belirtilen süre önce kesilecektir. Ameliyat sırasında gerektiğinde planlanan teknik değiştirilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kanama: Ameliyat sonrası idrarda pembeden kırmızıya değişen renk beklenen bir bulgudur; yoğun kanama sürekli mesane yıkaması veya reoperasyon gerektirebilir.
• TUR sendromu: TUR-P'de irrigasyon sıvısının kana karışmasıyla seyreltme hiponatremisi oluşabilir; konfüzyon, hipertansiyon ve bradikardi ile kendini gösterir, acil tedavi gerektirir.
• Üriner retansiyon: Kateter çıkarıldıktan sonra işeme güçlüğü yaşanabilir; geçici tekrar kateterizasyon uygulanır.
• Enfeksiyon: Üriner sistem enfeksiyonu veya prostatit tablo gelişebilir; ateş ve yanma ile kendini gösterir, antibiyotikle tedavi edilir.
• Ağrı ve spazm: Mesane boyun spazmı ilk günlerde belirgin olabilir; antikolinerjikler ve analjeziklerle kontrol edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Retrograd ejakülasyon: TUR-P ve HoLEP sonrası %80-90 oranında görülür; meni mesaneye kaçar, boşalma hissi azalır ancak orgazm korunur. Bu durum kalıcı olup ebeveynliği planlayanlar için sperm bankası önerilmektedir.
• Ereksiyon bozukluğu: Radikal prostatektomide sinir koruyucu teknik kullanılsa bile %20-80 oranında görülebilir; ilaç, vakum veya protez ile tedavi edilebilir.
• İdrar kaçırma (inkontinans): Stres tipi inkontinans, özellikle radikal prostatektomi sonrası ilk aylarda görülür; pelvik taban egzersizleri ve gerektiğinde sling cerrahisi ile düzeltilebilir.
• Üretral/mesane boynu darlığı: Skar dokusu oluşumu idrar akımını engelleyebilir; üretral dilatasyon veya endoskopik insizyonla tedavi edilir.
• Hastalık nüksü: Prostat kanseri cerrahisi sonrası PSA takibi yapılır; yükselme halinde ek tedavi (radyoterapi, hormonoterapi) gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İlaç tedavisi (BPH için): Alfa blokerler (tamsulosin) ve 5-alfa redüktaz inhibitörleri (finasterid) semptomları hafifletebilir; ancak büyük bezlerde veya komplikasyon varlığında yeterli olmayabilir.
• Minimal invaziv yöntemler: UroLift (prostat kaldırma implantı), Rezum buhar tedavisi veya lazer vaporizasyonu cerrahi alternatifleri arasındadır; endikasyon değerlendirmesi gerekir.
• Aktif izlem (prostat kanseri): Düşük riskli lokalize kanserde aktif sürveyans (PSA + biyopsi takibi) bir seçenektir.
• Radyoterapi: Prostat kanseri için brakiterapi veya eksternal radyoterapi cerrahi yerine uygulanabilecek tedavi seçenekleridir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Foley kateter TUR-P sonrası genellikle 24-48 saat, açık ameliyatta 7-14 gün kalır.
• Taburculukta bol sıvı tüketimi (günde 2-3 litre) ve kırmızı idrarda acile başvuru talimatı verilecektir.
• İlk 4-6 hafta ağır kaldırma, ıkınma ve uzun araç kullanımından kaçınılmalıdır.
• Kontrol PSA: Radikal prostatektomi sonrası 6. haftada ölçüm yapılır; her 3-6 ayda bir izlem planlanır.
• Cinsel rehabilitasyon: Ereksiyon rehabilitasyon programı (PDE5 inhibitörü ± vakum cihazı) erken başlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Prostat hastalığım, planlanan ameliyat ve anestezi hakkında hekimimden ayrıntılı bilgi aldım.
☐ Erken ve geç dönem komplikasyonlar, retrograd ejakülasyon ve ereksiyon bozukluğu dahil tüm riskler bana anlatıldı.
☐ Alternatif tedavi seçenekleri açıklandı, sorularım yanıtlandı.
☐ Ameliyat planının gerektiğinde genişletilebileceğini kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi, bunun sonuçlarını da anladığımı beyan ederim.
☐ Planlanan prostat ameliyatına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "tas-kirma-eswl-onam": {
    icerik: `BÖBREK / ÜRİNER SİSTEM TAŞI KIRMA (ESWL) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Böbrek veya üreter taşınıza yönelik planlanan ESWL işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESWL (Ekstrakorporeal Şok Dalgası Litotripsi), vücut dışından ultrason veya floroskopi rehberliğinde odaklanan yüksek enerjili şok dalgalarıyla böbrek veya üreter taşının kum haline getirilmesi işlemidir. Hastanın masaya yatırılarak taşın cihaz odak noktasına getirilmesiyle başlanır; işlem kesi gerektirmez. Ortalama 30-60 dakika sürer, analjezi veya hafif sedasyon eşliğinde uygulanabilir.

Taş boyutu, sertliği (kalsiyum oksalat monohydrat taşları daha dirençlidir), konumu ve böbrek anatomisine göre 1-3 seans gerekebilir. Her seans arasında en az 2 hafta beklenir. İşlem öncesinde tam idrar tahlili, idrar kültürü, pıhtılaşma testleri ve görüntüleme (BT veya USG) tamamlanmış olmalıdır; aktif idrar yolu enfeksiyonu varlığında işlem ertelenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Hematüri (idrarda kan): İşlem sonrası idrarda pembe/kırmızı renk beklenen bir bulgudur; bol sıvı alımıyla 1-3 günde çözülür, devam ederse değerlendirilir.
• Renal hematom (böbrek çevresi kanama): %1-2 sıklıkta görülür; çoğu küçük ve kendiliğinden geriler, nadiren kan transfüzyonu veya embolizasyon gerektirir.
• Steinstrasse (taş yolu): Parçalanan taş kırıntılarının üreterde sıralanarak tıkanıklık oluşturması; renal kolik, ateş veya böbrek fonksiyon bozukluğuna yol açabilir, üreterorenoskopi gerektirebilir.
• Kolik ağrısı: Taş parçacıklarının geçişi sırasında tipik böbrek koliği oluşabilir; ağrı kesici ve spazmolitiklerle kontrol edilir.
• Kardiyak aritmi: Altta yatan kalp hastalığında şok dalgaları ritim bozukluğunu tetikleyebilir; EKG izlemli uygulama yapılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Taş rezidüsü: Tam parçalanmayan veya idrar yoluyla atılamayan parçalar için ek seans, üreterorenoskopi veya perkütan nefrolitotomi gerekebilir.
• Hipertansiyon: Tekrarlayan seanslarda renal parankim üzerindeki birikim hasarı nadir de olsa hipertansiyon gelişimine katkıda bulunabilir; kan basıncı izlemi önerilir.
• Böbrek fonksiyon değişikliği: Tek böbreklilerde veya mevcut böbrek hastalığında fonksiyon takibi daha dikkatli yapılmalıdır.
• Taş nüksü: Metabolik taş hastalığı yönetilmezse yıllık nüks riski yüksektir; diyet, hidrasyon ve gerektiğinde ilaç tedavisi planlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Üreterorenoskopi + lazer litotripsi (URS): Üretradan endoskop ile taşa ulaşılarak holmiyum lazerle kırılır; taş boyutundan bağımsız olarak yüksek temizleme oranı sağlar.
• Perkütan nefrolitotomi (PNL): Büyük (>2 cm) veya ESWL'ye dirençli taşlarda cilt üzerinden böbreğe mini kesi ile girilir; genel anestezi gerektirir.
• Bekleyici yaklaşım + medikal tedavi: 4-5 mm altındaki taşlarda alfa bloker (tamsulosin) ve bol sıvı ile spontan pasaj beklenebilir.
• Açık/laparoskopik taş cerrahisi: Anatomik anomali veya endoskopik başarısızlık durumunda nadir olarak tercih edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası günlük 2,5-3 litre sıvı tüketimi taş parçacıklarının atılmasını hızlandırır.
• İdrarınızı süzerek taş parçacıklarını biriktirmeniz analiz için istenilebilir.
• 38°C üzeri ateş, şiddetli ağrı veya idrar yapamama durumunda acilen başvurunuz.
• Kontrol görüntüleme (USG veya düşük doz BT) işlem sonrası 4-6. haftada yapılacaktır.
• Aspirin ve NSAİD'ler işlemden 5 gün önce ve sonra kesilmelidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ ESWL işlemi, taşın özelliği ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Erken/geç dönem riskler, Steinstrasse ve hematom olasılığı bana açıklandı.
☐ Alternatif tedavi seçenekleri (URS, PNL, bekleyici yaklaşım) değerlendirildi.
☐ Sorularım yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ ESWL işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "sistoskopi-onam": {
    icerik: `SİSTOSKOPİ / ÜRETEROSKOPİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan sistoskopi / üreterorenoskopi işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sistoskopi, esnek veya rijid sistoskop adı verilen ince kameralı alet yardımıyla üretradan girilmesi suretiyle mesane iç yüzeyi ve üretranın görüntülenmesi işlemidir. Tanısal sistoskopi lokal anestezi ile ayaktan yapılabilir; rijid sistoskopi, biyopsi veya işlem gerektiren vakalarda spinal ya da genel anestezi tercih edilir.

Üreterorenoskopi (URS), mesane ötesinde üretere ve böbreğe kadar ilerlenerek üreter veya böbrek taşını holmiyum lazerle kırma, biyopsi alma ya da stent yerleştirme amacıyla yapılır; genel veya spinal anestezi gerektirir, 30-90 dakika sürer. İşlem öncesinde idrar kültürü ve pıhtılaşma testleri değerlendirilir; aktif enfeksiyon varlığında işlem ertelenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Dizüri ve pollaküri: İşlem sonrası yanma hissi ve sık idrara çıkma 1-3 gün sürebilir; bol sıvı alımıyla hafifler.
• Hematüri: İdrarda pembeden kırmızıya değişen renk beklenen bir bulgudur; genellikle 24-48 saatte düzelir.
• İdrar yolu enfeksiyonu: Özellikle URS sonrasında görülebilir; ateş, titreme ve karın ağrısıyla kendini gösterir; profilaktik antibiyotik uygulanır.
• Üreter spazmı ve kolik: Stent takılan olgularda belirgin; analjezikler ve spazmolitiklerle kontrol edilir.
• Üretral yaralanma (nadir): Rijid aletlerin geçişinde mikro yırtık oluşabilir; çoğu tedavisiz iyileşir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Üretral darlık (strictür): Tekrarlayan instrumentasyon veya yaralanma sonrası üretra daralabilir; üretral dilatasyon veya cerrahi onarım gerektirebilir.
• Üreteral darlık (URS sonrası): Lazer hasarı veya skar dokusu ile üreter daralabilir; geç dönemde takip sağlanır, gerekirse stent değişimi yapılır.
• Vezikoüreteral reflü: Nadir, özellikle üreter orifisine yakın girişimlerde değerlendirilir.
• Taş nüksü: URS ile taş kırma sonrasında metabolik değerlendirme yapılmaz ise taş tekrarlama riski yüksektir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• BT sistoskopi: Bilgisayarlı tomografi ile mesane değerlendirmesi yapılabilir; ancak biyopsi alınamaz.
• Sanal sistoskopi (BTÜS): Küçük lezyonların tespitinde destekleyici, invazif değil; şüpheli lezyonlarda sistoskopi hâlâ altın standarttır.
• ESWL (üreter/böbrek taşları için): Küçük ve uygun konumlu taşlarda şok dalgası tedavisi non-invazif alternatif oluşturur.
• Konservatif bekleyici yaklaşım: Küçük taşlarda ve bazı mesane lezyonlarında hekimin değerlendirmesiyle izlem tercih edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası günde en az 2 litre sıvı alınız; idrara yanma ve pembe renk beklenir, 48 saat içinde düzelmiyorsa hekiminizi arayınız.
• Stent takıldıysa, stentin çıkarılacağı tarihi öğreniniz; stent yerinde unutulmamalıdır.
• 38°C üzeri ateş, şiddetli bel ağrısı veya idrar yapamama durumunda acile başvurunuz.
• Kontrol sistoskopi tarihleri takip edilmeli; mesane tümörü tedavisi sonrası protokol izlenmelidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Planlanan işlem, uygulama yöntemi ve olası komplikasyonlar hakkında bilgi aldım.
☐ Erken/geç dönem riskler, üretral ve üreteral yaralanma olasılığı bana anlatıldı.
☐ Alternatif tanı ve tedavi yöntemleri değerlendirildi.
☐ Sorularım yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Sistoskopi / Üreterorenoskopi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "sunnet-onam": {
    icerik: `SÜNNET (SİRKÜMSİZYON) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız / Sayın Ebeveyn,

Planlanan sünnet işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. 18 yaş altı hastalar için bu form veli veya yasal vasi tarafından imzalanmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sünnet (sirkümsiziyon), glans penisin üzerini örten prepüsyum (sünnetsiz deri) dokusunun cerrahi olarak çıkarılması işlemidir. Çocuklarda genel anestezi altında 20-30 dakika sürer; erişkinlerde lokal anestezi ile ayaktan yapılabilir. Konvansiyonel skalpel tekniği, klamp yöntemi veya çeşitli cerrahi teknikler uygulanabilir. Kanamanın durdurulması amacıyla absorblanabilir sütür kullanılır.

Tıbbi endikasyonlar: □ Fimozis (prepüsyumun daralması)  □ Tekrarlayan balanitis/positis  □ Parafimozis
Diğer: □ Dini/kültürel tercih  □ Ebeveyn / hasta talebi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kanama: Yara yerinden sızıntı beklenen bir durumdur; tampon baskısıyla kontrol edilir. Aktif kanama devam ederse hekime başvurulmalıdır.
• Ödem ve morarma: Cerrahi sonrası 2-4 gün sürebilir; soğuk kompres ile hafifletilebilir.
• Enfeksiyon: Yara yerinde kızarıklık, akıntı veya ateş gelişirse antibiyotik tedavisi başlanır; hijyen kurallarına uyum önemlidir.
• Ağrı ve rahatsızlık: Özellikle çocuklarda işlem sonrası saatler boyunca ağlama görülür; reçete edilen analjezik verilmelidir.
• İdrar retansiyonu: Ödem nedeniyle ilk 12-24 saatte idrar yapmada güçlük yaşanabilir; çoğu kendiliğinden düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Meatüs darlığı (meatal stenoz): Özellikle çok erken yaştaki sünnetlerde üretra ağzının daralması görülebilir; idrar akım güçlüğüne neden olur, dilatasyon veya meatotomi gerektirir.
• Kozmetik memnuniyetsizlik: Cilt fazlalığı, asimetri veya yetersiz deri çıkarımı nedeniyle revizyon cerrahisi istenebilir.
• Skar dokusu: Hypertrofik skar veya frenulum bölgesinde gerginlik gelişebilir; tedavisiz iyileşebilir ya da düzeltici müdahale gerektirir.
• Hassasiyet değişikliği: Glans hassasiyetinde geçici artış veya uzun vadede değişim görülebilir; kalıcı cinsel işlev bozukluğu son derece nadirdir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Topikal kortikosteroid kremi: Hafif fimozis vakalarında 4-8 haftalık steroid kremi uygulaması prepüsyumu gevşetebilir; özellikle çocuklarda ilk tercih olabilir.
• Prepüsyoplasti: Prepüsyumu koruyarak genişletme ameliyatı; dini/kültürel açıdan sünnet istemeyenlere uygulanabilir.
• İzlem: Semptom vermeyen fimoziste erken yaşlarda bekleyici yaklaşım tercih edilebilir; çocukluk döneminde prepüsyum fizyolojik olarak geç açılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İYİLEŞME SÜRECİ VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sütürler 7-10 günde kendiliğinden eriyerek dökülür.
• İlk 48 saatte suya temas sınırlandırılmalıdır; sonrasında günlük lif veya tentürdiyot ile pansuman uygulanır.
• Gevşek pamuklu iç çamaşır tercih edilmeli; sıkı giysi ile sürtünme önlenmelidir.
• İlk 3-4 hafta ağır spor ve bisiklet kullanımından kaçınılmalıdır.
• Tam iyileşme 2-4 haftada tamamlanır; erişkinlerde cinsel aktiviteye 4-6 hafta sonra dönülür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA / VELİ BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Sünnet işlemi ve anestezi yöntemi hakkında hekimimden ayrıntılı bilgi aldım/aldık.
☐ Erken ve geç dönem komplikasyonlar bana/bize açıklandı; alternatif tedaviler değerlendirildi.
☐ Sorularım/sorularımız yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Sünnet işlemine ONAY VERİYORUM.

HASTA / ÇOCUĞUN BİLGİLERİ
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Doğum Tarihi     : .......................................

VELİ / VASİ (18 yaş altı için zorunlu)
Adı Soyadı       : .......................................    Tarih / İmza: .......................................
T.C. Kimlik No   : .......................................
Yakınlık Derecesi: .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "vazektomi-onam": {
    icerik: `VAZEKTOMİ (KALİCİ STERİLİZASYON) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

ÖNEMLİ: Vazektomi kalıcı bir kısırlaştırma yöntemi olarak kabul edilmelidir. Cerrahi geri döndürme (vazo-vazostomi) her zaman teknik olarak mümkün olmayabilir veya başarısız kalabilir. Bu formu imzalamadan önce tüm bölümleri dikkatlice okuyunuz; 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilme zorunludur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Vazektomi; her iki vas deferens kanalının skrotal insizyonla veya kesisiz (no-scalpel) teknikle bulunarak bağlanması, kesilmesi veya kauterize edilmesi yoluyla sperm iletiminin kalıcı olarak engellenmesi işlemidir. Lokal anestezi altında poliklinik/ameliyathane şartlarında 15-30 dakikada tamamlanır; kesi küçüktür ve genellikle tek sütür gerektirmez.

İşlem cinsel istek, ereksiyon, orgazm ve ejakülat hacmini etkilemez; sadece ejakülatta sperm olmaz. Hormonal işlev (testosteron üretimi) tamamen korunur. İşlem sonrası en az 3 ay veya 20 ejakülasyon boyunca ek korunma yöntemi kullanılmalıdır; kontrol spermogramı zorunludur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Hematom: Skrotumda kan birikmesi %1-2 oranında görülür; küçük hematomlar kendiliğinden çözülür, büyük hematomlar drenaj gerektirebilir.
• Yara yeri enfeksiyonu: Kızarıklık, akıntı veya ateş gelişirse antibiyotik tedavisi uygulanır; nadir olup hijyen önlemleriyle önlenebilir.
• Ağrı ve şişlik: İlk birkaç gün devam edebilir; soğuk uygulama ve analjeziklerle kontrol edilir.
• Epididimit: Epididimde inflamasyon tablosu antibiyotik ve antiinflamatuvar ile tedavi edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sperm granülomu: Sızdıran sperme karşı bağışıklık tepkisi sonucu küçük nodül oluşabilir; çoğu kendiliğinden geriler, nadiren cerrahi çıkarım gerekir.
• Kronik skrotal ağrı sendromu: Yaklaşık %1-2 hastada uzun süreli kronik ağrı gelişebilir; tedavisi güçtür; epididimektomi nadiren gerekir.
• Spontan rekanalizasyon: Her iki ucun kendiliğinden birleşerek sperm geçişinin yeniden başlaması <%1 ihtimalle görülür; bu nedenle kontrol spermogramı zorunludur.
• Kalıcı kısırlık: İstenilen ve beklenen sonuçtur; ancak ileride ebeveynlik planı değişen hastalarda vazo-vazostomi başarı garantisi vermemektedir (başarı oranı zamanla azalır).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER / YÖNTEMLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Prezervatif: Uzun vadeli kullanım gerektiren geri dönüşümlü yöntem; kısırlık sağlamaz.
• Hormonlu kontraseptif yöntemler (eşe): Hap, spiral, implant veya enjeksiyon gibi geri dönüşümlü seçenekler eşin tercihine bağlıdır.
• Tüp ligasyonu (eşin sterilizasyonu): Laparoskopik veya histeroskopik bağlama; cerrahi risk kadında daha yüksektir.
• Sperm dondurma: Kalıcı karar verilmeden önce sperm bankasına örnek depolanması, ilerleyen dönemdeki olasılıklar için bir güvence sağlar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem günü istirahat; ertesi gün hafif günlük aktiviteye dönülebilir.
• 48 saat destek iç çamaşırı ve soğuk kompres önerilir.
• 1 hafta ağır egzersiz ve seksüel aktiviteden kaçınılmalıdır.
• İşlem sonrası 3. ayda veya 20. ejakülasyonda spermogram yaptırılması zorunludur; sonuç sıfır değilse ek değerlendirme yapılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Vazektominin kalıcı kısırlığa yol açtığını ve geri döndürme işleminin garanti olmadığını anlıyorum.
☐ Erken ve geç komplikasyonlar, sperm granülomu ve kronik ağrı riski bana anlatıldı.
☐ Alternatif kontrasepsiyon yöntemleri değerlendirildi; bu kararı özgür irademle veriyorum.
☐ İşlem öncesi sperm bankasına örnek depolama seçeneğim olduğunu biliyorum.
☐ Sorularım yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Vazektomi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // KADIN HASTALIKLARI & DOĞUM — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "dogum-sezaryen-onam": {
    icerik: `NORMAL / SEZARYEN DOĞUM AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Doğum süreciniz ve planlanan uygulama hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

Planlanan doğum şekli: □ Vajinal (Normal) Doğum   □ Elektif Sezaryen   □ Acil Sezaryen
Gebelik haftası: .........    Tahmini doğum tarihi: .........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VAJİNAL DOĞUM: Eylem (doğum sancıları) başladığında servikal dilatasyon ve silinme izlenerek bebeğin vaginal kanaldan doğumu sağlanır. Gerektiğinde epizyotomi (perine insizyonu) yapılabilir. Uzamış eylem veya fetal distres durumunda vakum/forseps uygulanabilir ya da acil sezaryene geçiş yapılabilir.

SEZARYEN: Alt kesim (Pfannenstiel) insizyonuyla karın duvarından ve uterustan geçilerek bebeğin çıkarıldığı cerrahi bir işlemdir. Tercih edilen anestezi yöntemi spinal (omurga anestezisi); gerektiğinde genel anestezi uygulanır. Ameliyat 45-90 dakika sürer. Plasenta çıkarıldıktan sonra uterus ve karın duvarı katmanlar halinde kapatılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kanama (atoni uteri): Doğum sonrası uterus kasılma bozukluğu en sık kanama nedenidir; oksitosin ve uterotonik ilaçlarla kontrol altına alınır; nadiren kan transfüzyonu gerekir.
• Spinal anestezi komplikasyonları: Hipotansiyon (%20-30), baş ağrısı (post-spinal); damar yolu ile IV sıvı verilir, baş ağrısı için yatay pozisyon ve bol sıvı önerilir.
• Mesane/bağırsak yaralanması (sezaryen): Özellikle adezyonlu gebeliklerde nadir görülür; peroperatif olarak onarılır.
• Yara komplikasyonları: Yara yeri enfeksiyonu, hematom veya seroöm oluşumu ilk haftada görülebilir; antibiyotik ve yara bakımıyla tedavi edilir.
• Bebekte geçici takipne: Sezaryen ile doğan bebeklerde solunum adaptasyonu gecikebilir; geçici oksijen desteği yeterlidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar / Sonraki Gebelikler)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Derin ven trombozu / pulmoner emboli: Gebelik ve sezaryen tromboembolik riski artırır; erken mobilizasyon ve gerekirse heparin tedavisi uygulanır.
• Adezyonlar (yapışıklık): Sezaryen sonrasında karın içi yapışıklıklar sonraki operasyonlarda güçlük çıkarabilir.
• Plasenta previa / akreta: Her sezaryen, bir sonraki gebelikte anormal plasenta yerleşim riskini artırır; bu durum hayati tehlike taşıyan kanamaya yol açabilir.
• Uterus skar dehisansı/rüptürü: Önceki sezaryen sikatrisi bir sonraki gebelik veya vajinal doğum denemesinde açılabilir; planlama gerektiren bir durumdur.
• Pelvik taban hasarı (vajinal doğum): Perineal yırtıklar, sfinktere uzanan laserasyonlar uzun vadede inkontinansa yol açabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF DOĞUM SEÇENEKLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Vajinal doğum: Endikasyon yok ise ve anne/bebek sağlığı uygunsa tercih edilen yöntemdir; iyileşme daha hızlıdır.
• Suda doğum / doğum pozisyon tercihi: Kliniğin olanakları dahilinde farklı pozisyon ve ortam seçenekleri değerlendirilebilir.
• Epidural/spinal analjezi ile ağrısız doğum: Vajinal doğum sürecinde anestezi desteği ile konfor artırılabilir.
• Sezaryen sonrası vajinal doğum (VBAC): Önceki sezaryen olan hastalarda uygun koşullarda vajinal doğum denenmesi bir seçenek olabilir; riskler ayrıca değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOĞUM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Doğum sonrası kanama miktarı, rahim kontraksiyonu ve vital bulgular yakından izlenir.
• Sezaryen sonrası kateter 12-24 saat sonra çıkarılır; erken mobilizasyon (ilk 6-12 saat) tromboz riskini azaltır.
• Emzirme ilk saatte başlatılır; laktasyon desteği ve göğüs bakımı sağlanır.
• Yara bakımı: Sezaryen insizyonu 2. günden itibaren kuru tutulur; banyoya 5-7 gün sonra izin verilir.
• Kontrol: 6. haftada jinekolojik muayene; insizyonun değerlendirilmesi ve aile planlaması danışmanlığı yapılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Doğum şeklim, anestezi ve olası komplikasyonlar hakkında hekimimden ayrıntılı bilgi aldım.
☐ Normal doğum ve sezaryenin erken/geç dönem riskleri bana ayrı ayrı anlatıldı.
☐ Sonraki gebeliklerde sezaryen sikatrisi ve plasenta komplikasyonları hakkında bilgilendirildim.
☐ Sorularım yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Planlanan doğum şekline ve gerektiğinde uygulanacak anesteziye ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "laparoskopi-jinekoloji": {
    icerik: `JİNEKOLOJİK LAPAROSKOPİ / HİSTEROSKOPİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan jinekolojik girişim hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

Planlanan işlem: □ Diagnostik laparoskopi  □ Operatif laparoskopi  □ Diagnostik histeroskopi  □ Operatif histeroskopi
Endikasyon: □ Endometriozis  □ Over kisti  □ Miyom  □ Polipi  □ Tüp bağlama  □ İnfertilite araştırması  □ Diğer: .........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAPAROSKOPİ: Göbek altından 5-12 mm'lik port kesisinden karın boşluğuna CO₂ gazı verilerek çalışma alanı oluşturulur; kamera ve cerrahi aletler ekstra port kesilerinden girilir. Genel anestezi altında 30-120 dakika sürer. Endometriozis ablasyonu, over kistektomisi, miyomektomi, salpenjektomi/ooferektomi veya tüp bağlama bu yolla yapılabilir.

HİSTEROSKOPİ: Vajinal yoldan rahim boşluğuna ince kamera ile girilerek polip çıkarma, miyom rezeksiyonu, endometriyal biyopsi, rahim içi yapışıklık (Asherman) tedavisi yapılabilir. Distansiyon ortamı olarak SF veya sorbitol/manitol solüsyonu kullanılır. Genel veya lokal anestezi altında 15-60 dakika sürer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İç organ yaralanması (Laparoskopi): Bağırsak, mesane veya büyük damar yaralanması <%1 ihtimalle görülür; fark edilirse peroperatif onarım yapılır ya da laparotomiye geçilir.
• Hemodinamik bozuluk (Histeroskopi): Distansiyon sıvısının aşırı emilimi (TUR sendromu benzeri) sodyum düşmesine ve kardiyak komplikasyona yol açabilir; sıvı dengesi yakından izlenir.
• Kanama: Her iki prosedürde de kanama görülebilir; elektrokoagülasyon veya sütür hemostazıyla kontrol edilir, transfüzyon nadiren gerekir.
• CO₂ kaynaklı omuz ağrısı: Laparoskopi sonrası diyafram altında kalan gaz frenik siniri irritasyonu yoluyla omuzda ağrıya neden olur; birkaç günde kendiliğinden geçer.
• Enfeksiyon: Port yerinde veya rahim boşluğunda enfeksiyon; antibiyotikle tedavi edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Port yeri fıtığı (Laparoskopi): 10-12 mm'lik port bölgelerinde insizyonel herni oluşabilir; şişlik ve ağrı ile kendini gösterir, cerrahi onarım gerektirebilir.
• Adezyonlar (yapışıklık): Endometriozis cerrahisi veya kanamalar sonrası oluşan yapışıklıklar infertilite ve kronik ağrıya zemin hazırlayabilir.
• Endometriozis nüksü: Hastalık tedaviden yıllar sonra tekrarlayabilir; izlem ve gerektiğinde tıbbi/cerrahi tekrar tedavisi planlanır.
• Asherman sendromu nüksü (Histeroskopi): Rahim içi yapışıklık onarımı sonrasında yapışıklıklar tekrarlayabilir; kontrol histeroskopi gerekebilir.
• Overlerin veya tüplerin uzaklaştırılması: Endikasyon dahilinde salpenjektomi/ooferektomi uygulandıysa hormonal etkileri ve fertilite kaybı kalıcıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Medikal tedavi: Endometrioziste GnRH analogları, progestinler veya kombine hormonal kontraseptifler semptomları kontrol edebilir; ancak yapısal patolojiyi gidermez.
• Açık cerrahi (laparotomi): Laparoskopinin başarısız olduğu ya da kontraendike olduğu durumlarda tercih edilir; iyileşme süreci daha uzundur.
• Görüntüleme ile izlem: Küçük over kistleri veya miyomlar için operasyon yerine USG ile düzenli takip bir seçenek olabilir.
• Embolizasyon (miyomlar için): Uterus myom embolizasyonu (UAE) cerrahi gerektirmeksizin miyomları küçültebilir; doğurganlık üzerine etkileri tartışmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Laparoskopide aynı gün ya da 1 gece yatış; erken mobilizasyon tromboz riskini azaltır.
• Port kesilerinde su temasından 48 saat kaçınılmalıdır; sütürler 7-10 günde çıkarılır.
• İlk hafta ağır egzersiz ve cinsel aktiviteden kaçınılmalıdır.
• Histeroskopi sonrası hafif kanamalı akıntı 3-5 gün sürebilir; normal kabul edilir.
• 38°C üzeri ateş, şiddetli karın ağrısı veya ağır kanama durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Planlanan işlem, anestezi yöntemi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Erken/geç dönem riskler, organ yaralanması ve yapışıklık olasılığı bana anlatıldı.
☐ Alternatif tedaviler değerlendirildi; sorularım yanıtlandı.
☐ Ameliyat sırasında planın genişletilebileceğini (ek girişim/laparotomiye geçiş) kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Planlanan Laparoskopi / Histeroskopi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "kuretaj-onam": {
    icerik: `KÜRETAJ / RAHİM TAHLİYESİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan küretaj (dilatasyon ve küretaj - D&C) işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

Endikasyon:
□ Tamamlanmamış / devam eden düşük artığı    □ İstemli gebelik sonlandırma (yasal süre ve koşullar dahilinde)
□ Anormal rahim kanaması — endometriyal biyopsi    □ Molar gebelik    □ Rahim içi polip / miyom rezeksiyonu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Küretaj, servikal dilatasyon (boyun açımı) ardından rahim içi dokunun küret adlı alet ya da vakum aspiratörü ile temizlenmesi işlemidir. Lokal, sedasyon veya genel anestezi altında gerçekleştirilen işlem 15-30 dakika sürer. Histeroskop eşliğinde görüntülemeli (histeroskopik küretaj) daha hassas doku temizliği sağlanabilir.

İstemli gebelik sonlandırma T.C. hukukunda Nüfus Planlaması Hakkında Kanun çerçevesinde belirli gebelik haftası ve koşullarıyla sınırlıdır; önceden sağlık personeli tarafından gerekli bilgilendirme ve yasal bekleme süresi tamamlanmıştır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kanama: İşlem sonrası vajinal kanama 1-2 hafta sürebilir; adet miktarından fazla veya pıhtılı kanama durumunda derhal başvurunuz.
• Uterus perforasyonu: <%1 ihtimalle servikal dilatasyon veya küretaj sırasında rahim duvarı delinebilir; çoğu gözlemle iyileşir, nadir olgularda laparoskopi ile kontrol sağlanır.
• Servikal yaralanma: Dilatasyon sırasında boyun dokusunda yırtık oluşabilir; sütür ile onarılır.
• Enfeksiyon (endometrit): Ateş, karın ağrısı ve kötü kokulu akıntı ile kendini gösterir; antibiyotikle tedavi edilir. Profilaktik antibiyotik uygulanabilir.
• Ağrı ve krampler: İşlem sonrası dönemde adet ağrısı benzeri kramplar beklenen bir bulgudur; NSAİD ile kontrol edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Asherman sendromu (intrauterin yapışıklık): Tekrarlayan veya agresif küretajlar sonucunda endometriyal hasar rahim içinde yapışıklığa yol açar; adet düzensizliği, ağrı veya infertiliteyle kendini gösterir. Histeroskopik lizis ile tedavi edilir.
• Adet düzensizliği: İlk adet döngüsü 4-8 hafta içinde normalleşir; bu süre uzarsa hormonal değerlendirme yapılır.
• İnfertilite: Yoğun Asherman sendromunda gebelik oranları düşebilir; fertilite danışmanlığı önerilir.
• Yetersiz tahliye: Artık doku kalması, ağrı ve enfeksiyona yol açabilir; kontrol ultrason ile tespit edilir ve ek işlem gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Medikal tahliye: Misoprostol veya mifepristone+misoprostol kombinasyonu ile farmakolojik tahliye; cerrahi risk taşımaz ancak tamamlanma oranı daha düşük ve kanama süresi uzundur.
• Bekleyici yaklaşım: Tamamlanmamış düşüklerde kendiliğinden tahliye için birkaç hafta bekleme tercih edilebilir; enfeksiyon riski gözetilerek izlenir.
• Histeroskopik polip/miyom rezeksiyonu: Küretaj yerine görüntü eşliğinde daha hassas ve hedefli doku çıkarımı yapılabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası en az 2-4 saat gözlemde kalınır; sedasyon uygulandıysa araç kullanılmamalıdır.
• 1-2 hafta ped kullanınız; tampon veya vajinal duş kullanmayınız.
• Cinsel ilişkiden ve ağır egzersizden 2 hafta kaçınınız.
• Ateş, şiddetli karın ağrısı, ağır kanama veya kötü kokulu akıntı durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Küretaj işlemi, anestezi yöntemi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Asherman sendromu riski ve uterus perforasyonu olasılığı bana anlatıldı.
☐ Alternatif tedaviler (medikal tahliye, bekleyici yaklaşım) değerlendirildi.
☐ Sorularım yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Küretaj işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "ria-onam": {
    icerik: `RİA (RAHİM İÇİ ARAÇ) UYGULAMA AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Rahim içi araç (RİA) uygulaması hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RİA (Rahim İçi Araç / İntrauterin Kontraseptif Cihaz - IUCD); rahim içine yerleştirilerek çalışan, uzun etkili geri dönüşümlü bir kontrasepsiyon yöntemidir. İki ana tipi mevcuttur:

Bakırlı RİA: 5-10 yıla kadar etkili; hormonsuz çalışır, adet düzeni değişmez, ilk aylarda adet ağrısı ve miktarı artabilir. Ektopik gebeliğe karşı da koruyucudur.

Hormonlu RİA (LNG-IUS): Günlük düşük doz levonorgestrel salgılar; 3-8 yıl etkili (tipe göre). Adet miktarını belirgin azaltır, çoğu hastada adet kesilir. Endometriozis ve adenomiozis ağrısında terapötik etki gösterir.

Uygulama sırasında serviks dilatasyon gerekebilir; işlem 5-15 dakika sürer, lokal anestezi veya ağrı kesici verilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Ay)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Takma sırasında kramp ve ağrı: Servikal dilatasyon sırasında yoğun kramp yaşanabilir; NSAİD ile hafifletilir.
• Vasovagal reaksiyon: Baş dönmesi, bulantı ve senkop yatkınlığı olan hastalarda görülebilir; uzanarak ve izlemle yönetilir.
• Hafif kanama / lekelenme: İlk birkaç gün normaldir; ağır kanama değerlendirilmeli.
• Uterus perforasyonu: Uygulamanın en ciddi komplikasyonu olup 1/1000'den az sıklıkta görülür; hızlı başvuru gerektiren karın ağrısı ile kendini gösterir; laparoskopik veya açık çıkarım gerekebilir.
• Erken atılma (ekspülsiyon): İlk 3 ayda %2-10 oranında olabilir; RİA ipliklerinin hissedilmemesi durumunda kontrol USG gerekir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Aylar / Yıllar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Pelvik inflamatuvar hastalık (PİH): Cinsel yolla bulaşan enfeksiyon varlığında risk artar; ateş, aşağı karın ağrısı ve akıntı ile kendini gösterir; antibiyotik tedavisi gerekir, ağır vakalarda RİA çıkarılır.
• Ektopik gebelik riski: RİA rahim içi gebeliği önlese de gebelik oluşursa ektopik yerleşim ihtimali artmıştır; adet gecikmesinde acil değerlendirme yapılmalıdır.
• Adet düzensizlikleri: Bakırlı RİA'da uzun vadeli ağır adetler anemi yapabilir; hormonlu RİA'da ise adet tam kesilmesi yaşanabilir.
• Yer değiştirme / gömülme: Nadiren RİA rahim duvarına gömülebilir; çıkarım için histeroskopi gerektirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kombine oral kontraseptif (KOK): Günlük hap; geri dönüşümlü, hormonal yan etkileri olabilir.
• Progestin implantı (Kol Çubuğu): Kol altına yerleştirilen 3 yıllık kontraseptif implant; yüksek etkinlik, hormonal.
• Enjektabl kontraseptif: 3 aylık progestin enjeksiyonu; kısırlık uzun süre devam edebilir, kemik yoğunluğunu etkileyebilir.
• Bariyer yöntemler: Prezervatif veya diyafram; cinsel yolla bulaşan enfeksiyonlara karşı da koruma sağlar, düzenli kullanım gerektirir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası ilk 4-6 haftada kontrol USG ile RİA konumu doğrulanır.
• İpliklerini aylık olarak kontrol etmeyi öğreniniz; iplikleri hissedemezseniz hekiminize başvurunuz.
• Yoğun ağrı, şiddetli kanama veya ateş durumunda acilen başvurunuz.
• Kullanım süresinin sonunda (tipe göre 3-10 yıl) çıkarım veya yenileme planlanmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ RİA türleri, etkinlik ve uygulama yöntemi hakkında hekimimden bilgi aldım.
☐ Erken/geç dönem riskler, perforasyon ve PİH olasılığı bana anlatıldı.
☐ Alternatif kontrasepsiyon yöntemleri değerlendirildi.
☐ Sorularım yanıtlandı; onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ RİA uygulamasına ONAY VERİYORUM.

Tercih edilen RİA tipi: □ Bakırlı  □ Hormonlu (LNG-IUS)

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "kolposkopi-onam": {
    icerik: `KOLPOSKOPİ VE SERVİKAL BİYOPSİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan kolposkopi ve/veya biyopsi işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kolposkopi; anormal Pap smear veya yüksek riskli HPV pozitifliği sonrası serviksin (rahim ağzı) kolposkop aracılığıyla büyütülerek değerlendirilmesi işlemidir. Ayaktan, anestezi gerektirmeksizin yapılır; servikse asetik asit (%3-5) ve ardından Lugol solüsyonu uygulanarak anormal alanlar görünür hale getirilir. Anormal doku saptanırsa 1-3 mm punch biyopsi alınır; endoservikal kanal değerlendirmesi için endoservikal küretaj (ECC) eklenebilir. İşlem 10-20 dakika sürer.

Biyopsi sonucu 1-2 haftada patoloji raporu olarak hazırlanır; CIN (servikal intraepitelyal neoplazi) derecelendirmesine göre ek tedavi kararı verilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İşlem Sonrası 1-7 Gün)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Vazovagal reaksiyon: Servikse dokunma veya biyopsi sırasında baş dönmesi, terleme ve senkop görülebilir; uzanma pozisyonu ve soğuk uygulama ile düzelir.
• Biyopsi bölgesinde kanama: Genellikle hafiftir; Monsel solüsyonu veya tampon uygulamasıyla durdurulur. Koyu kırmızı kanama gecikmeli de olabilir.
• Hafif kramp ve ağrı: İşlem sırasında ve sonrasında birkaç saat devam edebilir; NSAİD ile kontrol edilir.
• Kahverengi/koyu akıntı: Monsel solüsyonuna bağlı olup 3-5 gün sürebilir; normaldir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR / SONRASI SÜREÇ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Enfeksiyon (endoservisit): Nadir görülür; ateş, kötü kokulu akıntı ile kendini gösterir; antibiyotikle tedavi edilir.
• Ek tedavi gerekliliği: CIN 2/3 veya şüpheli malignite saptanırsa LEEP (elektrik döngüsüyle eksizyon), konizasyon veya trakelectomy gibi ek işlemler gerekebilir.
• Servikal yetmezlik (sonraki tedavilerde): Tekrarlayan konizasyon veya LEEP uygulamaları serviksi zayıflatabilir; bu durum gebelikte preterm doğum riskini artırabilir.
• Yanlış negatif biyopsi: Biyopsi örneklemenin yetersizliği nedeniyle patoloji atlanabilir; klinik şüphe devam ederse tekrar kolposkopi planlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Tekrarlayan Pap smear ile izlem: Düşük riskli anormal smear bulgularında kolposkopi yerine 6-12 ay aralıklarla tekrarlayan sitoloji tercih edilebilir.
• HPV aşılama: Yüksek riskli HPV tiplerini kapsayan aşılar gelecekteki enfeksiyonları önler; mevcut patolojiyi gidermez ancak yineleme riskini azaltabilir.
• LEEP/Konizasyon: Biyopsi yerine doğrudan anormal alanın eksizyonu; tanısal ve terapötik işlevi bir arada sunar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlemden sonra 48 saat tampon kullanmayınız; cinsel ilişkiden ve yüzmeden 1 hafta kaçınınız.
• Biyopsi sonucu 1-2 hafta içinde değerlendirilecek; takip randevunuzu kaçırmayınız.
• Ağır kanama, şiddetli ağrı veya ateş durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Kolposkopi ve servikal biyopsi işlemi hakkında hekimimden bilgi aldım.
☐ Komplikasyonlar, ek tedavi olasılığı ve servikal yetmezlik riski anlatıldı.
☐ Alternatif seçenekler (izlem, LEEP) değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Kolposkopi ve Biyopsi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // GENEL CERRAHİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kolesistektomi-onam": {
    icerik: `KOLESİSTEKTOMİ (SAFRA KESESİ AMELİYATI) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan kolesistektomi ameliyatı hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kolesistektomi, safra kesesi taşları (kolelitiazis), akut veya kronik kolesistit ya da polip nedeniyle safra kesesinin cerrahi olarak çıkarılması işlemidir. Tercih edilen yöntem laparoskopik kolesistektomidir: göbek ve sağ üst kadranda 3-4 adet 5-12 mm'lik port kesisinden girilir, safra kesesi klipsle kapatılarak koparılır ve ağızlıktan çıkarılır. Genel anestezi altında 45-90 dakika sürer.

Laparoskopik tekniğin anatomik görünüm yetersizliği, ciddi yapışıklık veya kanama nedeniyle yetersiz kalması durumunda açık ameliyata geçiş yapılabilir (%3-5). Kolesistektomi öncesinde ERCP veya intraoperatif kolanjiografi ile safra kanalı taşı araştırması gerekebilir. Ameliyat öncesi kan testleri, karın ultrasonografisi ve gerektiğinde MRCP tamamlanmış olmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Safra sızıntısı: Safra kanalı veya kesecik artığından kaçak; karın içi safra birikimiyle ateş ve sağ üst kadran ağrısına neden olur. ERCP veya perkütan drenaj gerektirebilir.
• Kanama: Port kesi veya karaciğer yatağından kanama; ciddi olgularda transfüzyon ya da reoperasyon gerekebilir.
• Enfeksiyon: Yara yeri veya karın içi (subhepatik apse); antibiyotik veya drenajla tedavi edilir.
• CO₂ kaynaklı omuz / sağ klavikula ağrısı: Karın içinde kalan gaz 1-3 günde kendiliğinden düzelir.
• Açık ameliyata geçiş: Beklenmedik anatomik varyasyon veya güvenli diseksiyon sağlanamadığında alınan intraoperatif kararla laparotomiye geçilir; iyileşme süresi uzar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Safra yolu yaralanması: En ciddi ve potansiyel olarak kalıcı komplikasyondur; %0,3-0,5 oranında görülür. Safra kanalının kesilmesi veya klip kayması sarılık ve şiddetli ağrıya neden olur; hepatikojejunostomi gibi cerrahi rekonstrüksiyon ya da ERCP ile stentleme gerekebilir.
• Rezidü taş (koledokolitiazis): Safra kanalında kalan taş obstrüktif sarılık ve kolanjite yol açabilir; ERCP ile çıkarılır.
• Post-kolesistektomi sendromu: Ameliyat sonrasında devam eden sağ üst kadran ağrısı, şişkinlik; çoğu vakada birkaç haftada düzelir.
• Port yeri fıtığı: 10-12 mm kesi yerlerinden ileri dönemde fıtık oluşabilir; cerrahi onarım gerektirebilir.
• Adezyonlar: İleus veya bağırsak tıkanması yaratabilir; nadir ancak uzun vadede risk mevcuttur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Medikal tedavi ve diyet: Yağlı gıdalardan kaçınarak semptom kontrolü mümkün olsa da taşlar eriyemez; kolesistit ve komplikasyon riski devam eder.
• Ursodeoksikolik asit (UDCA): Küçük kolesterol taşlarını kısmen eritebilir; uzun süreli kullanım gerektirir, etkinliği sınırlıdır ve taşlar ilaç bırakınca geri döner.
• ESWL (şok dalgası): Bazı merkezlerde safra taşı kırmada kullanılır; safra kesesi bırakıldığı için nüks riski yüksektir, etkinliği cerrahi kadar değildir.
• Bekleme politikası: Asemptomatik taşlarda cerrahi ertelenebilir; ancak akut kolesistit veya komplikasyon gelişme riski taşır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Laparoskopik kolesistektomi genellikle aynı gün ya da 1 gece yatış gerektirir.
• İlk 2 hafta ağır kaldırma ve sert egzersizden kaçınınız; hafif yürüyüş günden itibaren başlanabilir.
• Sarılık, yüksek ateş, sağ üst kadranda şiddetli ağrı durumunda acile başvurunuz.
• Yağlı gıdaları ilk aylarda kademeli olarak diyete ekleyiniz; safra kesesi olmadan yağ sindirimi zamanla normalleşir.
• Kontrol muayenesi: 2-4. haftada cerrahi kliniği randevusu alınız.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Kolesistektomi ameliyatı, anestezi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Safra yolu yaralanması ve safra sızıntısı riski dahil erken/geç dönem komplikasyonlar anlatıldı.
☐ Alternatif tedaviler (medikal, ESWL) değerlendirildi; sorularım yanıtlandı.
☐ Ameliyat sırasında açık cerrahiye geçiş gerekebileceğini kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Kolesistektomi ameliyatına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "herni-ameliyat-onam": {
    icerik: `FITIK (HERNİ) AMELİYATI AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan fıtık ameliyatı hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

Fıtık tipi: □ İnguinal (kasık)  □ Umbilikal (göbek)  □ İnsizyonel (kesi yeri)  □ Femoral  □ Epigastrik  □ Diğer: .........
Planlanan teknik: □ Açık  □ Laparoskopik (TEP/TAPP)  □ Robotik

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fıtık ameliyatında; fıtık kesesi içindeki bağırsak veya yağ dokusu karın içine geri konulur ve fıtık kapısı (zayıf nokta) kapatılır. Modern yöntemlerde polipropilen veya biyolojik mesh (ağ protezi) gerginlik olmadan onarım sağlar; nüks oranını %1'in altına indirir. Açık teknikte kasık veya karında 4-6 cm'lik kesi yapılır. Laparoskopik teknikte (TEP: tamamen ekstraperitoneal, TAPP: transabdominal) 3 adet 5-12 mm port kesisiyle mesh yerleştirilir; genel anestezi gerektirir, 30-90 dakika sürer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Seroma: Ameliyat bölgesinde sıvı birikmesi sık görülür; çoğu kendiliğinden emilir, büyük seromalar aspire edilir.
• Hematom: Kasık ameliyatlarında skrotum veya labia majora içine kan sızabilir; soğuk uygulama ve basınç ile kontrol edilir.
• Yara enfeksiyonu: Kızarıklık, ateş ve akıntı gelişirse antibiyotik başlanır; mesh varlığı enfeksiyon yönetimini karmaşıklaştırabilir.
• Üriner retansiyon: Özellikle genel anestezi ve yaşlı erkeklerde görülür; geçici kateterizasyon uygulanır.
• Skrotal/inguinal ödem ve ağrı: Birkaç haftaya kadar sürebilir; antiinflamatuvar ve skrotal destek ile yönetilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kronik inguinal nöralji: İlioinguinal, iliohipogastrik veya genitofemoral sinirin yaralanması veya mesh baskısı nedeniyle kasıkta yanma, uyuşma veya kronik ağrı oluşabilir (%1-3); fizyoterapi, sinir blokajı veya nörektomi ile tedavi edilebilir.
• Nüks (fıtık tekrarlaması): Mesh kullanımında <%1; mesh kullanılmayan onarımda daha yüksektir. Aşırı kilo, sigara ve ıkınma nüks riskini artırır.
• Vas deferens / testis komplikasyonu (inguinal hernide): Spermatik kord yaralanması nadir olmakla birlikte testis atrofisi veya infertiliteye yol açabilir.
• Mesh kronik reaksiyon/migrasyon: Polipropilen mesh zamanla büzerek ağrı yaratabilir ya da nadiren komşu organlara migrasyon gösterebilir; mesh çıkarımı gerektirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Bekleyici yaklaşım: Asemptomatik kasık fıtıklarında izlem seçenek olabilir; ancak inkarserasyon riski nedeniyle ameliyat tercih edilmektedir.
• Fıtık bandajı/korsesi: Cerrahi düzeltme sağlamaz; fıtığı geçici olarak tutar, uzun vadeli çözüm değildir.
• Laparoskopik vs. açık seçim: Her iki yöntemde de mesh kullanıldığında etkinlik benzerdir; laparoskopik yöntem bilateral fıtıkta ve aktif hastalarda iyileşme hızı avantajı sağlar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Laparoskopik yöntemde genellikle aynı gün ya da 1 gece yatış; açık ameliyatta 1-2 gün.
• İlk 4-6 hafta ağır kaldırma (>5 kg) ve ıkınmadan kaçınınız; erken hafif yürüyüş önerilir.
• Skrotal şişlik birkaç haftada iner; soğuk kompres ve scrotal destek yardımcı olur.
• Sütürler 7-10 günde çıkarılır; laparoskopik port kesilerinde sütür genellikle absorbe edilir.
• 38°C üzeri ateş, kesi yerinde kızarıklık/akıntı veya artan ağrıda cerrahi kliniğinizi arayınız.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Fıtık ameliyatı, anestezi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Kronik nöralji, mesh komplikasyonları ve nüks riski bana anlatıldı.
☐ Alternatif tedaviler (bekleyici yaklaşım, bant) değerlendirildi; sorularım yanıtlandı.
☐ Ameliyat sırasında planın değişebileceğini kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Fıtık ameliyatına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "apendektomi-onam": {
    icerik: `APENDEKTOMİ (APANDİS AMELİYATI) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Akut apandisit tanısıyla planlanan apendektomi ameliyatı hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Bu cerrahi acil bir durumdur; lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apendektomi; akut apandisit tanısıyla iltihaplanmış apendiksin (kör bağırsak) cerrahi olarak çıkarılması işlemidir. Tercih edilen yöntem laparoskopik apendektomidir: karına 3 adet 5-12 mm port konularak apendiks klip ve elektrokoter yardımıyla ayrılır. Açık teknikte sağ alt kadranda 4-6 cm McBurney veya Rocky-Davis insizyon yapılır. Genel anestezi altında 30-60 dakika sürer. Perforasyon veya apse varlığında ameliyat daha uzun ve karmaşık hale gelir; açık cerrahiye geçiş gerekebilir.

Ameliyat geciktirilmesi halinde apendiks perforasyonu (yırtılma), peritonit ve hayati tehlike oluşabilir; bu nedenle acil değerlendirme yapılmış ve cerrahi kararı alınmıştır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Yara yeri enfeksiyonu: Özellikle perfore veya gangrenli vakalarda yara enfeksiyonu sıklığı artar; antibiyotik ve yara bakımı ile tedavi edilir.
• Karın içi apse (periapendiksel): Perforasyon varlığında karın içinde pürülan sıvı birikmesi görülebilir; ultrason veya BT eşliğinde perkütanöz drenaj ya da reoperasyon gerekebilir.
• Paralitik ileus: Bağırsak hareketleri geçici olarak durabilir; sıvı ve destek tedavisiyle düzelir.
• Kanama: Port yeri veya apendiks kökü kesim hattından kanama nadir olmakla birlikte gelişirse reoperasyon gerekebilir.
• Bulantı, kusma ve ateş: Genel anestezi ve inflamasyon nedeniyle ilk 24-48 saatte görülebilir; semptomatik tedavi uygulanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Yapışıklık (adezyon): Özellikle perfore apandisit sonrasında karın içi yapışıklıklar bağırsak tıkanmasına yol açabilir; ileri dönemde yeniden ameliyat gerektirebilir.
• Port yeri fıtığı: 10-12 mm kesi yerinden insiziyonel herni gelişebilir; cerrahi onarım gerektirebilir.
• Güdük apandisit: Nadiren bırakılan apendiks güdüğünde iltihap tekrarlayabilir; reoperasyon gerekebilir.
• Patoloji sürprizi: Çıkarılan apendikste karsinoid tümör veya diğer patoloji saptanırsa ek tedavi planlanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Antibiyotik tedavisi (konservatif yaklaşım): Komplike olmayan (perfore olmayan) akut apandisitte geniş spektrumlu antibiyotik ile başarılı tedavi bildirilen çalışmalar mevcuttur; ancak %20-35 hastada 1 yıl içinde nüks görülür ve cerrahi gerekir.
• Interval apendektomi: Apse oluşmuş vakalarda önce drenaj ve antibiyotikle enfeksiyonun yatıştırılması, ardından 6-8 hafta sonra elektif cerrahi planlanması tercih edilebilir.
• Laparoskopik vs. açık tercih: Her iki teknikte sonuç benzerdir; laparoskopi enfeksiyon oranını azaltır ve iyileşmeyi hızlandırır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Komplike olmayan vakalarda genellikle 1-2 gün yatış; perfore vakalarda IV antibiyotik ile 4-7 gün sürebilir.
• Katı gıdaya geçiş bağırsak seslerinin gelmesiyle başlanır; gaz çıkması iyi belirtidir.
• 2-4 hafta ağır kaldırma ve sert egzersizden kaçınınız; hafif yürüyüş günden itibaren başlanabilir.
• Ateş, artan karın ağrısı veya yara akıntısı durumunda acile başvurunuz.
• Kontrol muayenesi 2. haftada; patoloji sonucu için randevu alınız.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Apendektomi ameliyatının acil gerekliliği ve olası komplikasyonlar hakkında bilgi aldım.
☐ Peritonit riski, abse oluşumu ve yapışıklık komplikasyonları anlatıldı.
☐ Alternatif tedaviler (antibiyotik yaklaşımı) değerlendirildi; sorularım yanıtlandı.
☐ Laparoskopik yöntemden açık cerrahiye geçiş gerekebileceğini kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Apendektomi ameliyatına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "hemoroid-cerrahisi-onam": {
    icerik: `HEMOROİD (BASUR) CERRAHİSİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan hemoroid cerrahisi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

Planlanan yöntem: □ Hemoroidektomi (açık/kapalı)  □ Stapler hemoroidopeksi (PPH)  □ Lazer ablasyon  □ HAL-RAR  □ Bant ligasyonu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hemoroid cerrahisi; iç ve/veya dış hemoroidal dokuların (anal kanalda kanla dolan venöz yastıkçıklar) çeşitli tekniklerle giderilmesi işlemidir. Açık/kapalı klasik hemoroidektomide hastanın litotomi pozisyonunda (sırt üstü, bacaklar yukarıda) hemoroid paketi kesiyle çıkarılır; spinal veya genel anestezi altında 30-60 dakika sürer. Stapler PPH yönteminde sirküler stapler ile mukoza halkası kesilerek hemoroid kitlesi yukarı asılır; yara analdan dışarıda değildir, ağrı daha azdır. Lazer ablasyon ve HAL-RAR yöntemlerinde daha az doku hasarı hedeflenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Ağrı: Klasik hemoroidektomide ilk hafta yoğun ağrı beklenir; opioid dahil çok katmanlı analjezi protokolü uygulanır; oturma yastığı ve sitz banyo öncelikli yöntemlerdir.
• Üriner retansiyon: Özellikle genel/spinal anestezi sonrası erkeklerde görülür; geçici kateterizasyon uygulanır.
• Erken kanama: İlk 12-24 saatte beklenen; tampon veya dikiş ile kontrol edilir.
• Ödem ve irritasyon: Anal bölgede şişlik 1-2 hafta sürebilir; lokal kremler ve soğuk kompres yardımcı olur.
• Enfeksiyon: Nadir; antibiyotik ile tedavi edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Geç kanama: 7-14. günlerde skar dokusu düşerken kanama olabilir; çoğu kendiliğinden durur, devam ederse baskı veya dikiş uygulanır.
• Anal darlık (anal stenoz): Geniş eksizyon veya yara iyileşmesi sonrası anal kanal daralabilir; dilatasyon seansları veya cerrahi düzeltme gerekebilir.
• Anal inkontinans: Sfinkter hasarı durumunda gaz/dışkı kaçırma oluşabilir; önceden var olan sfinkter zayıflığında risk artar. Biyofeedback veya sfinkter onarımı ile tedavi edilebilir.
• Hemoroid nüksü: Özellikle Evre 3-4 hemoroidlerde uzun vadede nüks görülebilir; diyet, defekasyon alışkanlıkları ve straining kontrolü önemlidir.
• PPH komplikasyonları (Stapler): Rektal duvar kalınlığına bağlı ağrı, rektovajinal fistül veya anastomoz kanaması nadir olmakla birlikte ciddi komplikasyonlar arasındadır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Medikal tedavi: Lifli diyet, laksatifler, lokal kremler ve sitz banyo ile semptomlar azaltılabilir; ancak ileri evre hemoroidlerde yeterli değildir.
• Ofis prosedürleri (Evre 1-2): Bant ligasyonu, sklerozasyon veya kızılötesi koagülasyon daha az invazif yöntemlerdir; nüks oranı cerrahiye göre daha yüksektir.
• Lazer/HAL-RAR: Daha az ağrılı minimal invaziv yöntemlerdir; uzun vadeli başarı oranları konvansiyonel cerrahiye yakındır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AMELİYAT SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Katı gıdaya geçişi kolaylaştırmak için lif takviyeleri ve yeterli sıvı alımı sürdürülmelidir.
• Sitz banyo (ılık su oturması) günde 2-3 kez 10-15 dakika; ağrı ve ödem azaltır.
• İlk dışkılama sonrası doktor önerilen lokal krem uygulanmalıdır; WC'de oturmak 5 dakikayı geçmemelidir.
• Taburculukta verilen kontrol tarihi takip edilmeli; yoğun kanama veya ateş durumunda acile başvurulmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Hemoroid cerrahisi, anestezi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Erken/geç dönem riskler, anal inkontinans ve anal stenoz olasılığı anlatıldı.
☐ Alternatif yöntemler (ofis prosedürleri, lazer) değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Hemoroid cerrahisi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "meme-biyopsi-onam": {
    icerik: `MEME BİYOPSİSİ / EKSİZYONU AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan meme biyopsisi ve/veya eksizyonu hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

Planlanan işlem: □ İnce iğne aspirasyon biyopsisi (İİAB)  □ Core (Tru-cut) biyopsi  □ Vakum destekli biyopsi (mammotome)  □ Eksizyonel biyopsi / lumpektomi
Görüntüleme rehberliği: □ USG  □ Mamografi stereotaksi  □ MRG  □ Palpasyon

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

İİAB, 21-23 gauge ince iğne ile hücre örneği alınması; lokal anestezi gerektirmez, 5-10 dakika sürer. Core biyopsi, meme içine lokal anestezi altında daha kalın iğne ile 2-5 adet doku silindiri alınması işlemidir; 15-30 dakika sürer. Vakum destekli biyopsi; palpasyon veya görüntüleme eşliğinde aspirasyon uygulayan özel aletlerle daha fazla doku alınmasını sağlar. Eksizyonel biyopsi / lumpektomi, kitlenin tamamının cerrahi kesiyle çıkarılmasıdır; lokal/genel anestezi altında 30-60 dakika sürer.

Patoloji sonucu 5-10 iş gününde hazır olur; bazı özel testler (immünohistokimya, genetik) ek süre gerektirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat / 1 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Hematom: İğne veya kesi yerinde kan birikmesi; soğuk kompres ve basınç uygulamasıyla çoğu kendiliğinden emilir.
• Ağrı ve hassasiyet: Biyopsi bölgesinde 1-5 gün sürebilir; NSAİD ile kontrol edilir.
• Enfeksiyon: Kızarıklık, sıcaklık ve akıntı ile kendini gösterir; antibiyotikle tedavi edilir.
• Pnömotoraks: Göğüs duvarına yakın derin biyopsilerde son derece nadir görülür; acil akciğer grafisiyle tanı konulur.
• Yara açılması (eksizyonda): Dikiş gerilmesi veya erken egzersizle oluşabilir; pansuman ve istirahatle düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Meme kontüründe değişim: Eksizyonel biyopsilerde doku kaybı sonrası lokal çöküntü veya asimetri oluşabilir; kozmetik değerlendirme için plastik cerrahi konsültasyonu planlanabilir.
• Skar ve fibrozis: Kesi yerinde hipertrofik skar veya keloid gelişebilir; silikon bant, lazer veya steroid enjeksiyonu ile tedavi edilebilir.
• Yanlış negatif sonuç: Örnekleme hatası nedeniyle malignite atlanabilir; klinik şüphe devam ederse tekrar veya açık biyopsi planlanır.
• Tümör çevresinde implantasyon (son derece nadir): Teorik olarak biyopsi iğne yoluna tümör hücresi ekilmesi mümkündür; kanıtlanmış klinik önemi yoktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Görüntüleme ile izlem: Küçük, düşük şüpheli lezyonlarda 6 aylık mamografi/USG takibi biyopsiye alternatif oluşturabilir; hekimin yönlendirmesi önemlidir.
• MRG eşliğinde biyopsi: USG veya mamografide görülemeyen lezyonlarda MRG rehberliğiyle örnekleme yapılabilir.
• Farklı biyopsi tipi seçimi: Daha az invazif İİAB yerine daha fazla doku sağlayan core biyopsi tercih edilebilir veya tam tersi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası 24 saat destek sütyen ve soğuk kompres kullanınız.
• Aspirin ve NSAİD'leri işlem günü almayınız; işlem öncesi 5 gün kesilmesi önerilir.
• Kesi yeri 48 saat kuru tutulmalı; bandaj değişimi bildirildiği şekilde yapılmalıdır.
• Patoloji sonucu öğrenildiğinde hekim randevusunu ertelemeyiniz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Meme biyopsisi / eksizyonu işlemi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Hematom, enfeksiyon, pnömotoraks ve yanlış negatif sonuç riski anlatıldı.
☐ Alternatif yöntemler değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Meme Biyopsisi / Eksizyonu işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // NÖROLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "emg-onam": {
    icerik: `ELEKTROMİYOGRAFİ (EMG) / SİNİR İLETİM ÇALIŞMASI AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan EMG / sinir iletim çalışması hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMG (Elektromiyografi) ve Sinir İletim Çalışması (SİÇ / NCS), sinir ve kas sisteminin elektriksel aktivitesini değerlendiren nörofizyolojik tetkiklerdir. Sinir iletim çalışmasında (NCS) cilt yüzeyine yerleştirilen elektrotlar aracılığıyla sinire küçük elektrik uyarısı verilir; iletim hızı ve amplitüd ölçülür. İğne EMG'de steril tek kullanımlık ince iğne elektrodu kasa girilir; kasın dinlenme ve kasılma sırasındaki elektriksel aktivitesi kayıt edilir. Periferik nöropati, karpal tünel sendromu, disk hernisi kaynaklı radikülopati, myopati ve nöromüsküler kavşak hastalıklarının tanısında altın standarttır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM RİSKLER (İşlem Sırasında / Sonrasında)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• NCS rahatsızlığı: Elektrik uyarısı kısa süreli elektrik şoku hissi yaratır; şiddeti düşük tutulur, tolere edilebilir düzeydedir.
• İğne ağrısı: Her kas için ayrı iğne girişinde baskı ve yanma hissi oluşur; işlem sonrası hafif kas ağrısı 1-2 gün sürebilir.
• Küçük ekimoz veya kanama: Özellikle antikoagülan (kan sulandırıcı) kullanan hastalarda daha belirgin olabilir; baskı uygulanır. Varfarin, heparin veya NOAC kullananlar işlem öncesinde hekimlerine bilgi vermelidir.
• Enfeksiyon: Tek kullanımlık steril iğne kullanıldığından son derece nadirdir.
• Pnömotoraks: Göğüs kası (paravertebral, interkostal) EMG'sinde çok nadir görülür; akciğer grafisi gerektirebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM RİSKLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Lokal kas hassasiyeti: İğne noktasına bağlı kas ağrısı 24-48 saat devam edebilir; kendiliğinden geçer.
• Yanlış negatif/yanıltıcı sonuç: Hafif veya çok erken evre hastalıklarda EMG normal görünebilir; klinik değerlendirmeyle birlikte yorumlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TANI YÖNTEMLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• MRG (Manyetik Rezonans Görüntüleme): Sinir ve kas morfolojisini değerlendirir; elektriksel aktiviteyi ölçemez, EMG ile tamamlayıcıdır.
• Nörosonografi (sinir ultrasonografisi): Sinirin anatomik yapısını görüntüler; girişimsel olmayan bir alternatiftir.
• Klinik muayene ve provokasyon testleri: Bazı vakalarda (örn. karpal tünel) Tinel ve Phalen testleri yeterli tanı desteği sağlayabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası normal aktiviteye hemen dönülebilir.
• İğne bölgelerinde hafif bir baskı ve 1-2 günlük kas hassasiyeti beklenir; NSAİD gerekirse alınabilir.
• Antikoagülan kullananlar kanama bulgularını izlemelidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ EMG / Sinir iletim çalışması işlemi ve olası rahatsızlıklar hakkında hekimimden bilgi aldım.
☐ Ağrı, kanama ve pnömotoraks riski bana açıklandı.
☐ Alternatif tanı yöntemleri değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ EMG / Sinir İletim Çalışması işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "lomber-ponksiyon-onam": {
    icerik: `LOMBER PONKSİYON (BEL DELİĞİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan lomber ponksiyon işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lomber ponksiyon (LP / spinal tap), L3-L4 veya L4-L5 vertebra aralığından ince bir spinal iğne ile subaraknoid aralığa girilmesi ve beyin omurilik sıvısı (BOS) alınması ya da ilaç uygulanması işlemidir. Hasta yan yatar veya oturur pozisyona getirilerek bel fleksiyona alınır; bu konum omurlar arasındaki mesafeyi açar. Lokal anestezi uygulandıktan sonra iğne yavaşça ilerletilir ve BOS akması ile aralığa ulaşıldığı doğrulanır. BOS basıncı ölçülür ve 10-20 ml sıvı örneği alınır veya ilaç enjekte edilir. İşlem 15-30 dakika sürer.

İşlem öncesinde kafa içi basınç artışını dışlamak için fundoskopi veya kranyal görüntüleme (BT/MRG) değerlendirilir; artmış intrakranyal basınçta LP kontrendikedir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Post-LP baş ağrısı (post-dural puncture headache): %10-30 oranında görülen en sık komplikasyondur. Ayakta şiddetlenen, yatmakla azalan frontooksipital baş ağrısı, bulantı, kulak çınlaması eşlik edebilir. İstirahat, bol sıvı ve analjezi ile çoğu 24-72 saatte düzelir.
• Bel ağrısı ve parestezi: İğne giriş bölgesinde geçici ağrı; nadiren bacağa vuran elektrik çarpması hissi (sinir teması); birkaç günde geçer.
• Kanama (spinal epidural hematom): Antikoagülan kullanan veya pıhtılaşma bozukluğu olan hastalarda risk artar; bacaklarda güçsüzlük veya kontrol kaybı ile kendini gösterir; acil cerrahi gerektirebilir.
• Geçici işitme kaybı: BOS basıncındaki ani değişime bağlı nadir, geçici.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Günler / Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Epidural kan yaması ihtiyacı: Post-LP baş ağrısı 72 saatte geçmezse epidural blood patch (hastanın kendi kanıyla) uygulanabilir; çok etkili bir tedavidir.
• Enfeksiyon (menenjit/abse): Son derece nadir; asepsi kurallarına sıkı uyumla önlenir.
• İntrakranyal hipotansiyon sendromu: BOS basıncının uzun süre düşük kalması kronk baş ağrısına neden olabilir; MRG ile tanı konulur, EBP ile tedavi edilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TANI YÖNTEMLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• BT / MRG görüntüleme: Subaraknoid kanama şüphesinde BT, MS veya ensefalit şüphesinde MRG ile görüntüleme tanıyı destekleyebilir; ancak BOS analizi yerini alamaz.
• Kan ve serum biyomarker testleri: Bazı durumlarda (örn. serum nörofilament, serum GFAD) LP yerine serumdan tanıya yardımcı göstergeler kullanılabilir.
• Serebral anjiografi: Subaraknoid kanama tanısında anjiografi ile damarsal neden araştırılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası 1-2 saat yatay pozisyonda istirahat önerilir.
• Bol sıvı (su, kafeinli içecek) tüketimi post-LP baş ağrısını azaltır.
• 24 saat araç kullanmaktan kaçınınız; işlem gününde ağır fiziksel aktivite yapmayınız.
• Şiddetli baş ağrısı, ateş, bacak güçsüzlüğü veya mesane/bağırsak kontrolünde değişiklik durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Lomber ponksiyon işlemi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Post-LP baş ağrısı, kanama ve enfeksiyon riski bana açıklandı.
☐ Alternatif tanı yöntemleri değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Lomber ponksiyon işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "noroloji-botoks-onam": {
    icerik: `BOTULİNUM TOKSİN UYGULAMASI (NÖROLOJİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan botulinum toksini enjeksiyonu hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

Endikasyon: □ Kronik migren (≥15 gün/ay)  □ Servikal distoni (tortikollis)  □ Spastisite (inme/MS sonrası)
□ Blefarospazm / Hemifasiyal spazm  □ Diğer: .........................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Botulinum toksini tip A (BTX-A; onabotulinumtoxinA veya abobotulinumtoxinA), hedef kas içine enjekte edilerek asetilkolin salınımını presinaptik düzeyde geçici olarak bloke eder; kas gevşemesi ve/veya spazm azalması sağlar. Etki 10-14 günde başlar, 3-6 ay sürer; kalıcı değildir ve tekrar seans gerektirir.

Kronik migrende PREEMPT protokolüyle kafa ve boyun kaslarına 31-39 farklı noktaya 155-195 ünite enjekte edilir. Servikal distoni ve spastisitede EMG veya ultrason rehberliğiyle ilgili kaslara uygulanır. Doz hesabı kiloya, kasın büyüklüğüne ve endikasyona göre hekimce belirlenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk Günler / 1-4 Hafta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Enjeksiyon bölgesinde ağrı ve ekimoz: Sık görülür; iğne girişine bağlı, kısa sürelidir.
• Komşu kas zayıflığı (difüzyon): Toksinin hedef kas dışına yayılması ile komşu kaslarda istem dışı zayıflık oluşabilir. Örn. servikal bölgede yutma güçlüğü veya ses değişikliği; migren enjeksiyonlarında alın sarkması veya kaş düşüklüğü. Genellikle 4-8 haftada kendiliğinden geçer.
• Baş ağrısı: İşlem sonrası 24-48 saatte geçici atlamar oluşabilir.
• Grip benzeri semptomlar: Genel yorgunluk ve hafif ateş nadir; kendiliğinden geçer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalarca / Aylarca Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━════════════════

• Sekonder non-responders (antikor gelişimi): Yıllar içinde botulinum toksinine karşı nötralizan antikor gelişimi ile tedavi etkinliği azalabilir; doz artışı veya farklı toksin tipi (BTX-B) değerlendirilebilir.
• Uzak difüzyon — FDA kara kutu uyarısı: Terapötik dozlarda son derece nadir olmakla birlikte uzak kas gruplarına difüzyon teorik risk olarak tanımlanmıştır; yutma, solunum veya konuşma güçlüğü gelişirse acil başvurulmalıdır.
• Psikososyal etki: Servikal distoni ve spastisitede kişilerarası ilişkileri etkileyen boyun duruşu değişimlerinin tedaviyle düzelmesi yaşam kalitesini önemli ölçüde artırır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kronik migren profilaksisi için oral ilaçlar: Topiramat, valproat, amitriptilin, beta blokerler — botulinum toksinine önce ya da birlikte tercih edilebilir.
• CGRP monoklonal antikorları (erenumab, fremanezumab vb.): Yeni nesil migrenin profilaksisi için aylık SC enjeksiyon; BTX-A'ya alternatif veya ek tedavi olarak kullanılabilir.
• Fizik tedavi ve rehabilitasyon: Servikal distoni ve spastisitede fizik tedavi programı BTX-A'nın etkinliğini artırabilir.
• Oral spazmolitikler / antikolinerjikler: Distoni ve spastisite için medikal seçenekler mevcuttur; yan etki profili gözetilmelidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Enjeksiyon günü başın öne eğilmesi veya enjeksiyon bölgesine masaj uygulanmaması önerilir (difüzyon riski).
• İlk 4 saat yoğun egzersizden kaçınınız.
• Etki 2 haftada değerlendirilebilir; 4-6 haftada tam etki gözlenir.
• Sonraki seans tarihi 3. ayda planlanır; atlamanız durumunda semptomlar geri döner.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Botulinum toksini tedavisi, endikasyon ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Komşu kas zayıflığı, yutma güçlüğü ve uzak difüzyon riski bana açıklandı.
☐ Alternatif tedaviler (oral ilaçlar, CGRP antikorları) değerlendirildi; sorularım yanıtlandı.
☐ Tedavinin tekrar seans gerektirdiğini ve kalıcı olmadığını anlıyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Botulinum Toksini enjeksiyonuna ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // FİZİK TEDAVİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "fizik-tedavi-onam": {
    icerik: `FİZİK TEDAVİ VE REHABİLİTASYON AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan fizik tedavi ve rehabilitasyon programı hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROGRAM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fizik tedavi ve rehabilitasyon; kas-iskelet, sinir sistemi ve kardiyopulmoner hastalıklarda ağrı kontrolü, işlevselliğin yeniden kazanılması ve yaşam kalitesinin artırılması amacıyla çeşitli fiziksel modalite ve egzersiz yaklaşımlarını kapsar.

Programınıza dahil edilebilecek uygulamalar:
• Elektroterapi: TENS (transkutan elektrik sinir stimülasyonu), interferansiyel akım, diadinamik akım — ağrı inhibisyonu ve kas güçlendirme.
• Ultrason terapisi: Derin doku ısıtması ile inflamasyon azaltımı; 1 MHz veya 3 MHz frekansla deri altı dokuya penetrasyon.
• Lazer tedavisi: Düşük yoğunluklu lazer (LLLT) ile hücresel iyileşme stimülasyonu; sinirlerde antiinflamatuvar etki.
• Traksiyon: Servikal veya lumbar diskopatide omurlar arası mesafeyi açarak sinir sıkışmasını azaltma; sürekli veya aralıklı olabilir.
• Sıcak/soğuk uygulama: Yüzeyel infrared veya parafin; akut fazda soğuk (kriyoterapi) tercih edilir.
• Manuel terapi: Yumuşak doku mobilizasyonu, eklem mobilizasyonu, miyofasiyal release.
• Terapötik egzersiz: Stabilizasyon, kuvvetlendirme, germe ve propriosepsiyon egzersizleri.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM RİSKLER (İlk Seanslarda)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Geçici ağrı artışı: İlk 2-4 seansta uygulama sonrası ağrı artışı beklenen bir durumdur; tedavinin etkisiz olduğu anlamına gelmez.
• Cilt irritasyonu: Elektrot bölgelerinde kızarıklık veya hafif yanma görülebilir; cilt hazırlığı ve elektrot pozisyonu ayarlanır.
• Kas ağrısı ve yorgunluk: Özellikle egzersiz seansları sonrası DOMS (gecikmiş başlangıçlı kas ağrısı) oluşabilir; 24-48 saatte geçer.
• Baş dönmesi: Traksiyon veya yoğun nefes egzersizleri sırasında nadir görülür; seans durdurulur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM RİSKLER / KONTRENDIKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Semptom progresyonu: Egzersiz programına rağmen ağrı veya nörolojik bulguların artması durumunda tedavi revize edilmeli ya da görüntüleme yenilenmelidir.
• Kontrendike durumlar: Aktif malignite, gebelik (bazı elektroterapi modaliteleri), kalp pili/metal implant bölgesine elektroterapi uygulaması, derin ven trombozu (egzersiz kısıtlanır) uygulamaları kısıtlandırabilir; hekiminize bilgi veriniz.
• Yetersiz yanıt: Tüm seanslara uyuma karşın yeterli iyileşme sağlanamayabilir; bu durumda medikal tedavi, enjeksiyon veya cerrahi seçenekler değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Medikal tedavi: NSAİD, kas gevşeticiler, nöropatik ağrı ilaçları tek başına veya fizik tedaviyle birlikte uygulanabilir.
• Eklem/yumuşak doku enjeksiyonları: Kortikosteroid veya hyaluronik asit eklem içi enjeksiyonu ağrı ve inflamasyonu hızla azaltabilir.
• Cerrahi: Konservatif tedaviye yanıt alınamayan bası sendromu veya yapısal patolojilerde değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TAKİP VE HASTA SORUMLULUKLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Seans sayısı ve aralığını aksatmayınız; seans kaçırma programın etkinliğini azaltır.
• Ev egzersiz programını düzenli uygulamanız iyileşmenin kritik bileşenidir.
• Ağrı veya şikâyetlerinizde belirgin artış olursa seans öncesinde terapiste bildiriniz.
• Kalp pili, metal implant, gebelik veya aktif kanser durumunuzu başlamadan önce hekiminize belirtiniz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Fizik tedavi programı, uygulama yöntemleri ve olası riskler hakkında hekimimden bilgi aldım.
☐ Kontrendikasyonlar ve geçici ağrı artışı olasılığı bana açıklandı.
☐ Alternatif tedaviler (medikal, enjeksiyon, cerrahi) değerlendirildi; sorularım yanıtlandı.
☐ Ev egzersiz programını uygulamayı ve seans düzenine uymayı kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Fizik Tedavi ve Rehabilitasyon programına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "eklem-enjeksiyon-onam": {
    icerik: `EKLEM İÇİ / YUMUŞAK DOKU ENJEKSİYONU AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan eklem içi veya yumuşak doku enjeksiyonu hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

Uygulama bölgesi: .........................................
Uygulanan ajan: □ Kortikosteroid  □ Hyaluronik asit  □ PRP  □ Lokal anestezik  □ Kombinasyon

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Eklem içi enjeksiyon, ağrılı veya inflamasyon gösteren ekleme veya çevre yumuşak dokuya (bursa, tendon kılıfı) doğrudan ilaç verilmesidir. Ultrason rehberliği ile yapılırsa doğruluk ve güvenlik artar. Lokal anestezi uygulanabilir; işlem 5-15 dakika sürer.

Kortikosteroid (metilprednizolon, betametazon): Güçlü antiinflamatuvar etki; 1-3 haftada maksimal etkiye ulaşır, 4-12 hafta sürer. Aynı ekleme yılda 3-4 enjeksiyon üst sınır olarak kabul edilmektedir.
Hyaluronik asit (viskosuplementasyon): Eklem sıvısını viskozite açısından destekler; kıkırdak koruyucu etki tartışmalıdır. Diz osteoartriti başta olmak üzere çeşitli eklemlerde uygulanır.
PRP (trombosit açısından zengin plazma): Hastanın kendi kanından elde edilen büyüme faktörü açısından zengin ürün; doku onarımını desteklediği düşünülür, etkinliği araştırma aşamasındadır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 1-7 Gün)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Enjeksiyon sonrası "flare" (alevlenme): %2-10 oranında enjeksiyondan 6-24 saat sonra ağrıda geçici artış görülür; kortikosteroid kristallerine bağlıdır. Soğuk uygulama ve NSAİD ile kontrol edilir; 24-48 saatte geçer.
• Ekimoz ve hafif şişlik: İğne giriş bölgesinde görülebilir; kendiliğinden düzelir.
• Vasovagal reaksiyon: Baş dönmesi, terleme veya geçici bilinç bulanıklığı; uzanarak ve izlemle yönetilir.
• Kan şekeri yükselmesi: Kortikosteroid enjeksiyonu sonrası diyabetik hastalarda 1-5 gün boyunca kan şekeri artışı görülebilir; glikoz izlemi gereklidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Haftalar / Aylar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Septik artrit (eklem enfeksiyonu): Son derece nadir (<1/10.000); yoğun ağrı, ısı ve ateşle kendini gösterir; aspirasyon ve antibiyotikle acilen tedavi edilir.
• Subkütan yağ atrofisi ve cilt depigmentasyonu: Özellikle yüzeysel enjeksiyonlarda kortikosteroid dokuya sızarsa kalıcı cilt değişikliğine yol açabilir.
• Kıkırdak hasarı: Tekrarlayan kortikosteroid enjeksiyonları kıkırdak matriksini olumsuz etkileyebilir; bu nedenle yılda 3-4 enjeksiyon üst sınırı önerilmektedir.
• Tendon rüptürü: Tendon içine doğrudan enjeksiyondan kaçınılır; çevre enjeksiyonlarında risk son derece düşüktür.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Oral antiinflamatuvarlar (NSAİD): Eklem ağrısında birinci basamak; gastrointestinal ve kardiyovasküler risk gözetilmeli.
• Fizik tedavi ve egzersiz: Kas güçlendirme ve hareket açıklığı artışı; enjeksiyonla birlikte kullanıldığında etkinlik artar.
• ESWT (şok dalgası): Tendinopati ve kalsifik tendinitte cerrahi olmayan etkin bir seçenek.
• Artroskopik veya cerrahi girişim: Konservatif tedaviye yanıtsız ağır vakalarda; kıkırdak restorasyonu veya protez.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem günü enjeksiyonlu eklemi dinlendiriniz; ertesi günden itibaren hafif aktiviteye dönülebilir.
• İlk 24-48 saat soğuk kompres (ağrı artarsa) veya ılık kompres (ağrı hafifse) uygulanabilir.
• Diyabetik hastalar işlem sonrası 3-5 gün kan şekerini daha sık ölçmelidir.
• Ateş, eklemde belirgin şişlik ve sıcaklık artışı durumunda acilen başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Eklem içi enjeksiyon işlemi, kullanılacak ajan ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Flare reaksiyonu, septik artrit ve kıkırdak hasarı riski bana açıklandı.
☐ Alternatif tedaviler değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Eklem içi / Yumuşak Doku Enjeksiyonuna ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "eswt-sok-dalgasi-onam": {
    icerik: `ESWT (EKSTRAKORPOREAL ŞOK DALGASI TEDAVİSİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan ESWT tedavisi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

Endikasyon: □ Plantar fasiit  □ Aşil tendinopatisi  □ Kalsifik tendinit  □ Lateral epikondilit  □ Rotator cuff  □ Miyofasiyal ağrı  □ Diğer: .........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ESWT, cilt yüzeyi üzerinden uygulanan yüksek enerjili akustik şok dalgalarının hedef dokuya (tendon, fasya, kemik-tendon bileşkesi) iletilmesiyle iyileşmeyi uyarması prensibine dayanır. Temel etki mekanizmaları; kalsifik depoların parçalanması, neovaskülogenez (yeni damar oluşumu) stimülasyonu ve ağrı reseptörü inhibisyonudur.

Iki ana tip kullanılır: Fokal ESWT (derin etkili, yüksek enerji) ve radyal ESWT (yüzeyel etkili, daha düşük enerji). Protokol genellikle 3-5 seans, haftalık aralıklarla planlanır. Her seans 15-20 dakika sürer; seans sırasında hafiften ağıra değişen ağrı hissedilebilir, bu dokuya ulaşıldığının göstergesidir.

Önemli kontrendikasyonlar: Gebelik, uygulama bölgesinde aktif enfeksiyon veya malignite, kanama bozukluğu, akciğer veya büyük damar üzerine uygulama, kalp pili (cihaz üzerine). Bu durumlardan herhangi biri varsa hekiminize bildirmeniz zorunludur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM RİSKLER (Seans Sırasında / Sonrasında)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Seans sırasında ağrı: Özellikle yüksek enerji uygulamalarında belirgindir; enerji kademeli artırılarak tolere edilebilir seviyede tutulur.
• İşlem sonrası geçici ağrı artışı: İlk 24-48 saat boyunca şikâyetlerde artış beklenen bir durumdur; tedavi sürecinin doğal parçasıdır, NSAİD kullanılabilir.
• Ciltte kızarıklık ve hafif ekimoz: Uygulama bölgesinde geçici; 1-3 günde iyileşir.
• Hipotansiyon/baş dönmesi: Nadir; uzanma pozisyonu ve istirahatle düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM RİSKLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sinir hasarı: Yüksek enerji uygulamalarında ve sinir yakınında tedavide son derece nadir; uyuşukluk veya güçsüzlük gelişirse durdurulur.
• Tedaviye yanıtsızlık: Hastaların %20-30'u klinik iyileşme sağlayamayabilir; bu durumda medikal tedavi, enjeksiyon veya cerrahi değerlendirilir.
• Tendon rüptürü: Son derece nadir; var olan ciddi tendon dejenerasyonunda yüksek enerji uygulaması risk oluşturabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Fizik tedavi ve egzersiz programı: Ekzantrik egzersiz tendinopati için etkin bir birinci basamak tedavidir; ESWT öncesinde ya da birlikte uygulanabilir.
• Kortikosteroid enjeksiyonu: Kısa vadede güçlü ağrı kesici etki; ancak tekrarlanan enjeksiyonlarda tendon hasarı riski mevcuttur.
• Cerrahi (minimal invaziv tendinoskopi veya açık): 6-12 ay konservatif tedaviye yanıt alınamayan vakalarda değerlendirilir.
• PRP enjeksiyonu: Tendinopati için ESWT ile karşılaştırılabilir sonuçlar bildiren çalışmalar mevcuttur; birlikte kullanılabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Seans sonrası ilk 48 saat yoğun egzersizden ve uygulama bölgesine kuvvetli baskıdan kaçınınız.
• Kortikosteroid enjeksiyonu ile ESWT aynı haftada yapılmamalıdır.
• Tüm seansları tamamladıktan 4-6 hafta sonra klinik değerlendirme yapılacaktır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ ESWT tedavisi, seans planı ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Geçici ağrı artışı, kontrendikasyonlar ve yanıtsızlık olasılığı bana açıklandı.
☐ Alternatif tedaviler değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ ESWT tedavisine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // GASTROENTEROLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kolonoskopi-onam": {
    icerik: `KOLONOSKOPİ / POLİPEKTOMİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan kolonoskopi işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur. Lütfen aşağıdaki bölümleri dikkatlice okuyunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kolonoskopi; anal kanaldan girilen esnek kolonoskop ile tüm kalın bağırsağın (çekum ve terminal ileuma kadar) kamera eşliğinde görüntülenmesi işlemidir. Sedasyon (bilinçli sedasyon: midazolam ± propofol) veya genel anestezi altında yapılır; 20-45 dakika sürer. Anormal görüntülü bölgeden biyopsi alınabilir. Polip saptanırsa "polipektomi" adı verilen polip çıkarma işlemi eşzamanlı yapılabilir: küçük polipler biyopsi forsepsiyle, büyük polipler diyatermi snare (elektrikli kement) veya endoskopik mukozal rezeksiyon (EMR) ile çıkarılır.

HAZIRLIK: İşlem öncesi 24-48 saat berrak sıvı diyeti uygulanmalıdır. Bağırsak temizliği için hekimin reçete ettiği laksatif solüsyon eksiksiz içilmelidir; yetersiz temizlik işlemin tekrarlanmasına neden olabilir. Demir ilaçları işlemden 1 hafta önce kesilir. Antikoagülan kullananlar hekimle görüşmelidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Karın ağrısı ve şişkinlik: Hava (CO₂) insufflasyonuna bağlı geçici kramplar işlem sonrası birkaç saat sürebilir; yürümek ve gaz çıkarmak rahatlatır.
• Sedasyon komplikasyonları: Solunum depresyonu, hipotansiyon; anestezi ekibi tarafından monitörize edilir, gerektiğinde antagonist ilaç uygulanır.
• Kanama (polipektomi sonrası): Polipektomi yapılan hastalarda %0,5-2 oranında kanama görülebilir. Erken (ilk 24 saat) veya geç (1-2 hafta) dönemde oluşabilir; endoskopik klip, termal koagülasyon veya reenterasyon ile kontrol edilir.
• Elektrolit bozukluğu: Bağırsak temizliği sırasında özellikle yaşlı ve böbrek hastaları hiponatremi, dehidrasyon açısından risk altındadır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Günler / Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Perforasyon (bağırsak delinmesi): En ciddi komplikasyondur; tanısal kolonoskopide %0,1, polipektomide %0,5 oranında görülür. Karında şiddetli ağrı ve ateşle kendini gösterir; acil cerrahi onarım gerektirir.
• Geç polipektomi kanaması: 7-14. günlerde pıhtı ayrılmasıyla tekrar kanama görülebilir; çoğu kez kendiliğinden durur, gerekirse endoskopik müdahale yapılır.
• Post-polipektomi sendromu: Polipektomi sonrası transmural yanık ağrısı ve ateş oluşabilir; antibiyotik ve istirahatle düzelir, cerrahi gerektirmez.
• Atlanan lezyon: Kolonun kıvrımlı yapısı veya yetersiz temizlik nedeniyle küçük polip veya lezyon atlama oranı %5-24'tür; tarama kolonoskopileri 5-10 yılda tekrarlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TANI YÖNTEMLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• BT kolonografi (sanal kolonoskopi): BT ile kalın bağırsak görüntüleme; invazif değil, bağırsak temizliği gerektirir. Polip saptanırsa klasik kolonoskopi gerekir.
• Fekal DNA testi (Cologuard) ve gaitada gizli kan testi: Kolorektal kanser tarama seçenekleridir; anormal sonuçta kolonoskopi gerektirir.
• Sigmoidoskopi: Sadece sol kolonun görüntülemesi; sağ kolon lezyonlarını dışlamaz.
• Kapsül kolonoskopi: Yutulabilen kamera kapsülü; bağırsak temizliği gerektirir, biyopsi alamaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sedasyon uygulandıysa işlem günü araç kullanılmamalı ve yalnız kalınmamalıdır.
• İşlem sonrası 2-4 saat içinde hafif sıvı ve gıda alımına başlanabilir.
• Polipektomi yapıldıysa ilk hafta posa kısıtlı diyet, ağır egzersizden kaçınma önerilir.
• Dışkıda taze kan, şiddetli karın ağrısı veya ateş durumunda acile başvurunuz.
• Polipektomi sonrası sonraki kontrol kolonoskopi tarihi hekiminizle belirlenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Kolonoskopi ve polipektomi işlemi, sedasyon ve komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Perforasyon, kanama ve elektrolit bozukluğu riski bana açıklandı.
☐ Alternatif tarama yöntemleri değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Kolonoskopi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "gastroskopi-onam": {
    icerik: `ÜST GİS ENDOSKOPİ (GASTROSKOPİ / ÖGD) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan gastroskopi (özofagogastroduodenoskopi - ÖGD) işlemi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gastroskopi, ağızdan sokulan esnek fiberoptik veya video endoskop aracılığıyla yemek borusu (özofagus), mide (gastrum) ve onikiparmak bağırsağının (duodenum) doğrudan görüntülenmesi işlemidir. Boğaz spreyi (lokal anestezi) ve/veya sedasyon (midazolam, propofol) uygulanabilir; işlem 5-15 dakika sürer. Gerektiğinde biyopsi alınır, Hp CLO testi yapılır; polip, darlık veya kanamaya yönelik tedavi (klip, elektrokoagülasyon, bant ligasyonu) eşzamanlı uygulanabilir.

HAZIRLIK: İşlemden en az 6-8 saat önce ağızdan hiçbir şey alınmamalıdır. Sedasyon uygulanacaksa işlem günü araç kullanılmamalı ve refakatçi olmalıdır. Kan sulandırıcı ilaçlar hekiminizin yönlendirmesiyle önceden kesilmelidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-48 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Boğaz ağrısı ve yutma güçlüğü: Endoskop geçişine bağlı irritasyon; 24-48 saatte geçer, ılık çay ve yumuşak gıda ile hafifletilir.
• Şişkinlik ve geğirme: Havanın mideye verilmesine bağlı geçici; gaz çıkarmakla hızla düzelir.
• Sedasyon komplikasyonları: Solunum depresyonu, hipotansiyon; anestezi ekibince takip edilir, gerektiğinde antagonist verilir. Sedasyon sonrası 2 saat dinlenme önerilir.
• Aspirasyon pnömonisi: Sedasyon altında reflü içeriğinin aspirasyonu nadir ama ciddi komplikasyon; mide boşluğunun tam olması nedeniyle açlık kuralına uyum kritiktir.
• Biyopsi bölgesinde kanama: Biyopsi sonrası hafif kanama beklenen; aktif kanama kliple durdurulur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Günler / Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Perforasyon (yemek borusu / mide delinmesi): <%0,1 oranıyla en ciddi komplikasyondur; özofagusa müdahaleli vakalarda (dilatasyon, darlık kesimi) risk artar. Göğüs ağrısı, boyunda şişlik (amfizem) veya ateşle kendini gösterir; acil cerrahi veya endoskopik kapama gerektirir.
• Geç kanama: Biyopsi veya tedavi sonrası 3-7 günde pıhtı ayrılması ile yineleme; hematemez veya melena ile kendini belli eder.
• Yanlış negatif patoloji: Örnekleme hatası ile patoloji atlama mümkündür; klinik şüphe devam ederse tekrar endoskopi planlanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TANI YÖNTEMLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Baryumlu grafi / üst GİS pasaj grafisi: Darlık ve fistül araştırmasında kullanılabilir; biyopsi imkânı yoktur.
• Kapsül endoskopi: Yutulabilen kamera; ince bağırsak için tercihlidir, gastroskopiyi ikame edemez.
• H. pylori üre nefes testi / dışkı antijen testi: Biyopsi gerektirmeksizin Hp araştırması yapılabilir; ancak mukozal patoloji değerlendirilemez.
• BT veya MRG mide-özofagus görüntülemesi: Kitle veya çevre organ tutulumu için tamamlayıcı yöntemdir; biyopsi yapılamaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Sedasyon uygulandıysa ilk 2 saat yatınız; araç kullanmayınız.
• İşlem sonrası 30-60 dakika sıvı, sonrasında hafif gıda alınabilir.
• Boğaz ağrısı için ılık çay ve pastil yeterlidir.
• Göğüs veya karında şiddetli ağrı, ateş, kan kusmak veya melena (siyah dışkı) durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Gastroskopi işlemi, sedasyon ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Perforasyon, aspirasyon ve kanama riski bana açıklandı.
☐ Alternatif tanı yöntemleri değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Gastroskopi / ÖGD işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "ercp-onam": {
    icerik: `ERCP (ENDOSKOPİK RETROGRAD KOLANJİOPANKREATOGRAFİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

ÖNEMLİ: ERCP, rutin endoskopilere kıyasla belirgin ölçüde yüksek risk taşıyan girişimsel bir işlemdir. 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz zorunludur. Lütfen aşağıdaki tüm bölümleri dikkatlice okuyunuz.

Endikasyon: □ Safra yolu taşı  □ Safra yolu darlığı / tıkanma sarılığı  □ Pankreas kanalı hastalığı  □ Safra yolu tümörü (stentleme)  □ Tanısal amaç

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERCP, ağızdan sokulan özel yan görüşlü endoskop (duodenoskop) ile onikiparmak bağırsağındaki Vater ampulüne ulaşılarak safra ve pankreas kanalına ince kateter sokulması işlemidir. Floroskopi eşliğinde kontrast madde verilerek kanallar görüntülenir. Sfinkterotomi (Oddi sfinkterinin açılması) yapılarak taş çıkarma, darlık balonla genişletme ve plastik ya da metal stent yerleştirme gibi terapötik işlemler eşzamanlı uygulanabilir.

Genel anestezi veya derin sedasyon altında 30-90 dakika sürer. Hastanın 6-8 saat aç olması zorunludur. İşlem sonrası en az 4-6 saat gözlem yapılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Post-ERCP pankreatiti (PEP): En sık ve önemli komplikasyondur; %3-5 oranında görülür. Pankreas kanalına idiyosenkratik tepki sonucu gelişir. Hafif olgular IV sıvı ve analjezi ile kontrol edilir; şiddetli pankreatit yoğun bakım gerektirebilir. Rektum yollu diklofenak suppozituvar ve agresif sıvı tedavisi riski azaltır.
• Sfinkterotomi kanaması: Papilla sfinkterinin açılması sonrası aktif kanama %1-2 görülür; endoskopik klip, termal koagülasyon veya balon tamponadı ile durdurulur; nadiren anjiyografik embolizasyon gerekir.
• Kolanjit (safra yolu enfeksiyonu): İşlem sonrası safra yoluna bakteri girişi; ateş, üşüme ve sarılık üçlüsü (Charcot triadı) ile kendini gösterir; acil antibiyotik tedavisi ve safra drenajı gerektirir.
• Kontrast reaksiyonu: İyotlu kontrast maddeye alerjik reaksiyon; premedikasyon uygulanabilir, anafilaksi ekipmanı hazır tutulur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Günler / Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Perforasyon: Sfinkterotomi sırasında %0,3-1 oranında retroperitoneal perforasyon; sırt ağrısı, ateş ve retroperitoneal amfizem ile kendini gösterir. Cerrahi müdahale veya konservatif tedavi gerektirebilir.
• Stent tıkanması veya migrasyonu: Plastik stentler 3-6 ay içinde tıkanabilir; yenileme endoskopisi planlanmalıdır. Metal stentler daha uzun süre açık kalır.
• Rezidü taş / tekrar girişim gereksinimi: İlk ERCP'de tüm taşların çıkarılması mümkün olmayabilir; tekrar seans gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• MRCP (Manyetik Rezonans Kolanjiyopankreatografi): Non-invazif görüntüleme; anatomik değerlendirme için altın standarttır ancak terapötik işlem yapılamaz.
• Perkütan transhepatik kolanjiyografi (PTK): Cilt üzerinden floroskopi eşliğinde safra kanalına giriş; ERCP'nin başarısız olduğu durumlarda alternatiftir.
• Laparoskopik / açık koledokotomi: Cerrahi olarak safra kanalının açılması ve taş çıkarılması; özellikle kolesistektomiyle eş zamanlı planlanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası 4-6 saat aç kalınır; pankreatit riski azalmışsa hafif sıvıya geçilir.
• İşlem günü hastanede gözlem yapılır; serum amilaz/lipaz ölçümü planlanır.
• Şiddetli karın ağrısı, ateş, sarılık veya idrarda koyulaşma durumunda acile başvurunuz.
• Stent takıldıysa takip endoskopisi tarihi kesinlikle kaçırılmamalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ ERCP işlemi, yüksek risk profili ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Post-ERCP pankreatiti, kanama ve perforasyon riski ayrıntılı olarak anlatıldı.
☐ Alternatif tedaviler (MRCP, PTK, cerrahi) değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ ERCP işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // İÇ HASTALIKLARI — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "bobrek-biyopsi-onam": {
    icerik: `BÖBREK BİYOPSİSİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan perkütan böbrek biyopsisi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Perkütan böbrek biyopsisi; ultrasonografi veya bilgisayarlı tomografi (BT) eşliğinde, lokal anestezi altında, sırt üstü veya yüz üstü yatış pozisyonunda, özel biyopsi iğnesi ile böbrek dokusundan 1-3 adet doku silindiri alınması işlemidir. İşlem 15-30 dakika sürer; bilinçli sedasyon gerekebilir.

Öncesinde; pıhtılaşma testleri (INR, aPTT, trombosit), tam kan sayımı ve kan basıncı değerlendirmesi yapılır. Kontrol edilemeyen hipertansiyon, aktif enfeksiyon veya kanama diyatezi varlığında işlem ertelenir. Antikoagülan ilaçlar hekim yönlendirmesiyle önceden kesilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İlk 24-72 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Hematüri (idrarda kan): Makroskopik hematüri %5-10 hastada görülür; bol sıvı alımı ile 24-48 saatte düzelir. Aktif kanama veya pıhtıyla tıkanma durumunda acil değerlendirme gerekir.
• Perirenal hematom: Küçük hematom %50-85 hastada oluşur; çoğu asemptomatik olup kendiliğinden emilir. %0,5-1 olguda transfüzyon gerektirir; nadiren anjiyografik embolizasyon veya cerrahi gerekebilir.
• Bel ve sırt ağrısı: Biyopsi bölgesinde hematoma bağlı; analjeziklerle kontrol edilir.
• Vazovagal reaksiyon: İğne girişi sırasında nadir; uzanma ve izlemle düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Günler / Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Arteriyovenöz fistül (AVF): Böbrek damarları arasında anormal bağlantı oluşabilir (%10-15 USG'de saptanır); çoğu spontan kapanır. Kaçak devam ederse anjiyografik embolizasyon gerekir.
• Geç kanama (7-21 gün): Psödoanevrizma rüptürü nedeniyle geç dönemde şiddetli kanama gelişebilir; acil anjiyografik girişim gerektirir.
• Enfeksiyon: Nadir; ateş ve lokal hassasiyet ile kendini gösterir, antibiyotikle tedavi edilir.
• Komşu organ yaralanması: Dalak, karaciğer veya bağırsak yaralanması son derece nadirdir; görüntüleme ile dışlanır.
• Yetersiz doku alınması: Örnek miktarı patolojik tanı için yetersiz kalabilir; tekrar biyopsi gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TANI YÖNTEMLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Transjuguler böbrek biyopsisi: Kanama riski yüksek hastalarda boyun damarından girilerek yapılan alternatif; özel merkezlerde uygulanır.
• Açık veya laparoskopik biyopsi: Perkütan biyopsi uygulanamadığında ya da başarısız olduğunda tercih edilebilir; daha invazif bir yöntemdir.
• Non-invazif biyomarkerlar: İdrar veya serum bazlı biyomarkerlar (proteinüri profili, anti-PLA2R antikoru) biyopsiyi destekleyici olabilir; kesin histolojik tanının yerini alamaz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İşlem sonrası en az 6-24 saat hastanede gözlem; kan basıncı, nabız ve idrar rengi izlenir.
• İlk 48 saat yatak istirahati; ilk 1 hafta ağır egzersizden kaçınılmalıdır.
• Kan sulandırıcı ilaçlara hekim onayıyla yeniden başlanabilir (genellikle 5-7 gün sonra).
• Şiddetli bel ağrısı, hematüri artışı, kan basıncı düşüklüğü veya ateş durumunda acile başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Böbrek biyopsisi işlemi ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Hematom, hematüri, AVF ve geç kanama riski bana açıklandı.
☐ Alternatif tanı yöntemleri değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Böbrek Biyopsisi işlemine ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "iv-infuzyon-onam": {
    icerik: `İNTRAVENÖZ TEDAVİ / İNFÜZYON AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Planlanan intravenöz (IV) tedavi hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

Verilecek tedavi: □ Antibiyotik infüzyonu  □ Demir infüzyonu  □ Biyolojik ilaç  □ Vitamin / destek tedavisi
□ Serum / sıvı replasmanı  □ Kemoterapi  □ Diğer: .......................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

İntravenöz (IV) tedavi; periferik venöz kateter (PVK), santral venöz kateter (SVK) veya port kateter aracılığıyla ilaç, sıvı veya kan ürününün doğrudan kan dolaşımına verilmesi işlemidir. Periferik kateter kol veya el sırtındaki bir damardan takılır; kısa süreli tedaviler için yeterlidir. Uzun süreli, yüksek konsantrasyonlu veya irritan ilaçlar için juguler, subklaviyen veya femoral venden SVK tercih edilebilir.

Her infüzyon öncesinde damar yolu açıklığı ve ilaç kararlılığı kontrol edilir. Doz ve infüzyon süresi ilacın farmakokinetiğine göre hekim ve eczacı tarafından belirlenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM KOMPLİKASYONLAR (İşlem Sırasında / İlk 24 Saat)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Anafilaksi / alerjik reaksiyon: İlaç veya infüzyona bağlı akut reaksiyon; kurdeşen, nefes darlığı, hipotansiyon ile kendini gösterebilir. Acil adrenalin ve resüsitasyon ekipmanı hazır bulundurulur; infüzyon hızı yavaşlatılır veya durdurulur.
• İnfüzyon reaksiyonu (infusion-related reaction): Özellikle biyolojik ilaçlar ve demir ürünleri ile baş ağrısı, ateş, üşüme, yüzde kızarıklık görülebilir; premedikasyon (antihistaminik, steroid) ile azaltılabilir.
• Flebit (damar iltihabı): İlaç irritasyonuna bağlı damar boyunca kızarıklık ve ağrı; kateter yeri değiştirilir.
• Damar dışına sızma (ekstravazasyon): İlacın damar dışına kaçması; özellikle vesizan (doku hasarı yapan) ajanlarda ciddi doku nekrozu oluşabilir; infüzyon durdurulur, antidot uygulanabilir.
• Sıvı yüklenmesi: Kalp veya böbrek yetmezliği olan hastalarda hızlı sıvı replasmanı akciğer ödemi riskini artırır; yavaş infüzyon ve yakın izlem gerekir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM KOMPLİKASYONLAR (Günler / Haftalar Sonra)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Kateter enfeksiyonu (BSI): Santral kateterle ilişkili kan dolaşımı enfeksiyonu; ateş ve üşümeyle kendini gösterir; kateter çıkarımı ve antibiyotik gerektirir.
• İlaç birikimine bağlı toksisite: Böbrek veya karaciğer yetmezliğinde ilaç eliminasyonu yavaşlar; doz ayarı gerekebilir.
• Hipersensitivite geç reaksiyonu: Bazı ilaçlara karşı gecikmiş tip alerjik reaksiyon günler sonra ortaya çıkabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Oral tedavi: Emilim yeterliyse ve hasta oral alabiliyorsa pek çok ilacın oral formu tercih edilebilir; IV'ye geçişe ihtiyaç azalır.
• İntramüsküler (IM) veya subkütan (SC) enjeksiyon: Bazı ilaçlar kas içine veya deri altına uygulanabilir; IV infüzyon gerektirmez.
• Enteral beslenme: Parenteral beslenme yerine nazogastrik veya PEG tüpünden enteral yol tercih edilebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İŞLEM SONRASI TAKİP VE BAKIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• İnfüzyon süresince ve sonrasında vital bulgu takibi yapılır.
• Damar yeri kızarıklık, şişlik veya ağrı gelişirse hemşireye bildirin.
• Alerjik belirti (döküntü, nefes darlığı, çarpıntı) durumunda hemen bildirin.
• Ayaktan infüzyon uygulanmışsa araç kullanmadan önce sedasyon etkisinin geçtiğinden emin olun.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ İntravenöz tedavi, ilaç özellikleri ve olası komplikasyonlar hakkında hekimimden bilgi aldım.
☐ Anafilaksi, flebit ve ekstravazasyon riski bana açıklandı.
☐ Alternatif tedavi yolları değerlendirildi; sorularım yanıtlandı.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ İntravenöz Tedavi / İnfüzyon uygulamasına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  "diyabet-izlem-onam": {
    icerik: `DİYABETES MELLİTUS İZLEM VE TEDAVİ AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Diyabet tanınız ve planlanan tedavi programı hakkında 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında bilgilendirilmeniz yasal zorunluluktur.

Diyabet Tipi: □ Tip 1  □ Tip 2  □ Gestasyonel  □ MODY  □ Diğer: .........
Planlanan tedavi: □ Diyet/Egzersiz  □ Metformin  □ Sülfonilüre  □ SGLT-2 inhibitörü  □ GLP-1 agonist  □ İnsülin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Diyabetes mellitus; pankreastan insülin salgılanmasının yetersizliği ve/veya insüline direnç nedeniyle kan şekerinin kronik olarak yüksek seyrettiği metabolik bir hastalıktır. Uzun vadeli kontrolsüz hiperglisemi göz (retinopati), böbrek (nefropati), sinir sistemi (nöropati) ve kardiyovasküler sistem komplikasyonlarına yol açmaktadır.

Tedavi; bireyselleştirilmiş HbA1c hedefi (%6,5-8), kan basıncı ve lipid kontrolünü kapsar. Kullanılan ilaçların yan etki profilleri şunlardır:
• Metformin: Bulantı, ishal (başlangıçta geçici); laktik asidoz riski böbrek fonksiyonu izlenerek takip edilir; eGFR <30'da kullanılmaz.
• Sülfonilüre: Hipoglisemi riski; kilo artışı; öğün atlanması ile uyum önemli.
• SGLT-2 inhibitörü: İdrar yolu enfeksiyonu, genital mantar enfeksiyonu artışı; DKA riski (özellikle Tip 1'de); kardiyovasküler ve böbrek koruyucu etkisi.
• GLP-1 agonist: Bulantı, kusma; tiroid kanseri (hayvan çalışmalarında saptanmış, insanda risk belirsiz); kilo kaybı istenilen etki.
• İnsülin: Hipoglisemi; kilo artışı; enjeksiyon bölgesinde lipodistrofi.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ERKEN DÖNEM RİSKLER (Tedaviye Başlangıçta)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Hipoglisemi: İnsülin ve sülfonilüre ile en sık; titreme, terleme, baş dönmesi, çarpıntı ile kendini gösterir. Hafif: 15 g hızlı karbonhidrat (şeker, meyve suyu). Ağır/bilinçsiz: IV dextrose veya glukagon enjeksiyonu; acil servise başvuru.
• Gastrointestinal yakınmalar: Metformin ve GLP-1 agonistlerinde başlangıçta bulantı, ishal; doz kademeli artırılarak hafifletilebilir.
• Hiperglisemi atakları: Tedavi uyumsuzluğu, enfeksiyon veya stres durumunda şeker yükselebilir; semptomları tanıyınız ve hekiminizi arayınız.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GEÇ DÖNEM RİSKLER VE KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Mikrovasküler komplikasyonlar: Uzun vadede retinopati (görme kaybı), nefropati (böbrek yetmezliği), periferik nöropati (uyuşma, yanma, denge kaybı) gelişebilir. Düzenli göz, idrar ve sinir muayenesi ile erken saptanır.
• Makrovasküler komplikasyonlar: Koroner arter hastalığı, inme, periferik arter hastalığı riski artmıştır; kardiyovasküler koruma için hedef kan basıncı, lipid ve aspirin tedavisi planlanır.
• Diyabetik ayak: Nöropati ve vasküler yetersizliğe bağlı kronik yara; yara bakımı ve podiatri takibi önerilir.
• İnsülin direnci ve doz değişimi: Ağırlık artışı, hastalık veya yaşlanmayla insülin ihtiyacı değişir; doz ayarlaması için düzenli kontrol gerekir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Tıbbi beslenme tedavisi ve egzersiz: Özellikle Tip 2 diyabetin başlangıcında ya da hafif seyrinde ilaçsız kontrol mümkün olabilir.
• Bariatrik / metabolik cerrahi: Obez Tip 2 diyabetlilerde remisyon sağlayabilen cerrahi seçenek; değerlendirme gerektirir.
• İnsülin pompası ve sürekli glikoz monitörizasyonu (CGM): Özellikle Tip 1 diyabette geleneksel insüline göre daha iyi glisemi kontrolü sağlar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA SORUMLULUKLARI VE TAKİP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Günlük önerilen sıklıkta kan şekeri ölçümü yapınız; değerleri kaydediniz.
• Belirlenen diyet ve egzersiz programına uyunuz; sigara ve alkol tüketimini sınırlandırınız.
• HbA1c 3 ayda bir, böbrek fonksiyonu ve lipidler yılda en az bir kez, göz dibi muayenesi yılda bir yapılacaktır.
• İlaç yan etkisi veya anormal kan şekeri durumunda hemen hekiminizi arayınız.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☐ Diyabet tanım, tedavi seçenekleri ve ilaç yan etkileri hakkında hekimimden bilgi aldım.
☐ Hipoglisemi, uzun vadeli komplikasyonlar ve ilaç riskleri bana açıklandı.
☐ Alternatif tedaviler değerlendirildi; sorularım yanıtlandı.
☐ Düzenli kontrol ve izleme programına uyacağımı kabul ediyorum.
☐ Onamı istediğim zaman geri çekebileceğimi biliyorum.
☐ Diyabet Tedavisi ve İzlem Programına ONAY VERİYORUM.

HASTA
Adı Soyadı       : .......................................
T.C. Kimlik No   : .......................................
Tarih / İmza     : .......................................

YASAL TEMSİLCİ (Gerekiyorsa)
Adı Soyadı       : .......................................
Yakınlık Derecesi: .......................................
Tarih / İmza     : .......................................

ŞAHİT
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

TERCÜMAN (Gerekiyorsa)
Adı Soyadı       : .......................................
Tarih / İmza     : .......................................

BİLGİLENDİRMEYİ YAPAN HEKİM
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ONKOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kemoterapi-onam": {
    icerik: `KEMOTERAPİ (SİTOTOKSİK TEDAVİ) AYDINLATILMIŞ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun, Hasta Hakları Yönetmeliği ve Tıbbi Müdahalede Aydınlatılmış Onam ilkeleri çerçevesinde planlanan kemoterapi tedavisi hakkında sizi bilgilendirmek ve yazılı onayınızı almak amacıyla düzenlenmiştir.

ÖNEMLİ: Bu form, her yeni kemoterapi protokolü başlangıcında ayrıca doldurulmalıdır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kemoterapi; hızlı bölünen kanser hücrelerini yok etmek veya büyümelerini durdurmak amacıyla kullanılan ilaç tedavisidir. İlaçlar intravenöz (damar yolu), oral (ağızdan) veya subkütan (deri altı) yolla uygulanabilir. Kemoterapi; siklus adı verilen tedavi dönemleri şeklinde planlanır — her siklusun ardından kemik iliği ve diğer dokulara toparlanma süresi tanınır.

Protokol               : .......................................
Siklus sayısı          : ..............   Siklus aralığı: ..............
Uygulama yolu          : □ IV infüzyon  □ Oral  □ Subkütan  □ İntraperitoneal
Tahmini tedavi süresi  : .......................................

Kemoterapi tedavisinin amacı:
□ Küratif — tümörü tamamen ortadan kaldırmak
□ Neoadjuvan — cerrahi öncesi tümörü küçültmek
□ Adjuvan — cerrahi/radyoterapi sonrası nüks riskini azaltmak
□ Palyatif — hastalığı kontrol altında tutmak, semptomları hafifletmek

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM YAN ETKİLER VE KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Kemik iliği baskılanması (miyelosupresyon): Beyaz küre (nötropeni), trombosit (trombositopeni) ve kırmızı küre (anemi) sayılarının düşmesi — enfeksiyona yatkınlık, kanama eğilimi ve yorgunluk oluşur. Nötropenik ateş (38°C üzeri ateş + düşük nötrofil sayısı) tıbbi acil durumudur; derhal başvurunuz.
• Bulantı ve kusma: En sık yan etkilerden biridir. Tedavi öncesi ve sonrasında antiemetik ilaçlar reçetelenir; şiddet protokole ve bireye göre değişir.
• Mukozit ve ağız yaraları: Ağız, boğaz ve sindirim yolunun iç yüzeyinde ağrılı yaralar oluşabilir; düzenli ağız bakımı önemlidir.
• Saç dökülmesi (alopesi): Birçok kemoterapik ajana bağlı olarak gelişir; tedavi tamamlandıktan sonra genellikle yeniden çıkar.
• İnfüzyon reaksiyonu: Bazı ajanlarda ilaç uygulaması sırasında döküntü, sıcaklık hissi veya nefes darlığı görülebilir; tıbbi gözetim altında gerçekleştirilir.
• Yorgunluk ve iştahsızlık: Tedavinin tamamı boyunca yaşanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM YAN ETKİLER VE KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Periferik nöropati: El ve ayaklarda uyuşma, karıncalanma, güç kaybı; özellikle platin ve taksan grubu ilaçlarda görülür. Kısmen geri dönebilir, ancak kalıcı olabilir.
• Kardiyotoksisite: Antrasiklin grubu ilaçlar (doksorubisin vb.) uzun dönemde kalp kasını etkileyebilir; ekokardiyografi ile izleme gerektirebilir.
• Fertilite kaybı: Kemoterapik ajanlar over ve testis fonksiyonunu bozabilir. Üreme çağındaki hastalarda kök hücre, yumurta veya sperm dondurma seçenekleri tedavi öncesi değerlendirilmelidir.
• Böbrek ve karaciğer toksisitesi: Bazı protokollerde organ fonksiyon testleri düzenli izlenir; doz ayarlaması gerekebilir.
• Bilişsel etki ("kemo beyni"): Uzun süreli yorgunluk ve konsantrasyon güçlüğü tedavi sonrasında haftalarca-aylarca devam edebilir.
• İkincil malignite: Çok nadir; alkilleyici ajanlara bağlı olarak yıllar sonra ikinci bir kanser gelişebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ACİL BAŞVURU GEREKTİREN DURUMLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aşağıdaki durumlarda 112'yi arayınız veya en yakın acil servise gidiniz:
• 38°C ve üzeri ateş (febril nötropeni — EN KRİTİK DURUM)
• Kontrol edilemeyen kanama veya morarma
• Ciddi nefes darlığı veya göğüs ağrısı
• Yüz, dil, boğaz şişmesi (alerjik reaksiyon)
• Şiddetli karın ağrısı, kanlı ishal veya kusma
• Bilinç bulanıklığı, şiddetli baş ağrısı

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Radyoterapi: Belirli tümör tipleri ve lokalizasyonlarında tek başına veya kemoterapi ile kombine kullanılabilir.
• Hedefe yönelik (targeted) tedavi: Tümöre özgü moleküler hedeflere karşı geliştirilmiş ilaçlar; uygun genetik profil gerektirir.
• İmmünoterapi (checkpoint inhibitörleri): Bağışıklık sistemini aktive ederek kansere karşı savaşır; seçili hastalarda etkilidir.
• Hormonal tedavi: Hormon duyarlı kanserlerde (meme, prostat) kullanılır.
• Destek (palyatif) bakım: Semptom kontrolü odaklı bakım tercih edilebilir; riskleri ve sonuçlarını hekiminizle görüşünüz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan kemoterapi protokolü; nöropati ve kardiyotoksisite dahil olası yan etkiler, febril nötropeni gibi acil durumlar, fertilite riski, alternatif tedaviler ve tedaviyi reddetmenin sonuçları hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "doku-biyopsisi-onam": {
    icerik: `DOKU BİYOPSİSİ VE PATOLOJİ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan doku biyopsisi işlemi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Biyopsi; tanı amacıyla vücuttaki bir bölgeden hücre veya doku örneği alınması işlemidir. Alınan örnek patoloji laboratuvarında incelenerek lezyonun iyi huylu (benign) veya kötü huylu (malign) olup olmadığı belirlenir; tedavi planlaması bu sonuca göre yapılır.

Biyopsi bölgesi          : .......................................
Yöntem                   : □ İnce iğne aspirasyonu (FNA)  □ Core/Tru-cut (kalın iğne)
                           □ Punch biyopsi (deri)  □ Eksizyonel biyopsi  □ Endoskopik biyopsi
Görüntüleme rehberliği   : □ Ultrasonografi  □ Bilgisayarlı tomografi  □ MRI  □ Palpasyon
Lokal anestezi           : □ Uygulanacak  □ Gerekmez

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Ağrı ve hassasiyet: İşlem bölgesinde birkaç gün süren hafif-orta ağrı beklenen bir bulgudur; ağrı kesiciyle yönetilir.
• Kanama ve hematom: Biyopsi bölgesinde kanama ve çürük oluşabilir. Antikoagülan kullananlar ile pıhtılaşma bozukluğu olanlarda risk artar; küçük hematomlar kendiliğinden çözülür.
• Enfeksiyon: Nadir görülür; ateş, kızarıklık, şişlik ve pürülan akıntı bulguları gelişirse hekime başvurulmalıdır.
• Pnömotoraks (akciğer biyopsilerinde): Akciğer veya plevra biyopsisinde nadir de olsa hava kaçağı gelişebilir; göğüs ağrısı ve nefes darlığı gelişirse acile başvurunuz.
• Vazovagal reaksiyon: İşlem sırasında ani tansiyon düşmesi, bayılma hissi görülebilir; pozisyon değişikliği ile düzelir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Yetersiz/tanı dışı örnek: %5–15 oranında yeterli doku elde edilemeyebilir; tekrar biyopsi gerekebilir.
• Tümör ekim riski (needle track seeding): Core biyopsilerde çok nadir görülen bir durumdur; deneyimli ellerde görüntüleme rehberliğiyle riski en aza indirilir.
• Yara izi (skar): Eksizyonel veya punch biyopsilerinde kalıcı iz oluşabilir; hipertrofik skar veya keloid kişiye ve bölgeye bağlı gelişebilir.
• Organ/yapı hasarı: Biyopsi bölgesine yakın damar, sinir veya organlara zarar verme ihtimali çok nadir olmakla birlikte mevcuttur; görüntüleme rehberliği bu riski önemli ölçüde azaltır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. SONUÇ SÜRECİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patoloji raporu genellikle 5–10 iş gününde hazır olur. İmmünohistokimyasal (IHK) boyamalar, moleküler genetik veya özel kültür testleri gerektiğinde ek 5–14 iş günü daha sürebilir. Sonuçlarınızı hekiminiz sizi arayarak veya kontrol muayenesinde sizinle paylaşacaktır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. ALTERNATİF YAKLAŞIMLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Görüntüleme ile izlem: Küçük, düşük riskli lezyonlarda belirli aralıklarla görüntüleme takibi tercih edilebilir.
• Eksizyonel (cerrahi) biyopsi: Lezyon küçükse tanı amacıyla tamamı çıkarılabilir; hem tanı hem de tedavi sağlanmış olur.
• Sıvı biyopsisi (liquid biopsy): Bazı kanserlerde kanda dolaşan tümör DNA'sı araştırılabilir; henüz tüm lezyonlarda standart değildir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan biyopsi işlemi; kanama, enfeksiyon ve organ hasarı gibi olası komplikasyonlar, yetersiz örnek alınması ihtimali, patoloji sonuç süreci ve alternatif yaklaşımlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "paliatif-bakim-onam": {
    icerik: `PALYATİF BAKIM VE DESTEK TEDAVİ ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun, Hasta Hakları Yönetmeliği ve Palyatif Bakım Hizmetlerinin Uygulama Usul ve Esasları Hakkında Yönetmelik kapsamında palyatif bakım programına alınmanız hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. PALYATİF BAKIMIN TANIMI VE KAPSAMI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Palyatif bakım; yaşamı tehdit eden hastalıklarda hastanın ve ailesinin yaşam kalitesini iyileştirmeye odaklanan, ağrı ve diğer semptomları kontrol altına alan, psikolojik, sosyal ve manevi destek sunan bütüncül bir yaklaşımdır. Palyatif bakım; küratif (tedavi edici) tedavinin yanında uygulanabileceği gibi, tedavinin artık mümkün olmadığı durumlarda birincil yaklaşım olarak da tercih edilebilir.

Palyatif bakım programı kapsamındaki hizmetler:
• Ağrı ve semptom yönetimi (opioid analjezikler dahil)
• Nefes darlığı, bulantı, halsizlik, uyku sorunlarının kontrolü
• Beslenme ve hidrasyon desteği
• Psikolojik ve psikiyatrik destek
• Sosyal hizmet ve aile danışmanlığı
• Manevi/spiritüel destek
• Bakımın ev, hastane veya yatılı palyatif merkez ortamında sürdürülmesi

Bakımın planlandığı ortam: □ Hastane yatağı  □ Palyatif bakım merkezi  □ Evde bakım

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. OPİOİD ANALJEZİKLER HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ağrı yönetiminde morfin, oksikodon, fentanil gibi opioid (güçlü ağrı kesici) ilaçlar kullanılabilir. Bu ilaçların terapötik dozlarda kullanımı medikal açıdan kabul görmekte olup ağrı kontrolü için zorunlu olabilir.

Olası etkiler: Uyku hali, kabızlık (düzenleyicilerle yönetilir), bulantı (başlangıçta), solunum baskılanması (yüksek dozlarda). Dozlar bireyin ağrı düzeyine göre hekim tarafından ayarlanır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. İLERİ DÖNEM BAKIM KARARLARI (DNR/DNİ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Palyatif bakım sürecinde kalp durması veya solunum yetmezliği gibi acil durumlarda uygulanacak girişimler (kardiyopulmoner resüsitasyon — CPR, mekanik ventilatör bağlantısı) hasta ve aile ile ayrıca görüşülür.

□ Tam resüsitasyon uygulanmasını istiyorum
□ Yalnızca konfor odaklı bakım istiyorum (DNR — Resüsitasyon yapılmasın)
□ Bu konuyu ilerleyen süreçte ailemle birlikte tekrar görüşmek istiyorum

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. HASTA HAKLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Palyatif bakımı istediğiniz zaman reddedebilir veya programdan çıkabilirsiniz; bu kararınız diğer tedavilerinizi etkilemez.
• İkinci görüş alma ve farklı bir palyatif bakım merkezine başvurma hakkınız her zaman mevcuttur.
• Karar verme yetinizi geçici olarak yitirmeniz durumunda önceden belirttiğiniz tercihleriniz (önceden beyan belgesi) dikkate alınır.
• Ailenizin bakım sürecine katılımı hakkında tercihlerinizi belirtebilirsiniz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından palyatif bakım yaklaşımı, opioid analjeziklerin kullanımı ve etkileri, ileri dönem bakım kararları (DNR/DNİ) ve hasta haklarım hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle palyatif bakım programına dahil olmayı kabul ediyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ROMATOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "biyolojik-ilac-onam": {
    icerik: `BİYOLOJİK İLAÇ TEDAVİSİ (Anti-TNF / IL-6 / JAK İnhibitörü / Biyobenzeri) ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan biyolojik ilaç tedavisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Biyolojik ilaçlar; immün sistemin belirli inflamatuvar yollarını hedef alan, protein bazlı tedavilerdir. Romatoid artrit, ankilozan spondilit, psöriatik artrit, inflamatuvar bağırsak hastalıkları ve diğer otoimmün hastalıklarda, konvansiyonel tedavilere yeterli yanıt alınamadığında kullanılır.

Planlanan ilaç/sınıf      : .......................................
Etki mekanizması          : □ Anti-TNF  □ Anti-IL-6  □ Anti-IL-17  □ Anti-IL-12/23
                            □ JAK inhibitörü  □ Anti-CD20  □ Diğer: .................
Uygulama şekli            : □ Subkütan (SC) enjeksiyon  □ IV infüzyon  □ Oral
Uygulama sıklığı          : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Enjeksiyon/infüzyon bölgesi reaksiyonu: Kızarıklık, şişlik, ağrı ve kaşıntı; genellikle hafif ve geçicidir.
• Akut infüzyon reaksiyonu: Ateş, titreme, baş ağrısı, bulantı; önceden premedikasyon uygulanır.
• Enfeksiyonlar (erken): Üst solunum yolu, idrar yolu, cilt enfeksiyonları sık görülür; bağışıklık baskılanmasına bağlı.
• Alerjik reaksiyon: Nadir de olsa anafilaksi görülebilir; uygulamalar tıbbi gözetim altında yapılır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tüberküloz (TB) reaktivasyonu: Anti-TNF ilaçlar latent TB'yi aktive edebilir. Tedavi öncesi PPD ve/veya IGRA testi zorunludur; latent TB saptanırsa önce profilaktik antibiyotik başlanır.
• Fırsatçı enfeksiyonlar: Herpes zoster, mantar enfeksiyonları, Pneumocystis jirovecii pnömonisi (JAK inhibitörleri ve yoğun baskılamada) görülebilir.
• Hepatit B reaktivasyonu: HBsAg veya anti-HBc pozitif hastalarda tedavi öncesi hepatoloji konsültasyonu ve antiviral profilaksi gerekebilir.
• Malignite riski: Lenfoma ve deri kanseri riskinde çok düşük düzeyde artış bildirilmiştir; uzun dönemli izlem önerilir.
• Kalp yetmezliğinin kötüleşmesi: Anti-TNF ilaçlar konjestif kalp yetmezliğinde kontrendike veya dikkatli kullanılmalıdır.
• Nörolojik komplikasyonlar: Demyelinizan hastalıkların kötüleşmesi çok nadir görülür (anti-TNF'de kontrendikasyon).
• İlaç indüklenmiş lupus: Nadir; özellikle anti-TNF ile bildirilmiştir; ilaç kesilince geriler.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. TEDAVİ ÖNCESİ ZORUNLU TESTLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ TB taraması (PPD / IGRA)
□ Hepatit B serolojisi (HBsAg, anti-HBs, anti-HBc)
□ Hepatit C serolojisi
□ Tam kan sayımı
□ Biyokimya (KC, böbrek fonksiyonları)
□ ANA, anti-dsDNA (gerektiğinde)
□ Gebelik testi (üreme çağındaki kadınlarda)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Konvansiyonel DMARD'lar: Metotreksat, leflunomid, hidroksiklorokin, sülfasalazin — daha az etkin, daha düşük maliyetli.
• Başka bir biyolojik ilaç veya sınıf: Yeterli yanıt alınamazsa farklı etki mekanizmalı ajana geçilebilir.
• Kortikosteroidler: Kısa vadeli akut flarede etkili; uzun dönem yan etkileri nedeniyle sürekli kullanım önerilmez.
• Fizik tedavi ve rehabilitasyon: İlaç tedavisine destek olarak fonksiyonel kapasiteyi artırır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan biyolojik ilaç tedavisi; TB reaktivasyonu, fırsatçı enfeksiyonlar, hepatit B reaktivasyonu ve malignite riski dahil olası komplikasyonlar, zorunlu tarama testleri, alternatif tedaviler ve tedaviyi reddetmenin sonuçları hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "romatoloji-enjeksiyon": {
    icerik: `EKLEM İÇİ KORTİKOSTEROİD / VİSKOSÜPLEMAN ENJEKSİYON ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan eklem içi enjeksiyon işlemi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Eklem içi enjeksiyonda, iltihaplanma veya kıkırdak yıpranması gösteren eklem boşluğuna ilaç uygulanır. İki ana yöntem kullanılır:

• Kortikosteroid enjeksiyonu: Metilprednizolon, betametazon gibi güçlü antiinflamatuvar ilaçlar eklem içine verilir. Romatoid artrit, gut, psöriatik artrit ve akut alevlenmelerde etkilidir; etki genellikle 2–8 hafta sürer.
• Viskosüpleman (hyalüronik asit) enjeksiyonu: Eklem sıvısının yıkanan kayganlaştırıcı özelliğini yenileyen biyolojik bir maddedir; diz osteoartritinde tercih edilir. Etki 3–6 aya kadar uzayabilir.

Enjeksiyon yapılacak eklem   : .......................................
Uygulanan ilaç/ürün          : □ Kortikosteroid  □ Hyalüronik asit  □ PRP  □ Diğer: .......
Görüntüleme rehberliği       : □ USG eşliğinde  □ Anatomik (palpasyon ile)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Post-enjeksiyon alevlenmesi (crystal flare): İşlemden sonraki 12–48 saatte ağrı ve şişlik artabilir; 1–2 günde kendiliğinden geçer. Kortikosteroid kristallerine bağlıdır; soğuk uygulama ve ağrı kesici ile yönetilir.
• Kanama ve ekimoz: İnce iğne kullanılmasına karşın enjeksiyon bölgesinde çürük oluşabilir.
• Vazovagal reaksiyon: İşlem sırasında baygınlık hissi, terleme, bulantı görülebilir; yatış pozisyonunda düzelir.
• Geçici ağrı artışı: Lokal anestezi enjeksiyonuna bağlı kısa süreli ağrı beklenir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Septik artrit (eklem enfeksiyonu): Son derece nadir (<1/10.000); steril teknikle riski en aza indirilir. Eklemde şiddetli ağrı, ısı artışı ve ateş gelişirse acilen başvurunuz.
• Cilt atrofisi ve depigmentasyon: Kortikosteroidin subkütan dokuya kaçması durumunda deride incelme ve açık renk leke oluşabilir; derin enjeksiyon tekniğiyle önlenir.
• Tendon hasarı veya rüptürü: Tendon içine veya çok yakınına yapılan enjeksiyonda yırtık riski artar; doğru anatomik hedefleme veya USG rehberliği ile önlenir.
• Kan şekeri yükselmesi: Diyabetik hastalarda kortikosteroid enjeksiyonu sonrası 24–72 saat kan şekeri yükselebilir; glükoz takibi önerilir.
• Kıkırdak hasarı: Aynı ekleme çok sık (yılda 3–4'ten fazla) kortikosteroid enjeksiyonu kıkırdağa zarar verebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Oral antiinflamatuvar ilaçlar (NSAİİ): Sistemik etki sağlar; mide, böbrek ve kardiyovasküler yan etkileri mevcuttur.
• Fizik tedavi ve egzersiz: Eklem çevresindeki kas gücünü artırır; uzun vadede ağrıyı azaltır.
• Ortez ve yük aktarma: Özellikle diz OA'da yük azaltıcı önlemler ağrıyı hafifletir.
• Cerrahi (artroskopi, protez): Konservatif tedavilere yanıt alınamayan ileri vakalarda değerlendirilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından planlanan eklem içi enjeksiyon işlemi; post-enjeksiyon alevlenmesi, septik artrit riski, cilt atrofisi ve tendon hasarı gibi olası komplikasyonlar, diyabetiklerde kan şekeri takibinin önemi ve alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ENDOKRİNOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "tiroid-biyopsi-onam": {
    icerik: `TİROİD İNCE İĞNE ASPİRASYON BİYOPSİSİ (TİİAB) ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında planlanan tiroid ince iğne aspirasyon biyopsisi hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. İŞLEM HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TİİAB (Tiroid İnce İğne Aspirasyon Biyopsisi); ultrasonografi eşliğinde, tiroid bezindeki şüpheli bir nodülden ince bir iğne ile hücre ve sıvı örneği alınması işlemidir. İşlem genellikle 10–20 dakika sürer; lokal anestezi çoğunlukla gerekmez ancak hasta talebine göre uygulanabilir. Alınan örnek sitoloji laboratuvarında incelenerek nodülün niteliği belirlenir.

Biyopsi yapılacak nodül       : □ Sağ lob  □ Sol lob  □ İstmus
Nodül boyutu (tahmini)        : .......................................
Görüntüleme rehberliği        : □ USG eşliğinde (standart)
Lokal anestezi                : □ Uygulandı  □ Uygulanmadı

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Ağrı ve hassasiyet: İğne giriş bölgesinde ve boyun ön yüzünde 1–2 gün süren hafif ağrı beklenen bir bulgudur.
• Kanama ve hematom: Tiroid bezi damardan zengin bir organ olduğundan bölgede çürük ve hematom oluşabilir. Küçük hematomlar 5–10 dakika baskıyla kontrol altına alınır; büyük hematom boyunda baskı hissi yapabilir — acilen bildiriniz.
• Vasovagal reaksiyon: İşlem sırasında baygınlık hissi, terleme, solgunluk görülebilir; yatış pozisyonunda geçer.
• Enfeksiyon: Son derece nadir; ateş ve boyunda artan şişlik gelişirse hekime başvurunuz.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM KOMPLİKASYONLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Yetersiz/tanı dışı örnek (nondiagnostik): %5–15 oranında yeterli hücre elde edilemeyebilir; ikinci bir TİİAB gerekebilir. Nodül tipi, büyüklüğü ve kistik bileşen bu riski artırabilir.
• Geçici ses kısıklığı: Larenks siniri yakınındaki nodüllerde iğnenin sinire değmesi durumunda kısa süreli ses kısıklığı gelişebilir; genellikle kendiliğinden geçer.
• Yanlış negatif/pozitif sonuç: Tüm sitolojik işlemlerde olduğu gibi nadir de olsa yanlış sonuç ihtimali mevcuttur. Bu nedenle Bethesda III–IV kategorilerinde tekrar biyopsi veya cerrahi rezeksiyon gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. BETHESDA SINIFLANDIRMASI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patoloji sonucu Bethesda Sistemi'ne göre 6 kategoride raporlanır:

• Bethesda I  — Nondiagnostik/yetersiz örnek (tekrar biyopsi önerilir)
• Bethesda II — İyi huylu (%0–3 malignite riski)
• Bethesda III — Önemi belirsiz atipi/foliküler lezyon (AUS/FLUS; %~10–30)
• Bethesda IV — Foliküler neoplazi şüphesi (%25–40)
• Bethesda V  — Malignite şüphesi (%50–75)
• Bethesda VI — Malign (%97–99)

Sonucunuzu hekiminiz izlem ve tedavi önerileriyle birlikte sizinle paylaşacaktır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. ALTERNATİF YAKLAŞIMLAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Ultrasonografi ile izlem: Düşük riskli nodüllerde 6–12 aylık görüntüleme takibi yeterli olabilir; büyüme veya şüpheli özellik gelişirse biyopsi yapılır.
• Core biyopsi: Kalın iğne ile doku örneği alınır; sitoloji yetersiz kalan durumlarda tercih edilebilir, daha fazla komplikasyon riski taşır.
• Cerrahi eksizyon: Bethesda IV–VI kategorilerinde veya tekrarlayan yetersiz örneklerde tiroid cerrahisi (tiroidektomi, lobektomi) planlanabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından TİİAB işlemi; hematom, ses kısıklığı ve yetersiz örnek riski dahil olası komplikasyonlar, Bethesda sınıflandırması ve sonraki adımlar ile alternatif yaklaşımlar hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu işleme onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },

  "insülin-baslama-onam": {
    icerik: `İNSÜLİN VE ANTİDİYABETİK İLAÇ BAŞLAMA ONAM FORMU

Sayın Hastamız,

Bu form, 1219 Sayılı Kanun ve Hasta Hakları Yönetmeliği kapsamında insülin veya yeni antidiyabetik ilaç tedavisine başlanması hakkında sizi bilgilendirmek ve onayınızı almak amacıyla düzenlenmiştir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. TEDAVİ HAKKINDA BİLGİLENDİRME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diyabet; pankreasın yeterli insülin üretememesi veya vücudun insüline direnç göstermesi sonucu kan şekerinin kronik yüksek seyrettiği metabolik bir hastalıktır. Kan şekerinin uzun süreli yüksek kalması; böbrek, göz, sinir ve kalp-damar hasarına yol açabilir. Hedeflenen kan şekeri denetimi bu komplikasyonları önlemenin temel yoludur.

Başlanan tedavi türü:
□ Bazal insülin (uzun etkili)
□ Bazal-bolus insülin rejimi
□ Hazır karışım (premiks) insülin
□ İnsülin pompası (CSII)
□ GLP-1 reseptör agonisti
□ SGLT-2 inhibitörü
□ DPP-4 inhibitörü
□ Diğer: .......................................

Önerilen ilaç/doz/uygulama bölgesi  : .......................................
Uygulama saati                       : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ERKEN DÖNEM RİSKLER VE YAN ETKİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hipoglisemi (kan şekeri düşüklüğü): En sık ve en önemli yan etkidir. Titreme, terleme, çarpıntı, baş dönmesi, bilinç bulanıklığı; doz fazlalığı, öğün atlamak veya aşırı egzersizle tetiklenebilir. Hafif hipoglisemide 15 g hızlı etkili karbonhidrat (şeker, meyve suyu, glikoz jeli) tüketin, 15 dakika bekleyin ve ölçün; şiddetli/bilinç kayıplı hipoglisemide glukagon enjeksiyonu yapın veya 112'yi arayın.
• Enjeksiyon bölgesi reaksiyonu: Kızarıklık, şişlik, hafif ağrı — geçicidir; bölge rotasyonu ile azaltılır.
• Bulantı ve ishal (GLP-1 agonistleri): Tedavinin ilk haftalarında sık görülür, zamanla azalır.
• İdrar yolu enfeksiyonu ve genital mantar (SGLT-2 inhibitörleri): Glükozun idrarla atılmasına bağlı gelişir; hijyen önerileri önemlidir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. GEÇ DÖNEM RİSKLER VE YAN ETKİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Lipohipertrofi: Aynı bölgeye tekrarlayan enjeksiyon sonucu deri altı yağ dokusunda sertleşme/şişlik. Bu bölgeye yapılan enjeksiyonlarda emilim düzensizleşir; rotasyon ile önlenir.
• Kilo artışı: İnsülin ve bazı antidiyabetik ilaçlar kilo alımına neden olabilir; diyet ve egzersiz programı eşliğinde yönetilir.
• Diyabetik ketoasidoz (DKA — özellikle Tip 1): İnsülinin atlanması veya doz yetersizliğinde kandaki keton artışı ile gelişen ciddi durumdur; karın ağrısı, bulantı, kusma ve derin nefes ile belirir — acil başvuru gerektirir.
• Ödem: İnsülin başlangıcında sodyum tutulumuna bağlı hafif bacak ödemi görülebilir; genellikle kendiliğinden geçer.
• Böbrek ve karaciğer yetmezliğinde doz ayarı: Organ fonksiyonlarına göre insülin dozunun yeniden düzenlenmesi gerekebilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. EĞİTİM VE ÖZ-YÖNETİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• İnsülin enjeksiyon tekniği (doğru açı, deri altı uygulama, hava kabarcığı çıkarma) eğitimi verilecektir.
• Kan şekeri ölçüm cihazı (glukömetre) kullanımı öğretilecektir.
• Hedef kan şekeri aralıkları ve günlük ölçüm sıklığı hekiminiz tarafından belirlenecektir.
• Seyahat, egzersiz ve hastalık dönemlerinde doz ayarı konusunda bilgilendirme yapılacaktır.
• Hipoglisemi planı (hızlı şeker kaynağı bulundurma, glukagon eğitimi) oluşturulacaktır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. İZLEM PLANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• HbA1c: Her 3 ayda bir (doz ayarı tamamlanınca 6 ayda bir)
• Açlık ve tokluk kan şekeri: Hekim önerdiği sıklıkta
• Böbrek fonksiyon testleri ve idrar mikroalbümin: Yılda en az bir kez
• Lipid profili ve karaciğer enzimleri: Yılda bir
• Göz dibi (retina) muayenesi: Yılda bir
• Ayak muayenesi: Her kontrolde

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ALTERNATİF TEDAVİLER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Yaşam tarzı değişikliği (diyet + egzersiz): Özellikle Tip 2 diyabette erken evrede kan şekerini kontrol edebilir.
• Oral antidiyabetikler: Metformin ve diğer sınıflar — insülinsiz bir seçenek; kontrendikasyon ve etkinliğe göre tercih edilir.
• Bariatrik cerrahi: Obez Tip 2 diyabetlilerde remisyon sağlayabilir; uygun hastalarda seçenek oluşturabilir.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. HASTA BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekimim tarafından başlanacak insülin/antidiyabetik ilaç tedavisi; hipoglisemi başta olmak üzere erken ve geç dönem riskler, enjeksiyon tekniği, izlem planı ve alternatif tedaviler hakkında yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu. Baskı altında kalmaksızın kendi özgür irademle bu tedaviye onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad     : .......................................
Doğum Tarihi : .......................................
İmza         : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTANIN YASAL TEMSİLCİSİ (gerektiğinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad          : .......................................
Yakınlık Derecesi : .......................................
İmza              : ....................   Tarih: ..............   Saat: ..........

Yasal temsilciden onam alınma nedeni:
□ Hastanın bilinci kapalı          □ Hasta 18 yaşından küçük   □ Diğer: ..............
□ Hastanın karar verme yetisi yok  □ Acil

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ŞAHİT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BİLGİLENDİRMEYİ YAPAN HEKİM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERCÜMAN (ihtiyaç halinde)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad : .......................................
İmza     : ....................   Tarih: ..............   Saat: ..........`,
  },
};

// Şablon yoksa varsayılan form oluştur
function varsayilanForm(form) {
  return `${form.baslik.toUpperCase()}

Değerli Hastamız,

Bu form ${form.kategori} alanında ${form.aciklama.toLowerCase()} için hazırlanmıştır.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HASTA BİLGİLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ad Soyad      : .......................................
T.C. Kimlik No : .......................................
Doğum Tarihi  : .......................................
Telefon       : .......................................
E-posta       : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AYDINLATILMIŞ ONAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aşağıda imzası bulunan ben, ................................................ (ad soyad),
hekimim tarafından planlanan işlem/tedavi hakkında yeterli bilgi aldım.

Önerilen işlemin amacını, risklerini, alternatiflerini ve tedaviyi reddetmenin
sonuçlarını anladım. Sorularımı sorma fırsatım oldu ve tatmin edici yanıtlar aldım.

Kendi isteğimle ve baskı altında kalmaksızın bu işleme/tedaviye ONAY VERİYORUM.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında verilerimin işlenmesine onay veriyorum.

Ad Soyad   : .......................................
Tarih      : .......................................
İmza       : .......................................

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEKİM BEYANI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hastayı yukarıda belirtilen işlem/tedavi hakkında yeterince bilgilendirdim.
Hastanın tüm sorularını yanıtladım ve onamını aldım.

Hekim Adı   : .......................................
Uzm. Alanı  : .......................................
Tarih       : .......................................
İmza/Kaşe   : .......................................`;
}

// Placeholder değiştirici — tüm form alanlarını gerçek değerlerle doldurur
function formDoldur(metin, { hekimAdi, diplomaNo, sicilNo, tarih, hastaAdi, hastaTc, hastaVasi, hastaTabin }) {
  // 1. Hekim / Anestezist / Uzman adı
  metin = metin.replace(
    /(Hekim\/Yetkili Adı\s*:|Hekim Adı\/Unvanı\s*:|Hekim Adı\s*:|Anestezist Adı\/Unvanı\s*:|Uzman Adı\/Unvanı\s*:)\s*[._]{5,}/g,
    (_, l) => `${l} ${hekimAdi}`
  );

  // 2. Diploma no → artı sicil/tescil no satırı ekle
  metin = metin.replace(/(Diploma No\s*:)\s*[._]{5,}/g,
    (_, l) => `${l} ${diplomaNo || ".".repeat(20)}\nSicil/Tescil No     : ${sicilNo || ".".repeat(20)}`
  );

  // 3. Tarih/İmza/Kaşe + hekim sözlü bilgilendirme beyanı
  metin = metin.replace(/(Tarih\/İmza\/Kaşe\s*:)\s*[._]{5,}/g,
    (_, l) => `Hastayı planlanan işlem hakkında sözlü olarak bilgilendirdim, sorularını yanıtladım ve yazılı onamını aldım.\n${l} ${tarih}  _____________ / _______________`
  );

  // 4. Tarih/İmza (psikoloji formu — kaşe yok)
  metin = metin.replace(/(Tarih\/İmza\s*:)\s*[._]{5,}/g,
    (_, l) => `${l} ${tarih}  _____________ / _______________`
  );

  // 5. Hasta ad soyad + tarih (aynı satır — nokta versiyonu)
  metin = metin.replace(/(Ad Soyad\s*:)\s*[._]{5,}(\s+Tarih:\s*)[._]{5,}/g,
    (_, l1, mid) => `${l1} ${hastaAdi || ".".repeat(30)}${mid}${tarih}`
  );

  // 6. Hasta ad soyad + tarih (aynı satır — alt çizgi versiyonu, genel-muayene)
  metin = metin.replace(/(Ad Soyad:)\s*[_]{10,}(\s+Tarih:\s*)[_]{5,}/g,
    (_, l1, mid) => `${l1} ${hastaAdi || "_".repeat(25)}${mid}${tarih}`
  );

  // 7. T.C. Kimlik No + İmza (nokta)
  metin = metin.replace(/(T\.C\. Kimlik No\s*:)\s*[._]{5,}(\s+İmza\s*:)/g,
    (_, l1, l2) => `${l1} ${hastaTc || ".".repeat(30)}${l2}`
  );

  // 8. T.C. Kimlik No + İmza (alt çizgi, kvkk/genel)
  metin = metin.replace(/(T\.C\. Kimlik No:)\s*[_]{10,}(\s+İmza:)/g,
    (_, l1, l2) => `${l1} ${hastaTc || "_".repeat(25)}${l2}`
  );

  // 9. Veli/Vasi + İmza
  metin = metin.replace(/(Veli\/Vasi[^:\n]*:|Vasi\/Yakını\s*:)\s*[._]{5,}(\s+İmza\s*:)/g,
    (_, l1, l2) => `${l1} ${hastaVasi || ".".repeat(30)}${l2}`
  );

  // 10. Yakını ... İmza (ortopedi/bilinç)
  metin = metin.replace(/(Yakını[^:\n]*:)\s*[._]{5,}(\s+İmza\s*:)/g,
    (_, l1, l2) => `${l1} ${hastaVasi || ".".repeat(30)}${l2}`
  );

  // 11. Yakını (18 yaş altı) + Yakın İmzası (genel-muayene)
  metin = metin.replace(/(Yakını \(18 yaş altı\):)\s*[_]+([ ]+Yakın İmzası:)/g,
    (_, l1, l2) => `${l1} ${hastaVasi || "_".repeat(20)}${l2}`
  );

  // 12. Ebeveyn/Vasi adı
  metin = metin.replace(/(Ebeveyn\/Vasi Adı Soyadı\s*:)\s*[._]{5,}/g,
    (_, l) => `${l} ${hastaVasi || ".".repeat(30)}`
  );

  // 13. Tanık imzası — hekim bölümünden hemen önce enjekte et
  const tanikSatiri = `Tanık Adı Soyadı (imza yetersizse) : ${hastaTabin ? hastaTabin.padEnd(28) : ".".repeat(28)}    İmza : ................`;
  const hekimBolumu = /(\n{1,3})((?:Hekim(?:\/Yetkili)? Adı|Anestezist Adı)[^\n]*:)/;
  if (hekimBolumu.test(metin)) {
    metin = metin.replace(hekimBolumu, (_, nl, hLine) => `\n${tanikSatiri}${nl}${hLine}`);
  }

  // 14. Tek başına Tarih satırı (satır başında)
  metin = metin.replace(/^(Tarih\s*:)\s*[._]{5,}/gm,
    (_, l) => `${l} ${tarih}`
  );

  return metin;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formHtml(baslik, icerik) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8"/>
  <title>${escapeHtml(baslik)}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; font-size: 13px; line-height: 1.8; color: #1a1a1a; }
    h1 { font-size: 16px; text-align: center; border-bottom: 2px solid #0E7C7B; padding-bottom: 12px; margin-bottom: 24px; }
    pre { white-space: pre-wrap; font-family: inherit; }
    .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 12px; font-size: 11px; color: #666; text-align: center; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>${escapeHtml(baslik)}</h1>
  <pre>${escapeHtml(icerik)}</pre>
  <script>window.onload=function(){window.print();window.onafterprint=function(){window.close();}}<\/script>
</body>
</html>`;
}

export default function FormIcerik({ form, hekim }) {
  const yazdirilacakRef = useRef(null);
  const bugunStr = new Date().toLocaleDateString("tr-TR");

  const [hasta, setHasta] = useState({ ad: "", tc: "", vasi: "", tanik: "" });
  const [tarih, setTarih] = useState(bugunStr);

  function yazdir() {
    try {
      const hamIcerik = FORM_SABLONLARI[form.id]?.icerik || varsayilanForm(form);
      const doldurulmus = formDoldur(hamIcerik, {
        hekimAdi: hekim?.adUnvan || "",
        diplomaNo: hekim?.diplomaNo || "",
        sicilNo: hekim?.sicilNo || "",
        tarih,
        hastaAdi: hasta.ad,
        hastaTc: hasta.tc,
        hastaVasi: hasta.vasi,
        hastaTabin: hasta.tanik,
      });
      const blob = new Blob([formHtml(form.baslik, doldurulmus)], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const pencere = window.open(url, "_blank");
      if (!pencere) { alert("Lütfen tarayıcı popup engelini kaldırın."); return; }
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      alert("Form oluşturulurken hata: " + err.message);
      console.error(err);
    }
  }

  const sablonIcerik = FORM_SABLONLARI[form.id]?.icerik || varsayilanForm(form);

  return (
    <div>
      {/* Başlık */}
      <div className="mb-6">
        <a href="/hasta-formlari" style={{ color: "#0E7C7B" }} className="text-sm hover:underline">← Tüm Formlar</a>
        <h1 style={{ color: "#0D2137" }} className="text-xl font-bold mt-2">{form.baslik}</h1>
        <p className="text-gray-400 text-sm mt-1">{form.aciklama}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Sağ panel (hasta + hekim bilgileri) ── */}
        <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Form Bilgileri</p>

              {/* Tarih */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">Form Tarihi</label>
                <input
                  type="text"
                  value={tarih}
                  onChange={(e) => setTarih(e.target.value)}
                  placeholder="GG.AA.YYYY"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Hasta bilgileri */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 mt-4">Hasta Bilgileri</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    value={hasta.ad}
                    onChange={(e) => setHasta((p) => ({ ...p, ad: e.target.value }))}
                    placeholder="Hasta adı soyadı"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">T.C. Kimlik No</label>
                  <input
                    type="text"
                    value={hasta.tc}
                    onChange={(e) => setHasta((p) => ({ ...p, tc: e.target.value }))}
                    placeholder="00000000000"
                    maxLength={11}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Veli / Vasi / Yakını</label>
                  <input
                    type="text"
                    value={hasta.vasi}
                    onChange={(e) => setHasta((p) => ({ ...p, vasi: e.target.value }))}
                    placeholder="(varsa) ad soyad"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tanık (imza yetersizse)</label>
                  <input
                    type="text"
                    value={hasta.tanik}
                    onChange={(e) => setHasta((p) => ({ ...p, tanik: e.target.value }))}
                    placeholder="(varsa) tanık ad soyad"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              {/* Hekim bilgileri (read-only) */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 mt-5">Hekim (Otomatik)</p>
              <div className="space-y-2">
                <div className="bg-gray-50 rounded-xl px-3 py-2">
                  <p className="text-xs text-gray-400">Ad / Unvan</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{hekim?.adUnvan || "—"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-3 py-2">
                  <p className="text-xs text-gray-400">Diploma No</p>
                  <p className="text-sm font-medium text-gray-800">{hekim?.diplomaNo || "—"}</p>
                </div>
                <div className={`rounded-xl px-3 py-2 ${hekim?.sicilNo ? "bg-gray-50" : "bg-yellow-50 border border-yellow-100"}`}>
                  <p className="text-xs text-gray-400">Sicil / Tescil No</p>
                  <p className="text-sm font-medium text-gray-800">{hekim?.sicilNo || "—"}</p>
                  {!hekim?.sicilNo && (
                    <p className="text-xs text-yellow-600 mt-0.5">Profilden ekleyebilirsiniz</p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={yazdir}
              style={{ backgroundColor: "#0D2137" }}
              className="w-full flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90"
            >
              🖨️ Yazdır / PDF İndir
            </button>
          </div>
        </div>

        {/* ── Sol: form önizleme ── */}
        <div className="flex-1 min-w-0">
      {/* Form İçeriği */}
      <div
        ref={yazdirilacakRef}
        id="yazdirilacak-form"
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
      >
        <div className="text-center mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="0.6" opacity="0.35"/>
              <line x1="16" y1="2.5" x2="16" y2="5.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <line x1="16" y1="26.5" x2="16" y2="29.5" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <line x1="2.5" y1="16" x2="5.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <line x1="26.5" y1="16" x2="29.5" y2="16" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              <polygon points="16,4.5 14,15 18,15" fill="#C9A84C"/>
              <polygon points="16,27.5 18,17 14,17" fill="white" opacity="0.5"/>
              <polygon points="4.5,16 15,14 15,18" fill="white" opacity="0.3"/>
              <polygon points="27.5,16 17,18 17,14" fill="white" opacity="0.3"/>
              <circle cx="16" cy="16" r="2" fill="white"/>
              <circle cx="16" cy="16" r="0.8" fill="#C9A84C"/>
            </svg>
            <span style={{ color: "#0D2137" }} className="font-bold">DoktorPusula</span>
          </div>
          <h2 style={{ color: "#0D2137" }} className="font-bold text-base">{form.baslik}</h2>
          <p className="text-gray-400 text-xs mt-1">doktorpusula.com | Tarih: {tarih}</p>
        </div>

        <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#374151", fontSize: "13px" }}>
          {sablonIcerik}
        </pre>

      </div>
        </div> {/* flex-1 */}
      </div> {/* flex row */}
    </div>
  );
}
