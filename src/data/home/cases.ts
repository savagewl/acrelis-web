export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  /** slug совпадает с data/cases.ts, где есть — карточка тогда ведёт на /cases/[slug].
   * У кейсов без полной страницы (пока только ERA/Ялта) — null, карточка не кликается. */
  slug: string | null;
  /** Категория для фильтра на /portfolio ("Все"/"Сайты"/"Мини-приложения"/"Корпоративные системы"). */
  portfolioCategory: "Сайты" | "Мини-приложения" | "Корпоративные системы";
  category: string;
  title: string;
  description: string;
  metrics: CaseMetric[];
  stack: string;
  image: string;
  accent: string;
  /** Короткие теги для превью-виджетов (напр. CasesPreview на /about) — в самом
   * CaseShowcase (главная) не используются. */
  tags: [string, string];
}

export const CASES: CaseStudy[] = [
  {
    slug: "rossiya-islamskiy-mir",
    portfolioCategory: "Сайты",
    category: "Разработка информационного портала",
    title: "«Россия – Исламский мир»",
    description:
      "Официальный информационный портал Группы стратегического видения «Россия – Исламский мир»",
    metrics: [
      { value: "+50%", label: "международный охват" },
      { value: "+35%", label: "органического трафика" },
      { value: "+200%", label: "активность" },
    ],
    stack: "next js, django python, REST API",
    image: "/images/home/cases/russia.jpg",
    accent: "#15604B",
    tags: ["Веб-портал", "Портал"],
  },
  {
    slug: null,
    portfolioCategory: "Сайты",
    category: "Разработка сайта для сети отелей",
    title: "«ERA Hotels Group»",
    description:
      "Единый сайт сети отелей в Крыму, Ялте и Нижнем Новгороде с онлайн-бронированием, выбором объектов и разделами для мероприятий",
    metrics: [
      { value: "+250%", label: "онлайн-брони" },
      { value: "+200%", label: "органический трафик" },
      { value: "−30%", label: "ручной брони" },
    ],
    stack: "React js, Gin.go, REST API",
    image: "/images/home/cases/era.jpg",
    accent: "#CFA776",
    tags: ["Сайт", "Бронирование"],
  },
  {
    slug: null,
    portfolioCategory: "Сайты",
    category: "Разработка сайта апарт-комплекса",
    title: "«Ялта Апарт»",
    description:
      "Сайт-витрина апартаментов на Южном берегу Крыма с каталогом объектов, фотогалереями, планировками и быстрой заявкой на бронирование, таймерами акций и интеграцией Яндекс.Карт",
    metrics: [
      { value: "+60%", label: "заявок на бронь" },
      { value: "−35%", label: "звонков с вопросами" },
      { value: "+45%", label: "конверсии" },
    ],
    stack: "next js, Gin.go, REST API",
    image: "/images/home/cases/yalta.jpg",
    accent: "#81BB33",
    tags: ["Сайт", "Каталог"],
  },
];
