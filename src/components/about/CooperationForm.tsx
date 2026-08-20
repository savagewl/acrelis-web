"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import Checkbox from "@/components/ui/Checkbox";
import {
  cooperationClientSchema,
  cooperationCareerSchema,
  type CooperationClientValues,
  type CooperationCareerValues,
} from "@/lib/forms/schemas";
import { VACANCIES } from "@/data/about/vacancies";

type Tab = "client" | "career" | "partner";

const TABS: { id: Tab; label: string }[] = [
  { id: "client", label: "Хочу стать клиентом" },
  { id: "career", label: "Работать у вас" },
  { id: "partner", label: "Стать партнёром" },
];

const inputClass =
  "w-full rounded-3xl border-2 border-input-border bg-[#fafafa] px-[18px] py-[18px] font-body text-base text-[#1E2F35] outline-none placeholder:text-[rgba(150,150,150,0.5)] focus:border-brand-red";
const labelClass = "flex items-center gap-2 font-sans text-base font-semibold text-[#969696]";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="-mt-1 text-sm text-brand-red">{message}</p>;
}

// Иконки полей — точные экспорты из Figma (574:931): "team" у Имя/Фамилия, "email 1" у
// Email И Комментарий (в самом макете это один и тот же экспорт на обоих полях, не опечатка
// с нашей стороны), "call" у Телефона.
function FieldIcon({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- точная иконка поля из Figma
  return <img src={src} alt="" className="size-[18px]" />;
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex w-fit items-center gap-3 rounded-xl bg-brand-red px-[22px] py-5 font-sans text-lg font-medium text-white disabled:opacity-60"
    >
      {isSubmitting ? "Отправляем..." : "Отправить заявку"}
      <ArrowUpRightIcon className="size-5" />
    </button>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col gap-2 py-8">
      <p className="font-sans text-2xl font-bold text-[#1E2F35]">Спасибо! Заявка отправлена.</p>
      <p className="font-body text-body-muted">Менеджер свяжется с Вами в ближайшее время.</p>
      <button type="button" onClick={onReset} className="mt-4 w-fit font-body text-sm text-brand-red underline">
        Отправить ещё одну заявку
      </button>
    </div>
  );
}

// Таб "Хочу стать клиентом" и "Стать партнёром" (Figma 574:931 / 869:1679) — задизайнены
// идентично (тот же набор полей), поэтому один компонент на оба.
function ClientOrPartnerForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CooperationClientValues>({
    resolver: zodResolver(cooperationClientSchema),
    defaultValues: { name: "", surname: "", email: "", phone: "", comment: "", marketingConsent: false },
  });

  const onSubmit = async (values: CooperationClientValues) => {
    console.log("cooperation-form submit", values);
    await new Promise((r) => setTimeout(r, 400));
  };

  if (isSubmitSuccessful) return <SuccessMessage onReset={reset} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-team.svg" />
            Имя
          </label>
          <input {...register("name")} placeholder="Ваше имя" className={inputClass} />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-team.svg" />
            Фамилия
          </label>
          <input {...register("surname")} placeholder="Ваша фамилия" className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-email.svg" />
            Email
          </label>
          <input {...register("email")} placeholder="example@company.ru" className={inputClass} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-call.svg" />
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
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>
          <FieldIcon src="/images/about/decor/field-email.svg" />
          Комментарий
        </label>
        <textarea
          {...register("comment")}
          placeholder="Кратко расскажите, какие процессы необходимо автоматизировать"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex items-start gap-3 font-body text-sm text-body-muted">
          <Checkbox {...register("consent")} />
          <span>
            Я принимаю условия{" "}
            <a href="/privacy-policy" className="text-[#1E2F35] underline">
              Политики конфиденциальности
            </a>{" "}
            и даю согласие на обработку моих персональных данных.
          </span>
        </label>
        <FieldError message={errors.consent?.message} />

        <label className="flex items-start gap-3 font-body text-sm text-body-muted">
          <Checkbox {...register("marketingConsent")} />
          <span>Я согласен(а) получать маркетинговые материалы, новости и коммерческие предложения ООО «Акрелис».</span>
        </label>
      </div>

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}

// Таб "Работать у вас" (Figma 869:1507) — те же поля + вакансия*, резюме, 3-е согласие.
function CareerForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CooperationCareerValues>({
    resolver: zodResolver(cooperationCareerSchema),
    defaultValues: { name: "", surname: "", email: "", phone: "", comment: "", vacancy: "", marketingConsent: false },
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const onSubmit = async (values: CooperationCareerValues) => {
    console.log("cooperation-form submit (career)", values);
    await new Promise((r) => setTimeout(r, 400));
  };

  if (isSubmitSuccessful) return <SuccessMessage onReset={reset} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <select {...register("vacancy")} defaultValue="" className={`${inputClass} appearance-none pr-12`}>
            <option value="" disabled>
              Выберите вакансию
            </option>
            {VACANCIES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка-шеврон из Figma */}
          <img
            src="/images/about/decor/select-chevron.svg"
            alt=""
            className="pointer-events-none absolute right-[18px] top-1/2 h-[6px] w-[17px] -translate-y-1/2"
          />
        </div>
        <FieldError message={errors.vacancy?.message} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-team.svg" />
            Имя
          </label>
          <input {...register("name")} placeholder="Ваше имя" className={inputClass} />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-team.svg" />
            Фамилия
          </label>
          <input {...register("surname")} placeholder="Ваша фамилия" className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-email.svg" />
            Email
          </label>
          <input {...register("email")} placeholder="example@company.ru" className={inputClass} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label className={labelClass}>
            <FieldIcon src="/images/about/decor/field-call.svg" />
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
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass}>
          <FieldIcon src="/images/about/decor/field-email.svg" />
          Комментарий
        </label>
        <textarea
          {...register("comment")}
          placeholder="Кратко расскажите, какие процессы необходимо автоматизировать"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <label className={`${inputClass} flex cursor-pointer items-center justify-between`}>
        <span className={fileName ? "text-[#1E2F35]" : "text-[rgba(150,150,150,0.7)]"}>
          {fileName ?? "Прикрепить файл"}
        </span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- точная иконка из Figma */}
        <img src="/images/about/decor/upload-icon.svg" alt="" className="size-[21.7px]" />
      </label>

      <div className="flex flex-col gap-4">
        <label className="flex items-start gap-3 font-body text-sm text-body-muted">
          <Checkbox {...register("consent")} />
          <span>
            Я принимаю условия{" "}
            <a href="/privacy-policy" className="text-[#1E2F35] underline">
              Политики конфиденциальности
            </a>{" "}
            и даю согласие на обработку моих персональных данных.
          </span>
        </label>
        <FieldError message={errors.consent?.message} />

        <label className="flex items-start gap-3 font-body text-sm text-body-muted">
          <Checkbox {...register("marketingConsent")} />
          <span>Я согласен(а) получать маркетинговые материалы, новости и коммерческие предложения ООО «Акрелис».</span>
        </label>

        <label className="flex items-start gap-3 font-body text-sm text-body-muted">
          <Checkbox {...register("resumeConsent")} />
          <span>
            Я даю{" "}
            <a href="/privacy-policy" className="text-[#1E2F35] underline">
              согласие
            </a>{" "}
            на обработку персональных данных в целях включения в кадровый резерв. С Положением о кадровом резерве
            можно ознакомиться{" "}
            <a href="/privacy-policy" className="text-[#1E2F35] underline">
              здесь
            </a>
            .
          </span>
        </label>
        <FieldError message={errors.resumeConsent?.message} />
      </div>

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}

// Figma id=574:931 "Desktop - 8" (/about), состояния табов — 869:1438 (клиент), 869:1507
// (вакансии), 869:1679 (партнёр). Декоративные вихри на фоне — те же 2 SVG во всех 3-х
// состояниях, только форма меняется.
export default function CooperationForm() {
  const [activeTab, setActiveTab] = useState<Tab>("client");

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-[90px] sm:py-[120px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-70 sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фон из Figma */}
        <img
          src="/images/about/decor/swirl-top.svg"
          alt=""
          className="absolute -right-[140px] -top-[100px] w-[600px] max-w-none scale-y-[-1]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- декоративный фон из Figma */}
        <img
          src="/images/about/decor/swirl-bottom.svg"
          alt=""
          className="absolute -bottom-[80px] -left-[200px] w-[500px] max-w-none rotate-[99deg]"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1260px] flex-col gap-16 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="flex flex-col gap-2 font-sans text-4xl font-semibold uppercase leading-[0.9] text-[#1E2F35] sm:text-[56px]">
            <span>Обсудить</span>
            <span>сотрудничество</span>
          </h2>
          <p className="max-w-[460px] font-body text-base leading-[1.6] text-[#9E9EA8]">
            Стоимость оказываемых услуг, выполненных работ и предоставляемых прав рассчитывается индивидуально в
            зависимости от технологических потребностей и бизнес-задач вашего проекта.
          </p>
        </div>

        <div className="flex w-full flex-col gap-9 lg:w-[607px] lg:shrink-0">
          <div className="flex items-center gap-3 rounded-full bg-[rgba(150,150,150,0.2)] p-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-full px-2 py-3 text-center font-sans text-xs font-semibold sm:px-4 sm:text-sm ${
                  activeTab === tab.id ? "bg-[#1E2F35] text-white" : "bg-[#cacaca] text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "career" ? <CareerForm key="career" /> : <ClientOrPartnerForm key={activeTab} />}
        </div>
      </div>
    </section>
  );
}
