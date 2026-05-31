"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HUKUKI_MAKALE_KATEGORILERI } from "@/lib/hukukKategorileri";

export default function PanelIcerik({ avukat: avukatProp, talepler, makaleler }) {
  const router = useRouter();
  const [tab, setTab] = useState("ozet");
  const [avukat, setAvukat] = useState(avukatProp);

  async function cikis() {
    await fetch("/api/avukat/cikis", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl overflow-hidden">
            {avukat.foto_url ? <img src={avukat.foto_url} alt="" className="w-full h-full object-cover" /> : "👨‍⚖️"}
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ color: "var(--navy)" }}>Av. {avukat.ad} {avukat.soyad}</h1>
            <div className="text-xs text-gray-500">
              {avukat.aktif ? <span className="text-green-700">✓ Aktif profil</span> : <span className="text-amber-700">⏳ Onay bekliyor</span>}
              <span className="mx-2">·</span>
              <Link href={`/hukuk/avukat/${avukat.slug}`} className="underline">Profili gör</Link>
            </div>
          </div>
        </div>
        <button onClick={cikis} className="text-sm text-gray-500 hover:text-red-600">Çıkış</button>
      </header>

      <nav className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
        {[
          ["ozet", "Özet"],
          ["talepler", `Talepler (${talepler.length})`],
          ["makaleler", `Makaleler (${makaleler.length})`],
          ["profil", "Profilim"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
              tab === k ? "border-teal-500 text-teal-700" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {l}
          </button>
        ))}
      </nav>

      {tab === "ozet" && <OzetTab avukat={avukat} talepler={talepler} makaleler={makaleler} />}
      {tab === "talepler" && <TaleplerTab talepler={talepler} />}
      {tab === "makaleler" && <MakalelerTab makaleler={makaleler} onYeniMakale={() => router.refresh()} />}
      {tab === "profil" && <ProfilTab avukat={avukat} onGuncellendi={setAvukat} />}
    </div>
  );
}

function OzetTab({ avukat, talepler, makaleler }) {
  const acikTalepler = talepler.filter(t => t.durum === "acik").length;
  const toplamOkunma = makaleler.reduce((s, m) => s + (m.goruntulenme || 0), 0);
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Kart ikon="📨" baslik="Açık Talep" deger={acikTalepler} link="?tab=talepler" />
      <Kart ikon="📰" baslik="Makale" deger={makaleler.length} alt={`${toplamOkunma} okunma`} />
      <Kart ikon="⚖️" baslik="Saatlik" deger={avukat.saatlik_ucret ? `₺${Number(avukat.saatlik_ucret).toLocaleString("tr-TR")}` : "—"} />
    </div>
  );
}

function Kart({ ikon, baslik, deger, alt }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-2xl mb-1">{ikon}</div>
      <div className="text-xs text-gray-500">{baslik}</div>
      <div className="text-2xl font-bold mt-1" style={{ color: "var(--navy)" }}>{deger}</div>
      {alt && <div className="text-xs text-gray-400 mt-1">{alt}</div>}
    </div>
  );
}

function TaleplerTab({ talepler }) {
  if (talepler.length === 0) {
    return <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">Henüz talep yok.</div>;
  }
  return (
    <div className="space-y-3">
      {talepler.map((t) => (
        <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--teal)" }}>{t.konu_kategori}</div>
              <div className="text-xs text-gray-500">
                {t.talep_eden_tip} talebi · {new Date(t.created_at).toLocaleDateString("tr-TR")}
                {t.aciliyet !== "normal" && <span className="ml-2 text-red-600">⚡ {t.aciliyet}</span>}
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              t.durum === "acik" ? "bg-green-100 text-green-700" :
              t.durum === "atandi" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
            }`}>{t.durum}</span>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-4">{t.soru_metni}</p>
          {t.butce && <div className="text-xs text-gray-500 mt-2">Bütçe: {t.butce}</div>}
        </div>
      ))}
    </div>
  );
}

function MakalelerTab({ makaleler, onYeniMakale }) {
  const [yeni, setYeni] = useState(false);
  const [form, setForm] = useState({ baslik: "", ozet: "", icerik_markdown: "", kategori: "" });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setHata(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/hukuk/makaleler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) setHata(data.hata || "Makale eklenemedi.");
      else {
        setYeni(false);
        setForm({ baslik: "", ozet: "", icerik_markdown: "", kategori: "" });
        onYeniMakale();
      }
    } catch {
      setHata("Sunucu hatası.");
    } finally {
      setYukleniyor(false);
    }
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold" style={{ color: "var(--navy)" }}>Makalelerim</h3>
        <button
          onClick={() => setYeni(!yeni)}
          style={{ backgroundColor: "var(--teal)" }}
          className="text-white text-sm px-4 py-2 rounded-lg font-semibold"
        >
          {yeni ? "İptal" : "+ Yeni Makale"}
        </button>
      </div>

      {yeni && (
        <form onSubmit={gonder} className="bg-white rounded-xl border border-gray-200 p-5 mb-4 space-y-3">
          <input required placeholder="Başlık" value={form.baslik} onChange={(e) => setForm({ ...form, baslik: e.target.value })} className={inp} />
          <select required value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className={inp}>
            <option value="">Kategori seçin</option>
            {HUKUKI_MAKALE_KATEGORILERI.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
          <textarea rows={2} placeholder="Kısa özet" value={form.ozet} onChange={(e) => setForm({ ...form, ozet: e.target.value })} className={inp} />
          <textarea
            required
            rows={10}
            placeholder="Markdown formatında makale içeriği (## başlık, **kalın**, - liste)"
            value={form.icerik_markdown}
            onChange={(e) => setForm({ ...form, icerik_markdown: e.target.value })}
            className={inp}
          />
          {hata && <div className="text-red-700 text-sm">{hata}</div>}
          <button
            type="submit"
            disabled={yukleniyor}
            style={{ backgroundColor: "var(--navy)" }}
            className="text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
          >
            {yukleniyor ? "Yayınlanıyor…" : "Yayınla"}
          </button>
        </form>
      )}

      {makaleler.length === 0 && !yeni ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">Henüz makale yayınlamadınız.</div>
      ) : (
        <div className="space-y-2">
          {makaleler.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center">
              <div>
                <Link href={`/hukuk/makale/${m.slug}`} className="font-semibold hover:underline" style={{ color: "var(--navy)" }}>{m.baslik}</Link>
                <div className="text-xs text-gray-500">{m.kategori} · {new Date(m.yayin_tarihi).toLocaleDateString("tr-TR")} · {m.goruntulenme} okunma</div>
              </div>
              {m.yayinda ? <span className="text-xs text-green-700">Yayında</span> : <span className="text-xs text-gray-400">Taslak</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilTab({ avukat, onGuncellendi }) {
  const [form, setForm] = useState({
    telefon: avukat.telefon || "",
    baro_sehir: avukat.baro_sehir || "",
    sehir: avukat.sehir || "",
    uzmanlik_alanlari: avukat.uzmanlik_alanlari || "",
    deneyim_yil: avukat.deneyim_yil || 0,
    saatlik_ucret: avukat.saatlik_ucret || "",
    hakkinda: avukat.hakkinda || "",
  });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  async function gonder(e) {
    e.preventDefault();
    setMesaj(null);
    setYukleniyor(true);
    try {
      const r = await fetch("/api/avukat/profil-guncelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (r.ok) {
        setMesaj("✅ Güncellendi.");
        onGuncellendi(data.avukat);
      } else {
        setMesaj(`❌ ${data.hata}`);
      }
    } catch {
      setMesaj("❌ Sunucu hatası.");
    } finally {
      setYukleniyor(false);
    }
  }

  async function fotoYukle(e) {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    if (dosya.size > 300 * 1024) {
      setMesaj("❌ Fotoğraf max 300KB olmalı.");
      return;
    }
    const fr = new FileReader();
    fr.onload = async () => {
      const r = await fetch("/api/avukat/profil-foto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: fr.result }),
      });
      const data = await r.json();
      if (r.ok) {
        onGuncellendi({ ...avukat, foto_url: data.url });
        setMesaj("✅ Fotoğraf güncellendi.");
      } else {
        setMesaj(`❌ ${data.hata}`);
      }
    };
    fr.readAsDataURL(dosya);
  }

  const inp = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500";

  return (
    <form onSubmit={gonder} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl overflow-hidden">
          {avukat.foto_url ? <img src={avukat.foto_url} alt="" className="w-full h-full object-cover" /> : "👨‍⚖️"}
        </div>
        <label className="text-sm cursor-pointer">
          <span className="underline" style={{ color: "var(--teal)" }}>Fotoğraf değiştir</span>
          <input type="file" accept="image/*" className="hidden" onChange={fotoYukle} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Alan lab="Telefon" v={form.telefon} on={(v) => setForm({ ...form, telefon: v })} inp={inp} />
        <Alan lab="Baro Şehri" v={form.baro_sehir} on={(v) => setForm({ ...form, baro_sehir: v })} inp={inp} />
        <Alan lab="Çalışma Şehri" v={form.sehir} on={(v) => setForm({ ...form, sehir: v })} inp={inp} />
        <Alan lab="Deneyim Yılı" v={form.deneyim_yil} on={(v) => setForm({ ...form, deneyim_yil: v })} inp={inp} tip="number" />
        <Alan lab="Saatlik Ücret (TL)" v={form.saatlik_ucret} on={(v) => setForm({ ...form, saatlik_ucret: v })} inp={inp} tip="number" />
      </div>
      <Alan lab="Uzmanlık Alanları (virgülle ayır)" v={form.uzmanlik_alanlari} on={(v) => setForm({ ...form, uzmanlik_alanlari: v })} inp={inp} />
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Hakkımda</label>
        <textarea rows={5} value={form.hakkinda} onChange={(e) => setForm({ ...form, hakkinda: e.target.value })} className={inp} />
      </div>

      {mesaj && <div className="text-sm">{mesaj}</div>}
      <button
        type="submit"
        disabled={yukleniyor}
        style={{ backgroundColor: "var(--navy)" }}
        className="text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
      >
        {yukleniyor ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </form>
  );
}

function Alan({ lab, v, on, inp, tip = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{lab}</label>
      <input type={tip} value={v} onChange={(e) => on(e.target.value)} className={inp} />
    </div>
  );
}
