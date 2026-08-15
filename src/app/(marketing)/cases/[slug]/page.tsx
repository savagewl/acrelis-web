import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCaseBySlug, getCases } from "@/data/cases";

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
      {/*
        TODO по ТЗ (детальная страница кейса):
        - 1 экран (обложка): название, теги, короткое описание, фон
        - 2 экран: клиент / период / стек / команда / ссылка на проект, блок "Задачи",
          блок "Результат" + метрики с анимацией нарастания цифр при скролле
        - 3 экран: галерея скриншотов
        - Кнопка "Все проекты" → /portfolio
        Админка для CRUD этих полей — вне зоны ответственности фронтенда (см. src/data/cases.ts).
      */}
    </div>
  );
}
