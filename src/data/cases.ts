import type { Case } from "@/types/case";

// Временные моковые данные вместо CMS/API. Достаточно заменить тело getCases()/
// getCaseBySlug() на реальный фетч — сигнатуры и типы уже совпадают с будущим API.
const CASES: Case[] = [
  {
    slug: "example-case",
    status: "draft",
    title: "Пример кейса",
    tags: ["Госсектор"],
    shortDescription: "Заглушка до подключения реального контента.",
    coverImage: "/images/cases/placeholder.jpg",
    client: "—",
    developmentPeriod: "—",
    techStack: [],
    team: "—",
    tasksHtml: "",
    resultHtml: "",
    metrics: [],
    gallery: [],
  },
];

export function getCases(): Case[] {
  return CASES.filter((c) => c.status === "published");
}

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug);
}
