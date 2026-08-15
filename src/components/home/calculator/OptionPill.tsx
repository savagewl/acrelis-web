"use client";

import CheckIcon from "@/components/ui/CheckIcon";

interface OptionPillProps {
  label: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
  /** radio (single-select, Шаги 1/2/5) или checkbox (multi-select, Шаги 3/4) */
  variant?: "radio" | "checkbox";
}

// Точный стиль пилюли из Figma (task-selector/719:124, "Frame 4" внутри карточек типа проекта):
// выбрана — градиент #F43367->#FF050A, radius 12, обводка rgba(0,0,0,.7); не выбрана — белый
// фон, обводка rgba(150,150,150,.2). Цена/подпись — серый Inter 16px под пилюлей.
export default function OptionPill({
  label,
  subtitle,
  selected,
  onClick,
  variant = "radio",
}: OptionPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start gap-2"
    >
      <span
        className={`flex items-center gap-2 rounded-xl border px-4 py-3.5 font-body text-base transition-colors ${
          selected
            ? "border-brand-red/40 text-white"
            : "border-input-border bg-white text-[#1E2F35]"
        }`}
        style={
          selected
            ? { background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }
            : undefined
        }
      >
        <span
          className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border ${
            variant === "radio" ? "" : "rounded-[5px]"
          } ${selected ? "border-white" : "border-[#969696]"}`}
        >
          {selected &&
            (variant === "radio" ? (
              <span className="h-[10px] w-[10px] rounded-full bg-white" />
            ) : (
              <CheckIcon className="h-3 w-3 text-white" />
            ))}
        </span>
        {label}
      </span>
      {subtitle && <span className="pl-1 font-body text-base text-body-muted">{subtitle}</span>}
    </button>
  );
}
