import Navbar from "@/components/Navbar";
import AIChat from "./AIChat";

export const metadata = {
  title: "AI Hukuk Danışmanı — Sağlık Hukuku Eğitimli | TurkHekim",
  description:
    "Türkiye sağlık hukuku alanında eğitilmiş yapay zekâ asistanı. Malpraktis emsalleri, sağlıkta reklam mevzuatı, TİTCK, KVKK ve SGK konularında 7/24 ön danışmanlık.",
  alternates: { canonical: "https://turkhekim.com/hukuk/ai-danisman" },
};

export default function AIDanismanSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, #0a3d62 100%)" }}
        className="px-6 py-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🤖</span>
            <h1 className="text-white text-2xl md:text-3xl font-bold">AI Hukuk Danışmanı</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Sağlık hukuku alanında eğitilmiş yapay zekâ. Malpraktis emsalleri, sağlıkta reklam yönetmeliği,
            TİTCK, KVKK ve SGK mevzuatı konusunda anlık ön danışmanlık.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-900">
          <strong>⚖️ Uyarı:</strong> Bu asistan genel bilgilendirme amaçlıdır ve hukuki temsil yerine geçmez.
          Somut uyuşmazlıklarınız için <a href="/hukuk/avukatlar" className="underline">anlaşmalı avukatlarımızla</a> görüşmenizi öneririz.
        </div>

        <AIChat />
      </section>
    </div>
  );
}
