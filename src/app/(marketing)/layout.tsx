import Footer from "@/components/base/Footer";

// Общей шапки нет намеренно: по Figma каждая страница несёт свой Hero
// с собственным header-рядом внутри (см. components/base/SiteHeader,
// используется из components/home/Hero). Footer — сквозной для всех страниц.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
