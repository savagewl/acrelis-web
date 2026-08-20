"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "@/components/ui/Checkbox";
import { newsletterSchema, type NewsletterValues } from "@/lib/forms/schemas";

// Figma id=449:1458 (/blog/[slug]) — тёмный блок подписки на рассылку. По ТЗ (страница
// статьи): Email обязателен и валидируется, подсветка при ошибке, сообщение об успехе.
export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterValues) => {
    console.log("newsletter subscribe", values);
    await new Promise((r) => setTimeout(r, 400));
  };

  return (
    <section className="bg-[#1D1D1B] px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[520px] flex-col gap-3">
          <p className="font-body text-base font-semibold uppercase tracking-[0.5px] text-brand-red">Рассылка</p>
          <h2 className="font-sans text-3xl font-semibold tracking-[-1px] text-white sm:text-[40px]">
            Получайте материалы блога раз в месяц
          </h2>
        </div>

        {isSubmitSuccessful ? (
          <p className="w-full max-w-[540px] font-body text-lg text-white">
            Спасибо! Проверьте почту — мы отправили письмо для подтверждения подписки.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-[540px] flex-col gap-2">
            <div
              className={`flex items-center gap-2 rounded-xl border-[1.5px] p-[18px] ${
                errors.email ? "border-brand-red" : "border-[rgba(150,150,150,0.3)]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- переиспользуемая иконка поля из Figma */}
              <img src="/images/about/decor/field-email.svg" alt="" className="size-[23px] shrink-0" />
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full bg-transparent font-body text-lg text-white outline-none placeholder:text-[#969696]"
              />
            </div>
            {errors.email && <p className="text-sm text-brand-red">{errors.email.message}</p>}

            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="shrink-0 rounded-xl px-[30px] py-4 font-sans text-base font-medium text-white disabled:opacity-60"
                style={{ background: "linear-gradient(90deg, #F43367 0%, #FF050A 100%)" }}
              >
                {isSubmitting ? "Отправляем..." : "Подписаться"}
              </button>
              <label className="flex flex-1 items-start gap-1 font-body text-sm text-[#a6a6a6]">
                <Checkbox {...register("consent")} />
                <span>
                  Нажимая кнопку «Отправить», я даю <span className="underline">согласие</span> на получение рассылок рекламного характера.
                </span>
              </label>
            </div>
            {errors.consent && <p className="text-sm text-brand-red">{errors.consent.message}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
