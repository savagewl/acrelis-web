import { z } from "zod";

// Телефон вводится через маску +7 (___) ___-__-__ (react-imask) — на выходе очищаем до цифр.
const phoneSchema = z
  .string()
  .min(1, "Укажите телефон")
  .refine((v) => v.replace(/\D/g, "").length === 11, "Введите номер полностью");

// ТЗ, модалка "Оставить заявку": Имя/Телефон/Почта + согласие — обязательны;
// "Ваши пожелания" и согласие на рассылку — опциональны.
export const leaveRequestSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  phone: phoneSchema,
  email: z.email({ message: "Некорректный формат почты" }).min(1, "Укажите почту"),
  wishes: z.string().optional(),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
  marketingConsent: z.boolean().optional(),
});

export type LeaveRequestValues = z.infer<typeof leaveRequestSchema>;

// ТЗ, поп-ап автозахвата лидов (60 секунд на сайте): Имя/Телефон + согласие обязательны.
export const exitPopupSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  phone: phoneSchema,
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export type ExitPopupValues = z.infer<typeof exitPopupSchema>;

// ТЗ, калькулятор "Соберите свой проект": финальная форма — Имя/Телефон + согласие обязательны.
export const calculatorLeadSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  phone: phoneSchema,
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export type CalculatorLeadValues = z.infer<typeof calculatorLeadSchema>;
