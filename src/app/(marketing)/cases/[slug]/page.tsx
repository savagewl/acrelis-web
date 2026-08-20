import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCaseBySlug, getCases } from "@/data/cases";
import CaseHero from "@/components/cases/CaseHero";
import CaseInfoTasks from "@/components/cases/CaseInfoTasks";
import CaseResult from "@/components/cases/CaseResult";
import CaseGallery from "@/components/cases/CaseGallery";
import ContactCTA from "@/components/home/ContactCTA";
import CasesPreview from "@/components/about/CasesPreview";

export async function generateStaticParams() {
  return getCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return { title: "Кейс не найден" };

  return buildPageMetadata({
    title: item.title,
    description: item.shortDescription,
    path: `/cases/${slug}`,
  });
}

// Figma id=145:9354 (найден по garbled-имени фрейма — см. комментарий в data/cases.ts) —
// вся страница целиком: Hero → Клиент/Период/Стек/Команда + Задачи → Результат + метрики →
// Галерея → "Расскажите о Вашем проекте" (ContactCTA) → "Кейсы" (тот же CasesPreview, что
// на /about — секция называется "Кейсы" и там же кнопка "Все проекты" → /portfolio) →
// Footer (глобальный).
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  return (
    <div>
      <CaseHero item={item} />
      <CaseInfoTasks item={item} />
      <CaseResult item={item} />
      <CaseGallery item={item} />
      <ContactCTA />
      <CasesPreview />
    </div>
  );
}
