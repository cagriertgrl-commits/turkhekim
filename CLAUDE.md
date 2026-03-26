\# Claude Code — Proje Talimatları



\## 🎯 Temel Görev

Her kod yazma, düzenleme veya inceleme görevinde aşağıdaki 5 katmanı \*\*otomatik olarak\*\* uygula.

Kullanıcı istemese bile bu kontrolleri yap ve bulduklarını raporla.



\---



\## 🔍 Katman 1 — Hata Denetimi (Runtime Güvenliği)



Her kod bloğunda şunları kontrol et:

\- `null` / `undefined` erişimi → optional chaining (`?.`) veya guard ekle

\- Try/catch blokları boş mu? → `console.error` + kullanıcıya bildirim ekle

\- Array işlemlerinden önce `.length` kontrolü yapılmış mı?

\- Async fonksiyonlarda `await` unutulmuş mu?

\- Promise'ler `.catch()` veya try/catch ile sarılmış mı?

\- Type coercion hatası riski var mı? (`==` yerine `===` kullan)



\*\*Kural:\*\* Hata bulursan önce mevcut kodu göster, sonra düzeltilmiş halini ver. Neden düzelttini açıkla.



\---



\## ⚡ Katman 2 — Performans Optimizasyonu



\- Gereksiz `console.log` → kaldır

\- N+1 sorgu problemi → veri çekimlerini toplu yap

\- React: gereksiz `useEffect` bağımlılıkları → temizle

\- React: her render'da yeniden oluşan obje/fonksiyon → `useMemo` / `useCallback`

\- Büyük listeler → virtualization öner

\- `import` edilen ama kullanılmayan paketler → kaldır

\- Senkron işlemler UI'ı bloke ediyor mu? → async'e çevir



\---



\## 🔒 Katman 3 — Güvenlik



\- API key, token, şifre → asla `.js`/`.ts` dosyasına yazma, `.env` kullan

\- `.env` dosyası `.gitignore`'da mı? → kontrol et

\- Kullanıcıdan gelen veri ekrana yansıtılıyor mu? → XSS riski, sanitize et

\- CORS ayarları çok geniş mi? (`\*` kullanımı)



\---



\## 📦 Katman 4 — Kod Kalitesi



\- Fonksiyon 30 satırı aşıyor mu? → bölmeyi öner

\- Bileşen 200 satırı aşıyor mu? → parçalara ayır

\- Aynı kod 2+ yerde tekrar ediyor mu? → ortak fonksiyona taşı

\- Magic number/string var mı? → `const` ile isimlendir

\- İsimlendirme ne yapıldığını açıklıyor mu?



\---



\## 🎭 Katman 5 — Eksik Durum Yönetimi



Her veri çekimi veya form işleminde:

\- `loading` durumu → spinner veya skeleton göster

\- `error` durumu → kullanıcıya anlamlı mesaj göster

\- `empty` durumu → "Sonuç bulunamadı" mesajı

\- Form submit → duplicate click'e karşı butonu disable et



\---



\## 📋 Yanıt Formatı



Kod yazarken veya düzeltirken şu formatı kullan:



\## ✅ Yapılanlar

\- \[ne eklendi/değiştirildi]



\## ⚠️ Bulunan Sorunlar

\- \[sorun] → \[çözüm]



\## 💡 Öneriler

\- \[opsiyonel iyileştirmeler]



\---



\## 🚫 Asla Yapma



\- `any` tipini kullanma → proper type yaz

\- `console.log` production'da bırakma

\- API key'i koda göm

\- `// TODO` yorum bırakıp geçme

\- Test yazmadan kritik fonksiyon ekleme



\---



\## ✍️ Kod Yazarken



1\. Önce mevcut kodu oku ve anla

2\. Değişiklik öncesi ne yapacağını söyle

3\. Kodu yaz

4\. Yukarıdaki 5 katmanı otomatik uygula

5\. Sonucu özetle

