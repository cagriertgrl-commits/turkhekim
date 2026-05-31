"use client";
import { useState } from "react";
import Link from "next/link";
import { HUKUK_TALEP_KATEGORILERI } from "@/lib/hukukKategorileri";

const ACILIYET = [
  { kod: "normal", ad: "Normal — 3-5 iş günü" },
  { kod: "acil", ad: "Acil — 24 saat içinde" },
  { kod: "kritik", ad: "Kritik — Aynı gün (ek ücret)" },
];

export default function TalepFormu() {
  const [form, setForm] = useState({ konu_kategori: "", soru_metni: "", aciliyet: "normal", butce: "" });
  const [kvkk, setKvkk] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setMesaj(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/hukuk/danismanlik-talep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, kvkk_onaylandi: kvkk }),
      });
      const data = await r.json();
      if (!r.ok) {
        setHata(data.hata || "Talep gönderilemedi.");
      } else {
        setMesaj(data.mesaj);
        setForm({ konu_kategori: "", soru_metni: "", aciliyet: "normal", butce: "" });
        setKvkk(false);
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
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        💡 Bu talep için <strong>doktor</strong> veya <strong>firma</strong> olarak giriş yapmış olmanız gerekir.
        Hesabınız yoksa <Link href="/kayit-ol" className="underline">kayıt olun</Link>.
      </div>

      <div>
        <label className={lab}>Konu Kategorisi *</label>
        <select required value={form.konu_kategori} onChange={(e) => setForm({ ...form, konu_kategori: e.target.value })} className={inp}>
          <option value="">— Seçiniz —</option>
          {HUKUK_TALEP_KATEGORILERI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={lab}>Sorunuz / Olay Özeti * (en az 30 karakter)</label>
        <textarea
          required
          rows={6}
          minLength={30}
          maxLength={5000}
          value={form.soru_metni}
          onChange={(e) => setForm({ ...form, soru_metni: e.target.value })}
          className={inp}
          placeholder="Olay tarihini, taraf bilgilerini ve sorunuzu detaylı yazın. İsim ve TC paylaşmayın."
        />
        <div className="text-[10px] text-gray-400 text-right mt-1">{form.soru_metni.length} / 5000</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className={lab}>Aciliyet</label>
          <select value={form.aciliyet} onChange={(e) => setForm({ ...form, aciliyet: e.target.value })} className={inp}>
            {ACILIYET.map((a) => <option key={a.kod} value={a.kod}>{a.ad}</option>)}
          </select>
        </div>
        <div>
          <label className={lab}>Tahmini Bütçe (opsiyonel)</label>
          <input value={form.butce} onChange={(e) => setForm({ ...form, butce: e.target.value })} className={inp} placeholder="örn: 5.000-10.000 TL" />
        </div>
      </div>

      <label className="flex items-start gap-2 text-xs text-gray-700">
        <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} className="mt-0.5" required />
        <span>
          <Link href="/kvkk" target="_blank" className="underline">KVKK Aydınlatma Metni</Link>'ni okudum.
          Talebimde paylaştığım bilgilerin avukat-müvekkil gizliliği kapsamında işlenmesini onaylıyorum.
        </span>
      </label>

      {hata && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{hata}</div>}
      {mesaj && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">{mesaj}</div>}

      <button
        type="submit"
        disabled={yukleniyor || !kvkk}
        style={{ backgroundColor: "var(--navy)" }}
        className="w-full text-white font-semibold py-3 rounded-lg disabled:opacity-40 hover:opacity-90"
      >
        {yukleniyor ? "Gönderiliyor…" : "Talebi Gönder"}
      </button>
    </form>
  );
}
