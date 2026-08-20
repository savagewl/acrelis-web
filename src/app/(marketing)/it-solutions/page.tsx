import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import ServiceHero from "@/components/shared/ServiceHero";
import WhatWeSolve from "@/components/it-solutions/WhatWeSolve";
import WhyUs from "@/components/it-solutions/WhyUs";
import Timeline from "@/components/shared/Timeline";
import CalculatorCta from "@/components/shared/CalculatorCta";
import Faq from "@/components/shared/Faq";
import CaseShowcase from "@/components/home/CaseShowcase";
import ContactCTA from "@/components/home/ContactCTA";
import BlogSection from "@/components/home/BlogSection";
import {
  IT_SOLUTIONS_TIMELINE_HEADING,
  IT_SOLUTIONS_TIMELINE_SUBTITLE,
  IT_SOLUTIONS_TIMELINE_STEPS,
  IT_SOLUTIONS_TIMELINE_WEEK_LABELS,
} from "@/data/it-solutions/timeline";
import {
  IT_SOLUTIONS_FAQ_HEADING,
  IT_SOLUTIONS_FAQ_SUBTITLE,
  IT_SOLUTIONS_FAQ_LEFT,
  IT_SOLUTIONS_FAQ_RIGHT,
} from "@/data/it-solutions/faq";

export const metadata: Metadata = buildPageMetadata({
  title: "IT-решения",
  description: "Разработаем новый цифровой продукт под ваши задачи.",
  path: "/it-solutions",
});

// Figma id=342:1005 — вся страница целиком. Порядок секций сверен по их Y-координатам
// в самом Figma (тот же приём, что уже использован на /automation).
// Hero → "От точечных исправлений до глобальной цифровизации" → "Результат, который можно
// измерить" → Этапы работы → CTA-калькулятор → кейсы → ContactCTA → FAQ → блог → Footer
// (уже в layout.tsx).
//
// Timeline/CalculatorCta/Faq — components/shared, та же механика (а у CalculatorCta —
// один в один тот же контент), что уже сделана на /automation. Блок кейсов — тот же
// CaseShowcase, что и на главной/на /automation, не собственная статичная копия.
export default function ItSolutionsPage() {
  return (
    <div>
      <ServiceHero title="IT-решения" />
      <WhatWeSolve />
      <WhyUs />
      <Timeline
        heading={IT_SOLUTIONS_TIMELINE_HEADING}
        subtitle={IT_SOLUTIONS_TIMELINE_SUBTITLE}
        steps={IT_SOLUTIONS_TIMELINE_STEPS}
        weekLabels={IT_SOLUTIONS_TIMELINE_WEEK_LABELS}
      />
      <CalculatorCta />
      <CaseShowcase />
      <ContactCTA />
      <Faq
        heading={IT_SOLUTIONS_FAQ_HEADING}
        subtitle={IT_SOLUTIONS_FAQ_SUBTITLE}
        leftColumn={IT_SOLUTIONS_FAQ_LEFT}
        rightColumn={IT_SOLUTIONS_FAQ_RIGHT}
        defaultOpenLeftIndex={1}
      />
      <BlogSection />
    </div>
  );
}
