"use client";

import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";

// Figma id=264:14274 (текстовая колонка) + 265:14867 (карта) + 265:14847 (иконки соцсетей).
//
// Карта в Figma — не отдельная картинка рядом с текстом, а полноразмерный фон на весь ряд
// (1260×562), а текст лежит НАД ним слева (перекрывая пустую от точек область океана) —
// поэтому не флекс из двух колонок, а абсолютное позиционирование поверх общего холста.
//
// public/images/contacts/map.png — экспорт узла 265:14867 из Figma с defaultScale:4
// (реальные 5624×3743, не апскейл). Рендерим его обычным <img>, а не next/image: сервер
// next/image ужимает картинку под конкретный брейкпоинт и переж имает в webp/avif —
// на частом узоре из мелких точек это почти всегда даёт муар/лесенку при любом исходном
// разрешении. Пробовал отрисовать карту как два оригинальных SVG-слоя точек прямо из
// Figma (векторы, ресайз в принципе не нужен) — экспорт оказался ~14 тыс. отдельных
// <path> на слой, браузер завис на несколько секунд просто пытаясь их отрисовать
// (не говоря уже об анимации маркера поверх), так что для веба это не вариант; берём
// компромисс — растр, но по возможности без серверного пережатия.
// Слой размером 1405.828×935.700 сдвинут на (-72.914,-178.762) и обрезается рамкой
// 1260×562, поэтому картинку нужно так же увеличить и сдвинуть внутри overflow-hidden
// рамки — иначе видна вся картинка целиком (с пустыми полями сверху/снизу), и карта
// выглядит мелкой. Цифры ниже — те же самые проценты от размеров рамки:
//   width  = 1405.828/1260 = 111.574%   left = -72.914/1260 = -5.787%
//   height = 935.700/562   = 166.548%   top  = -178.762/562 = -31.809%
// Маркер — координаты (60.05%, 32.37%) относительно САМОЙ картинки (не рамки), посчитаны
// по пикселям экспорта: там у Казани красная точка. Иконки соцсетей — по просьбе
// пользователя НЕ красный вариант из этого узла Figma, а тот же тёмный стиль, что уже в
// ContactCTA — не трогать.
const MAP_LEFT = "-5.787%";
const MAP_TOP = "-31.809%";
const MAP_WIDTH = "111.574%";
const MAP_HEIGHT = "166.548%";
const MARKER_LEFT = "60.05%";
const MARKER_TOP = "32.37%";

const SOCIAL_LINKS = [
  { href: "#", label: "Telegram", icon: "/images/icons/telegram.svg", iconClassName: "size-[59.04px]" },
  { href: "#", label: "ВКонтакте", icon: "/images/icons/vk.svg", iconClassName: "size-[60px]" },
  { href: "#", label: "Instagram", icon: "/images/icons/instagram.svg", iconClassName: "size-[36.213px]" },
  { href: "#", label: "TikTok", icon: "/images/icons/tiktok.svg", iconClassName: "size-[36.254px]" },
];

function MapCanvas({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute" style={{ left: MAP_LEFT, top: MAP_TOP, width: MAP_WIDTH, height: MAP_HEIGHT }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- намеренно без next/image, см. комментарий выше про муар от серверного ресайза */}
      <img src="/images/contacts/map.png" alt="" className="absolute inset-0 size-full object-fill" />
      <span
        aria-hidden
        className="absolute flex size-3 -translate-x-1/2 -translate-y-1/2"
        style={{ left: MARKER_LEFT, top: MARKER_TOP }}
      >
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-brand-red" />
      </span>
      {children}
    </div>
  );
}

function OfficeInfo() {
  const { openLeaveRequest } = useModal();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex w-[260px] flex-col gap-[7px]">
          <h1 className="font-sans text-[27px] font-medium leading-tight text-[#1E2F35]">Казань</h1>
          <p className="whitespace-nowrap font-body text-[15px] leading-[15px] text-body-muted">
            ул. Габдуллы Тукая, 58, офис 208
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-[rgba(255,5,10,0.05)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
            <img src="/images/contacts/clock.svg" alt="" className="size-5" />
          </span>
          <p className="whitespace-nowrap font-sans text-base text-[#1E2F35]">Пн–Пт, 9:00–18:00</p>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          type="button"
          onClick={openLeaveRequest}
          className="flex items-center gap-2 border-t border-[rgba(150,150,150,0.2)] py-4 font-sans text-base text-brand-red"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
          <img src="/images/contacts/send.svg" alt="" className="size-[23px]" />
          Отправить заявку
        </button>
        <a
          href="tel:+78432105991"
          className="flex items-center gap-2 border-t border-[rgba(150,150,150,0.2)] py-4 font-sans text-base text-[#1E2F35]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- переиспользуемая иконка поля */}
          <img src="/images/about/decor/field-call.svg" alt="" className="size-[23px]" />
          +7 843 210-59-91
        </a>
        <a
          href="mailto:acrelis.ru@gmail.com"
          className="flex items-center gap-2 border-t border-[rgba(150,150,150,0.2)] py-4 font-sans text-base text-[#1E2F35]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- переиспользуемая иконка поля */}
          <img src="/images/about/decor/field-email.svg" alt="" className="size-[23px]" />
          info@acrelis.ru
        </a>
        <Link
          href="/about"
          className="flex items-center gap-2 border-t border-[rgba(150,150,150,0.2)] py-4 font-sans text-base text-[#1E2F35]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- переиспользуемая иконка поля */}
          <img src="/images/about/decor/field-team.svg" alt="" className="size-[23px]" />
          Присоединиться к команде
        </Link>
      </div>
    </>
  );
}

function SocialRow() {
  return (
    <div className="flex items-center gap-3">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-white"
          style={{ background: "linear-gradient(180deg, #969696 0%, #233237 100%)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- декоративная иконка соцсети */}
          <img src={social.icon} alt="" className={social.iconClassName} />
        </a>
      ))}
    </div>
  );
}

export default function ContactsInfo() {
  return (
    <section className="bg-white px-6 py-12 sm:px-[90px] sm:py-[94px]">
      {/* Desktop/tablet: карта — фон на весь ряд, текст и соцсети лежат поверх неё абсолютно
          (как в Figma). Мобильный: карта не помещается как фон под текст — раскладка
          построчная, карта своим блоком снизу. */}
      <div className="hidden w-full max-w-[1260px] lg:relative lg:mx-auto lg:block lg:overflow-hidden lg:rounded-3xl" style={{ aspectRatio: "1260 / 562" }}>
        <MapCanvas />
        <div className="absolute left-1 top-0 flex h-full w-full max-w-[260px] flex-col justify-between gap-8">
          <OfficeInfo />
        </div>
        <div className="absolute bottom-6 right-6">
          <SocialRow />
        </div>
      </div>

      <div className="flex w-full max-w-[1260px] flex-col gap-10 lg:hidden">
        <div className="flex w-full max-w-[420px] flex-col justify-between gap-8">
          <OfficeInfo />
        </div>
        <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: "1260 / 562" }}>
          <MapCanvas />
        </div>
        <SocialRow />
      </div>
    </section>
  );
}
