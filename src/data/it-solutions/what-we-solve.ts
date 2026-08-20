// Figma id=342:2039 "What-We-Solve" (/it-solutions).
export interface TransformationRow {
  number: string;
  problem: string;
  solution: string;
}

export const WHAT_WE_SOLVE_HEADING_LINE_1 = "От точечных исправлений";
export const WHAT_WE_SOLVE_HEADING_LINE_2 = "до глобальной цифровизации";

export const TRANSFORMATION_ROWS: TransformationRow[] = [
  {
    number: "01",
    problem: "Менеджеры теряют заявки в почте и мессенджерах",
    solution: "CRM-система с автоматическим сбором лидов из всех каналов",
  },
  {
    number: "02",
    problem: "Бизнес растёт, а Excel-таблицы больше не справляются",
    solution: "Кастомная ERP-система под ваши процессы",
  },
  {
    number: "03",
    problem: "Клиенты уходят к конкурентам из-за неудобного сайта",
    solution: "Современный веб-продукт с UX-проектированием",
  },
  {
    number: "04",
    problem: "Сотрудники тратят часы на рутинные отчёты",
    solution: "Автоматизированные дашборды и BI-аналитика",
  },
  {
    number: "05",
    problem: "Нет единой системы — данные разбросаны по 10 сервисам",
    solution: "Интеграционная платформа, объединяющая всё в одном окне",
  },
];
