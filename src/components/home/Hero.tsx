"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SiteHeader from "@/components/base/SiteHeader";
import { useModal } from "@/components/providers/ModalProvider";

// Первый экран главной — Figma id=161:11427.
// Фон — видео (см. public/videos/home/hero.mp4|webm), сгенерировано из hero-poster.jpg
// (первый кадр видео). Без loop — доигрывает один раз и замирает на последнем кадре;
// заново запускается только при полной перезагрузке страницы (пересоздание <video>).
// Уважаем prefers-reduced-motion — тогда просто статичный постер без автовоспроизведения.
export default function Hero() {
  const { openLeaveRequest } = useModal();
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        {reducedMotion ? (
          <Image
            src="/images/home/hero-poster.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            playsInline
            poster="/images/home/hero-poster.jpg"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/home/hero.webm" type="video/webm" />
            <source src="/videos/home/hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div className="relative z-10 flex h-[900px] flex-col">
        <SiteHeader />

        <div className="flex flex-1 flex-col justify-center gap-16 px-6 py-12 sm:px-[90px]">
          <div className="flex max-w-[1006px] flex-col gap-6">
            <h1 className="font-sans text-4xl font-black leading-tight text-white sm:text-[36px]">
              Создаём сайты и автоматизируем
              <br />
              бизнес-процессы
            </h1>
            <p className="max-w-[780px] font-body text-lg text-body-muted sm:text-xl">
              Не просто создание сайты — разрабатываем цифровые системы
            </p>
          </div>

          <div className="flex flex-wrap gap-3.5">
            <a
              href="#calculator"
              className="rounded-xl px-6 py-4 text-center font-sans text-base font-medium text-white"
              style={{
                background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)",
              }}
            >
              Калькулятор стоимости
            </a>
            <button
              type="button"
              onClick={openLeaveRequest}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4 font-sans text-base font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
