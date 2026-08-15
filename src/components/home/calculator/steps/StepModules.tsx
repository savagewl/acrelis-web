"use client";

import { useState } from "react";
import OptionPill from "@/components/home/calculator/OptionPill";
import { MODULES, type ModuleId } from "@/lib/calculator/pricing";

interface Props {
  value: ModuleId[];
  onToggle: (id: ModuleId) => void;
}

const VISIBLE_COUNT = 6;

// ТЗ: "Часть пунктов скрыта под кнопкой «Показать ещё»".
export default function StepModules({ value, onToggle }: Props) {
  const [expanded, setExpanded] = useState(false);
  const entries = Object.entries(MODULES) as [ModuleId, (typeof MODULES)[ModuleId]][];
  const visible = expanded ? entries : entries.slice(0, VISIBLE_COUNT);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-2xl font-medium text-[#1E2F35]">Функциональные модули</h3>
      <div className="flex flex-wrap gap-4">
        {visible.map(([id, item]) => (
          <OptionPill
            key={id}
            variant="checkbox"
            label={item.label}
            subtitle={`+${item.price.toLocaleString("ru-RU")} ₽`}
            selected={value.includes(id)}
            onClick={() => onToggle(id)}
          />
        ))}
      </div>
      {!expanded && entries.length > VISIBLE_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-fit font-sans text-base font-medium text-brand-red underline"
        >
          Показать ещё
        </button>
      )}
    </div>
  );
}
