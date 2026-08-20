"use client";

import Link from "next/link";
import Logo from "@/components/base/Logo";
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
      {/* Декоративные пятна на фоне. В Figma они сами по себе чёткие (opacity: 0.2 в SVG) —
          мягкое сияние даёт не blur() на фигурах, а отдельный слой с backdrop-blur поверх
          них (node 383:1024, 83.8px). Раньше здесь был blur-md прямо на картинках, из-за
          чего пятна выглядели чёткими кругами со слегка смазанным краем, а не размытым
          сиянием, как в макете. Ellipse 2206 в Figma продублирована дважды (383:1021 и
          383:1022) — оба экземпляра нужны, это не дубль-артефакт. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute -top-[53.83px] left-[217.65px] size-[138.541px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
          <img src="/images/decor/footer/ellipse-1.svg" alt="" className="size-full" />
        </div>
        <div className="absolute left-[829.23px] top-[89.71px] flex h-[210.866px] w-[325.922px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
          <img src="/images/decor/footer/ellipse-2.svg" alt="" className="h-[76px] w-[325.51px] -rotate-[25.97deg]" />
        </div>
        <div className="absolute left-[1195.66px] top-[294.63px] flex h-[104.109px] w-[106.745px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
          <img src="/images/decor/footer/ellipse-3.svg" alt="" className="h-[76px] w-[81.716px] -rotate-[25.97deg]" />
        </div>
        <div className="absolute left-[1058.19px] top-[262.36px] flex h-[104.109px] w-[106.745px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно, второй экземпляр той же фигуры */}
          <img src="/images/decor/footer/ellipse-3.svg" alt="" className="h-[76px] w-[81.716px] -rotate-[25.97deg]" />
        </div>
        <div className="absolute left-[30.41px] top-[159.17px] flex h-[117.322px] w-[157.355px] items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративное пятно */}
          <img src="/images/decor/footer/ellipse-4.svg" alt="" className="h-[56.384px] w-[147.866px] rotate-[26.97deg]" />
        </div>
        <div
          className="absolute -left-[24.61px] top-0 h-[467.922px] w-[1489.611px] backdrop-blur-[83.8px]"
          style={{ backgroundColor: "rgba(29,29,27,0.01)" }}
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

          <Logo imgClassName="h-[91.415px] w-auto" />
        </div>

        <div className="flex flex-col flex-wrap items-start gap-8 sm:flex-row sm:items-end sm:gap-10">
          <div className="flex flex-col items-start gap-2">
            <p className="font-body text-xl font-extrabold text-body-muted pb-2">г. Казань</p>
            <p className="font-body text-sm font-medium text-body-muted">ул. Габдуллы Тукая, 58, офис АКРЕЛИС</p>
            <a href="tel:+78432105991" className="font-body text-sm font-medium text-body-muted">
              +7 843 210-59-91
            </a>
            <a href="mailto:acrelis.ru@gmail.com" className="font-body text-sm font-medium text-body-muted">
              info@acrelis.ru
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

        <div className="h-4 border-b border-white/30" />

        <div className="flex flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm font-medium text-body-muted">© 2026 АКРЕЛИС</p>
          <div className="flex flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center sm:gap-9">
            <Link href="/privacy-policy" className="font-body text-sm font-medium text-body-muted">
              Политика обработки персональных данных
            </Link>
            <Link href="/data-consent" className="font-body text-sm font-medium text-body-muted">
              Согласие на обработку персональных данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
