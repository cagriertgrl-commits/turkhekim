import UluslararasiSayfa from "@/components/UluslararasiSayfa";
import { CEVIRILER } from "@/lib/dilCeviriler";

export const metadata = {
  title: "DoktorPusula — پزشکان تأییدشده در ترکیه",
  description: "بهترین پزشکان ترکیه را پیدا کنید. نوبت‌دهی آنلاین، نظرات تأییدشده، پشتیبانی فارسی. گردشگری پزشکی.",
  alternates: { canonical: "https://doktorpusula.com/fa", languages: { tr: "https://doktorpusula.com", fa: "https://doktorpusula.com/fa" } },
};

export default function FaPage() {
  return <UluslararasiSayfa t={CEVIRILER.fa} />;
}
