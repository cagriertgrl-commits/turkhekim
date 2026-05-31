import Link from "next/link";
import Navbar from "@/components/Navbar";
import { AVUKAT_UZMANLIK_ALANLARI } from "@/lib/hukukKategorileri";
import BultenForm from "./BultenForm";

export const metadata = {
  title: "Sağlık Hukuku Danışmanlığı | TurkHekim",
  description:
    "Türkiye'nin sağlık hukuku platformu. Malpraktis, sağlıkta reklam mevzuatı, TİTCK, SGK ve KVKK konularında uzman avukatlar + yapay zekâ destekli ön danışmanlık.",
  alternates: { canonical: "https://turkhekim.com/hukuk" },
};

const HIZMETLER = [
  { ikon: "⚖️", baslik: "Tıbbi Malpraktis", ozet: "Tazminat ve ceza süreçleri, Yargıtay 13. ve 15. HD içtihadı." },
  { ikon: "📢", baslik: "Sağlıkta Reklam", ozet: "29.07.2023 tarihli Tanıtım Yönetmeliği uyumu, Reklam Kurulu süreçleri." },
  { ikon: "💊", baslik: "TİTCK & İlaç-Cihaz", ozet: "Tıbbi cihaz, beşeri ürün, CE belgesi, ruhsat itirazı." },
  { ikon: "🏥", baslik: "Tesis Ruhsatlandırma", ozet: "Muayenehane, poliklinik, hastane açılış ve denetim süreçleri." },
  { ikon: "🛡️", baslik: "KVKK & Hasta Verisi", ozet: "VERBİS kaydı, aydınlatma metni, açık rıza, ihlal süreçleri." },
  { ikon: "💼", baslik: "Hekim Vergi & SGK", ozet: "Serbest meslek, şirket yapılandırma, SGK ödenek uyuşmazlıkları." },
];

export default function HukukAnaSayfa() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }}
        className="px-6 py-16"
      >
        <div className="max-w-5xl mx-auto text-center">
          <span
            style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
            className="text-xs font-bold px-4 py-2 rounded-full inline-block"
          >
            Yeni — Sağlık Hukuku Modülü
          </span>
          <h1 className="text-white text-3xl md:text-5xl font-bold mt-6 mb-4">
            Sağlığın Hukuku Bizden Sorulur
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Malpraktis, sağlıkta reklam, TİTCK ve KVKK konularında uzman avukatlarla tanışın.
            7/24 yapay zekâ destekli ön danışmanlık her zaman elinizin altında.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/hukuk/ai-danisman"
              style={{ backgroundColor: "var(--teal)" }}
              className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
            >
              🤖 AI Hukuk Danışmanına Sor
            </Link>
            <Link
              href="/hukuk/avukatlar"
              className="bg-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              style={{ color: "var(--navy)" }}
            >
              👨‍⚖️ Anlaşmalı Avukatlar
            </Link>
            <Link
              href="/hukuk/danismanlik-talep"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              📨 Danışmanlık Talep Et
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3" style={{ color: "var(--navy)" }}>
          Uzmanlık Alanlarımız
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Sağlık sektörüne özel, sektörü yaşayan avukat ekibimiz.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {HIZMETLER.map((h) => (
            <div key={h.baslik} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition">
              <div className="text-3xl mb-3">{h.ikon}</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--navy)" }}>{h.baslik}</h3>
              <p className="text-sm text-gray-600">{h.ozet}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 border-2" style={{ borderColor: "var(--teal)" }}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">🤖</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--navy)" }}>
                  AI Hukuk Danışmanı — Sağlık Hukuku Eğitimli
                </h3>
                <p className="text-gray-700 mb-4">
                  Yapay zekâ asistanımız özellikle <strong>malpraktis emsal kararları</strong> ve <strong>sağlıkta reklam mevzuatı</strong>
                  &nbsp;konusunda eğitildi. 1219 sayılı Tababet Kanunu, TBK m.49–76, 29.07.2023 tarihli Tanıtım Yönetmeliği,
                  TİTCK ilaç-cihaz düzenlemeleri ve KVKK m.6 sağlık verisi rejimi cebinde.
                </p>
                <Link
                  href="/hukuk/ai-danisman"
                  style={{ backgroundColor: "var(--navy)" }}
                  className="inline-block text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90"
                >
                  Hemen Sor →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
          Tüm Hizmet Kategorileri
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {AVUKAT_UZMANLIK_ALANLARI.map((u) => (
            <Link
              key={u.kod}
              href={`/hukuk/avukatlar?uzmanlik=${encodeURIComponent(u.ad)}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-teal-400 transition flex justify-between items-center"
            >
              <span className="text-gray-800">{u.ad}</span>
              <span className="text-gray-400">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-14">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--navy)" }}>
            📩 Mevzuat Bültenine Abone Olun
          </h3>
          <p className="text-gray-600 mb-5 text-sm">
            Sağlıkta reklam, TİTCK ve KVKK güncellemelerini aylık özet ile alın. Spam yok, sadece mevzuat.
          </p>
          <BultenForm />
        </div>
      </section>

      <section className="px-6 py-10 max-w-3xl mx-auto text-center text-xs text-gray-500">
        ⚖️ TurkHekim Hukuk modülü genel bilgilendirme amaçlıdır ve hukuki temsil yerine geçmez.
        Somut uyuşmazlıklarda mutlaka anlaşmalı avukatlarımızla görüşmenizi öneririz.
      </section>
    </div>
  );
}
