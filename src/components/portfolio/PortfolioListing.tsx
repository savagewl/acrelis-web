"use client";

import { useState } from "react";
import PortfolioHeader, { type PortfolioCategory } from "@/components/portfolio/PortfolioHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

// Обёртка-клиент для фильтра по категориям — держит state здесь, а не в page.tsx, чтобы
// сама страница /portfolio осталась server-компонентом и могла экспортировать metadata.
export default function PortfolioListing() {
  const [category, setCategory] = useState<PortfolioCategory>("Все");

  return (
    <>
      <PortfolioHeader active={category} onChange={setCategory} />
      <PortfolioGrid category={category} />
    </>
  );
}
