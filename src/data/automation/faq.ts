import type { FaqItem } from "@/components/shared/Faq";

// Figma id=337:872 "FAQ Section" (/automation). Из 6 вопросов в самом Figma текст ответа
// раскрыт только у одного ("Нужно ли менять текущие системы?") — для остальных пяти
// реального текста ответа в макете нет вообще (только вопрос + иконка). null → плейсхолдер
// в самом компоненте Faq, а не выдуманный текст.
export const AUTOMATION_FAQ_HEADING = "Часто задаваемые вопросы";
export const AUTOMATION_FAQ_SUBTITLE =
  "Мы подготовили ответы на самые популярные вопросы наших клиентов, чтобы помочь вам лучше разобраться в процессе интеграции.";

export const AUTOMATION_FAQ_LEFT: FaqItem[] = [
  { question: "Какие сроки автоматизации?", answer: null },
  {
    question: "Нужно ли менять текущие системы?",
    answer:
      "Нет, в большинстве случаев мы интегрируемся с вашими текущими инструментами — 1С, Битрикс24, AmoCRM, Google Workspace и другими. Мы не ломаем то, что работает, а подключаем автоматизацию поверх.",
  },
  { question: "Что если процессы изменятся после внедрения?", answer: null },
];

export const AUTOMATION_FAQ_RIGHT: FaqItem[] = [
  { question: "Какие гарантии вы даёте?", answer: null },
  { question: "Возможна частичная автоматизация?", answer: null },
  { question: "Сколько стоит поддержка после запуска?", answer: null },
];
