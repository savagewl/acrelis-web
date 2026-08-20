import type { FaqItem } from "@/components/shared/Faq";

// Figma id=342:1922 "FAQ Section" (/it-solutions). Как и на /automation, реальный текст
// ответа в макете есть только у одного вопроса ("Можно ли доработать уже существующую
// систему?") — для остальных пяти его нет, null → плейсхолдер в самом компоненте Faq.
export const IT_SOLUTIONS_FAQ_HEADING = "Частые вопросы";
export const IT_SOLUTIONS_FAQ_SUBTITLE =
  "Мы подготовили ответы на самые популярные вопросы наших клиентов, чтобы помочь вам лучше понять процесс разработки.";

export const IT_SOLUTIONS_FAQ_LEFT: FaqItem[] = [
  { question: "Сколько времени занимает разработка", answer: null },
  {
    question: "Можно ли доработать уже существующую систему?",
    answer:
      "Да, мы часто работаем с существующими продуктами — дорабатываем функционал, проводим рефакторинг, добавляем интеграции с 1С, CRM, платёжными системами. Не обязательно делать всё с нуля.",
  },
  { question: "Какие технологии вы используете?", answer: null },
];

export const IT_SOLUTIONS_FAQ_RIGHT: FaqItem[] = [
  { question: "Что входит в поддержку после запуска?", answer: null },
  { question: "Работаете ли вы с MVP и стартапами?", answer: null },
  { question: "Как вы оцениваете стоимость проекта?", answer: null },
];
