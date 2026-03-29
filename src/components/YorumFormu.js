"use client";

import { useState } from "react";

export default function YorumFormu({ doktorId }) {
  const [adim, setAdim] = useState(1); // 1: form, 2: başarılı
  const [form, setForm] = useState({ hasta_adi: "", telefon: "", puan: 0, metin: "" });
  const [kvkkOnay, setKvkkOnay] = useState(false);
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const guncelle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setHata("");
  };

  const gonder = async () => {
    if (!form.hasta_adi || !form.telefon || !form.puan || !form.metin) {
      setHata("Lütfen tüm alanları doldurun.");
      return;
    }
    if (form.metin.length < 20) {
      setHata("Yorumunuz en az 20 karakter olmalıdır.");
      return;
    }
    if (!kvkkOnay) {
      setHata("Yorum bırakabilmek için KVKK metnini onaylamanız gerekiyor.");
      return;
    }

    setYukleniyor(true);
    try {
      const res = await fetch("/api/yorum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, doktor_id: doktorId, puan: Number(form.puan), kvkk_onaylandi: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(data.hata || "Bir hata oluştu.");
        setYukleniyor(false);
        return;
      }
      setAdim(2);
    } catch {
      setHata("Bağlantı hatası.");
    }
    setYukleniyor(false);
  };

  if (adim === 2) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-bold text-gray-900 mb-2">Teşekkürler!</h3>
        <p className="text-gray-500 text-sm">Yorumunuz alındı. Doktor onayı ve moderasyon sonrasında yayınlanacak.</p>
        <div style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }} className="border rounded-xl p-3 mt-4">
          <p style={{ color: "#1D4ED8" }} className="text-xs font-medium">⏳ Doktor bu ziyareti onayladıktan sonra yorumunuz moderasyona alınacak</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-1">Yorum Bırak</h3>
      <p className="text-xs text-gray-400 mb-4">Yorumunuz telefon numaranızla doğrulanır ve silinemez.</p>

      <div className="space-y-3">
        {/* Puan */}
        <div>
          <label className="text-xs text-gray-500 block mb-2">Puanınız</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setForm({ ...form, puan: n })}
                className="text-2xl transition-transform hover:scale-110"
              >
                <span className={n <= form.puan ? "text-yellow-400" : "text-gray-200"}>★</span>
              </button>
            ))}
            {form.puan > 0 && (
              <span className="text-sm text-gray-500 ml-1 self-center">
                {["", "Çok kötü", "Kötü", "Orta", "İyi", "Mükemmel"][form.puan]}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Adınız</label>
          <input
            name="hasta_adi"
            value={form.hasta_adi}
            onChange={guncelle}
            placeholder="Ad Soyad (veya takma ad)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Telefon (doğrulama için)</label>
          <input
            name="telefon"
            value={form.telefon}
            onChange={guncelle}
            placeholder="0532 xxx xx xx"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Yorumunuz</label>
          <textarea
            name="metin"
            value={form.metin}
            onChange={guncelle}
            rows={3}
            placeholder="Deneyiminizi paylaşın... (en az 20 karakter)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500 resize-none"
          />
            <p className="text-xs text-gray-400 mt-1">{form.metin.length} / 500</p>
        </div>

        {/* KVKK onayı */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={kvkkOnay}
            onChange={(e) => setKvkkOnay(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-teal-600 flex-shrink-0"
          />
          <span className="text-xs text-gray-500 leading-relaxed">
            <a href="/gizlilik" target="_blank" style={{ color: "#0E7C7B" }} className="hover:underline font-medium">
              KVKK Aydınlatma Metni
            </a>
            &apos;ni okudum; telefon numaram ve kişisel verilerimin yorum doğrulaması amacıyla işlenmesine onay veriyorum.
          </span>
        </label>

        {hata && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-xs">{hata}</p>
          </div>
        )}

        <button
          onClick={gonder}
          disabled={yukleniyor}
          style={{ backgroundColor: "#0E7C7B" }}
          className="w-full text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {yukleniyor ? "Gönderiliyor..." : "Yorum Gönder"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          🔒 Yorumlar silinemez. Yalnızca hakaret içeriyorsa kaldırılır.
        </p>
      </div>
    </div>
  );
}
