import type { TimelineStep, TimelineWeekLabel } from "@/components/shared/Timeline";

// Figma id=337:109 "Этапы работы" (/automation). Порядковый номер у "Запуск и поддержка"
// в самом Figma стоит "01" (явный дубль с "Аудит процессов") — по хронологии шагов
// (9-11 неделя, последний этап) это должно быть "05", здесь исправлено.
export const AUTOMATION_TIMELINE_HEADING = "Этапы работы";
export const AUTOMATION_TIMELINE_SUBTITLE = "Понятный путь от аудита процессов до полной автоматизации";

export const AUTOMATION_TIMELINE_STEPS: TimelineStep[] = [
  {
    number: "01",
    title: "Аудит процессов",
    description: "Анализ бизнес-процессов, узких мест",
    weeks: "1 - 2 неделя",
    icon: "/images/shared/icons/timeline-1.svg",
    leftPercent: 4.9,
    dotPercent: 14.8,
    row: "top",
  },
  {
    number: "02",
    title: "Проектирование",
    description: "Архитектура, выбор инструментов",
    weeks: "2 - 4 неделя",
    icon: "/images/shared/icons/timeline-4.svg",
    leftPercent: 22.2,
    dotPercent: 33.7,
    row: "bottom",
  },
  {
    number: "03",
    title: "Разработка",
    description: "Интеграции, API, настройка платформ",
    weeks: "4 - 7 неделя",
    icon: "/images/shared/icons/timeline-2.svg",
    leftPercent: 38.9,
    dotPercent: 48.1,
    row: "top",
  },
  {
    number: "04",
    title: "Тестирование",
    description: "Отладка сценариев, нагрузочные тесты",
    weeks: "7 - 9 неделя",
    icon: "/images/shared/icons/timeline-5.svg",
    leftPercent: 55.6,
    dotPercent: 66.9,
    row: "bottom",
  },
  {
    number: "05",
    title: "Запуск и поддержка",
    description: "Внедрение, обучение, мониторинг",
    weeks: "9 - 11 неделя",
    icon: "/images/shared/icons/timeline-3.svg",
    leftPercent: 72.9,
    dotPercent: 81.9,
    row: "top",
  },
];

// Подписанные недели на линии — свои, независимые от точек-коннекторов карточек: две
// крайние (1 и 11 нед) — декоративные акцентные "бублики" по краям всей шкалы, без
// привязки к конкретной карточке.
export const AUTOMATION_TIMELINE_WEEK_LABELS: TimelineWeekLabel[] = [
  { label: "1 нед", percent: 0 },
  { label: "2 нед", percent: 14.8 },
  { label: "5 нед", percent: 48.1 },
  { label: "9 нед", percent: 81.9 },
  { label: "11 нед", percent: 100 },
];
