import Link from "next/link";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/data/blog-posts";

const CARD_COUNT = 3;

// Figma id=449:1132 "Section - residence" (/blog/[slug], блок "Похожие статьи") — тот же
// паттерн карточек и пагинации, что в home/BlogSection, но с заголовком "Блог" и кнопкой
// "Смотреть блог" → /blog. Пагинация статична (01/03) — реальная статья пока одна.
export default function RelatedArticles() {
  const posts = getBlogPosts();

  return (
    <section className="flex flex-col gap-8 bg-white px-6 py-12 sm:px-[90px]">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-4xl font-medium tracking-[-2px] text-[#1E2F35] sm:text-[56px]">Блог</h2>
        <Link
          href="/blog"
          className="shrink-0 rounded-2xl border-2 border-[rgba(150,150,150,0.2)] bg-[#1E2F35] px-5 py-3.5 font-sans text-base font-medium text-white sm:text-lg"
        >
          Смотреть блог
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: CARD_COUNT }, (_, i) => (
            <BlogCard key={i} post={posts[i % posts.length]} variantIndex={i} />
          ))}
        </div>

        <div className="flex w-full items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex size-10 items-center justify-center text-[#1E2F35]/40">
              <ArrowLeftIcon className="size-[22px]" />
            </span>
            <span aria-hidden className="flex size-10 items-center justify-center text-[#1E2F35]/40">
              <ArrowRightIcon className="size-[22px]" />
            </span>
          </div>
          <div className="relative h-0.5 flex-1 bg-[rgba(150,150,150,0.3)]">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-red" />
          </div>
          <p className="whitespace-nowrap font-sans text-lg text-[#1E2F35]">01/03</p>
        </div>
      </div>
    </section>
  );
}
