"use client";

import Logo from "@/components/base/Logo";
import HamburgerButton from "@/components/base/HamburgerButton";
import { useModal } from "@/components/providers/ModalProvider";

const PHONE_DISPLAY = "+7 843 210-59-91";
const PHONE_HREF = "tel:+78432105991";

// Шапка на тёмном фоне (Hero и модалки поверх Hero) — 1:1 по Figma (id=161:11427 header row).
// На страницах без тёмного Hero (/blog, /blog/[slug]) используется variant="light" —
// 1:1 по Figma (id=145:8581): телефон серый (#969696) вместо белого, гамбургер — тот же
// красный акцент (#F82245), что и в тёмном варианте, лого не меняется (само по себе цветное).
export default function SiteHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { isMenuOpen, openMenu, closeMenu } = useModal();

  return (
    <div className="flex items-center justify-between px-6 py-3 sm:px-[90px]">
      <Logo priority />
      <div className="flex items-center gap-4 sm:gap-8">
        <a
          href={PHONE_HREF}
          className={`hidden font-sans text-lg font-medium sm:block sm:text-2xl ${
            variant === "light" ? "text-[#969696]" : "text-white"
          }`}
        >
          {PHONE_DISPLAY}
        </a>
        <HamburgerButton
          isOpen={isMenuOpen}
          onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          color={variant === "light" ? undefined : "#F3F7F6"}
        />
      </div>
    </div>
  );
}
