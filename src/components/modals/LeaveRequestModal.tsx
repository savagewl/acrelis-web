"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import ModalShell from "@/components/modals/ModalShell";
import UserIcon from "@/components/ui/UserIcon";
import PhoneIcon from "@/components/ui/PhoneIcon";
import MailIcon from "@/components/ui/MailIcon";
import HeartIcon from "@/components/ui/HeartIcon";
import { leaveRequestSchema, type LeaveRequestValues } from "@/lib/forms/schemas";

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-full border border-input-border bg-input-bg px-5 py-4 font-body text-base text-[#1E2F35] outline-none placeholder:text-body-muted focus:border-brand-red";
const textareaClass =
  "w-full rounded-[24px] border border-input-border bg-input-bg px-5 py-4 font-body text-base text-[#1E2F35] outline-none placeholder:text-body-muted focus:border-brand-red";

// ТЗ: модалка "Оставить заявку" — Имя/Телефон/Почта + согласие обязательны,
// "Ваши пожелания" и согласие на рассылку опциональны. Figma: 843:1163.
export default function LeaveRequestModal({ isOpen, onClose }: LeaveRequestModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LeaveRequestValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      wishes: "",
      marketingConsent: false,
    },
  });

  const onSubmit = async (values: LeaveRequestValues) => {
    // TODO: интеграция с CRM — вне периметра фронтенда (см. отчёт по ТЗ), пока просто логируем.
    console.log("leave-request submit", values);
    await new Promise((r) => setTimeout(r, 400));
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <ModalShell isOpen={isOpen} onClose={handleClose}>
      {isSubmitSuccessful ? (
        <div className="py-12 text-center">
          <p className="font-sans text-2xl font-bold text-[#1E2F35]">
            Спасибо! Заявка отправлена.
          </p>
          <p className="mt-2 font-body text-body-muted">
            Менеджер свяжется с Вами в ближайшее время.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <h2 className="font-sans text-3xl font-bold text-[#1E2F35] sm:text-[32px]">
            Оставить заявку
          </h2>

          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-base font-semibold text-[#1E2F35]">
              <UserIcon className="h-4 w-4" />
              Имя
            </label>
            <input
              {...register("name")}
              placeholder="Ваше имя"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-brand-red">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 font-sans text-base font-semibold text-[#1E2F35]">
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
              {errors.phone && (
                <p className="mt-1 text-sm text-brand-red">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 font-sans text-base font-semibold text-[#1E2F35]">
                <MailIcon className="h-4 w-4" />
                Почта
              </label>
              <input
                {...register("email")}
                placeholder="example@gmail.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-brand-red">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 font-sans text-base font-semibold text-[#1E2F35]">
              <HeartIcon className="h-4 w-4" />
              Ваши пожелания
            </label>
            <textarea
              {...register("wishes")}
              placeholder="Нам нужно..."
              rows={3}
              className={textareaClass}
            />
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
          {errors.consent && (
            <p className="-mt-4 text-sm text-brand-red">{errors.consent.message}</p>
          )}

          <label className="flex items-start gap-3 font-body text-sm text-body-muted">
            <input
              type="checkbox"
              {...register("marketingConsent")}
              className="mt-0.5 h-4 w-4 accent-brand-red"
            />
            <span>
              Я даю{" "}
              <a href="/privacy-policy" className="underline">
                согласие
              </a>{" "}
              на получение рассылок рекламного характера.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-red py-4 font-sans text-lg font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? "Отправляем..." : "Отправить"}
          </button>
        </form>
      )}
    </ModalShell>
  );
}
