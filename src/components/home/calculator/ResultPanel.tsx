"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import UserIcon from "@/components/ui/UserIcon";
import PhoneIcon from "@/components/ui/PhoneIcon";
import { calculatorLeadSchema, type CalculatorLeadValues } from "@/lib/forms/schemas";
import type { CalculatorSelection } from "@/lib/calculator/pricing";

interface ResultPanelProps {
  developmentCost: number | null;
  total: number | null;
  canSubmit: boolean;
  selection: CalculatorSelection;
  onSubmitted: () => void;
}

const inputClass =
  "w-full rounded-full border border-input-border bg-input-bg px-5 py-3.5 font-body text-base text-[#1E2F35] outline-none placeholder:text-body-muted focus:border-brand-red";

function formatPrice(value: number | null) {
  if (value === null) return "—";
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

// Точная структура из Figma (719:124, "Preview"): белая карточка radius 24, чёрная тонкая
// обводка, "Итог расчёта", 2 строки значений, разделитель, итог + кнопка + дисклеймер.
// ТЗ: кнопка неактивна (серый градиент) до завершения шага 5, активна — розово-красный градиент.
export default function ResultPanel({
  developmentCost,
  total,
  canSubmit,
  selection,
  onSubmitted,
}: ResultPanelProps) {
  const [phase, setPhase] = useState<"summary" | "form">("summary");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CalculatorLeadValues>({
    resolver: zodResolver(calculatorLeadSchema),
    defaultValues: { name: "", phone: "" },
  });

  const onSubmit = async (values: CalculatorLeadValues) => {
    // TODO: интеграция с CRM — вне периметра фронтенда. По ТЗ передаём массив модулей/
    // интеграций целиком (не только сумму), плюс сам расчёт.
    console.log("calculator lead submit", { ...values, selection, developmentCost, total });
    await new Promise((r) => setTimeout(r, 400));
    onSubmitted();
  };

  return (
    <div className="flex w-full max-w-[479px] flex-col gap-5 rounded-3xl border border-brand-red/40 bg-white p-5">
      {phase === "summary" ? (
        <>
          <h3 className="font-sans text-xl font-bold text-[#1E2F35]">Итог расчёта</h3>

          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-[#1E2F35]/15 py-3">
              <span className="font-body text-base text-body-muted">Стоимость разработки</span>
              <span className="font-body text-base text-body-muted/60">
                {formatPrice(developmentCost)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1E2F35]/15 py-3">
              <span className="font-body text-base text-body-muted">Поддержка в месяц</span>
              <span className="font-body text-base text-body-muted/60">0 ₽</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="font-sans text-base font-medium text-[#1E2F35]">
              Итого проект + первый месяц:
            </span>
            <span className="font-sans text-2xl font-semibold text-[#1E2F35]">
              {formatPrice(total)}
            </span>
          </div>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setPhase("form")}
            className="rounded-xl px-6 py-4 font-sans text-lg font-medium text-white transition-opacity disabled:cursor-not-allowed"
            style={{
              background: canSubmit
                ? "linear-gradient(90deg, #F43367 0%, #FF050A 100%)"
                : "linear-gradient(180deg, rgba(150,150,150,0.4) 0%, rgba(30,47,53,0.4) 100%), #FFFFFF",
            }}
          >
            Отправить расчёт
          </button>

          <p className="font-body text-sm text-body-muted">
            *Расчёт предварительный. Финальная смета после консультации с менеджером
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h3 className="font-sans text-xl font-bold text-[#1E2F35]">Отправить расчёт</h3>
          <p className="font-body text-sm text-body-muted">
            Итого: <span className="font-semibold text-[#1E2F35]">{formatPrice(total)}</span>
          </p>

          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold text-[#1E2F35]">
              <UserIcon className="h-4 w-4" />
              Имя
            </label>
            <input {...register("name")} placeholder="Ваше имя" className={inputClass} />
            {errors.name && <p className="mt-1 text-sm text-brand-red">{errors.name.message}</p>}
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-sm font-semibold text-[#1E2F35]">
              <PhoneIcon className="h-4 w-4" />
              Телефон
            </label>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <IMaskInput
                  mask="+7 (000) 000-00-00"
                  unmask={false}
                  value={field.value}
                  onAccept={(value: string) => field.onChange(value)}
                  placeholder="+7 (___) ___-__-__"
                  className={inputClass}
                />
              )}
            />
            {errors.phone && <p className="mt-1 text-sm text-brand-red">{errors.phone.message}</p>}
          </div>

          <label className="flex items-start gap-3 font-body text-sm text-body-muted">
            <input type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 accent-brand-red" />
            <span>
              Согласен на обработку персональных данных в соответствии с{" "}
              <a href="/privacy-policy" className="underline">
                политикой конфиденциальности
              </a>
            </span>
          </label>
          {errors.consent && <p className="text-sm text-brand-red">{errors.consent.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting || isSubmitSuccessful}
            className="rounded-xl bg-brand-red px-6 py-4 font-sans text-lg font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Отправляем..." : "Отправить расчёт"}
          </button>
        </form>
      )}
    </div>
  );
}
