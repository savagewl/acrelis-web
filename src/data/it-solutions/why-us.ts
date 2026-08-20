// Figma id=342:2727 "Why-Us" (/it-solutions).
export interface ProofRow {
  title: string;
  description: string;
  indentClass: string;
}

export const WHY_US_HEADING = "Результат, который можно измерить";

export const TESTIMONIAL = {
  quoteBeforeNumber: "Акрелис за ",
  number: "6",
  quoteAfterNumber:
    " недель собрали MVP, который мы не могли запустить полгода. Теперь у нас 2000+ пользователей.",
  author: "Сергей М., CEO TechStart",
};

// Ступенчатый левый отступ у каждой строки — точно как в Figma (pl-0/16/32/48).
export const PROOF_ROWS: ProofRow[] = [
  {
    title: "50+ проектов за 5 лет",
    description: "Успешные запуски для среднего и крупного бизнеса",
    indentClass: "",
  },
  {
    title: "Средний рейтинг 4.9 на Clutch",
    description: "Признание международным сообществом экспертов",
    indentClass: "sm:pl-4",
  },
  {
    title: "Команда: 15 специалистов in-house",
    description: "Дизайнеры, разработчики и QA в одном офисе",
    indentClass: "sm:pl-8",
  },
  {
    title: "Поддержка 24/7 после запуска",
    description: "Мы не бросаем проекты после релиза — развиваем вместе",
    indentClass: "sm:pl-12",
  },
];

export const CTA_BAR_TEXT_PLAIN = "Расскажите о вашей задаче — ";
export const CTA_BAR_TEXT_ACCENT = "предложим решение за 24 часа";
export const CTA_BAR_BUTTON = "Обсудить проект";
