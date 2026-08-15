"use client";

import OptionPill from "@/components/home/calculator/OptionPill";
import { PROJECT_TYPES, type ProjectTypeId } from "@/lib/calculator/pricing";

interface Props {
  value: ProjectTypeId | null;
  onChange: (id: ProjectTypeId) => void;
  showError: boolean;
}

export default function StepProjectType({ value, onChange, showError }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-2xl font-medium text-[#1E2F35]">Тип проекта:</h3>
      <div className="flex flex-wrap gap-4">
        {(Object.entries(PROJECT_TYPES) as [ProjectTypeId, (typeof PROJECT_TYPES)[ProjectTypeId]][]).map(
          ([id, item]) => (
            <OptionPill
              key={id}
              label={item.label}
              subtitle={item.basePrice !== null ? `${item.basePrice.toLocaleString("ru-RU")} ₽` : "*индивидуально"}
              selected={value === id}
              onClick={() => onChange(id)}
            />
          ),
        )}
      </div>
      {showError && !value && (
        <p className="font-body text-sm text-brand-red">Выберите тип проекта, чтобы продолжить</p>
      )}
    </div>
  );
}
