import type { Metadata } from "next";

export const SITE_URL = "https://acrelis.ru";
export const SITE_NAME = "ACRELIS";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Путь без домена, например "/automation" или "/cases/rusislworld" */
  path: string;
  ogImage?: string;
  keywords?: string[];
}

/**
 * Единая точка сборки метаданных страницы.
 * Каждый вызов явно задаёт canonical от реального пути страницы —
 * в старой версии сайта canonical был один на весь сайт (баг), здесь это
 * невозможно повторить случайно, т.к. path обязателен.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = "/og/og-main.jpg",
  keywords,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
