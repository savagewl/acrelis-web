"use client";

import { useState } from "react";
import Link from "next/link";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/data/blog-posts";

const PAGE_COUNT = 3;

// Пагинация (стрелки + прогресс-полоса + "01/03") — рабочий UI, но контент по страницам
// пока не меняется: реальная статья пока одна, будет подключено вместе с блог-бэкендом.
export default function BlogSection() {
  const [page, setPage] = useState(0);
  const posts = getBlogPosts();

  return (
    <section className="flex flex-col gap-8 bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-[56px] font-medium leading-[57.12px] tracking-[-3.64px] text-[#1E2F35]">Блог</h2>
        <Link
          href="/blog"
          className="flex h-[57px] items-center justify-center rounded-[14.427px] border-2 border-[#969696] bg-[#1E2F35] px-5 py-3.5 font-sans text-lg text-white"
        >
          Все статьи
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-4 overflow-hidden sm:flex-row">
          {Array.from({ length: PAGE_COUNT }, (_, i) => (
            <BlogCard key={i} post={posts[i % posts.length]} variantIndex={i} />
          ))}
        </div>

        <div className="flex w-full items-center gap-6">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Предыдущая страница"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
            >
              <ArrowLeftIcon className="h-[18px] w-[22px] text-[#1E2F35]" />
            </button>
            <button
              type="button"
              aria-label="Следующая страница"
              disabled={page === PAGE_COUNT - 1}
              onClick={() => setPage((p) => Math.min(PAGE_COUNT - 1, p + 1))}
              className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
            >
              <ArrowRightIcon className="h-[18px] w-[22px] text-[#1E2F35]" />
            </button>
          </div>

          <div className="relative h-0.5 flex-1 bg-[#969696]">
            <div
              className="absolute inset-y-0 left-0 bg-brand-red transition-[width] duration-300 ease-in-out"
              style={{ width: `${((page + 1) / PAGE_COUNT) * 100}%` }}
            />
          </div>

          <p className="font-sans text-lg text-[#1E2F35]">
            0{page + 1}/0{PAGE_COUNT}
          </p>
        </div>
      </div>
    </section>
  );
}
