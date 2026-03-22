import UluslararasiSayfa from "@/components/UluslararasiSayfa";
import { CEVIRILER } from "@/lib/dilCeviriler";

export const metadata = {
  title: "DoktorPusula — Find Verified Doctors in Turkey",
  description: "Find verified doctors in Turkey. Book appointments online, read real patient reviews. Medical tourism support in English.",
  alternates: { canonical: "https://doktorpusula.com/en", languages: { tr: "https://doktorpusula.com", en: "https://doktorpusula.com/en" } },
};

export default function EnPage() {
  return <UluslararasiSayfa t={CEVIRILER.en} />;
}
