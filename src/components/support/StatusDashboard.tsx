"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BARS_COUNT,
  STATUS_BANNER,
  STATUS_FOOTER_ACCENT,
  STATUS_FOOTER_PLAIN,
  STATUS_FOOTER_TAIL,
  STATUS_HEADING,
  STATUS_SERVICES,
  STATUS_SUBTITLE,
} from "@/data/support/status";

const BAR_STAGGER = 1.8 / BARS_COUNT;
const ROW_STAGGER = 0.15;

function UptimeBars({
  incidentBarIndex,
  rowIndex,
  started,
}: {
  incidentBarIndex: number | null;
  rowIndex: number;
  started: boolean;
}) {
  return (
    <div aria-hidden className="flex shrink-0 items-center gap-[2px] sm:gap-[3px]">
      {Array.from({ length: BARS_COUNT }).map((_, i) => {
        const isIncident = incidentBarIndex === i;
        return (
          <motion.div
            key={i}
            className={`h-[18px] w-[3px] shrink-0 rounded-[2px] sm:w-[4px] ${isIncident ? "bg-brand-red" : "bg-[rgba(255,5,10,0.41)]"}`}
            style={{ opacity: isIncident ? 0.9 : 0.8, transformOrigin: "bottom" }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={started ? { scaleY: 1, opacity: isIncident ? 0.9 : 0.8 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: rowIndex * ROW_STAGGER + i * BAR_STAGGER }}
          />
        );
      })}
    </div>
  );
}

// Figma id=352:3255 "Section_Status" (/support). Дашборд-карточка справа от заголовка —
// в макете полоски uptime статичны, но по ТЗ ("Да, поехали") добавлена анимация
// зажигания полосок слева направо (~1.8с на строку) с небольшим сдвигом между строками
// сверху вниз, запускается once при попадании карточки во вьюпорт.
export default function StatusDashboard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="max-w-[507px] font-sans text-4xl font-medium tracking-[-2px] text-[#1E2F35] sm:text-[56px]">
            {STATUS_HEADING}
          </h2>
          <p className="max-w-[480px] font-body text-lg leading-[1.4] text-body-muted sm:text-[22px]">
            {STATUS_SUBTITLE}
          </p>
        </div>

        <div className="flex w-full flex-col gap-12 lg:w-[646px] lg:shrink-0">
          <div
            ref={cardRef}
            className="flex w-full flex-col gap-4 rounded-[32px] border border-[#e5e7eb] bg-white p-6 shadow-[0px_16px_24px_rgba(30,47,53,0.04)] sm:p-10 lg:w-[646px]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-sans text-lg font-semibold text-[#1E2F35] sm:text-xl">Мониторинг</p>
              <div className="flex shrink-0 items-center gap-2 rounded-full bg-brand-red px-4 py-2.5">
                <span aria-hidden className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-40" />
                  <span className="relative inline-flex size-2 rounded-full bg-white" />
                </span>
                <p className="whitespace-nowrap font-sans text-sm font-semibold text-white">{STATUS_BANNER}</p>
              </div>
            </div>

            <div className="h-px w-full bg-[#e5e7eb]" />

            <div className="flex w-full flex-col gap-2">
              {STATUS_SERVICES.map((service, rowIndex) => (
                <div
                  key={service.name}
                  className={`flex w-full items-center justify-between py-2 ${
                    rowIndex < STATUS_SERVICES.length - 1 ? "border-b border-[#e5e7eb]" : ""
                  }`}
                >
                  <div className="flex w-[100px] shrink-0 flex-col gap-1 sm:w-[161px]">
                    <p className="font-sans text-sm font-medium text-[#1E2F35] sm:text-base">{service.name}</p>
                    <p className="font-body text-xs text-body-muted">{service.status}</p>
                  </div>

                  <UptimeBars incidentBarIndex={service.incidentBarIndex} rowIndex={rowIndex} started={inView} />

                  <div className="flex w-[70px] shrink-0 flex-col items-end gap-1 sm:w-[120px]">
                    <p className="font-sans text-sm font-medium text-[#1E2F35] sm:text-base">{service.uptime}</p>
                    <p className="whitespace-nowrap font-body text-[10px] text-body-muted sm:text-[11px]">
                      30 days average
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center font-body text-lg text-[#1E2F35]">
            {STATUS_FOOTER_PLAIN}
            <span className="font-semibold text-brand-red">{STATUS_FOOTER_ACCENT}</span>
            {STATUS_FOOTER_TAIL}
          </p>
        </div>
      </div>
    </section>
  );
}
