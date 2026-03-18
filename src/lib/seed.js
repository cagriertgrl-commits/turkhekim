import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log("Tablolar oluşturuluyor...");

  await sql`
    CREATE TABLE IF NOT EXISTS doktorlar (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      ad TEXT NOT NULL,
      uzmanlik TEXT NOT NULL,
      sehir TEXT NOT NULL,
      ilce TEXT,
      deneyim TEXT,
      hakkinda TEXT,
      puan NUMERIC(2,1) DEFAULT 0,
      yorum_sayisi INT DEFAULT 0,
      musait BOOLEAN DEFAULT true,
      fiyat TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS yorumlar (
      id SERIAL PRIMARY KEY,
      doktor_id INT REFERENCES doktorlar(id),
      hasta_adi TEXT NOT NULL,
      puan INT NOT NULL,
      metin TEXT NOT NULL,
      tarih TEXT,
      dogrulanmis BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS makaleler (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      baslik TEXT NOT NULL,
      kategori TEXT,
      ozet TEXT,
      yazar TEXT,
      yazar_slug TEXT,
      okuma_suresi TEXT,
      goruntu TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  console.log("Tablolar oluşturuldu. Veriler ekleniyor...");

  await sql`DELETE FROM yorumlar`;
  await sql`DELETE FROM doktorlar`;

  const doktorlar = await sql`
    INSERT INTO doktorlar (slug, ad, uzmanlik, sehir, ilce, deneyim, hakkinda, puan, yorum_sayisi, musait, fiyat)
    VALUES
      ('dr-ayse-kaya', 'Dr. Ayşe Kaya', 'KBB Uzmanı', 'İstanbul', 'Kadıköy', '12 yıl', 'İstanbul Üniversitesi Tıp Fakültesi mezunu. Rinoloji, uyku apnesi ve çocuk KBB hastalıkları alanlarında deneyimli.', 4.9, 127, true, '800 TL'),
      ('dr-mehmet-demir', 'Dr. Mehmet Demir', 'Plastik Cerrah', 'Ankara', 'Çankaya', '15 yıl', 'Hacettepe Üniversitesi mezunu. Rinoplasti ve estetik cerrahi alanında uzman.', 4.8, 94, true, '1200 TL'),
      ('dr-fatma-yildiz', 'Dr. Fatma Yıldız', 'Göz Hastalıkları', 'İzmir', 'Konak', '18 yıl', 'Ege Üniversitesi Tıp Fakültesi mezunu. Katarakt ve lazer göz ameliyatları uzmanı.', 4.9, 203, false, '950 TL'),
      ('dr-kemal-arslan', 'Dr. Kemal Arslan', 'KBB Uzmanı', 'İstanbul', 'Beşiktaş', '9 yıl', 'Marmara Üniversitesi mezunu. Çocuk KBB ve işitme bozuklukları alanında uzman.', 4.7, 89, true, '700 TL'),
      ('dr-neslihan-oz', 'Dr. Neslihan Öz', 'KBB Uzmanı', 'İstanbul', 'Bakırköy', '20 yıl', '20 yıllık deneyimiyle İstanbul''un önde gelen KBB uzmanlarından.', 4.9, 178, true, '1100 TL')
    RETURNING id, slug
  `;

  console.log(`${doktorlar.length} doktor eklendi.`);

  await sql`
    INSERT INTO yorumlar (doktor_id, hasta_adi, puan, metin, tarih, dogrulanmis)
    VALUES
      (${doktorlar[0].id}, 'Mehmet A.', 5, 'Çok ilgili ve bilgili bir doktor. Septum ameliyatımı başarıyla gerçekleştirdi.', 'Mart 2025', true),
      (${doktorlar[0].id}, 'Zeynep K.', 5, 'Yıllardır çektiğim sinüzit sorunuma kesin çözüm buldu.', 'Şubat 2025', true),
      (${doktorlar[0].id}, 'Ali R.', 4, 'Profesyonel ve güler yüzlü. Bekleme süresi biraz uzun ama değdi.', 'Ocak 2025', true),
      (${doktorlar[1].id}, 'Selin T.', 5, 'Rinoplasti sonucum mükemmel. Çok memnunum.', 'Mart 2025', true),
      (${doktorlar[2].id}, 'Hasan Y.', 5, 'Lazer ameliyatından sonra gözlerim çok iyi. Teşekkürler.', 'Şubat 2025', true)
  `;

  await sql`
    INSERT INTO makaleler (slug, baslik, kategori, ozet, yazar, yazar_slug, okuma_suresi, goruntu)
    VALUES
      ('kulak-cinlamasi-neden-olur', 'Kulak Çınlaması Neden Olur? Nedenleri ve Tedavisi', 'KBB', 'Tinnitus olarak da bilinen kulak çınlaması hakkında kapsamlı rehber.', 'Dr. Ayşe Kaya', 'dr-ayse-kaya', '6 dk', '👂'),
      ('rinoplasti-ne-kadar-surer', 'Rinoplasti Ameliyatı Ne Kadar Sürer?', 'Estetik Cerrahi', 'Burun estetiği ameliyatı öncesi ve sonrası bilmeniz gerekenler.', 'Dr. Mehmet Demir', 'dr-mehmet-demir', '8 dk', '👃'),
      ('uyku-apnesi-belirtileri', 'Uyku Apnesi Belirtileri', 'KBB', 'Uyku apnesi hayat kalitesini düşürür. Erken teşhis için bu belirtilere dikkat edin.', 'Dr. Ayşe Kaya', 'dr-ayse-kaya', '5 dk', '😴')
    ON CONFLICT (slug) DO NOTHING
  `;

  console.log("✅ Seed tamamlandı!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
