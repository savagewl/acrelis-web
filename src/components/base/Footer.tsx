"use client";

import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";

const NAV_LINKS = [
  { label: "Услуги", href: "/#services" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "О компании", href: "/about" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

export default function Footer() {
  const { openLeaveRequest } = useModal();

  return (
    <footer className="relative w-full overflow-hidden bg-[#1D1D1B] px-6 py-8 sm:px-[90px]">
      {/* Декоративные размытые пятна на фоне — SVG уже несёт свою непрозрачность 20%
          (см. сами файлы), поэтому здесь без дополнительного opacity-множителя — раньше
          это (opacity-40 обёртки × 0.2 внутри SVG × blur-2xl) гасило пятна почти до полной
          невидимости, хотя в самой Figma они хорошо заметны. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden blur-md lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
        <img src="/images/decor/footer/ellipse-1.svg" alt="" className="absolute left-[217px] -top-[54px] w-[139px]" />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
        <img
          src="/images/decor/footer/ellipse-2.svg"
          alt=""
          className="absolute left-[829px] top-[90px] w-[326px] -rotate-[26deg]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
        <img
          src="/images/decor/footer/ellipse-3.svg"
          alt=""
          className="absolute left-[1196px] top-[295px] w-[107px] -rotate-[26deg]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
        <img
          src="/images/decor/footer/ellipse-4.svg"
          alt=""
          className="absolute left-[30px] top-[159px] w-[157px] rotate-[27deg]"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <ul className="flex flex-wrap items-center gap-6 lg:gap-10">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="font-sans text-xl font-semibold text-white sm:text-2xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/" className="relative inline-flex items-center gap-3" aria-label="ACRELIS — на главную">
            {/* eslint-disable-next-line @next/next/no-img-element -- точная векторная иконка из Figma */}
            <img src="/images/icons/logo-icon-white.svg" alt="" className="h-[52px] w-[52px]" />
            <span className="flex flex-col leading-none">
              <span className="font-sans text-[32px] font-semibold text-brand-accent">акрелис</span>
              <span className="self-end font-sans text-[13px] text-white">ИТ-решения</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-col flex-wrap items-start gap-8 sm:flex-row sm:gap-10">
          <div className="flex flex-col items-start gap-2">
            <p className="font-body text-xl font-extrabold text-body-muted">г. Казань</p>
            <p className="font-body text-sm font-medium text-body-muted">ул. Габдуллы Тукая, 58, офис АКРЕЛИС</p>
            <a href="tel:+78432105991" className="font-body text-sm font-medium text-body-muted">
              +7 843 210-59-91
            </a>
            <a href="mailto:acrelis.ru@gmail.com" className="font-body text-sm font-medium text-body-muted">
              acrelis.ru@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="font-body text-sm font-medium text-body-muted">ООО «Акрелис»</p>
            <p className="font-body text-sm font-medium text-body-muted">ИНН: 1655513799</p>
            <p className="font-body text-sm font-medium leading-[18px] text-body-muted">
              Основной ОКВЭД: 62.02 Деятельность консультативная
              <br />и работы в области компьютерных технологий
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openLeaveRequest}
          className="w-fit rounded-xl px-[30px] py-4 font-sans text-base font-medium text-white"
          style={{ background: "linear-gradient(90deg, #F43367 3.56%, #FF050A 100%)" }}
        >
          Заказать звонок
        </button>

        <div className="border-t border-white/30" />

        <div className="flex flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center sm:gap-9">
          <p className="font-body text-sm font-medium text-body-muted">© 2026 АКРЕЛИС</p>
          <Link href="/privacy-policy" className="font-body text-sm font-medium text-body-muted">
            Политика обработки персональных данных
          </Link>
          <Link href="/data-consent" className="font-body text-sm font-medium text-body-muted">
            Согласие на обработку персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
}
