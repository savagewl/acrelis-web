import type { TimelineStep, TimelineWeekLabel } from "@/components/shared/Timeline";

// Figma id=342:1306 "Этапы работы" (/it-solutions) — та же самая раскладка (координаты
// карточек/точек/коннекторов пиксель-в-пиксель совпадают с /automation, только текст и
// шкала недель другие), поэтому leftPercent/dotPercent взяты те же, что и в
// data/automation/timeline.ts. Порядковый номер у "Запуск и развитие" в Figma снова стоит
// "01" (тот же дубль-баг, что был на /automation) — исправлено на "05".
export const IT_SOLUTIONS_TIMELINE_HEADING = "Этапы работы";
export const IT_SOLUTIONS_TIMELINE_SUBTITLE = "Понятный путь от идеи до запуска digital-продукта";

export const IT_SOLUTIONS_TIMELINE_STEPS: TimelineStep[] = [
  {
    number: "01",
    title: "Аналитика",
    description: "Цели, аудитория, сценарии, ТЗ",
    weeks: "1 - 2 неделя",
    icon: "/images/shared/icons/timeline-1.svg",
    leftPercent: 4.9,
    dotPercent: 14.8,
    row: "top",
  },
  {
    number: "02",
    title: "Дизайн",
    description: "UX/UI, прототипы, дизайн-система",
    weeks: "2 - 4 неделя",
    icon: "/images/shared/icons/timeline-4.svg",
    leftPercent: 22.2,
    dotPercent: 33.7,
    row: "bottom",
  },
  {
    number: "03",
    title: "Разработка",
    description: "Frontend, Backend, CMS/CRM",
    weeks: "4 - 8 неделя",
    icon: "/images/shared/icons/timeline-2.svg",
    leftPercent: 38.9,
    dotPercent: 48.1,
    row: "top",
  },
  {
    number: "04",
    title: "Тестирование",
    description: "QA, интеграции, оптимизация",
    weeks: "8 - 10 неделя",
    icon: "/images/shared/icons/timeline-5.svg",
    leftPercent: 55.6,
    dotPercent: 66.9,
    row: "bottom",
  },
  {
    number: "05",
    title: "Запуск и развитие",
    description: "Релиз, обучение, поддержка",
    weeks: "10 - 12 неделя",
    icon: "/images/shared/icons/timeline-3.svg",
    leftPercent: 72.9,
    dotPercent: 81.9,
    row: "top",
  },
];

export const IT_SOLUTIONS_TIMELINE_WEEK_LABELS: TimelineWeekLabel[] = [
  { label: "1 нед", percent: 0 },
  { label: "2 нед", percent: 14.8 },
  { label: "6 нед", percent: 48.1 },
  { label: "10 нед", percent: 81.9 },
  { label: "12 нед", percent: 100 },
];
