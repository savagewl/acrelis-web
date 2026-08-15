"use client";

import { useModal } from "@/components/providers/ModalProvider";

// "Оставить заявку", "У меня есть проект" и кнопка-иконка соцсетей все ведут в один и тот
// же лид-модал — в проекте нет отдельных форм под разные CTA, только один openLeaveRequest.
export default function ContactCTA() {
  const { openLeaveRequest } = useModal();

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute hidden overflow-hidden lg:block"
        style={{ right: -148.8, top: 32.41, width: 482, height: 467, transform: "scaleY(-1)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный SVG с точной обрезкой/поворотом */}
        <img
          src="/images/decor/contact-swirl-right.svg"
          alt=""
          className="absolute max-w-none"
          style={{ left: -32.82, top: -16.32, width: 670.97, height: 690.518, transform: "rotate(5.22deg)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute hidden overflow-hidden lg:block"
        style={{ left: -168.37, top: 28.12, width: 449.513, height: 462.189, transform: "rotate(-3.14deg)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный SVG с точной обрезкой/поворотом */}
        <img
          src="/images/decor/contact-swirl-left.svg"
          alt=""
          className="absolute max-w-none"
          style={{ left: -53.23, top: -138.68, width: 617.605, height: 619.748, transform: "rotate(-11.07deg)" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col items-start gap-10 rounded-[44px] py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-[54px]">
        <h2 className="max-w-[700px] font-sans text-[40px] font-bold leading-[1.05] tracking-[-2px] text-[#1E2F35] sm:text-[52px] sm:tracking-[-3.39px] lg:whitespace-nowrap">
          Расскажите о Вашем проекте
        </h2>

        <div className="flex flex-col items-start gap-3">
          <a href="tel:+78432105991" className="font-sans text-2xl font-bold tracking-[-0.48px] text-brand-red">
            +7 843 210-59-91
          </a>

          {/* В Figma это подчёркнутые текстовые ссылки, не кнопки — сверено со свежим
              скриншотом самой Figma (сырой JSON здесь снова отдавал устаревший оверрайд
              с красным фоном-кнопкой). */}
          <button
            type="button"
            onClick={openLeaveRequest}
            className="font-sans text-2xl font-medium text-brand-red underline decoration-2 underline-offset-2 transition-opacity hover:opacity-80"
          >
            Оставить заявку
          </button>

          <button
            type="button"
            onClick={openLeaveRequest}
            className="font-sans text-2xl font-medium text-brand-red underline decoration-2 underline-offset-2 transition-opacity hover:opacity-80"
          >
            У меня есть проект
          </button>

          {/* TODO: реальные ссылки на соцсети — в Figma это просто стилизованные иконки
              без href, настоящих handle'ов проекту не передавали.
              Размеры иконок — точно по Figma: у Telegram/VK сам SVG-ассет уже 59.04px
              (почти во весь бокс 60px, items-start а не center), у Instagram — 36.213px
              по центру. Раньше все три были одинаково уменьшены до ~30/22px. */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Telegram"
              className="flex size-[60px] items-start justify-start overflow-hidden rounded-xl border-2 border-white"
              style={{ background: "linear-gradient(180deg, #969696 0%, #233237 100%)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- крошечная декоративная иконка */}
              <img src="/images/icons/telegram.svg" alt="" className="size-[59.04px]" />
            </a>
            <a
              href="#"
              aria-label="ВКонтакте"
              className="flex size-[60px] items-start justify-start overflow-hidden rounded-xl border-2 border-white"
              style={{ background: "linear-gradient(180deg, #969696 0%, #233237 100%)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- крошечная декоративная иконка */}
              <img src="/images/icons/vk.svg" alt="" className="size-[60px]" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex size-[60px] items-center justify-center rounded-xl border-2 border-white"
              style={{ background: "linear-gradient(180deg, #969696 0%, #233237 100%)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- крошечная декоративная иконка */}
              <img src="/images/icons/instagram.svg" alt="" className="size-[36.213px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
