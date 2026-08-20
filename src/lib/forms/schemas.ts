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

// Страница /about, форма "Обсудить сотрудничество" (Figma 574:931 / 869:1438 / 869:1679):
// табы "Хочу стать клиентом" и "Стать партнёром" используют один и тот же набор полей
// (задизайнены в Figma идентично) — Имя*/Фамилия/Email*/Телефон*/Комментарий + согласие*
// (маркетинговое согласие опционально).
export const cooperationClientSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  surname: z.string().optional(),
  email: z.email({ message: "Некорректный формат почты" }).min(1, "Укажите почту"),
  phone: phoneSchema,
  comment: z.string().optional(),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
  marketingConsent: z.boolean().optional(),
});

export type CooperationClientValues = z.infer<typeof cooperationClientSchema>;

// Таб "Работать у вас" (Figma 869:1507): те же поля + выбор вакансии*, файл резюме
// (опционально — нативный <input type="file">, без отдельной схемы-поля) и третье
// согласие — на обработку данных для кадрового резерва.
export const cooperationCareerSchema = cooperationClientSchema.extend({
  vacancy: z.string().min(1, "Выберите вакансию"),
  resumeConsent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export type CooperationCareerValues = z.infer<typeof cooperationCareerSchema>;

// Подписка на рассылку блога (Figma id=449:1458, /blog/[slug]): Email* + согласие*.
export const newsletterSchema = z.object({
  email: z.email({ message: "Некорректный формат почты" }).min(1, "Укажите почту"),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку данных",
  }),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
