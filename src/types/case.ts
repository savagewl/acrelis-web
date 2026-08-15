// Контракт данных кейса — повторяет структуру полей из ТЗ (раздел "Разработка модуля
// «Кейсы» в админ-панели"), чтобы когда появится реальный backend/CMS, форма ответа API
// совпадала 1-в-1 и потребовался только один правки — источник данных в getCases()/getCaseBySlug().

export interface CaseMetric {
  value: string; // например "+50%"
  label: string; // например "Иностранной аудитории"
}

export interface Case {
  slug: string;
  status: "draft" | "published";

  // Первый экран (обложка)
  title: string;
  tags: string[];
  shortDescription: string;
  coverImage: string;

  // Второй экран (детали, задачи, результаты)
  client: string;
  developmentPeriod: string;
  techStack: string[];
  team: string;
  projectUrl?: string;
  tasksHtml: string; // rich text из будущей админки
  resultHtml: string; // rich text из будущей админки
  metrics: CaseMetric[];

  // Третий экран
  gallery: string[];
}
