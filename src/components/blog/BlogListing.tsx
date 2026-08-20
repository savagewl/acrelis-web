"use client";

import { useState } from "react";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";

// Обёртка-клиент для поиска в реальном времени — держит state здесь, а не в page.tsx,
// чтобы сама страница /blog осталась server-компонентом и могла экспортировать metadata.
export default function BlogListing() {
  const [search, setSearch] = useState("");

  return (
    <>
      <BlogHeader search={search} onSearchChange={setSearch} />
      <BlogGrid search={search} />
    </>
  );
}
