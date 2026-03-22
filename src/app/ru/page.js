import UluslararasiSayfa from "@/components/UluslararasiSayfa";
import { CEVIRILER } from "@/lib/dilCeviriler";

export const metadata = {
  title: "DoktorPusula — Найдите проверенных врачей в Турции",
  description: "Найдите лучших врачей в Турции. Онлайн запись, подтверждённые отзывы, поддержка на русском. Медицинский туризм.",
  alternates: { canonical: "https://doktorpusula.com/ru", languages: { tr: "https://doktorpusula.com", ru: "https://doktorpusula.com/ru" } },
};

export default function RuPage() {
  return <UluslararasiSayfa t={CEVIRILER.ru} />;
}
