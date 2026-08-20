import CaseCard from "@/components/cases/CaseCard";
import { CASES } from "@/data/home/cases";
import { matchesCategory, type PortfolioCategory } from "@/components/portfolio/PortfolioHeader";

const GRID_SIZE = 9;

// Figma id=145:6945 (сетка) + 145:8576 (кнопка). В макете все 9 карточек — один и тот же
// плейсхолдер-кейс; у нас реально 3 кейса — сетка заполняется ими по кругу. Кнопку
// "Показать ещё" скрываем — показывать больше нечего (см. тот же приём на /blog).
export default function PortfolioGrid({ category }: { category: PortfolioCategory }) {
  const matches = CASES.filter((study) => matchesCategory(study, category));

  if (matches.length === 0) {
    return (
      <div className="px-6 py-24 text-center sm:px-[90px]">
        <p className="font-body text-lg text-body-muted">В этой категории пока нет проектов</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-12 px-6 pb-12 sm:px-[90px]">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: GRID_SIZE }, (_, i) => (
          <CaseCard key={i} study={matches[i % matches.length]} />
        ))}
      </div>
    </div>
  );
}
