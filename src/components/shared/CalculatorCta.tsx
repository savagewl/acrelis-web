"use client";

import { useModal } from "@/components/providers/ModalProvider";

// Общий CTA-блок с калькулятором — 1:1 совпадает по контенту на /automation и
// /it-solutions, поэтому вынесен в общий компонент, а не задублирован. Иллюстрация
// графика — SVG, а не растровый скриншот: на retina растровый вариант давал заметную
// пикселизацию. Сам SVG уже содержит и линии сетки, и диагональную линию, и точки —
// отдельная CSS-маска не нужна.
export default function CalculatorCta() {
  const { openLeaveRequest } = useModal();

  return (
    <section className="bg-[#1D1D1B] px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="flex w-full max-w-[520px] flex-col gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-[32px] font-semibold tracking-[-1px] text-white sm:whitespace-nowrap sm:text-[40px]">
              Рассчитаем выгодно для вас
            </h2>
            <p className="font-body text-lg text-body-muted">
              Расскажите о задаче — предложим подходящее решение и подготовим предварительный расчёт.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={openLeaveRequest}
              className="w-fit rounded-xl px-[30px] py-4 font-sans text-base font-medium text-white"
              style={{ background: "linear-gradient(90deg, #F43367 3.56%, #FF050A 100%)" }}
            >
              Получить расчёт
            </button>
            <p className="font-body text-sm text-[#A6A6A6]">Ответим и уточним детали проекта в течение рабочего дня.</p>
          </div>
        </div>

        <div className="relative hidden h-[281px] w-[517px] shrink-0 overflow-hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративный векторный график из Figma */}
          <img
            src="/images/shared/calc-chart.svg"
            alt=""
            className="absolute left-[19px] top-[-118px] w-[479px] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
