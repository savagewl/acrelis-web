"use client";

import Logo from "@/components/base/Logo";
import HamburgerButton from "@/components/base/HamburgerButton";
import { useModal } from "@/components/providers/ModalProvider";

const PHONE_DISPLAY = "+7 843 210-59-91";
const PHONE_HREF = "tel:+78432105991";

// Шапка на тёмном фоне (Hero и модалки поверх Hero) — 1:1 по Figma (id=161:11427 header row).
export default function SiteHeader() {
  const { isMenuOpen, openMenu, closeMenu } = useModal();

  return (
    <div className="flex items-center justify-between px-6 py-3 sm:px-[90px]">
      <Logo />
      <div className="flex items-center gap-4 sm:gap-8">
        <a
          href={PHONE_HREF}
          className="hidden font-sans text-lg font-medium text-white sm:block sm:text-2xl"
        >
          {PHONE_DISPLAY}
        </a>
        <HamburgerButton
          isOpen={isMenuOpen}
          onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          color="#F3F7F6"
        />
      </div>
    </div>
  );
}
