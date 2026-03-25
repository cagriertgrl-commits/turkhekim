import Link from "next/link";

function formatDeneyim(d) {
  if (!d) return d;
  const s = d.toString().trim();
  return /^\d+$/.test(s) ? `${s} yıl` : s;
}

function rozetHesapla(doktor) {
  const rozetler = [];
  if (doktor.onaylandi) rozetler.push({ ad: "Doğrulanmış", renk: "var(--success)", bg: "#D1FAE5" });
  if (doktor.deneyim) rozetler.push({ ad: `${formatDeneyim(doktor.deneyim)} Deneyim`, renk: "#2563EB", bg: "#DBEAFE" });
  return rozetler;
}

function DoktorKart({ doktor }) {
  const tamIsim = [doktor.ad, doktor.soyad].filter(Boolean).join(" ");
  const initials = tamIsim.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "DR";
  const unvanAd = doktor.unvan ? `${doktor.unvan} ${tamIsim}` : tamIsim;
  const rozetler = rozetHesapla(doktor);

  return (
    <Link
      href={`/doktor/${doktor.slug}`}
      className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-100 group"
    >
      <div className="flex items-start gap-4 mb-4">
        {doktor.foto_url ? (
          <img src={doktor.foto_url} alt={doktor.ad} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 border-2 border-gray-100" />
        ) : (
          <div style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors truncate">{unvanAd}</h3>
          <p style={{ color: "var(--teal)" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
          <p className="text-gray-500 text-xs mt-0.5">{doktor.sehir}{doktor.deneyim ? ` · ${formatDeneyim(doktor.deneyim)} deneyim` : ""}</p>
        </div>
      </div>

      {rozetler.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {rozetler.map((r) => (
            <span key={r.ad} style={{ backgroundColor: r.bg, color: r.renk }} className="text-xs px-2 py-0.5 rounded-full font-semibold">{r.ad}</span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {doktor.yorum_sayisi > 0 ? (
            <>
              <span className="text-yellow-400">★</span>
              <span className="font-bold text-sm text-gray-900">{doktor.puan}</span>
              <span className="text-gray-500 text-xs">({doktor.yorum_sayisi} yorum)</span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">Henüz yorum yok</span>
          )}
        </div>
        <span style={{ backgroundColor: "#F0FDFA", color: "var(--teal)" }} className="text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors">
          Profili Gör
        </span>
      </div>
    </Link>
  );
}

export default function AnasayfaDoktorlar({ doktorlar }) {
  return (
    <section style={{ backgroundColor: "#F5F7FA" }} className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 style={{ color: "var(--navy)" }} className="text-2xl md:text-3xl font-bold">Öne Çıkan Doktorlar</h2>
            <p className="text-gray-500 text-sm mt-1">Doğrulanmış, en yüksek puanlı hekimler</p>
          </div>
          <Link href="/istanbul/doktor" style={{ color: "var(--teal)" }} className="text-sm font-semibold hover:underline hidden md:block">
            Tümünü Gör →
          </Link>
        </div>

        {doktorlar.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doktorlar.map((doktor) => <DoktorKart key={doktor.id} doktor={doktor} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { ad: "Dr. Ayşe Kaya", uzmanlik: "KBB Uzmanı", sehir: "İstanbul", puan: 4.9, yorum: 127, deneyim: "12 yıl", slug: "dr-ayse-kaya" },
              { ad: "Dr. Mehmet Demir", uzmanlik: "Plastik Cerrah", sehir: "Ankara", puan: 4.8, yorum: 94, deneyim: "15 yıl", slug: "dr-mehmet-demir" },
              { ad: "Dr. Fatma Yıldız", uzmanlik: "Göz Hastalıkları", sehir: "İzmir", puan: 4.9, yorum: 203, deneyim: "18 yıl", slug: "dr-fatma-yildiz" },
            ].map((doktor) => (
              <Link key={doktor.ad} href={`/doktor/${doktor.slug}`} className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all border border-gray-100 group">
                <div className="flex items-start gap-4 mb-4">
                  <div style={{ backgroundColor: "var(--light-teal)", color: "var(--teal)" }} className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {doktor.ad.split(" ")[1][0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{doktor.ad}</h3>
                    <p style={{ color: "var(--teal)" }} className="text-sm font-medium">{doktor.uzmanlik}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{doktor.sehir} · {doktor.deneyim}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span style={{ backgroundColor: "#D1FAE5", color: "var(--success)" }} className="text-xs px-2 py-0.5 rounded-full font-semibold">Doğrulanmış</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400">★</span>
                    <span className="font-bold text-sm">{doktor.puan}</span>
                    <span className="text-gray-400 text-xs">({doktor.yorum} yorum)</span>
                  </div>
                  <span style={{ backgroundColor: "#F0FDFA", color: "var(--teal)" }} className="text-xs font-semibold px-3 py-1 rounded-full">Profili Gör</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
