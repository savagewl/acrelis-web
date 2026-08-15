import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Поддержка IT-решений",
  description: "Доработаем или поддержим существующее решение.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <div>
      {/*
        TODO по ТЗ (Поддержка IT-решений):
        - Hero: видео-фон, кнопка "Заказать услугу" → модалка "Оставить заявку",
          кнопка "Калькулятор стоимости" → переход на Главную и скролл к блоку калькулятора
        - "Статус-страница ваших систем" — деления прогресс-бара в каждой строке зажигаются
          слева направо (1.5–2s), строки — параллельно или с минимальным каскадом сверху вниз
      */}
    </div>
  );
}
