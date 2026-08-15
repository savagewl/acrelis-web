"use client";

import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  /** Цвет линий/крестика — по умолчанию красный акцент из Figma (#F82245) */
  color?: string;
}

// Точные данные из Figma: hero 161:11427, "Group 2087325762".
// Группа 53.9961 x 28.4209, strokeWeight 4 у всех трёх линий.
// Верх: width 68.3064%, прижата вправо (right edge = 100%), y = 0%.
// Низ:  width 68.3064%, прижата вправо (right edge = 100%), y = 100%.
// Средняя: width 78.8468%, прижата влево (left edge = 0%), y = 50%.
const TOP_BOTTOM_WIDTH = "68.3064%";
const MIDDLE_WIDTH = "78.8468%";
const STROKE = 4; // px, strokeWeight из Figma

export default function HamburgerButton({
  isOpen,
  onClick,
  className = "",
  color = "#F82245",
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
      className={`flex h-[58px] w-[58px] items-center justify-center rounded-full ${className}`}
    >
      {/* Бокс 1:1 с пропорциями группы в Figma (53.9961 x 28.4209 ≈ 1.9:1) */}
      <span className="relative block h-[28.42px] w-[54px]">
        <motion.span
          className="absolute right-0 top-0 rounded-full"
          style={{ backgroundColor: color, height: STROKE }}
          animate={
            isOpen
              ? { width: "100%", rotate: 45, y: STROKE * 3.5 }
              : { width: TOP_BOTTOM_WIDTH, rotate: 0, y: 0 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color, height: STROKE, width: MIDDLE_WIDTH }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="absolute bottom-0 right-0 rounded-full"
          style={{ backgroundColor: color, height: STROKE }}
          animate={
            isOpen
              ? { width: "100%", rotate: -45, y: -STROKE * 3.5 }
              : { width: TOP_BOTTOM_WIDTH, rotate: 0, y: 0 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
        />
      </span>
    </button>
  );
}
