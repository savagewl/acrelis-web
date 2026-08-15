import type { Metadata } from "next";
import { axiforma, inter } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { ModalProvider } from "@/components/providers/ModalProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://acrelis.ru"),
  title: {
    default: "ACRELIS — разработка сайтов, Telegram-ботов, CRM и мобильных приложений под ключ",
    template: "%s | ACRELIS",
  },
  description:
    "Разрабатываем сайты, Telegram-боты, CRM-системы и мобильные приложения под ключ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${axiforma.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
