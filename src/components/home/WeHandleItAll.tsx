"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PAIN_POINTS } from "@/data/home/pain-points";
import { useModal } from "@/components/providers/ModalProvider";

const CYCLE_MS = 3500;

// ТЗ: карточки 01-04 плавно проявляются (fade-in/slide-down) при скролле, затем
// зациклено по очереди подсвечиваются серый->красный (3-4с/карточка). При наведении
// автоцикл ставится на паузу и подсвечивается выбранная пользователем карточка.
// Figma: Frame 2087325873, id=556:6286.
export default function WeHandleItAll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { openLeaveRequest } = useModal();

  useEffect(() => {
    if (hoveredIndex !== null) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % PAIN_POINTS.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [hoveredIndex]);

  const highlightedIndex = hoveredIndex ?? activeIndex;

  return (
    <section className="bg-white px-6 py-16 sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-12 sm:px-[30px]">
        <h2 className="font-sans text-4xl font-medium text-brand-red sm:text-[56px]">
          СДЕЛАЕМ ВСЁ ЗА ВАС
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((point, index) => {
            const isActive = highlightedIndex === index;
            return (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: -24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex flex-col gap-4 rounded-3xl py-8"
              >
                <span
                  className="font-sans text-5xl transition-colors duration-500"
                  style={{ color: isActive ? "#FF050A" : "rgba(150,150,150,0.3)" }}
                >
                  {point.number}
                </span>
                <p className="font-sans text-lg text-[#1E2F35]">{point.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col items-start gap-6 rounded-3xl bg-[#1E2F35] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="font-sans text-lg text-white sm:text-xl">
            <span className="rounded bg-brand-red px-1 py-0.5">Мы берем эту боль на себя.</span>{" "}
            Комплексный апгрейд бизнеса: от системного анализа до полной автоматизации.
          </p>
          <button
            type="button"
            onClick={openLeaveRequest}
            className="group relative shrink-0 overflow-hidden whitespace-nowrap rounded-xl bg-white px-8 py-[18px] font-sans text-lg font-medium text-brand-red shadow-[0_0_0_rgba(255,5,10,0)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,5,10,0.25)]"
          >
            {/* Заливка тем же CTA-градиентом, что уже используется по всему сайту (не новый
                цвет) — слева направо на hover, плюс лёгкий подъём кнопки с тенью. */}
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              style={{ background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Обсудить проект</span>
          </button>
        </div>
      </div>
    </section>
  );
}
