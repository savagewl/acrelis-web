import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Блог",
  description: "Статьи ACRELIS о разработке, продукте и технологиях.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div>
      {/*
        TODO по ТЗ (Блог):
        - Список статей карточками, выпадающие фильтры по формату и теме
        - Адаптивная сетка, hover-эффекты на карточках → переход на /blog/[slug]
      */}
    </div>
  );
}
