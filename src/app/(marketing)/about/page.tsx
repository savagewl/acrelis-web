import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import ServiceHero from "@/components/shared/ServiceHero";
import StatsBar from "@/components/about/StatsBar";
import AboutIntro from "@/components/about/AboutIntro";
import TeamMarquee from "@/components/about/TeamMarquee";
import CooperationForm from "@/components/about/CooperationForm";
import CasesPreview from "@/components/about/CasesPreview";

export const metadata: Metadata = buildPageMetadata({
  title: "О компании",
  description: "Команда и подход ACRELIS.",
  path: "/about",
});

// Figma id=161:10860 — вся страница целиком, порядок сверен по Y-координатам верхних
// фреймов: Hero → Stats → "О нас" (текст+плейсхолдер фото) → "Наша команда" (лента) →
// "Обсудить сотрудничество" (форма, 3 таба) → "Кейсы" → Footer (уже в layout.tsx, тот же
// футер, что и в макете этой страницы — не добавляем повторно).
export default function AboutPage() {
  return (
    <div>
      <ServiceHero
        title={
          <>
            Мы строим цифровое <span className="text-brand-red">будущее</span> вашего бизнеса
          </>
        }
        subtitle="Более 3 лет разрабатываем пользовательские IT-решения для бизнесов"
        breadcrumbCurrent="О нас"
        showButton={false}
      />
      <StatsBar />
      <AboutIntro />
      <TeamMarquee />
      <CooperationForm />
      <CasesPreview />
    </div>
  );
}
