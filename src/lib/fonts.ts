import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Inter — шрифт для боди-текста (параграфы, инпуты) по макету в Figma.
// Заголовки/UI/кнопки — Axiforma (ниже).
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

// Axiforma — основной шрифт проекта (по макету в Figma).
// Файлы лежат в src/fonts/axiforma, весь диапазон начертаний подключается через
// next/font/local одним CSS-переменной шрифтом, без запроса к Google Fonts.
export const axiforma = localFont({
  src: [
    { path: "../fonts/axiforma/Axiforma-Thin.ttf", weight: "100", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-Book.ttf", weight: "350", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-BookItalic.ttf", weight: "350", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-Heavy.ttf", weight: "850", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-HeavyItalic.ttf", weight: "850", style: "italic" },
    { path: "../fonts/axiforma/Axiforma-Black.ttf", weight: "900", style: "normal" },
    { path: "../fonts/axiforma/Axiforma-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-axiforma",
  display: "swap",
});
