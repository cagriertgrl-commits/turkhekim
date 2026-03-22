import UluslararasiSayfa from "@/components/UluslararasiSayfa";
import { CEVIRILER } from "@/lib/dilCeviriler";

export const metadata = {
  title: "DoktorPusula — ابحث عن أطباء موثوقين في تركيا",
  description: "ابحث عن أفضل الأطباء في تركيا. احجز مواعيد أونلاين، اقرأ آراء موثقة. دعم السياحة الطبية.",
  alternates: { canonical: "https://doktorpusula.com/ar", languages: { tr: "https://doktorpusula.com", ar: "https://doktorpusula.com/ar" } },
};

export default function ArPage() {
  return <UluslararasiSayfa t={CEVIRILER.ar} />;
}
