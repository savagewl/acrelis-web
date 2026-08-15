"use client";

import OptionPill from "@/components/home/calculator/OptionPill";
import { DESIGN_OPTIONS, type DesignOptionId } from "@/lib/calculator/pricing";

interface Props {
  value: DesignOptionId | null;
  onChange: (id: DesignOptionId) => void;
  showError: boolean;
}

export default function StepDesign({ value, onChange, showError }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-2xl font-medium text-[#1E2F35]">Дизайн*</h3>
      <div className="flex flex-wrap gap-4">
        {(Object.entries(DESIGN_OPTIONS) as [DesignOptionId, (typeof DESIGN_OPTIONS)[DesignOptionId]][]).map(
          ([id, item]) => (
            <OptionPill
              key={id}
              label={item.label}
              subtitle={`×${item.multiplier.toFixed(2)}`}
              selected={value === id}
              onClick={() => onChange(id)}
            />
          ),
        )}
      </div>
      {showError && !value && (
        <p className="font-body text-sm text-brand-red">Выберите вариант дизайна, чтобы продолжить</p>
      )}
    </div>
  );
}
