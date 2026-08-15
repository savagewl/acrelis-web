import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Портфолио",
  description: "Реализованные проекты ACRELIS: сайты, мини-приложения и другие решения.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div>
      {/*
        TODO по ТЗ (Портфолио):
        - Фильтрация карточек по категориям ("Все", "Сайты", "Мини-приложения", ...) без перезагрузки страницы
        - Кнопка "Показать ещё" — подгружает следующую порцию карточек с плавным появлением
        - Hover-эффекты на карточках и стрелках перехода
        - Клик по карточке → /cases/[slug]
      */}
    </div>
  );
}
