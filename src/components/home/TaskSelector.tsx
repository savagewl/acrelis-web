"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TASK_CARDS, type TaskCard } from "@/data/home/task-selector";
import TrendingUpIcon from "@/components/ui/TrendingUpIcon";
import GlobeIcon from "@/components/ui/GlobeIcon";
import SettingsIcon from "@/components/ui/SettingsIcon";

const ICONS = {
  "trending-up": TrendingUpIcon,
  globe: GlobeIcon,
  settings: SettingsIcon,
};

// ТЗ: при наведении курсора карточка плавно увеличивается.
// Figma: task-selector-block id=714:2874.
function Card({ card, index }: { card: TaskCard; index: number }) {
  const Icon = ICONS[card.icon];
  const highlighted = card.variant === "highlighted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.25, ease: "easeOut" } }}
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-3xl p-6 ${
        highlighted
          ? "bg-gradient-to-br from-[#AF0609] to-[#FF050A] text-white"
          : "border border-black/10 bg-[#969696]/5 text-[#272727]"
      }`}
    >
      {highlighted && (
        <>
          {/* Настоящий рендер декоративных слоёв из Figma (экспорт PNG, учитывает
              warp-эффект плагина и blur — их нельзя воссоздать через CSS-градиент).
              Позиционирование — по absoluteRenderBounds относительно карточки 405x512. */}
          <Image
            src="/images/home/decor/task-card-glow-1.png"
            alt=""
            fill
            aria-hidden
            className="pointer-events-none absolute inset-0 object-cover"
          />
          <Image
            src="/images/home/decor/task-card-glow-2.png"
            alt=""
            width={810}
            height={703}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[68.6%] w-full object-cover"
          />
          <Image
            src="/images/home/decor/task-card-streak-2.png"
            alt=""
            width={810}
            height={649}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[63.4%] w-full object-cover"
          />
          <Image
            src="/images/home/decor/task-card-streak-1.png"
            alt=""
            width={616}
            height={419}
            aria-hidden
            className="pointer-events-none absolute object-contain"
            style={{ left: "24%", top: "59.1%", width: "76%", height: "40.9%" }}
          />
        </>
      )}
      <div
        className={`relative flex flex-col ${
          highlighted ? "gap-3" : "flex-1 justify-between"
        }`}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            highlighted ? "bg-white text-brand-red" : "bg-[#262626] text-white"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-sans text-2xl">{card.title}</h3>
        </div>
        <p className={`font-body text-base ${highlighted ? "text-white/90" : "text-[#272727]/80"}`}>
          {card.description}
        </p>
        <div className="flex flex-wrap gap-2 py-8">
          {card.tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className={`rounded-full px-3 py-1.5 font-body text-sm ${
                highlighted ? "bg-white/[0.56] text-white" : "bg-[#969696]/20 text-[#1E2F35]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={card.href}
        className={`relative z-10 rounded-xl px-6 py-4 text-center font-sans text-base font-medium ${
          highlighted ? "bg-white text-[#1E2F35]" : "bg-[#969696]/20 text-[#1E2F35]"
        }`}
      >
        Перейти к решениям
      </Link>
    </motion.div>
  );
}

export default function TaskSelector() {
  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="font-sans text-3xl font-medium text-[#1E2F35] sm:text-5xl">
            Какую задачу вы хотите решить?
          </h2>
          <p className="font-body text-lg text-body-muted sm:text-2xl">
            Выберите направление, чтобы мы показали подходящие для вас решения
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TASK_CARDS.map((card, index) => (
            <Card key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
