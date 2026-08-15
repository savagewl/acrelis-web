"use client";

import OptionPill from "@/components/home/calculator/OptionPill";
import { TIMELINES, type TimelineId } from "@/lib/calculator/pricing";

interface Props {
  value: TimelineId | null;
  onChange: (id: TimelineId) => void;
  showError: boolean;
}

export default function StepTimeline({ value, onChange, showError }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-sans text-2xl font-medium text-[#1E2F35]">Сроки запуска*</h3>
      <div className="flex flex-wrap gap-4">
        {(Object.entries(TIMELINES) as [TimelineId, (typeof TIMELINES)[TimelineId]][]).map(([id, item]) => (
          <OptionPill
            key={id}
            label={item.label}
            subtitle={`×${item.multiplier.toFixed(2)}`}
            selected={value === id}
            onClick={() => onChange(id)}
          />
        ))}
      </div>
      {showError && !value && (
        <p className="font-body text-sm text-brand-red">Выберите срок запуска, чтобы завершить расчёт</p>
      )}
    </div>
  );
}
