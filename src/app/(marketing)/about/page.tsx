import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "О компании",
  description: "Команда и подход ACRELIS.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      {/*
        TODO по ТЗ (О нас):
        - Метрики вверху — анимация нарастания цифр при скролле в зону видимости
        - "Наша команда" — фото в 2 ряда, бесконечная автопрокрутка в противоположных
          направлениях, пауза при hover (референс: ykt.ru/about)
        - Кнопка "Все проекты" → /portfolio
        - Форма "Обсудить сотрудничество": Имя*, Фамилия, Email*, Телефон*, Комментарий,
          чекбокс согласия* — маска телефона +7 (___) ___-__-__, валидация email,
          подсветка невалидных полей, серверная проверка перед отправкой (см. lib/forms)
      */}
    </div>
  );
}
