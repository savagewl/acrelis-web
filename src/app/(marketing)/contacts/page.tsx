import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты",
  description: "Свяжитесь с ACRELIS — телефон, email, соцсети.",
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <div>
      {/*
        TODO по ТЗ (Контакты):
        - Контактные данные офиса: телефон (tel:), email (mailto:), иконки соцсетей
        - Кнопки "Отправить заявку" / "Присоединиться к команде" → соответствующие модалки
        - Фон — стилизованная точечная карта мира со светящейся точкой геопозиции города
      */}
    </div>
  );
}
