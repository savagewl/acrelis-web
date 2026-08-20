import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/base/SiteHeader";
import ContactsInfo from "@/components/contacts/ContactsInfo";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты",
  description: "Свяжитесь с ACRELIS — телефон, email, соцсети.",
  path: "/contacts",
});

// Figma id=264:7354 — вся страница целиком: хедер (свой, как на /blog — светлый вариант,
// без тёмного Hero) → адрес/часы/ссылки + точечная карта мира с мигающим маркером на
// Казани + соцсети → Footer (глобальный, в layout.tsx).
export default function ContactsPage() {
  return (
    <div>
      <SiteHeader variant="light" />
      <ContactsInfo />
    </div>
  );
}
