"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/base/Logo";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import CloseIcon from "@/components/ui/CloseIcon";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_DISPLAY = "+7 843 210-59-91";
const PHONE_HREF = "tel:+78432105991";

const NAV_COLUMN_1 = [
  { label: "Услуги", href: "/#services" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "О компании", href: "/about" },
];

const NAV_COLUMN_2 = [
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
  { label: "Свяжитесь с нами", href: "/contacts", accent: true },
];

// Полноэкранное меню — светлая тема, по Figma id=180:592 (desktop) / 383:134 (mobile).
export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white"
        >
          <div className="flex items-center justify-between px-6 py-3 sm:px-[90px]">
            <Logo />
            <div className="flex items-center gap-4 sm:gap-8">
              <a
                href={PHONE_HREF}
                className="hidden font-sans text-lg font-medium text-body-muted sm:block sm:text-2xl"
              >
                {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть меню"
                className="flex h-[58px] w-[58px] items-center justify-center text-brand-accent"
              >
                <CloseIcon className="h-9 w-9" />
              </button>
            </div>
          </div>

          <nav className="mt-auto flex flex-col gap-10 px-6 py-16 sm:flex-row sm:justify-start sm:gap-[242px] sm:px-[90px] sm:pt-24 sm:pb-40">
            <ul className="flex flex-col gap-4">
              {NAV_COLUMN_1.map((item) => (
                <li key={item.label} className="border-b border-[#1E2F35]/10 pb-4">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between gap-14 font-sans text-3xl text-[#1E2F35] transition-opacity hover:opacity-70 sm:text-[36px]"
                  >
                    {item.label}
                    <ArrowUpRightIcon className="h-6 w-6" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4">
              {NAV_COLUMN_2.map((item) => (
                <li key={item.label} className="border-b border-[#1E2F35]/10 pb-4">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between gap-14 font-sans text-3xl transition-opacity hover:opacity-70 sm:text-[36px] ${
                      item.accent ? "text-brand-red" : "text-[#1E2F35]"
                    }`}
                  >
                    {item.label}
                    <ArrowUpRightIcon className="h-6 w-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={PHONE_HREF}
            className="block px-6 pb-10 font-sans text-xl font-medium text-body-muted sm:hidden"
          >
            {PHONE_DISPLAY}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
