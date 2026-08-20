"use client";

import type { ReactNode } from "react";
import SiteHeader from "@/components/base/SiteHeader";
import { useModal } from "@/components/providers/ModalProvider";

const DEFAULT_SUBTITLE = "Более 5 лет разрабатываем пользовательские IT-решения для бизнесов";

interface ServiceHeroProps {
  /** Обычно строка; /about (Figma id=161:10860) красит слово "будущее" в brand-red,
   * поэтому принимает произвольный ReactNode. */
  title: ReactNode;
  subtitle?: string;
  /** /about (Figma id=161:10860): хлебные крошки вместо кнопки — "Главная / <текущая>". */
  breadcrumbCurrent?: string;
  /** /about не показывает кнопку "Заказать услугу" — только хлебные крошки. */
  showButton?: boolean;
}

// Общий hero для сервисных страниц — 1:1 совпадает на /automation (Figma id=318:59726) и
// /it-solutions (Figma id=342:1006): тот же фон (стек из 3 растровых слоёв клавиатуры с
// блендами hard-light/overlay/color + красно-розовый цветовой градиент сверху) и кнопка.
// Подзаголовок обычно тот же ("Более 5 лет..."), но на /support (Figma id=347:47) он
// другой — поэтому переопределяется пропом, а не хардкодится. /about (Figma id=161:10860)
// добавляет хлебные крошки и убирает кнопку — тоже пропы, фон/структура те же.
export default function ServiceHero({
  title,
  subtitle = DEFAULT_SUBTITLE,
  breadcrumbCurrent,
  showButton = true,
}: ServiceHeroProps) {
  const { openLeaveRequest } = useModal();

  return (
    <section className="relative overflow-hidden bg-black">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фоновый слой с блендом */}
        <img
          src="/images/shared/hero/hero-photo-base.png"
          alt=""
          className="absolute inset-0 size-full object-bottom object-cover opacity-40 mix-blend-hard-light"
        />
        <div className="absolute inset-0 bg-[rgba(150,150,150,0.75)] mix-blend-hard-light" />
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{ background: "linear-gradient(91.37deg, rgba(29,29,27,0.4) 8.14%, rgba(29,29,27,0) 88.61%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #191919 4.36%, rgba(17,24,26,0) 64.42%)" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фоновый слой, основное фото */}
        <img
          src="/images/shared/hero/hero-photo-1.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фоновый слой с блендом */}
        <img
          src="/images/shared/hero/hero-photo-2.png"
          alt=""
          className="absolute inset-0 size-full object-bottom object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(200.6deg, rgba(17,24,26,0) 38.63%, rgb(21,3,4) 79.37%)" }}
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: "linear-gradient(268.16deg, rgba(247,1,100,0.6) 4.47%, rgba(255,5,10,0) 59.55%)" }}
        />
      </div>

      <div className="relative z-10 flex h-[900px] flex-col">
        <SiteHeader />

        <div className="flex flex-1 flex-col justify-center gap-16 px-6 py-12 sm:px-[90px]">
          {breadcrumbCurrent && (
            <p className="font-body text-base text-body-muted">
              Главная / <span className="text-white">{breadcrumbCurrent}</span>
            </p>
          )}

          <div className="flex max-w-[1006px] flex-col gap-6">
            <h1 className="font-sans text-4xl font-black tracking-[-1px] text-white sm:text-[36px]">{title}</h1>
            <p className="max-w-[780px] font-body text-lg text-body-muted sm:text-xl">{subtitle}</p>
          </div>

          {showButton && (
            <div className="flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={openLeaveRequest}
                className="rounded-xl px-6 py-4 text-center font-sans text-base font-medium text-white"
                style={{ background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }}
              >
                Заказать услугу
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
