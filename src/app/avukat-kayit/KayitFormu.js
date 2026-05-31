"use client";
import { useState } from "react";
import Link from "next/link";
import { AVUKAT_UZMANLIK_ALANLARI } from "@/lib/hukukKategorileri";

export default function KayitFormu() {
  const [form, setForm] = useState({
    ad: "", soyad: "", email: "", sifre: "", telefon: "",
    baro_sicil_no: "", baro_sehir: "", sehir: "",
    uzmanlik_alanlari: [], deneyim_yil: "", saatlik_ucret: "", hakkinda: "",
  });
  const [kvkk, setKvkk] = useState(false);
  const [sozlesme, setSozlesme] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  function toggleUzmanlik(ad) {
    setForm((f) => ({
      ...f,
      uzmanlik_alanlari: f.uzmanlik_alanlari.includes(ad)
        ? f.uzmanlik_alanlari.filter(x => x !== ad)
        : [...f.uzmanlik_alanlari, ad],
    }));
  }

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    if (form.uzmanlik_alanlari.length === 0) {
      setHata("En az bir uzmanlık alanı seçin.");
      return;
    }
    setYukleniyor(true);
    try {
      const r = await fetch("/api/avukat/kayit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          uzmanlik_alanlari: form.uzmanlik_alanlari.join(", "),
          deneyim_yil: parseInt(form.deneyim_yil) || 0,
          saatlik_ucret: parseFloat(form.saatlik_ucret) || null,
          kvkk_onaylandi: kvkk,
          sozlesme_onaylandi: sozlesme,
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Kayıt başarısız.");
      } else {
        setMesaj(data.mesaj);
      }
    } catch {
      setHata("Sunucuya ulaşılamadı.");
    } finally {
      setYukleniyor(false);
    }
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";
  const lab = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <form onSubmit={gonder} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lab}>Ad *</label>
          <input required value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Soyad *</label>
          <input required value={form.soyad} onChange={(e) => setForm({ ...form, soyad: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>E-posta *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Şifre (en az 8 karakter) *</label>
          <input required type="password" minLength={8} value={form.sifre} onChange={(e) => setForm({ ...form, sifre: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Telefon *</label>
          <input required value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Baro Sicil No *</label>
          <input required value={form.baro_sicil_no} onChange={(e) => setForm({ ...form, baro_sicil_no: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Baro Şehri</label>
          <input value={form.baro_sehir} onChange={(e) => setForm({ ...form, baro_sehir: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Çalışma Şehri</label>
          <input value={form.sehir} onChange={(e) => setForm({ ...form, sehir: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Deneyim Yılı</label>
          <input type="number" min="0" value={form.deneyim_yil} onChange={(e) => setForm({ ...form, deneyim_yil: e.target.value })} className={inp} />
        </div>
        <div>
          <label className={lab}>Saatlik Ücret (TL)</label>
          <input type="number" min="0" step="100" value={form.saatlik_ucret} onChange={(e) => setForm({ ...form, saatlik_ucret: e.target.value })} className={inp} />
        </div>
      </div>

      <div>
        <label className={lab}>Uzmanlık Alanları * (çoklu seçim)</label>
        <div className="grid sm:grid-cols-2 gap-2">
          {AVUKAT_UZMANLIK_ALANLARI.map((u) => (
            <label key={u.kod} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm cursor-pointer hover:border-teal-400">
              <input
                type="checkbox"
                checked={form.uzmanlik_alanlari.includes(u.ad)}
                onChange={() => toggleUzmanlik(u.ad)}
              />
              {u.ad}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={lab}>Kendinizden Bahsedin</label>
        <textarea
          rows={4}
          value={form.hakkinda}
          onChange={(e) => setForm({ ...form, hakkinda: e.target.value })}
          className={inp}
          placeholder="Deneyiminiz, başarı hikayeleriniz, çalışma tarzınız…"
        />
      </div>

      <div className="space-y-2 text-xs text-gray-700">
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-0.5" />
          <span>
            <Link href="/kvkk" target="_blank" className="underline">KVKK Aydınlatma Metni</Link>'ni okudum, kişisel verilerimin işlenmesini onaylıyorum.
          </span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" checked={sozlesme} onChange={(e) => setSozlesme(e.target.checked)} className="mt-0.5" />
          <span>
            <Link href="/kullanim-kosullari" target="_blank" className="underline">Avukat Kullanım Sözleşmesi</Link>'ni okudum, kabul ediyorum.
          </span>
        </label>
      </div>

      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
      {mesaj && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">{mesaj}</div>}

      <button
        type="submit"
        disabled={yukleniyor || !kvkk || !sozlesme}
        style={{ backgroundColor: "var(--navy)" }}
        className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-40 hover:opacity-90"
      >
        {yukleniyor ? "Kaydediliyor…" : "Kayıt Ol"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Zaten hesabınız var mı? <Link href="/avukat-giris" className="underline" style={{ color: "var(--teal)" }}>Giriş yapın</Link>
      </p>
    </form>
  );
}
