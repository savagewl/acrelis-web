"use client";

import { useState } from "react";
import SiteHeader from "@/components/base/SiteHeader";

// Figma id=145:8596 (/blog). Дропдауны "Формат"/"Тема" — визуальная вёрстка по макету;
// реального списка опций в Figma нет (только лейбл+шеврон), а поиск фильтрует по
// заголовку статьи. Полноценная фильтрация/пагинация подключится вместе с блог-бэкендом
// (см. комментарий в data/blog-posts.ts) — сейчас просто вёрстка.
interface BlogHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function BlogHeader({ search, onSearchChange }: BlogHeaderProps) {
  const [formatOpen, setFormatOpen] = useState(false);
  const [topicOpen, setTopicOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 bg-white pb-12 sm:pb-[48px]">
      <SiteHeader variant="light" />
      <div className="flex flex-col gap-4 px-6 sm:px-[90px]">
        <p className="font-body text-sm text-body-muted">
          Главная / <span className="text-[#1E2F35]">Блог</span>
        </p>
        <h1 className="font-sans text-5xl font-bold text-[#1E2F35] sm:text-[64px]">Блог</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 px-6 sm:px-[90px]">
        <label className="flex h-[50px] w-full max-w-[409px] items-center gap-2.5 rounded-2xl border-[1.5px] border-[rgba(150,150,150,0.2)] px-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
          <img src="/images/blog/icons/search.svg" alt="" className="size-5 shrink-0" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск"
            className="w-full font-sans text-base text-[#1E2F35] outline-none placeholder:text-[#1E2F35]"
          />
        </label>

        <button
          type="button"
          onClick={() => setFormatOpen((v) => !v)}
          aria-expanded={formatOpen}
          className="flex h-[50px] items-center gap-8 rounded-2xl bg-[rgba(150,150,150,0.2)] px-6 font-sans text-base text-[#1E2F35]"
        >
          Формат
          {/* eslint-disable-next-line @next/next/no-img-element -- точный шеврон из Figma */}
          <img
            src="/images/about/decor/select-chevron.svg"
            alt=""
            className={`h-[5px] w-[15px] transition-transform ${formatOpen ? "rotate-180" : ""}`}
          />
        </button>

        <button
          type="button"
          onClick={() => setTopicOpen((v) => !v)}
          aria-expanded={topicOpen}
          className="flex h-[50px] items-center gap-8 rounded-2xl bg-[rgba(150,150,150,0.2)] px-6 font-sans text-base text-[#1E2F35]"
        >
          Тема
          {/* eslint-disable-next-line @next/next/no-img-element -- точный шеврон из Figma */}
          <img
            src="/images/about/decor/select-chevron.svg"
            alt=""
            className={`h-[5px] w-[15px] transition-transform ${topicOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
