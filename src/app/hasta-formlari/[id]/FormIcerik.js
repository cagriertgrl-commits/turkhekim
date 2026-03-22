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

Bu form, 1219 sayılı Tababet ve Şuabatı San'atlarının Tarzı İcrasına Dair Kanun ve Hasta Hakları Yönetmeliği kapsamında, planlanan rinoplasti operasyonu hakkında sizi bilgilendirmek ve yazılı onayınızı almak amacıyla hazırlanmıştır.

1. PLANLANAN İŞLEM
Burun şeklini, boyutunu ve/veya solunum fonksiyonunu iyileştirmeye yönelik cerrahi operasyon. Operasyon genel veya lokal anestezi altında, kapalı (internal) veya açık (external) teknikle gerçekleştirilir.

2. OLASI RİSKLER VE KOMPLİKASYONLAR
• Kanama ve hematom oluşumu
• Enfeksiyon (antibiyotik tedavisi gerektirebilir)
• Anesteziye bağlı reaksiyonlar
• Asimetri veya estetik beklentinin karşılanamaması
• Septal perforasyon (nadir)
• Koku alma duyusunda geçici değişim
• Revizyon operasyonu ihtiyacı
• Geçici veya kalıcı his kaybı
• Derin ven trombozu (nadir)

3. ALTERNATİF YÖNTEMLER
• Dolgu enjeksiyonu ile burun şekillendirme (non-cerrahi, geçici)
• Operasyon yapılmaması

4. POSTOPERATİF SÜREÇ
Burun splinti 1–2 hafta, morluk ve şişlik 2–4 hafta sürebilir. Nihai sonuç 6–12 ayda ortaya çıkar. Alkol, sigara ve kan sulandırıcı ilaçlar operasyon öncesi kesilmelidir.

5. HASTA BEYANI
Hekimim tarafından yukarıda belirtilen operasyon, riskleri, alternatifleri ve beklenen sonuçlar hakkında Türkçe olarak yeterince bilgilendirildim. Tüm sorularımı sorma fırsatım oldu ve tatmin edici yanıtlar aldım. Kendi özgür irademle bu operasyona onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraf/video ile belgelenmesine onay veriyorum.  □ Onaylamıyorum.

Ad Soyad        : .......................................    Tarih: ................
T.C. Kimlik No  : .......................................    İmza : ................
Vasi/Yakını     : .......................................    İmza : ................

6. HEKİM BEYANI
Hastayı planlanan rinoplasti operasyonu, riskleri, alternatifleri ve beklenen sonuçlar hakkında bilgilendirdim. Tüm sorularını yanıtladım.

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },
  "liposuction-onam": {
    basliklar: ["LİPOSUCTİON (YAĞ ALIMI) AYDINLATILMIŞ ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan liposuction (lipoaspiration) işlemi hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN İŞLEM
Vücuttaki bölgesel yağ birikimlerinin özel kanüllerle vakum yardımıyla alınması işlemi. Genel veya lokal/sedasyon anestezisi altında uygulanır.

İşlem yapılacak bölge(ler): .......................................

2. RİSKLER VE KOMPLİKASYONLAR
• Kanama, hematom, seroma
• Enfeksiyon
• Cilt düzensizlikleri (dalgalanma, sertlik)
• Geçici his kaybı veya uyuşma
• Derin ven trombozu / pulmoner emboli (nadir, ciddi)
• Yağ embolisi (çok nadir, ciddi)
• Cilt nekrozu (nadir)
• Kontür asimetrisi — revizyon gerektirebilir
• Anestezi komplikasyonları

3. ÖNEMLI NOTLAR
• Liposuction kilo verme yöntemi değildir; bölgesel şekillendirme işlemidir.
• İdeal aday: Stabil kiloda, elastik derili bireyler.
• Operasyon sonrası kompresyon giysi kullanımı zorunludur (4–6 hafta).
• Kalıcı kilo alımı halinde yağ birikimi yeniden oluşabilir.

4. ALTERNATİFLER
• Diyet ve egzersiz programı
• Non-invazif yağ azaltma yöntemleri (cryolipolysis, HIFU)
• Operasyon yapılmaması

5. HASTA BEYANI
İşlem, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................
Veli/Vasi (18 yaş altı): ...........................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................
Vasi (kısıtlı/küçük ise): ........................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................
Yakını (bilinç durumu uygun değilse): ..............    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
  },
  "dermatoloji-botoks": {
    basliklar: ["BOTOKS / DOLGU UYGULAMASI ONAM FORMU"],
    icerik: `Sayın Hastamız,

Bu form, planlanan botulinum toksini (botoks) ve/veya yüz dolgusu (filler) uygulaması hakkında bilgilendirme ve onay alınması amacıyla düzenlenmiştir.

1. PLANLANAN UYGULAMA
□ Botulinum toksini (Botoks)    □ Hyalüronik asit dolgu    □ Diğer filler: .....

Uygulama bölgesi(leri): .......................................
Doz/miktar         : .......................................

2. UYGULAMANIN AMACI
Mimik kaslarının geçici felci (botoks) veya hacim kaybı/kırışıklıkların düzeltilmesi (dolgu).

3. RİSKLER VE KOMPLİKASYONLAR
Botoks:
• Enjeksiyon bölgesinde geçici ağrı, morluk, kızarıklık
• Asimetri veya beklentinin karşılanamaması
• Kaş pitozu (düşüklüğü) — geçici (nadir)
• Genel halsizlik, baş ağrısı (nadir)
• Etki süresi 3–6 ay; düzenli tekrar gerekir

Dolgu:
• Morluk, şişlik, hassasiyet (1–2 hafta)
• Enfeksiyon veya biyofilm oluşumu
• Granülom (geç dönem)
• Damar tıkanması — cilt nekrozu veya görme kaybı (çok nadir, ciddi)
• Dolgu migrasyonu (zaman içinde)

4. KONTRENDİKASYONLAR
• Gebelik ve emzirme dönemi
• Nöromusküler hastalıklar (botoks için)
• Aktif deri enfeksiyonu
• Kan sulandırıcı ilaçlar (işlem öncesi doz ayarı)

5. HASTA BEYANI
Uygulama, riskleri ve alternatifleri hakkında yeterince bilgilendirildim. Özgür irademle onay veriyorum.

□ Bilgileri okudum, anladım ve kabul ediyorum.
□ KVKK kapsamında sağlık verilerimin işlenmesine onay veriyorum.
□ Fotoğraflı belgelenmesine onay veriyorum.  □ Onaylamıyorum.

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................
Veli/Vasi (18 yaş altı): ...........................    İmza : ................

Anestezist Adı/Unvanı : .......................................
Diploma No            : .......................................
Tarih/İmza/Kaşe       : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................
Veli/Vasi (18 yaş altı): ...........................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

Ad Soyad       : .......................................    Tarih: ................
T.C. Kimlik No : .......................................    İmza : ................

Hekim Adı/Unvanı : .......................................
Diploma No       : .......................................
Tarih/İmza/Kaşe  : .......................................`,
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

function formHtml(baslik, icerik) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8"/>
  <title>${baslik}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; font-size: 13px; line-height: 1.8; color: #1a1a1a; }
    h1 { font-size: 16px; text-align: center; border-bottom: 2px solid #0E7C7B; padding-bottom: 12px; margin-bottom: 24px; }
    pre { white-space: pre-wrap; font-family: inherit; }
    .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 12px; font-size: 11px; color: #666; text-align: center; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>${baslik}</h1>
  <pre>${icerik}</pre>
  <div class="footer">DoktorPusula — doktorpusula.com | Bu form bilgilendirme amaçlıdır.</div>
</body>
</html>`;
}

export default function FormIcerik({ form, hekim }) {
  const yazdirilacakRef = useRef(null);
  const bugunStr = new Date().toLocaleDateString("tr-TR");

  const [hasta, setHasta] = useState({ ad: "", tc: "", vasi: "", tanik: "" });
  const [tarih, setTarih] = useState(bugunStr);

  function yazdir() {
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
    const pencere = window.open("", "_blank");
    if (!pencere) { alert("Lütfen tarayıcı popup engelini kaldırın."); return; }
    pencere.document.write(formHtml(form.baslik, doldurulmus) + `<script>window.onload=function(){window.print();window.onafterprint=function(){window.close();}}<\/script>`);
    pencere.document.close();
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
              <circle cx="16" cy="16" r="16" fill="#0E7C7B"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
              <polygon points="16,4 14.2,15 17.8,15" fill="#C9A84C"/>
              <polygon points="16,28 17.8,17 14.2,17" fill="white" opacity="0.6"/>
            </svg>
            <span style={{ color: "#0D2137" }} className="font-bold">DoktorPusula</span>
          </div>
          <h2 style={{ color: "#0D2137" }} className="font-bold text-base">{form.baslik}</h2>
          <p className="text-gray-400 text-xs mt-1">doktorpusula.com | Tarih: {tarih}</p>
        </div>

        <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#374151", fontSize: "13px" }}>
          {sablonIcerik}
        </pre>

        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Bu form DoktorPusula tarafından bilgilendirme amaçlı hazırlanmıştır.
            Hukuki geçerlilik için yetkili hekim onayı gereklidir. •{" "}
            <a href="mailto:hukuk@doktorpusula.com" style={{ color: "#0E7C7B" }}>hukuk@doktorpusula.com</a>
          </p>
        </div>
      </div>
        </div> {/* flex-1 */}
      </div> {/* flex row */}
    </div>
  );
}
