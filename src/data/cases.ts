import type { Case } from "@/types/case";

// Временные моковые данные вместо CMS/API — см. комментарий в data/blog-posts.ts. Реальный
// пока один: контент кейса вытащен дословно из Figma (id=145:9354, найден по garbled-имени
// фрейма — Figma склеивает в имя весь вложенный текст, когда фрейм не назван вручную).
// ERA Hotels/Ялта Апарт на /portfolio показываются карточками (data/home/cases.ts), но без
// собственной страницы — по решению пользователя, т.к. для них таких Figma-страниц нет.
const CASES: Case[] = [
  {
    slug: "rossiya-islamskiy-mir",
    status: "published",
    title: "«Россия – Исламский мир»",
    tags: ["Госсектор", "Дипломатия", "Международные организации"],
    shortDescription: "Официальный информационный портал Группы стратегического видения «Россия – Исламский мир»",
    coverImage: "/images/cases/rossiya/hero-bg-2.jpg",
    client: "ГСВ «Россия — Исламский мир»",
    developmentPeriod: "8 месяцев (2025)",
    techStack: ["PHP", "Bitrix24", "Vue.js", "REST API"],
    team: "7 специалистов",
    projectUrl: "https://russia-islworld.ru",
    tasksHtml:
      "<p>Разработать многоязычный портал (RU / EN / AR) с RTL-вёрсткой для арабского языка, модульной системой контента (новости, аналитика, экспертные мнения, научные статьи), интерактивной картой 25 стран-участников и разделами для проектов, грантов и обращений.</p><p>Обеспечить SEO-готовность и автономную работу редакции.</p>",
    resultHtml:
      "<p>Разработан многоязычный портал на Next.js для группы «Россия — Исламский мир» (25 стран, 77 регионов России). Реализована полная поддержка русского, английского и арабского языков с RTL-вёрсткой, модульная новостная система, интерактивная карта и разделы проектов. Редакция самостоятельно публикует контент. После запуска охват англо- и арабоязычной аудитории вырос.</p>",
    metrics: [
      { value: "+50%", label: "Иностранной аудитории" },
      { value: "+40%", label: "Загрузка страниц" },
      { value: "+35%", label: "Глубина просмотра" },
      { value: "+45%", label: "SEO" },
    ],
    gallery: ["/images/cases/rossiya/gallery-1.png", "/images/cases/rossiya/gallery-2.png"],
  },
];

export function getCases(): Case[] {
  return CASES.filter((c) => c.status === "published");
}

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug);
}
