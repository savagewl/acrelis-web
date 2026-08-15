"use client";

import OptionPill from "@/components/home/calculator/OptionPill";
import { INTEGRATIONS, type IntegrationId } from "@/lib/calculator/pricing";

interface Props {
  value: IntegrationId[];
  onToggle: (id: IntegrationId) => void;
}

const CATEGORIES = ["Платежи", "CRM", "Прочее"] as const;

// ТЗ: "Чекбоксы с группировкой по категориям (Платежи / CRM / Прочее)".
export default function StepIntegrations({ value, onToggle }: Props) {
  const entries = Object.entries(INTEGRATIONS) as [IntegrationId, (typeof INTEGRATIONS)[IntegrationId]][];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-sans text-2xl font-medium text-[#1E2F35]">Интеграции</h3>
      {CATEGORIES.map((category) => {
        const items = entries.filter(([, item]) => item.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category} className="flex flex-col gap-3">
            <p className="font-body text-sm uppercase text-body-muted">{category}</p>
            <div className="flex flex-wrap gap-4">
              {items.map(([id, item]) => (
                <OptionPill
                  key={id}
                  variant="checkbox"
                  label={item.label}
                  subtitle={item.price !== null ? `+${item.price.toLocaleString("ru-RU")} ₽` : "по запросу"}
                  selected={value.includes(id)}
                  onClick={() => onToggle(id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
