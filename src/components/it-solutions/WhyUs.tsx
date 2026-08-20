"use client";

import { useModal } from "@/components/providers/ModalProvider";
import { CTA_BAR_BUTTON, CTA_BAR_TEXT_ACCENT, CTA_BAR_TEXT_PLAIN, PROOF_ROWS, TESTIMONIAL, WHY_US_HEADING } from "@/data/it-solutions/why-us";

// Figma id=342:2727 "Why-Us". Декоративные вихри в красной карточке — тот же приём, что
// в карточке "С автоматизацией" на /automation (BeforeAfter), но свой набор ассетов
// (whyus-swirl-1/2, whyus-vector-35/36) — сверены и совпадают с тем макетом визуально,
// но это отдельные экспорты именно этого узла в Figma, не переиспользование файлов.
export default function WhyUs() {
  const { openLeaveRequest } = useModal();

  return (
    <section className="flex flex-col gap-12 bg-white px-6 py-16 sm:gap-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto w-full max-w-[1260px]">
        <h2 className="font-sans text-4xl font-medium text-[#1E2F35] sm:text-[56px]">{WHY_US_HEADING}</h2>
      </div>

      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-10 lg:flex-row lg:gap-20">
        <div className="relative h-[380px] w-full shrink-0 overflow-hidden rounded-[32px] border-[3.8px] border-white/[0.38] bg-[#AF0609] p-6 sm:p-9 lg:w-[597px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
            {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
            <img
              src="/images/it-solutions/decor/whyus-swirl-1.svg"
              alt=""
              className="absolute -left-[10%] top-[30%] w-[220%] max-w-none -rotate-[5deg]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
            <img
              src="/images/it-solutions/decor/whyus-swirl-2.svg"
              alt=""
              className="absolute -left-[80%] -top-[95%] w-[160%] max-w-none -rotate-[5deg]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
            <img
              src="/images/it-solutions/decor/whyus-vector-35.svg"
              alt=""
              className="absolute bottom-[-15%] left-[55%] w-[95%] max-w-none rotate-[7deg]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- декоративный вихрь из Figma */}
            <img
              src="/images/it-solutions/decor/whyus-vector-36.svg"
              alt=""
              className="absolute -left-[15%] -top-[55%] w-[210%] max-w-none rotate-[139deg]"
            />
          </div>

          <div className="relative flex h-full flex-col justify-between">
            {/* На красном фоне карточки логотип целиком белый (и иконка, и текст) — в
                отличие от футера, где "акрелис" красится в brand-accent: сверено с design
                context узла (342:2727), там оба текстовых слоя явно text-white, а сам
                значок-иконка — отдельный экспорт именно с белой заливкой (stroke="white"
                в самом SVG), не переиспользование общего /images/icons/logo-icon-white.svg
                (тот, несмотря на название, на самом деле розовый — проверено содержимым
                файла). Общий растровый /images/brand/logo.png тоже не подходит — цвет
                текста в нём запечён розовым и на красном фоне теряется. */}
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma, здесь она действительно белая */}
              <img src="/images/it-solutions/decor/logo-icon-white.svg" alt="" className="h-[38px] w-[38px]" />
              <span className="flex flex-col leading-none text-white">
                <span className="font-sans text-2xl font-semibold">акрелис</span>
                <span className="self-end font-sans text-[10px]">ИТ-решения</span>
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-body text-xl text-white">
                {TESTIMONIAL.quoteBeforeNumber}
                <span className="font-sans font-semibold">{TESTIMONIAL.number}</span>
                {TESTIMONIAL.quoteAfterNumber}
              </p>
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- фото автора отзыва из Figma */}
                <img
                  src="/images/it-solutions/decor/testimonial-avatar.png"
                  alt=""
                  className="size-[45px] rounded-full object-cover"
                />
                <p className="font-sans text-base font-semibold text-[#A5A5A5]">{TESTIMONIAL.author}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-10 sm:gap-12">
          {PROOF_ROWS.map((row) => (
            <div key={row.title} className={row.indentClass}>
              <p className="font-sans text-xl font-semibold text-[#1E2F35] sm:text-[22px]">{row.title}</p>
              <p className="font-body text-base text-body-muted">{row.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1260px] flex-col items-start gap-6 rounded-3xl border border-black/5 bg-[#F9FAFB] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="font-sans text-xl text-[#1E2F35] sm:text-2xl">
          {CTA_BAR_TEXT_PLAIN}
          <span className="text-brand-red">{CTA_BAR_TEXT_ACCENT}</span>
        </p>
        <button
          type="button"
          onClick={openLeaveRequest}
          className="w-fit shrink-0 rounded-xl bg-[#1E2F35] px-8 py-[18px] font-sans text-lg font-medium text-white"
        >
          {CTA_BAR_BUTTON}
        </button>
      </div>
    </section>
  );
}
