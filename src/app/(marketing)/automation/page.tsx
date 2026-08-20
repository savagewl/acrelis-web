import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import ServiceHero from "@/components/shared/ServiceHero";
import Results from "@/components/automation/Results";
import BeforeAfter from "@/components/automation/BeforeAfter";
import Timeline from "@/components/shared/Timeline";
import CalculatorCta from "@/components/shared/CalculatorCta";
import Faq from "@/components/shared/Faq";
import CaseShowcase from "@/components/home/CaseShowcase";
import ContactCTA from "@/components/home/ContactCTA";
import BlogSection from "@/components/home/BlogSection";
import {
  AUTOMATION_TIMELINE_HEADING,
  AUTOMATION_TIMELINE_SUBTITLE,
  AUTOMATION_TIMELINE_STEPS,
  AUTOMATION_TIMELINE_WEEK_LABELS,
} from "@/data/automation/timeline";
import { AUTOMATION_FAQ_HEADING, AUTOMATION_FAQ_SUBTITLE, AUTOMATION_FAQ_LEFT, AUTOMATION_FAQ_RIGHT } from "@/data/automation/faq";

export const metadata: Metadata = buildPageMetadata({
  title: "Автоматизация бизнес-процессов",
  description: "Масштабируйте бизнес и автоматизируйте процессы под ключ.",
  path: "/automation",
});

// Figma id=318:59725 — вся страница целиком. Порядок секций сверен по их Y-координатам
// в самом Figma (y-нижняя граница каждой секции точно совпадает с y-верхней следующей),
// а не по порядку, в котором они попались при обходе файла.
// Hero → Результаты → До/После → Этапы работы → CTA-калькулятор → кейсы → ContactCTA
// «Расскажите о Вашем проекте» (1:1 с главной) → FAQ → блог → Footer (уже в layout.tsx).
//
// Timeline/Faq/CalculatorCta вынесены в components/shared — та же механика и (у
// CalculatorCta) тот же контент один-в-один повторяются на /it-solutions. Блок кейсов —
// тот же CaseShowcase, что и на главной (не собственная статичная копия): в Figma на
// месте кейсов лежит один статичный кадр "Россия – Исламский мир", но пользователь дважды
// сообщил, что самодельная статичная версия "сломана"/"не работает как на главной" —
// переиспользование уже проверенного компонента снимает и это несоответствие ожиданиям,
// и риск скрытых багов в ручной копии.
export default function AutomationPage() {
  return (
    <div>
      <ServiceHero title="Автоматизация" />
      <Results />
      <BeforeAfter />
      <Timeline
        heading={AUTOMATION_TIMELINE_HEADING}
        subtitle={AUTOMATION_TIMELINE_SUBTITLE}
        steps={AUTOMATION_TIMELINE_STEPS}
        weekLabels={AUTOMATION_TIMELINE_WEEK_LABELS}
      />
      <CalculatorCta />
      <CaseShowcase />
      <ContactCTA />
      <Faq
        heading={AUTOMATION_FAQ_HEADING}
        subtitle={AUTOMATION_FAQ_SUBTITLE}
        leftColumn={AUTOMATION_FAQ_LEFT}
        rightColumn={AUTOMATION_FAQ_RIGHT}
        defaultOpenLeftIndex={1}
      />
      <BlogSection />
    </div>
  );
}
