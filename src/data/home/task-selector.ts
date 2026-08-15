export interface TaskCard {
  icon: "trending-up" | "globe" | "settings";
  title: string;
  description: string;
  tags: string[];
  href: string;
  variant: "highlighted" | "default";
}

// Точные данные из Figma (task-selector-block, id=714:2874).
export const TASK_CARDS: TaskCard[] = [
  {
    icon: "trending-up",
    title: "Масштабировать бизнес и автоматизировать процессы",
    description:
      "Для компаний на стадии роста, где важно навести порядок в процессах, увеличить продажи и управлять бизнесом на основе данных.",
    tags: ["Автоматизация процессов", "CRM / ERP", "Интеграция и аналитика", "Корпоративные порталы"],
    href: "/automation",
    variant: "highlighted",
  },
  {
    icon: "globe",
    title: "Разработать новый цифровой продукт",
    description:
      "Создать сайты, интернет-магазины, мобильные приложения и веб-сервисы, которые привлекают клиентов и решают задачи вашего бизнеса.",
    tags: ["Автоматизация процессов", "CRM / ERP", "Интеграция и аналитика", "Корпоративные порталы"],
    href: "/it-solutions",
    variant: "default",
  },
  {
    icon: "settings",
    title: "Доработать или поддержать существующее решение",
    description:
      "Провести аудит, оптимизировать производительность и поддерживать уже работающие IT-решения.",
    tags: ["Доработка и оптимизация", "Доработка и оптимизация", "Telegram-бот и мини-приложения"],
    href: "/support",
    variant: "default",
  },
];
