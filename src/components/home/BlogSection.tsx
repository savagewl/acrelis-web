"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";

// Картинки карточек — многослойная композиция (base-фото + кроп-слои поверх, смешанные
// через mix-blend-color/lighten), а не цельная фотография — бейдж категории должен
// остаться настоящей вёрсткой, а не запечённым пикселем внутри картинки.
// Пагинация (стрелки + прогресс-полоса + "01/03") — рабочий UI, но контент по страницам
// пока не меняется: реальных данных для страниц 2/3 нет, подключится вместе с блог-бэкендом.
interface CropLayer {
  src: string;
  className: string;
}

interface BlogPost {
  category: string;
  title: string;
  meta: string;
  cropLayers: CropLayer[];
  fullOverlaySrc?: string;
  tintOverlay?: string;
  tintBlend?: "normal" | "lighten";
}

const PAGE_COUNT = 3;

const BLOG_POSTS: BlogPost[] = [
  {
    category: "Интеграции",
    title: "Как CISO превращает хаотичный список уязвимостей в план работ",
    meta: "Новость · 12 марта",
    cropLayers: [
      { src: "/images/blog/layer-glass.png", className: "absolute -left-[65.12%] -top-[6.4%] h-[160.51%] w-[209.14%] max-w-none object-cover" },
    ],
    tintOverlay: "rgba(255,242,235,0.4)",
  },
  {
    category: "Интеграции",
    title: "Как CISO превращает хаотичный список уязвимостей в план работ",
    meta: "Новость · 12 марта",
    cropLayers: [
      { src: "/images/blog/layer-ribbon-crop.png", className: "absolute -left-[177.25%] -top-[5.04%] h-[218.3%] w-[284.43%] max-w-none object-cover" },
    ],
    fullOverlaySrc: "/images/blog/layer-ribbon-full.png",
    tintOverlay: "rgba(205,62,85,0.38)",
    tintBlend: "lighten",
  },
  {
    category: "Интеграции",
    title: "Как CISO превращает хаотичный список уязвимостей в план работ",
    meta: "Новость · 12 марта",
    cropLayers: [],
  },
];

function BlogCardImage({ post }: { post: BlogPost }) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-t-xl">
      <Image src="/images/blog/base.jpg" alt="" fill className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #F43367 0%, #FF050A 100%)", mixBlendMode: "color" }}
      />
      {post.cropLayers.map((layer) => (
        <div key={layer.src} className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- крой в процентах от родителя (не квадрат), next/image тут не подходит */}
          <img src={layer.src} alt="" className={layer.className} />
        </div>
      ))}
      {post.fullOverlaySrc && <Image src={post.fullOverlaySrc} alt="" fill className="object-cover" />}
      {post.tintOverlay && (
        <div className="absolute inset-0" style={{ background: post.tintOverlay, mixBlendMode: post.tintBlend ?? "normal" }} />
      )}
      <span className="absolute right-3 top-3 rounded-full border border-[#1E2F35] bg-white px-3 py-2 font-body text-sm font-medium tracking-[0.03em] text-[#1D1D1B]">
        {post.category}
      </span>
    </div>
  );
}

export default function BlogSection() {
  const [page, setPage] = useState(0);

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
          {BLOG_POSTS.map((post, i) => (
            <div key={i} className="flex flex-1 flex-col gap-6 rounded-xl bg-input-bg">
              <BlogCardImage post={post} />
              <div className="flex flex-col gap-3 p-5">
                <p className="font-sans text-xl font-semibold leading-6 text-[#1E2F35]">{post.title}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm font-medium text-body-muted">{post.meta}</span>
                  <ArrowUpRightIcon className="h-9 w-9 text-brand-red" />
                </div>
              </div>
            </div>
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
