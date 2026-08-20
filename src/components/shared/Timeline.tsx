"use client";

import { useState } from "react";

// Общий компонент "Этапы работы" — одна и та же механика на /automation (Figma
// id=337:109) и /it-solutions (Figma id=342:1306): зигзаг из карточек, привязанных к
// пропорциональной шкале недель на линии (не равномерная grid-сетка — расстояния между
// точками разные, потому что сама шкала недель нелинейно растянута под конкретные шаги),
// пульсирующие точки, градиентная обводка карточки при hover. Разный контент/шкала на
// каждой странице передаются пропами, а не хардкодятся здесь.
export interface TimelineStep {
  number: string;
  title: string;
  description: string;
  weeks: string;
  icon: string;
  leftPercent: number;
  dotPercent: number;
  row: "top" | "bottom";
}

export interface TimelineWeekLabel {
  label: string;
  percent: number;
}

interface TimelineProps {
  heading: string;
  subtitle: string;
  steps: TimelineStep[];
  weekLabels: TimelineWeekLabel[];
}

const CARD_WIDTH = 280;
const ROW_GAP = 24;

function StepCard({ step, active, onHover }: { step: TimelineStep; active: boolean; onHover: (v: boolean) => void }) {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`w-full rounded-3xl p-[1.8px] transition-shadow duration-300 ${
        active ? "[animation:gradient-flow_2s_linear_infinite]" : ""
      }`}
      style={{
        width: CARD_WIDTH,
        ...(active
          ? { background: "linear-gradient(90deg, #F43367 0%, #FF050A 50%, #F43367 100%)", backgroundSize: "200% 100%" }
          : undefined),
      }}
    >
      <div
        className={`flex h-full flex-col gap-5 rounded-[22px] bg-white p-7 shadow-[0_0_38px_rgba(150,150,150,0.15)] transition-transform duration-300 ${
          active ? "-translate-y-1" : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          <p className="font-body text-sm font-medium tracking-[-0.6px] text-brand-accent">{step.number}</p>
          <p className="font-sans text-xl font-medium text-[#1E2F35]">{step.title}</p>
          <p className="font-body text-sm text-[#1E2F35]">{step.description}</p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-xl bg-[rgba(150,150,150,0.2)] px-3 py-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- иконка этапа из Figma */}
          <img src={step.icon} alt="" className="size-[18px]" />
          <p className="font-body text-sm font-medium tracking-[-0.6px] text-[#1E2F35]">{step.weeks}</p>
        </div>
      </div>
    </div>
  );
}

export default function Timeline({ heading, subtitle, steps, weekLabels }: TimelineProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex max-w-[1260px] flex-col gap-14 sm:gap-[72px]">
        <div className="flex flex-col gap-3 rounded-[44px] border border-black/5 p-6 sm:p-10">
          <h2 className="font-sans text-4xl font-medium tracking-[-2px] text-[#1E2F35] sm:text-[56px]">{heading}</h2>
          <p className="max-w-[520px] font-body text-lg text-body-muted sm:text-2xl">{subtitle}</p>
        </div>

        {/* Мобильный / планшетный вид — простой вертикальный список, без пропорциональной
            шкалы (ей просто негде развернуться на узком экране). */}
        <div className="flex flex-col gap-6 sm:hidden">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} active={hovered === i} onHover={(v) => setHovered(v ? i : null)} />
          ))}
        </div>

        {/* Десктоп — карточки и точки расставлены по проценту от ширины (см. дока к
            TimelineStep), а не по равным grid-колонкам. */}
        <div className="relative hidden sm:block" style={{ height: 230 + ROW_GAP + 24 + ROW_GAP + 230 }}>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="absolute"
              style={{
                left: `${step.leftPercent}%`,
                top: step.row === "top" ? 0 : 230 + ROW_GAP + 24 + ROW_GAP,
              }}
            >
              <StepCard step={step} active={hovered === i} onHover={(v) => setHovered(v ? i : null)} />
            </div>
          ))}

          {/* Соединительные "ножки" от карточек к точке на линии */}
          {steps.map((step, i) => (
            <div
              key={`stem-${step.title}`}
              aria-hidden
              className={`absolute w-px bg-[rgba(150,150,150,0.35)] ${hovered === i ? "bg-brand-red" : ""}`}
              style={{
                left: `${step.dotPercent}%`,
                top: step.row === "top" ? 230 : 230 + ROW_GAP + 24 - ROW_GAP,
                height: ROW_GAP,
              }}
            />
          ))}

          {/* Линия шкалы */}
          <div
            aria-hidden
            className="absolute left-0 right-0 h-px bg-[rgba(150,150,150,0.35)]"
            style={{ top: 230 + ROW_GAP + 12 }}
          />

          {/* Точки-коннекторы карточек */}
          {steps.map((step, i) => (
            <span
              key={`dot-${step.title}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${step.dotPercent}%`, top: 230 + ROW_GAP + 12 }}
            >
              <span className="relative flex size-3 items-center justify-center">
                {hovered === i && (
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red/60" />
                )}
                <span
                  className={`relative size-2.5 rounded-full border-2 border-white shadow transition-colors duration-300 ${
                    hovered === i ? "bg-brand-red" : "bg-[#1E2F35]"
                  }`}
                />
              </span>
            </span>
          ))}

          {/* Акцентные точки-"бублики" по краям всей шкалы (декоративные, без карточки) */}
          {[0, 100].map((p) => (
            <span
              key={`edge-${p}`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p}%`, top: 230 + ROW_GAP + 12 }}
            >
              <span className="relative flex size-4 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red/50" />
                <span className="relative size-2.5 rounded-full border-2 border-white bg-brand-red" />
              </span>
            </span>
          ))}

          {/* Подписи недель */}
          {weekLabels.map((mark) => (
            <span
              key={mark.label}
              className="absolute whitespace-nowrap font-body text-sm font-medium text-[#1E2F35]"
              style={{
                left: `${mark.percent}%`,
                top: 230 + ROW_GAP + 12 + 20,
                transform: mark.percent === 0 ? "translateX(0)" : mark.percent === 100 ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {mark.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
