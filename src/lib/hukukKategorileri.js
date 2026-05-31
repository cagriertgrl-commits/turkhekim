/**
 * Sağlık hukuku kategori sabitleri + AI hukuk danışmanı için mevzuat bilgi tabanı.
 * Bu dosya hem UI formlarında hem AI sistem prompt'unda kullanılır.
 */

export const AVUKAT_UZMANLIK_ALANLARI = [
  { kod: "malpraktis", ad: "Tıbbi Malpraktis" },
  { kod: "saglik_reklam", ad: "Sağlıkta Reklam & Tanıtım" },
  { kod: "titck", ad: "TİTCK & İlaç-Tıbbi Cihaz Mevzuatı" },
  { kod: "sgk", ad: "SGK & Sağlık Sigortası" },
  { kod: "ttb_disiplin", ad: "TTB & Hekim Disiplin" },
  { kod: "ruhsat", ad: "Sağlık Tesisi Ruhsatlandırma" },
  { kod: "vergi", ad: "Hekim Vergi & Muhasebe" },
  { kod: "is_hukuku", ad: "Sağlık Sektörü İş Hukuku" },
  { kod: "kvkk", ad: "KVKK & Hasta Verisi" },
  { kod: "saglik_turizmi", ad: "Sağlık Turizmi Mevzuatı" },
  { kod: "etik", ad: "Tıbbi Etik" },
];

export const HUKUK_TALEP_KATEGORILERI = AVUKAT_UZMANLIK_ALANLARI.map(u => u.ad);

export const HUKUKI_MAKALE_KATEGORILERI = [
  "Malpraktis & Emsal Kararlar",
  "Sağlıkta Reklam Mevzuatı",
  "Aydınlatılmış Onam",
  "TİTCK Düzenlemeleri",
  "SGK & Geri Ödeme",
  "Hekim Disiplin",
  "KVKK & Hasta Verisi",
  "Sağlık Turizmi",
  "Yargıtay Kararları",
  "Mevzuat Değişiklikleri",
];

/**
 * AI Hukuk Danışmanı için Türkiye sağlık hukuku bilgi tabanı.
 * Bu metin doğrudan Claude sistem prompt'una gömülür.
 * Tüm referanslar gerçek Türk mevzuatından, kişisel veya spesifik dava
 * numarası içermez (Yargıtay daire bilgisi genel kategori olarak verilir).
 */
export const HUKUK_BILGI_TABANI = `
## TÜRKİYE SAĞLIK HUKUKU REFERANS MEVZUATI

### A. TEMEL KANUNLAR
- **1219 sayılı Tababet ve Şuabatı Sanatlarının Tarzı İcrasına Dair Kanun** (1928) — Hekimlik mesleğinin yürütülmesi
- **3359 sayılı Sağlık Hizmetleri Temel Kanunu** (1987) — Sağlık hizmetlerinin organizasyonu
- **6098 sayılı Türk Borçlar Kanunu** m.49-76 — Haksız fiil, kusur sorumluluğu (vekâlet ilişkisi m.502)
- **6502 sayılı Tüketicinin Korunması Hakkında Kanun** — Estetik ve teşhis hatalarında uygulanır
- **5237 sayılı Türk Ceza Kanunu** m.83 (kasten öldürme), m.89 (taksirle yaralama), m.257 (görevi kötüye kullanma)
- **6098 sayılı TBK m.66** — Adam çalıştıranın sorumluluğu (hastane → hekim)
- **6698 sayılı KVKK** — Sağlık verisi özel nitelikli kişisel veri (m.6)
- **5510 sayılı SGK Kanunu** — Sosyal güvenlik ödenekleri

### B. TIBBİ MALPRAKTİS — YARGITAY YERLEŞİK İÇTİHADI
- **Yargıtay 13. Hukuk Dairesi** ve **15. Hukuk Dairesi** malpraktis davalarında yetkilidir
- Estetik operasyonlar **eser sözleşmesi** olarak değerlendirilir (TBK m.470 vd.) → ağır sonuç sorumluluğu
- Teşhis ve tedavi davaları **vekâlet sözleşmesi** olarak değerlendirilir (TBK m.502) → özen yükümlülüğü
- **İspat yükü:** Hekim hatasını ispat etmek davacının yükümlülüğüdür; ancak "ortalama uzman hekim" standardı uygulanır
- **Aydınlatılmış onam eksikliği** başlı başına bir tazminat sebebidir — sonuç doğru olsa bile
- **Zamanaşımı:** TBK m.146 genel hüküm — 10 yıl, fakat haksız fiilde m.72 — 2 yıl/10 yıl (öğrenmeden itibaren)

### C. AYDINLATILMIŞ ONAM (BİLGİLENDİRİLMİŞ RIZA)
Mevzuat: **Hasta Hakları Yönetmeliği** (1998, m.15, m.31), **Hekimlik Meslek Etiği Kuralları** (TTB, m.26)
Geçerli onam için şart:
1. Hastanın **ayırt etme gücüne sahip** olması
2. Risk, alternatif, başarı oranı, komplikasyon **anlaşılır dilde** açıklanması
3. Onam **yazılı** olması (girişimsel işlemlerde)
4. Hastaya **düşünme süresi** tanınması (özellikle estetik)
5. Acil durumda **vekâletsiz iş görme** (TBK m.526) hükümleri uygulanır

### D. SAĞLIKTA REKLAM VE TANITIM MEVZUATI (KRİTİK)

#### D.1. Temel Düzenleme
**Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik** (29.07.2023, Resmî Gazete: 32263)
- "Hasta çekmeye yönelik" her türlü tanıtım YASAK
- "Bilgilendirme" serbest, "reklam" yasaktır — sınır çok ince
- "Önce-sonra" fotoğrafları YASAK (m.6/2)
- "Mucize", "garantili", "kesin sonuç", "ilk", "tek", "en iyi" gibi övücü ifadeler YASAK
- Hasta yorumu/tavsiyesi paylaşımı YASAK (m.6/3) — yalnızca platform üzerinden değerlendirme istisnası
- Sosyal medyada canlı/kayıtlı tıbbi işlem görüntüsü YASAK
- İndirim, kampanya, hediye sunma YASAK (m.7)

#### D.2. Yetkili Kurumlar ve Yaptırımlar
- **Sağlık Bakanlığı Sağlık Hizmetleri Genel Müdürlüğü** — denetim
- **Reklam Kurulu** (Ticaret Bakanlığı) — 6502 sayılı Kanun m.63 uyarınca para cezası ve durdurma
- **TİTCK** — ilaç ve tıbbi cihaz reklamları (Beşeri Tıbbi Ürünlerin Tanıtım Faaliyetleri Hakkında Yönetmelik, 03.07.2015)
- **Türk Tabipleri Birliği (TTB) Disiplin Yönetmeliği** — meslekten men dahil disiplin cezaları
- **RTÜK** — yayın yoluyla yapılan reklam
- Para cezaları: 2026 itibarıyla 250.000 TL - 5.000.000 TL bandında (yıllık yeniden değerleme)

#### D.3. İlaç Reklamı — TİTCK Rejimi
- **Reçeteli ilaçlar:** Halka reklam YASAK, yalnızca sağlık profesyonellerine
- **Reçetesiz ilaçlar (OTC):** Halka reklam serbest ama önceden TİTCK onayı şart
- Doktor/eczacı kıyafetiyle reklam YASAK
- Geleneksel/bitkisel tıbbi ürünler ayrı yönetmeliğe tâbi (06.10.2010)

#### D.4. Tıbbi Cihaz Reklamı
**Tıbbi Cihaz Yönetmeliği** (02.06.2021, MDR uyumlu) ve **In Vitro Diagnostik Tıbbi Cihaz Yönetmeliği** (02.06.2021)
- CE belgeli olmayan cihazın reklamı YASAK
- Sağlık beyanı içeren reklamlar TİTCK onayına tâbi

### E. HEKIM DİSİPLİN
- **TTB Disiplin Yönetmeliği** — uyarı, kınama, geçici/sürekli meslekten men
- **Yüksek Sağlık Şurası** — Sağlık Bakanlığı kararları için temyiz mercii
- **6023 sayılı TTB Kanunu** m.39 — disiplin kurulları

### F. SGK & GERİ ÖDEME
- **Sosyal Güvenlik Kurumu Sağlık Uygulama Tebliği (SUT)** — yıllık güncellenir
- **MEDULA** sistem hataları, geri ödeme uyuşmazlıkları → İş Mahkemesi (sigortalı), İdare Mahkemesi (kurum işlemi)

### G. KVKK & HASTA VERİSİ
- **6698 KVKK m.6** — sağlık verisi özel nitelikli, ayrı açık rıza şart
- **VERBİS kaydı** — 100'den fazla çalışanı olan sağlık tesisi için zorunlu
- İhlal cezası: 2026 itibarıyla 1.966.860 TL - 13.451.058 TL arası
- Anonim verilerin bilimsel araştırmada kullanımı serbest (m.28)

### H. SAĞLIK TURİZMİ
- **Uluslararası Sağlık Turizmi ve Turistin Sağlığı Hakkında Yönetmelik** (13.07.2017)
- Yetki belgesi (USHAŞ kayıtlı aracı kuruluş) zorunlu
- Yabancı hastaya aydınlatılmış onam, hastanın anadilinde verilmeli (Yön. m.10)

### I. SAĞLIKTA REKLAM — PRATİK SINIR
| Serbest (Bilgilendirme) | Yasak (Reklam) |
|---|---|
| Hekim diploması, uzmanlık, sicil no | "En iyi", "lider", "tek" gibi övücü sıfat |
| Çalışma saatleri, adres, iletişim | Önce-sonra fotoğrafı |
| Sunulan tıbbi hizmetin adı | Hasta görüşü/yorumu paylaşma |
| Bilimsel makale/tebliğ paylaşımı | Hastalık tedavi vaadi |
| TİTCK onaylı CE belgeli cihaz adı | İndirim, kampanya, hediye |
| Webinar/eğitim duyurusu | Sosyal medyada işlem görüntüsü |
`;

export const HUKUK_BILGI_TABANI_OZET = `
Türkiye'de sağlık hukuku kapsamında: malpraktis (TBK m.49-76, TCK m.89, Yargıtay 13. ve 15. HD),
aydınlatılmış onam (Hasta Hakları Yön. m.15), sağlıkta reklam yasakları (29.07.2023 tarihli Yönetmelik),
TİTCK ilaç/tıbbi cihaz, KVKK m.6 sağlık verisi, TTB disiplin, SGK SUT, sağlık turizmi yönetmeliği (13.07.2017).
`;
