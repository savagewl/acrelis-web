"use client";

import SiteHeader from "@/components/base/SiteHeader";
import type { CaseStudy } from "@/data/home/cases";

export const PORTFOLIO_CATEGORIES = ["Все", "Сайты", "Мини-приложения", "Корпоративные системы"] as const;
export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

interface PortfolioHeaderProps {
  active: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
}

// Figma id=145:8340 (/portfolio). Опечатка в самом макете ("Мини-прилождения") исправлена
// на нормальное написание.
export default function PortfolioHeader({ active, onChange }: PortfolioHeaderProps) {
  return (
    <div className="flex flex-col gap-8 bg-white pb-12 sm:pb-[48px]">
      <SiteHeader variant="light" />
      <div className="flex flex-col gap-4 px-6 sm:px-[90px]">
        <p className="font-body text-sm text-body-muted">
          Главная / <span className="text-[#1E2F35]">Портфолио</span>
        </p>
        <h1 className="font-sans text-5xl font-bold text-[#1E2F35] sm:text-[64px]">Портфолио</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-6 sm:px-[90px]">
        {PORTFOLIO_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-2xl px-6 py-3 font-sans text-base ${
              active === category ? "bg-brand-red text-white" : "bg-[rgba(150,150,150,0.2)] text-[#1E2F35]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export function matchesCategory(study: CaseStudy, category: PortfolioCategory) {
  return category === "Все" || study.portfolioCategory === category;
}
