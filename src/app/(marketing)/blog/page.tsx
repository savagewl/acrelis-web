import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import BlogListing from "@/components/blog/BlogListing";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = buildPageMetadata({
  title: "Блог",
  description: "Статьи ACRELIS о разработке, продукте и технологиях.",
  path: "/blog",
});

// Figma id=145:8580 — вся страница целиком, порядок сверен по Y-координатам: хедер
// (глобальный, в layout.tsx) → заголовок+поиск+фильтры → сетка карточек → "Расскажите о
// Вашем проекте" (это тот же ContactCTA, что и на других страницах) → Footer (глобальный).
export default function BlogPage() {
  return (
    <div>
      <BlogListing />
      <ContactCTA />
    </div>
  );
}
