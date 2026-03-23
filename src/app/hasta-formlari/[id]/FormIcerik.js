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

  // ════════════════════════════════════════════════════════════════════════
  // ESTETİK CERRAHİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "meme-buyutme-onam": {
    icerik: `MEME BÜYÜTME (AUGMENTASYON MAMMOPLASTİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Meme büyütme ameliyatı (augmentasyon mammoplasti); silikon jel veya tuzlu su doldurulan implantların meme bezi altına ya da göğüs kası altına yerleştirilmesi yoluyla meme hacim ve şeklinin artırılması işlemidir.

2. AMAÇ VE BEKLENTİLER
• Meme hacminin artırılması ve simetrisinin iyileştirilmesi
• Emzirme, kilo kaybı veya yaşlanma sonrası meme dokusunun yenilenmesi
• Estetik beklentilerin doktor-hasta iletişimiyle belirlendiği öznel bir sonuçtur; kesin ölçü garantisi verilemez

3. AMELİYAT ÖNCESİ HAZIRLIK
• Aspirin ve kan sulandırıcılar 10 gün öncesinden kesilmelidir
• Sigara kullanımı yara iyileşmesini olumsuz etkiler; en az 4 hafta bırakılmalıdır
• Mamografi veya ultrasonografi istenebilir

4. OLASI RİSKLER VE KOMPLİKASYONLAR
Genel cerrahi riskleri: kanama, enfeksiyon, anestezi komplikasyonları, yara izi.
İmplanta özgü riskler:
• Kapsüler kontraktür (implant etrafında sertleşme)
• İmplant pozisyon değişikliği veya rüptürü
• Asimetri, duyu değişikliği, emzirme kapasitesinde azalma
• BIA-ALCL (implant ilişkili lenfoma — son derece nadir)
• Revizyon ameliyatı gereksinimi

5. ALTERNATİFLER
İmplant kullanmaksızın yağ enjeksiyonu, korse/medikal bra kullanımı veya cerrahi yapmama seçenekleri mevcuttur.

6. İMPLANT BİLGİSİ
Kullanılacak implant markası: ........................  Hacim: ............cc  Profil: ............
Yerleştirme planı: □ Submüsküler  □ Submammarian  □ Dual plane
Kesi yeri: □ İnframmarian  □ Periareolar  □ Aksiller

7. HASTA BEYANI
Yukarıdaki bilgileri okudum, anladım ve sorularım yanıtlandı. Meme büyütme ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................
Veli/Vasi (18 yaş altı): ...............................    Veli/Vasi İmzası: ........

Tanık Adı Soyadı: ......................................    Tanık İmzası: ...........

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "meme-kucultme-onam": {
    icerik: `MEME KÜÇÜLTME (REDÜKSİYON MAMMOPLASTİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Meme küçültme ameliyatı; fazla meme dokusu, yağ ve derinin cerrahi olarak çıkarılması ile meme hacminin küçültülmesi ve şeklin yeniden biçimlendirilmesi işlemidir.

2. AMAÇ
• Omuz, boyun ve sırt ağrısının azaltılması
• Postür bozukluğunun giderilmesi
• Cilt tahrişinin önlenmesi
• Estetik iyileşme

3. OLASI RİSKLER
• Kanama, enfeksiyon, yara iyileşme güçlüğü
• Meme başı ve areola duyu kaybı (geçici veya kalıcı)
• Meme başı kanlanma bozukluğu (nadir)
• Emzirme kapasitesinde azalma veya kayıp
• Asimetri, yara izi, şekil memnuniyetsizliği
• Seroma, hematom

4. BEYAN
Meme küçültme ameliyatı hakkında yeterince bilgilendirildim.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "blefaroplasti-onam": {
    icerik: `GÖZ KAPAĞI ESTETİĞİ (BLEFAROPLASTİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Blefaroplasti; sarkmış, yorgun görünümlü göz kapaklarının cerrahi olarak düzeltilmesi işlemidir. Üst kapak, alt kapak veya her ikisine birden uygulanabilir.

2. AMAÇ
• Sarkık üst kapak nedeniyle daralan görme alanının genişletilmesi
• Göz altı torbalaşması ve şişliğinin giderilmesi
• Yorgun ve yaşlı görünümün iyileştirilmesi

3. OLASI RİSKLER
• Geçici kuru göz, yaşarma, ışık hassasiyeti
• Asimetri, iz, skar
• Kapak kapanma güçlüğü (lagoftalmi — geçici)
• Görme değişikliği (son derece nadir)
• Ekimoz ve ödem (birkaç haftada düzelir)

4. BEYAN
Blefaroplasti ameliyatına ilişkin bilgilendirmeyi aldım ve onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "abdominoplasti-onam": {
    icerik: `KARIN GERME (ABDOMİNOPLASTİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Abdominoplasti; karın bölgesindeki fazla deri ve yağ dokusunun çıkarılması ve karın kaslarının sıkılaştırılması ile karın bölgesinin düzleştirilmesi ameliyatıdır. Tam veya mini abdominoplasti olarak planlanabilir.

2. AMAÇ
• Gebelik veya kilo kaybı sonrası oluşan gevşek karın cildinin giderilmesi
• Diastazis rekti (karın kası ayrışması) onarımı
• Karın profilinin iyileştirilmesi

3. OLASI RİSKLER
• Derin ven trombozu ve pulmoner emboli (en ciddi risk)
• Yara açılması, geniş yara izi (özellikle sigara kullananlar)
• Seroma, enfeksiyon, kanama
• Göbek pozisyonu değişikliği veya nekrozu
• His kaybı, ödem (uzun sürebilir)
• Revizyon ihtiyacı

4. BEYAN
Ameliyat hakkında kapsamlı bilgilendirme aldım ve onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // DİŞ HEKİMLİĞİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "dis-cekimi-onam": {
    icerik: `DİŞ ÇEKİMİ / GÖMÜLÜ DİŞ AMELİYATI ONAM FORMU

1. İŞLEMİN TANIMI
Diş çekimi; çeşitli nedenlerle (çürük, kırık, periyodontal hastalık, ortodontik endikasyon) dişin ağız boşluğundan uzaklaştırılması işlemidir. Gömülü diş (özellikle yirmi yaş dişleri) çekimi ise lokal anestezi altında yapılan küçük cerrahi bir girişimdir.

2. OLASI RİSKLER
• Kanama, şişlik, ağrı (birkaç günde normale döner)
• Kuru soket (alveolar osteitis) — 20 yaş dişi çekimlerinde %5-10
• Komşu diş, sinir veya sinüse yakınlık — mentalis siniri geçici/kalıcı uyuşma (nadir)
• Çene kırığı (gömülü diş cerrahisinde son derece nadir)
• Enfeksiyon

3. GENEL BİLGİLER
• İşlem sonrası 24 saat boyunca gazlı bez ısırılmalıdır
• İlk gün sigara, alkol ve sıcak yiyeceklerden kaçınılmalıdır
• Verilen antibiyotik ve ağrı kesiciler kullanılmalıdır

4. BEYAN
Diş çekimi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "zirkonyum-kaplama-onam": {
    icerik: `ZİRKONYUM / PORSELEN KAPLAMA ONAM FORMU

1. İŞLEMİN TANIMI
Zirkonyum ve porselen kaplamalar; mevcut dişlerin ince bir tabaka traşlanması (preparasyon) ardından üzerine estetik kron/kaplama yapıştırılması işlemidir. Renk, şekil ve fonksiyon iyileştirmesi sağlar.

2. OLASI RİSKLER VE KISITLAMALAR
• Preparasyon sonrası geçici hassasiyet
• Kaplama altında çürük oluşumu (ağız hijyeni ihmalinde)
• Kırılma riski (sert cisimler ısırma, gıcırdatma)
• İkincil tedavide daha fazla diş materyali kaybı
• Renk uyumu zamanla değişebilir
• Gece dişçe takarsa koruyucu plak önerilir

3. BAKIM
• Diş ipi ve arayüz fırçası düzenli kullanılmalıdır
• Yılda iki kez diş hekimi kontrolü önerilir

4. BEYAN
Zirkonyum/porselen kaplama tedavisine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "dis-beyazlatma-onam": {
    icerik: `DİŞ BEYAZLATMA (BLEACHING) ONAM FORMU

1. İŞLEMİN TANIMI
Diş beyazlatma; diş yüzeyindeki ve mine içindeki renk pigmentlerini peroksit bazlı ajanlar aracılığıyla açma işlemidir. Ofis tipi (klinkte 1-2 seans) veya ev tipi (gecelik plak+jel) olarak uygulanabilir.

2. BEKLENTİ YÖNETİMİ
• Sonuç mevcut diş rengine, yaşa ve boyaya bağlıdır; garanti verilemez
• Kaplama, implant ve dolgu rengini değiştirmez
• Etki 1-3 yıl sürebilir; sigara, çay, kahve tüketimi kalıcılığı kısaltır

3. OLASI RİSKLER
• Geçici diş hassasiyeti (soğuk/sıcak — genellikle 24-72 saat sürer)
• Diş eti tahrişi
• Başlangıçta düzensiz beyazlaşma
• Ağrı/hassasiyet varlığında tedaviye ara verilmesi gerekebilir

4. KONTRENDİKASYONLAR
• Gebelik ve emzirme döneminde uygulanmamalıdır
• 16 yaş altı hastalar için uygun değildir
• Aşırı hassas dişlerde dikkatli değerlendirme gerekir

5. BEYAN
Diş beyazlatma işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // KBB — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "septoplasti-onam": {
    icerik: `SEPTOPLASTİ / SEPTUM AMELİYATI AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Septoplasti; burun septumunun (burunu ikiye ayıran kıkırdak-kemik yapı) eğrilik veya deformitesinin cerrahi olarak düzeltilmesi işlemidir. Nefes almayı güçleştiren septal deviasyonlarda endikedir.

2. AMAÇ
• Nazal pasaj obstrüksiyonunun giderilmesi
• Horlama ve uyku bozukluğunun azaltılması
• Tekrarlayan sinüzit ataklarının önlenmesi

3. OLASI RİSKLER
• Kanama, enfeksiyon, yara iyileşmesi sorunları
• Septal perforasyon (septumda delik oluşumu — nadir)
• His kaybı (burun ucu veya üst diş bölgesi — genellikle geçici)
• Burun biçiminde değişme (istenmeyen)
• Sonucun yetersiz kalması ve revizyon ihtiyacı
• Koku alma duyusunda geçici değişim

4. AMELİYAT SONRASI
• Burun tamponları 24-48 saat sonra alınır
• 2 hafta fiziksel aktiviteden kaçınılmalıdır
• Güneş gözlüğü ve gözlük 6 hafta boyunca kullanılmamalıdır

5. BEYAN
Septoplasti ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "tonsillektomi-onam": {
    icerik: `TONSİLLEKTOMİ / ADENOİDEKTOMİ AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Tonsillektomi bademcik (tonsil) ameliyatı, adenoidektomi ise geniz eti (adenoid) ameliyatıdır. Genel anestezi altında uygulanır; birlikte veya ayrı ayrı yapılabilir.

2. ENDİKASYONLAR
• Yılda 3+ kez tekrarlayan tonsillit atakları
• Tonsil büyüklüğüne bağlı uyku apnesi / horlama
• Peritonsillar apse öyküsü
• Adenoid hipertrofisine bağlı kulak enfeksiyonu / solunum güçlüğü

3. OLASI RİSKLER
• Primer kanama (ameliyat sırasında — nadir)
• Sekonder kanama (ameliyat sonrası 5-10. günlerde — %1-2)
• Enfeksiyon, ateş
• Geçici yutma güçlüğü ve ağız kokusu
• Dişlerde geçici uyuşma
• Anestezi komplikasyonları (çocuklarda daha dikkatli izlem)

4. AMELİYAT SONRASI
• İlk hafta soğuk ve yumuşak gıdalar tüketilmelidir
• Kanama olursa acile başvurulmalıdır
• 2 hafta fiziksel aktiviteden kaçınılmalıdır

5. BEYAN
Tonsillektomi / Adenoidektomi ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................
Veli/Vasi (18 yaş altı): ...............................    Veli/Vasi İmzası: ........

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "timpanoplasti-onam": {
    icerik: `KULAK ZARI AMELİYATI (TİMPANOPLASTİ / MASTOİDEKTOMİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Timpanoplasti; perfore (delik) kulak zarının ve/veya orta kulak yapılarının onarılması ameliyatıdır. Mastoidektomi ise mastoid kemiğin havalanma hücrelerindeki kronik enfeksiyon veya kolesteatom nedeniyle temizlenmesi işlemidir.

2. AMAÇ
• Kulak zarı perforasyonunun kapatılarak işitmenin iyileştirilmesi
• Kulaktan akıntı ve enfeksiyonun önlenmesi
• Kolesteatom varlığında hastalığın temizlenmesi

3. OLASI RİSKLER
• İşitme düzeyinde değişme (iyileşme veya nadiren kötüleşme)
• Yüz siniri zayıflığı (fasiyal paralizi — çok nadir)
• Tad bozukluğu (korda timpani hasarı — geçici/kalıcı)
• Baş dönmesi, denge bozukluğu
• Kulak çınlaması artışı
• Kolesteatom nüksü (mastoidektomide)

4. BEYAN
Timpanoplasti / Mastoidektomi ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "fess-sinüs-onam": {
    icerik: `ENDOSKOPİK SİNÜS CERRAHİSİ (FESS) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
FESS (Fonksiyonel Endoskopik Sinüs Cerrahisi); kronik sinüzit, nazal polipozis veya sinüs kistlerinin endoskop yardımıyla minimal invaziv olarak temizlenmesi işlemidir.

2. AMAÇ
• Sinüs açıklığının sağlanması ve doğal drenajın yeniden kazandırılması
• Nazal poliplerin çıkarılması
• İlaç tedavisine yanıtsız kronik sinüzitin tedavisi

3. OLASI RİSKLER
• Kanama (ciddi hemoraji nadir ama mümkündür)
• Göz çevresine yayılan şişlik ve ekimoz (geçici)
• Göz sorunları: diplopi, görme bulanıklığı (çok nadir)
• BOS (beyin omurilik sıvısı) kaçağı (çok nadir, <0,5%)
• Koku alma duyusunda değişme
• Polip nüksü — düzenli kontrol ve tıbbi tedavi gerektirebilir

4. AMELİYAT SONRASI
• Burun tamponları/rinoloji değerlendirmesi hekiminiz tarafından planlanır
• Düzenli nazal yıkama önerilir
• 6-12 ay düzenli kontrol gereklidir

5. BEYAN
Endoskopik sinüs cerrahisi (FESS) ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // KARDİYOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kalp-pili-onam": {
    icerik: `KALICI KALP PİLİ (PACEMAKER) TAKMA AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Kalıcı kalp pili; yavaş veya düzensiz kalp ritmi nedeniyle kalbe elektriksel uyarı göndererek normal ritmi sağlayan küçük elektronik cihazdır. Genellikle sol köprücük kemiği altına yerleştirilir.

2. AMAÇ
• Bradikardiye (yavaş kalp atışı) bağlı baş dönmesi, bayılma, nefes darlığının giderilmesi
• Kalp bloğunun tedavisi

3. OLASI RİSKLER
• Enfeksiyon (cep bölgesi veya elektrot ucu)
• Kanama, hematom
• Pnömotoraks (akciğer zedelenmesi — %1-2)
• Elektrot yer değişikliği veya kırılması
• Cihaz arızası (son derece nadir, periyodik kontrol gerekir)
• Deri erozyonu

4. YAŞAM KISITLAMALARI
• Güçlü manyetik alanlara (MR — koşullara bağlı) dikkat
• Güvenlik kapılarından hızlı geçilmeli, uzun süre durulmamalıdır
• Cihaz kimlik kartı her zaman taşınmalıdır

5. BEYAN
Kalıcı kalp pili implantasyonuna onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "kardiyoversiyon-onam": {
    icerik: `ELEKTRİKSEL KARDİYOVERSİYON AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Elektriksel kardiyoversiyon; atrial fibrilasyon (AF), atrial flutter veya diğer ritim bozukluklarını düzeltmek amacıyla kısa süreli genel anestezi (sedasyon) altında göğse uygulanan elektrik şoku tedavisidir.

2. AMAÇ
Normal sinüs ritminin yeniden sağlanması ve buna bağlı semptomların (çarpıntı, nefes darlığı, yorgunluk) giderilmesi.

3. OLASI RİSKLER
• Cilt yanığı (nadir, elektrot bölgesinde)
• Ritim bozukluğunun geri dönmesi (%50-60 tekrarlama riski, ilaç desteğiyle azalır)
• Tromboembolik olay / inme (işlem öncesi antikoagülan tedavi zorunludur)
• Sedasyon komplikasyonları
• Sinüs nodu disfonksiyonu (nadir)

4. BEYAN
Elektriksel kardiyoversiyon işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ORTOPEDİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "diz-protezi-onam": {
    icerik: `DİZ PROTEZİ (TOTAL / PARSİYEL) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Diz protezi ameliyatı; ileri evre diz kireçlenmesi (gonartrozis) nedeniyle hasarlı diz eklem yüzeylerinin metal ve plastik komponentlerden oluşan yapay implantlarla değiştirilmesi işlemidir.

2. AMAÇ
• Ağrının ortadan kaldırılması veya belirgin azaltılması
• Diz fonksiyonunun yeniden kazandırılması
• Yürüme ve günlük yaşam aktivitelerinin iyileştirilmesi

3. OLASI RİSKLER
• Derin ven trombozu ve pulmoner emboli (en ciddi risk, antikoagülan profilaksi uygulanır)
• Enfeksiyon (erken veya geç — protez çıkarımı gerektirebilir)
• Protez instabilitesi, eklem sertliği
• Sinir ve damar hasarı
• Bacak uzunluğu eşitsizliği
• Protez gevşemesi (10-20 yıl uzun vadede)
• Revizyon ameliyatı ihtiyacı

4. REHABİLİTASYON
Ameliyat sonrası fizyoterapi programı başarı için kritiktir. Yük verme ve egzersiz planı doktorunuz tarafından belirlenecektir.

5. BEYAN
Diz protezi ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "omurga-cerrahisi-onam": {
    icerik: `OMURGA CERRAHİSİ AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Omurga cerrahisi; disk hernisi, spinal stenoz, spondiloliste­zis, omurga tümörü veya travma gibi nedenlerle yapılan cerrahi müdahaleleri kapsar. Disk ameliyatı (mikrodiskektomi, TLIF), dekompresyon, spinal füzyon veya enstrümantasyon içerebilir.

2. AMAÇ
• Sinir/omurilik basısının giderilmesi
• Ağrı, uyuşukluk ve felç belirtilerinin tedavisi
• Omurga stabilitesinin sağlanması

3. OLASI RİSKLER
Cerrahi genel riskleri: kanama, enfeksiyon, anestezi komplikasyonları.
Omurgaya özgü riskler:
• Nörolojik kötüleşme (son derece nadir, <1%)
• Sinir hasarı, kalıcı uyuşukluk veya güçsüzlük
• Dura yırtığı ve BOS kaçağı (%1-3)
• İmplant yer değişikliği veya kırılması
• Füzyon gerçekleşmemesi
• Komşu segment hastalığı (uzun vadede)

4. BEYAN
Omurga cerrahisi ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // GÖZ HASTALIKLARI — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "glokom-tedavi-onam": {
    icerik: `GLOKOM (GÖZ TANSİYONU) TEDAVİ ONAM FORMU

1. TANIM
Glokom; göz içi basıncının yükselmesine bağlı optik sinir hasarı ile karakterli, tedavi edilmezse körlüğe yol açabilen kronik bir göz hastalığıdır.

2. TEDAVİ SEÇENEKLERİ
a) İlaç tedavisi (damla/hap): Göz içi basıncını düşürür. Ömür boyu kullanım gerektirebilir.
b) Lazer trabekuloplasti (SLT/ALT): Drenaj kanalını açmaya yönelik lazer işlemi.
c) Cerrahi (trabekülektomi, tüp implantı): İlaç/lazere yanıtsız olgularda.

3. OLASI RİSKLER (İlaç)
• Göz kızarıklığı, yanma, kirpik uzaması (bazı damlaların yan etkisi)
• Sistemik etkiler (nabız yavaşlaması, nefes darlığı — beta bloker damlalarda)

4. OLASI RİSKLER (Cerrahi)
• Enfeksiyon, kanama, katarakt hızlanması
• Basınç aşırı düşmesi (hipotoni)
• İşlem yeterliliğinin sınırlı kalması ve tekrar cerrahi

5. BEYAN
Glokom tedavisi için önerilen seçeneği kabul ediyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "intravitreal-onam": {
    icerik: `İNTRAVİTREAL ENJEKSİYON ONAM FORMU

1. İŞLEMİN TANIMI
İntravitreal enjeksiyon; anti-VEGF ilaçlar (bevacizumab, ranibizumab, aflibercept), kortikosteroidler veya antibiyotiklerin göz içine (vitreus boşluğuna) ince iğne ile enjekte edilmesi işlemidir. Yaşa bağlı maküla dejenerasyonu (YBMD), diyabetik retinopati ve retinal ven tıkanıklıklarında kullanılır.

2. SEANS SAYISI
Tedavi süreci genellikle tekrarlayan enjeksiyonlar gerektirir (yükleme dozu + idame). Hastalık durumuna göre ayarlanır.

3. OLASI RİSKLER
• Göz içi enfeksiyon (endoftalmi — <1/1000, çok nadir ama ciddi)
• Retinal dekolman (son derece nadir)
• Göz içi basıncında geçici yükselme
• Subkonjonktival kanama (kırmızı nokta — zararsız, geçici)
• Enjeksiyon bölgesinde ağrı, geçici görme bulanıklığı
• Sistemik vasküler olaylar (felç — teorik risk, çok düşük)

4. BEYAN
İntravitreal enjeksiyon işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // DERMATOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "lazer-epilasyon-onam": {
    icerik: `LAZER EPİLASYON ONAM FORMU

1. İŞLEMİN TANIMI
Lazer epilasyon; seçici fototermoliz prensibiyle lazer enerjisinin kıl köklerini hedef alarak tüy büyümesini kalıcı olarak azaltması işlemidir. Aleksandrit, diyot veya Nd:YAG lazerler kullanılır.

2. SEÇİLEN TEDAVİ BÖLGESİ: .........................................

3. SEANS BİLGİSİ
• Kalıcı azaltma için ortalama 6-10 seans gerekir
• Seanslar arasında 4-8 hafta beklenmelidir
• Hormonal bozuklukta yanıt değişkendir

4. OLASI RİSKLER
• Geçici kızarıklık, ödem (1-2 gün)
• Hiperpigmentasyon (özellikle koyu tenlilerde UV maruziyeti sonrası)
• Hipopigmentasyon (nadir, genellikle geçici)
• Yanık, kabuklanma (tekniğe bağlı nadir)
• Tam epilasyon garantisi verilemez

5. KONTRENDİKASYONLAR
• Güneşli sezon, bronzlaşmış cilt — işlem yapılmamalıdır
• İşlem öncesi 4 hafta ve sonrası 4 hafta güneşten kaçınılmalıdır

6. BEYAN
Lazer epilasyon tedavisine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "kimyasal-peeling-onam": {
    icerik: `KİMYASAL PEELİNG (CİLT SOYMA) ONAM FORMU

1. İŞLEMİN TANIMI
Kimyasal peeling; glikolik asit, salisilik asit, TCA (triklorasetik asit) veya fenol gibi kimyasal ajanların cilde uygulanarak kontrollü soyma ve cilt yenilenmesinin sağlanması işlemidir.

2. PEELİNG DERİNLİĞİ
□ Yüzeyel (glikolik/salisilik asit — 5-7 gün iyileşme)
□ Orta derinlikte (TCA — 7-14 gün iyileşme)
□ Derin (fenol — 2-3 hafta iyileşme, sedasyon gerekebilir)

3. HEDEF
• Akne izleri, leke, kırışıklık ve cilt dokusunun iyileştirilmesi

4. OLASI RİSKLER
• Kızarıklık, soyulma, kabuklanma (beklenen)
• Hiperpigmentasyon (özellikle koyu tenlilerde, UVB'ye bağlı)
• Uçuk (herpes simpleks) reaktivasyonu — önceden ilaç alınabilir
• Skar, kalıcı renk değişikliği (derin peeling)
• Enfeksiyon

5. BAKIM
• Nemlendirici ve güneş koruyucu (SPF 50+) zorunludur
• İşlem sonrası 4 hafta doğrudan güneş maruziyetinden kaçınılmalıdır

6. BEYAN
Kimyasal peeling uygulamasına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "dermatoloji-prp-onam": {
    icerik: `DERMATOLOJİK PRP / MEZOTERAPİ ONAM FORMU

1. İŞLEMİN TANIMI
PRP (Trombositten Zengin Plazma) tedavisinde hastanın kendi kanından elde edilen trombosit konsantresi, saç dökülmesi veya cilt yenileme amacıyla ilgili bölgeye enjekte edilir. Mezoterapi'de vitamin, mineral ve hyaluronik asit karışımı deri altına çok sayıda küçük enjeksiyonla verilir.

2. HEDEF BÖLGE VE ENDİKASYON
□ Androgenetik alopesi (saç dökülmesi)
□ Yüz/boyun cilt yenileme
□ Cilt altı dolgunluk ve nemlendirme

3. SEANS SAYISI
PRP: Genellikle 3-6 seans, aylık aralıklarla başlangıç; ardından 3-6 ayda bir idame.

4. OLASI RİSKLER
• Enjeksiyon bölgesinde kızarıklık, ödem (1-3 gün)
• Ekimoz, geçici hassasiyet
• Enfeksiyon (steril teknikle minimize edilir)
• Yetersiz yanıt — kişiden kişiye farklılık gösterir
• Alerjik reaksiyon (kendi kanı için çok nadir; mezoterapi karışımı için olası)

5. BEYAN
PRP / Mezoterapi tedavisine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // PSİKİYATRİ — YENİ FORM
  // ════════════════════════════════════════════════════════════════════════

  "ect-onam": {
    icerik: `ELEKTROKONVÜLSİF TERAPİ (EKT) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Elektrokonvülsif Terapi (EKT); kısa süreli genel anestezi ve kas gevşetici altında beyne kısa süreli elektrik akımı uygulanarak kontrollü bir konvülsiyon oluşturulması esasına dayanan psikiyatrik bir tedavi yöntemidir.

2. ENDİKASYONLAR
• İlaç tedavisine yanıtsız ağır depresyon
• Psikotik özellikli depresyon
• Katatonik şizofreni
• Mani ve ciddi intihar riski

3. TEDAVİ PLANI
Genellikle haftada 3 seans, toplam 6-12 seans uygulanır.

4. OLASI YAN ETKİLER VE RİSKLER
• Bellek bozukluğu (özellikle yakın dönem — tedaviden sonra büyük ölçüde düzelir)
• Konfüzyon, baş ağrısı, kas ağrısı (seans sonrası geçici)
• Kardiyovasküler değişiklikler (anestezi ekibi tarafından izlenir)
• Anestezi komplikasyonları
• Diş/dil zedelenmesi (nadir, koruyucu önlem alınır)

5. YETKİ DURUMU
Hasta karar verme ehliyetine sahip değilse yasal temsilci imzası gereklidir.

6. BEYAN
EKT tedavisine onay veriyorum / veriyoruz.

Hasta / Yasal Temsilci Adı Soyadı: .................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................
Yakınlık Derecesi (temsilci ise): .....................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ÇOCUK SAĞLIĞI — YENİ FORM
  // ════════════════════════════════════════════════════════════════════════

  "cocuk-ameliyat-onam": {
    icerik: `PEDİATRİK CERRAHİ ONAM FORMU (VELİ / VASİ)

ÖNEMLİ NOT: Bu form 18 yaş altı hastalar için veli veya yasal vasi tarafından imzalanmalıdır.

1. PLANLANAN İŞLEM
İşlem adı: .................................................
Tarih: ......................   Hekim: .....................

2. AMAÇ VE FAYDA
Planlanan cerrahi girişim çocuğunuzun mevcut sağlık sorununu gidermeye/azaltmaya yönelik olup hekim tarafından tıbben gerekli görülmüştür.

3. OLASI RİSKLER
• Kanama, enfeksiyon, yara iyileşmesi sorunları
• Anestezi komplikasyonları (çocuk anestezisi uzmanı eşliğinde yürütülecektir)
• Planlanan işleme özgü riskler hekiminiz tarafından açıklanmıştır
• Ameliyat sırasında planın değişmesi gerekebilir

4. ALTERNATİFLER
İlaç tedavisi, bekleme politikası veya farklı cerrahi teknikler hekiminizle tartışılmıştır.

5. VELİ / VASİ BEYANI
Çocuğumun ameliyatı ve anestezi uygulaması hakkında yeterince bilgilendirildim. Sorularım yanıtlandı. Ameliyata onay veriyorum.

Çocuğun Adı Soyadı: ..................................    Doğum Tarihi: ..........
T.C. Kimlik No (Çocuk): ...............................

Veli / Vasinin Adı Soyadı: ...........................    Tarih: ..................
T.C. Kimlik No (Veli): .................................    İmza: ..................
Çocukla Yakınlık Derecesi: ..........................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ÜROLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "prostat-ameliyat-onam": {
    icerik: `PROSTAT AMELİYATI (TUR-P / HoLEP / AÇIK) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Prostat ameliyatı; iyi huylu prostat büyümesi (BPH) veya prostat kanseri nedeniyle prostat dokusunun tümüyle veya kısmen çıkarılması ya da küçültülmesi işlemidir.
• TUR-P: Endoskopik rezeksiyon (en sık)
• HoLEP: Holmiyum lazer enükleasyon
• Açık / Robotik prostatektomi: Prostat kanseri için radikal çıkarım

2. AMAÇ
• İdrar akım güçlüğü ve mesane retansiyonunun giderilmesi
• Böbrek hasarını önlemek
• Prostat kanseri tedavisi

3. OLASI RİSKLER
• Kanama (transfüzyon gerekebilir)
• Enfeksiyon (üriner sistem enfeksiyonu, sepsis)
• Geriye idrar kaçağı (retrograd ejakülasyon) — TUR-P'de %80-90 sık
• Ereksiyon bozukluğu (radikal prostatektomide daha belirgin)
• İdrar kaçırma (inkontinans — geçici veya kalıcı)
• Darlık (üretral strictür — geç komplikasyon)
• TUR sendromu (seyreltici sıvı emilimi — endoskopik yöntemlerde nadir)

4. BEYAN
Prostat ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "tas-kirma-eswl-onam": {
    icerik: `BÖBREK TAŞI KIRMA (ESWL) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
ESWL (Ekstrakorporeal Şok Dalgası Litotripsi); vücut dışından odaklanan şok dalgalarıyla böbrek veya üreter taşının parçalanması işlemidir. Taş boyutu ve konumuna göre tekrar seans gerekebilir.

2. AMAÇ
Böbrek koliği, tıkanıklık ve böbrek hasarına yol açan taşın parçalanarak idrar yoluyla atılmasının sağlanması.

3. OLASI RİSKLER
• İşlem sırasında ağrı ve rahatsızlık (sedasyon/anestezi uygulanabilir)
• Böbrek çevresi hematom (kanama) — %1-2, çoğu konservatif tedaviyle çözülür
• Taş parçalarının üreterde takılması (Steinstrasse) — ek işlem gerekebilir
• Tam parçalanmama — yeniden seans veya cerrahi gerekebilir
• Geçici kan idrarda (hematüri) — normaldir
• Kardiyak ritim bozukluğu (altta yatan kalp hastalığında önlem alınır)

4. BEYAN
ESWL işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "sistoskopi-onam": {
    icerik: `SİSTOSKOPİ / ÜRETEROSKOPİ ONAM FORMU

1. İŞLEMİN TANIMI
Sistoskopi; esnek veya rijid sistoskop ile mesane ve üretra iç yüzeyinin görüntülenmesi işlemidir. Üreterorenoskopi (URS) ise üreter veya böbrek içine girerek taş kırmayı da kapsar.

2. ENDİKASYONLAR
• İdrarda kan (hematüri) araştırması
• Tekrarlayan idrar yolu enfeksiyonu araştırması
• Mesane tümörü kontrolü veya biyopsisi
• Üreter taşı tedavisi (lazer litotripsi)

3. OLASI RİSKLER
• İşlem sonrası yakma, sık idrara çıkma (1-3 gün)
• İdrar yolu enfeksiyonu
• Kanama
• Üretral/üreteral yaralanma (nadir)
• Anestezi komplikasyonları

4. BEYAN
Sistoskopi / Üreterorenoskopi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "sunnet-onam": {
    icerik: `SÜNNET ONAM FORMU

1. İŞLEMİN TANIMI
Sünnet; glans penisin üzerini örten prepüsyum dokusunun cerrahi olarak çıkarılması işlemidir. Lokal veya genel anestezi altında yapılır.

2. ENDİKASYON
□ Tıbbi endikasyon (fimozis, tekrarlayan enfeksiyon, balanitis)
□ Dini/kültürel tercih
□ Ebeveyn talebi (çocuklarda)

3. OLASI RİSKLER
• Kanama (hemostaz sağlanır, ciddi kanama nadir)
• Enfeksiyon
• Yara iyileşmesi sorunları
• Kozmetik sonuç memnuniyetsizliği
• Cilt fazlalığı veya az cilt kalması (revizyon gerektirebilir)
• Anestezi komplikasyonları

4. İYİLEŞME
• 7-10 günde genellikle tam iyileşme sağlanır
• Suya temas 48 saat sonra mümkündür

5. BEYAN (VELİ / HASTA)
Sünnet işlemine onay veriyorum.

Hasta / Çocuğun Adı Soyadı: .......................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................
Veli Adı Soyadı (18 yaş altı): ......................    Veli İmzası: ............

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "vazektomi-onam": {
    icerik: `VAZEKTOMİ (GERİ DÖNÜŞÜMSÜZ KONTRASEPSİYON) ONAM FORMU

ÖNEMLİ UYARI: Vazektomi geri dönüşümsüz bir doğum kontrol yöntemi olarak kabul edilmelidir. Mikro-cerrahi geri döndürme (vazo-vazostomi) her zaman mümkün değildir veya başarısız olabilir.

1. İŞLEMİN TANIMI
Vazektomi; vas deferens kanallarının bağlanması, kesilmesi veya kauterize edilmesi yoluyla sperm iletiminin engellenmesi işlemidir. Skrotuma lokal anestezi uygulanarak yapılır.

2. ETKİ
• İşlem sonrası sperm olmayan ejakülat → kalıcı kısırlık
• İşlem hemen etkili değildir; 3 ay veya 20 ejakülasyon sonrası sperm sıfır olmalıdır
• Kontrol spermogramı şarttır

3. OLASI RİSKLER
• Hematom, enfeksiyon (%1-2)
• Kronik ağrı sendromu (nadir, %1)
• Sperm granülomu
• Spontan rekanalizasyon (kendiliğinden tekrar açılma — <1%)
• Kalıcı kısırlık — bu bilinçli bir tercihtir

4. BEYANI
Vazektomi işleminin kalıcı kısırlığa yol açacağını anlıyorum ve onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // KADIN HASTALIKLARI & DOĞUM — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "dogum-sezaryen-onam": {
    icerik: `NORMAL / SEZARYEN DOĞUM AYDINLATILMIŞ ONAM FORMU

1. DOĞUM PLANI
□ Vajinal (Normal) Doğum
□ Elektif Sezaryen
□ Acil Sezaryen

2. NORMAL DOĞUM BİLGİLERİ
Normal vajinal doğumda riskler: perineal yırtık, epiziyotomi, uzamış eylem, fetal distres, instrumental doğum (vakum/forseps) ihtiyacı. Gerektiğinde sezaryene geçilebilir.

3. SEZARYEN BİLGİLERİ
Sezaryen bir cerrahi operasyondur. Spinal/genel anestezi altında uygulanır.
Riskler:
• Anestezi komplikasyonları
• Kanama, mesane/bağırsak yaralanması
• Enfeksiyon, yara açılması
• Derin ven trombozu
• Sonraki gebeliklerde plasenta komplikasyonları
• Bebekte geçici solunum güçlüğü

4. BEYAN
Doğum şekli ve anestezi hakkında yeterince bilgilendirildim.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "laparoskopi-jinekoloji": {
    icerik: `JİNEKOLOJİK LAPAROSKOPİ / HİSTEROSKOPİ AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
• Laparoskopi: Karın duvarına küçük kesilerden girilmesiyle yapılan kapalı karın cerrahisi (miyomektomi, endometriozis tedavisi, over kisti, tüp bağlama).
• Histeroskopi: Rahim içine girilmesiyle yapılan tanısal/operatif işlem (polip, miyom, yapışıklık).

2. AMAÇ
Tanı konulması ve/veya tedavi amacıyla minimal invaziv girişim.

3. OLASI RİSKLER (Laparoskopi)
• İç organ yaralanması (bağırsak, mesane, damar — nadir, <%1)
• Laparotomiye geçiş (açık ameliyat gerektirebilir)
• CO₂ gazı emboliyeleri (son derece nadir)
• Port yeri fıtığı, enfeksiyon

4. OLASI RİSKLER (Histeroskopi)
• Uterus perforasyonu
• Distansiyon ortamı komplikasyonları
• Enfeksiyon, kanama

5. BEYAN
Laparoskopi / Histeroskopi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "kuretaj-onam": {
    icerik: `KÜRETAJ / RAHİM TAHLİYESİ ONAM FORMU

1. İŞLEMİN TANIMI
Küretaj (dilatasyon ve küretaj - D&C); rahim içi dokunun araçlarla veya vakumla temizlenmesi işlemidir. Diagnostik (biyopsi) veya terapötik (moloz, düşük artığı temizliği, gebelik sonlandırma) amaçlı yapılabilir.

2. ENDİKASYON
□ Tamamlanmamış düşük / istemli düşük
□ Rahim içi polip / miyom
□ Anormal rahim kanaması — biyopsi
□ Molar gebelik

3. OLASI RİSKLER
• Kanama, enfeksiyon
• Uterus perforasyonu (nadir, <%1)
• Asherman sendromu (rahim içi yapışıklık — tekrarlayan küretajlarda)
• Servikal yaralanma

4. YASAL NOT
İstemli gebelik sonlandırma T.C. hukukunda belirli koşul ve süre sınırlarına tabidir (Nüfus Planlaması Hakkında Kanun).

5. BEYAN
Küretaj işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "ria-onam": {
    icerik: `RİA (RAHİM İÇİ ARAÇ) UYGULAMA ONAM FORMU

1. İŞLEMİN TANIMI
RİA (Rahim İçi Araç / İUC); uzun etkili geri dönüşümlü bir kontrasepsiyon yöntemidir. Bakırlı veya hormonlu (levonorgestrel salgılayan) çeşitleri mevcuttur.

2. ETKİNLİK
RİA, yüksek etkinlikli (%99,2-99,9) bir doğum kontrol yöntemidir. Takıldıktan hemen sonra etkilidir.

3. BAKIR RİA vs. HORMONLUi RİA
• Bakırlı: 10 yıla kadar koruma, hormonsuz, adet düzensizliği olabilir
• Hormonlu: 3-5 yıl, adet azalır/kesilir, sistemik hormon düşük

4. OLASI RİSKLER VE YAN ETKİLER
• Takma sırasında kramp ve ağrı (geçici)
• Adet düzensizliği, ağır adet (bakırlı)
• RİA atılması (%2-10 ilk yıl)
• Pelvik inflamatuvar hastalık riski (özellikle cinsel yolla bulaşan enfeksiyon varsa)
• Uterus perforasyonu (nadiren — <1/1000)
• Ektopik gebelik riski (gebelik oluşursa)

5. BEYAN
RİA takılmasına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "kolposkopi-onam": {
    icerik: `KOLPOSKOPİ VE BİYOPSİ ONAM FORMU

1. İŞLEMİN TANIMI
Kolposkopi; anormal smear (PAP test) veya HPV pozitifliği sonrası serviksin büyütülmüş görüntülenmesi ve gerekirse biyopsi alınması işlemidir.

2. AMAÇ
Servikal displazi veya erken evre serviks kanseri tespiti / dışlanması.

3. İŞLEM
• Vajinal yol ile kolposkop ile serviks incelenir
• Anormal alan görünürse küçük biyopsi alınır (2-3 mm)
• Endoservikal küretaj (ECC) gerekebilir

4. OLASI RİSKLER
• Biyopsi bölgesinde kanama (nadir, tampon uygulanır)
• Hafif kramp ve rahatsızlık
• Enfeksiyon (son derece nadir)
• Biyopsi sırasında baygınlık (vazovagal reaksiyon)

5. SONUÇLAR
Biyopsi sonucu 1-2 haftada raporlanır. Sonuca göre ek tedavi (LEEP, konizasyon) gerekebilir.

6. BEYAN
Kolposkopi ve biyopsi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // GENEL CERRAHİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kolesistektomi-onam": {
    icerik: `KOLESİSTEKTOMİ (SAFRA KESESİ AMELİYATI) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Kolesistektomi; safra kesesi taşları, safra kesesi iltihabı (kolesistit) veya polip nedeniyle safra kesesinin cerrahi olarak çıkarılması işlemidir. Laparoskopik (kapalı, tercih edilen) veya açık teknikle yapılabilir.

2. AMAÇ
Safra taşı koliği, kolesistit ve olası komplikasyonların (sarılık, pankreatit) önlenmesi.

3. OLASI RİSKLER
• Kanama, enfeksiyon, port yeri fıtığı
• Safra yolu yaralanması (laparoskopik'te %0,3-0,5 — en ciddi komplikasyon)
• Safra sızıntısı
• Açık ameliyata geçiş (%5)
• İnce bağırsak veya damar yaralanması (nadir)
• Rezidü taş (safra kanalında kalan taş)

4. BEYAN
Kolesistektomi ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "herni-ameliyat-onam": {
    icerik: `FITIK (HERNİ) AMELİYATI AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Herni (fıtık); karın duvarındaki zayıf noktadan organların çıkması durumudur. Ameliyatta fıtık kesesi yerine konularak karın duvarı onarılır. Mesh (ağ) kullanılabilir.
Fıtık tipi: □ İnguinal  □ Umbilikal  □ İnsizyonel  □ Femoral  □ Diğer: .........

2. AMAÇ
• İnkarserasyon (sıkışma) ve strangulosyon (boğulma) riskini ortadan kaldırma
• Ağrı ve şişliğin giderilmesi

3. OLASI RİSKLER
• Kanama, enfeksiyon, seroma
• Mesh enfeksiyonu veya reddedilmesi (nadir)
• Nöralji (ağrılı sinir hasarı — %1-3)
• Vasal/testiküler komplikasyon (inguinal hernide)
• Nüks (fıtığın tekrarlaması — mesh kullanımında <%1)
• Bağırsak veya mesane yaralanması (nadir)

4. BEYAN
Fıtık ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "apendektomi-onam": {
    icerik: `APENDEKTOMİ (APANDİS AMELİYATI) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Apendektomi; akut apandisit tanısıyla apendiksin cerrahi olarak çıkarılması işlemidir. Laparoskopik veya açık teknikle yapılabilir.

2. ACİLİYET
Akut apandisit acil bir durumdur. Ameliyat geciktirilmesi halinde apendiks perforasyonu (yırtılma), peritonit ve hayati tehlike oluşabilir.

3. OLASI RİSKLER
• Kanama, enfeksiyon, yara iyileşmesi sorunları
• Perforasyon durumunda karın içi apse, peritonit riski artar
• Bağırsak yaralanması (nadir)
• İleus (bağırsak tıkanması)
• Port yeri komplikasyonları

4. BEYAN
Apendektomi ameliyatına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "hemoroid-cerrahisi-onam": {
    icerik: `HEMOROİD CERRAHİSİ AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Hemoroid cerrahisi; iç ve/veya dış hemoroid (basur) tedavisini kapsar. Açık / kapalı hemoroidektomi, stapler hemoroidopeksi, lazer hemoroid ablasyonu veya bant ligasyonu gibi yöntemler uygulanabilir.

2. AMAÇ
Ağrı, kanama ve kitleyi ortadan kaldırarak yaşam kalitesinin iyileştirilmesi.

3. OLASI RİSKLER
• Kanama (erken veya geç — %1-2)
• Enfeksiyon
• Anal inkontinans (gaz/dışkı kaçırma — nadir, özellikle mevcut sfinkter hasarında)
• Anal darlık (strictür — uzun vadede)
• Hemoroid nüksü
• Ağrı (özellikle ilk hafta belirgin, medikasyon gerektirir)
• Üriner retansiyon (erkeklerde, geçici)

4. BEYAN
Hemoroid cerrahisi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "meme-biyopsi-onam": {
    icerik: `MEME KİTLESİ BİYOPSİSİ / EKSİZYONU AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
• İnce iğne aspirasyon biyopsisi (İİAB): Görüntüleme eşliğinde ince iğne ile hücre örneği alınması.
• Tru-cut / core biyopsi: Doku silindiri alınması.
• Eksizyonel biyopsi / lumpektomi: Kitlenin cerrahi olarak çıkarılması.

2. AMAÇ
Meme kitlesinin iyi huylu mu kötü huylu mu olduğunun belirlenmesi ve/veya çıkarılması.

3. OLASI RİSKLER
• Kanama, hematom, enfeksiyon
• Meme şeklinde minimal değişiklik (özellikle eksizyonda)
• Pnömotoraks (derin biyopsilerde son derece nadir)
• Yetersiz doku alınması, tekrar biyopsi ihtiyacı

4. BEYAN
Meme biyopsisi / eksizyonu işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // NÖROLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "emg-onam": {
    icerik: `EMG / SİNİR İLETİM ÇALIŞMASI ONAM FORMU

1. İŞLEMİN TANIMI
• Sinir iletim çalışması (NCS): Ciltle temas eden elektrotlarla sinir iletim hızı ve amplitüdü ölçülür.
• Elektromiyografi (EMG): Kas içine ince iğne elektrodu ile kasın elektriksel aktivitesi değerlendirilir.

2. AMAÇ
Periferik sinir hastalıkları (karpal tünel, diskopati, nöropati, myopati) tanısı için kullanılan temel nörofizyolojik testlerdir.

3. RİSK VE RAHATSIZLIK
• NCS: Hafif elektrik şoku hissi, rahatsızlık.
• İğne EMG: İğne girişi sırasında ağrı ve baskı; kas içinde kasılma hissi.
• Kanama (antikoagülan kullananlarda dikkat), enfeksiyon (son derece nadir).
• Pnömotoraks (göğüs kası EMG'sinde çok nadir).

4. BEYAN
EMG / Sinir İletim Çalışması işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "lomber-ponksiyon-onam": {
    icerik: `LOMBER PONKSİYON (BEL DELİĞİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Lomber ponksiyon (LP / spinal tap); bel bölgesinden ince bir iğne ile beyin omurilik sıvısı (BOS) alınması veya ilaç uygulanması işlemidir. Lokal anestezi altında oturur/yan yatar pozisyonda yapılır.

2. AMAÇ
• Menenjit, ensefalit, subaraknoid kanama tanısı
• Multiple skleroz ve diğer nörolojik hastalık tanısı
• İdiyopatik intrakranyal hipertansiyon tedavisi (BOS basıncı düşürme)
• İntratekal ilaç uygulaması

3. OLASI RİSKLER
• Ponksiyon baş ağrısı (post-LP headache) — %10-30, genellikle yatarak 1-2 gün geçer; nadir olarak kan yaması (blood patch) gerekebilir
• Bel ağrısı, bacağa vuran geçici ağrı (parestezi)
• Kanama (antikoagülan kullananlarda risk artar)
• Enfeksiyon (menenjit — son derece nadir)
• Sinir hasarı (çok nadir)
• Herniasyon (artmış kafa içi basıncı varsa LP kontrendikedir — önceden görüntüleme yapılır)

4. BEYAN
Lomber ponksiyon işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "noroloji-botoks-onam": {
    icerik: `BOTULİNUM TOKSİN UYGULAMASI (NÖROLOJİ) ONAM FORMU

1. İŞLEMİN TANIMI
Botulinum toksini (BTX-A); kas içine enjeksiyon yoluyla nöromusküler iletimi geçici olarak bloke eder. Nörolojide kronik migren profilaksisi, servikal distoni, spastisite ve blefarospazm tedavisinde kullanılır.

2. HEDEF ENDİKASYON
□ Kronik migren (>15 gün/ay)
□ Servikal distoni (tortikollis)
□ Spastisite (inme/MS sonrası)
□ Blefarospazm / Hemifasiyal spazm
□ Diğer: .........................

3. SEANS ARALIĞI
Etki 3-6 ay sürer; tekrar enjeksiyon gereklidir.

4. OLASI RİSKLER
• Enjeksiyon bölgesinde ağrı, ekimoz
• Komşu kaslara difüzyon — kas zayıflığı (geçici)
• Servikal enjeksiyonda yutma güçlüğü (geçici)
• Migren enjeksiyonlarında alın / kaş sarkması (geçici)
• Anafilaksi (son derece nadir)
• Uzak yayılım (FDA uyarısı — son derece nadir, terapötik dozlarda çok düşük risk)

5. BEYAN
Botulinum toksini enjeksiyonuna onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // FİZİK TEDAVİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "fizik-tedavi-onam": {
    icerik: `FİZİK TEDAVİ VE REHABİLİTASYON ONAM FORMU

1. PROGRAMIN KAPSAMI
Fizik tedavi programı; elektroterapi (TENS, interferansiyel akım, ultrason, lazer), sıcak/soğuk uygulama, traksiyon, egzersiz tedavisi ve manuel terapi gibi yöntemleri içerebilir.

2. AMAÇ
• Ağrı azaltımı
• Kas kuvveti ve esneklik artışı
• Eklem hareket açıklığının iyileştirilmesi
• Günlük yaşam aktivitelerine dönüş

3. OLASI RİSKLER VE YAN ETKİLER
• Uygulama bölgesinde geçici ağrı artışı (ilk birkaç seans)
• Cilt tahrişi veya hafif yanma (elektrot bölgesinde)
• Kalp pili, metal implant, gebelik: Bazı uygulamalar kontrendike olabilir (hekiminizi bilgilendirin)
• Egzersiz sırasında kas yorgunluğu

4. HASTA SORUMLULUKLARI
• Seans sayısı ve periyodunu aksatmamak
• Ev egzersiz programını uygulamak
• Ağrı/şikâyetin artması halinde terapisti bilgilendirmek

5. BEYAN
Fizik tedavi programına katılmayı onaylıyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "eklem-enjeksiyon-onam": {
    icerik: `EKLEM İÇİ / YUMUŞAK DOKU ENJEKSİYONU ONAM FORMU

1. İŞLEMİN TANIMI
Eklem içine veya yumuşak dokuya kortikosteroid, hyaluronik asit, PRP ya da lokal anestezik enjeksiyonunu kapsar.
Uygulama bölgesi: .........................................
Uygulanan ajan: □ Kortikosteroid  □ Hyaluronik asit  □ PRP  □ Lokal anestezik

2. AMAÇ
• Eklem ağrısı ve inflamasyonunun kısa/orta vadeli kontrolü
• Kıkırdak sağlığının desteklenmesi (hyaluronik asit / PRP)

3. OLASI RİSKLER
• Enjeksiyon sonrası geçici ağrı artışı ("flare") — 1-2 gün
• Enfeksiyon (septik artrit — <1/10.000)
• Kortikosteroid etkisi: Cilt renginde açılma, yağ dokusu atrofisi (tekrarlayan enjeksiyonlarda)
• Diyabetik hastalarda geçici kan şekeri yükselmesi
• Tendon rüptürü (tendon içine enjeksiyondan kaçınılır)

4. BEYAN
Eklem içi enjeksiyon işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "eswt-sok-dalgasi-onam": {
    icerik: `ESWT (ŞOK DALGASI TEDAVİSİ) ONAM FORMU

1. İŞLEMİN TANIMI
ESWT (Ekstrakorporeal Şok Dalgası Tedavisi); cilt üzerinden uygulanan yüksek enerjili ses dalgalarının tendon ve yumuşak dokuda iyileşmeyi uyarması prensibine dayanır.

2. ENDİKASYONLAR
□ Plantar fasiit (topuk dikeni)
□ Tendinopati (Aşil, rotator cuff, patellar)
□ Kalsifik tendinit
□ Lateral epikondilit (tenis dirseği)
□ Miyofasiyal ağrı

3. SEANS PLANI
Genellikle 3-5 seans, haftalık aralıklarla.

4. OLASI YAN ETKİLER
• Uygulama sırasında ve sonrasında ağrı (özellikle ilk 24-48 saat)
• Ciltte kızarıklık, hafif ekimoz (geçici)
• Geçici ağrı artışı (1-2 gün — tedavi sürecinin normal parçasıdır)
• Sinir hasarı (son derece nadir, yüksek enerji uygulamalarında)

5. KONTRENDİKASYONLAR
• Gebelik, kanama bozukluğu, aktif enfeksiyon bölgesi, malignite, kalp pili.

6. BEYAN
ESWT tedavisine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // GASTROENTEROLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kolonoskopi-onam": {
    icerik: `KOLONOSKOPİ / SİGMOİDOSKOPİ AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Kolonoskopi; anüsten girilmesi yoluyla kalın bağırsağın (kolon) tümüyle, sigmoid­oskopide ise sadece son bölümünün kamera ile görüntülenmesi işlemidir. Gerektiğinde biyopsi alınır veya polip çıkarılır.

2. AMAÇ
• Kolorektal kanser taraması
• Dışkıda kan, anemi, açıklanamayan kilo kaybı araştırması
• Polip saptama ve çıkarma (polipektomi)
• Kronik ishal veya karın ağrısı araştırması

3. HAZIRLIK
• İşlem öncesi 24-48 saat berrak sıvı diyeti
• Bağırsak temizleyici (laksatif) kullanımı zorunludur
• Demir içeren ilaçlar 1 hafta öncesinden kesilmelidir

4. OLASI RİSKLER
• Perforasyon (bağırsak delinmesi) — %0,1 (polipektomide %0,5'e çıkar)
• Kanama (özellikle polipektomiden sonra — %0,5-2)
• Hazırlık ilaçları nedeniyle elektrolit bozukluğu
• Anestezi / sedasyon komplikasyonları
• İşlemin tamamlanamaması (%5-10 teknik nedenle)

5. BEYAN
Kolonoskopi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "gastroskopi-onam": {
    icerik: `ÜST GİS ENDOSKOPİ (GASTROSKOPİ) AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Gastroskopi (özofagogastroduodenoskopi — ÖGD); ağızdan girilen ince kamera ile yemek borusu (özofagus), mide ve onikiparmak bağırsağının görüntülenmesi işlemidir. Biyopsi alınabilir veya tedavi uygulanabilir.

2. AMAÇ
• Mide ağrısı, yanması, yutma güçlüğü araştırması
• Gastrointestinal kanama kaynağı tespiti
• H. Pylori biyopsisi
• Polipin veya yabancı cismin çıkarılması

3. HAZIRLIK
• İşlem öncesi 6-8 saat aç kalınmalıdır
• Gün içi araç kullanımı sınırlandırılmalıdır (sedasyon uygulanırsa)

4. OLASI RİSKLER
• Boğaz ağrısı, şişkinlik (geçici)
• Kanama (biyopsi sonrası — nadir)
• Perforasyon (yemek borusu/mide delinmesi — çok nadir, <%0,1)
• Sedasyon komplikasyonları

5. BEYAN
Gastroskopi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "ercp-onam": {
    icerik: `ERCP (ENDOSKOPİK RETROGRAD KOLANJİOPANKREATOGRAFİ) AYDINLATILMIŞ ONAM FORMU

ÖNEMLİ: ERCP, yüksek risk taşıyan bir girişimsel işlemdir. Lütfen aşağıdaki bilgileri dikkatlice okuyun.

1. İŞLEMİN TANIMI
ERCP; endoskop aracılığıyla safra yolu ve pankreas kanalına girilerek görüntüleme yapılması, taş çıkarılması, darlık açılması veya stent yerleştirilmesi işlemidir. Sedasyon veya genel anestezi altında yapılır.

2. ENDİKASYON
□ Safra yolu taşı
□ Safra yolu darlığı / tıkanma sarılığı
□ Pankreas kanalı hastalıkları
□ Tanısal amaç

3. OLASI RİSKLER (DİĞER ENDOSKOPİLERE GÖRE DAHA YÜKSEK RİSK)
• Post-ERCP pankreatiti — %3-5, ciddi olabilir, hastane yatışı gerektirebilir
• Kanama (sfinkterotomi sonrası — %1-2)
• Perforasyon (%0,3-1)
• Kolanjit (safra yolu enfeksiyonu)
• Kontrast madde reaksiyonu (nadir, önceden antihistaminik verilebilir)
• Stent tıkanması / yer değiştirmesi

4. ALTERNATİF
MRCP (görüntüleme amaçlı, non-invazif), perkütan transhepatik girişim veya cerrahi.

5. BEYAN
ERCP işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // İÇ HASTALIKLARI — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "bobrek-biyopsi-onam": {
    icerik: `BÖBREK BİYOPSİSİ AYDINLATILMIŞ ONAM FORMU

1. İŞLEMİN TANIMI
Perkütan böbrek biyopsisi; ultrasonografi veya BT eşliğinde ince iğne ile böbrek dokusundan örnek alınması işlemidir. Lokal anestezi altında yapılır.

2. AMAÇ
Proteinüri, hematüri, böbrek yetmezliği veya böbrek hastalığı kuşkusunda kesin tanı konulması.

3. OLASI RİSKLER
• İdrarda kan (hematüri) — %5-10 belirgin, genellikle 24-48 saatte düzelir
• Perirenal hematom — %50-85 küçük (çoğu asemptomatik), %0,5-1 transfüzyon gerektirir
• Arteriyovenöz fistül (nadir, çoğu kendiliğinden kapanır)
• Ağrı (biyopsi bölgesinde)
• Enfeksiyon (nadir)
• Komşu organ yaralanması (çok nadir)

4. AMELİYAT SONRASI
• 6-24 saat yatak istirahati
• İlk 48 saat yoğun egzersizden kaçınılmalıdır
• İdrar rengindeki artış hekime bildirilmelidir

5. BEYAN
Böbrek biyopsisi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "iv-infuzyon-onam": {
    icerik: `İNTRAVENÖZ TEDAVİ / İNFÜZYON ONAM FORMU

1. İŞLEMİN TANIMI
Damar yolu açılarak (intravenöz kateter / kanül) ilaç, sıvı, kan ürünü veya beslenme solüsyonunun doğrudan dolaşım sistemine verilmesi işlemidir.

2. VERİLECEK TEDAVİ
□ Antibiyotik infüzyonu    □ Demir infüzyonu
□ Biyolojik ilaç           □ Vitamin/destek tedavisi
□ Serum/sıvı replasmanı    □ Diğer: .......................

3. OLASI RİSKLER
• Damar yolu komplikasyonları: flebit (damar iltihabı), hematom, infiltrasyon
• İlaç reaksiyonu: alerjik reaksiyon / anafilaksi (acil müdahale hazır tutulur)
• Enfeksiyon (santral kateter kullanımında daha dikkatli)
• Sıvı yüklenmesi (kalp/böbrek yetmezliğinde)
• İlaç-ilaç etkileşimi

4. BEYAN
İntravenöz tedaviye onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "diyabet-izlem-onam": {
    icerik: `DİYABETES MELLİTUS İZLEM VE TEDAVİ ONAM FORMU

1. TANI VE TEDAVİ PLANI
Diabetes Mellitus Tip: □ Tip 1  □ Tip 2  □ Gestasyonel  □ Diğer
Planlanan tedavi: □ Diyet/Egzersiz  □ Oral antidiyabetik  □ İnsülin  □ GLP-1 agonist

2. HEDEFLER
• HbA1c hedefi: ............  Açlık kan şekeri hedefi: ............
• Lipid ve tansiyon kontrolü, komplikasyon taraması planlanmaktadır.

3. OLASI YAN ETKİLER (Tedaviye Göre)
İnsülin / sülfonilüre: Hipoglisemi (kan şekeri düşmesi) — dikkatli izlem gerektirir.
Metformin: Bulantı, ishal (başlangıçta), laktik asidoz (nadir, böbrek fonksiyonu izlenmeli).
GLP-1 agonist: Bulantı, kilo kaybı (istenilen), tiroid kanseri (hayvan çalışmalarında, insanda risk belirsiz).
SGLT-2 inhibitörü: İdrar yolu enfeksiyonu, DKA riski.

4. HASTA SORUMLULULUKLARI
• Düzenli kan şekeri takibi
• Beslenme ve egzersiz kurallarına uyum
• Belirlenen kontrol tarihlerine uyma
• İlaç yan etkisi durumunda hemen bilgilendirme

5. BEYAN
Diyabet tedavisi ve izlem programına onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ONKOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "kemoterapi-onam": {
    icerik: `KEMOTERAPİ AYDINLATILMIŞ ONAM FORMU

ÖNEMLİ: Bu form her kemoterapi protokolü için ayrıca düzenlenmelidir.

1. PROTOKOL BİLGİSİ
İlaç/Protokol adı: .........................................
Siklus sayısı: ............   Siklus aralığı: ............
Uygulama yolu: □ IV infüzyon  □ Oral  □ Subkütan

2. AMAÇ
□ Küratif (tedavi edici) amaç
□ Adjuvan / Neoadjuvan (ameliyat öncesi/sonrası)
□ Palyatif (hastalığı kontrol altında tutma)

3. BEKLENEN YAN ETKİLER (Genel)
• Kemik iliği baskılanması → Enfeksiyona yatkınlık, kanama, anemi
• Bulantı, kusma (antiemetik ilaçlarla kontrol edilir)
• Saç dökülmesi (reversibl — tedavi bitince geri döner)
• Yorgunluk, iştahsızlık
• Ağız yaraları (mukozit)
• Nöropati (uyuşukluk, karıncalanma)
• Kardiyotoksisite (bazı ajanlarda — EKG/EKO takibi gerekebilir)
• Bulantı

4. ACİL BAŞVURU GEREKTİREN DURUMLAR
38°C üzeri ateş (febril nötropeni), ciddi kanama, nefes darlığı, göğüs ağrısı.

5. BEYAN
Kemoterapi tedavisini anladım ve onaylıyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "doku-biyopsisi-onam": {
    icerik: `DOKU BİYOPSİSİ VE PATOLOJİ ONAM FORMU

1. İŞLEMİN TANIMI
Biyopsi; tanı amacıyla vücuttan doku veya hücre örneği alınması işlemidir.
Biyopsi bölgesi: .........................................
Yöntem: □ İnce iğne  □ Core/Tru-cut  □ Punch biyopsi  □ Eksizyonel biyopsi
Görüntüleme rehberliği: □ USG  □ BT  □ Palpasyon

2. AMAÇ
Lezyonun iyi huylu veya kötü huylu olup olmadığını belirlemek; tanıya ulaşmak ve tedavi planlamak.

3. OLASI RİSKLER
• Biyopsi bölgesinde ağrı, ekimoz, şişlik
• Kanama (antikoagülan kullananlarda risk artar)
• Enfeksiyon
• Yetersiz doku alınması, tekrar biyopsi ihtiyacı
• Organ yaralanması (bölgeye özgü)

4. SONUÇ SÜRECİ
Patoloji sonucu genellikle 5-10 iş gününde hazır olur. Bazı özel testler (IHK, genetik) ek süre gerektirebilir.

5. BEYAN
Doku biyopsisi işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "paliatif-bakim-onam": {
    icerik: `PALYATİF BAKIM VE DESTEK TEDAVİ ONAM FORMU

1. PALYATİF BAKIMIN TANIMI
Palyatif bakım; yaşamı tehdit eden hastalıklarda hastanın ve ailesinin yaşam kalitesini iyileştirmeye odaklanan, ağrı ve diğer semptomları kontrol altına alan, psikolojik, sosyal ve manevi destek sunan bir yaklaşımdır. Palyatif bakım, küratif tedavinin yanında veya yerine uygulanabilir.

2. KAPSAM
• Ağrı yönetimi (güçlü opioid analjezikler dahil)
• Semptom kontrolü (bulantı, nefes darlığı, yorgunluk)
• Psikososyal destek
• Beslenme desteği
• Gerektiğinde evde bakım

3. OPIOID KULLANIMINA İLİŞKİN BİLGİLENDİRME
Güçlü ağrı kesiciler (morfin, oksikodon vb.) reçetelenebildiğinde bağımlılık riski mevcut olmakla birlikte, ağrı yönetiminde terapötik kullanım medikal açıdan kabul görmektedir.

4. HASTA HAKLARI
• İstediğiniz zaman palyatif bakımdan vazgeçme hakkınız vardır
• İkinci görüş alma hakkınız mevcuttur
• Resüsitasyon kararları ayrıca görüşülecektir (DNR/DNİ direktifleri)

5. BEYAN
Palyatif bakım programına dahil olmayı onaylıyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ROMATOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "biyolojik-ilac-onam": {
    icerik: `BİYOLOJİK İLAÇ TEDAVİSİ (Anti-TNF / IL-6 / JAK İnhibitörü vb.) ONAM FORMU

1. İŞLEMİN TANIMI
Biyolojik ilaçlar; immün sistemin belirli bileşenlerini hedef alan, protein bazlı tedavilerdir. Romatoid artrit, ankilozan spondilit, psöriatik artrit ve diğer otoimmün hastalıklarda kullanılır.

Planlanan ilaç: .........................................
Uygulama şekli: □ SC enjeksiyon  □ IV infüzyon  □ Oral

2. AMAÇ
Hastalık aktivitesinin kontrol altına alınması, eklem hasarının önlenmesi ve yaşam kalitesinin artırılması.

3. OLASI RİSKLER
• Enfeksiyona yatkınlık (özellikle TB — tedavi öncesi PPD/IGRA zorunlu)
• İnjeksiyon bölgesi reaksiyonu
• Alerjik/infüzyon reaksiyonu
• Lenfoma riski artışı (uzun dönemde — çok düşük mutlak risk)
• Kalp yetmezliğinin kötüleşmesi (anti-TNF)
• Nörolojik komplikasyonlar (çok nadir)
• Yaygın mantar enfeksiyonu riski (JAK inhibitörleri)

4. ZORUNLU TESTLER
TB taraması, hepatit B/C serolojisi, tam kan, biyokimya işlem öncesi tamamlanmıştır.

5. BEYAN
Biyolojik ilaç tedavisini anladım ve onaylıyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "romatoloji-enjeksiyon": {
    icerik: `ROMATOİD EKLEM İÇİ KORTİKOSTEROİD ENJEKSİYON ONAM FORMU

1. İŞLEMİN TANIMI
Romatizmal hastalıklarda inflamasyon gösteren eklem boşluğuna kortikosteroid (metilprednizolon, betametazon vb.) enjeksiyonu yapılır. Aspirasyon eşlik edebilir.

Enjeksiyon yapılacak eklem: .........................................

2. AMAÇ
• Akut eklem inflamasyonunun ve ağrısının hızla giderilmesi
• Sistemik tedavi etkisi beklenmeden lokal rahatlama sağlanması

3. OLASI RİSKLER
• Post-enjeksiyon flare (1-2 gün ağrı artışı — %2-10)
• Eklem enfeksiyonu (septik artrit — çok nadir, <1/10.000)
• Cilt atrofisi, depigmentasyon (subkütan yağa sızma)
• Tendon rüptürü (tendon içine enjeksiyondan kaçınılır)
• Kan şekeri geçici yükselmesi (diyabetiklerde)
• Aynı ekleme yılda 3-4 enjeksiyondan fazlası önerilmez

4. BEYAN
Eklem içi kortikosteroid enjeksiyonuna onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  // ════════════════════════════════════════════════════════════════════════
  // ENDOKRİNOLOJİ — YENİ FORMLAR
  // ════════════════════════════════════════════════════════════════════════

  "tiroid-biyopsi-onam": {
    icerik: `TİROİD İNCE İĞNE ASPİRASYON BİYOPSİSİ (TİİAB) ONAM FORMU

1. İŞLEMİN TANIMI
TİİAB (Tiroid İnce İğne Aspirasyon Biyopsisi); ultrasonografi eşliğinde tiroid nodülünden hücre ve sıvı örneği alınması işlemidir. Lokal anestezi genellikle gerekmez.

2. AMAÇ
Tiroid nodülünün iyi huylu veya kötü huylu olup olmadığını belirlemek.

3. OLASI RİSKLER
• İğne giriş bölgesinde hafif ağrı ve ekimoz (1-2 gün)
• Kanama (hematom — nadir, baskı uygulanır)
• Enfeksiyon (son derece nadir)
• Yetersiz örnek alınması (%5-10) — tekrar biyopsi gerekebilir
• Ses kısıklığı (larenks siniri yakınındaki nodüllerde geçici — nadir)

4. BETHESDA SINIFLANDIRMASI
Biyopsi sonuçları Bethesda Sistemi'ne göre raporlanır; sonucunuzu hekiminiz sizinle yorumlayacaktır.

5. BEYAN
TİİAB işlemine onay veriyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
  },

  "insülin-baslama-onam": {
    icerik: `İNSÜLİN VE ANTİDİYABETİK İLAÇ BAŞLAMA ONAM FORMU

1. TEDAVİ PLANI
Tip: □ Bazal insülin  □ Bazal-bolus insülin  □ İnsülin pompası  □ GLP-1 agonist
Önerilen ilaç/doz: .........................................

2. İNSÜLİN KULLANIMINA HAZIRLIK
• İnsülin enjeksiyon tekniği (açı, bölge rotasyonu) eğitimi verilecektir
• Kan şekeri ölçüm cihazı kullanımı öğretilecektir
• Hipoglisemi tanıma ve tedavisi (hızlı şeker kaynağı bulundurma) anlatılacaktır

3. HİPOGLİSEMİ (KAN ŞEKERİ DÜŞÜKLÜĞÜ)
• Belirtiler: Titreme, terleme, baş dönmesi, çarpıntı, bilinç bulanıklığı
• Hafif: 15 g hızlı etki eden karbonhidrat (şeker, meyve suyu)
• Ağır/Bilinçsiz: Glukagon enjeksiyon veya acil servise başvuru

4. İZLEM
HbA1c her 3 ayda bir, böbrek fonksiyonu ve lipid profili yılda en az bir kez izlenecektir.

5. BEYAN
İnsülin / antidiyabetik ilaç başlama tedavisini anladım ve onaylıyorum.

Hasta Adı Soyadı: .....................................    Tarih: ..................
T.C. Kimlik No: ..........................................    İmza: ..................

Hekim Adı Soyadı / Unvanı: ..........................    Tarih: ..................
Diploma No: .............................................    İmza / Kaşe: ...........`,
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

      </div>
        </div> {/* flex-1 */}
      </div> {/* flex row */}
    </div>
  );
}
