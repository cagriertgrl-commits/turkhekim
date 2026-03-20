"use client";
import { useRef } from "react";

// Form şablonları — gerçek klinik içerik
const FORM_SABLONLARI = {
  "kvkk-hasta": {
    basliklar: ["KVKK AÇIK RIZA BEYANI"],
    icerik: `6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, aşağıda belirtilen kişisel ve sağlık verilerimin işlenmesine ilişkin açık rızamı beyan ederim.

1. VERİ SORUMLUSU
DoktorPusula platformu aracılığıyla hizmet veren sağlık kuruluşu ve/veya hekim.

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

export default function FormIcerik({ form }) {
  const yazdirilacakRef = useRef(null);

  function yazdir() {
    window.print();
  }

  async function indir() {
    // Basit HTML → blob yaklaşımı (react-pdf olmadan)
    const icerik = FORM_SABLONLARI[form.id]?.icerik || varsayilanForm(form);
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8"/>
  <title>${form.baslik}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; font-size: 13px; line-height: 1.8; color: #1a1a1a; }
    h1 { font-size: 16px; text-align: center; border-bottom: 2px solid #0E7C7B; padding-bottom: 12px; margin-bottom: 24px; }
    pre { white-space: pre-wrap; font-family: inherit; }
    .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 12px; font-size: 11px; color: #666; text-align: center; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>${form.baslik}</h1>
  <pre>${icerik}</pre>
  <div class="footer">DoktorPusula — doktorpusula.com | Bu form bilgilendirme amaçlıdır.</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.id}-onam-formu.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const sablonIcerik = FORM_SABLONLARI[form.id]?.icerik || varsayilanForm(form);

  return (
    <div>
      {/* Başlık & Butonlar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <a href="/hasta-formlari" style={{ color: "#0E7C7B" }} className="text-sm hover:underline">← Tüm Formlar</a>
          <h1 style={{ color: "#0D2137" }} className="text-xl font-bold mt-2">{form.baslik}</h1>
          <p className="text-gray-400 text-sm mt-1">{form.aciklama}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={yazdir}
            style={{ backgroundColor: "#0D2137" }}
            className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 print:hidden"
          >
            🖨️ Yazdır
          </button>
          <button
            onClick={indir}
            style={{ borderColor: "#0E7C7B", color: "#0E7C7B" }}
            className="flex items-center gap-2 border px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-50 print:hidden"
          >
            ⬇️ İndir
          </button>
        </div>
      </div>

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
          <p className="text-gray-400 text-xs mt-1">doktorpusula.com | Tarih: {new Date().toLocaleDateString("tr-TR")}</p>
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

      {/* Yazdırma stili */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body > * { display: none; }
          #yazdirilacak-form { display: block !important; }
        }
      `}</style>
    </div>
  );
}
