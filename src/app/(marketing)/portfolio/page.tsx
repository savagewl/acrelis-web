import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import PortfolioListing from "@/components/portfolio/PortfolioListing";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = buildPageMetadata({
  title: "Портфолио",
  description: "Реализованные проекты ACRELIS: сайты, мини-приложения и другие решения.",
  path: "/portfolio",
});

// Figma id=145:5956 — вся страница целиком, порядок сверен по Y-координатам: хедер
// (глобальный) → заголовок+фильтр по категориям → сетка карточек → "Расскажите о Вашем
// проекте" (тот же ContactCTA) → Footer (глобальный).
export default function PortfolioPage() {
  return (
    <div>
      <PortfolioListing />
      <ContactCTA />
    </div>
  );
}
