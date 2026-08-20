import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import ServiceHero from "@/components/shared/ServiceHero";
import StatusDashboard from "@/components/support/StatusDashboard";
import MonitoringGrid from "@/components/support/MonitoringGrid";
import Faq from "@/components/shared/Faq";
import ContactCTA from "@/components/home/ContactCTA";
import BlogSection from "@/components/home/BlogSection";
import { SUPPORT_FAQ_HEADING, SUPPORT_FAQ_LEFT, SUPPORT_FAQ_RIGHT, SUPPORT_FAQ_SUBTITLE } from "@/data/support/faq";

export const metadata: Metadata = buildPageMetadata({
  title: "Поддержка IT-решений",
  description: "Доработаем или поддержим существующее решение.",
  path: "/support",
});

// Figma id=347:47 — вся страница целиком: Hero (свой подзаголовок, одна кнопка) →
// Section_Status (id=352:3255, дашборд с анимацией uptime-полосок) → Section_Monitoring
// (id=345:2988, тёмная сетка 8 карточек + alert-плашка) → ContactCTA → FAQ → блог
// (переиспользованы с главной/других сервисных страниц) → Footer (уже в layout.tsx).
export default function SupportPage() {
  return (
    <div>
      <ServiceHero
        title="Поддержка IT-решений"
        subtitle="Техническое сопровождение, мониторинг и оперативное решение проблем для вашего бизнеса"
      />
      <StatusDashboard />
      <MonitoringGrid />
      <ContactCTA />
      <Faq
        heading={SUPPORT_FAQ_HEADING}
        subtitle={SUPPORT_FAQ_SUBTITLE}
        leftColumn={SUPPORT_FAQ_LEFT}
        rightColumn={SUPPORT_FAQ_RIGHT}
        defaultOpenLeftIndex={1}
      />
      <BlogSection />
    </div>
  );
}
