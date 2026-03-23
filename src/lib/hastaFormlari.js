// Branşa özel hasta onam formları kataloğu

export const HASTA_FORMLARI = [
  // ─── ESTETİK & PLASTİK ───────────────────────────────────────────────
  { id: "rinoplasti-onam",        uzmanliklar: ["rinoplasti","plastik-cerrahi","estetik-cerrahi","kbb-uzmani"], baslik: "Rinoplasti (Burun Estetiği) Aydınlatılmış Onam Formu",           aciklama: "Burun estetiği operasyonu öncesi hastanın okuyup imzalaması gereken standart onam formu.",          kategori: "Estetik Cerrahi", ekKategoriler: ["KBB"],   dil: "tr" },
  { id: "genel-estetik-onam",     uzmanliklar: ["plastik-cerrahi","estetik-cerrahi"],                          baslik: "Genel Estetik Cerrahi Aydınlatılmış Onam Formu",                aciklama: "Tüm estetik cerrahi operasyonları için genel onam formu.",                                          kategori: "Estetik Cerrahi",                              dil: "tr" },
  { id: "liposuction-onam",       uzmanliklar: ["plastik-cerrahi","estetik-cerrahi"],                          baslik: "Liposuction Aydınlatılmış Onam Formu",                          aciklama: "Yağ alımı operasyonu öncesi standart onam formu.",                                                  kategori: "Estetik Cerrahi",                              dil: "tr" },
  { id: "meme-buyutme-onam",      uzmanliklar: ["plastik-cerrahi","estetik-cerrahi"],                          baslik: "Meme Büyütme (Augmentasyon Mammoplasti) Onam Formu",            aciklama: "Silikon implant ile meme büyütme ameliyatı öncesi kapsamlı onam formu.",                            kategori: "Estetik Cerrahi",                              dil: "tr" },
  { id: "meme-kucultme-onam",     uzmanliklar: ["plastik-cerrahi","estetik-cerrahi"],                          baslik: "Meme Küçültme (Redüksiyon Mammoplasti) Onam Formu",             aciklama: "Meme küçültme ve şekillendirme ameliyatı için onam formu.",                                        kategori: "Estetik Cerrahi",                              dil: "tr" },
  { id: "blefaroplasti-onam",     uzmanliklar: ["plastik-cerrahi","estetik-cerrahi","goz-hastaliklari"],       baslik: "Göz Kapağı Estetiği (Blefaroplasti) Onam Formu",               aciklama: "Üst ve/veya alt göz kapağı estetiği ameliyatı öncesi onam formu.",                                  kategori: "Estetik Cerrahi", ekKategoriler: ["Göz Hastalıkları"], dil: "tr" },
  { id: "abdominoplasti-onam",    uzmanliklar: ["plastik-cerrahi","estetik-cerrahi"],                          baslik: "Karın Germe (Abdominoplasti) Onam Formu",                      aciklama: "Karın duvarı germe ve şekillendirme operasyonu için onam formu.",                                   kategori: "Estetik Cerrahi",                              dil: "tr" },

  // ─── DİŞ HEKİMLİĞİ ───────────────────────────────────────────────────
  { id: "dis-implant-onam",       uzmanliklar: ["dis-hekimi"],  baslik: "Dental İmplant Aydınlatılmış Onam Formu",              aciklama: "İmplant uygulaması öncesi hastanın bilgilendirilmesi ve onayı için.",             kategori: "Diş Hekimliği", dil: "tr" },
  { id: "dis-dolgu-onam",         uzmanliklar: ["dis-hekimi"],  baslik: "Diş Dolgusu / Kanal Tedavisi Onam Formu",              aciklama: "Konservatif diş tedavileri için standart onam.",                                   kategori: "Diş Hekimliği", dil: "tr" },
  { id: "ortodonti-sozlesme",     uzmanliklar: ["dis-hekimi"],  baslik: "Ortodonti Tedavi Sözleşmesi ve Onam Formu",            aciklama: "Braket/aligner tedavisi başlangıcında imzalanacak form.",                          kategori: "Diş Hekimliği", dil: "tr" },
  { id: "dis-cekimi-onam",        uzmanliklar: ["dis-hekimi"],  baslik: "Diş Çekimi / Gömülü Diş Ameliyatı Onam Formu",        aciklama: "Basit veya cerrahi diş çekimi öncesi standart onam formu.",                        kategori: "Diş Hekimliği", dil: "tr" },
  { id: "zirkonyum-kaplama-onam", uzmanliklar: ["dis-hekimi"],  baslik: "Zirkonyum / Porselen Kaplama Onam Formu",              aciklama: "Estetik diş kaplama uygulaması öncesi bilgilendirme ve onam formu.",               kategori: "Diş Hekimliği", dil: "tr" },
  { id: "dis-beyazlatma-onam",    uzmanliklar: ["dis-hekimi"],  baslik: "Diş Beyazlatma (Bleaching) Onam Formu",               aciklama: "Ofis tipi veya ev tipi diş beyazlatma uygulaması öncesi onam formu.",              kategori: "Diş Hekimliği", dil: "tr" },

  // ─── PSİKİYATRİ & PSİKOLOJİ ──────────────────────────────────────────
  { id: "psikiyatri-ilac-onam",   uzmanliklar: ["psikiyatri"],  baslik: "Psikiyatrik İlaç Tedavisi Aydınlatılmış Onam Formu",   aciklama: "Antidepresan, antipsikotik vb. ilaç başlangıcında kullanılan form.",              kategori: "Psikiyatri",    dil: "tr" },
  { id: "psikoloji-gizlilik",     uzmanliklar: ["psikiyatri"],  baslik: "Psikolojik Danışmanlık Gizlilik Sözleşmesi",           aciklama: "Seans gizliliği ve sınırlarının belirtildiği standart form.",                      kategori: "Psikiyatri",    dil: "tr" },
  { id: "ect-onam",               uzmanliklar: ["psikiyatri"],  baslik: "Elektrokonvülsif Terapi (EKT) Onam Formu",             aciklama: "EKT uygulaması öncesi hasta/yakın tarafından imzalanacak kapsamlı onam formu.",   kategori: "Psikiyatri",    dil: "tr" },

  // ─── KARDİYOLOJİ ────────────────────────────────────────────────────
  { id: "kardiyoloji-anjio-onam", uzmanliklar: ["kardiyoloji"], baslik: "Koroner Anjiyografi Aydınlatılmış Onam Formu",         aciklama: "Anjiyografi işlemi öncesi hastanın onayı için.",                                   kategori: "Kardiyoloji",   dil: "tr" },
  { id: "kardiyoloji-genel",      uzmanliklar: ["kardiyoloji"], baslik: "Kardiyoloji Hasta Bilgi ve Onam Formu",                aciklama: "Kardiyoloji muayene ve tetkik sürecine başlarken doldurulan form.",                 kategori: "Kardiyoloji",   dil: "tr" },
  { id: "kalp-pili-onam",         uzmanliklar: ["kardiyoloji"], baslik: "Kalıcı Kalp Pili (Pacemaker) Takma Onam Formu",       aciklama: "Kalıcı kalp pili implantasyonu öncesi kapsamlı onam formu.",                       kategori: "Kardiyoloji",   dil: "tr" },
  { id: "kardiyoversiyon-onam",   uzmanliklar: ["kardiyoloji"], baslik: "Elektriksel Kardiyoversiyon Onam Formu",               aciklama: "Ritim bozukluğu tedavisinde uygulanan elektriksel kardiyoversiyon onam formu.",    kategori: "Kardiyoloji",   dil: "tr" },

  // ─── ORTOPEDİ ────────────────────────────────────────────────────────
  { id: "ortopedi-ameliyat-onam", uzmanliklar: ["ortopedi"],    baslik: "Ortopedik Cerrahi Aydınlatılmış Onam Formu",          aciklama: "Kemik, eklem ve doku operasyonları için genel onam.",                              kategori: "Ortopedi",      dil: "tr" },
  { id: "ortopedi-prp",           uzmanliklar: ["ortopedi"],    baslik: "PRP / Kök Hücre Tedavisi Onam Formu",                 aciklama: "Rejeneratif tedaviler için kullanılan onam formu.",                                kategori: "Ortopedi",      dil: "tr" },
  { id: "diz-protezi-onam",       uzmanliklar: ["ortopedi"],    baslik: "Diz Protezi (Total / Parsiyel) Onam Formu",           aciklama: "Diz protezi ameliyatı öncesi kapsamlı bilgilendirme ve onam formu.",                kategori: "Ortopedi",      dil: "tr" },
  { id: "omurga-cerrahisi-onam",  uzmanliklar: ["ortopedi"],    baslik: "Omurga Cerrahisi Aydınlatılmış Onam Formu",           aciklama: "Disk hernisi, omurga füzyonu ve diğer omurga operasyonları için onam formu.",      kategori: "Ortopedi",      dil: "tr" },

  // ─── GÖZ HASTALIKLARI ────────────────────────────────────────────────
  { id: "goz-laser-onam",         uzmanliklar: ["goz-hastaliklari"], baslik: "Excimer Laser (LASIK/LASEK) Aydınlatılmış Onam Formu",  aciklama: "Göz lazer operasyonu öncesi kapsamlı onam formu.",         kategori: "Göz Hastalıkları", dil: "tr" },
  { id: "goz-katarakt-onam",      uzmanliklar: ["goz-hastaliklari"], baslik: "Katarakt Operasyonu Aydınlatılmış Onam Formu",          aciklama: "Katarakt ve göz içi lens değişimi için onam.",             kategori: "Göz Hastalıkları", dil: "tr" },
  { id: "glokom-tedavi-onam",     uzmanliklar: ["goz-hastaliklari"], baslik: "Glokom (Göz Tansiyonu) Tedavi Onam Formu",             aciklama: "Glokom lazer/cerrahi tedavisi ve ilaç başlangıcı için onam formu.", kategori: "Göz Hastalıkları", dil: "tr" },
  { id: "intravitreal-onam",      uzmanliklar: ["goz-hastaliklari"], baslik: "İntravitreal Enjeksiyon Onam Formu",                   aciklama: "Göz içi ilaç enjeksiyonu (anti-VEGF vb.) öncesi onam formu.",  kategori: "Göz Hastalıkları", dil: "tr" },

  // ─── DERMATOLOJİ ────────────────────────────────────────────────────
  { id: "dermatoloji-botoks",     uzmanliklar: ["dermatoloji"],  baslik: "Botoks / Dolgu Uygulaması Onam Formu",                aciklama: "Estetik dermatoloji uygulamaları için standart onam.",                             kategori: "Dermatoloji",   dil: "tr" },
  { id: "dermatoloji-lazer",      uzmanliklar: ["dermatoloji"],  baslik: "Dermatolojik Lazer Tedavisi Onam Formu",              aciklama: "Cilt lazer uygulamaları için onam formu.",                                         kategori: "Dermatoloji",   dil: "tr" },
  { id: "lazer-epilasyon-onam",   uzmanliklar: ["dermatoloji"],  baslik: "Lazer Epilasyon Onam Formu",                          aciklama: "Kalıcı tüy azaltma lazer tedavisi öncesi onam formu.",                             kategori: "Dermatoloji",   dil: "tr" },
  { id: "kimyasal-peeling-onam",  uzmanliklar: ["dermatoloji"],  baslik: "Kimyasal Peeling (Cilt Soyma) Onam Formu",            aciklama: "Kimyasal soyma ve cilt yenileme uygulamaları için onam formu.",                    kategori: "Dermatoloji",   dil: "tr" },
  { id: "dermatoloji-prp-onam",   uzmanliklar: ["dermatoloji"],  baslik: "Dermatolojik PRP / Mezoterapi Onam Formu",            aciklama: "Saç ve cilt PRP ile mezoterapi uygulamaları için onam formu.",                    kategori: "Dermatoloji",   dil: "tr" },

  // ─── KBB ─────────────────────────────────────────────────────────────
  { id: "kbb-ameliyat-onam",      uzmanliklar: ["kbb-uzmani"],   baslik: "KBB Cerrahi Aydınlatılmış Onam Formu",               aciklama: "Kulak, burun, boğaz operasyonları için genel onam.",                               kategori: "KBB",           dil: "tr" },
  { id: "septoplasti-onam",       uzmanliklar: ["kbb-uzmani","rinoplasti"], baslik: "Septoplasti / Septum Ameliyatı Onam Formu",aciklama: "Burun septum eğriliği düzeltme ameliyatı öncesi kapsamlı onam formu.",              kategori: "KBB", ekKategoriler: ["Estetik Cerrahi"], dil: "tr" },
  { id: "tonsillektomi-onam",     uzmanliklar: ["kbb-uzmani"],   baslik: "Tonsillektomi / Adenoidektomi Onam Formu",           aciklama: "Bademcik ve/veya geniz eti ameliyatı öncesi onam formu.",                          kategori: "KBB",           dil: "tr" },
  { id: "timpanoplasti-onam",     uzmanliklar: ["kbb-uzmani"],   baslik: "Kulak Zarı Ameliyatı (Timpanoplasti) Onam Formu",    aciklama: "Kulak zarı onarımı ve orta kulak ameliyatları için kapsamlı onam formu.",           kategori: "KBB",           dil: "tr" },
  { id: "fess-sinüs-onam",        uzmanliklar: ["kbb-uzmani"],   baslik: "Endoskopik Sinüs Cerrahisi (FESS) Onam Formu",       aciklama: "Kronik sinüzit ve nazal polip cerrahisi için kapsamlı onam formu.",                 kategori: "KBB",           dil: "tr" },

  // ─── ÇOCUK SAĞLIĞI ──────────────────────────────────────────────────
  { id: "cocuk-asi-onam",         uzmanliklar: ["cocuk-hastaliklari"], baslik: "Aşı Uygulama Aydınlatılmış Onam Formu",        aciklama: "Pediatrik aşılama için ebeveyn onam formu.",                                       kategori: "Çocuk Sağlığı", dil: "tr" },
  { id: "cocuk-genel-onam",       uzmanliklar: ["cocuk-hastaliklari"], baslik: "Pediatri Genel Muayene ve İşlem Onam Formu",   aciklama: "18 yaş altı hastalar için ebeveyn/vasi onam formu.",                               kategori: "Çocuk Sağlığı", dil: "tr" },
  { id: "asi-ret-formu",          uzmanliklar: ["cocuk-hastaliklari","aile-hekimligi"], baslik: "Aşı Reddi Beyan Formu",       aciklama: "Aşı uygulamasını reddeden ebeveyn/hasta için 1593 sayılı Kanun kapsamında belgeleme formu.", kategori: "Çocuk Sağlığı", dil: "tr" },
  { id: "cocuk-ameliyat-onam",    uzmanliklar: ["cocuk-hastaliklari"], baslik: "Pediatrik Cerrahi Onam Formu (Veli/Vasi)",     aciklama: "18 yaş altı hastalar için cerrahi girişim öncesi veli/vasi onam formu.",             kategori: "Çocuk Sağlığı", dil: "tr" },

  // ─── ÜROLOJİ ──────────────────────────────────────────────────────────
  { id: "prostat-ameliyat-onam",  uzmanliklar: ["uroloji"],      baslik: "Prostat Ameliyatı (TUR-P / HoLEP) Onam Formu",      aciklama: "İyi huylu prostat büyümesi cerrahisi için kapsamlı onam formu.",                    kategori: "Üroloji",       dil: "tr" },
  { id: "tas-kirma-eswl-onam",    uzmanliklar: ["uroloji"],      baslik: "Böbrek Taşı Kırma (ESWL) Onam Formu",              aciklama: "Şok dalga ile böbrek/üreter taşı kırma işlemi öncesi onam formu.",                   kategori: "Üroloji",       dil: "tr" },
  { id: "sistoskopi-onam",        uzmanliklar: ["uroloji"],      baslik: "Sistoskopi / Üreterorenoskopi Onam Formu",          aciklama: "Mesane ve üst üriner sistem endoskopisi öncesi onam formu.",                        kategori: "Üroloji",       dil: "tr" },
  { id: "sunnet-onam",            uzmanliklar: ["uroloji","cocuk-hastaliklari"], baslik: "Sünnet Onam Formu",                  aciklama: "Sünnet operasyonu öncesi standart bilgilendirme ve onam formu.",                    kategori: "Üroloji", ekKategoriler: ["Çocuk Sağlığı"], dil: "tr" },
  { id: "vazektomi-onam",         uzmanliklar: ["uroloji"],      baslik: "Vazektomi (Geri Dönüşümsüz Kontrasepsiyon) Onam Formu", aciklama: "Vazektomi öncesi geri dönüşümsüzlük vurgusu yapılan kapsamlı onam formu.",    kategori: "Üroloji",       dil: "tr" },

  // ─── KADIN HASTALIKLARI & DOĞUM ──────────────────────────────────────
  { id: "dogum-sezaryen-onam",    uzmanliklar: ["kadin-hastaliklari-ve-dogum"], baslik: "Normal / Sezaryen Doğum Onam Formu",  aciklama: "Vajinal doğum ve sezaryen operasyonu öncesi kapsamlı onam formu.",                  kategori: "Kadın Hast. & Doğum", dil: "tr" },
  { id: "laparoskopi-jinekoloji", uzmanliklar: ["kadin-hastaliklari-ve-dogum"], baslik: "Jinekolojik Laparoskopi / Histeroskopi Onam Formu", aciklama: "Tanısal/operatif jinekolojik laparoskopi ve histeroskopi için onam formu.", kategori: "Kadın Hast. & Doğum", dil: "tr" },
  { id: "kuretaj-onam",           uzmanliklar: ["kadin-hastaliklari-ve-dogum"], baslik: "Küretaj / Rahim Tahliyesi Onam Formu",aciklama: "Diagnostik ve terapötik küretaj işlemi öncesi onam formu.",                         kategori: "Kadın Hast. & Doğum", dil: "tr" },
  { id: "ria-onam",               uzmanliklar: ["kadin-hastaliklari-ve-dogum"], baslik: "RİA (Rahim İçi Araç) Uygulama Onam Formu", aciklama: "Rahim içi araç takılması/çıkarılması için standart onam formu.",           kategori: "Kadın Hast. & Doğum", dil: "tr" },
  { id: "kolposkopi-onam",        uzmanliklar: ["kadin-hastaliklari-ve-dogum"], baslik: "Kolposkopi ve Biyopsi Onam Formu",    aciklama: "Anormal smear sonrası kolposkopi ve serviks biyopsisi için onam formu.",            kategori: "Kadın Hast. & Doğum", dil: "tr" },

  // ─── GENEL CERRAHİ ───────────────────────────────────────────────────
  { id: "kolesistektomi-onam",    uzmanliklar: ["genel-cerrahi"], baslik: "Kolesistektomi (Safra Kesesi Ameliyatı) Onam Formu",aciklama: "Laparoskopik veya açık kolesistektomi operasyonu için kapsamlı onam formu.",       kategori: "Genel Cerrahi", dil: "tr" },
  { id: "herni-ameliyat-onam",    uzmanliklar: ["genel-cerrahi"], baslik: "Fıtık (Herni) Ameliyatı Onam Formu",               aciklama: "İnguinal, umbilikal ve insizyonel herni ameliyatları için onam formu.",             kategori: "Genel Cerrahi", dil: "tr" },
  { id: "apendektomi-onam",       uzmanliklar: ["genel-cerrahi"], baslik: "Apendektomi (Apandis Ameliyatı) Onam Formu",       aciklama: "Akut apandisit nedeniyle yapılacak apendektomi operasyonu için onam formu.",        kategori: "Genel Cerrahi", dil: "tr" },
  { id: "hemoroid-cerrahisi-onam",uzmanliklar: ["genel-cerrahi"], baslik: "Hemoroid Cerrahisi Onam Formu",                    aciklama: "Hemoroidektomi ve anal bölge operasyonları için onam formu.",                       kategori: "Genel Cerrahi", dil: "tr" },
  { id: "meme-biyopsi-onam",      uzmanliklar: ["genel-cerrahi"], baslik: "Meme Kitlesi Biyopsisi / Eksizyonu Onam Formu",    aciklama: "Meme kitlesi biyopsisi ve lumpektomi operasyonu için onam formu.",                   kategori: "Genel Cerrahi", dil: "tr" },

  // ─── NÖROLOJİ ────────────────────────────────────────────────────────
  { id: "emg-onam",               uzmanliklar: ["noroloji"],     baslik: "EMG / Sinir İletim Çalışması Onam Formu",           aciklama: "Elektromiyografi ve sinir iletim hızı ölçümü için onam formu.",                     kategori: "Nöroloji",      dil: "tr" },
  { id: "lomber-ponksiyon-onam",  uzmanliklar: ["noroloji"],     baslik: "Lomber Ponksiyon (Bel Deliği) Onam Formu",         aciklama: "Beyin omurilik sıvısı alımı (LP) işlemi öncesi kapsamlı onam formu.",               kategori: "Nöroloji",      dil: "tr" },
  { id: "noroloji-botoks-onam",   uzmanliklar: ["noroloji"],     baslik: "Botulinum Toksin Uygulaması (Nöroloji) Onam Formu",aciklama: "Migren, spastisite ve distoni tedavisinde BTX uygulaması için onam formu.",          kategori: "Nöroloji",      dil: "tr" },

  // ─── FİZİK TEDAVİ & REHABİLİTASYON ─────────────────────────────────
  { id: "fizik-tedavi-onam",      uzmanliklar: ["fizik-tedavi"], baslik: "Fizik Tedavi ve Rehabilitasyon Onam Formu",         aciklama: "Fizik tedavi programı başlangıcında imzalanacak standart onam formu.",               kategori: "Fizik Tedavi",  dil: "tr" },
  { id: "eklem-enjeksiyon-onam",  uzmanliklar: ["fizik-tedavi","ortopedi"], baslik: "Eklem İçi / Yumuşak Doku Enjeksiyonu Onam Formu", aciklama: "Kortikosteroid, hyaluronik asit enjeksiyonları için onam formu.",     kategori: "Fizik Tedavi",  dil: "tr" },
  { id: "eswt-sok-dalgasi-onam",  uzmanliklar: ["fizik-tedavi","ortopedi"], baslik: "ESWT (Şok Dalgası Tedavisi) Onam Formu", aciklama: "Ekstrakorporeal şok dalgası tedavisi öncesi onam formu.",                          kategori: "Fizik Tedavi",  dil: "tr" },

  // ─── GASTROENTEROLOJİ ────────────────────────────────────────────────
  { id: "kolonoskopi-onam",       uzmanliklar: ["gastroenteroloji"], baslik: "Kolonoskopi / Sigmoidoskopi Onam Formu",        aciklama: "Kalın bağırsak endoskopisi ve polipektomi için kapsamlı onam formu.",                kategori: "Gastroenteroloji", dil: "tr" },
  { id: "gastroskopi-onam",       uzmanliklar: ["gastroenteroloji"], baslik: "Üst GİS Endoskopi (Gastroskopi) Onam Formu",   aciklama: "Özofagus, mide ve duodenum endoskopisi için onam formu.",                          kategori: "Gastroenteroloji", dil: "tr" },
  { id: "ercp-onam",              uzmanliklar: ["gastroenteroloji"], baslik: "ERCP Onam Formu",                              aciklama: "Safra yolu ve pankreas kanalı endoskopisi için kapsamlı risk içeren onam formu.",    kategori: "Gastroenteroloji", dil: "tr" },

  // ─── İÇ HASTALIKLARI ────────────────────────────────────────────────
  { id: "bobrek-biyopsi-onam",    uzmanliklar: ["ic-hastaliklari","uroloji"], baslik: "Böbrek Biyopsisi Onam Formu",          aciklama: "Perkütan böbrek biyopsisi işlemi öncesi kapsamlı onam formu.",                      kategori: "İç Hastalıkları", dil: "tr" },
  { id: "iv-infuzyon-onam",       uzmanliklar: ["ic-hastaliklari","*"],       baslik: "İntravenöz Tedavi / İnfüzyon Onam Formu", aciklama: "IV ilaç uygulaması ve serum tedavisi için standart onam formu.",              kategori: "İç Hastalıkları", dil: "tr" },
  { id: "diyabet-izlem-onam",     uzmanliklar: ["ic-hastaliklari","endokrinoloji"], baslik: "Diyabetes Mellitus İzlem ve Tedavi Onam Formu", aciklama: "Şeker hastalığı izlem programı ve ilaç/insülin başlangıcı için onam formu.", kategori: "İç Hastalıkları", dil: "tr" },

  // ─── ONKOLOJİ ────────────────────────────────────────────────────────
  { id: "kemoterapi-onam",        uzmanliklar: ["onkoloji"],     baslik: "Kemoterapi Aydınlatılmış Onam Formu",              aciklama: "Sitotoksik kemoterapi protokolü başlangıcında imzalanacak kapsamlı onam formu.",      kategori: "Onkoloji",      dil: "tr" },
  { id: "doku-biyopsisi-onam",    uzmanliklar: ["onkoloji","genel-cerrahi"], baslik: "Doku Biyopsisi ve Patoloji Onam Formu", aciklama: "Tanısal amaçlı doku biyopsisi için bilgilendirme ve onam formu.",                  kategori: "Onkoloji",      dil: "tr" },
  { id: "paliatif-bakim-onam",    uzmanliklar: ["onkoloji"],     baslik: "Palyatif Bakım ve Destek Tedavi Onam Formu",       aciklama: "Palyatif bakım programına dahil olma ve destek tedavi başlangıcı için onam formu.",  kategori: "Onkoloji",      dil: "tr" },

  // ─── ROMATOLOJİ ──────────────────────────────────────────────────────
  { id: "biyolojik-ilac-onam",    uzmanliklar: ["romatoloji"],   baslik: "Biyolojik İlaç Tedavisi (Anti-TNF vb.) Onam Formu",aciklama: "Romatoid artrit ve diğer otoimmün hastalıklarda biyolojik ajan başlangıcı için onam.", kategori: "Romatoloji",    dil: "tr" },
  { id: "romatoloji-enjeksiyon",  uzmanliklar: ["romatoloji","fizik-tedavi"], baslik: "Romatoid Eklem İçi Kortikosteroid Enjeksiyon Onam Formu", aciklama: "Eklem içi steroid enjeksiyonu için bilgilendirme ve onam formu.", kategori: "Romatoloji", dil: "tr" },

  // ─── ENDOKRİNOLOJİ ───────────────────────────────────────────────────
  { id: "tiroid-biyopsi-onam",    uzmanliklar: ["endokrinoloji","ic-hastaliklari"], baslik: "Tiroid İnce İğne Aspirasyon Biyopsisi (TİİAB) Onam Formu", aciklama: "Tiroid nodülü biyopsisi öncesi kapsamlı bilgilendirme ve onam formu.", kategori: "Endokrinoloji", dil: "tr" },
  { id: "insülin-baslama-onam",   uzmanliklar: ["endokrinoloji","ic-hastaliklari"], baslik: "İnsülin ve Antidiyabetik İlaç Başlama Onam Formu",          aciklama: "Tip 1/Tip 2 diyabet için insülin veya yeni antidiyabetik ilaç başlangıcı onam formu.",  kategori: "Endokrinoloji", dil: "tr" },

  // ─── CERRAHİ DESTEK ──────────────────────────────────────────────────
  { id: "anestezi-sedasyon-onam", uzmanliklar: ["plastik-cerrahi","estetik-cerrahi","ortopedi","kbb-uzmani","goz-hastaliklari","genel-cerrahi","uroloji","kadin-hastaliklari-ve-dogum"], baslik: "Anestezi / Sedasyon Aydınlatılmış Onam Formu", aciklama: "Her türlü cerrahi operasyon öncesi anestezist tarafından imzalatılacak onam formu.", kategori: "Genel", dil: "tr" },
  { id: "kan-transfuzyon-onam",   uzmanliklar: ["*"],            baslik: "Kan / Kan Ürünü Transfüzyonu Onam Formu",           aciklama: "Kan transfüzyonu öncesi hastanın onayını veya reddini belgeleyen form.",               kategori: "Genel",         dil: "tr" },
  { id: "online-muayene-onam",    uzmanliklar: ["*"],            baslik: "Uzaktan Sağlık Hizmeti (Teletıp) Onam Formu",       aciklama: "Video/online muayene hizmeti öncesi imzalanacak onam ve gizlilik formu.",              kategori: "Genel",         dil: "tr" },
  { id: "sosyal-medya-onam",      uzmanliklar: ["*"],            baslik: "Fotoğraf/Video Sosyal Medya Paylaşım Onam Formu",   aciklama: "Tedavi görsel kayıtlarının sosyal medyada paylaşılması için KVKK uyumlu onam formu.",   kategori: "Genel",         dil: "tr" },
  { id: "kvkk-hasta",             uzmanliklar: ["*"],            baslik: "KVKK Hasta Açık Rıza Beyanı",                       aciklama: "Tüm sağlık kuruluşlarında kullanılabilecek KVKK uyumlu açık rıza formu.",               kategori: "Genel",         dil: "tr" },
  { id: "genel-muayene-onam",     uzmanliklar: ["*"],            baslik: "Genel Muayene ve Tedavi Onam Formu",                aciklama: "Her branşta kullanılabilecek standart muayene onam formu.",                             kategori: "Genel",         dil: "tr" },
];

export function uzmanligaGoreFormlar(uzmanlikSlug) {
  return HASTA_FORMLARI.filter(
    (f) => f.uzmanliklar.includes("*") || f.uzmanliklar.includes(uzmanlikSlug)
  );
}

export function tumKategoriler() {
  const sira = [
    "Estetik Cerrahi","Diş Hekimliği","KBB","Kardiyoloji","Ortopedi",
    "Göz Hastalıkları","Dermatoloji","Psikiyatri","Çocuk Sağlığı",
    "Üroloji","Kadın Hast. & Doğum","Genel Cerrahi","Nöroloji",
    "Fizik Tedavi","Gastroenteroloji","İç Hastalıkları","Onkoloji",
    "Romatoloji","Endokrinoloji","Genel",
  ];
  const mevcut = new Set(HASTA_FORMLARI.map((f) => f.kategori));
  return sira.filter((k) => mevcut.has(k));
}
